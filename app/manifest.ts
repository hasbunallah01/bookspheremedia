import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Book Sphere", short_name: "Book Sphere",
    description: "A book club and literary platform for readers and authors.",
    start_url: "/", display: "standalone", background_color: "#F7F2EA", theme_color: "#1F2A44",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
