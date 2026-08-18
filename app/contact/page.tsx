import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactForm";
import { ContactHeader, ContactCards } from "@/components/contact/ContactSections";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Booksphere Media.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <ContactCards />
      <ContactSection />
    </>
  );
}
