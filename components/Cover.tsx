import type { Book } from "@/data/types";
export function Cover({ book, i = 0, className = "" }: { book: Book; i?: number; className?: string }) {
  const a = { name: book.authorName };
  if (book.realCover) return (
    <figure className={`cv real ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={book.cover} alt={`Cover of ${book.title} by ${a?.name}`} />
    </figure>
  );
  if (book.coverPending) return (
    <figure className={`cv pending ${className}`} role="img" aria-label={`${book.title} by ${a?.name}. Cover coming soon`}>
      <span className="ca">{a?.name}</span><span className="ct">{book.title}</span><span className="cs">Cover coming soon</span>
    </figure>
  );
  return (
    <figure className={`cv cv${i % 3} ${book.tone} ${className}`} style={{ ["--img" as string]: `url(${book.cover})` }} role="img" aria-label={`Illustrative sample cover: ${book.title} by ${a?.name}`}>
      <span className="ca">{a?.name}</span><span className="ct">{book.title}</span><span className="cs">Sample</span>
    </figure>
  );
}
