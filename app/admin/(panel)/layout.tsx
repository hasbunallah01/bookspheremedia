import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { logout } from "../actions";
import { Nav } from "./nav";
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (<>
    <div className="abar">
      <Link href="/admin" className="logo"><i /><span>Book Sphere</span></Link>
      <Nav />
      <Link className="btn sm alt" href="/" target="_blank">View site ↗</Link>
      <form action={logout}><button className="btn sm">Log out</button></form>
    </div>
    {children}
  </>);
}
