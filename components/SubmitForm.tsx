"use client";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitBook, type FormState } from "@/app/actions";
import { Field } from "./Field";
import { genres } from "@/data/genres";
const init: FormState = { status: "idle" };
export function SubmitForm() {
  const [s, act, pending] = useActionState(submitBook, init);
  const [started, setStarted] = useState(0);
  useEffect(() => setStarted(Date.now()), []);
  const top = useRef<HTMLDivElement>(null);
  useEffect(() => { if (s.status !== "idle") top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [s]);
  const e = s.errors ?? {};
  const G = () => <><option value="">Choose a genre</option>{genres.map((g) => <option key={g.slug}>{g.name}</option>)}<option>Other</option></>;
  if (s.status === "success") return (
    <div ref={top} className="success" role="status">
      <h2>Thank you for introducing your book to Book Sphere.</h2>
      <p>Your submission has been received. We appreciate the opportunity to learn about your work.</p>
      <p>If further information is required, our team may contact you using the email address you provided.</p>
      <p>Please note that submitting a book does not guarantee publication or promotional placement.</p>
    </div>);
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); startTransition(() => act(fd)); }} className="form" noValidate encType="multipart/form-data">
      <div ref={top} />
      {s.status === "error" && <div className="alert bad" role="alert">{s.message}</div>}
      <input type="hidden" name="started" value={started} />
      <div className="hp" aria-hidden="true"><label>Leave this field empty<input name="website_hp" tabIndex={-1} autoComplete="off" /></label></div>
      <fieldset className="fs"><legend><span className="lgn">Section A</span>Author information</legend><div className="fg2">
        <Field name="authorName" label="Author's full name" required error={e.authorName} autoComplete="name" />
        <Field name="email" type="email" label="Preferred email address" required error={e.email} autoComplete="email" />
        <Field name="authorWebsite" type="url" label="Author website" error={e.authorWebsite} placeholder="https://" />
        <Field name="profileLink" type="url" label="Public author profile or social media link" error={e.profileLink} placeholder="https://" />
        <Field name="country" label="Country or region" />
        <Field name="authorBio" label="Short author biography" required textarea full error={e.authorBio} maxLength={3000} />
      </div></fieldset>
      <fieldset className="fs"><legend><span className="lgn">Section B</span>Book information</legend><div className="fg2">
        <Field name="bookTitle" label="Book title" required error={e.bookTitle} />
        <Field name="subtitle" label="Subtitle" />
        <Field name="primaryGenre" label="Primary genre" required error={e.primaryGenre}><G /></Field>
        <Field name="secondaryGenre" label="Secondary genre"><G /></Field>
        <Field name="description" label="Book description" required textarea full error={e.description} maxLength={8000} />
        <Field name="publicationDate" type="date" label="Publication date" />
        <Field name="publisher" label="Publisher" />
        <Field name="isbn" label="ISBN" />
        <Field name="language" label="Language" />
        <Field name="format" label="Book format"><option value="">Choose a format</option><option>Hardcover</option><option>Paperback</option><option>eBook</option><option>Audiobook</option><option>Other</option></Field>
        <Field name="cover" type="file" label="Book cover image" required accept="image/jpeg,image/png,image/webp" hint="JPG, PNG or WebP, up to 5 MB. Files are checked on the server and stored privately for review." error={e.cover} />
        <Field name="purchaseLink" type="url" label="Book purchase or publisher link" error={e.purchaseLink} placeholder="https://" />
        <Field name="officialBookPage" type="url" label="Author's official book page" error={e.officialBookPage} placeholder="https://" />
      </div></fieldset>
      <fieldset className="fs"><legend><span className="lgn">Section C</span>Additional information</legend><div className="fg2">
        <Field name="whyInclude" label="Why would you like your book to be included in Book Sphere?" textarea full />
        <div className="field full" role="radiogroup" aria-labelledby="pub-l"><span className="lab" id="pub-l">Is the book already published?<span className="req"> *</span></span>
          <div className="radios"><label><input type="radio" name="isPublished" value="yes" /> Yes</label><label><input type="radio" name="isPublished" value="no" /> No</label></div>
          {e.isPublished && <p className="err" role="alert">{e.isPublished}</p>}</div>
        <Field name="expectedPubDate" type="date" label="If it is not yet published, what is the expected publication date?" />
        <label className="check full"><input type="checkbox" name="featureInterest" /> I would like to be considered for a future author feature or interview.</label>
      </div></fieldset>
      <fieldset className="fs"><legend><span className="lgn">Section D</span>Rights and consent</legend>
        <label className="check"><input type="checkbox" name="rightsConsent" required aria-invalid={e.rightsConsent ? true : undefined} /> <span>I confirm that I am the author, publisher, or authorized representative of this book and that I have permission to submit the information and images provided. I authorize Book Sphere to review this submission for possible inclusion on its platform. I understand that submission does not guarantee publication or promotional placement. <span className="req">*</span></span></label>
        {e.rightsConsent && <p className="err" role="alert">{e.rightsConsent}</p>}
        <label className="check"><input type="checkbox" name="promotionalConsent" /> <span>I authorize Book Sphere to use the submitted book cover, author biography, and approved book information for the purpose of an agreed book listing or author feature. (optional)</span></label>
        <p className="hint">See our <a href="/privacy" style={{ borderBottom: "1px solid" }}>Privacy Policy</a> for how submitted information is used and stored.</p>
      </fieldset>
      <button className="btn" type="submit" disabled={pending}>{pending ? <><span className="spin" aria-hidden="true" />Submitting…</> : "Submit Book for Consideration"}</button>
    </form>
  );
}
