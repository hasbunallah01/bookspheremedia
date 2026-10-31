"use client";
import { useEffect } from "react";
export function Parallax() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.querySelector<HTMLElement>(".jhero .jph"), inner = document.querySelector<HTMLElement>(".jhero .jin");
    if (!el) return;
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const y = Math.min(scrollY, innerHeight); el.style.translate = `0 ${y * 0.25}px`; if (inner) { inner.style.translate = `0 ${y * 0.12}px`; inner.style.opacity = String(Math.max(0, 1 - y / (innerHeight * 0.8))); } }); };
    addEventListener("scroll", on, { passive: true }); on();
    return () => { removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
