import type { Metadata } from "next";
import { Facebook } from "lucide-react";
import { ContactSection } from "@/components/contact/ContactForm";
import { ContactHeader, ContactCards } from "@/components/contact/ContactSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

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

      {/* Elsewhere online */}
      <section className="section bg-ivory">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Find us"
            title="Elsewhere online"
            subtitle="Follow the conversation on the platforms where readers actually live."
          />
          <div className="mt-12 flex justify-center">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="card-light group flex h-20 w-20 items-center justify-center p-5 hover:shadow-card-hover"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-bronze/30 bg-bronze/5 text-bronze transition group-hover:bg-bronze/10">
                <Facebook className="h-7 w-7" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
