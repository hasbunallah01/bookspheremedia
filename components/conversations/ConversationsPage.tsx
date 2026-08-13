"use client";

import { motion } from "framer-motion";
import { ConversationCard } from "@/components/home/FeaturedConversation";
import { conversations } from "@/data/conversations";

/** Premium page hero — same editorial language as the other pages. */
export function ConversationsHero() {
  return (
    <section className="bg-ivory px-6 pb-10 pt-28 md:px-10 md:pt-36">
      <div className="container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[12px] font-medium uppercase tracking-[0.22em] text-bronze"
        >
          The Archive
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[56px]"
        >
          Live Conversations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-charcoal/70"
        >
          Listen to meaningful conversations with authors as they share the
          stories behind their books and the journeys that inspired them.
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Reusable conversation archive. One card per entry in
 * data/conversations.ts — new conversations are added there and
 * appear here automatically, stacked newest first. Comfortably
 * holds any number of cards with no layout changes.
 */
export function ConversationArchive() {
  return (
    <section className="section bg-white">
      <div className="container-narrow space-y-8">
        {conversations.map((conversation, i) => (
          <div key={conversation.id} className="relative">
            <span className="eyebrow mb-3 block text-center sm:text-left">
              Conversation #{i + 1}
            </span>
            <ConversationCard conversation={conversation} />
          </div>
        ))}
      </div>
    </section>
  );
}
