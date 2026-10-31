"use client";
import { useActionState, useState, startTransition, type FormEvent } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { login, saveBook, saveAuthor, saveAffiliate, type AdminState } from "./actions";

export function Submit({ children, className = "btn", busy }: { children: React.ReactNode; className?: string; busy?: boolean }) {
  const { pending: p } = useFormStatus(); const pending = busy ?? p;
  return <button className={className} disabled={pending}>{pending ? "Saving…" : children}</button>;
}
/** Small button that asks for confirmation before submitting its form. */
export function ConfirmButton({ label, confirm, className = "btn sm danger" }: { label: string; confirm: string; className?: string }) {
  return <button className={className} onClick={(e) => { if (!window.confirm(confirm)) e.preventDefault(); }}>{label}</button>;
}

/** Submit without React's automatic form reset, so typed values survive validation errors. */
const keep = (act: (f: FormData) => void) => (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const fd = new FormData(e.currentTarget); startTransition(() => act(fd)); };

function F({ label, name, err, hint, req, full, children }: { label: string; name: string; err?: string; hint?: string; req?: boolean; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label htmlFor={`f-${name}`}>{label}{req ? <span className="req"> *</span> : <span className="hint"> (optional)</span>}</label>
      {children}
      {hint && <p className="hint">{hint}</p>}
      {err && <p className="err" role="alert">{err}</p>}
    </div>
  );
}

export function LoginForm() {
  const [st, act] = useActionState<AdminState, FormData>(login, {});
  return (
    <form action={act} className="acard login">
      <div className="field"><label htmlFor="pw">Admin password</label><input id="pw" name="password" type="password" autoComplete="current-password" required autoFocus /></div>
      {st.message && <p className="err" role="alert">{st.message}</p>}
      <Submit>Log in</Submit>
    </form>
  );
}

export type BookInit = {
  id?: string; title?: string; subtitle?: string; series?: string; coAuthors?: string; hook?: string; description?: string; genre?: string; tags?: string[];
  publisher?: string; format?: string; language?: string; published?: string; externalUrl?: string; externalLabel?: string;
  quoteText?: string; quoteBy?: string; recognitionSource?: string; recognitionItems?: string; seriesTitle?: string; seriesItems?: string;
  featured?: boolean; visible?: boolean; cover?: string; authorId?: string; authorName?: string; authorBio?: string; authorWebsite?: string;
  fromSubmission?: string; submissionCover?: string;
};
type Opt = { id: string; name: string };

function ImagePick({ name, label, current, err, req }: { name: string; label: string; current?: string; err?: string; req?: boolean }) {
  const [prev, setPrev] = useState(current);
  return (
    <F label={label} name={name} err={err} req={req} hint="JPG, PNG or WebP, up to 5 MB." full>
      <div className="pick">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {prev ? <img src={prev} alt="" /> : <span className="ph">No image</span>}
        <input id={`f-${name}`} name={name} type="file" accept="image/jpeg,image/png,image/webp"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) setPrev(URL.createObjectURL(f)); }} />
      </div>
    </F>
  );
}

