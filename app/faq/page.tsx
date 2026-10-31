import { Crumbs } from "@/components/Cards";
export const metadata = { title: "Frequently Asked Questions", description: "How Book Sphere works for readers and authors.", alternates: { canonical: "/faq" } };
const FAQ: [string, string][] = [
  ["What is Book Sphere?", "Book Sphere is a literary community designed to help readers discover books, learn about authors, and explore stories across different genres. It also provides authors with an opportunity to introduce their work for consideration."],
  ["Who can use Book Sphere?", "Book Sphere is intended for readers, independent authors, traditionally published authors, emerging writers, and others who appreciate books and literary discovery."],
  ["Can I submit my book?", "Yes. Authors and authorized representatives can use the book submission form to share their book details for consideration."],
  ["Does submitting a book guarantee that it will appear on Book Sphere?", "No. Each submission may be reviewed for suitability, completeness, and alignment with the platform's guidelines. Submission does not guarantee publication or promotional placement."],
  ["Can unpublished books be submitted?", "Unpublished books may be submitted if the author can provide the available information and clearly identify the expected publication status. Final eligibility depends on the platform's submission guidelines."],
  ["Does Book Sphere sell books directly?", "Book Sphere is designed primarily as a literary discovery community. Where an official purchase or publisher link is available, readers may be directed to the relevant external website. Any direct sales functionality will be identified separately if introduced."],
  ["Can I request an author feature?", "Authors may express interest in being considered for a feature. Availability, eligibility, and any applicable requirements should be explained clearly by the Book Sphere team."],
  ["Is author promotion guaranteed?", "No. Inclusion in the community and consideration for an author feature are separate from any promise of specific promotional results. Book Sphere should not guarantee sales, reviews, or a particular level of audience engagement."],
  ["How can I contact Book Sphere?", "Please use the contact form on the website, or email bookspheremedia26@gmail.com."],
  ["Can I update my book information?", "Authors can contact the Book Sphere team to request corrections or updates to published book information. If author accounts are introduced, eligible authors may also be able to manage their profiles directly."],
];
export default function Page() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["FAQ"]]} /><h1>Frequently Asked Questions</h1></div></header>
    <section><div className="wrap faq" style={{ maxWidth: 900 }}>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  </>);
}
