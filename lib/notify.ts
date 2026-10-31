import "server-only";

const FROM = "Book Sphere <hello@bookspheremedia.website>";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const SKIP = new Set(["id", "createdAt", "updatedAt", "status"]);
const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
const val = (v: unknown) => (v === true ? "Yes" : v === false ? "No" : v instanceof Date ? v.toISOString() : String(v));

/** Sends a summary email to NOTIFY_EMAIL. Never throws: a failed email must not break a submission. */
export async function notify(title: string, replyTo: string, fields: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY, to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;
  try {
    const rows = Object.entries(fields).filter(([k, v]) => !SKIP.has(k) && v !== null && v !== undefined && v !== "");
    const text = `${title}\n\n` + rows.map(([k, v]) => `${label(k)}: ${val(v)}`).join("\n\n") + "\n\nReply to this email to respond to the sender.";
    const html = `<div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#1f2a44"><h2 style="margin:0 0 16px">${esc(title)}</h2><table cellpadding="8" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">${rows.map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;vertical-align:top;width:34%;color:#666"><strong>${esc(label(k))}</strong></td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(val(v))}</td></tr>`).join("")}</table><p style="font-family:Arial,sans-serif;font-size:12px;color:#888;margin-top:16px">Reply to this email to respond to the sender.</p></div>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], reply_to: replyTo, subject: `Book Sphere: ${title}`, html, text }),
      cache: "no-store",
    });
    if (!res.ok) console.error("notify email failed with status", res.status);
  } catch {
    console.error("notify email request failed");
  }
}
