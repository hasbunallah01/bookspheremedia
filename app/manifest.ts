import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Book Sphere", short_name: "Book Sphere",
    description: "A book club and literary platform for readers and authors.",
    start_url: "/", display: "standalone", background_color: "#F7F2EA", theme_color: "#1B2233",
    icons: [{ src: "/brand/icon-v3.svg?v=3", sizes: "any", type: "image/svg+xml" }, { src: "/brand/icon-192.png?v=3", sizes: "192x192", type: "image/png" }, { src: "/brand/icon-512.png?v=3", sizes: "512x512", type: "image/png" }],
  };
}
