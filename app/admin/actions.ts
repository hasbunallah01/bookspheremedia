"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { checkPassword, createSession, destroySession, requireAdmin, loginBlocked, loginFailed, loginOk } from "@/lib/admin-auth";
import { readImageUpload, saveImage, deleteImage, readSubmissionCover, sniffImage } from "@/lib/storage";

export type AdminState = { ok?: boolean; message?: string; errors?: Record<string, string> };

const s = (f: FormData, k: string, max = 5000) => String(f.get(k) ?? "").trim().slice(0, max);
const o = (f: FormData, k: string, max = 500) => s(f, k, max) || null;
const lines = (v: string) => v.split("\n").map((x) => x.trim()).filter(Boolean);
const paras = (v: string) => v.replace(/\r/g, "").split(/\n\s*\n/).map((x) => x.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
const isUrl = (v: string) => { try { const u = new URL(v); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; } };
const slugify = (t: string) => t.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "item";
async function uniqueSlug(base: string, taken: (s: string) => Promise<boolean>) { let x = base, n = 2; while (await taken(x)) x = `${base}-${n++}`; return x; }
const refresh = () => revalidatePath("/", "layout");

/* ---------- auth ---------- */
export async function login(_: AdminState, f: FormData): Promise<AdminState> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "local";
  if (loginBlocked(ip)) return { message: "Too many attempts. Please wait 15 minutes and try again." };
  if (!checkPassword(String(f.get("password") ?? ""))) { loginFailed(ip); await new Promise((r) => setTimeout(r, 600)); return { message: "That password is not correct." }; }
  loginOk(ip);
  await createSession();
  redirect("/admin");
}
export async function logout() { await destroySession(); redirect("/admin/login"); }

