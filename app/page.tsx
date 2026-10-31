import { seo, JsonLd, ORG, WEBSITE } from "@/lib/seo";
import { Accordion } from "@/components/Accordion";
import { Parallax } from "@/components/Parallax";
import { FAQ } from "@/data/faq";
import { spotlights } from "@/data/spotlights";
import { AudioPlayer } from "@/components/AudioPlayer";
import { conversations } from "@/data/conversations";
import Link from "next/link";
import { getBooks, getFeatured } from "@/lib/content";
import { Cover } from "@/components/Cover";
import { Portrait } from "@/components/Cards";
import { getAffiliates } from "@/lib/affiliates";

export const metadata = seo("Book Sphere | Discover Books, Authors & Literary Stories", "Explore Book Sphere, a literary community where readers discover books, authors share their stories, and new literary connections begin.", "/", undefined, { title: { absolute: "Book Sphere | Discover Books, Authors & Literary Stories" } });

export default async function Home() {
  const [books, affs] = await Promise.all([getBooks(), getAffiliates()]);
  // Featured selection is set by the site owner in /admin; falls back to the first title with a real cover.
  const featured = (await getFeatured()) ?? books.find((b) => b.realCover) ?? books[0];
  const sp = spotlights.find((x) => x.fullDescription && !x.hideFromHomepage) ?? spotlights[0];
  const faq = FAQ.filter(([q]) => /submit my book|guarantee that|unpublished|request an author feature|sell books/.test(q));
  const fc = conversations.map((c, i) => ({ c, i })).sort((x, y) => (y.c.publishDate ?? "").localeCompare(x.c.publishDate ?? "") || y.i - x.i)[0].c;
  return (
    <>
      <JsonLd data={[ORG, WEBSITE]} />
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
        <span className="jscroll" aria-hidden="true" /><Parallax />
      </header>

      <section className="hm-mission">
        <div className="wrap">
          <p className="eb rv">Why Book Sphere</p>
          <p className="hm-statement rv">Book Sphere brings readers and authors closer together, so that more books find their readers, more authors share their stories, and more people discover <em>the value of a good book.</em></p>
        </div>
      </section>

      <section className="hiw" aria-labelledby="hwh">
        <div className="wrap">
          <div className="hw-h rv"><p className="eb">How Book Sphere works</p><h2 id="hwh">From your manuscript to <em>a reader&apos;s hands.</em></h2><p>A simple, personal process. Every book is read and reviewed by people before it appears on Book Sphere.</p></div>
          <ol className="hw-l">
            <li className="rv"><span className="hw-n">01</span><div><h3>Submit your book</h3><p>Share your book&apos;s details, cover and a short author biography through our submission form. You choose what we may publish.</p><Link className="tl" href="/submit">Submit a book</Link></div></li>
            <li className="rv"><span className="hw-n">02</span><div><h3>Our team reviews it</h3><p>Every submission is read and reviewed by our team before anything goes live. Selection is based on quality and authenticity.</p><Link className="tl" href="/submit#guidelines">Submission guidelines</Link></div></li>
            <li className="rv"><span className="hw-n">03</span><div><h3>Get featured</h3><p>Selected books receive a listing and author page. Some authors are invited to a featured spotlight or a recorded audio conversation.</p><Link className="tl" href="/spotlights">See spotlights</Link></div></li>
            <li className="rv"><span className="hw-n">04</span><div><h3>Readers discover it</h3><p>Readers find your book by title, genre or author, listen to conversations, and explore the reading communities we grow alongside.</p><Link className="tl" href="/discover">Discover books</Link></div></li>
          </ol>
        </div>
      </section>

      <section className="of" aria-labelledby="ofh">
        <div className="wrap">
          <div className="hw-h rv"><p className="eb">What we offer</p><h2 id="ofh">Four ways a book <em>finds its readers.</em></h2></div>
          <div className="of-g">
            <Link href="/discover" className="of-c rv"><span className="of-i" aria-hidden="true">i</span><h3>Book listings</h3><p>Every approved title gets its own page with the cover, a description, genre and the author behind it, so readers can search and browse with ease.</p><span className="tl">Browse books</span></Link>
            <Link href="/spotlights" className="of-c rv"><span className="of-i" aria-hidden="true">ii</span><h3>Author spotlights</h3><p>In-depth profiles of featured authors: the story of the book, a passage worth remembering, and a closer look at the writer.</p><span className="tl">Read spotlights</span></Link>
            <Link href="/conversations" className="of-c rv"><span className="of-i" aria-hidden="true">iii</span><h3>Live conversations</h3><p>Recorded audio interviews where authors talk about the ideas, research and lived experience behind their books.</p><span className="tl">Listen now</span></Link>
            <Link href="/affiliates" className="of-c rv"><span className="of-i" aria-hidden="true">iv</span><h3>Affiliate communities</h3><p>Reading circles and literary communities we grow alongside, each celebrating books and bringing readers together.</p><span className="tl">Meet the communities</span></Link>
          </div>
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

      <section className="hs" aria-labelledby="hsh">
        <div className="wrap hs-g">
          <div className="hs-v rv">{/* eslint-disable-next-line @next/next/no-img-element */}<img className="hs-ban" src={sp.banner} alt={sp.bannerAlt} loading="lazy" />{/* eslint-disable-next-line @next/next/no-img-element */}<img className="hs-cov" src={sp.bookCover} alt={`Cover of ${sp.bookTitle}`} loading="lazy" /></div>
          <div className="rv">
            <p className="eb">Featured spotlight</p>
            <h2 id="hsh">{sp.bookTitle}</h2>
            <p className="hs-by">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={sp.authorPhoto} alt="" width={36} height={36} />{sp.authorName} <span>·</span> {sp.genres[0]}</p>
            <p className="hs-t">{sp.tagline}</p>
            <p className="hm-ft">{sp.description}</p>
            <div className="btns"><Link className="btn" href="/spotlights">Read the spotlight</Link><Link className="tl" href="/spotlights">All spotlights</Link></div>
          </div>
        </div>
      </section>

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

      <section className="rda">
        <div className="wrap ar-g">
          <div className="ar-c rv"><p className="eb">For authors</p><h2>Introduce your book <em>to readers who care.</em></h2><ul><li>Submit your book with your own cover, biography and links.</li><li>A real person reviews every submission before anything goes live.</li><li>You keep full ownership of your work, always.</li><li>Selected authors may be invited to a spotlight or a recorded conversation.</li></ul><Link className="tl" href="/submit">Submit your book</Link></div>
          <div className="ar-c rv"><p className="eb">For readers</p><h2>Find your next book <em>with less noise.</em></h2><ul><li>Search by title, author, genre or keyword.</li><li>Meet the people behind the books on their author pages.</li><li>Listen to authors talk about their work in their own words.</li><li>Explore the reading communities we grow alongside.</li></ul><Link className="tl" href="/discover">Start exploring</Link></div>
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

      <section className="hf" aria-labelledby="hfh">
        <div className="wrap hf-g">
          <div className="hw-h rv"><p className="eb">Questions</p><h2 id="hfh">Good to know <em>before you submit.</em></h2><p>Honest answers about submitting and being featured.</p><Link className="tl" href="/faq">All questions</Link></div>
          <Accordion items={faq} />
        </div>
      </section>

      <section className="hm-close hm-close1">
        <div className="wrap hm-cg">
          <div className="rv"><p className="eb">For authors</p><h2>Your book deserves <em>to be discovered.</em></h2><p className="hm-ft">Whether you are publishing your first book or adding to an established body of work, we welcome you to introduce your book to our literary community.</p>
            <div className="btns"><Link className="btn" href="/submit">Submit your book</Link><Link className="tl" href="/join">Explore the community</Link></div></div>
        </div>
      </section>
    </>
  );
}
