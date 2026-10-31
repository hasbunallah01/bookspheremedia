export type Book = { slug: string; title: string; subtitle?: string; authorSlug: string; genre: string; hook: string; description: string[]; cover: string; tone: "oxblood" | "ink" | "umber"; published?: string; publisher?: string; language?: string; format?: string; addedAt: string;
  /** true when `cover` is the book's actual cover image (rendered as-is, not as an illustrative sample) */
  realCover?: boolean; tags?: string[];
  /** Real book without a cover file yet: renders a typographic placeholder. Drop the file at `cover` and set realCover: true. */
  coverPending?: boolean; externalUrl?: string; externalLabel?: string;
  recognition?: { source: string; items: string[] }; coverQuote?: { text: string; attribution: string };
  /** Extra byline names without an author page */ coAuthors?: string;
  /** Series position line, e.g. "A Court of Thorns and Roses, Book 6" */ series?: string;
  /** Plain-text list rendered inside About the Book, after the description */ seriesList?: { title: string; items: string[] };
  demo: boolean;
  /** Set by the DB content layer */ authorName?: string; featured?: boolean };
export type Author = { slug: string; name: string; genres: string[]; bio: string; journey?: string; photo?: string; website?: string; demo: boolean;
  /** Title of the author's first listed book (set by the DB content layer) */ firstBook?: string };
export type Genre = { slug: string; name: string; description: string; parent?: string; image: string };
export type Feature = { slug: string; title: string; category: string; excerpt: string; body: string[]; image: string; authorSlug?: string; bookSlug?: string; demo: true };
