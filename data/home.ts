/**
 * Homepage content — edit this file to change homepage copy,
 * stats, steps and testimonials without touching components.
 */

export const hero = {
  eyebrow: "Live Conversations. Real Stories. Lasting Impact.",
  title: "Where Authors Are Heard and Readers Connect",
  description:
    "Booksphere Media brings powerful stories to life through live interviews, visual storytelling, and meaningful connection.",
  primaryCta: { label: "Join Our Community", href: "/contact" },
  secondaryCta: { label: "View Us Live", href: "https://youtube.com/@bookspheremedia" },
  image:
    "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80",
  imageAlt: "Studio microphone beside stacked books in warm light",
} as const;

export const stats = [
  { value: 2500, suffix: "+", label: "Authors Featured" },
  { value: 50000, suffix: "+", label: "Readers Engaged" },
  { value: 300, suffix: "+", label: "Live Interviews" },
  { value: 100, suffix: "+", label: "Countries" },
] as const;

export const communityAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
] as const;

export const whyBooksphere = {
  title: "Why Booksphere Media",
  image:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80",
  imageAlt: "Books arranged on a sunlit desk beside a plant",
  items: [
    {
      icon: "heart",
      title: "Our Mission",
      description:
        "To elevate authors' voices and create meaningful connections through live conversations.",
    },
    {
      icon: "target",
      title: "Our Purpose",
      description:
        "To inspire, engage, and build a supportive community where stories create real impact.",
    },
    {
      icon: "users",
      title: "Our Introduction",
      description:
        "We are a media platform dedicated to authors, readers, and the power of storytelling.",
    },
  ],
} as const;

export const whatWeDo = [
  {
    icon: "mic",
    title: "Live Author Spotlight",
    description: "We feature authors in live, engaging interviews.",
  },
  {
    icon: "clapperboard",
    title: "Visual Storytelling",
    description: "We create beautiful visuals that bring stories to life.",
  },
  {
    icon: "megaphone",
    title: "Author Promotion",
    description: "We help authors reach more readers.",
  },
  {
    icon: "handshake",
    title: "Community Engagement",
    description: "We build meaningful connections.",
  },
  {
    icon: "newspaper",
    title: "Media Features",
    description: "We highlight authors across platforms.",
  },
] as const;

export interface Spotlight {
  authorName: string;
  authorTitle: string;
  authorPhoto: string;
  /** Contact Author button target — social profile, email (mailto:), etc. */
  contactUrl: string;
  banner: string;
  bannerAlt: string;
  bookTitle: string;
  bookCover: string;
  tagline: string;
  genres: string[];
  /** Short 2–3 sentence homepage summary. */
  description: string;
  publishedDate: string;
  language: string;
  pages: string;
  /** "#" renders the button disabled until the page exists. */
  learnMoreUrl: string;
  buyUrl: string;
  /** Full profile (/spotlights) — entries without these show homepage-only. */
  fullDescription?: string[];
  bookQuote?: string[];
  aboutAuthor?: string[];
}

