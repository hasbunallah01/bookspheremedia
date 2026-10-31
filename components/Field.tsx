import type { ReactNode } from "react";
type Base = { name: string; label: string; required?: boolean; hint?: string; error?: string; full?: boolean };
export function Field({ name, label, required, hint, error, full, type = "text", children, textarea, ...rest }: Base & { type?: string; children?: ReactNode; textarea?: boolean; accept?: string; maxLength?: number; placeholder?: string; autoComplete?: string }) {
  const id = `f-${name}`; const desc = [hint && `${id}-h`, error && `${id}-e`].filter(Boolean).join(" ") || undefined;
  const common = { id, name, required, "aria-invalid": error ? true : undefined, "aria-describedby": desc, ...rest };
  return (
    <div className={`field${full ? " full" : ""}`}>
      <label htmlFor={id}>{label}{required ? <span className="req"> *</span> : <span className="hint"> (optional)</span>}</label>
      {children ? <select {...common} defaultValue="">{children}</select> : textarea ? <textarea {...common} /> : <input type={type} {...common} />}
      {hint && <p className="hint" id={`${id}-h`}>{hint}</p>}
      {error && <p className="err" id={`${id}-e`} role="alert">{error}</p>}
    </div>
  );
}
