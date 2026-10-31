import { seo } from "@/lib/seo";
import { AuthorsDir } from "@/components/AuthorsDir";
import { getAuthors } from "@/lib/content";
import { Crumbs } from "@/components/Cards";
export const metadata = seo("Meet the Authors", "Meet the authors featured on Book Sphere: their stories, their journeys and the books they have written.", "/authors");
export default async function Page() {
  const authors = await getAuthors();
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Authors"]]} /><h1>Meet the Authors</h1><p className="lead">Discover the people behind the pages. Explore author profiles, learn about their creative journeys, and find books that reflect their interests, experiences, and imagination.</p></div></header>
    <section style={{ paddingTop: 70 }}><div className="wrap"><AuthorsDir authors={authors} /></div></section>
  </>);
}
