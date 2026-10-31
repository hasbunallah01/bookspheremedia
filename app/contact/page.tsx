import { Crumbs } from "@/components/Cards";
import { ContactForm } from "@/components/ContactForm";
export const metadata = { title: "Contact", description: "Get in touch with Book Sphere.", alternates: { canonical: "/contact" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Contact"]]} /><h1>Let&apos;s Talk Books</h1><p className="lead">Have a question about Book Sphere, a book submission, an author feature, or a possible collaboration? We would be happy to hear from you.</p></div></header>
    <section style={{ paddingTop: 70 }}><div className="wrap fbody"><aside className="toc"><p className="sec">Contact details</p><p style={{ fontSize: 15, marginBottom: 10 }}>Email: <a href="mailto:bookspheremedia26@gmail.com" style={{ borderBottom: "1px solid" }}>bookspheremedia26@gmail.com</a></p><p style={{ fontSize: 15 }}><a href="https://www.facebook.com/share/151kdU5hn9G/" target="_blank" rel="noopener noreferrer" style={{ borderBottom: "1px solid" }}>Book Sphere on Facebook ↗<span className="sr-only"> (opens in a new tab)</span></a></p></aside><ContactForm /></div></section>
  </>);
}
