import { AudioPlayer } from "@/components/AudioPlayer";
import { conversations } from "@/data/conversations";
import Link from "next/link";
import { getBooks, getFeatured } from "@/lib/content";
import { Cover } from "@/components/Cover";
import { Portrait } from "@/components/Cards";
import { getAffiliates } from "@/lib/affiliates";

export const metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const [books, affs] = await Promise.all([getBooks(), getAffiliates()]);
  // Featured selection is set by the site owner in /admin; falls back to the first title with a real cover.
  const featured = (await getFeatured()) ?? books.find((b) => b.realCover) ?? books[0];
  const fc = conversations.map((c, i) => ({ c, i })).sort((x, y) => (y.c.publishDate ?? "").localeCompare(x.c.publishDate ?? "") || y.i - x.i)[0].c;
  return (
    <>
      <header className="jhero">
        <div className="jph" aria-hidden="true" />
        <div className="jov" aria-hidden="true" />
        <div className="wrap jin">
          <p className="eb">A book club &amp; literary platform</p>
          <h1>Wander off<br />the <em>beaten path.</em></h1>
          <p className="jl">A book club and literary platform for readers who love to explore, and the authors whose stories take them there.</p>
          <div className="btns"><Link className="btn" href="/discover">Discover books</Link><Link className="btn alt" href="/authors">Meet the authors</Link></div>
        </div>
        <p className="jfd wrap">Founded by Qudus Daramola Abolaji</p>
        <span className="jscroll" aria-hidden="true" />
      </header>

      <section className="hm-mission">
        <div className="wrap">
          <p className="eb rv">Why Book Sphere</p>
          <p className="hm-statement rv">Book Sphere brings readers and authors closer together, so that more books find their readers, more authors share their stories, and more people discover <em>the value of a good book.</em></p>
          <ol className="hm-ways">
            <li className="rv"><span className="hm-n">01</span><h3>Explore</h3><p>Browse books, discover authors, and explore genres that match your interests.</p><Link className="tl" href="/discover">Browse books</Link></li>
            <li className="rv"><span className="hm-n">02</span><h3>Connect</h3><p>Learn about the people behind the books: their stories, backgrounds, and work.</p><Link className="tl" href="/authors">Meet the authors</Link></li>
            <li className="rv"><span className="hm-n">03</span><h3>Discover more</h3><p>Follow your curiosity to new titles, fresh perspectives, and stories worth sharing.</p><Link className="tl" href="/genres">Explore genres</Link></li>
          </ol>
        </div>
      </section>

      {featured && <section className="hm-spot">
        <div className="wrap hm-spotg">
          <div className="hm-spotc rv"><Link href={`/books/${featured.slug}`} aria-label={`View ${featured.title}`}><Cover book={featured} className="big" /></Link></div>
          <div className="hm-spott rv">
            <p className="eb">On our reading radar</p>
            <h2>{featured.title}</h2>
            {featured.subtitle && <p className="hm-sub">{featured.subtitle}</p>}
            <p className="hm-by">by {featured.authorName} <span>·</span> {featured.genre}</p>
            {featured.coverQuote && <blockquote className="hm-q">“{featured.coverQuote.text}”<cite>{featured.coverQuote.attribution}</cite></blockquote>}
            <p className="hm-hook">{featured.hook}</p>
            <div className="btns"><Link className="btn" href={`/books/${featured.slug}`}>Read about the book</Link><Link className="tl" href="/discover">All books</Link></div>
          </div>
        </div>
      </section>}

      {affs.length > 0 && <section className="hm-band" aria-labelledby="afh">
        <div className="hm-bandbg" aria-hidden="true" />
        <div className="wrap">
          <div className="hm-bandh rv"><p className="eb">Affiliate communities</p><h2 id="afh">Reading circles we <em>grow alongside.</em></h2><p>Communities that celebrate books, spotlight authors and bring readers together.</p></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <ul className="hm-comm">{affs.map((a) => <li key={a.id} className="rv"><a href={a.link} target="_blank" rel="noopener noreferrer">{a.logo ? <img src={a.logo} alt="" width={64} height={64} /> : <span className="hm-ini" aria-hidden="true">{a.name[0]}</span>}<span>{a.name}</span><span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>
          <div className="hm-bandf rv"><Link className="tl" href="/affiliates">Meet our affiliate communities</Link></div>
        </div>
      </section>}

      <section className="hm-conv" aria-labelledby="cvh">
        <div className="wrap hm-cvg">
          <div className="hm-cvc rv"><img src={fc.bookCover} alt={`Cover of ${fc.bookTitle}`} loading="lazy" /></div>
          <div className="rv">
            <p className="eye">Latest conversation</p>
            <h2 id="cvh" className="hm-cvh">{fc.authorName} <em>on {fc.bookTitle.split(":")[0]}</em></h2>
            <p className="hm-cvd">{fc.conversationDescription}</p>
            <AudioPlayer dark src={fc.audioUrl} title={`conversation with ${fc.authorName}`} />
            <Link className="tl" href="/conversations">All conversations</Link>
          </div>
        </div>
      </section>

      <section className="hm-founder">
        <div className="wrap hm-fg">
          <div className="rv"><Portrait /></div>
          <div className="rv">
            <p className="eb">A note from our founder</p>
            <blockquote className="hm-fq">“We believe every book has the potential to reach someone who needs its story, perspective, knowledge, or <em>imagination.</em>”</blockquote>
            <p className="hm-ft">Book Sphere was founded by Qudus Daramola Abolaji with a vision of creating a literary community where authors and readers could come together through their shared appreciation for books and storytelling.</p>
            <div className="hm-sig"><span>Qudus Daramola Abolaji</span><small>Founder, Book Sphere</small></div>
            <Link className="tl" href="/founder">Read our founder&apos;s story</Link>
          </div>
        </div>
      </section>

      <section className="hm-close">
        <div className="wrap hm-cg">
          <div className="rv"><p className="eb">For authors</p><h2>Your book deserves <em>to be discovered.</em></h2><p className="hm-ft">Whether you are publishing your first book or adding to an established body of work, we welcome you to introduce your book to our literary community.</p>
            <div className="btns"><Link className="btn" href="/submit">Submit your book</Link><Link className="tl" href="/join">Explore the community</Link></div></div>
          <ol className="hm-steps rv">
            <li><span>i.</span><div><h3>Prepare your book information</h3><p>Your book&apos;s details, cover and a short author biography.</p></div></li>
            <li><span>ii.</span><div><h3>Submit for consideration</h3><p>Send it through our simple submission form.</p></div></li>
            <li><span>iii.</span><div><h3>Receive confirmation</h3><p>Our team reviews every submission before anything is published.</p></div></li>
          </ol>
        </div>
      </section>
    </>
  );
}