/** Featured Spotlight carousel + full profiles. One object per author. */
export const spotlights: Spotlight[] = [
  {
    authorName: "Clara Virginia White",
    authorTitle: "Author, The Gracetown Novels",
    authorPhoto: "/images/clara-virginia-white-avatar.jpg",
    contactUrl: "https://www.instagram.com/claravirginiawhite",
    banner: "/images/clara-virginia-white-banner.jpg",
    bannerAlt:
      "Book Club Spotlight banner for Clara Virginia White and her novel Where the Bells Still Ring",
    bookTitle: "Where the Bells Still Ring",
    bookCover: "/images/clara-virginia-white-cover.jpg",
    tagline:
      "A small-town story about courage, community, and the clear note of enduring hope.",
    genres: [
      "Contemporary Fiction",
      "Literary Fiction",
      "Small-Town & Rural Fiction",
    ],
    description:
      "Bitsy Mitchell has spent her life holding Gracetown together — until the town, her marriage, and a little girl waiting to be noticed all begin slipping through her hands. A quietly powerful small-town Southern story about courage, community, and enduring hope.",
    publishedDate: "March 25, 2026",
    language: "English",
    pages: "354 pages",
    learnMoreUrl: "https://www.claravirginiawhite.com",
    buyUrl:
      "https://www.amazon.com/Where-Bells-Still-Ring-small-town-ebook/dp/B0GPML6JXC/ref=s",
    fullDescription: [
      "Bitsy Mitchell has built her life around being the person everyone depends on. She keeps the nursery schedule straight, assures Reverend Goodheart that his sermons landed, and smooths small frictions before they turn into lasting wounds. Looking after people is what she does.",
      "In Gracetown, North Carolina, that kind of quiet care matters. Much of the town's life gathers at First Methodist Church. Gwen's newsletters grow longer and more cheerful every month. The handbell choir rehearses every Wednesday night. People show up with casseroles, concerns, and the quiet expectation that someone will notice if they don't.",
      "Bitsy has always been that someone.",
      "But lately the life she helps hold together is beginning to loosen at the seams. Church attendance is thinning. Her husband, Jeffrey, has grown increasingly distant. And week after week, a seven-year-old girl named Eden waits in an empty room long after every other child has been picked up.",
      "Bitsy knows how to keep things running smoothly. She is good at it. So why, all at once, does everything feel as if it's slipping through her hands?",
    ],
    bookQuote: [
      "Quietly powerful, Where the Bells Still Ring is a small-town Southern story about courage, community, and the clear note of enduring hope.",
    ],
    aboutAuthor: [
      "Clara Virginia White writes stories about ordinary people facing life's hardest moments — and the hope that carries them forward.",
      "Where the Bells Still Ring is a heartfelt novel about faith, friendship, and the power of showing up for one another. It is the first installment in The Gracetown Novels.",
      "Learn more at claravirginiawhite.com or follow along on Instagram @claravirginiawhite.",
    ],
  },
  {
    authorName: "Jaron Lanier",
    authorTitle: "Scientist, Musician & Author",
    authorPhoto: "/images/jaron-lanier-avatar.jpg",
    contactUrl: "https://www.facebook.com/JaronLanierAuthor/",
    banner: "/images/jaron-lanier-banner.jpg",
    bannerAlt:
      "Ten Arguments for Deleting Your Social Media Accounts Right Now — promotional feature for author Jaron Lanier",
    bookTitle: "Ten Arguments for Deleting Your Social Media Accounts Right Now",
    bookCover: "/images/jaron-lanier-cover.webp",
    tagline: "A case for reclaiming your time, attention, and humanity.",
    genres: ["Nonfiction", "Technology & Society", "Media Criticism"],
    description:
      "Virtual reality pioneer Jaron Lanier — who participates in no social media himself — lays out ten clear-eyed reasons to walk away from the platforms reshaping our attention, our politics, and our sense of self.",
    publishedDate: "May 29, 2018",
    language: "English",
    pages: "146 pages",
    learnMoreUrl:
      "https://www.amazon.com/Jaron-Lanier/e/B00J1ZK6S6/ref=dp_byline_cont_ebooks_1",
    buyUrl: "https://www.amazon.com/dp/B079DTVVG8",
    fullDescription: [
      "You might have trouble imagining life without your social media accounts, but virtual reality pioneer Jaron Lanier insists we're better off without them.",
      "Lanier, who participates in no social media himself, lays out ten arguments for why the major platforms deserve to be deleted for good — from the way they're designed to hijack free will and erode empathy, to their corrosive effect on politics, truth, and economic dignity.",
      "Drawing on his decades inside Silicon Valley, Lanier makes the case that social media's harms aren't accidental side effects but built into the business model itself, and that stepping away is one of the most direct ways to reclaim time, attention, and a more grounded sense of self.",
    ],
    bookQuote: [
      "A case, from a Silicon Valley insider, for why walking away from social media may be the healthiest thing you do this year.",
    ],
    aboutAuthor: [
      "Jaron Lanier is a scientist, musician, and writer best known for his pioneering work in virtual reality and his advocacy for humanism and sustainable economics in a digital age.",
      "His 1980s startup, VPL Research, created the first commercial VR products and introduced avatars and multi-person virtual-world experiences. His books You Are Not a Gadget and Who Owns the Future? were international bestsellers, and Dawn of the New Everything was named a best book of the year by The Wall Street Journal, The Economist, and Vox.",
    ],
  },
  {
    authorName: "T. S. Falk",
    authorTitle: "Author, The Ancient Secrets Series",
    authorPhoto: "/images/ts-falk-avatar.jpg",
    contactUrl: "#",
    banner: "/images/ts-falk-banner.jpg",
    bannerAlt:
      "Featured author interview banner for T. S. Falk and his novel The Ancient Code",
    bookTitle: "The Ancient Code: A SciFi Adventure",
    bookCover: "/images/ts-falk-cover.webp",
    tagline: "Sometimes the greatest discoveries can change the world... or end it.",
    genres: ["Science Fiction", "Adventure", "Archaeological Mystery"],
    description:
      "After barely escaping his last project alive, Professor Elliot Brand just wants a few calm months lecturing in London. But a billionaire's impossible mystery pulls him into a world of Nepali spies, ancient ruins, and a discovery that could change humanity forever — or end it.",
    publishedDate: "January 15, 2022",
    language: "English",
    pages: "287 pages",
    learnMoreUrl:
      "https://www.amazon.com/T-S-Falk/e/B09N9W4CJF/ref=aufs_dp_fta_an_dsk",
    buyUrl:
      "https://www.amazon.com/ANCIENT-CODE-Adventure-Ancient-Secrets-ebook/dp/B09MPS1F7V/ref",
    fullDescription: [
      "After barely escaping from his last project alive, Professor Elliot Brand wants to spend a few calm months lecturing in London. But when a billionaire presents him with a compelling mystery, he cannot resist.",
      "His investigation takes him into a dangerous world involving Nepali spies, ancient ruins, and a revelation about humanity that could change the world forever — or end it.",
      "Blending real science with fiction, The Ancient Code takes readers on a journey into the origins of mankind and its many mysteries. It is the first installment in the thirteen-book Ancient Secrets series.",
    ],
    bookQuote: [
      "A thrilling adventure that will keep you turning pages long after the final secret is revealed.",
    ],
    aboutAuthor: [
      "T. S. Falk is a lifelong adventure and scifi fan. He started writing the books he would like to read during Covid quarantine and simply can't stop.",
      "The Ancient Code is the first book in his Ancient Secrets series, which has since grown to thirteen novels following archaeology professor Elliot Brand.",
      "To be notified of future releases, follow T. S. Falk's Amazon author page.",
    ],
  },
  {
    authorName: "Alison James",
    authorTitle: "Bestselling Psychological Thriller Author",
    authorPhoto: "/images/alison-james-avatar.jpg",
    contactUrl: "mailto:alison.jsmes.pen@gmail.com",
    banner: "/images/alison-james-banner.jpg",
    bannerAlt:
      "Featured live interview panel for Alison James and her psychological thriller The Good Neighbour",
    bookTitle:
      "The Good Neighbour: A Totally Gripping and Addictive Psychological Thriller with a Heart-Pounding Twist",
    bookCover: "/images/alison-james-cover.jpg",
    tagline: "Will her new home turn into a nightmare?",
    genres: ["Psychological Thriller"],
    description:
      "Moving into a quiet apartment was supposed to be a fresh start — but every neighbour has secrets, and trust becomes increasingly dangerous. A fast-paced psychological thriller packed with suspense, unexpected twists, and emotional tension that keeps readers guessing until the final page.",
    publishedDate: "August 30, 2011",
    language: "English",
    pages: "321 pages",
    learnMoreUrl:
      "https://www.amazon.com/Alison-James/e/B0787VZPXT/ref=aufs_dp_fta_an_dsk",
    buyUrl: "https://a.co/d/0drOOcqw",
    fullDescription: [
      "Moving into a quiet apartment was supposed to be a fresh start. But every neighbour has secrets, every encounter raises new questions, and trust becomes increasingly dangerous.",
      "As hidden truths begin to surface, the line between victim and suspect blurs, leading to a shocking finale.",
      "This fast-paced psychological thriller is packed with suspense, unexpected twists, and emotional tension that keeps readers guessing until the final page.",
    ],
    aboutAuthor: [
      "Alison James is a bestselling psychological thriller author known for crafting suspenseful novels filled with gripping twists, unreliable characters, and emotional tension.",
      "Her stories explore guilt, deception, hidden identities, and the dark secrets people keep behind seemingly ordinary lives. She has built a loyal readership among fans of psychological suspense through her page-turning storytelling and unpredictable endings.",
    ],
  },
  {
    authorName: "Amara Osei",
    authorTitle: "Award-Winning Novelist",
    authorPhoto:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
    contactUrl: "mailto:amara.osei@example.com",
    banner:
      "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=1400&q=80",
    bannerAlt: "Amara Osei reading in a warmly lit studio",
    bookTitle: "The Salt of Distant Seas",
    bookCover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
    tagline: "Every tide carries a story home.",
    genres: ["Literary Fiction", "Family Saga"],
    description:
      "Spanning three generations and two continents, a luminous novel about the women of one fishing family and the ocean that both separates and binds them.",
    publishedDate: "February 3, 2025",
    language: "English",
    pages: "412 pages",
    learnMoreUrl: "#",
    buyUrl: "https://www.amazon.com/",
  },
];

