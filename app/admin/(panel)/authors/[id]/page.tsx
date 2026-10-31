import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { AuthorForm } from "../../../ui";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const a = await prisma.author.findUnique({ where: { id: (await params).id } }); if (!a) notFound();
  return (<><h1 style={{ marginBottom: 24 }}>Edit {a.name}</h1><AuthorForm a={a} /></>);
}