/* ---------- books ---------- */
export async function saveBook(_: AdminState, f: FormData): Promise<AdminState> {
  await requireAdmin();
  const id = s(f, "id");
  const existing = id ? await prisma.book.findUnique({ where: { id } }) : null;
  if (id && !existing) return { message: "That book no longer exists." };
  const e: Record<string, string> = {};
  const title = s(f, "title", 300), hook = s(f, "hook", 400), genre = s(f, "genre", 100), description = paras(s(f, "description", 20000));
  if (!title) e.title = "Please enter the title.";
  if (!hook) e.hook = "Please add a one-line hook (shown on book cards).";
  if (!genre) e.genre = "Please choose a category.";
  if (!description.length) e.description = "Please add at least one description paragraph.";
  const buy = s(f, "externalUrl", 1000);
  if (buy && !isUrl(buy)) e.externalUrl = "Please enter a full web address beginning with https://";
  // author
  const authorMode = s(f, "authorMode");
  let authorId = s(f, "authorId");
  const aName = s(f, "authorName", 200), aSite = s(f, "authorWebsite", 500);
  if (authorMode === "new") {
    if (!aName) e.authorName = "Please enter the author's name.";
    if (!s(f, "authorBio", 20000)) e.authorBio = "Please add a short biography.";
    if (aSite && !isUrl(aSite)) e.authorWebsite = "Please enter a full web address beginning with https://";
  } else if (!authorId || !(await prisma.author.findUnique({ where: { id: authorId } }))) e.authorId = "Please choose an author.";
  // images
  const cover = await readImageUpload(f.get("cover"));
  if (cover && "error" in cover) e.cover = cover.error;
  const photo = authorMode === "new" ? await readImageUpload(f.get("authorPhoto")) : null;
  if (photo && "error" in photo) e.authorPhoto = photo.error;
  let subCover: Buffer | null = null;
  if (!cover && !existing) {
    subCover = await readSubmissionCover((await prisma.bookSubmission.findUnique({ where: { id: s(f, "fromSubmission") || "_" } }))?.coverPath);
    if (!subCover) e.cover = "Please upload a cover image (JPG, PNG or WebP, up to 5 MB).";
  }
  if (Object.keys(e).length) return { message: "Please correct the highlighted fields.", errors: e };

  if (authorMode === "new") {
    const photoUrl = photo && !("error" in photo) ? await saveImage(photo.buf, photo.ext, "authors") : null;
    const slug = await uniqueSlug(slugify(aName), async (x) => !!(await prisma.author.findUnique({ where: { slug: x } })));
    const max = await prisma.author.aggregate({ _max: { sortOrder: true } });
    authorId = (await prisma.author.create({ data: { slug, name: aName, bio: paras(s(f, "authorBio", 20000)).join("\n\n"), website: aSite || null, photo: photoUrl,
      genres: JSON.stringify([genre]), sortOrder: (max._max.sortOrder ?? -1) + 1 } })).id;
  }
  let coverUrl = existing?.cover;
  if (cover && !("error" in cover)) coverUrl = await saveImage(cover.buf, cover.ext, "covers");
  else if (subCover) coverUrl = await saveImage(subCover, sniffImage(subCover)!, "covers");
  const tags = f.getAll("tags").map(String).filter((t) => t && t !== genre);
  const rItems = lines(s(f, "recognitionItems", 5000)), sItems = lines(s(f, "seriesItems", 5000));
  const qText = s(f, "quoteText", 2000);
  const data = {
    title, subtitle: o(f, "subtitle", 300), series: o(f, "series", 300), coAuthors: o(f, "coAuthors", 300), hook, genre, tags: JSON.stringify(tags), description: JSON.stringify(description),
    publisher: o(f, "publisher", 200), format: o(f, "format", 80), language: o(f, "language", 80), published: o(f, "published", 40),
    externalUrl: buy || null, externalLabel: buy ? (s(f, "externalLabel", 80) || "Explore Purchase Options") : null,
    coverQuote: qText ? JSON.stringify({ text: qText, attribution: s(f, "quoteBy", 300) }) : null,
    recognition: rItems.length ? JSON.stringify({ source: s(f, "recognitionSource", 200) || "From the publisher's description", items: rItems }) : null,
    seriesList: sItems.length ? JSON.stringify({ title: s(f, "seriesTitle", 200), items: sItems }) : null,
    featured: f.get("featured") === "on", visible: f.get("visible") === "on", authorId, cover: coverUrl!,
    // A newly uploaded cover is the real cover; otherwise keep how the existing cover renders (sample books keep their illustrative style).
    ...(coverUrl !== existing?.cover ? { realCover: true, coverPending: false } : {}),
  };
  let slug: string;
  if (existing) {
    await prisma.book.update({ where: { id }, data });
    if (coverUrl !== existing.cover) await deleteImage(existing.cover);
    slug = existing.slug;
  } else {
    slug = await uniqueSlug(slugify(title), async (x) => !!(await prisma.book.findUnique({ where: { slug: x } })));
    const min = await prisma.book.aggregate({ _min: { sortOrder: true } });
    // New books go to the top of the list so they appear first on the homepage.
    await prisma.book.create({ data: { ...data, slug, addedAt: new Date().toISOString().slice(0, 10), sortOrder: (min._min.sortOrder ?? 1) - 1 } });
    const sub = s(f, "fromSubmission");
    if (sub) await prisma.bookSubmission.update({ where: { id: sub }, data: { status: "PUBLISHED" } }).catch(() => {});
  }
  if (data.featured) await prisma.book.updateMany({ where: { slug: { not: slug } }, data: { featured: false } });
  refresh();
  redirect(`/admin?saved=${encodeURIComponent(title)}`);
}

export async function deleteBook(f: FormData) {
  await requireAdmin();
  const b = await prisma.book.findUnique({ where: { id: s(f, "id") } });
  if (!b) return;
  await prisma.feature.updateMany({ where: { bookId: b.id }, data: { bookId: null } });
  await prisma.book.delete({ where: { id: b.id } });
  await deleteImage(b.cover);
  refresh();
  redirect(`/admin?deleted=${encodeURIComponent(b.title)}`);
}

