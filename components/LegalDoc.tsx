import type { ReactNode } from "react";
import Link from "next/link";
import { Crumbs } from "@/components/Cards";

export type LegalSection = { id: string; title: string; body: ReactNode };
export const LEGAL_EMAIL = "bookspheremedia26@gmail.com";
export const EFFECTIVE = "October 31, 2026";
export const Mail = () => <a href={`mailto:${LEGAL_EMAIL}`} style={{ borderBottom: "1px solid", color: "var(--ink)" }}>{LEGAL_EMAIL}</a>;

export function LegalDoc({ crumb, title, intro, sections, other }: { crumb: string; title: ReactNode; intro: string; sections: LegalSection[]; other: { label: string; href: string } }) {
  const n = (i: number) => String(i + 1).padStart(2, "0");
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], [crumb]]} /><h1>{title}</h1><p className="lead">{intro}</p><p className="sec" style={{ marginTop: 18 }}>Effective date: {EFFECTIVE}</p></div></header>
    <section style={{ paddingTop: 60 }}><div className="wrap fbody">
      <nav className="toc" aria-label="Contents"><p className="sec">Contents</p>{sections.map((s, i) => <a key={s.id} href={`#${s.id}`}><span style={{ fontStyle: "italic", color: "var(--accent)", marginRight: 10 }}>{n(i)}</span>{s.title}</a>)}<Link href={other.href} style={{ marginTop: 10, fontWeight: 600 }}>{other.label} →</Link></nav>
      <article className="prose lgdoc">
        {sections.map((s, i) => <section key={s.id} id={s.id} style={{ scrollMarginTop: 110 }}><h2><span style={{ fontStyle: "italic", fontSize: "0.55em", color: "var(--accent)", marginRight: 12, verticalAlign: "middle" }}>{n(i)}</span>{s.title}</h2>{s.body}</section>)}
      </article>
    </div></section>
  </>);
}
