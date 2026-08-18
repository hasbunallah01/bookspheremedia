/** Contact page content — edit copy here, no component changes needed. */

export const contactHeader = {
  eyebrow: "Contact",
  titleLead: "Let's start a",
  titleAccent: "conversation",
  description:
    "Whether you're an author with a story to tell, a reader with a question, or a partner with an idea — we'd love to hear from you.",
} as const;

export const contactCards = [
  {
    icon: "mail",
    title: "Email",
    body: "hello@bookspheremedia.website",
    href: "mailto:hello@bookspheremedia.website",
  },
  {
    icon: "megaphone",
    title: "Press & partnerships",
    body: "press@bookspheremedia.website",
    href: "mailto:press@bookspheremedia.website",
  },
] as const;

export const contactFormCopy = {
  eyebrow: "Contact",
  title: "Get in touch",
  subtitle:
    "Feel free to reach out to us for any inquiries or assistance. We usually reply within 1–2 business days.",
} as const;
