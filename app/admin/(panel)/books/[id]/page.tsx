import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { BookForm } from "../../../ui";
import { genreNames, authorOptions, p } from "../data";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const b = await prisma.book.findUnique({ where: { id: (await params).id } }); if (!b) notFound();
  const q = p<{ text: string; attribution: string }>(b.coverQuote), r = p<{ source: string; items: string[] }>(b.recognition), sl = p<{ title: string; items: string[] }>(b.seriesList);
  return (<>
    <h1>Edit “{b.title}”</h1><p className="muted" style={{ marginBottom: 24 }}>Changes appear on the public site as soon as you save.</p>
    <BookForm authors={await authorOptions()} genres={genreNames} init={{
      id: b.id, title: b.title, subtitle: b.subtitle ?? "", series: b.series ?? "", coAuthors: b.coAuthors ?? "", hook: b.hook, description: (p<string[]>(b.description) ?? []).join("\n\n"),
      genre: b.genre, tags: p<string[]>(b.tags) ?? [], publisher: b.publisher ?? "", format: b.format ?? "", externalUrl: b.externalUrl ?? "", externalLabel: b.externalLabel ?? undefined,
      quoteText: q?.text, quoteBy: q?.attribution, recognitionSource: r?.source, recognitionItems: r?.items.join("\n"), seriesTitle: sl?.title, seriesItems: sl?.items.join("\n"),
      featured: b.featured, visible: b.visible, cover: b.cover, authorId: b.authorId,
    }} />
  </>);
}
