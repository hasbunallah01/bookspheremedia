/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { setSubmissionStatus } from "../../actions";
const STATUSES = ["RECEIVED", "UNDER_REVIEW", "INFO_REQUESTED", "APPROVED", "DECLINED", "PUBLISHED"];
export default async function Page() {
  await requireAdmin();
  const subs = await prisma.bookSubmission.findMany({ orderBy: { createdAt: "desc" } });
  return (<>
    <h1>Book submissions</h1><p className="muted" style={{ marginBottom: 24 }}>Sent through the public “Submit a Book” form. “Approve → create book” opens a pre-filled book form.</p>
    {!subs.length && <div className="acard"><p className="muted">No submissions yet.</p></div>}
    {subs.map((s) => (
      <article key={s.id} className="acard">
        <div className="row" style={{ alignItems: "flex-start", gap: 22 }}>
          {s.coverPath && <img src={`/admin/submission-cover/${s.id}`} alt="" style={{ width: 90, borderRadius: 8 }} />}
          <div style={{ flex: 1, minWidth: 240 }}>
            <span className="status">{s.status.replace("_", " ")}</span>
            <h2 style={{ fontSize: 26, margin: "10px 0 4px" }}>{s.bookTitle}{s.subtitle ? `: ${s.subtitle}` : ""}</h2>
            <p className="muted">by {s.authorName} · <a href={`mailto:${s.email}`}>{s.email}</a> · {s.primaryGenre}{s.secondaryGenre ? `, ${s.secondaryGenre}` : ""} · {s.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" })}</p>
            <details style={{ marginTop: 10 }}><summary className="more" style={{ cursor: "pointer" }}>Details</summary>
              <p className="amsg" style={{ marginTop: 10 }}>{s.description}</p>
              <p className="muted amsg" style={{ marginTop: 10 }}><b>Author bio:</b> {s.authorBio}</p>
              {s.whyInclude && <p className="muted amsg"><b>Why include:</b> {s.whyInclude}</p>}
              <p className="muted">{[s.publisher, s.format, s.isbn && `ISBN ${s.isbn}`, s.publicationDate, s.language, s.country].filter(Boolean).join(" · ")}</p>
              <p className="muted">{[s.purchaseLink, s.officialBookPage, s.authorWebsite, s.profileLink].filter(Boolean).join(" · ")}</p>
            </details>
          </div>
          <div className="row" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <Link className="btn sm" href={`/admin/books/new?from=${s.id}`}>Approve → create book</Link>
            <form action={setSubmissionStatus} className="row"><input type="hidden" name="id" value={s.id} />
              <select name="status" defaultValue={s.status} className="pill" aria-label="Status">{STATUSES.map((x) => <option key={x} value={x}>{x.replace("_", " ")}</option>)}</select>
              <button className="btn sm alt">Set</button></form>
          </div>
        </div>
      </article>))}
  </>);
}
