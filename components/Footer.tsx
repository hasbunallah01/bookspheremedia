import { Social } from "./Social";
import Link from "next/link";
import { Logo } from "./Logo";
import { Year } from "./Year";
const cols: [string, [string, string][]][] = [
  ["Explore", [["/discover", "Discover Books"], ["/authors", "Authors"], ["/genres", "Genres"], ["/spotlights", "Spotlights"], ["/conversations", "Conversations"], ["/affiliates", "Affiliate Communities"]]],
  ["For Authors", [["/submit", "Submit a Book"], ["/submit#guidelines", "Submission Guidelines"], ["/join#authors", "Author Information"]]],
  ["About", [["/about", "About Book Sphere"], ["/founder", "Our Founder"], ["/contact", "Contact"], ["/faq", "Frequently Asked Questions"]]],
  ["Legal", [["/privacy", "Privacy Policy"], ["/terms", "Terms & Conditions"], ["/privacy#cookies", "Cookie Information"]]],
];
export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgr">
          <div><Logo variant="footer" /><p>A literary community bringing authors and readers closer through books, stories, and discovery.</p></div>
          {cols.map(([h, ls]) => <div key={h}><h4>{h}</h4>{ls.map(([href, l]) => <Link key={l} href={href}>{l}</Link>)}</div>)}
        </div>
        <Social />
        <p className="copy">© <Year /> Book Sphere. Photography via Unsplash.</p>
      </div>
    </footer>
  );
}
