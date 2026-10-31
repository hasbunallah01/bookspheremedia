/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { toggleAffiliate, moveAffiliate, deleteAffiliate, setApplicationStatus } from "../../actions";
import { ConfirmButton } from "../../ui";
export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const [affs, apps] = await Promise.all([
    prisma.affiliate.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
    prisma.affiliateApplication.findMany({ orderBy: { createdAt: "desc" } }),
  ]);
  return (<>
    <div className="head" style={{ marginBottom: 24 }}><div><h1>Affiliates</h1><p className="muted">Order here is the order on /affiliates and the homepage strip.</p></div>
      <Link className="btn" href="/admin/affiliates/new">+ Add an affiliate</Link></div>
    {sp.saved && <p className="ok" role="status">Saved “{sp.saved}”. It is live on the site now.</p>}
    {sp.deleted && <p className="ok" role="status">Deleted “{sp.deleted}”.</p>}
    <table className="atable"><thead><tr><th></th><th>Community</th><th>Visible</th><th>Order</th><th></th></tr></thead>
      <tbody>{affs.map((a, i) => (
        <tr key={a.id}>
          <td>{a.logo ? <img className="thumb" style={{ height: 48, width: 48, borderRadius: "50%", objectFit: "cover" }} src={a.logo} alt="" /> : a.banner ? <img className="thumb" style={{ height: 48, width: 96, objectFit: "cover" }} src={a.banner} alt="" /> : null}</td>
          <td><div className="t">{a.name}</div><div className="muted">{a.tagline}</div></td>
          <td><form action={toggleAffiliate}><input type="hidden" name="id" value={a.id} /><button className={`pill${a.visible ? " on" : ""}`} aria-pressed={a.visible}>{a.visible ? "Visible" : "Hidden"}</button></form></td>
          <td><div className="row">
            <form action={moveAffiliate}><input type="hidden" name="id" value={a.id} /><input type="hidden" name="dir" value="up" /><button className="ibtn" disabled={i === 0} aria-label={`Move ${a.name} up`}>↑</button></form>
            <form action={moveAffiliate}><input type="hidden" name="id" value={a.id} /><input type="hidden" name="dir" value="down" /><button className="ibtn" disabled={i === affs.length - 1} aria-label={`Move ${a.name} down`}>↓</button></form>
          </div></td>
          <td className="a"><div className="row">
            <Link className="btn sm alt" href={`/admin/affiliates/${a.id}`}>Edit</Link>
            <form action={deleteAffiliate}><input type="hidden" name="id" value={a.id} /><ConfirmButton label="Delete" confirm={`Delete “${a.name}”? This cannot be undone.`} /></form>
          </div></td>
        </tr>))}</tbody></table>
    <h2 style={{ fontSize: 32, margin: "48px 0 8px" }}>Applications</h2><p className="muted" style={{ marginBottom: 20 }}>From the “Become an Affiliate” form. “Approve → create affiliate” opens a pre-filled form.</p>
    {!apps.length && <div className="acard"><p className="muted">No applications yet.</p></div>}
    {apps.map((p) => (
      <article key={p.id} className="acard">
        <div className="row" style={{ alignItems: "flex-start", gap: 22 }}>
          {p.logoPath && <img src={`/admin/application-logo/${p.id}`} alt="" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover" }} />}
          <div style={{ flex: 1, minWidth: 240 }}>
            <span className="status">{p.status}</span>
            <h2 style={{ fontSize: 26, margin: "10px 0 4px" }}>{p.communityName}</h2>
            <p className="muted">{p.contactName} · <a href={`mailto:${p.email}`}>{p.email}</a> · <a href={p.link} target="_blank" rel="noopener noreferrer">{p.link}</a> · {p.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" })}</p>
            <p className="amsg" style={{ marginTop: 10 }}>{p.description}</p>
          </div>
          <div className="row" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <Link className="btn sm" href={`/admin/affiliates/new?from=${p.id}`}>Approve → create affiliate</Link>
            <form action={setApplicationStatus} className="row"><input type="hidden" name="id" value={p.id} />
              <select name="status" defaultValue={p.status} className="pill" aria-label="Status">{["RECEIVED", "APPROVED", "DECLINED"].map((x) => <option key={x}>{x}</option>)}</select>
              <button className="btn sm alt">Set</button></form>
          </div>
        </div>
      </article>))}
  </>);
}
