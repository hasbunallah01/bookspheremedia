import type { Metadata } from "next";
import {
  EditorialSplit,
  ValueGrid,
} from "@/components/about/AboutBlocks";
import {
  AboutHero,
  MissionVision,
  Journey,
  AuthorChecklist,
  EditorialStandards,
  SpotlightGallery,
  AboutCTA,
} from "@/components/about/AboutSections";
import { FAQPreview } from "@/components/home/FAQPreview";
import {
  ourStory,
  whoWeAre,
  whatWeBelieve,
  whatMakesUsDifferent,
  howWeWork,
  rules,
  whyChooseUs,
} from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, mission, values, and standards behind Booksphere Media — a premium media platform connecting authors and readers through live conversations and editorial storytelling.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Our Story */}
      <EditorialSplit {...ourStory} imageSide="left" background="white" />

      {/* 3. Who We Are */}
      <EditorialSplit {...whoWeAre} imageSide="right" background="ivory" />

      {/* 4. What We Believe */}
      <ValueGrid {...whatWeBelieve} columns={3} background="white" />

      {/* 5 + 6. Our Mission & Our Vision */}
      <MissionVision />

      {/* 7. What Makes Us Different */}
      <ValueGrid {...whatMakesUsDifferent} columns={3} background="white" />

      {/* 8. Meet the Experience — timeline */}
      <Journey />

      {/* 9. How We Work */}
      <ValueGrid {...howWeWork} columns={5} background="white" />

      {/* 10. What We Ask From Every Author */}
      <AuthorChecklist />

      {/* 11. Editorial Standards */}
      <EditorialStandards />

      {/* 12. Rules & Regulations */}
      <ValueGrid {...rules} columns={4} background="white" />

      {/* 13. FAQ — same accordion as homepage */}
      <FAQPreview />

      {/* 14. Behind the Spotlight */}
      <SpotlightGallery />

      {/* 15. Why Authors Choose Booksphere Media */}
      <ValueGrid {...whyChooseUs} columns={3} background="ivory" />

      {/* 17. Closing CTA */}
      <AboutCTA />
    </>
  );
}
