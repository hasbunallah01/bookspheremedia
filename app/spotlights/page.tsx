import { Crumbs } from "@/components/Cards";
import { spotlights } from "@/data/spotlights";
export const metadata = { title: "Featured Spotlights", description: "Full profiles of the authors featured in Book Sphere spotlights: their books, their stories, and the authors who wrote them.", alternates: { canonical: "/spotlights" } };
const ext = (u: string) => /^https?:/.test(u);
export default function Page() {
  const full = spotlights.filter((s) => s.fullDescription);
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Spotlights"]]} /><h1>Meet Our Featured Authors</h1><p className="lead">The complete profiles behind every spotlight — the books, the stories, and the authors who wrote them.</p></div></header>
    <section className="sp-sec"><div className="wrap sp-list">
      {full.map((s) => (
        <article key={s.authorName} className="sp rv">
          <div className="sp-ban"><img src={s.banner} alt={s.bannerAlt} loading="lazy" /></div>
          <div className="sp-id">
            <img className="sp-av" src={s.authorPhoto} alt={s.authorName} width={96} height={96} loading="lazy" />
            <div><h2>{s.authorName}</h2><p>{s.authorTitle}</p></div>
          </div>
          <div className="sp-g">
            <aside className="sp-side">
              <img className="sp-cov" src={s.bookCover} alt={`Cover of ${s.bookTitle}`} loading="lazy" />
              <dl><div><dt>Published</dt><dd>{s.publishedDate}</dd></div><div><dt>Language</dt><dd>{s.language}</dd></div><div><dt>Length</dt><dd>{s.pages}</dd></div></dl>
              <div className="sp-btns">
                {s.buyUrl && s.buyUrl !== "#" && <a className="btn" href={s.buyUrl} target="_blank" rel="noopener noreferrer">Get the book<span className="sr-only"> (opens in a new tab)</span></a>}
                {s.learnMoreUrl && s.learnMoreUrl !== "#" && <a className="tl" href={s.learnMoreUrl} target="_blank" rel="noopener noreferrer">Learn more<span className="sr-only"> (opens in a new tab)</span></a>}
                {s.contactUrl && s.contactUrl !== "#" && <a className="tl" href={s.contactUrl} {...(ext(s.contactUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>Contact author</a>}
              </div>
            </aside>
            <div className="sp-main">
              <p className="sp-genres">{s.genres.join(" · ")}</p>
              <h3>{s.bookTitle}</h3>
              <p className="sp-tag">{s.tagline}</p>
              <h4>About the book</h4>
              {s.fullDescription!.map((p, i) => <p key={i}>{p}</p>)}
              {s.bookQuote?.map((q, i) => <blockquote key={i}>{q}</blockquote>)}
              {s.aboutAuthor && <><h4>About the author</h4>{s.aboutAuthor.map((p, i) => <p key={i}>{p}</p>)}</>}
            </div>
          </div>
        </article>
      ))}
    </div></section>
  </>);
}
