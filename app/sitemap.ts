import type { MetadataRoute } from "next";
import { getBooks, getAuthors, SITE_URL } from "@/lib/content";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, authors] = await Promise.all([getBooks(), getAuthors()]);
  const s = ["", "/discover", "/authors", "/genres", "/about", "/founder", "/join", "/affiliates", "/submit", "/contact", "/faq", "/privacy", "/terms"];
  return [...s, ...books.map((b) => `/books/${b.slug}`), ...authors.map((a) => `/authors/${a.slug}`)].map((p) => ({ url: SITE_URL + p }));
}
