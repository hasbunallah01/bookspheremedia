/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { toggleBook, moveBook, deleteBook } from "../actions";
import { ConfirmButton } from "../ui";
export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const books = await prisma.book.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], include: { author: true } });
  return (<>
    <div className="head" style={{ marginBottom: 24 }}><div><h1>Books</h1><p className="muted">Order here is the order on the homepage and Discover. The featured book appears in “On Our Reading Radar”.</p></div>
      <Link className="btn" href="/admin/books/new">+ Add a book</Link></div>
    {sp.saved && <p className="ok" role="status">Saved “{sp.saved}”. It is live on the site now.</p>}
    {sp.deleted && <p className="ok" role="status">Deleted “{sp.deleted}”.</p>}
    <table className="atable">
      <thead><tr><th></th><th>Book</th><th>Featured</th><th>Visible</th><th>Order</th><th></th></tr></thead>
      <tbody>{books.map((b, i) => (
        <tr key={b.id}>
          <td><img className="thumb" src={b.cover} alt="" /></td>
          <td><div className="t">{b.title}</div><div className="muted">{b.author.name} · {b.genre}{b.demo ? " · sample" : ""}</div></td>
          <td><form action={toggleBook}><input type="hidden" name="id" value={b.id} /><input type="hidden" name="field" value="featured" /><button className={`pill${b.featured ? " on" : ""}`} aria-pressed={b.featured}>{b.featured ? "★ Featured" : "☆ Feature"}</button></form></td>
          <td><form action={toggleBook}><input type="hidden" name="id" value={b.id} /><input type="hidden" name="field" value="visible" /><button className={`pill${b.visible ? " on" : ""}`} aria-pressed={b.visible}>{b.visible ? "Visible" : "Hidden"}</button></form></td>
          <td><div className="row">
            <form action={moveBook}><input type="hidden" name="id" value={b.id} /><input type="hidden" name="dir" value="up" /><button className="ibtn" disabled={i === 0} aria-label={`Move ${b.title} up`}>↑</button></form>
            <form action={moveBook}><input type="hidden" name="id" value={b.id} /><input type="hidden" name="dir" value="down" /><button className="ibtn" disabled={i === books.length - 1} aria-label={`Move ${b.title} down`}>↓</button></form>
          </div></td>
          <td className="a"><div className="row">
            <Link className="btn sm alt" href={`/admin/books/${b.id}`}>Edit</Link>
            <Link className="btn sm alt" href={`/books/${b.slug}`} target="_blank">View</Link>
            <form action={deleteBook}><input type="hidden" name="id" value={b.id} /><ConfirmButton label="Delete" confirm={`Delete “${b.title}”? This cannot be undone.`} /></form>
          </div></td>
        </tr>))}</tbody>
    </table>
  </>);
}
