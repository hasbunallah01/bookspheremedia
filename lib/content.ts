import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/db";
import { genres } from "@/data/genres";
import { features } from "@/data/features";
import type { Book, Author } from "@/data/types";
// Data access layer. Books and authors live in the database (managed at /admin);
// genres and features are still static files.
export { genres, features };
export const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

const parse = <T,>(s: string | null | undefined, fb: T): T => { if (!s) return fb; try { return JSON.parse(s) as T; } catch { return fb; } };
const und = <T,>(v: T | null): T | undefined => (v === null ? undefined : v);

type BookRow = Awaited<ReturnType<typeof prisma.book.findMany<{ include: { author: true } }>>>[number];
export function toBook(r: BookRow): Book {
  return {
    slug: r.slug, title: r.title, subtitle: und(r.subtitle), series: und(r.series), seriesList: parse(r.seriesList, undefined),
    authorSlug: r.author.slug, authorName: r.coAuthors ? `${r.author.name} & ${r.coAuthors}` : r.author.name, coAuthors: und(r.coAuthors), genre: r.genre, tags: parse<string[]>(r.tags, []), hook: r.hook,
    description: parse<string[]>(r.description, []), cover: r.cover, realCover: r.realCover || undefined, coverPending: r.coverPending || undefined,
    tone: r.tone as Book["tone"], published: und(r.published), publisher: und(r.publisher), language: und(r.language), format: und(r.format),
    externalUrl: und(r.externalUrl), externalLabel: und(r.externalLabel), recognition: parse(r.recognition, undefined), coverQuote: parse(r.coverQuote, undefined),
    addedAt: r.addedAt, demo: r.demo, featured: r.featured,
  };
}

/** All visible books in admin-defined order. Cached per request. */
export const getBooks = cache(async (): Promise<Book[]> => !process.env.DATABASE_URL ? [] :
  (await prisma.book.findMany({ where: { visible: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], include: { author: true } })).map(toBook));

/** All authors in admin-defined order, each with the title of their first visible book. */
export const getAuthors = cache(async (): Promise<Author[]> => {
  if (!process.env.DATABASE_URL) return [];
  const [rows, bs] = await Promise.all([prisma.author.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }), getBooks()]);
  return rows.map((a) => ({
    slug: a.slug, name: a.name, genres: parse<string[]>(a.genres, []), bio: a.bio, journey: und(a.journey), photo: und(a.photo), website: und(a.website), demo: a.demo,
    firstBook: bs.find((b) => b.authorSlug === a.slug)?.title,
  }));
});

export const getBook = async (s: string) => (await getBooks()).find((b) => b.slug === s);
export const getAuthor = async (s: string) => (await getAuthors()).find((a) => a.slug === s);
export const booksBy = async (s: string) => (await getBooks()).filter((b) => b.authorSlug === s);
export const getFeatured = async () => (await getBooks()).find((b) => b.featured);
export const genreSlug = (name: string) => genres.find((g) => g.name === name)?.slug ?? "";
export const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");
