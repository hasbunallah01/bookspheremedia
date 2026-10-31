import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifyToken } from "@/lib/session-token";
// Gate every /admin route except the login page before anything renders.
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return NextResponse.next();
  if (verifyToken(req.cookies.get(COOKIE)?.value, process.env.ADMIN_SESSION_SECRET)) {
    const res = NextResponse.next(); res.headers.set("X-Robots-Tag", "noindex, nofollow"); res.headers.set("Cache-Control", "private, no-store"); return res;
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
export const config = { matcher: ["/admin", "/admin/:path*"] };
