export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  author: string;
  date: string;
  image: string;
  href: string;
}

export const articles: Article[] = [
  {
    id: "voice-behind-the-page",
    title: "The Voice Behind the Page: A Conversation with Daniel Whitmore",
    excerpt:
      "On the quiet courage of writing about forgiveness, and what it means to be truly heard by readers.",
    category: "Interview",
    readingTime: 7,
    author: "Booksphere Editorial",
    date: "2026-05-12",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    href: "/articles/daniel-whitmore",
  },
  {
    id: "building-a-reading-community",
    title: "Building a Reading Community That Lasts",
    excerpt:
      "Five principles for turning a one-time reader into a lifelong member of your literary circle.",
    category: "Craft",
    readingTime: 5,
    author: "Booksphere Editorial",
    date: "2026-04-28",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    href: "/articles/building-a-reading-community",
  },
  {
    id: "what-makes-a-feature-resonate",
    title: "What Makes an Author Feature Resonate?",
    excerpt:
      "Behind the scenes of our most-watched conversations — and why they stay with readers for years.",
    category: "Studio Notes",
    readingTime: 6,
    author: "Booksphere Editorial",
    date: "2026-04-09",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    href: "/articles/what-makes-a-feature-resonate",
  },
];
