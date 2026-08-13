import type { Metadata } from "next";
import { ConversationsHero, ConversationArchive } from "@/components/conversations/ConversationsPage";

export const metadata: Metadata = {
  title: "Live Conversations",
  description:
    "Listen to meaningful conversations with authors as they share the stories behind their books and the journeys that inspired them.",
};

export default function ConversationsPage() {
  return (
    <>
      <ConversationsHero />
      <ConversationArchive />
    </>
  );
}
