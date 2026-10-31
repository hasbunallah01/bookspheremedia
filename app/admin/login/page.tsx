import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { Logo } from "@/components/Logo";
import { LoginForm } from "../ui";
export default async function Page() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div style={{ textAlign: "center", paddingTop: 40 }}>
      <div style={{ display: "inline-block", marginBottom: 26 }}><Logo variant="dark" /></div>
      <h1>Admin sign in</h1><p className="muted">Manage featured books and authors.</p>
      <LoginForm />
    </div>
  );
}
