import Link from "next/link";
import { LegalDoc, Mail, type LegalSection } from "@/components/LegalDoc";
export const metadata = { title: "Terms & Conditions", description: "The terms that apply when you use the Book Sphere website, submit a book or apply as an affiliate community.", alternates: { canonical: "/terms" } };

const sections: LegalSection[] = [
  { id: "acceptance", title: "Acceptance of terms", body: <p>Book Sphere is operated by Book Sphere Media LLC (&ldquo;Book Sphere,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). These Terms &amp; Conditions apply to your use of the Book Sphere website. By using the website, submitting a form or joining our newsletter, you agree to these terms and to our <Link href="/privacy" style={{ borderBottom: "1px solid" }}>Privacy Policy</Link>. If you do not agree, please do not use the website.</p> },
  { id: "about", title: "About Book Sphere", body: <p>Book Sphere is a literary community and book club that helps readers discover books and authors. The website features book listings, author profiles, author spotlights, recorded conversations with authors, and affiliate reading communities. Book Sphere does not sell books directly.</p> },
  { id: "using-the-site", title: "Using the website", body: <p>The website is free to browse. Book descriptions, author information and spotlights are provided for general information. We aim to keep them accurate, but details such as prices, editions and availability are set by the retailer or publisher and may change.</p> },
  { id: "submissions", title: "Book and author submissions", body: <>
    <p>When you submit a book, you confirm that you are the author or are authorised to submit it, that the information you provide is accurate, and that you have the right to share the cover image, biography and other material you upload.</p>
    <p>You keep full ownership of your work. By submitting, you give Book Sphere permission to display the submitted details, cover and links on the website and in related Book Sphere promotion if your submission is approved. You can ask us to update or remove a listing at any time.</p>
    <p>Every submission is reviewed by a person. Submitting does not guarantee publication, a spotlight, a conversation or any other feature, and we may decline any submission.</p>
  </> },
  { id: "affiliate-communities", title: "Affiliate communities", body: <p>If you apply to list your reading community, you confirm that you run or represent it and that the details and logo you share are accurate and yours to share. Approved communities are shown on our website with a link to their page. Affiliate communities are independent: they set their own rules, and Book Sphere is not responsible for their content or activities. We may update or remove a listing at any time.</p> },
  { id: "conversations-spotlights", title: "Spotlights and conversations", body: <p>Author spotlights and recorded conversations are published with the participating author&rsquo;s involvement. The views expressed in them belong to the authors and do not necessarily reflect the views of Book Sphere.</p> },
  { id: "external-links", title: "Purchase and external links", body: <p>Some pages link to other websites, such as Amazon, publishers, authors&rsquo; sites and social media. Purchase links take you to third-party stores, and any purchase is made with the retailer, under its own terms. We are not responsible for the content, products or policies of external websites.</p> },
  { id: "newsletter", title: "Newsletter", body: <p>If you join our newsletter, we will send you occasional updates about books, authors and Book Sphere news. You can unsubscribe at any time using the link in every email.</p> },
  { id: "content", title: "Our content and intellectual property", body: <p>The Book Sphere name, logo, website design and original text belong to Book Sphere. Book covers, author photos, excerpts and other material supplied by authors, publishers or communities remain the property of their owners and are used with permission. Please do not copy or reuse content from this website without permission, except for sharing links or brief quotations with credit.</p> },
  { id: "acceptable-use", title: "Acceptable use", body: <p>Please do not misuse the website. This includes submitting false or misleading information, submitting work you do not have the rights to, sending spam, uploading harmful files, attempting to access the admin area or other parts of the site you are not authorised to use, or interfering with how the website works.</p> },
  { id: "liability", title: "Liability and availability", body: <>
    <p>We aim to keep the website accurate and available, but it is provided as it is, and we cannot promise it will always be uninterrupted or error free. Information on the website is general and may change.</p>
    <p>To the extent permitted by law, Book Sphere is not responsible for indirect or consequential losses arising from your use of the website or of external websites we link to. Nothing in these terms limits any rights you have that cannot be limited by law.</p>
  </> },
  { id: "changes-contact", title: "Changes and contact", body: <>
    <p>We may update these terms from time to time. The latest version will always be on this page, with its effective date at the top. Continued use of the website after a change means you accept the updated terms.</p>
    <p>Questions about these terms? Email <Mail /> or use our <Link href="/contact" style={{ borderBottom: "1px solid" }}>contact page</Link>.</p>
  </> },
];

export default function Page() {
  return <LegalDoc crumb="Terms & Conditions" title={<>Terms &amp; <em>Conditions</em></>} intro="The terms that apply when you use Book Sphere, submit a book or list a reading community." sections={sections} other={{ label: "Privacy Policy", href: "/privacy" }} />;
}
