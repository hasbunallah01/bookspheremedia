import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Booksphere Media",
    short_name: "Booksphere",
    description:
      "A premium media platform connecting authors and readers through live conversations and editorial storytelling.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F4ED",
    theme_color: "#5A1F2B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
