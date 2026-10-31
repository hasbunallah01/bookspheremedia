import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
export default async function Page() {
  await requireAdmin();
  const msgs = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return (<>
    <h1>Contact messages</h1><p className="muted" style={{ marginBottom: 24 }}>Read-only. Reply by email.</p>
    {!msgs.length && <div className="acard"><p className="muted">No messages yet.</p></div>}
    {msgs.map((m) => (
      <article key={m.id} className="acard">
        <p className="muted">{m.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })} · <span className="status">{m.subject}</span></p>
        <h2 style={{ fontSize: 22, margin: "8px 0" }}>{m.name} · <a className="tl" href={`mailto:${m.email}`}>{m.email}</a></h2>
        <p className="amsg">{m.message}</p>
      </article>))}
  </>);
}
