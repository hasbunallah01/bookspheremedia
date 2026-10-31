import Link from "next/link";
export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Book Sphere, home">
      <svg className="lm" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1"/><path d="M5 15.5c2.6-1.6 5.3-1.6 8 0 2.7-1.6 5.4-1.6 8 0M13 15.5V8.5M5 12c2.6-1.6 5.3-1.6 8 0 2.7-1.6 5.4-1.6 8 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
      <span>Book Sphere</span>
    </Link>
  );
}
