import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { BookForm, type BookInit } from "../../../ui";
import { genreNames, authorOptions } from "../data";
export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  await requireAdmin();
  const from = (await searchParams).from;
  const sub = from ? await prisma.bookSubmission.findUnique({ where: { id: from } }) : null;
  let init: BookInit = { visible: true };
  if (sub) {
    const match = await prisma.author.findFirst({ where: { name: sub.authorName } });
    init = {
      visible: true, fromSubmission: sub.id, title: sub.bookTitle, subtitle: sub.subtitle ?? "", description: sub.description, hook: sub.description.split(/(?<=[.!?])\s/)[0].slice(0, 300),
      genre: genreNames.includes(sub.primaryGenre) ? sub.primaryGenre : "", tags: sub.secondaryGenre ? [sub.secondaryGenre] : [], publisher: sub.publisher ?? "", format: sub.format ?? "",
      externalUrl: sub.purchaseLink ?? sub.officialBookPage ?? "", submissionCover: sub.coverPath ? `/admin/submission-cover/${sub.id}` : undefined,
      ...(match ? { authorId: match.id } : { authorName: sub.authorName, authorBio: sub.authorBio, authorWebsite: sub.authorWebsite ?? "" }),
    };
  }
  return (<>
    <h1>{sub ? `Approve “${sub.bookTitle}”` : "Add a book"}</h1>
    <p className="muted" style={{ marginBottom: 24 }}>{sub ? "Pre-filled from the submission. Review, adjust and save to publish it." : "New books are added to the top of the list."}</p>
    <BookForm authors={await authorOptions()} genres={genreNames} init={init} />
  </>);
}
