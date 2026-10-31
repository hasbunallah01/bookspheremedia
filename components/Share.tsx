"use client";
import { useState } from "react";
export function Share({ path, title }: { path: string; title: string }) {
  const [done, setDone] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin + path : path;
  const enc = encodeURIComponent;
  return (
    <div className="share"><span>Share:</span>
      <a href={`https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer">X</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={`mailto:?subject=${enc(title)}&body=${enc(url)}`}>Email</a>
      <button onClick={async () => { await navigator.clipboard.writeText(window.location.href); setDone(true); setTimeout(() => setDone(false), 2000); }}>{done ? "Link copied" : "Copy link"}</button>
    </div>
  );
}
