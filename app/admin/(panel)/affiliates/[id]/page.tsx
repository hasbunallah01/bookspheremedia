import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { AffiliateForm } from "../../../ui";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const a = await prisma.affiliate.findUnique({ where: { id: (await params).id } });
  if (!a) notFound();
  return (<><h1>Edit “{a.name}”</h1><p className="muted" style={{ marginBottom: 24 }}>Changes are live as soon as you save.</p>
    <AffiliateForm init={{ id: a.id, name: a.name, tagline: a.tagline ?? "", description: a.description, link: a.link, logo: a.logo ?? undefined, banner: a.banner ?? undefined, visible: a.visible }} /></>);
}
