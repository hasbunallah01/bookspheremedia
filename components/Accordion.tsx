"use client";
import { useState } from "react";
export function Accordion({ items }: { items: [string, string][] }) {
  const [o, setO] = useState<number | null>(0);
  return (
    <div className="acc">
      {items.map(([q, a], i) => (
        <div key={q} className={`acc-i rv${o === i ? " on" : ""}`}>
          <h3><button type="button" aria-expanded={o === i} aria-controls={`acc-${i}`} id={`accb-${i}`} onClick={() => setO(o === i ? null : i)}><span>{q}</span><i aria-hidden="true" /></button></h3>
          <div className="acc-p" id={`acc-${i}`} role="region" aria-labelledby={`accb-${i}`}><div><p>{a}</p></div></div>
        </div>
      ))}
    </div>
  );
}
