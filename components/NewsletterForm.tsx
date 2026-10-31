"use client";
import { startTransition, useActionState } from "react";
import { subscribe, type NewsletterState } from "@/app/newsletter";
import { Field } from "./Field";
export function NewsletterForm() {
  const [s, act, pending] = useActionState(subscribe, { status: "idle" } as NewsletterState);
  if (s.status === "success") return <div className="success" role="status"><h3>You're on the list.</h3><p>Thank you for joining. Every email includes a link to unsubscribe at any time.</p></div>;
  if (s.status === "unavailable") return <p className="notice" role="status" style={{ margin: 0 }}>{s.message}</p>;
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); startTransition(() => act(fd)); }} className="form" noValidate style={{ maxWidth: 560 }}>
      {s.status === "error" && <div className="alert bad" role="alert">{s.message}</div>}
      <div className="hp" aria-hidden="true"><label>Leave this field empty<input name="website_hp" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="fg2">
        <Field name="firstName" label="First name" autoComplete="given-name" />
        <Field name="email" type="email" label="Email address" required autoComplete="email" />
      </div>
      <label className="check"><input type="checkbox" name="consent" /> <span>I'd like occasional emails from Book Sphere and can unsubscribe at any time. See the <a href="/privacy" style={{ borderBottom: "1px solid" }}>Privacy Policy</a>. <span className="req">*</span></span></label>
      <button className="btn" type="submit" disabled={pending} style={{ marginTop: 20 }}>{pending ? <><span className="spin" aria-hidden="true" />Joining…</> : "Join the Newsletter"}</button>
    </form>
  );
}
