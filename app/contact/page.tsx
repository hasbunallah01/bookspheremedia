import { Social } from "@/components/Social";
import { Crumbs } from "@/components/Cards";
import { ContactForm } from "@/components/ContactForm";
export const metadata = { title: "Contact", description: "Get in touch with Book Sphere.", alternates: { canonical: "/contact" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Contact"]]} /><h1>Let&apos;s Talk Books</h1><p className="lead">Have a question about Book Sphere, a book submission, an author feature, or a possible collaboration? We would be happy to hear from you.</p></div></header>
    <section style={{ paddingTop: 70 }}><div className="wrap fbody"><aside className="toc"><p className="sec">Contact details</p><p className="cdet">Email us or find us on Facebook.</p><Social light /></aside><ContactForm /></div></section>
  </>);
}
