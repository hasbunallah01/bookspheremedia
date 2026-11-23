// Restore Book Sphere's database from the repo's own data files.
//
// The catalogue (authors, books, affiliate communities) lives in data/authors.ts,
// data/books.ts and prisma/seed.ts — the database is only a cache of it. If DATABASE_URL
// is missing from Vercel, or the Neon project was reset, this puts the site back.
//
//   DATABASE_URL='postgresql://...' node scripts/restore-db.mjs
//
// It is idempotent: seed.ts upserts by slug, so admin edits are never overwritten.
// It does NOT touch prisma/migrations — the schema is pushed, not migrated.
import { execFileSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Pass it as an environment variable and re-run.");
  process.exit(1);
}

// Prisma's schema also wants DIRECT_URL (the unpooled connection) for `db push`.
// Neon serves it on the same project with "-pooler" removed from the hostname.
if (!process.env.DIRECT_URL) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("-pooler")) {
      u.hostname = u.hostname.replace("-pooler", "");
      u.searchParams.delete("channel_binding");
      process.env.DIRECT_URL = u.toString();
      console.log("DIRECT_URL not set — derived it from DATABASE_URL.");
    }
  } catch { /* leave DIRECT_URL unset; prisma will report it */ }
}

const run = (label, cmd, args) => {
  console.log(`\n> ${label}`);
  execFileSync(cmd, args, { stdio: "inherit", env: process.env });
};

run("Pushing schema (creates missing tables, keeps existing rows)", "npx", ["prisma", "db", "push", "--skip-generate"]);
run("Seeding catalogue from data/authors.ts, data/books.ts and the affiliate list", "npx", ["tsx", "prisma/seed.ts"]);

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString: url }) });
try {
  const [authors, books, affiliates] = await Promise.all([
    prisma.author.count(),
    prisma.book.count(),
    prisma.affiliate.count(),
  ]);
  console.log("\nRestored row counts");
  console.log(`  authors            ${authors}`);
  console.log(`  books              ${books}`);
  console.log(`  affiliates         ${affiliates}`);
  console.log("  (genres and features are static files in data/, not database rows)");
  if (!authors || !books || !affiliates) {
    console.log("\nSome tables are still empty — check the seed output above.");
  } else {
    console.log("\nDone. Redeploy on Vercel to publish the restored site.");
  }
} finally {
  await prisma.$disconnect();
}
