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
  /** True hides this entry from the homepage carousel; it still appears on the full /spotlights page. */
  hideFromHomepage?: boolean;
}

export const spotlights: Spotlight[] = [
  {
    authorName: "Clara Virginia White",
    authorTitle: "Author, The Gracetown Novels",
    authorPhoto: "/media/clara-virginia-white-avatar.jpg",
    contactUrl: "https://www.instagram.com/claravirginiawhite",
    banner: "/media/clara-virginia-white-banner.jpg",
    bannerAlt:
      "Book Club Spotlight banner for Clara Virginia White and her novel Where the Bells Still Ring",
    bookTitle: "Where the Bells Still Ring",
    bookCover: "/media/clara-virginia-white-cover.jpg",
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
    authorPhoto: "/media/jaron-lanier-avatar.jpg",
    contactUrl: "https://www.facebook.com/JaronLanierAuthor/",
    banner: "/media/jaron-lanier-banner.jpg",
    bannerAlt:
      "Ten Arguments for Deleting Your Social Media Accounts Right Now — promotional feature for author Jaron Lanier",
    bookTitle: "Ten Arguments for Deleting Your Social Media Accounts Right Now",
    bookCover: "/media/jaron-lanier-cover.webp",
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
    authorPhoto: "/media/ts-falk-avatar.jpg",
    contactUrl: "#",
    banner: "/media/ts-falk-banner.jpg",
    bannerAlt:
      "Featured author interview banner for T. S. Falk and his novel The Ancient Code",
    bookTitle: "The Ancient Code: A SciFi Adventure",
    bookCover: "/media/ts-falk-cover.webp",
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
    authorName: "Liora Blake",
    authorTitle: "Contemporary Romance Author",
    authorPhoto: "/media/liora-blake-avatar.jpg",
    contactUrl: "https://www.thebentagency.com/",
    banner: "/media/liora-blake-banner.jpg",
    bannerAlt:
      "Featured author interview banner for Liora Blake and her novel True North",
    bookTitle: "True North",
    bookCover: "/media/liora-blake-cover.webp",
    tagline: "A small-town novelist. A bad-boy rock star. Two scarred hearts. One shot at forever.",
    genres: ["Contemporary Romance", "Rockstar Romance"],
    description:
      "When small-town novelist Kate Mosely meets rock star Trevor \"Trax\" Jenkins during a TV interview, sparks fly. But when a gossip magazine exposé threatens to tear them apart, she must decide if love is worth the risk.",
    publishedDate: "April 6, 2015",
    language: "English",
    pages: "319 pages",
    learnMoreUrl: "https://www.amazon.com/Liora-Blake/e/B00LFY4VVY",
    buyUrl: "https://www.amazon.com/True-North-Book-1-ebook/dp/B00LD1OK6U/ref=sr_1_1?crid=",
    fullDescription: [
      "When small-town novelist Kate Mosely meets rock star Trevor \"Trax\" Jenkins during a TV interview, sparks fly. Beneath his bad-boy exterior is a man who loves poetry, pastries, and a sharp wit that matches her own.",
      "As their passion deepens, Kate's wounded heart begins to heal. But when a gossip magazine exposé threatens to tear them apart, she must decide if love is worth the risk.",
      "True North is the first book in The True Series, a sizzling contemporary romance about healing, trust, and a love that's anything but quiet.",
    ],
    bookQuote: [
      "As she and Trevor explored their heated chemistry, the scarred parts of Kate's heart began to heal.",
    ],
    aboutAuthor: [
      "Liora Blake is a contemporary romance author living in Colorado. When she isn't writing, she's either baking cookies she shouldn't eat, inventing elaborate excuses to avoid going for a run, or asking the nice barista to sell her another quad-shot Americano.",
      "Liora is not active on social media and does not maintain an author website. For rights inquiries, she is represented by The Bent Agency.",
    ],
    hideFromHomepage: true,
  },
  {
    authorName: "David Calloway",
    authorTitle: "Author & Filmmaker",
    authorPhoto: "/media/david-calloway-avatar.webp",
    contactUrl: "mailto:david@calloway.tv",
    banner: "/media/david-calloway-banner.jpg",
    bannerAlt: "Author Spotlight banner for David Calloway and his novel If Someday Comes",
    bookTitle: "If Someday Comes: A Slave's Story of Freedom",
    bookCover: "/media/david-calloway-cover.webp",
    tagline: "To understand America, you must first understand the Civil War.",
    genres: ["Historical Fiction", "African American History", "Civil War Fiction"],
    description:
      "The true story of David Calloway's great-grandfather George, enslaved in Cleveland, Tennessee, before and during the Civil War — a family history written as historical fiction, and winner of the 2023 CIBA Goethe Award for Historical Fiction.",
    publishedDate: "2022",
    language: "English",
    pages: "400+ pages",
    learnMoreUrl: "https://us.amazon.com/stores/author/B0BM6Q15R1",
    buyUrl:
      "https://www.amazon.com/If-Someday-Comes-Slaves-Freedom-ebook/dp/B0BM56PLFN?ref_=ast_author_mpb",
    fullDescription: [
      "If Someday Comes tells the true story of David Calloway's great-grandfather, George Calloway, born into slavery in 1829 in Cleveland, Tennessee. Written as historical fiction and grounded in family history and research, the novel follows George through his final years in slavery and the years of the Civil War that followed, as he protects his family through war, famine, and upheaval.",
      "Calloway drew on stories passed down through his family, historical records, and photographs to reconstruct George's life — a story he calls more fact than fiction, with embellishment used only where the historical record falls silent.",
      "The book is the first in a planned series telling the stories of the men in Calloway's family, and won the Grand Prize for Historical Fiction at the 2023 CIBA Goethe Awards.",
    ],
    bookQuote: [
      "Calloway shows himself to be such a talented writer of historical fiction that the biographical element of the work barely registers. – Kirkus Reviews",
    ],
    aboutAuthor: [
      "David Calloway was born in Chicago and grew up in Palo Alto and Berkeley. He holds an MFA from UCLA in Film Production, and began his career as an editor before progressing to cinematographer and then producer of features and television.",
      "He is a member of the Producer's Guild, the Director's Guild, and the Academy of Television Arts and Sciences, and serves on the boards of the Angel's Gate Cultural Center and the Offshore Racing Outreach Foundation.",
      "Calloway lives and works in Los Angeles, California.",
    ],
    hideFromHomepage: true,
  },
];
