import Link from "next/link";
import { Twitter, Facebook, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/home/Newsletter";

const socialIcons = {
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
} as const;

const columns = [
  { title: "Quick Links", links: site.footerLinks.quickLinks },
  { title: "Resources", links: site.footerLinks.resources },
  { title: "Support", links: site.footerLinks.support },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest text-white">
      <div className="container-wide px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-white/70">
              Connecting authors and readers through live conversations and
              visual storytelling.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {Object.entries(site.socials).map(([key, href]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={key}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-bronze hover:bg-bronze/15 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Stay Connected
            </h3>
            <div className="mt-5">
              <NewsletterForm variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/55">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/55">
            <Link href="/" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
