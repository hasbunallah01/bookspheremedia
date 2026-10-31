import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { AffiliateForm, type AffInit } from "../../../ui";
export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  await requireAdmin();
  const from = (await searchParams).from;
  const p = from ? await prisma.affiliateApplication.findUnique({ where: { id: from } }) : null;
  const init: AffInit = p ? { visible: true, fromApplication: p.id, name: p.communityName, description: p.description, link: p.link, appLogo: p.logoPath ? `/admin/application-logo/${p.id}` : undefined } : { visible: true };
  return (<>
    <h1>{p ? `Approve “${p.communityName}”` : "Add an affiliate"}</h1>
    <p className="muted" style={{ marginBottom: 24 }}>{p ? "Pre-filled from the application (including its logo). Add a tagline and banner, then save to publish." : "New affiliates are added to the end of the list."}</p>
    <AffiliateForm init={init} />
  </>);
}
