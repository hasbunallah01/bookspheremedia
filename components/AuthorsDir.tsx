"use client";
import Link from "next/link";
import { useState } from "react";
import type { Author } from "@/data/types";
import { AuthorCard } from "./Cards";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const last = (n: string) => n.split(" ").pop()!.toUpperCase();
export function AuthorsDir({ authors }: { authors: Author[] }) {
  const [q, setQ] = useState(""); const [l, setL] = useState("");
  if (!authors.length) return <div className="empty"><h2>Author profiles are on their way</h2><p>Know an author whose work belongs here? Introduce their book to Book Sphere.</p><Link className="btn" href="/submit">Submit a Book</Link></div>;
  const list = authors.filter((a) => (!q || `${a.name} ${a.genres.join(" ")}`.toLowerCase().includes(q.toLowerCase())) && (!l || last(a.name)[0] === l)).sort((x, y) => last(x.name).localeCompare(last(y.name)));
  return (
    <>
      <div className="field" style={{ maxWidth: 520 }}><label htmlFor="aq">Search authors by name or genre</label><input id="aq" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="az" role="group" aria-label="Browse by surname initial">
        <button className={!l ? "on" : ""} onClick={() => setL("")} style={{ width: "auto", padding: "0 10px", fontSize: 15 }}>All</button>
        {LETTERS.map((c) => <button key={c} className={l === c ? "on" : ""} disabled={!authors.some((a) => last(a.name)[0] === c)} aria-pressed={l === c} onClick={() => setL(c)}>{c}</button>)}
      </div>
      <p className="count" aria-live="polite">{list.length} sample {list.length === 1 ? "author" : "authors"}</p>
      {list.length ? <div className="agrid">{list.map((a) => <AuthorCard key={a.slug} a={a} />)}</div> : <div className="empty"><h2>No authors found</h2><p>Try another name, genre or letter.</p></div>}
    </>
  );
}
