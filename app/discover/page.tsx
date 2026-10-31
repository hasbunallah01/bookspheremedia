import { seo } from "@/lib/seo";
import { Discover } from "@/components/Discover";
import { getBooks } from "@/lib/content";
import { Crumbs } from "@/components/Cards";
export const metadata = seo("Discover Books", "Search and browse books on Book Sphere by title, author, genre or keyword.", "/discover");
export default async function Page({ searchParams }: { searchParams: Promise<{ genre?: string; q?: string }> }) {
  const sp = await searchParams;
  const books = await getBooks();
  return (
    <>
      <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Discover Books"]]} /><h1>Discover Books</h1><p className="lead">Explore stories, ideas, and perspectives from authors across a wide range of genres. Search for a particular title, discover a new author, or browse the categories that interest you most.</p></div></header>
      <section style={{ paddingTop: 70 }}><div className="wrap"><Discover books={books} key={(sp.genre ?? "") + (sp.q ?? "")} initialGenre={sp.genre ?? ""} initialQ={sp.q ?? ""} /></div></section>
    </>
  );
}
