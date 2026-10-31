"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { genres } from "@/data/genres";
import type { Book } from "@/data/types";
import { BookCard } from "./Cards";
const PAGE = 6;
export function Discover({ books, initialGenre = "", initialQ = "" }: { books: Book[]; initialGenre?: string; initialQ?: string }) {
  const [q, setQ] = useState(initialQ);
  const [genre, setGenre] = useState(initialGenre);
  const [sort, setSort] = useState("recent");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => {
    const t = q.toLowerCase().trim();
    const gname = genres.find((g) => g.slug === genre)?.name;
    const r = books.filter((b) => {
      const a = b.authorName ?? "";
      const hay = `${b.title} ${a} ${b.genre} ${b.hook} ${b.description.join(" ")}`.toLowerCase();
      return (!t || hay.includes(t)) && (!gname || b.genre === gname || !!b.tags?.includes(gname));
    });
    const name = (b: typeof books[number]) => b.authorName?.split(" ").pop() ?? "";
    return r.sort((x, y) => sort === "title" ? x.title.localeCompare(y.title) : sort === "author" ? name(x).localeCompare(name(y)) : y.addedAt.localeCompare(x.addedAt));
  }, [books, q, genre, sort]);
  if (books.length === 0) return <div className="empty"><h2>No books listed yet</h2><p>Book Sphere is just beginning. If you are an author, we would be glad to learn about your work.</p><Link className="btn" href="/submit">Submit a Book</Link></div>;
  return (
    <>
      <div className="dtool" id="search">
        <label className="dsearch"><span className="sr-only">Search by title, author, genre or keyword</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg><input id="q" type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search titles, authors, genres…" /></label>
        <div className="dchips" role="group" aria-label="Filter by genre">
          <button type="button" aria-pressed={genre === ""} className={genre === "" ? "on" : ""} onClick={() => { setGenre(""); setShown(PAGE); }}>All</button>
          {genres.map((g) => <button type="button" key={g.slug} aria-pressed={genre === g.slug} className={genre === g.slug ? "on" : ""} onClick={() => { setGenre(g.slug); setShown(PAGE); }}>{g.name}</button>)}
        </div>
      </div>
      <div className="dcount"><p className="count" aria-live="polite">{list.length} {list.length === 1 ? "book" : "books"}</p>
        <label className="dsort"><span>Sort</span><select id="s" value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Recently added</option><option value="title">Title (A–Z)</option><option value="author">Author name</option></select></label></div>
      {list.length === 0 ? (
        <div className="empty"><h2>No match yet</h2><p>We couldn&apos;t find a match for your search. Try another title, author, or genre to continue exploring.</p><button className="btn alt" onClick={() => { setQ(""); setGenre(""); }}>Clear search</button></div>
      ) : (
        <div className="bgrid">{list.slice(0, shown).map((b, i) => <BookCard key={b.slug} book={b} i={i} />)}</div>
      )}
      {shown < list.length && <div className="ctr"><button className="btn alt" onClick={() => setShown(shown + PAGE)}>Load More</button></div>}
    </>
  );
}
