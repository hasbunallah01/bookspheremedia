import crypto from "node:crypto";
// Shared by lib/admin-auth.ts and proxy.ts. Token format: `${expiresMs}.${nonce}.${hmac}`
export const COOKIE = "bs_admin";
export const signToken = (v: string, secret: string) => crypto.createHmac("sha256", secret).update(v).digest("base64url");
export function verifyToken(c: string | undefined, secret: string | undefined) {
  if (!c || !secret || secret.length < 32) return false;
  const i = c.lastIndexOf("."); if (i < 0) return false;
  const v = c.slice(0, i), a = Buffer.from(c.slice(i + 1)), b = Buffer.from(signToken(v, secret));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(v.split(".")[0]) > Date.now();
}