export const howItWorks = [
  {
    step: "01",
    icon: "user-plus",
    title: "Submit Author Kit",
    description: "Tell us about you and your book.",
  },
  {
    step: "02",
    icon: "clipboard-check",
    title: "Review",
    description: "Our team reviews your submission.",
  },
  {
    step: "03",
    icon: "badge-check",
    title: "Approval",
    description: "You'll receive confirmation.",
  },
  {
    step: "04",
    icon: "radio",
    title: "Live Author Spotlight",
    description: "Go live and share your story.",
  },
] as const;

export const whyAuthorsChooseUs = [
  {
    icon: "shield-check",
    title: "Authentic",
    description: "Real conversations that build trust.",
  },
  {
    icon: "book-open",
    title: "Engaged Readers",
    description: "Connect with a vibrant and supportive audience.",
  },
  {
    icon: "trending-up",
    title: "Professional Exposure",
    description: "High-quality promotion across platforms.",
  },
  {
    icon: "sparkles",
    title: "Creative Storytelling",
    description: "Visual storytelling that makes your story unique.",
  },
  {
    icon: "globe",
    title: "Global Community",
    description: "Join a worldwide network of authors and readers.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Booksphere Media helped me reach thousands of new readers. The interview was such a beautiful experience!",
    name: "Claire Bennett",
    role: "Bestselling Author",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The team is professional, kind, and truly cares about authors. Highly recommended!",
    name: "James Whitaker",
    role: "Thriller Author",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "An amazing platform that gives your story the attention it deserves.",
    name: "Sophie Lane",
    role: "Romance Author",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "From the first call to the live conversation, everything felt effortless and beautifully produced.",
    name: "Miguel Alvarez",
    role: "Historical Fiction Author",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "My readers finally got to hear the story behind the story. The response was overwhelming.",
    name: "Priya Nair",
    role: "Literary Fiction Author",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
  },
] as const;

export const faqImage = {
  src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
  alt: "Books and a plant on a wooden desk",
} as const;

export const ctaBanner = {
  title: "Share Your Story. Inspire the World.",
  description:
    "Join Booksphere Media and connect with readers through the power of live conversation.",
  primaryCta: { label: "Submit Your Story", href: "https://form.jotform.com/261917650330050" },
  secondaryCta: { label: "Learn More", href: "/about" },
  image:
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=80",
  imageAlt: "Open book with reading glasses and coffee",
} as const;

export const newsletter = {
  title: "Stay Inspired",
  description:
    "Subscribe to our newsletter for updates on live interviews, featured authors, and community stories.",
} as const;
