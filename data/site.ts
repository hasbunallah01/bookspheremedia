export const site = {
  name: "Booksphere Media",
  tagline: "A Home for Storytellers",
  description:
    "Booksphere Media brings powerful stories to life through live interviews, visual storytelling, and meaningful connection between authors and readers.",
  url: "https://bookspheremedia.online",
  email: "hello@bookspheremedia.online",
  phone: "",
  address: "",
  hours: "Mon – Fri · 9:00 – 18:00 (UTC)",
  socials: {
    twitter: "https://twitter.com/bookspheremedia",
    facebook: "https://www.facebook.com/share/1CtEHvGnTj/",
    youtube: "https://youtube.com/@bookspheremedia",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Live Conversations", href: "/conversations" },
    { label: "Featured Spotlight", href: "/spotlights" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "What We Do", href: "/#what-we-do" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Conversations", href: "/conversations" },
    ],
    resources: [
      { label: "Author Kit", href: "/contact" },
      { label: "Interview Tips", href: "/#faq" },
      { label: "FAQ", href: "/#faq" },
      { label: "Events", href: "/conversations" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "Submit Your Story", href: "https://form.jotform.com/261917650330050" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
} as const;
