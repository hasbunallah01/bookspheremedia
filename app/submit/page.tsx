import { seo } from "@/lib/seo";
import { Crumbs } from "@/components/Cards";
import { SubmitForm } from "@/components/SubmitForm";
export const metadata = seo("Submit a Book", "Submit your book to Book Sphere for consideration as a featured title, with author details, cover and purchase link.", "/submit");
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Submit a Book"]]} /><h1>Introduce Your Book to Book Sphere</h1>
      <div className="prose"><p>Every book begins with an idea, and every author has a story worth introducing. If you would like your book to be considered for inclusion in Book Sphere, share its details with us through the submission form below.</p><p>Our team can review the information and determine whether the book is suitable for the platform&apos;s current content and community guidelines.</p><p>Submitting a book does not automatically guarantee publication or promotion. If additional information is required, the team may contact you using the details provided.</p></div></div></header>
    <section style={{ paddingTop: 70 }}><div className="wrap fbody">
      <aside className="toc" id="guidelines"><p className="sec">Submission guidelines</p><p style={{ fontSize: 14, marginBottom: 10 }}>Fields marked * are required.</p><p style={{ fontSize: 14, marginBottom: 10 }}>Have your book description, a short author biography and a cover image (JPG, PNG or WebP, up to 5 MB) ready.</p><p style={{ fontSize: 14 }}>Each submission is reviewed by the team before anything is published. There is no submission fee.</p></aside>
      <SubmitForm />
    </div></section>
  </>);
}
