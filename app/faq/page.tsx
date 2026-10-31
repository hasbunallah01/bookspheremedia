import { FAQ } from "@/data/faq";
import { Crumbs } from "@/components/Cards";
export const metadata = { title: "Frequently Asked Questions", description: "How Book Sphere works for readers and authors.", alternates: { canonical: "/faq" } };

export default function Page() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["FAQ"]]} /><h1>Frequently Asked Questions</h1></div></header>
    <section><div className="wrap faq" style={{ maxWidth: 900 }}>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  </>);
}
