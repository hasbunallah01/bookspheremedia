"use client";
import { startTransition, useActionState } from "react";
import { sendContact, type FormState } from "@/app/actions";
import { Field } from "./Field";
export function ContactForm() {
  const [s, act, pending] = useActionState(sendContact, { status: "idle" } as FormState);
  const e = s.errors ?? {};
  if (s.status === "success") return <div className="success" role="status"><h2>Thank you for your message.</h2><p>Your message has been received and stored securely for the Book Sphere team. If a reply is needed, we will use the email address you provided.</p></div>;
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); startTransition(() => act(fd)); }} className="form" noValidate>
      {s.status === "error" && <div className="alert bad" role="alert">{s.message}</div>}
      <div className="hp" aria-hidden="true"><label>Leave this field empty<input name="website_hp" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="fg2">
        <Field name="name" label="Full name" required error={e.name} autoComplete="name" />
        <Field name="email" type="email" label="Email address" required error={e.email} autoComplete="email" />
        <Field name="subject" label="Subject" required error={e.subject} full><option value="">Choose a subject</option>{["General inquiry", "Book submission", "Author feature", "Technical issue", "Partnership inquiry", "Other"].map((o) => <option key={o}>{o}</option>)}</Field>
        <Field name="message" label="Message" required textarea full error={e.message} maxLength={5000} />
      </div>
      <label className="check"><input type="checkbox" name="consent" /> <span>I understand that Book Sphere will store my name, email and message only to respond to this inquiry, as described in the <a href="/privacy" style={{ borderBottom: "1px solid" }}>Privacy Policy</a>. <span className="req">*</span></span></label>
      {e.consent && <p className="err" role="alert">{e.consent}</p>}
      <button className="btn" type="submit" disabled={pending} style={{ marginTop: 20 }}>{pending ? <><span className="spin" aria-hidden="true" />Sending…</> : "Send Message"}</button>
    </form>
  );
}
