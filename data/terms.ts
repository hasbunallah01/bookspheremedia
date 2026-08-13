/** Terms & Conditions page content. Edit copy here. */

export const termsHero = {
  eyebrow: "Terms & Conditions",
  title: "Terms & Conditions",
  description:
    "These Terms & Conditions explain the responsibilities, expectations, and agreements that apply when using Booksphere Media. By accessing our website, submitting your information, or participating in our services, you agree to these terms.",
  cta: { label: "Need Help? Contact Us", href: "/contact" },
  image:
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&w=1400&q=80",
  imageAlt: "Notebook, pen, and a cup beside books in warm light",
} as const;

export interface TermItem {
  number: string;
  icon: string;
  title: string;
  description: string;
  points?: string[];
}

export const termsSections: TermItem[] = [
  {
    number: "01",
    icon: "badge-check",
    title: "Acceptance of These Terms",
    description:
      "By visiting our website, submitting an Author Kit, or participating in interviews, you agree to these Terms & Conditions.",
  },
  {
    number: "02",
    icon: "users",
    title: "Who Can Use Booksphere Media",
    description:
      "Our platform is designed for authors, readers, publishers, literary professionals, and visitors using it lawfully and in good faith.",
  },
  {
    number: "03",
    icon: "sparkles",
    title: "Author Responsibilities",
    description: "As an author working with us, you agree to:",
    points: [
      "Submit accurate information",
      "Submit original work",
      "Respect schedules",
      "Communicate professionally",
      "Cooperate throughout the review process",
    ],
  },
  {
    number: "04",
    icon: "shield-check",
    title: "Booksphere Media Responsibilities",
    description: "In return, we are committed to:",
    points: [
      "Reviewing submissions fairly",
      "Treating authors respectfully",
      "Maintaining professionalism",
      "Protecting submitted information",
      "Communicating honestly",
    ],
  },
  {
    number: "05",
    icon: "clipboard-check",
    title: "Editorial Review Process",
    description:
      "Every submission is reviewed carefully. Selection is based on quality, authenticity, and suitability. Acceptance is never guaranteed, and editorial decisions are final.",
  },
  {
    number: "06",
    icon: "mic",
    title: "Live Interviews & Media Features",
    description:
      "If selected, your participation may include live interviews, recorded sessions, photography, promotional graphics, website features, and social media promotion.",
  },
  {
    number: "07",
    icon: "book-open",
    title: "Intellectual Property",
    description:
      "You retain full ownership of your books and original work. By submitting materials, you grant Booksphere Media a non-exclusive promotional licence to use them for interviews and promotion only.",
  },
  {
    number: "08",
    icon: "badge-check",
    title: "Payments (If Applicable)",
    description:
      "Some services may require payment. Details always come through official Booksphere Media channels — never send money to unofficial accounts. Fees are non-refundable unless otherwise stated.",
  },
  {
    number: "09",
    icon: "calendar-clock",
    title: "Cancellations & Scheduling",
    description:
      "Please notify our team as early as possible. Last-minute cancellations may affect future opportunities, so please respect scheduled interview times.",
  },
  {
    number: "10",
    icon: "handshake",
    title: "Acceptable Use",
    description: "You agree not to:",
    points: [
      "Submit false information",
      "Harass others",
      "Upload illegal material",
      "Attempt fraud",
      "Abuse the platform",
      "Disrupt the website",
    ],
  },
  {
    number: "11",
    icon: "globe",
    title: "External Links",
    description:
      "We may link to third-party sites such as Amazon, YouTube, social media, and partner websites. We're not responsible for their content or policies.",
  },
  {
    number: "12",
    icon: "scale",
    title: "Limitation of Liability",
    description:
      "We work hard to provide reliable services, but can't guarantee uninterrupted access or be held responsible for third-party issues beyond our control.",
  },
  {
    number: "13",
    icon: "sparkles",
    title: "Updates to These Terms",
    description:
      "We may update these Terms occasionally. Continued use of the website means you accept the latest version.",
  },
  {
    number: "14",
    icon: "mail",
    title: "Contact Us",
    description:
      "Have questions about these terms? We're happy to help — reach out any time at hello@bookspheremedia.online.",
  },
];

export const termsCta = {
  title: "Our goal is simple.",
  description:
    "To build lasting relationships founded on trust, professionalism, integrity, and a shared passion for storytelling.",
  cta: {
    label: "Join Our Community",
    href: "https://form.jotform.com/261917650330050",
  },
  image:
    "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1000&q=80",
  imageAlt: "Open book and reading glasses in warm light",
} as const;
