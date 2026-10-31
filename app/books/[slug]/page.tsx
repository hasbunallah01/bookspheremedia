import { seo, abs, clip, JsonLd, crumbsLd } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooks, getBook, getAuthor, genreSlug, SITE_URL } from "@/lib/content";
import { Cover } from "@/components/Cover";
import { BookCard, Crumbs } from "@/components/Cards";
import { Share } from "@/components/Share";
type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getBooks()).map((b) => ({ slug: b.slug })); }
export async function generateMetadata({ params }: P) {
  const b = await getBook((await params).slug); if (!b) return {};
  return seo(`${b.title} by ${b.authorName}`, b.hook || b.description[0] || b.title, `/books/${b.slug}`, b.realCover ? abs(b.cover) : undefined);
}
export default async function Page({ params }: P) {
  const b = await getBook((await params).slug); if (!b) notFound();
  const a = (await getAuthor(b.authorSlug))!;
  const books = await getBooks();
  const related = books.filter((x) => x.slug !== b.slug && (x.genre === b.genre || x.authorSlug === b.authorSlug)).concat(books.filter((x) => x.slug !== b.slug)).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 4);
  const meta: [string, string | undefined][] = [["Genre", b.genre], ["Publisher", b.publisher], ["Published", b.published], ["Language", b.language], ["Format", b.format]];
  const ld = { "@context": "https://schema.org", "@type": "Book", name: b.title, ...(b.subtitle && { alternativeHeadline: b.subtitle }), description: clip(b.description.join(" ") || b.hook, 500), author: { "@type": "Person", name: a.name, url: `${SITE_URL}/authors/${a.slug}` }, ...(b.language && { inLanguage: b.language }), ...(b.published && { datePublished: b.published }), ...(b.externalUrl && { sameAs: [b.externalUrl] }), genre: b.genre, url: `${SITE_URL}/books/${b.slug}`, ...(b.publisher && { publisher: { "@type": "Organization", name: b.publisher } }), ...(b.format === "Paperback" && { bookFormat: "https://schema.org/Paperback" }), ...(b.realCover && { image: abs(b.cover) }) };
  return (
    <>
      <section style={{ paddingTop: 80 }}>
        <div className="wrap">
          <Crumbs items={[["Home", "/"], ["Discover Books", "/discover"], [b.title]]} />
          <div className="detail">
            <Cover book={b} className="big" />
            <div>
              {b.demo && <span className="demo">Sample book · demonstration content</span>}
              <p className="bg"><Link href={`/discover?genre=${genreSlug(b.genre)}`}>{b.genre}</Link></p>
              <h1>{b.title}</h1>{b.subtitle && <p className="sub" style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "-2px 0 10px" }}>{b.subtitle}</p>}{b.series && <p className="hint" style={{ margin: "0 0 10px" }}>{b.series}</p>}
              <p className="by" style={{ fontSize: 18 }}>by <Link href={`/authors/${a.slug}`} style={{ borderBottom: "1px solid" }}>{a.name}</Link>{b.coAuthors && <> &amp; {b.coAuthors}</>}</p>
              {b.coverQuote && <blockquote className="fquote big">“{b.coverQuote.text}” <span>— {b.coverQuote.attribution}</span></blockquote>}
              <div className="prose" style={{ marginTop: 30 }}><h2>About the Book</h2>{b.description.map((p) => p.startsWith("### ") ? <h3 key={p}>{p.slice(4)}</h3> : <p key={p}>{p}</p>)}{b.seriesList && (<><p>{b.seriesList.title}</p><ul style={{ paddingLeft: 22, margin: "0 0 1em" }}>{b.seriesList.items.map((t) => <li key={t}>{t}</li>)}</ul></>)}</div>
              <dl className="meta">{meta.filter(([, v]) => v).map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              {b.externalUrl ? (
                <p><a className="btn" href={b.externalUrl} target="_blank" rel="noopener noreferrer nofollow">{b.externalLabel ?? "Visit Book Page"}<span className="sr-only"> (opens in a new tab)</span> ↗</a><span className="hint" style={{ display: "block", marginTop: 10 }}>Opens an external retailer page. Book Sphere does not sell books directly.</span></p>
              ) : b.demo && (
                <p className="notice">No purchase or publisher link has been supplied for this sample title. When an author or publisher provides an authorised link, an “Explore Purchase Options” button will appear here.</p>
              )}
              {b.recognition && (<div className="recog"><h2>Recognition</h2><ul>{b.recognition.items.map((r) => <li key={r}>{r}</li>)}</ul><p className="hint">{b.recognition.source}.</p></div>)}
              <div className="prose"><h2 style={{ marginTop: 40 }}>About the Author</h2><p>{(() => { const f = a.bio.split("\n\n")[0]; return f.length > 320 ? f.slice(0, f.lastIndexOf(" ", 320)) + "…" : f; })()}</p><Link className="tl" href={`/authors/${a.slug}`}>View Author Profile</Link></div>
              <Share path={`/books/${b.slug}`} title={b.title} />
            </div>
          </div>
        </div>
      </section>
      <section className="books related"><div className="wrap"><div className="inner"><div className="sh"><h2>Related Books</h2></div><div className="bgrid two-col">{related.map((x, i) => <BookCard key={x.slug} book={x} i={i} />)}</div></div></div></section>
      <JsonLd data={[ld, crumbsLd([["Home", "/"], ["Discover Books", "/discover"], [b.title, `/books/${b.slug}`]])]} />
    </>
  );
}
