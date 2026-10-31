import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE, signToken, verifyToken } from "./session-token";
export { COOKIE };
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET is missing or too short (set it in .env)");
  return s;
}
const sign = (v: string) => signToken(v, secret());

export function checkPassword(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  // Compare fixed-length digests so timing does not leak length or content.
  const h = (s: string) => crypto.createHash("sha256").update(s).digest();
  return crypto.timingSafeEqual(h(input), h(pw));
}

export async function createSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const nonce = crypto.randomBytes(12).toString("base64url");
  const v = `${exp}.${nonce}`;
  (await cookies()).set(COOKIE, `${v}.${sign(v)}`, {
    httpOnly: true, sameSite: "strict", path: "/", maxAge: MAX_AGE,
    secure: (process.env.SITE_URL ?? "").startsWith("https://"),
  });
}
export async function destroySession() { (await cookies()).delete(COOKIE); }

export async function isAdmin() {
  return verifyToken((await cookies()).get(COOKIE)?.value, process.env.ADMIN_SESSION_SECRET);
}
/** Use at the top of every admin page and server action. */
export async function requireAdmin() { if (!(await isAdmin())) redirect("/admin/login"); }

// In-memory login rate limit (per IP): 5 failed attempts per 15 minutes.
const fails = new Map<string, number[]>();
const WINDOW = 15 * 60_000, MAX = 5;
// Plus a global cap (30 / 15 min) so rotating a spoofed X-Forwarded-For header doesn't bypass it.
const recent = (k: string) => { const now = Date.now(); const a = (fails.get(k) ?? []).filter((t) => now - t < WINDOW); fails.set(k, a); return a.length; };
export function loginBlocked(ip: string) { return recent(ip) >= MAX || recent("*") >= 30; }
export function loginFailed(ip: string) { for (const k of [ip, "*"]) fails.set(k, [...(fails.get(k) ?? []), Date.now()]); }
export function loginOk(ip: string) { fails.delete(ip); }
