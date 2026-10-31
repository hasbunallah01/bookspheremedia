"use client";
import { useState } from "react";
import type { Spotlight } from "@/data/spotlights";
const ext = (u: string) => /^https?:/.test(u);
export function SpotlightCard({ s }: { s: Spotlight }) {
  const [open, setOpen] = useState(false);
  const id = s.authorName.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <article className="sc rv" id={id}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="sc-ban"><img src={s.banner} alt={s.bannerAlt} loading="lazy" /></div>
      <div className="sc-in">
        <div className="sc-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sc-cov" src={s.bookCover} alt={`Cover of ${s.bookTitle}`} loading="lazy" />
          <div>
            <div className="sc-au">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={s.authorPhoto} alt="" width={32} height={32} /><div><strong>{s.authorName}</strong><small>{s.authorTitle}</small></div></div>
            <h2>{s.bookTitle}</h2>
            <p className="cc-meta"><span className="chip">{s.genres[0]}</span><span className="chip">{s.pages}</span><time>{s.publishedDate}</time></p>
          </div>
        </div>
        <p className="sc-tag">{s.tagline}</p>
        <div className={`sc-txt${open ? " open" : ""}`} id={`${id}-t`}>
          {(open ? s.fullDescription! : s.fullDescription!.slice(0, 1)).map((p, i) => <p key={i}>{p}</p>)}
          {open && <>{s.bookQuote?.map((q, i) => <blockquote key={i}>{q}</blockquote>)}{s.aboutAuthor && <><h4>About the author</h4>{s.aboutAuthor.map((p, i) => <p key={i}>{p}</p>)}</>}</>}
        </div>
        <button type="button" className="cc-more" aria-expanded={open} aria-controls={`${id}-t`} onClick={() => setOpen(!open)}>{open ? "Show less" : "Read more"}</button>
        <div className="sc-btns">
          {s.buyUrl && s.buyUrl !== "#" && <a className="btn" href={s.buyUrl} target="_blank" rel="noopener noreferrer">Get the book<span className="sr-only"> (opens in a new tab)</span></a>}
          {s.learnMoreUrl && s.learnMoreUrl !== "#" && <a className="tl" href={s.learnMoreUrl} target="_blank" rel="noopener noreferrer">Learn more<span className="sr-only"> (opens in a new tab)</span></a>}
          {s.contactUrl && s.contactUrl !== "#" && <a className="tl" href={s.contactUrl} {...(ext(s.contactUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Contact author</a>}
        </div>
      </div>
    </article>
  );
}
