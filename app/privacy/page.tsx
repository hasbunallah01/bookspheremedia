import type { Metadata } from "next";
import { ValueGrid } from "@/components/about/AboutBlocks";
import {
  PrivacyHero,
  EditorialStandards,
  TermsOfParticipation,
  IPAndSecurity,
  PrivacyCTA,
} from "@/components/privacy/PrivacySections";
import { commitment, privacyPolicy, communityStandards } from "@/data/privacy";

export const metadata: Metadata = {
  title: "Privacy & Guidelines",
  description:
    "How Booksphere Media protects your information, works with authors, and maintains a professional, respectful, and secure platform — our commitment, privacy policy, community standards, and terms of participation.",
};

export default function PrivacyPage() {
  return (
    <>
      <PrivacyHero />
      <ValueGrid {...commitment} columns={5} background="white" />
      <ValueGrid {...privacyPolicy} columns={5} background="ivory" />
      <ValueGrid {...communityStandards} columns={3} background="white" />
      <EditorialStandards />
      <TermsOfParticipation />
      <IPAndSecurity />
      <PrivacyCTA />
    </>
  );
}
