# Book Sphere

Next.js 16 (App Router) + TypeScript + Tailwind 4 + Prisma 6 (SQLite).

## Run
    npm install
    cp .env.example .env
    # set ADMIN_PASSWORD (long random) and ADMIN_SESSION_SECRET (64+ random hex chars) in .env
    npm run db:setup        # prisma db push + seed (imports the original books/authors once)
    npm run build && npm start   # http://localhost:3000

## Content
- Books and authors live in the database (`Book`, `Author` in `prisma/schema.prisma`) and are managed at `/admin`. `lib/content.ts` is the only read layer for public pages.
- `data/books.ts` / `data/authors.ts` are now only the seed source: `npx prisma db seed` (`prisma/seed.ts`) imports them unchanged (demo flags, tags, series, quotes, recognition, links) and skips any slug already in the database, so it never overwrites admin edits.
- Genres (`data/genres.ts`) and features (`data/features.ts`) are still static files.
- Founder text is in `app/page.tsx`, `app/about/page.tsx` and `app/founder/page.tsx`. To replace the portrait placeholder, edit `Portrait` in `components/Cards.tsx`.

## Forms
- The Submit a Book and Contact forms use server actions in `app/actions.ts` and save to the `BookSubmission` and `ContactMessage` tables.
- Checks include server-side validation, a honeypot field and a minimum fill time.
- The rate limit is per process and in memory; use Redis or similar in production.
- Cover uploads must be JPG, PNG or WebP. The server checks the file's contents, not just its extension, and caps size at 5 MB.
- Uploads are saved privately to `storage/uploads/`, which is not public.

## Admin (/admin)
Go to `/admin` and sign in with the password in `.env` (`ADMIN_PASSWORD`). Sessions last 12 hours (signed, httpOnly cookie using `ADMIN_SESSION_SECRET`); use **Log out** when done. Change the password by editing `.env` and restarting; changing `ADMIN_SESSION_SECRET` signs everyone out.
- **Books**: the list order is the order on the homepage ("Find Your Next Great Read" shows the first 6) and in Discover. Use ↑/↓ to reorder, **Feature** to choose the one book shown in "On Our Reading Radar", **Visible/Hidden** to hide a book without deleting it, **Edit**, and **Delete** (asks to confirm).
- **+ Add a book**: title, subtitle, series line, one-line hook (shown on cards), description (blank line between paragraphs), category + extra tags, publisher, format, optional buy link, cover quote, recognition (one per line), optional series list, cover image. Pick an existing author or create a new one (name, bio, website, photo). New books go to the top of the list. Changes are live immediately (pages are revalidated on save).
- **Authors**: edit name, bio, website and photo. An author can be deleted once they have no books.
- **Submissions**: entries from the public "Submit a Book" form. **Approve → create book** opens the book form pre-filled (including the submitted cover); saving publishes it and marks the submission PUBLISHED. You can also set a status.
- **Affiliates**: communities shown on `/affiliates` and in the homepage strip "Our Affiliate Communities". Add/edit (name, tagline, description, Facebook/website link, optional round logo, banner), reorder with ↑/↓, Visible/Hidden, Delete. Logo is optional: without one the card shows banner + name only. No follower counts are shown. Below the list, **Applications** from the public "Become an Affiliate" form (same honeypot/time-check/rate-limit/upload rules as Submit a Book; logos stored privately in `storage/uploads`). **Approve → create affiliate** opens a pre-filled form (including the logo) and marks the application APPROVED on save. Seeded affiliate images live in `public/affiliates/`; uploaded ones go to `public/uploads/affiliates`.
- **Messages**: contact-form messages (read-only).
- Security: `/admin/*` is gated in `proxy.ts` and again on every page and server action; pages are `noindex` and disallowed in robots.txt. Login is rate-limited (5 failures per IP / 30 overall per 15 min, in memory).
- Images: JPG/PNG/WebP up to 5 MB, checked by file contents. They are saved by `lib/storage.ts` to `public/uploads/{covers,authors}` and served by `app/uploads/[...path]/route.ts` (needed because `next start` only serves `public/` files that existed at build time). **To move to Vercel Blob**, replace `saveImage`/`deleteImage` in `lib/storage.ts` with `put()`/`del()` from `@vercel/blob` and return the blob URL; nothing else changes. Back up `prisma/dev.db` and `public/uploads/` together.

## Not yet connected
- Email: confirmation and notification emails are not sent. Connect a provider such as Resend or Postmark.
- Newsletter: setup placeholder only; it collects no data.
- Hosting: not deployed. SQLite and local uploads suit a single server. For serverless hosting (e.g. Vercel), move to Postgres and Vercel Blob (see Admin > Images); the in-memory login rate limit should then use a shared store.
- Privacy and Terms pages are templates and need legal review.
