import type { Metadata } from "next";
import { SITE_URL } from "@/lib/content";
import { FB } from "@/components/Social";

export const abs = (u: string) => (/^https?:\/\//.test(u) ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`);
export const clip = (s: string, n = 158) => { const t = s.replace(/\s+/g, " ").trim(); return t.length > n ? t.slice(0, t.lastIndexOf(" ", n - 1)) + "…" : t; };

/** Per-page metadata: unique title/description, canonical, Open Graph and Twitter card. */
export function seo(title: string, description: string, path: string, image?: string, extra: Metadata = {}): Metadata {
  const d = clip(description);
  const images = image ? [{ url: image }] : [{ url: "/brand/og.png", width: 1200, height: 630, alt: "Book Sphere" }];
  return {
    title, description: d, alternates: { canonical: path },
    openGraph: { title, description: d, url: path, siteName: "Book Sphere", type: "website", locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description: d, images: images.map((i) => i.url) },
    ...extra,
  };
}

export const ORG = {
  "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`,
  name: "Book Sphere", legalName: "Book Sphere Media LLC", url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/icon-512.png`, width: 512, height: 512 },
  image: `${SITE_URL}/brand/og.png`, email: "bookspheremedia26@gmail.com", sameAs: [FB],
  founder: { "@type": "Person", name: "Qudus Daramola Abolaji", url: `${SITE_URL}/founder` },
};
export const WEBSITE = {
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Book Sphere", url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "en",
  potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/discover?q={search_term_string}`, "query-input": "required name=search_term_string" },
};
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
export const crumbsLd = (items: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});
