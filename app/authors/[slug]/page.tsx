import { notFound } from "next/navigation";
/* eslint-disable @next/next/no-img-element */
import { getAuthors, getAuthor, booksBy, initials, SITE_URL } from "@/lib/content";
import { BookCard, Crumbs } from "@/components/Cards";
import { Share } from "@/components/Share";
type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getAuthors()).map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: P) { const a = await getAuthor((await params).slug); return a ? { title: a.name, description: a.bio, alternates: { canonical: `/authors/${a.slug}` } } : {}; }
export default async function Page({ params }: P) {
  const a = await getAuthor((await params).slug); if (!a) notFound();
  const bs = await booksBy(a.slug);
  const ld = { "@context": "https://schema.org", "@type": "Person", name: a.name, ...(a.photo && { image: `${SITE_URL}${a.photo}` }), ...(a.website && { sameAs: [a.website] }), url: `${SITE_URL}/authors/${a.slug}` };
  return (<>
    <header className="phead pdark"><div className="wrap"><Crumbs items={[["Home", "/"], ["Authors", "/authors"], [a.name]]} />
      <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>{a.photo ? <img className="aphoto big" src={a.photo} alt={`Portrait of ${a.name}`} /> : <span className="mono" style={{ width: 170, height: 170, fontSize: 60 }} aria-hidden="true">{initials(a.name)}</span>}
      <div>{a.demo && <span className="demo">Sample author · demonstration content</span>}<h1 style={{ marginBottom: 10 }}>{a.name}</h1><p className="lead">{a.genres.join(" · ")}</p>{a.website && <p style={{ marginTop: 12 }}><a href={a.website} target="_blank" rel="noopener noreferrer" style={{ borderBottom: "1px solid", fontSize: 14 }}>Official website ↗<span className="sr-only"> (opens in a new tab)</span></a></p>}</div></div></div></header>
    <section><div className="wrap"><div className="prose" style={{ margin: "0 auto" }}>
      <h2>About the Author</h2>{a.bio.split("\n\n").map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
      {a.journey && (<><h2>The Author&apos;s Journey</h2><p>{a.journey}</p></>)}
      <Share path={`/authors/${a.slug}`} title={a.name} />
    </div></div></section>
    <section className="books related"><div className="wrap"><div className="inner"><div className="sh"><h2>Books by {a.name}</h2></div><div className="bgrid">{bs.map((b, i) => <BookCard key={b.slug} book={b} i={i} />)}</div></div></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  </>);
}
