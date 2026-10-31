"use server";
import { prisma } from "@/lib/db";
import { savePrivateUpload, type ImageExt } from "@/lib/storage";

export type FormState = { status: "idle" | "success" | "error"; message?: string; errors?: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (f: FormData, k: string, max = 5000) => String(f.get(k) ?? "").trim().slice(0, max);
const opt = (f: FormData, k: string, max = 500) => str(f, k, max) || null;
const isUrl = (v: string) => { try { const u = new URL(v); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; } };

// Simple in-memory rate limit per process (replace with a shared store such as Redis in production).
const hits = new Map<string, number[]>();
function limited(key: string, max = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(key, arr);
  return arr.length > max;
}

const MAX_COVER = 5 * 1024 * 1024;
function sniff(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}

export async function submitBook(_: FormState, f: FormData): Promise<FormState> {
  if (str(f, "website_hp")) return { status: "success" }; // honeypot: silently drop bots
  const e: Record<string, string> = {};
  const req = { authorName: "Please enter the author's full name.", email: "Please enter your email address.", authorBio: "Please add a short author biography.", bookTitle: "Please enter the book title.", primaryGenre: "Please choose a primary genre.", description: "Please add a book description.", isPublished: "Please tell us whether the book is already published." };
  for (const [k, m] of Object.entries(req)) if (!str(f, k)) e[k] = m;
  const email = str(f, "email", 200);
  if (email && !EMAIL.test(email)) e.email = "Please enter a valid email address, for example name@example.com.";
  for (const k of ["authorWebsite", "profileLink", "purchaseLink", "officialBookPage"]) { const v = str(f, k); if (v && !isUrl(v)) e[k] = "Please enter a full web address beginning with https://"; }
  if (f.get("rightsConsent") !== "on") e.rightsConsent = "Please confirm you are authorised to submit this book.";
  const file = f.get("cover");
  let cover: { buf: Buffer; ext: string } | null = null;
  if (!(file instanceof File) || file.size === 0) e.cover = "Please upload a cover image (JPG, PNG or WebP, up to 5 MB).";
  else if (file.size > MAX_COVER) e.cover = "The cover image must be 5 MB or smaller.";
  else {
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = sniff(buf);
    if (!ext) e.cover = "The cover must be a JPG, PNG or WebP image.";
    else cover = { buf, ext };
  }
  if (Object.keys(e).length) return { status: "error", message: "Please correct the highlighted fields.", errors: e };
  const started = Number(f.get("started") ?? 0);
  if (started && Date.now() - started < 3000) return { status: "error", message: "That was very quick. Please review the form and try again." };
  if (limited("submit:" + email)) return { status: "error", message: "Too many submissions in a short time. Please try again later." };
  try {
    let coverPath: string | null = null;
    if (cover) {
      coverPath = await savePrivateUpload(cover.buf, cover.ext as ImageExt);
    }
    await prisma.bookSubmission.create({ data: {
      authorName: str(f, "authorName", 200), email, authorWebsite: opt(f, "authorWebsite"), profileLink: opt(f, "profileLink"), country: opt(f, "country", 100),
      authorBio: str(f, "authorBio"), bookTitle: str(f, "bookTitle", 300), subtitle: opt(f, "subtitle", 300), primaryGenre: str(f, "primaryGenre", 100), secondaryGenre: opt(f, "secondaryGenre", 100),
      description: str(f, "description", 8000), publicationDate: opt(f, "publicationDate", 40), publisher: opt(f, "publisher", 200), isbn: opt(f, "isbn", 40), language: opt(f, "language", 80), format: opt(f, "format", 80),
      coverPath, purchaseLink: opt(f, "purchaseLink"), officialBookPage: opt(f, "officialBookPage"), whyInclude: opt(f, "whyInclude", 3000),
      isPublished: str(f, "isPublished") === "yes", expectedPubDate: opt(f, "expectedPubDate", 40), featureInterest: f.get("featureInterest") === "on",
      rightsConsent: true, promotionalConsent: f.get("promotionalConsent") === "on",
    } });
    return { status: "success" };
  } catch (err) {
    console.error("submitBook failed", err);
    return { status: "error", message: "We couldn't save your submission just now. Nothing was submitted. Please try again shortly." };
  }
}

export async function applyAffiliate(_: FormState, f: FormData): Promise<FormState> {
  if (str(f, "website_hp")) return { status: "success" };
  const e: Record<string, string> = {};
  const communityName = str(f, "communityName", 200), contactName = str(f, "contactName", 200), email = str(f, "email", 200), link = str(f, "link", 1000), description = str(f, "description", 3000);
  if (!communityName) e.communityName = "Please enter your community's name.";
  if (!contactName) e.contactName = "Please enter your name.";
  if (!email) e.email = "Please enter your email address."; else if (!EMAIL.test(email)) e.email = "Please enter a valid email address, for example name@example.com.";
  if (!link) e.link = "Please add a link to your community."; else if (!isUrl(link)) e.link = "Please enter a full web address beginning with https://";
  if (description.length < 20) e.description = "Please describe your community in at least 20 characters.";
  const file = f.get("logo");
  let logo: { buf: Buffer; ext: string } | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_COVER) e.logo = "The logo must be 5 MB or smaller.";
    else { const buf = Buffer.from(await file.arrayBuffer()); const ext = sniff(buf); if (!ext) e.logo = "The logo must be a JPG, PNG or WebP image."; else logo = { buf, ext }; }
  }
  if (Object.keys(e).length) return { status: "error", message: "Please correct the highlighted fields.", errors: e };
  const started = Number(f.get("started") ?? 0);
  if (started && Date.now() - started < 3000) return { status: "error", message: "That was very quick. Please review the form and try again." };
  if (limited("affiliate:" + email)) return { status: "error", message: "Too many applications in a short time. Please try again later." };
  try {
    let logoPath: string | null = null;
    if (logo) {
      logoPath = await savePrivateUpload(logo.buf, logo.ext as ImageExt);
    }
    await prisma.affiliateApplication.create({ data: { communityName, contactName, email, link, description, logoPath } });
    return { status: "success" };
  } catch (err) {
    console.error("applyAffiliate failed", err);
    return { status: "error", message: "We couldn't save your application just now. Please try again shortly." };
  }
}

export async function sendContact(_: FormState, f: FormData): Promise<FormState> {
  if (str(f, "website_hp")) return { status: "success" };
  const e: Record<string, string> = {};
  const name = str(f, "name", 200), email = str(f, "email", 200), subject = str(f, "subject", 100), message = str(f, "message", 5000);
  if (!name) e.name = "Please enter your name.";
  if (!email) e.email = "Please enter your email address."; else if (!EMAIL.test(email)) e.email = "Please enter a valid email address.";
  if (!subject) e.subject = "Please choose a subject.";
  if (message.length < 10) e.message = "Please write a message of at least 10 characters.";
  if (f.get("consent") !== "on") e.consent = "Please confirm how your message will be used.";
  if (Object.keys(e).length) return { status: "error", message: "Please correct the highlighted fields.", errors: e };
  if (limited("contact:" + email)) return { status: "error", message: "Too many messages in a short time. Please try again later." };
  try {
    await prisma.contactMessage.create({ data: { name, email, subject, message } });
    return { status: "success" };
  } catch (err) {
    console.error("sendContact failed", err);
    return { status: "error", message: "We couldn't save your message just now. Please try again shortly." };
  }
}
