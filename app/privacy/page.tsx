import Link from "next/link";
import { LegalDoc, Mail, type LegalSection } from "@/components/LegalDoc";
export const metadata = { title: "Privacy Policy", description: "How Book Sphere collects, uses and protects the information you share through our forms and newsletter.", alternates: { canonical: "/privacy" } };

const sections: LegalSection[] = [
  { id: "introduction", title: "Introduction", body: <>
    <p>Book Sphere (&ldquo;Book Sphere,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a literary community and book club. We list books, publish author spotlights and recorded conversations, and connect readers with affiliate reading communities. This Privacy Policy explains what information we collect when you visit this website, contact us, submit a book, apply as an affiliate community or join our newsletter, and how we use, store and protect it.</p>
    <p>You can browse the website without giving us any personal information.</p>
  </> },
  { id: "information-we-collect", title: "Information we collect", body: <>
    <p>We only collect the information you choose to give us through the website:</p>
    <ul>
      <li><strong>Contact form.</strong> Your name, email address, the subject you choose and your message.</li>
      <li><strong>Book submission form.</strong> The author&rsquo;s name, your email address, author biography, country, website and profile links, and book details such as title, subtitle, genres, description, publication date, publisher, ISBN, language, format, purchase and book page links, the cover image you upload, and your answers about publication status, feature interest and promotional consent.</li>
      <li><strong>Affiliate application form.</strong> Your community&rsquo;s name, your name, email address, a link to your community, a description and, if you choose to add one, a logo.</li>
      <li><strong>Newsletter.</strong> Your email address and, if you give it, your first name.</li>
      <li><strong>Technical information.</strong> Like most websites, our hosting provider processes standard technical data such as your IP address, browser type and the pages you request, so the site can be delivered and protected.</li>
    </ul>
    <p>Please do not send passwords, payment details or other sensitive information through our forms.</p>
  </> },
  { id: "how-we-use", title: "How we use your information", body: <>
    <p>We use your information to:</p>
    <ul>
      <li>read and reply to your messages;</li>
      <li>review book submissions and affiliate applications, and contact you about them;</li>
      <li>publish approved books, author profiles and affiliate communities, using only the details you supplied for that purpose;</li>
      <li>send our newsletter if you joined it;</li>
      <li>keep the website secure and prevent spam or misuse.</li>
    </ul>
    <p>We do not sell your personal information, and we do not use it for advertising.</p>
  </> },
  { id: "how-our-forms-work", title: "How our forms work", body: <>
    <p>When you send a form, your submission is saved to our database. A copy of the details is emailed to the Book Sphere team so we can respond, with your email address set as the reply address. Uploaded cover images and logos are stored privately and are only visible to the team in our admin area until a listing is approved.</p>
    <p>Our forms include simple spam protection, such as a hidden field and a limit on how many times a form can be sent in a short period.</p>
  </> },
  { id: "published-content", title: "Books, authors and published content", body: <>
    <p>A submission is not published automatically. Every book, author profile and affiliate community is reviewed by a person first. If we publish your submission, the details intended for public display (for example the book description, cover, author biography and links) will be visible to everyone. Your email address is never shown publicly.</p>
    <p>You can ask us to correct or remove a published listing at any time.</p>
  </> },
  { id: "newsletter", title: "Newsletter", body: <>
    <p>If you join our newsletter, your email address (and first name, if given) is added to our mailing list. Every newsletter email includes a link to unsubscribe, and you can also ask us to remove you by email.</p>
  </> },
  { id: "service-providers", title: "Service providers and sharing", body: <>
    <p>We use trusted service providers to run the website. They process information on our behalf only to provide their services:</p>
    <ul>
      <li><strong>Vercel</strong> hosts the website and stores uploaded images (Vercel Blob).</li>
      <li><strong>Neon</strong> hosts our database, where form submissions are saved.</li>
      <li><strong>Resend</strong> delivers our notification emails and newsletter, and stores our mailing list.</li>
      <li><strong>Google (Gmail)</strong> is the inbox where we receive notifications and reply to you.</li>
    </ul>
    <p>These providers may process information in countries other than your own. We may also disclose information if required by law. We do not otherwise share your information with third parties.</p>
  </> },
  { id: "third-party-links", title: "External and affiliate links", body: <>
    <p>Book pages, spotlights and affiliate community pages link to other websites, such as Amazon, publishers, authors&rsquo; sites and Facebook groups. Some purchase links may be affiliate links. When you follow a link, you leave Book Sphere, and the other site&rsquo;s own privacy policy applies.</p>
  </> },
  { id: "cookies", title: "Cookies and tracking", body: <>
    <p>The public website does not use analytics, advertising or tracking cookies. The only cookie we set is a strictly necessary session cookie when a Book Sphere team member signs in to the admin area. Embedded content or the external sites you visit from our links may set their own cookies.</p>
    <p>If we introduce analytics or any other cookies in the future, we will update this section first.</p>
  </> },
  { id: "security-retention", title: "Security and retention", body: <>
    <p>Access to submissions and the admin area is limited to the Book Sphere team and protected by a password. Information is transmitted over encrypted connections. No method of transmission or storage is completely secure, but we take reasonable steps to protect your information.</p>
    <p>We keep messages, submissions and applications for as long as they are needed to respond, manage listings and keep reasonable records, and we delete them sooner if you ask. Newsletter contacts are kept until you unsubscribe or ask to be removed.</p>
  </> },
  { id: "your-rights", title: "Your choices and rights", body: <>
    <p>You can ask us to access, correct or delete the information you have shared with us, to remove a published listing, or to stop contacting you. Depending on where you live, you may have additional rights under local data protection law, including the right to complain to a data protection authority.</p>
    <p>To make a request, email <Mail />.</p>
  </> },
  { id: "updates-contact", title: "Updates and contact", body: <>
    <p>We may update this Privacy Policy from time to time. The latest version will always be on this page, with its effective date at the top.</p>
    <p>Questions about privacy? Email <Mail /> or use our <Link href="/contact" style={{ borderBottom: "1px solid" }}>contact page</Link>.</p>
  </> },
];

export default function Page() {
  return <LegalDoc crumb="Privacy Policy" title={<>Privacy <em>Policy</em></>} intro="How Book Sphere collects, uses and protects the information you share with us." sections={sections} other={{ label: "Terms & Conditions", href: "/terms" }} />;
}
