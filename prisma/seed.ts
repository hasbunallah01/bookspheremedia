// One-time import of the original data/books.ts + data/authors.ts records into the database.
// Idempotent: existing rows (matched by slug) are left untouched so admin edits are never overwritten.
import { PrismaClient } from "@prisma/client";
import { books } from "../data/books";
import { authors } from "../data/authors";
const prisma = new PrismaClient();
const j = (v: unknown) => (v === undefined ? null : JSON.stringify(v));
async function main() {
  const ids = new Map<string, string>();
  for (const [i, a] of authors.entries()) {
    const row = await prisma.author.upsert({ where: { slug: a.slug }, update: {}, create: {
      slug: a.slug, name: a.name, genres: JSON.stringify(a.genres), bio: a.bio, journey: a.journey ?? null, photo: a.photo ?? null, website: a.website ?? null, demo: a.demo, sortOrder: i,
    } });
    ids.set(a.slug, row.id);
  }
  for (const [i, b] of books.entries()) {
    await prisma.book.upsert({ where: { slug: b.slug }, update: {}, create: {
      slug: b.slug, title: b.title, subtitle: b.subtitle ?? null, series: b.series ?? null, coAuthors: b.coAuthors ?? null, seriesList: j(b.seriesList), authorId: ids.get(b.authorSlug)!,
      genre: b.genre, tags: JSON.stringify(b.tags ?? []), hook: b.hook, description: JSON.stringify(b.description), cover: b.cover, realCover: !!b.realCover, coverPending: !!b.coverPending,
      tone: b.tone, published: b.published ?? null, publisher: b.publisher ?? null, language: b.language ?? null, format: b.format ?? null,
      externalUrl: b.externalUrl ?? null, externalLabel: b.externalLabel ?? null, recognition: j(b.recognition), coverQuote: j(b.coverQuote),
      addedAt: b.addedAt, demo: b.demo, featured: b.slug === "10-04", visible: true, sortOrder: i,
    } });
  }
  const affs = [
    { slug: "the-reading-troop-club", name: "The Reading Troop Club", tagline: "Books. Authors. Stories that stay.", description: "Where authors get spotlighted and readers find their next favorite book.", link: "https://www.facebook.com/share/1dJpFsp8Kt/", logo: "/affiliates/reading-troop-club-logo.webp", banner: "/affiliates/reading-troop-club-banner.webp" },
    { slug: "share-a-book-meet-a-friend", name: "Share a Book, Meet a Friend", tagline: "Read · Connect · Share", description: "A community for people who genuinely love reading. Discover new books, share thoughts & connect with real readers.", link: "https://www.facebook.com/share/19mNwawTrn/", logo: "/affiliates/share-a-book-logo.webp", banner: "/affiliates/share-a-book-banner.webp" },
    { slug: "hidy-book-discoveries", name: "Hidy Book Discoveries", tagline: "Discover your next favorite book", description: "Book reviews, recommendations and author features. Authors & publishers welcome.", link: "https://www.facebook.com/share/1JtDuy7EhS/", logo: null, banner: "/affiliates/hidy-banner.webp" },
    { slug: "the-book-crew-readers-community", name: "The Book Crew Readers Community", description: "A readers community on Facebook", link: "https://www.facebook.com/share/1FAnRkhyBP/", logo: "/affiliates/book-crew-logo.webp", banner: "/affiliates/book-crew-banner.webp" },
  ];
  for (const [i, a] of affs.entries()) await prisma.affiliate.upsert({ where: { slug: a.slug }, update: {}, create: { ...a, sortOrder: i } });
  console.log(`Seeded ${authors.length} authors, ${books.length} books`);
}
main().finally(() => prisma.$disconnect());
