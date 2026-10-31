import Link from "next/link";
import { Crumbs } from "@/components/Cards";
export const metadata = { title: "Join the Community", description: "Find your place in the Book Sphere community as a reader or an author.", alternates: { canonical: "/join" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Join the Community"]]} /><h1>Find Your Place in the Book Sphere Community</h1><p className="lead">Whether you discover books for the joy of reading or create them to share your ideas with the world, Book Sphere welcomes your interest in literature.</p></div></header>
    <div className="two">
      <div><p className="sec">For readers</p><h2>For the Love of Reading</h2><p>Explore books across different genres, discover authors, read literary features, and follow your curiosity toward new stories and perspectives.</p><Link className="btn" href="/discover">Discover Books</Link></div>
      <div id="authors"><p className="sec">For authors</p><h2>Share the Work You Have Created</h2><p>Introduce your book, provide information about your author journey, and submit your work for consideration on Book Sphere.</p><Link className="btn" href="/submit">Submit Your Book</Link></div>
    </div>
    <section><div className="wrap"><div className="nl">
      <span className="demo">Setup placeholder — newsletter not yet connected</span>
      <h2>Stay Close to the Stories.</h2>
      <p style={{ maxWidth: 560, margin: "12px 0 20px" }}>Receive occasional updates about new book discoveries, author features, and literary highlights from Book Sphere.</p>
      <p className="notice" style={{ margin: 0 }}>Email sign-up will open once an email-marketing service (with a working unsubscribe link) is connected. No email addresses are being collected yet.</p>
    </div></div></section>
  </>);
}
