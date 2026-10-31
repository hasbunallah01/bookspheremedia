import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { readSubmissionCover, sniffImage } from "@/lib/storage";
// Private application logos are not publicly served; admins can preview them here.
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return new Response("Not found", { status: 404 });
  const sub = await prisma.affiliateApplication.findUnique({ where: { id: (await params).id } });
  const buf = await readSubmissionCover(sub?.logoPath);
  if (!buf) return new Response("Not found", { status: 404 });
  const t = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" }[sniffImage(buf)!];
  return new Response(new Uint8Array(buf), { headers: { "content-type": t, "cache-control": "private, no-store", "x-robots-tag": "noindex" } });
}
