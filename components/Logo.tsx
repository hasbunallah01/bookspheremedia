import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
// variant "nav": light (blended) lockup over dark tops, crossfading to navy/gold when the header turns cream.
export function Logo({ variant = "nav" }: { variant?: "nav" | "dark" | "footer" }) {
  if (variant === "footer") return <Link className="logo logo-f" href="/" aria-label="Book Sphere, home"><img src="/brand/lockup-tagline-hero.svg" alt="Book Sphere — Real authors. Real conversations. Real impact." width={752} height={158} /></Link>;
  if (variant === "dark") return <Link className="logo logo-x" href="/" aria-label="Book Sphere, home"><img src="/brand/lockup.svg" alt="Book Sphere" width={752} height={160} /></Link>;
  return (
    <Link className="logo logo-n" href="/" aria-label="Book Sphere, home">
      <img className="lg-l" src="/brand/lockup-hero.svg" alt="" width={752} height={160} />
      <img className="lg-d" src="/brand/lockup.svg" alt="" width={752} height={160} aria-hidden="true" />
    </Link>
  );
}