export async function toggleBook(f: FormData) {
  await requireAdmin();
  const id = s(f, "id"), field = s(f, "field");
  const b = await prisma.book.findUnique({ where: { id } }); if (!b) return;
  if (field === "featured") {
    const on = !b.featured;
    if (on) await prisma.book.updateMany({ data: { featured: false } });
    await prisma.book.update({ where: { id }, data: { featured: on } });
  } else if (field === "visible") await prisma.book.update({ where: { id }, data: { visible: !b.visible } });
  refresh();
}

export async function moveBook(f: FormData) {
  await requireAdmin();
  const id = s(f, "id"), dir = s(f, "dir") === "up" ? -1 : 1;
  const all = await prisma.book.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], select: { id: true } });
  const i = all.findIndex((b) => b.id === id), j = i + dir;
  if (i < 0 || j < 0 || j >= all.length) return;
  [all[i], all[j]] = [all[j], all[i]];
  await prisma.$transaction(all.map((b, k) => prisma.book.update({ where: { id: b.id }, data: { sortOrder: k } })));
  refresh();
}

/* ---------- authors ---------- */
export async function saveAuthor(_: AdminState, f: FormData): Promise<AdminState> {
  await requireAdmin();
  const a = await prisma.author.findUnique({ where: { id: s(f, "id") } });
  if (!a) return { message: "That author no longer exists." };
  const e: Record<string, string> = {};
  const name = s(f, "name", 200), bio = paras(s(f, "bio", 20000)).join("\n\n"), site = s(f, "website", 500);
  if (!name) e.name = "Please enter the author's name.";
  if (!bio) e.bio = "Please add a biography.";
  if (site && !isUrl(site)) e.website = "Please enter a full web address beginning with https://";
  const photo = await readImageUpload(f.get("photo"));
  if (photo && "error" in photo) e.photo = photo.error;
  if (Object.keys(e).length) return { message: "Please correct the highlighted fields.", errors: e };
  let url = a.photo;
  if (photo && !("error" in photo)) { url = await saveImage(photo.buf, photo.ext, "authors"); await deleteImage(a.photo); }
  if (f.get("removePhoto") === "on" && !(photo && !("error" in photo))) { await deleteImage(a.photo); url = null; }
  await prisma.author.update({ where: { id: a.id }, data: { name, bio, website: site || null, photo: url } });
  refresh();
  redirect("/admin/authors?saved=1");
}

export async function deleteAuthor(f: FormData) {
  await requireAdmin();
  const a = await prisma.author.findUnique({ where: { id: s(f, "id") }, include: { _count: { select: { books: true } } } });
  if (!a || a._count.books > 0) return;
  await prisma.feature.updateMany({ where: { authorId: a.id }, data: { authorId: null } });
  await prisma.author.delete({ where: { id: a.id } });
  await deleteImage(a.photo);
  refresh();
}

/* ---------- submissions ---------- */
export async function setSubmissionStatus(f: FormData) {
  await requireAdmin();
  const st = s(f, "status");
  if (!["RECEIVED", "UNDER_REVIEW", "INFO_REQUESTED", "APPROVED", "DECLINED", "PUBLISHED"].includes(st)) return;
  await prisma.bookSubmission.update({ where: { id: s(f, "id") }, data: { status: st } }).catch(() => {});
  revalidatePath("/admin/submissions");
}

