import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() { return [{ source: "/books", destination: "/discover", permanent: true }]; },
  images: { remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }] },
  experimental: { serverActions: { bodySizeLimit: "6mb" } },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;
