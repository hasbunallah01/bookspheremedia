"use client";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { applyAffiliate, type FormState } from "@/app/actions";
import { Field } from "./Field";
const init: FormState = { status: "idle" };
export function AffiliateApplyForm() {
  const [s, act, pending] = useActionState(applyAffiliate, init);
  const [started, setStarted] = useState(0);
  useEffect(() => setStarted(Date.now()), []);
  const top = useRef<HTMLDivElement>(null);
  useEffect(() => { if (s.status !== "idle") top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, [s]);
  const e = s.errors ?? {};
  if (s.status === "success") return (
    <div ref={top} className="success" role="status"><h2>Thank you for your interest in becoming an affiliate.</h2>
      <p>Your application has been received. Our team will review it and may contact you using the email address you provided.</p></div>);
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); startTransition(() => act(fd)); }} className="form" noValidate encType="multipart/form-data">
      <div ref={top} />
      {s.status === "error" && <div className="alert bad" role="alert">{s.message}</div>}
      <input type="hidden" name="started" value={started} />
      <div className="hp" aria-hidden="true"><label>Leave this field empty<input name="website_hp" tabIndex={-1} autoComplete="off" /></label></div>
      <fieldset className="fs"><legend><span className="lgn">Apply</span>Become an Affiliate</legend><div className="fg2">
        <Field name="communityName" label="Community name" required error={e.communityName} />
        <Field name="contactName" label="Your name" required error={e.contactName} autoComplete="name" />
        <Field name="email" type="email" label="Email address" required error={e.email} autoComplete="email" />
        <Field name="link" type="url" label="Facebook group/page or website" required error={e.link} placeholder="https://" />
        <Field name="description" label="Short description of your community" required textarea full error={e.description} maxLength={3000} />
        <Field name="logo" type="file" label="Community logo" full error={e.logo} accept="image/jpeg,image/png,image/webp" hint="JPG, PNG or WebP, up to 5 MB." />
      </div></fieldset>
      <button className="btn" disabled={pending}>{pending ? "Sending…" : "Send application"}</button>
    </form>
  );
}