/* ---------- affiliates ---------- */
export async function saveAffiliate(_: AdminState, f: FormData): Promise<AdminState> {
  await requireAdmin();
  const id = s(f, "id");
  const ex = id ? await prisma.affiliate.findUnique({ where: { id } }) : null;
  if (id && !ex) return { message: "That affiliate no longer exists." };
  const e: Record<string, string> = {};
  const name = s(f, "name", 200), description = s(f, "description", 3000), link = s(f, "link", 1000);
  if (!name) e.name = "Please enter the community name.";
  if (!description) e.description = "Please add a short description.";
  if (!link) e.link = "Please add the Facebook or website link."; else if (!isUrl(link)) e.link = "Please enter a full web address beginning with https://";
  const logo = await readImageUpload(f.get("logo")); if (logo && "error" in logo) e.logo = logo.error;
  const banner = await readImageUpload(f.get("banner")); if (banner && "error" in banner) e.banner = banner.error;
  if (Object.keys(e).length) return { message: "Please correct the highlighted fields.", errors: e };
  const fromApp = s(f, "fromApplication");
  let logoUrl = ex?.logo ?? null, bannerUrl = ex?.banner ?? null;
  if (logo && !("error" in logo)) { logoUrl = await saveImage(logo.buf, logo.ext, "affiliates"); if (ex) await deleteImage(ex.logo); }
  else if (f.get("removeLogo") === "on") { if (ex) await deleteImage(ex.logo); logoUrl = null; }
  else if (!ex && fromApp) {
    const buf = await readSubmissionCover((await prisma.affiliateApplication.findUnique({ where: { id: fromApp } }))?.logoPath);
    if (buf) logoUrl = await saveImage(buf, sniffImage(buf)!, "affiliates");
  }
  if (banner && !("error" in banner)) { bannerUrl = await saveImage(banner.buf, banner.ext, "affiliates"); if (ex) await deleteImage(ex.banner); }
  else if (f.get("removeBanner") === "on") { if (ex) await deleteImage(ex.banner); bannerUrl = null; }
  const data = { name, tagline: o(f, "tagline", 200), description, link, logo: logoUrl, banner: bannerUrl, visible: f.get("visible") === "on" };
  if (ex) await prisma.affiliate.update({ where: { id: ex.id }, data });
  else {
    const slug = await uniqueSlug(slugify(name), async (x) => !!(await prisma.affiliate.findUnique({ where: { slug: x } })));
    const max = await prisma.affiliate.aggregate({ _max: { sortOrder: true } });
    await prisma.affiliate.create({ data: { ...data, slug, sortOrder: (max._max.sortOrder ?? -1) + 1 } });
    if (fromApp) await prisma.affiliateApplication.update({ where: { id: fromApp }, data: { status: "APPROVED" } }).catch(() => {});
  }
  refresh();
  redirect(`/admin/affiliates?saved=${encodeURIComponent(name)}`);
}
export async function toggleAffiliate(f: FormData) {
  await requireAdmin();
  const a = await prisma.affiliate.findUnique({ where: { id: s(f, "id") } }); if (!a) return;
  await prisma.affiliate.update({ where: { id: a.id }, data: { visible: !a.visible } });
  refresh();
}
export async function moveAffiliate(f: FormData) {
  await requireAdmin();
  const id = s(f, "id"), dir = s(f, "dir") === "up" ? -1 : 1;
  const all = await prisma.affiliate.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], select: { id: true } });
  const i = all.findIndex((b) => b.id === id), j = i + dir;
  if (i < 0 || j < 0 || j >= all.length) return;
  [all[i], all[j]] = [all[j], all[i]];
  await prisma.$transaction(all.map((b, k) => prisma.affiliate.update({ where: { id: b.id }, data: { sortOrder: k } })));
  refresh();
}
export async function deleteAffiliate(f: FormData) {
  await requireAdmin();
  const a = await prisma.affiliate.findUnique({ where: { id: s(f, "id") } }); if (!a) return;
  await prisma.affiliate.delete({ where: { id: a.id } });
  await deleteImage(a.logo); await deleteImage(a.banner);
  refresh();
  redirect(`/admin/affiliates?deleted=${encodeURIComponent(a.name)}`);
}
export async function setApplicationStatus(f: FormData) {
  await requireAdmin();
  const st = s(f, "status"); if (!["RECEIVED", "APPROVED", "DECLINED"].includes(st)) return;
  await prisma.affiliateApplication.update({ where: { id: s(f, "id") }, data: { status: st } }).catch(() => {});
  revalidatePath("/admin/affiliates");
}
