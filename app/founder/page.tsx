import { seo } from "@/lib/seo";
import Link from "next/link";
import { Crumbs, Portrait } from "@/components/Cards";
import { SITE_URL } from "@/lib/content";
export const metadata = seo("Our Founder — Qudus Daramola Abolaji", "The story and vision behind Book Sphere, from its founder Qudus Daramola Abolaji.", "/founder");
const S: [string, string, string[]][] = [
  ["vision-built", "A Vision Built Around Books, People, and Possibilities", ["Book Sphere was founded by Qudus Daramola Abolaji with a vision of creating a literary community where authors and readers could come together through their shared appreciation for books and storytelling.", "At the heart of Book Sphere is a simple but meaningful belief: books are more than words printed on pages. They carry ideas, experiences, imagination, knowledge, and perspectives that have the power to connect people and inspire new ways of thinking.", "For many authors, introducing their work to new readers can be a challenge. At the same time, readers are continually searching for stories, authors, and ideas that speak to their interests and experiences.", "Book Sphere was envisioned as a place where these two needs could meet."]],
  ["vision", "The Vision Behind Book Sphere", ["The vision behind Book Sphere extends beyond simply bringing books together on a website. It is about creating an environment where literary discovery feels accessible, where authors have a place to present their work, and where readers are encouraged to remain curious.", "Every author has a story behind their work, and every reader has the potential to discover a book that changes how they think, feel, learn, or see the world.", "Book Sphere seeks to help make those connections possible."]],
  ["community", "Building a Community for Authors and Readers", ["Book Sphere aims to serve both sides of the literary world.", "For readers, the goal is to make exploring books and discovering authors an engaging experience.", "For authors, the goal is to create opportunities to introduce their work, share information about their books, and reach readers who may appreciate their stories.", "For the wider literary community, the ambition is to encourage greater appreciation for books, celebrate the creativity behind them, and create room for new voices and fresh perspectives."]],
  ["journey", "A Continuing Journey", ["Book Sphere represents an ongoing commitment to literary discovery, community, and the possibilities that emerge when books bring people together.", "Its journey is guided by the belief that meaningful literary connections begin with curiosity and grow through shared experiences. By bringing authors and readers closer, Book Sphere aims to contribute to a more connected and welcoming literary environment."]],
];
export default function Page() {
  const ld = { "@context": "https://schema.org", "@type": "Person", name: "Qudus Daramola Abolaji", jobTitle: "Founder of Book Sphere", image: `${SITE_URL}/founder/qudus.jpg`, url: `${SITE_URL}/founder` };
  return (<>
    <header className="fhead"><Portrait /><div className="ft"><Crumbs items={[["Home", "/"], ["About", "/about"], ["Our Founder"]]} /><p className="eye">Our Founder</p><h1>Qudus Daramola Abolaji</h1><p className="role">Founder of Book Sphere</p></div></header>
    <section><div className="wrap fbody">
      <nav className="toc" aria-label="On this page">{S.map(([id, h]) => <a key={id} href={`#${id}`}>{h}</a>)}</nav>
      <article className="prose" style={{ maxWidth: 720 }}>
        {S.map(([id, h, ps]) => <div key={id} id={id} style={{ scrollMarginTop: 110 }}><h2>{h}</h2>{ps.map((p) => <p key={p}>{p}</p>)}</div>)}
        <p className="closing">The vision is simple: to help more books find their readers, more authors share their stories, and more people discover the value of a good book.</p>
        <div className="btns"><Link className="btn" href="/discover">Discover Books</Link><Link className="btn alt" href="/about">About Book Sphere</Link><Link className="tl" href="/submit">Submit a Book</Link></div>
      </article>
    </div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  </>);
}
