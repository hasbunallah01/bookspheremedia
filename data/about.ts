/**
 * All About-page content. Edit copy, images, icons, and stats here —
 * no component changes needed. Icon strings resolve via IconMap.
 */

export const aboutHero = {
  eyebrow: "About Us",
  title: "Honouring the voice behind every book.",
  description:
    "We are Booksphere Media — a platform for authors and readers to connect through live conversations, storytelling, and meaningful visibility.",
  primaryCta: { label: "Our Process", href: "#journey" },
  secondaryCta: { label: "Share Your Story", href: "/contact" },
  image: "/images/site/mic-mug.webp",
  imageAlt: "Studio microphone and Booksphere mug in warm light",
} as const;

export const ourStory = {
  badge: "01",
  eyebrow: "Our Story",
  title: "The story behind Booksphere Media.",
  paragraphs: [
    "Booksphere Media was created from a simple belief — every author has a story worth hearing, and every reader deserves the chance to discover it.",
    "We saw how many powerful stories remained unheard because authors didn't have the right platform. So we built a space where conversations matter, voices are amplified, and stories create real impact.",
    "We are more than a platform. We are a movement of storytellers, readers, and dreamers who believe in the power of words.",
  ],
  image: "/images/site/bookstack.webp",
  imageAlt: "Open book on a stack of books in warm light",
} as const;

export const whoWeAre = {
  badge: "02",
  eyebrow: "Who We Are",
  title: "We exist so the right story reaches the people who need to hear it.",
  paragraphs: [
    "We built Booksphere Media to bridge the gap between authors and readers through meaningful live conversations and visual storytelling.",
    "We are active, intentional, and deeply invested in the authors we feature. When you join Booksphere, our team works to present you to our audience in the most authentic and impactful way possible.",
    "Our community is growing, our conversations are real, and our commitment to amplifying author voices has never been stronger.",
  ],
  image: "/images/site/magic-book.webp",
  imageAlt: "Open book with floating story icons in warm light",
} as const;

export const whatWeBelieve = {
  badge: "03",
  eyebrow: "What We Believe",
  title: "The values that guide every conversation.",
  items: [
    {
      icon: "sparkles",
      title: "Every Story Deserves To Be Heard",
      description:
        "We celebrate real voices, real journeys, and real inspiration.",
    },
    {
      icon: "heart",
      title: "Relationships Matter More Than Promotion",
      description:
        "We honour every author, their story, and the message behind it.",
    },
    {
      icon: "mic",
      title: "Authentic Conversations",
      description:
        "We build bridges between authors and readers where true impact happens.",
    },
    {
      icon: "globe",
      title: "Global Community",
      description:
        "We nurture a growing family of storytellers and readers worldwide.",
    },
    {
      icon: "shield-check",
      title: "Respect For Authors",
      description:
        "We communicate honestly and maintain transparency in every step we take.",
    },
    {
      icon: "star",
      title: "Quality Over Quantity",
      description:
        "We love storytelling — and we take the craft behind it seriously.",
    },
  ],
} as const;

export const mission = {
  badge: "04",
  eyebrow: "Our Mission",
  title:
    "To elevate authors' voices and create meaningful connections through live conversations.",
  description:
    "We provide a platform that goes beyond promotion — one that honours their journey, amplifies the message, and connects authors with readers who are hungry for meaningful stories.",
  image: "/images/site/book-coffee.webp",
  imageAlt: "Open book and coffee in warm light",
} as const;

export const vision = {
  badge: "05",
  eyebrow: "Our Vision",
  title: "A world where every author finds their audience.",
  description:
    "We envision a global community where stories create connection, inspire change, and build a more understanding world.",
  image: "/images/site/two-mics.webp",
  imageAlt: "Two microphones and armchairs in a podcast studio",
} as const;

export const whatMakesUsDifferent = {
  badge: "06",
  eyebrow: "What Makes Us Different",
  title: "A media platform built around authors.",
  items: [
    {
      icon: "mic",
      title: "Live Author Spotlights",
      description:
        "Real-time conversations that let readers meet the person behind the book.",
    },
    {
      icon: "newspaper",
      title: "Editorial Storytelling",
      description:
        "Every feature is crafted with the care of a literary magazine.",
    },
    {
      icon: "badge-check",
      title: "Professional Presentation",
      description:
        "Your story is produced, framed, and delivered at broadcast quality.",
    },
    {
      icon: "users",
      title: "Reader Engagement",
      description:
        "We bring an audience that listens, asks, and genuinely cares.",
    },
    {
      icon: "handshake",
      title: "Community Driven",
      description:
        "Authors and readers grow together inside one supportive space.",
    },
    {
      icon: "trending-up",
      title: "Lasting Visibility",
      description:
        "Your feature lives on in our library for long-term discovery.",
    },
  ],
} as const;

export const journey = {
  badge: "07",
  eyebrow: "Meet the Experience",
  title: "The Booksphere journey.",
  steps: [
    {
      step: "01",
      icon: "user-plus",
      title: "Submit Author Kit",
      description: "Share your story and introduce your work.",
    },
    {
      step: "02",
      icon: "clipboard-check",
      title: "Editorial Review",
      description: "Our team carefully reviews your submission.",
    },
    {
      step: "03",
      icon: "clapperboard",
      title: "Creative Preparation",
      description: "We plan and prepare your live conversation.",
    },
    {
      step: "04",
      icon: "radio",
      title: "Live Author Spotlight",
      description: "You go live. Your story is shared with the world.",
    },
    {
      step: "05",
      icon: "book-open",
      title: "Become Part of the Booksphere Library",
      description: "Your feature lives on in our library for lasting impact.",
    },
  ],
} as const;

