import Link from "next/link";
import { Crumbs } from "@/components/Cards";
import { privacyHero, commitment, privacyPolicy, communityStandards, editorialStandards, termsOfParticipation, intellectualProperty, securityTrust, privacyCta } from "@/data/legal-privacy";
export const metadata = { title: "Privacy & Guidelines", description: "How Book Sphere protects your information, works with authors, and keeps the community respectful and secure.", alternates: { canonical: "/privacy" } };
type Item = { title: string; description: string };
const Block = ({ b, children }: { b: { badge: string; eyebrow: string; title: string }; children: React.ReactNode }) => (
  <section className="lg-b rv"><p className="lg-n">{b.badge}</p><div><p className="sec">{b.eyebrow}</p><h2>{b.title}</h2>{children}</div></section>
);
const Items = ({ items }: { items: readonly Item[] }) => <dl className="lg-items">{items.map((i) => <div key={i.title}><dt>{i.title}</dt><dd>{i.description}</dd></div>)}</dl>;
const Pts = ({ p }: { p: readonly string[] }) => <ul className="lg-pts">{p.map((x) => <li key={x}>{x}</li>)}</ul>;
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Privacy & Guidelines"]]} /><h1>{privacyHero.titleLead} <em>{privacyHero.titleAccent}</em></h1><p className="lead">{privacyHero.description}</p></div></header>
    <div className="wrap lg">
      <Block b={commitment}><Items items={commitment.items} /></Block>
      <Block b={privacyPolicy}><Items items={privacyPolicy.items} /></Block>
      <Block b={communityStandards}><Items items={communityStandards.items} /></Block>
      <Block b={editorialStandards}><Pts p={editorialStandards.points} /></Block>
      <Block b={termsOfParticipation}><Pts p={termsOfParticipation.points} /></Block>
      <Block b={intellectualProperty}><p className="lg-p">{intellectualProperty.description}</p></Block>
      <Block b={securityTrust}><Pts p={securityTrust.points} /></Block>
      <section className="lg-b rv" id="cookies"><p className="lg-n">08</p><div><p className="sec">Cookies</p><h2>Cookie information.</h2><p className="lg-p">The site currently uses no analytics or advertising cookies. If any are introduced, this section will be updated.</p></div></section>
      <div className="lg-cta rv"><h2>{privacyCta.title}</h2><p>{privacyCta.description} Write to <a href="mailto:bookspheremedia26@gmail.com">bookspheremedia26@gmail.com</a>.</p><Link className="btn" href={privacyCta.cta.href}>{privacyCta.cta.label}</Link></div>
    </div>
  </>);
}
