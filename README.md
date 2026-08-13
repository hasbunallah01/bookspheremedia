# Booksphere Media

A premium editorial-quality website for Booksphere Media — a home for storytellers.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

## ✨ Highlights

- Cinematic full-screen hero with parallax + animated text reveal
- Premium dark theme (ink black + copper accent)
- Glassmorphism cards, soft shadows, gradient overlays
- Sticky transparent → solid navigation with mobile slide-out menu
- Featured Author, Featured Books, Awards, Community Stats, Testimonials
- FAQ accordion, contact form with validation
- Smooth page transitions and scroll-triggered animations
- Fully responsive, accessible, SEO + Open Graph + structured data ready
- Type-safe, component-based, easy to extend via data files

## 📁 Project Structure

```
app/
  layout.tsx           # Root layout with fonts, navbar, footer
  page.tsx             # Home page
  about/page.tsx       # About page
  contact/page.tsx     # Contact page
  globals.css          # Global styles + Tailwind layers
components/
  layout/              # Navbar, Footer, MobileMenu, ScrollProgress
  home/                # Hero, Welcome, FeaturedAuthor, Awards, Books, Articles, Stats, FAQ, etc.
  ui/                  # GlassCard, AnimatedButton, SectionTitle, AnimatedCounter, etc.
data/
  authors.ts           # Featured authors
  books.ts             # Featured books
  articles.ts          # Latest articles
  awards.ts            # Recognition & awards
  faqs.ts              # FAQ entries
  site.ts              # Site config (name, socials, navigation)
lib/
  utils.ts             # cn() helper
public/
  ...                  # Static assets
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔨 Build

```bash
npm run build
npm run start
```

## ☁️ Deploy to Vercel

The fastest path:

1. Push the repo to GitHub (already done in this repo).
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import this repository (`hasbunallah01/bookspheremedia`).
4. Vercel auto-detects Next.js — leave the defaults.
5. Click **Deploy**. Done.

Or via the Vercel CLI:

```bash
npm i -g vercel
vercel              # first-time setup, follow prompts
vercel --prod       # production deploy
```

## ✏️ Adding content

All content lives in `data/` as typed TS files. To add a new featured author:

```ts
// data/authors.ts
export const authors: Author[] = [
  // ...existing
  {
    id: "new-author",
    name: "Jane Doe",
    book: "The Quiet Hours",
    genre: "Literary Fiction",
    summary: "...",
    quote: "...",
    tags: ["Resilience", "Family"],
    image: "/images/authors/jane.jpg",
    articleUrl: "/articles/jane-doe",
  },
];
```

The home page picks it up automatically.

## 🎨 Brand tokens

| Token        | Value     | Usage                          |
| ------------ | --------- | ------------------------------ |
| `ink`        | `#0B0B0B` | Background                     |
| `ink-50`     | `#171717` | Secondary background           |
| `copper`     | `#B87333` | Accent, buttons, highlights    |
| `muted`      | `#B8B8B8` | Secondary text                 |
| `border`     | `#2D2D2D` | Subtle dividers                |
| `display`    | Playfair  | Headings                       |
| `sans`       | Inter     | Body                           |

## 📜 License

© Booksphere Media. All rights reserved.
