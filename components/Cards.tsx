import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import type { Book, Author } from "@/data/types";
import { Cover } from "./Cover";
const initials = (n: string) => n.split(" ").map((w) => w[0]).join("");
export function BookCard({ book, i = 0 }: { book: Book; i?: number }) {
  return (
    <Link className="bk" href={`/books/${book.slug}`}>
      <Cover book={book} i={i} />
      <div className="bt"><p className="bg">{book.genre}</p><h3>{book.title}</h3><p className="by">{book.authorName}</p>
      <p className="hk">{book.hook}</p><span className="more">View Book</span></div>
    </Link>
  );
}
export function AuthorCard({ a }: { a: Author }) {
  return (
    <Link className="au" href={`/authors/${a.slug}`}>
      {a.photo ? <img className="aphoto" src={a.photo} alt={`Portrait of ${a.name}`} /> : <span className="mono" aria-hidden="true">{initials(a.name)}</span>}
      <p className="bg">{a.demo ? "Sample author · " : ""}{a.genres.join(", ")}</p><h3>{a.name}</h3>
      <p>{a.bio.length > 150 ? a.bio.slice(0, a.bio.lastIndexOf(" ", 150)) + "…" : a.bio}</p>{a.firstBook && <p className="by">Author of <em>{a.firstBook}</em></p>}<span className="more">View Author</span>
    </Link>
  );
}
export function Crumbs({ items }: { items: [string, string?][] }) {
  return <nav className="crumbs" aria-label="Breadcrumb">{items.map(([l, h], i) => <span key={l}>{i > 0 && " / "}{h ? <Link href={h}>{l}</Link> : <span aria-current="page">{l}</span>}</span>)}</nav>;
}
export function Portrait() {
  // eslint-disable-next-line @next/next/no-img-element
  return <figure className="portrait photo"><picture><source type="image/webp" srcSet="/founder/qudus.webp 480w, /founder/qudus@2x.webp 960w" sizes="(max-width: 700px) 90vw, 440px" /><img src="/founder/qudus.jpg" width={960} height={1243} alt="Qudus Daramola Abolaji, founder of Book Sphere" /></picture></figure>;
}
