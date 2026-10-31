import { seo } from "@/lib/seo";
/* eslint-disable @next/next/no-img-element */
import { Crumbs } from "@/components/Cards";
import { AffiliateApplyForm } from "@/components/AffiliateForm";
import { getAffiliates } from "@/lib/affiliates";
export const metadata = seo("Our Affiliate Communities", "Reading communities that share Book Sphere's love of books, authors and stories.", "/affiliates");
export default async function Page() {
  const affs = await getAffiliates();
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Affiliate Communities"]]} /><h1>Our Affiliate Communities</h1>
      <p className="lead">Book Sphere is proud to stand alongside reading communities that celebrate books, spotlight authors and bring readers together. Visit them, join the conversation, and find your next favorite read.</p></div></header>
    <section style={{ paddingTop: 30 }}><div className="wrap afgrid">
      {affs.map((a) => (
        <article key={a.id} className={`afc${a.logo ? "" : " nologo"}`}>
          {a.banner && <img className="afb" src={a.banner} alt={`${a.name} banner`} loading="lazy" />}
          <div className="afi">
            {a.logo && <img className="afl" src={a.logo} alt={`${a.name} logo`} width={88} height={88} />}
            <h2>{a.name}</h2>
            {a.tagline && <p className="aft">{a.tagline}</p>}
            <p className="afd">{a.description}</p>
            <a className="btn" href={a.link} target="_blank" rel="noopener noreferrer">{/facebook\.com/.test(a.link) ? "Visit on Facebook" : "Visit website"} ↗<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </article>))}
    </div></section>
    <section id="apply" style={{ paddingTop: 40 }}><div className="wrap fbody">
      <aside className="toc"><p className="sec">Run a reading community?</p><p style={{ fontSize: 14, marginBottom: 10 }}>If your group shares our love of books and authors, we&apos;d love to hear from you. Fields marked * are required.</p><p style={{ fontSize: 14 }}>Every application is reviewed by the team before anything is published.</p></aside>
      <AffiliateApplyForm />
    </div></section>
  </>);
}
