import { seo } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Crumbs, Portrait } from "@/components/Cards";
export const metadata = seo("About Book Sphere", "Book Sphere is a book club and literary platform from Book Sphere Media LLC that brings books, authors and readers closer together.", "/about");
const VALUES = [["Discovery", "We help create opportunities for readers to discover books, authors, and ideas they might not encounter otherwise."], ["Connection", "We believe books can bring people together through shared experiences, conversations, and perspectives."], ["Appreciation", "Every book represents creativity, effort, and a story worth approaching with curiosity and respect."], ["Community", "We aim to create a welcoming environment for readers and authors at different stages of their literary journeys."], ["Curiosity", "We encourage readers to explore new genres, voices, ideas, and perspectives."], ["Visibility", "We want to help authors introduce their work to readers who may appreciate what they have created."]];
const ROMAN = ["i.", "ii.", "iii.", "iv.", "v.", "vi."];
export default function Page() {
  return (<>
    <header className="phead pdark"><div className="wrap"><Crumbs items={[["Home", "/"], ["About"]]} /><p className="eye">About Book Sphere</p><h1>Bringing Books, Authors, and Readers Closer Together</h1></div></header>
    <section><div className="wrap ig">
      <div className="ip"><Image src="/img/library.jpg" alt="Shelves of books in a warm library" width={800} height={1000} style={{ aspectRatio: "4/5", objectFit: "cover" }} /><p className="cap">Photograph via Unsplash.</p></div>
      <div className="prose">
        <p className="first" style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: 1.35 }}>Book Sphere was created around a simple belief: books have the power to connect people, introduce new perspectives, and create experiences that stay with us long after we finish reading.</p>
        <p>Every book represents an idea, a journey, a question, or an imagined world that an author has taken the time to bring to life. Yet discovering the right book can sometimes be difficult, especially when readers are searching beyond familiar titles and established names.</p>
        <p>Book Sphere aims to make literary discovery more welcoming and accessible.</p>
        <p>Our community brings together readers who want to explore new books and authors who want to introduce their work to a wider circle of interested readers.</p>
        <p>Through book discovery, author profiles, literary features, and opportunities for engagement, we aim to create a space where stories can be explored and the people behind them can be appreciated.</p>
        <p>We welcome curiosity, encourage exploration, and believe that every meaningful reading journey begins with a willingness to discover something new.</p>
        <p>Whether you have written a book, read hundreds of them, or are simply looking for a story that speaks to you, Book Sphere invites you to be part of a community built around the written word.</p>
      </div></div></section>
    <div className="mv"><div><p className="sec">Mission</p><p>To connect readers and authors through accessible book discovery, thoughtful literary features, and a welcoming community.</p></div><div><p className="sec">Vision</p><p>To build a recognizable literary destination where stories, authors, and readers can find meaningful opportunities to connect.</p></div></div>
    <section><div className="wrap"><div className="sh"><p className="sec">Our values</p><h2>What Guides Book Sphere</h2></div><div className="values">{VALUES.map(([h, t], i) => <div key={h}><span className="rn">{ROMAN[i]}</span><h3>{h}</h3><p>{t}</p></div>)}</div></div></section>
    <section><div className="wrap founder"><Portrait /><div><p className="sec">The founder</p><h2>Qudus Daramola Abolaji</h2><p className="role">Founder of Book Sphere</p><p className="t">Book Sphere was founded by Qudus Daramola Abolaji with a vision of creating a literary community where authors and readers could come together through their shared appreciation for books and storytelling.</p><div className="btns"><Link className="btn" href="/founder">Read Our Founder&apos;s Story</Link><Link className="tl" href="/discover">Discover Books</Link></div></div></div></section>
  </>);
}
