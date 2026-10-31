"use server";
import { headers } from "next/headers";

export type NewsletterState = { status: "idle" | "success" | "error" | "unavailable"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, number[]>();
function limited(key: string, max = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(key, arr);
  return arr.length > max;
}

export async function newsletterEnabled() {
  return !!(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);
}

export async function subscribe(_: NewsletterState, f: FormData): Promise<NewsletterState> {
  if (String(f.get("website_hp") ?? "")) return { status: "success" }; // honeypot
  const key = process.env.RESEND_API_KEY, audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return { status: "unavailable", message: "Newsletter sign-up is not available yet. Please check back soon." };
  const email = String(f.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const firstName = String(f.get("firstName") ?? "").trim().slice(0, 100);
  if (!EMAIL.test(email)) return { status: "error", message: "Please enter a valid email address, for example name@example.com." };
  if (f.get("consent") !== "on") return { status: "error", message: "Please confirm you would like to receive emails from Book Sphere." };
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(`nl:${ip}`)) return { status: "error", message: "Too many attempts. Please try again in a few minutes." };
  try {
    const res = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audience)}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, ...(firstName ? { first_name: firstName } : {}), unsubscribed: false }),
      cache: "no-store",
    });
    if (!res.ok && res.status !== 409) {
      console.error("Resend subscribe failed with status", res.status);
      return { status: "error", message: "We couldn't add you just now. Please try again later." };
    }
    return { status: "success" };
  } catch {
    console.error("Resend subscribe request failed");
    return { status: "error", message: "We couldn't add you just now. Please try again later." };
  }
}
