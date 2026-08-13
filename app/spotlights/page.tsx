import type { Metadata } from "next";
import {
  SpotlightsHero,
  SpotlightProfiles,
} from "@/components/spotlights/SpotlightProfiles";

export const metadata: Metadata = {
  title: "Featured Spotlights",
  description:
    "Discover featured authors on Booksphere Media — including bestselling psychological thriller author Alison James and The Good Neighbour — with full profiles, stories, and links to explore each book.",
};

export default function SpotlightsPage() {
  return (
    <>
      <SpotlightsHero />
      <SpotlightProfiles />
    </>
  );
}
