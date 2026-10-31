import { AuthorsDir } from "@/components/AuthorsDir";
import { getAuthors } from "@/lib/content";
import { Crumbs } from "@/components/Cards";
export const metadata = { title: "Meet the Authors", description: "Discover the people behind the pages on Book Sphere.", alternates: { canonical: "/authors" } };
export default async function Page() {
  const authors = await getAuthors();
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Authors"]]} /><h1>Meet the Authors</h1><p className="lead">Discover the people behind the pages. Explore author profiles, learn about their creative journeys, and find books that reflect their interests, experiences, and imagination.</p></div></header>
    <section style={{ paddingTop: 70 }}><div className="wrap"><AuthorsDir authors={authors} /></div></section>
  </>);
}
