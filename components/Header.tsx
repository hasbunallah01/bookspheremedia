"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
const NAV = [["/discover", "Books"], ["/authors", "Authors"], ["/conversations", "Conversations"], ["/affiliates", "Affiliates"], ["/about", "About"], ["/contact", "Contact"]] as const;
const MNAV = [["/", "Home"], ...NAV] as const;
const isOn = (path: string, h: string) => h === "/" ? path === "/" : path === h || path.startsWith(h + "/") || (h === "/discover" && path.startsWith("/books"));
export function Header() {
  const [open, setOpen] = useState(false);
  const [scr, setScr] = useState(false);
  useEffect(() => { const f = () => setScr(scrollY > 40); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  useEffect(() => {
    const r = document.documentElement; r.classList.toggle("menu-open", open);
    const mq = matchMedia("(min-width:1061px)"); const f = () => mq.matches && setOpen(false); mq.addEventListener("change", f);
    return () => { r.classList.remove("menu-open"); mq.removeEventListener("change", f); };
  }, [open]);
  return (
    <>
      <div className="ann">A community for readers, authors, and the stories that bring us together.</div>
      <header className={`nav${scr && !open ? " scr" : ""}${open ? " isopen" : ""}`}>
        <div className="wrap ni">
          <Logo />
          <button className="burger" aria-expanded={open} aria-controls="mmenu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
          <nav id="mainnav" className="links" aria-label="Main">
            {NAV.map(([h, l]) => <Link key={h} href={h} aria-current={isOn(path, h) ? "page" : undefined}>{l}</Link>)}
          </nav>
          <div className="act"><Link href="/discover#search" className="srch" aria-label="Search books"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></Link><Link className="navsub" href="/submit">Submit your book</Link></div>
        </div>
      </header>
      <div id="mmenu" className={`mmenu${open ? " open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav className="mlinks" aria-label="Mobile">
          {MNAV.map(([h, l], i) => <Link key={h} href={h} style={{ ["--i" as string]: i }} aria-current={isOn(path, h) ? "page" : undefined} onClick={() => setOpen(false)}><span>{l}</span><i aria-hidden="true">→</i></Link>)}
        </nav>
        <div className="mfoot" style={{ ["--i" as string]: 7 }}>
          <Link className="btn mbtn" href="/submit" onClick={() => setOpen(false)}>Submit your book</Link>
          <p>A book club &amp; literary platform · Founded by Qudus Daramola Abolaji</p>
        </div>
      </div>
    </>
  );
}
