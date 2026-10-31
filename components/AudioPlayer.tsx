"use client";
import { useEffect, useRef, useState } from "react";
const fmt = (s: number) => !isFinite(s) ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
export function AudioPlayer({ src, title, dark = false }: { src: string; title: string; dark?: boolean }) {
  const a = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false); const [t, setT] = useState(0); const [d, setD] = useState(0);
  useEffect(() => {
    const el = a.current; if (!el) return;
    const u = () => setT(el.currentTime), m = () => setD(el.duration), e = () => setOn(false), p = () => setOn(true), q = () => setOn(false);
    el.addEventListener("timeupdate", u); el.addEventListener("loadedmetadata", m); el.addEventListener("durationchange", m); el.addEventListener("ended", e); el.addEventListener("play", p); el.addEventListener("pause", q);
    if (el.readyState >= 1) m();
    return () => { el.removeEventListener("timeupdate", u); el.removeEventListener("loadedmetadata", m); el.removeEventListener("durationchange", m); el.removeEventListener("ended", e); el.removeEventListener("play", p); el.removeEventListener("pause", q); };
  }, []);
  const toggle = () => {
    const el = a.current; if (!el) return;
    if (el.paused) { document.querySelectorAll("audio").forEach((x) => x !== el && x.pause()); el.play(); } else el.pause();
  };
  const pct = d ? (t / d) * 100 : 0;
  return (
    <div className={`ap${dark ? " ap-d" : ""}${on ? " ap-on" : ""}`}>
      <audio ref={a} src={src} preload="metadata" />
      <button type="button" className="ap-b" onClick={toggle} aria-label={`${on ? "Pause" : "Play"} ${title}`}>
        {on ? <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          : <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6a.8.8 0 0 0 1.2.7l9.4-5.8a.8.8 0 0 0 0-1.4L5.2 1.5A.8.8 0 0 0 4 2.2Z" fill="currentColor" /></svg>}
      </button>
      <div className="ap-m">
        <input type="range" className="ap-r" min={0} max={d || 0} step={0.1} value={t} style={{ ["--p" as string]: `${pct}%` }} aria-label={`Seek ${title}`} aria-valuetext={`${fmt(t)} of ${fmt(d)}`}
          onChange={(e) => { const el = a.current; if (el) { el.currentTime = +e.target.value; setT(+e.target.value); } }} />
        <div className="ap-t"><span>{fmt(t)}</span><span>{fmt(d)}</span></div>
      </div>
    </div>
  );
}
