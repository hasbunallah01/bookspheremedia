import type { Metadata } from "next";
import { EB_Garamond, Karla } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SITE_URL } from "@/lib/content";

const serif = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-garamond" });
const sans = Karla({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-karla" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Book Sphere | Discover Books, Authors & Literary Stories", template: "%s | Book Sphere" },
  description: "Explore Book Sphere, a literary community where readers discover books, authors share their stories, and new literary connections begin.",
  openGraph: { siteName: "Book Sphere", type: "website", images: ["/img/hero.jpg"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
