/** Privacy & Guidelines page content. Edit copy here. */

export const privacyHero = {
  eyebrow: "Privacy & Guidelines",
  titleLead: "Built on Trust.",
  titleAccent: "Guided by Respect.",
  description:
    "Every meaningful partnership begins with trust. These policies explain how Booksphere Media protects your information, works with authors, and maintains a professional, respectful, and secure platform for our growing community.",
  cta: { label: "Contact Us", href: "/contact" },
  image: "/images/site/bookstack.webp",
  imageAlt: "Open book on a stack of books in warm light",
} as const;

export const commitment = {
  badge: "01",
  eyebrow: "Our Commitment",
  title: "The promises behind everything we do.",
  items: [
    {
      icon: "shield-check",
      title: "We Protect Your Information",
      description: "Your privacy and security are always our priority.",
    },
    {
      icon: "message-square",
      title: "Honest Communication",
      description: "Clear, respectful, and timely communication, always.",
    },
    {
      icon: "heart",
      title: "Respect for Every Author",
      description: "Every story, every author, and every voice matters.",
    },
    {
      icon: "badge-check",
      title: "Professional Standards",
      description: "Quality, integrity, and excellence in all we do.",
    },
    {
      icon: "sparkles",
      title: "Transparency",
      description: "Openness builds trust and lasting relationships.",
    },
  ],
} as const;

export const privacyPolicy = {
  badge: "02",
  eyebrow: "Privacy Policy",
  title: "How we handle your information.",
  items: [
    {
      icon: "user-round",
      title: "Information We Collect",
      description:
        "Author details, email, book information, biography, photos, website, and social media links you choose to share.",
    },
    {
      icon: "target",
      title: "Why We Collect It",
      description:
        "To review submissions, communicate with you, prepare interviews, and feature authors across our platform.",
    },
    {
      icon: "lock",
      title: "How Information Is Protected",
      description:
        "Secure storage, limited access, and professional handling. We never sell or share your information without permission.",
    },
    {
      icon: "clapperboard",
      title: "Media Usage",
      description:
        "Photos, recordings, and live conversations are used only for promotional purposes related to Booksphere Media.",
    },
    {
      icon: "badge-check",
      title: "Your Rights",
      description:
        "Request updates, corrections, or removal of your information at any time — just reach out.",
    },
  ],
} as const;

export const communityStandards = {
  badge: "03",
  eyebrow: "Community Standards",
  title: "How we treat one another.",
  items: [
    {
      icon: "handshake",
      title: "Professional Conduct",
      description: "Treat everyone with respect and kindness.",
    },
    {
      icon: "book-open",
      title: "Original Content",
      description: "Submit only work you own or have the rights to.",
    },
    {
      icon: "badge-check",
      title: "Accurate Information",
      description: "Provide honest, accurate information at all times.",
    },
    {
      icon: "message-square",
      title: "Respectful Communication",
      description: "Respond professionally and respectfully.",
    },
    {
      icon: "calendar-clock",
      title: "Scheduling Expectations",
      description: "Respect agreed schedules and deadlines.",
    },
    {
      icon: "users",
      title: "Fair Participation",
      description: "Collaborate positively and support others.",
    },
  ],
} as const;

export const editorialStandards = {
  badge: "04",
  eyebrow: "Editorial Standards",
  title: "How features are chosen.",
  points: [
    "Every submission is reviewed carefully by our team.",
    "Selection is based on quality and authenticity.",
    "Being featured is never guaranteed.",
    "Editorial decisions are final.",
  ],
  image: "/images/site/mic-mug.webp",
  imageAlt: "Studio microphone and Booksphere mug in warm light",
} as const;

export const termsOfParticipation = {
  badge: "05",
  eyebrow: "Terms of Participation",
  title: "What we ask of one another.",
  points: [
    "Information you provide is accurate and complete.",
    "You retain the rights to your work.",
    "You grant us permission to use submitted materials for promotion.",
    "Participation requires professionalism.",
    "Scheduled sessions should be honoured.",
  ],
} as const;

export const intellectualProperty = {
  badge: "06",
  eyebrow: "Intellectual Property",
  title: "Your work stays yours.",
  description:
    "Authors retain full ownership of all original work. By submitting, you grant Booksphere Media a non-exclusive promotional license to use your materials for live author spotlights, features, and related media — nothing more.",
} as const;

export const securityTrust = {
  badge: "07",
  eyebrow: "Security & Trust",
  title: "Staying safe with us.",
  points: [
    "Your information is stored securely.",
    "We communicate only through official Booksphere Media channels.",
    "Never send payments outside official Booksphere Media channels.",
    "Beware of impersonators — when in doubt, verify with our team.",
  ],
} as const;

export const privacyCta = {
  title: "Have Questions?",
  description:
    "Need clarification about our policies or guidelines? Our team is happy to help.",
  cta: { label: "Contact Us", href: "/contact" },
  image: "/images/site/book-coffee.webp",
  imageAlt: "Open book and coffee in warm morning light",
} as const;
