/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteAuthor } from "../../actions";
import { ConfirmButton } from "../../ui";
export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const authors = await prisma.author.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], include: { _count: { select: { books: true } } } });
  return (<>
    <h1>Authors</h1><p className="muted" style={{ marginBottom: 24 }}>New authors are created from the book form. An author can be deleted once they have no books.</p>
    {sp.saved && <p className="ok" role="status">Author saved.</p>}
    <table className="atable"><thead><tr><th></th><th>Author</th><th>Books</th><th></th></tr></thead>
      <tbody>{authors.map((a) => (
        <tr key={a.id}>
          <td>{a.photo ? <img className="thumb" style={{ height: 48, borderRadius: "50%" }} src={a.photo} alt="" /> : <span className="thumb" style={{ display: "inline-block", height: 48, borderRadius: "50%" }} />}</td>
          <td><div className="t">{a.name}</div>{a.demo && <div className="muted">sample</div>}</td>
          <td>{a._count.books}</td>
          <td className="a"><div className="row"><Link className="btn sm alt" href={`/admin/authors/${a.id}`}>Edit</Link><Link className="btn sm alt" href={`/authors/${a.slug}`} target="_blank">View</Link>
            {a._count.books === 0 && <form action={deleteAuthor}><input type="hidden" name="id" value={a.id} /><ConfirmButton label="Delete" confirm={`Delete author “${a.name}”?`} /></form>}</div></td>
        </tr>))}</tbody></table>
  </>);
}