export function BookForm({ init, authors, genres }: { init: BookInit; authors: Opt[]; genres: string[] }) {
  const [st, act, busy] = useActionState<AdminState, FormData>(saveBook, {});
  const e = st.errors ?? {};
  const [mode, setMode] = useState(init.authorId || !init.authorName ? "existing" : "new");
  const [genre, setGenre] = useState(init.genre ?? "");
  return (
    <form onSubmit={keep(act)} className="aform" noValidate={false}>
      <input type="hidden" name="id" value={init.id ?? ""} />
      <input type="hidden" name="fromSubmission" value={init.fromSubmission ?? ""} />
      {st.message && <p className="notice err" role="alert">{st.message}</p>}
      <fieldset className="acard"><legend>The book</legend><div className="fg2">
        <F label="Title" name="title" err={e.title} req full><input id="f-title" name="title" type="text" defaultValue={init.title} required /></F>
        <F label="Subtitle" name="subtitle"><input id="f-subtitle" name="subtitle" type="text" defaultValue={init.subtitle} /></F>
        <F label="Series line" name="series" hint="e.g. A Court of Thorns and Roses, Book 6"><input id="f-series" name="series" type="text" defaultValue={init.series} /></F>
        <F label="Co-authors" name="coAuthors" hint="optional, shown in the byline, e.g. D.K. Holmberg"><input id="f-coAuthors" name="coAuthors" type="text" defaultValue={init.coAuthors} /></F>
        <F label="One-line hook" name="hook" err={e.hook} req full hint="Shown under the title on book cards."><input id="f-hook" name="hook" type="text" defaultValue={init.hook} maxLength={400} required /></F>
        <F label="Description" name="description" err={e.description} req full hint="Leave a blank line between paragraphs."><textarea id="f-description" name="description" rows={10} defaultValue={init.description} required /></F>
        <F label="Category" name="genre" err={e.genre} req>
          <select id="f-genre" name="genre" value={genre} onChange={(x) => setGenre(x.target.value)} required><option value="">Choose…</option>{genres.map((g) => <option key={g}>{g}</option>)}</select>
        </F>
        <div className="field"><span className="lab">Extra tags <span className="hint">(optional)</span></span>
          <div className="chips">{genres.filter((g) => g !== genre).map((g) => <label key={g} className="chip"><input type="checkbox" name="tags" value={g} defaultChecked={init.tags?.includes(g)} /> {g}</label>)}</div></div>
        <F label="Publisher" name="publisher"><input id="f-publisher" name="publisher" type="text" defaultValue={init.publisher} /></F>
        <F label="Format" name="format" hint="e.g. Paperback, Hardcover, eBook"><input id="f-format" name="format" type="text" defaultValue={init.format} /></F>
        <F label="Buy link" name="externalUrl" err={e.externalUrl} hint="Leave empty to hide the purchase button."><input id="f-externalUrl" name="externalUrl" type="url" defaultValue={init.externalUrl} placeholder="https://" /></F>
        <F label="Buy button text" name="externalLabel"><input id="f-externalLabel" name="externalLabel" type="text" defaultValue={init.externalLabel ?? "Explore Purchase Options"} /></F>
        <ImagePick name="cover" label="Cover image" current={init.cover ?? init.submissionCover} err={e.cover} req={!init.cover && !init.submissionCover} />
      </div></fieldset>

      <fieldset className="acard"><legend>Cover quote &amp; recognition</legend><div className="fg2">
        <F label="Cover quote" name="quoteText" full><textarea id="f-quoteText" name="quoteText" rows={3} defaultValue={init.quoteText} /></F>
        <F label="Quote attribution" name="quoteBy" full hint="e.g. Wall Street Journal"><input id="f-quoteBy" name="quoteBy" type="text" defaultValue={init.quoteBy} /></F>
        <F label="Recognition source" name="recognitionSource"><input id="f-recognitionSource" name="recognitionSource" type="text" defaultValue={init.recognitionSource ?? "From the publisher's description"} /></F>
        <F label="Recognition (one per line)" name="recognitionItems" full><textarea id="f-recognitionItems" name="recognitionItems" rows={4} defaultValue={init.recognitionItems} /></F>
        <F label="Series list heading" name="seriesTitle" hint="e.g. The series includes:"><input id="f-seriesTitle" name="seriesTitle" type="text" defaultValue={init.seriesTitle} /></F>
        <F label="Series titles (one per line)" name="seriesItems"><textarea id="f-seriesItems" name="seriesItems" rows={4} defaultValue={init.seriesItems} /></F>
      </div></fieldset>

      <fieldset className="acard"><legend>Author</legend>
        <div className="seg" role="radiogroup">
          <label className={mode === "existing" ? "on" : ""}><input type="radio" name="authorMode" value="existing" checked={mode === "existing"} onChange={() => setMode("existing")} /> Existing author</label>
          <label className={mode === "new" ? "on" : ""}><input type="radio" name="authorMode" value="new" checked={mode === "new"} onChange={() => setMode("new")} /> New author</label>
        </div>
        {mode === "existing" ? (
          <F label="Author" name="authorId" err={e.authorId} req>
            <select id="f-authorId" name="authorId" defaultValue={init.authorId ?? ""}><option value="">Choose…</option>{authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select>
          </F>
        ) : (
          <div className="fg2">
            <F label="Name" name="authorName" err={e.authorName} req><input id="f-authorName" name="authorName" type="text" defaultValue={init.authorName} /></F>
            <F label="Website" name="authorWebsite" err={e.authorWebsite}><input id="f-authorWebsite" name="authorWebsite" type="url" defaultValue={init.authorWebsite} placeholder="https://" /></F>
            <F label="Biography" name="authorBio" err={e.authorBio} req full hint="Leave a blank line between paragraphs."><textarea id="f-authorBio" name="authorBio" rows={6} defaultValue={init.authorBio} /></F>
            <ImagePick name="authorPhoto" label="Author photo" err={e.authorPhoto} />
          </div>
        )}
      </fieldset>

      <fieldset className="acard"><legend>On the site</legend>
        <label className="chk"><input type="checkbox" name="visible" defaultChecked={init.visible ?? true} /> Visible on the public site</label>
        <label className="chk"><input type="checkbox" name="featured" defaultChecked={init.featured} /> Featured in “On Our Reading Radar” on the homepage (replaces the current featured book)</label>
      </fieldset>
      <div className="btns"><Submit busy={busy}>{init.id ? "Save changes" : "Add book"}</Submit><Link className="btn alt" href="/admin">Cancel</Link></div>
    </form>
  );
}

export function AuthorForm({ a }: { a: { id: string; name: string; bio: string; website?: string | null; photo?: string | null } }) {
  const [st, act, busy] = useActionState<AdminState, FormData>(saveAuthor, {});
  const e = st.errors ?? {};
  return (
    <form onSubmit={keep(act)} className="aform" noValidate={false}>
      <input type="hidden" name="id" value={a.id} />
      {st.message && <p className="notice err" role="alert">{st.message}</p>}
      <fieldset className="acard"><legend>Author</legend><div className="fg2">
        <F label="Name" name="name" err={e.name} req><input id="f-name" name="name" type="text" defaultValue={a.name} required /></F>
        <F label="Website" name="website" err={e.website}><input id="f-website" name="website" type="url" defaultValue={a.website ?? ""} /></F>
        <F label="Biography" name="bio" err={e.bio} req full hint="Leave a blank line between paragraphs."><textarea id="f-bio" name="bio" rows={10} defaultValue={a.bio} required /></F>
        <ImagePick name="photo" label="Photo" current={a.photo ?? undefined} err={e.photo} />
        {a.photo && <label className="chk"><input type="checkbox" name="removePhoto" /> Remove current photo</label>}
      </div></fieldset>
      <div className="btns"><Submit busy={busy}>Save author</Submit><Link className="btn alt" href="/admin/authors">Cancel</Link></div>
    </form>
  );
}

export type AffInit = { id?: string; name?: string; tagline?: string; description?: string; link?: string; logo?: string; banner?: string; visible?: boolean; fromApplication?: string; appLogo?: string };
export function AffiliateForm({ init }: { init: AffInit }) {
  const [st, act, busy] = useActionState<AdminState, FormData>(saveAffiliate, {});
  const e = st.errors ?? {};
  return (
    <form onSubmit={keep(act)} className="aform">
      <input type="hidden" name="id" value={init.id ?? ""} />
      <input type="hidden" name="fromApplication" value={init.fromApplication ?? ""} />
      {st.message && <p className="notice err" role="alert">{st.message}</p>}
      <fieldset className="acard"><legend>Community</legend><div className="fg2">
        <F label="Name" name="name" err={e.name} req><input id="f-name" name="name" type="text" defaultValue={init.name} required /></F>
        <F label="Tagline" name="tagline"><input id="f-tagline" name="tagline" type="text" defaultValue={init.tagline} /></F>
        <F label="Description" name="description" err={e.description} req full><textarea id="f-description" name="description" rows={4} defaultValue={init.description} required /></F>
        <F label="Facebook or website link" name="link" err={e.link} req full><input id="f-link" name="link" type="url" defaultValue={init.link} placeholder="https://" required /></F>
        <ImagePick name="logo" label="Logo (shown round; leave empty if they have none)" current={init.logo ?? init.appLogo} err={e.logo} />
        {init.logo && <label className="chk"><input type="checkbox" name="removeLogo" /> Remove current logo</label>}
        <ImagePick name="banner" label="Banner" current={init.banner} err={e.banner} />
        {init.banner && <label className="chk"><input type="checkbox" name="removeBanner" /> Remove current banner</label>}
      </div></fieldset>
      <fieldset className="acard"><legend>On the site</legend>
        <label className="chk"><input type="checkbox" name="visible" defaultChecked={init.visible ?? true} /> Visible on the public site</label>
      </fieldset>
      <div className="btns"><Submit busy={busy}>{init.id ? "Save changes" : "Add affiliate"}</Submit><Link className="btn alt" href="/admin/affiliates">Cancel</Link></div>
    </form>
  );
}
