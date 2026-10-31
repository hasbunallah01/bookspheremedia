export const FB = "https://www.facebook.com/share/151kdU5hn9G/";
export const MAIL = "bookspheremedia26@gmail.com";
export function Social({ light = false }: { light?: boolean }) {
  return (
    <div className={`socials${light ? " socials-light" : ""}`}>
      <a className="sico" href={`mailto:${MAIL}`} aria-label="Email Book Sphere" title="Email"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M24 5.46v13.9c0 .91-.73 1.64-1.64 1.64h-3.82v-9.27L12 16.64l-6.55-4.91v9.27H1.64A1.64 1.64 0 0 1 0 19.37V5.46c0-2.02 2.31-3.18 3.930-1.96L5.45 4.64 12 9.55l6.550-4.91 1.52-1.15C21.69 2.28 24 3.43 24 5.46z" /></svg></a>
      <a className="sico" href={FB} target="_blank" rel="noopener noreferrer" aria-label="Book Sphere on Facebook (opens in a new tab)" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.4 0 .96.04 1.47.1.39.04.77.11 1.14.2v3.32a8.6 8.6 0 0 0-1.390-.05c-.71 0-1.26.1-1.68.31-.29.15-.52.36-.68.62-.26.42-.37 1-.37 1.75v1.3h3.92l-.67 3.67h-3.25v8.24C19.4 23.240 24 18.18 24 12.04 24 5.42 18.63.04 12 .04S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65z" /></svg></a>
    </div>
  );
}
