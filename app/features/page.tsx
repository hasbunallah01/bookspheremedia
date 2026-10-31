import Image from "next/image";
import Link from "next/link";
import { features } from "@/lib/content";
import { Crumbs } from "@/components/Cards";
export const metadata = { title: "Author Features & Literary Stories", description: "Literary profiles, book spotlights and creative journeys on Book Sphere.", alternates: { canonical: "/features" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Author Features"]]} /><h1>Author Features &amp; Literary Stories</h1><p className="lead">Books tell stories, but authors have stories of their own. Explore literary profiles, book spotlights, interviews, and creative journeys that offer a closer look at the people and ideas behind the pages.</p></div></header>
    <section><div className="wrap">
      <p className="notice">The features below are sample layouts that show how editorial content will appear. They are not real interviews. Genuine features will be published only with permission and accurate attribution.</p>
      {features.length === 0 ? <div className="empty"><h2>Features are coming soon</h2><p>In the meantime, explore the book directory or introduce your own book.</p><Link className="btn" href="/discover">Discover Books</Link></div> :
      features.map((f, i) => (
        <article key={f.slug} id={f.slug} className={`ig farticle${i % 2 ? " rev" : ""}`}>
          <Image src={f.image} alt="" width={800} height={600} style={{ aspectRatio: "4/3", objectFit: "cover" }} />
          <div className="prose"><p className="bg">{f.category} · Sample</p><h2 style={{ marginTop: 10 }}>{f.title}</h2><p>{f.excerpt}</p>{f.body.map((p) => <p key={p}><em>{p}</em></p>)}{f.bookSlug && <Link className="tl" href={`/books/${f.bookSlug}`}>View Related Book</Link>}</div>
        </article>))}
    </div></section>
  </>);
}
