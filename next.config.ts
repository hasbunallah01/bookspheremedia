import type { NextConfig } from "next";

// A missing DATABASE_URL makes every list query return [] (see lib/content.ts and
// lib/affiliates.ts), which publishes a completely empty site with no error at all.
// Fail the production build loudly instead of shipping an empty catalogue.
if (process.env.VERCEL_ENV === "production" && !process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set for this Vercel environment. Without it every list query " +
    "returns [], so this build would publish an empty site. Add the DATABASE_URL env var " +
    "(production target) and redeploy."
  );
}

const nextConfig: NextConfig = {
  async redirects() {
    // Production *.vercel.app aliases -> canonical domain (preview deployment URLs are not matched).
    const hosts = [
      "bookspheremedia-hasbunallah.vercel.app",
      "bookspheremedia-git-main-hasbunallah.vercel.app",
      "booksphere-seven.vercel.app",
      "booksphere-book-sphare.vercel.app",
      "booksphere-git-main-book-sphare.vercel.app",
    ];
    return [
      ...hosts.map((value) => ({ source: "/:path*", has: [{ type: "host" as const, value }], destination: "https://bookspheremedia.website/:path*", permanent: true })),
      { source: "/books", destination: "/discover", permanent: true },
    ];
  },
  images: { remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }] },
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