export const howWeWork = {
  badge: "08",
  eyebrow: "How We Work",
  title: "Care at every step of the process.",
  items: [
    {
      icon: "clipboard-check",
      title: "Review",
      description: "We review every submission with care and intention.",
    },
    {
      icon: "message-square",
      title: "Communication",
      description: "We stay in touch and align things clearly.",
    },
    {
      icon: "calendar-clock",
      title: "Scheduling",
      description: "We set a time that works for everyone.",
    },
    {
      icon: "radio",
      title: "Live Broadcast",
      description: "We go live and share your conversation.",
    },
    {
      icon: "megaphone",
      title: "Post-Feature Promotion",
      description: "Your story lives on after the live conversation.",
    },
  ],
} as const;

export const authorChecklist = {
  badge: "09",
  eyebrow: "What We Ask From Every Author",
  title: "A simple standard we all share.",
  items: [
    "Original published work",
    "Professional communication",
    "Complete Author Kit",
    "Respect for scheduling",
    "Accurate information",
    "Willingness to participate",
    "Positive collaboration",
  ],
  image: "/images/site/magic-book.webp",
  imageAlt: "Open book with floating story icons in warm light",
} as const;

export const editorialStandards = {
  badge: "10",
  eyebrow: "Editorial Standards",
  title: "Held to the highest standard.",
  description:
    "Every feature is reviewed with care and intention. We uphold the highest standards of quality, professionalism, respect, authenticity, honesty, and transparency.",
  values: [
    "Quality",
    "Respect",
    "Authenticity",
    "Transparency",
    "Professionalism",
  ],
} as const;

export const rules = {
  badge: "11",
  eyebrow: "Rules & Regulations",
  title: "Clear guidelines, mutual respect.",
  items: [
    {
      icon: "mic",
      title: "Professional Conduct",
      description:
        "Every conversation is held with courtesy and professionalism.",
    },
    {
      icon: "book-open",
      title: "Original Content",
      description: "Only original published work is featured on our platform.",
    },
    {
      icon: "heart",
      title: "Respect",
      description: "We treat every author, reader, and story with dignity.",
    },
    {
      icon: "calendar-clock",
      title: "Scheduling",
      description: "Confirmed times are honoured by both sides.",
    },
    {
      icon: "message-square",
      title: "Communication",
      description: "Clear, timely communication keeps every feature on track.",
    },
    {
      icon: "clapperboard",
      title: "Media Usage",
      description:
        "Recorded features may be shared across Booksphere channels.",
    },
    {
      icon: "badge-check",
      title: "Accuracy",
      description: "All author and book information must be accurate.",
    },
    {
      icon: "lock",
      title: "Privacy",
      description: "Personal information is protected and never sold.",
    },
  ],
} as const;

export const gallery = {
  badge: "12",
  eyebrow: "Behind the Spotlight",
  title: "The atmosphere behind every story.",
  images: [
    {
      src: "/images/site/mic-mug.webp",
      alt: "Studio microphone and Booksphere mug in warm light",
    },
    {
      src: "/images/site/bookstack.webp",
      alt: "Open book on a stack of books in warm light",
    },
    {
      src: "/images/site/two-mics.webp",
      alt: "Two microphones and armchairs in a podcast studio",
    },
    {
      src: "/images/site/book-coffee.webp",
      alt: "Open book and coffee in warm light",
    },
    {
      src: "/images/site/magic-book.webp",
      alt: "Open book with floating story icons in warm light",
    },
  ],
} as const;

export const whyChooseUs = {
  badge: "13",
  eyebrow: "Why Authors Choose Booksphere Media",
  title: "Built for authors, loved by readers.",
  items: [
    {
      icon: "badge-check",
      title: "Professional Presentation",
      description: "Broadcast-quality features that honour your work.",
    },
    {
      icon: "mic",
      title: "Human Conversations",
      description: "Real dialogue — never scripted marketing.",
    },
    {
      icon: "trending-up",
      title: "Growing Audience",
      description: "A community of readers that expands every month.",
    },
    {
      icon: "newspaper",
      title: "Editorial Quality",
      description: "Literary-magazine standards in every feature.",
    },
    {
      icon: "sparkles",
      title: "Authentic Storytelling",
      description: "Your voice, your journey, told truthfully.",
    },
    {
      icon: "book-open",
      title: "Long-Term Visibility",
      description: "Features stay discoverable in the Booksphere library.",
    },
  ],
} as const;

export const communityStats = {
  badge: "14",
  eyebrow: "Our Community",
  title: "A growing global family of storytellers.",
  stats: [
    { value: "250+", label: "Authors Featured" },
    { value: "40+", label: "Countries Reached" },
    { value: "150K+", label: "Readers Engaged" },
    { value: "180+", label: "Live Conversations" },
    { value: "350+", label: "Stories Shared" },
    { value: "25K+", label: "Community Growth" },
  ],
} as const;

export const aboutCta = {
  title: "Your story can inspire more than you know.",
  description:
    "Join the next live author spotlight and share your message with the world.",
  primaryCta: { label: "Share Your Story", href: "https://form.jotform.com/261917650330050" },
  secondaryCta: { label: "Contact Us", href: "/contact" },
  image: "/images/site/book-coffee.webp",
  imageAlt: "Open book and coffee in warm morning light",
} as const;
