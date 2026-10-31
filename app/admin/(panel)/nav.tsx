"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const items: [string, string][] = [["/admin", "Books"], ["/admin/authors", "Authors"], ["/admin/submissions", "Submissions"], ["/admin/affiliates", "Affiliates"], ["/admin/messages", "Messages"]];
export function Nav() {
  const p = usePathname();
  return <nav className="anav" aria-label="Admin">{items.map(([h, l]) => { const on = h === "/admin" ? p === h || p.startsWith("/admin/books") : p.startsWith(h); return <Link key={h} href={h} aria-current={on ? "page" : undefined}>{l}</Link>; })}</nav>;
}
