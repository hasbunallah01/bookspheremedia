import { Crumbs } from "@/components/Cards";
import { SpotlightCard } from "@/components/SpotlightCard";
import { spotlights } from "@/data/spotlights";
export const metadata = { title: "Featured Spotlights", description: "Full profiles of the authors featured in Book Sphere spotlights: their books, their stories, and the authors who wrote them.", alternates: { canonical: "/spotlights" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Spotlights"]]} /><h1>Meet Our Featured Authors</h1><p className="lead">The complete profiles behind every spotlight — the books, the stories, and the authors who wrote them.</p></div></header>
    <section className="sp-sec"><div className="wrap sc-list">{spotlights.filter((s) => s.fullDescription).map((s) => <SpotlightCard key={s.authorName} s={s} />)}</div></section>
  </>);
}
