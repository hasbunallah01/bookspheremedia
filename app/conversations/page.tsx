import { seo, abs, JsonLd, crumbsLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/content";
import { Crumbs } from "@/components/Cards";
import { ConversationCard } from "@/components/ConversationCard";
import { conversations } from "@/data/conversations";
export const metadata = seo("Conversations", "Listen to audio conversations with authors featured on Book Sphere.", "/conversations");
const iso = (d: string) => { const m = d.match(/(\d+)\s*min/); return m ? `PT${m[1]}M` : undefined; };
const ld = conversations.map((c) => ({
  "@context": "https://schema.org", "@type": "PodcastEpisode", name: c.conversationTitle, description: c.conversationDescription,
  url: `${SITE_URL}/conversations#${c.id}`, ...(c.publishDate && { datePublished: c.publishDate }), ...(iso(c.duration) && { timeRequired: iso(c.duration) }),
  associatedMedia: { "@type": "AudioObject", contentUrl: abs(c.audioUrl), encodingFormat: "audio/mpeg", ...(iso(c.duration) && { duration: iso(c.duration) }) },
  actor: { "@type": "Person", name: c.authorName, url: `${SITE_URL}/authors/${c.authorSlug}` }, image: abs(c.bookCover),
  about: { "@type": "Book", name: c.bookTitle }, publisher: { "@id": `${SITE_URL}/#organization` },
}));
export default function Page() {
  return (<>
    <JsonLd data={[...ld, crumbsLd([["Home", "/"], ["Conversations", "/conversations"]])]} />
    <header className="phead"><div className="wrap"><Crumbs items={[["Home", "/"], ["Conversations"]]} /><h1>Conversations</h1><p className="lead">Listen to authors talk about the books they&apos;ve written, the ideas behind them, and the stories that shaped their work.</p></div></header>
    <section className="cv-sec"><div className="wrap cc-list">
      {conversations.map((c, i) => <ConversationCard key={c.id} c={c} n={i} />)}
    </div></section>
  </>);
}
