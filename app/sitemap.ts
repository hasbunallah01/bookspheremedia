import type { MetadataRoute } from "next";
import { getBooks, getAuthors, SITE_URL } from "@/lib/content";

// /admin and /features (noindex) are intentionally excluded. Spotlights, conversations and
// affiliate communities are listed on their own index pages (no per-item routes exist).
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, authors] = await Promise.all([getBooks(), getAuthors()]);
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"], ["/discover", 0.9, "weekly"], ["/authors", 0.9, "weekly"], ["/spotlights", 0.8, "weekly"], ["/conversations", 0.8, "weekly"],
    ["/genres", 0.7, "monthly"], ["/affiliates", 0.7, "monthly"], ["/about", 0.7, "monthly"], ["/founder", 0.6, "monthly"], ["/join", 0.6, "monthly"],
    ["/submit", 0.6, "monthly"], ["/contact", 0.5, "yearly"], ["/faq", 0.5, "monthly"], ["/privacy", 0.3, "yearly"], ["/terms", 0.3, "yearly"],
  ];
  return [
    ...pages.map(([p, priority, changeFrequency]) => ({ url: SITE_URL + p, lastModified: now, changeFrequency, priority })),
    ...books.map((b) => ({ url: `${SITE_URL}/books/${b.slug}`, lastModified: b.addedAt && !isNaN(Date.parse(b.addedAt)) ? new Date(b.addedAt) : now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...authors.map((a) => ({ url: `${SITE_URL}/authors/${a.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
