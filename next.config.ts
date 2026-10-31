import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Production *.vercel.app aliases -> canonical domain (preview deployment URLs are not matched).
    const hosts = ["booksphere-seven.vercel.app", "booksphere-book-sphare.vercel.app", "booksphere-git-main-book-sphare.vercel.app"];
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
