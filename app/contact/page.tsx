import type { Metadata } from "next";
import { Twitter, Youtube, Facebook } from "lucide-react";
import { ContactSection } from "@/components/contact/ContactForm";
import { ContactHeader, ContactCards } from "@/components/contact/ContactSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Booksphere Media.",
};

const socialLinks = [
  { icon: Twitter, label: "Twitter / X", href: site.socials.twitter },
  { icon: Youtube, label: "YouTube", href: site.socials.youtube },
  { icon: Facebook, label: "Facebook", href: site.socials.facebook },
];

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
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="card-light group flex items-center gap-4 p-5 hover:shadow-card-hover"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bronze/30 bg-bronze/5 text-bronze transition group-hover:bg-bronze/10">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p className="text-xs text-charcoal/60">@bookspheremedia</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
