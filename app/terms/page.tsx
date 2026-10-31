import Link from "next/link";
import { Crumbs } from "@/components/Cards";
import { termsHero, termsSections, termsCta } from "@/data/legal-terms";
export const metadata = { title: "Terms & Conditions", description: "The responsibilities, expectations, and agreements that apply when using Book Sphere.", alternates: { canonical: "/terms" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Terms & Conditions"]]} /><h1>{termsHero.title}</h1><p className="lead">{termsHero.description}</p></div></header>
    <div className="wrap lg">
      {termsSections.map((s) => (
        <section key={s.number} className="lg-b rv"><p className="lg-n">{s.number}</p><div><h2>{s.title}</h2><p className="lg-p">{s.description.split(/(bookspheremedia26@gmail\.com)/).map((x, i) => x.includes("@") ? <a key={i} href={`mailto:${x}`}>{x}</a> : x)}</p>{s.points && <ul className="lg-pts">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}</div></section>
      ))}
      <div className="lg-cta rv"><h2>{termsCta.title}</h2><p>{termsCta.description}</p><Link className="btn" href={termsCta.cta.href}>{termsCta.cta.label}</Link></div>
    </div>
  </>);
}
