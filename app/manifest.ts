import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Booksphere Media",
    short_name: "Booksphere",
    description:
      "A premium media platform connecting authors and readers through live conversations and editorial storytelling.",
    start_url: "/",
    display: "standalone",
    background_color: "#14120E",
    theme_color: "#23463F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
