import { Crumbs } from "@/components/Cards";
import { ConversationCard } from "@/components/ConversationCard";
import { conversations } from "@/data/conversations";
export const metadata = { title: "Conversations", description: "Listen to audio conversations with authors featured on Book Sphere.", alternates: { canonical: "/conversations" } };
export default function Page() {
  return (<>
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Conversations"]]} /><h1>Conversations</h1><p className="lead">Listen to authors talk about the books they&apos;ve written, the ideas behind them, and the stories that shaped their work.</p></div></header>
    <section className="cv-sec"><div className="wrap cc-list">
      {conversations.map((c, i) => <ConversationCard key={c.id} c={c} n={i} />)}
    </div></section>
  </>);
}
