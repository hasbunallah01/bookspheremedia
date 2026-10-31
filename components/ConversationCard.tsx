"use client";
import { useState } from "react";
import { AudioPlayer } from "./AudioPlayer";
import type { Conversation } from "@/data/conversations";
const date = (d?: string) => d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";
export function ConversationCard({ c, n }: { c: Conversation; n: number }) {
  const [open, setOpen] = useState(false);
  const kind = c.tags?.[0]?.includes("Contributor") ? "Contributor" : "Interview";
  return (
    <article className="cc rv" id={c.id}>
      <div className="cc-top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cc-cov" src={c.bookCover} alt={`Cover of ${c.bookTitle}`} loading={n ? "lazy" : "eager"} />
        <div className="cc-head">
          <h2>{c.authorName}</h2>
          <p className="cc-book">{c.bookTitle.split(":")[0]}</p>
          <div className="cc-au">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={c.authorPhoto} alt="" width={28} height={28} /><span>{c.authorRole}</span></div>
        </div>
      </div>
      <div className="cc-body">
        <p className="cc-meta"><span className="cc-n">{String(n + 1).padStart(2, "0")}</span><span className="chip">{kind}</span><span className="chip">{c.duration}</span>{c.publishDate && <time dateTime={c.publishDate}>{date(c.publishDate)}</time>}</p>
        <h3>{c.conversationTitle}</h3>
        <p className={`cc-desc${open ? " open" : ""}`} id={`${c.id}-d`}>{c.conversationDescription}{open && <><br /><br /><span className="cc-bio">{c.authorBio}</span></>}</p>
        <button type="button" className="cc-more" aria-expanded={open} aria-controls={`${c.id}-d`} onClick={() => setOpen(!open)}>{open ? "Show less" : "Read more"}</button>
      </div>
      <div className="cc-play"><AudioPlayer src={c.audioUrl} title={`conversation with ${c.authorName}`} /></div>
    </article>
  );
}
