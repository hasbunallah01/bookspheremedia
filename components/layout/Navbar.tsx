"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b bg-white transition-shadow duration-300",
          scrolled
            ? "border-mist shadow-[0_4px_20px_-8px_rgba(34,34,34,0.12)]"
            : "border-mist/60",
        )}
      >
        <div className="container-wide flex items-center justify-between gap-6 px-6 py-3.5 md:px-10">
          <Logo />

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex"
          >
            {site.nav.map((item) => {
              const active =
                item.href === pathname ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-medium transition-colors hover:text-forest",
                    active ? "text-forest" : "text-charcoal/75",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://form.jotform.com/261917650330050"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-forest hidden !py-2.5 lg:inline-flex"
            >
              Submit Your Story
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-md border border-mist text-charcoal lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ivory pt-24 lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 px-6"
            >
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-mist py-4 font-display text-xl text-charcoal transition-colors hover:text-forest"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="pt-6"
              >
                <a
                  href="https://form.jotform.com/261917650330050"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-forest w-full"
                >
                  Submit Your Story
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content clears the solid fixed navbar */}
      <div aria-hidden className="h-[68px]" />
    </>
  );
}
