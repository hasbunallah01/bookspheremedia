import { readFile } from "node:fs/promises";
import path from "node:path";
// `next start` only serves public/ files that existed at build time, so images uploaded
// from /admin (public/uploads/...) are streamed by this handler instead.
// When storage moves to Vercel Blob, image URLs point at the Blob CDN and this route is unused.
const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };
export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path;
  if (parts.length !== 2 || !["covers", "authors", "affiliates"].includes(parts[0]) || !/^[\w-]+\.(jpg|png|webp)$/.test(parts[1])) return new Response("Not found", { status: 404 });
  try {
    const buf = await readFile(path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads", parts[0], parts[1]));
    return new Response(new Uint8Array(buf), { headers: { "content-type": TYPES[parts[1].split(".").pop()!], "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
