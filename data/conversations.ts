/**
 * Data-driven conversations.
 * To feature a new conversation, edit ONLY this file —
 * no component changes are needed.
 */

export interface Conversation {
  id: string;
  /** Author */
  authorName: string;
  authorPhoto: string;
  authorSlug: string;
  authorBio: string;
  authorRole?: string;
  /** Book */
  bookTitle: string;
  bookCover: string;
  /** Conversation */
  conversationTitle: string;
  conversationDescription: string;
  audioUrl: string;
  /** e.g. "42 min" */
  duration: string;
  /** ISO date, optional */
  publishDate?: string;
  tags?: string[];
}

/** Conversation #1 — Terri E. Givens. */
export const terriGivens: Conversation = {
  id: "terri-givens-radical-empathy",
  authorName: "Terri E. Givens",
  authorPhoto: "/images/terri-givens.webp",
  authorSlug: "terri-givens",
  authorBio:
    "Terri E. Givens is a political scientist and author writing on empathy, justice, and bridging social divides.",
  authorRole: "Featured Author",
  bookTitle: "Radical Empathy: Finding a Path to Bridging Racial Divides",
  bookCover: "/images/radical-empathy-cover.webp",
  conversationTitle: "A Conversation on Empathy, Justice & Building Bridges",
  conversationDescription:
    "Join Terri E. Givens as she discusses the inspiration behind Radical Empathy, exploring how understanding others, confronting bias, and embracing empathy can help bridge social and racial divides.",
  audioUrl: "/audio/terri-givens-radical-empathy.mp3",
  duration: "10 min",
  publishDate: "2026-07-18",
  tags: ["Live Interview", "Author Spotlight"],
};

/** Kate Washington. */
export const kateWashington: Conversation = {
  id: "kate-washington-already-toast",
  authorName: "Kate Washington",
  authorPhoto: "/images/kate-washington-monogram.png",
  authorSlug: "kate-washington",
  authorBio:
    "Kate Washington is a writer and critic whose work explores caregiving, family, and the labor we don't see.",
  authorRole: "Featured Author",
  bookTitle: "Already Toast: Caregiving and Burnout in America",
  bookCover: "/images/already-toast-cover.webp",
  conversationTitle: "A Conversation Worth Hearing",
  conversationDescription:
    "Kate Washington shares the personal story behind Already Toast, discussing caregiving, resilience, and the unseen challenges faced by millions of family caregivers.",
  audioUrl: "/audio/kate-washington-already-toast.mp3",
  duration: "10 min",
  publishDate: "2026-07-17",
  tags: ["Live Interview", "Author Spotlight"],
};

/**
 * Homepage featured conversation — always exactly ONE.
 * Point this at whichever archive entry is currently featured.
 */
export const featuredConversation: Conversation = kateWashington;

/**
 * Conversation archive (/conversations) — newest first.
 * To add a new conversation: create another Conversation object
 * above and add it to the front of this array. The archive page
 * renders one card per entry with no layout changes needed.
 */
/** Conversation #2 — Andrew Child. */
export const andrewChild: Conversation = {
  id: "andrew-child-the-sentinel",
  authorName: "Andrew Child",
  authorPhoto: "/images/andrew-child.webp",
  authorSlug: "andrew-child",
  authorBio:
    "Andrew Child is a bestselling thriller writer and co-author of the Jack Reacher series alongside Lee Child.",
  authorRole: "Interview Guest",
  bookTitle: "The Sentinel: A Jack Reacher Novel",
  bookCover: "/images/the-sentinel-cover.webp",
  conversationTitle: "A Conversation Worth Hearing",
  conversationDescription:
    "Andrew Child discusses The Sentinel, co-written with Lee Child, sharing insights into continuing the iconic Jack Reacher series, the writing process, and bringing one of thriller fiction's most enduring characters to a new generation.",
  audioUrl: "/audio/andrew-child-the-sentinel.mp3",
  duration: "10 min",
  publishDate: "2026-07-17",
  tags: ["Live Interview", "Lee Child & Andrew Child"],
};

/**
 * Archive order = display order on /conversations
 * (Conversation #1 first, new entries appended below).
 */
/** Conversation #4 — Abigail Dillen (featured contributor, not the book's author). */
export const abigailDillen: Conversation = {
  id: "abigail-dillen-all-we-can-save",
  authorName: "Abigail Dillen",
  authorPhoto: "/images/abigail-dillen-monogram.png",
  authorSlug: "abigail-dillen",
  authorBio:
    "Abigail Dillen is the President of Earthjustice and an environmental lawyer. She is a featured contributor to the climate anthology All We Can Save, edited by Katharine K. Wilkinson & Ayana Elizabeth Johnson.",
  authorRole: "Featured Contributor",
  bookTitle: "All We Can Save: Truth, Courage, and Solutions for the Climate Crisis",
  bookCover: "/images/all-we-can-save-cover.webp",
  conversationTitle:
    "Featured in All We Can Save: Truth, Courage, and Solutions for the Climate Crisis",
  conversationDescription:
    "Join environmental lawyer and Earthjustice President Abigail Dillen as she discusses her powerful contribution, \"Litigating in a Time of Crisis,\" from the bestselling climate anthology All We Can Save. Discover how personal loss, environmental justice, and legal advocacy come together in an inspiring conversation about hope, courage, and protecting our planet.",
  audioUrl: "/audio/abigail-dillen-all-we-can-save.mp3",
  duration: "10 min",
  publishDate: "2026-07-18",
  tags: ["Featured Contributor", "Eds. Wilkinson & Johnson"],
};

export const conversations: Conversation[] = [
  terriGivens,
  kateWashington,
  andrewChild,
  abigailDillen,
];
