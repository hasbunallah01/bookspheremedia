import { Crumbs } from "@/components/Cards";
import { AudioPlayer } from "@/components/AudioPlayer";
import { conversations } from "@/data/conversations";
export const metadata = { title: "Conversations", description: "Listen to audio conversations with authors featured on Book Sphere.", alternates: { canonical: "/conversations" } };
const date = (d?: string) => d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Conversations"]]} /><h1>Conversations</h1><p className="lead">Listen to authors talk about the books they&apos;ve written, the ideas behind them, and the stories that shaped their work.</p></div></header>
    <section className="cv-sec"><div className="wrap cv-list">
      {conversations.map((c, i) => (
        <article key={c.id} className="cvx rv" id={c.id}>
          <div className="cv-cover"><img src={c.bookCover} alt={`Cover of ${c.bookTitle}`} loading={i ? "lazy" : "eager"} /></div>
          <div className="cv-body">
            <p className="cv-meta"><span>{String(i + 1).padStart(2, "0")}</span>{c.tags?.[0]}{c.publishDate && <> · {date(c.publishDate)}</>} · {c.duration}</p>
            <h2>{c.conversationTitle}</h2>
            <p className="cv-book"><em>{c.bookTitle}</em></p>
            <p className="cv-desc">{c.conversationDescription}</p>
            <AudioPlayer src={c.audioUrl} title={`conversation with ${c.authorName}`} />
            <div className="cv-au"><img src={c.authorPhoto} alt="" width={48} height={48} /><div><strong>{c.authorName}</strong><small>{c.authorRole}</small><p>{c.authorBio}</p></div></div>
          </div>
        </article>
      ))}
    </div></section>
  </>);
}
