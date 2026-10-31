"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const SEL = "main section .sh, main section .head, main .bk, main .au, main .afc, main .rv, main .phead h1, main .phead .lead, main .detail > *, main .prose, main .gn, main .art, main .values > div, main .faq details, main .afrow a";
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SEL)).filter((e) => !e.closest(".adm") && !e.classList.contains("fx"));
    els.forEach((el) => {
      const sib = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty("--d", `${Math.min(sib, 6) * 90}ms`);
      el.classList.add("fx");
    });
    void document.body.offsetHeight; // commit the hidden state so the transition actually plays
    const show = (el: Element) => el.classList.add("in");
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); io!.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
      const t = setTimeout(() => els.forEach((el) => io!.observe(el)), 60);
      // safety net: never leave content hidden
      const s = setTimeout(() => els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) show(el); }), 1800);
      return () => { clearTimeout(t); clearTimeout(s); io?.disconnect(); };
    }
    els.forEach(show);
  }, [path]);
  return null;
}
