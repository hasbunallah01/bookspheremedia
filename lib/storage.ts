import "server-only";
import { mkdir, writeFile, unlink, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { put, del } from "@vercel/blob";

// In production on Vercel (BLOB_READ_WRITE_TOKEN set) images go to Vercel Blob; locally they go to public/uploads.
const blobEnabled = () => !!process.env.BLOB_READ_WRITE_TOKEN && !!process.env.VERCEL;
// Image storage helper. Currently writes to public/uploads on the local disk and returns a public URL.
// To move to Vercel Blob later, replace saveImage/deleteImage with `put()`/`del()` from @vercel/blob
// (return blob.url) – callers only rely on the returned URL string.

export const MAX_IMAGE = 5 * 1024 * 1024;
export type ImageExt = "jpg" | "png" | "webp";

/** Check the actual file bytes (magic numbers), not just the extension or MIME type. */
export function sniffImage(buf: Buffer): ImageExt | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}

/** Validate an uploaded File. Returns null when no file was chosen. */
export async function readImageUpload(f: FormDataEntryValue | null): Promise<{ buf: Buffer; ext: ImageExt } | { error: string } | null> {
  if (!(f instanceof File) || f.size === 0) return null;
  if (f.size > MAX_IMAGE) return { error: "Images must be 5 MB or smaller." };
  const buf = Buffer.from(await f.arrayBuffer());
  const ext = sniffImage(buf);
  return ext ? { buf, ext } : { error: "Please upload a JPG, PNG or WebP image." };
}

const root = () => path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads");

export async function saveImage(buf: Buffer, ext: ImageExt, folder: "covers" | "authors" | "affiliates"): Promise<string> {
  if (blobEnabled()) {
    const blob = await put(`uploads/${folder}/${crypto.randomUUID()}.${ext}`, buf, { access: "public", contentType: ext === "jpg" ? "image/jpeg" : `image/${ext}` });
    return blob.url;
  }
  const dir = path.join(root(), folder);
  await mkdir(dir, { recursive: true });
  const name = `${crypto.randomUUID()}.${ext}`;
  await writeFile(path.join(dir, name), buf);
  return `/uploads/${folder}/${name}`;
}

/** Deletes a file previously returned by saveImage. Ignores anything outside /uploads (e.g. original site images). */
export async function deleteImage(url: string | null | undefined) {
  if (url && /^https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\/uploads\//.test(url)) {
    if (process.env.BLOB_READ_WRITE_TOKEN) await del(url).catch(() => {});
    return;
  }
  if (!url || !/^\/uploads\/(covers|authors|affiliates)\/[\w-]+\.(jpg|png|webp)$/.test(url)) return;
  await unlink(path.join(root(), url.slice("/uploads/".length))).catch(() => {});
}

/** Store a private submission image. Local: storage/uploads (not served). Vercel: Blob under an unguessable random URL. */
export async function savePrivateUpload(buf: Buffer, ext: ImageExt): Promise<string> {
  const fname = `${crypto.randomUUID()}.${ext}`;
  if (blobEnabled()) {
    const blob = await put(`private/${fname}`, buf, { access: "public", addRandomSuffix: true });
    return `blob:${blob.url}`;
  }
  const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), "storage", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fname), buf);
  return `storage/uploads/${fname}`;
}

/** Read a privately stored book-submission cover (storage/uploads/... or blob:https://...). */
export async function readSubmissionCover(p: string | null | undefined): Promise<Buffer | null> {
  if (p && /^blob:https:\/\/[\w-]+\.public\.blob\.vercel-storage\.com\//.test(p)) {
    const r = await fetch(p.slice(5)).catch(() => null);
    return r?.ok ? Buffer.from(await r.arrayBuffer()) : null;
  }
  if (!p || !/^storage\/uploads\/[\w-]+\.(jpg|png|webp)$/.test(p)) return null;
  return readFile(path.join(/*turbopackIgnore: true*/ process.cwd(), p)).catch(() => null);
}
