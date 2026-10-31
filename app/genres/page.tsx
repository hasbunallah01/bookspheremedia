import Image from "next/image";
import Link from "next/link";
import { genres, getBooks } from "@/lib/content";
import { Crumbs } from "@/components/Cards";
export const metadata = { title: "Explore by Genre", description: "Browse Book Sphere by genre to find books that match your mood and interests.", alternates: { canonical: "/genres" } };
export default async function Page() {
  const books = await getBooks();
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Genres"]]} /><h1>Explore by Genre</h1><p className="lead">Every reader has a different appetite for stories. Browse by genre to discover books that match your mood, interests, and imagination.</p></div></header>
    <section><div className="wrap"><div className="sg" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
      {genres.map((g) => { const n = books.filter((b) => b.genre === g.name || !!b.tags?.includes(g.name)).length; return (
        <Link key={g.slug} className="art" href={`/discover?genre=${g.slug}`}><Image src={g.image} alt="" width={600} height={450} /><p className="bg">{g.parent ? "Fiction" : g.name}{n > 0 ? ` · ${n} sample ${n === 1 ? "title" : "titles"}` : ""}</p><h3>{g.name}</h3><p>{g.description}</p><span className="more">Browse {g.name}</span></Link>); })}
    </div></div></section>
  </>);
}
