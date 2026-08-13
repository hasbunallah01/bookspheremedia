import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const FROM_ADDRESS = "Booksphere Media <noreply@bookspheremedia.online>";
const TO_ADDRESS = "hello@bookspheremedia.online";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: firstIssue?.message ?? "Invalid form data.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { firstName, lastName, email, message } = parsed.data;
  const timestamp = new Date().toISOString();

  const ownerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px 0;">New Contact Form Submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5; background: #fafafa; font-weight: 600; width: 140px;">First Name</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${escapeHtml(firstName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5; background: #fafafa; font-weight: 600;">Last Name</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${escapeHtml(lastName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5; background: #fafafa; font-weight: 600;">Email</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5; background: #fafafa; font-weight: 600; vertical-align: top;">Message</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5; background: #fafafa; font-weight: 600;">Submitted</td>
          <td style="padding: 8px 12px; border: 1px solid #e5e5e5;">${escapeHtml(timestamp)}</td>
        </tr>
      </table>
    </div>
  `;

  const visitorHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111;">
      <p>Hello ${escapeHtml(firstName)},</p>
      <p>Thank you for contacting Booksphere Media.</p>
      <p>We've successfully received your message and our team will review it as soon as possible.</p>
      <p>If your enquiry requires a response, we'll get back to you shortly.</p>
      <p>We appreciate your interest in Booksphere Media.</p>
      <p>Kind regards,<br />Booksphere Media</p>
      <p><a href="https://bookspheremedia.online">https://bookspheremedia.online</a></p>
    </div>
  `;

  try {
    const [ownerResult, visitorResult] = await Promise.all([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: email,
        subject: "New Contact Form Submission",
        html: ownerHtml,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: email,
        subject: "We've received your message — Booksphere Media",
        html: visitorHtml,
      }),
    ]);

    if (ownerResult.error || visitorResult.error) {
      const message =
        ownerResult.error?.message ??
        visitorResult.error?.message ??
        "Failed to send email.";
      return NextResponse.json(
        { ok: false, error: message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected error sending email.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
