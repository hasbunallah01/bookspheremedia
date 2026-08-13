"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AudioPlayer } from "@/components/home/AudioPlayer";
import { featuredConversation, type Conversation } from "@/data/conversations";

/**
 * Reusable single-conversation card. Fully data-driven —
 * pass any Conversation object to feature it.
 */
export function ConversationCard({
  conversation,
}: {
  conversation: Conversation;
}) {
  const published = conversation.publishDate
    ? new Date(conversation.publishDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="card-light grid w-full max-w-full gap-6 overflow-hidden p-4 hover:shadow-card-hover sm:gap-8 sm:p-6 md:grid-cols-5 md:p-8"
    >
      {/* Book cover */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg md:col-span-2">
        <Image
          src={conversation.bookCover}
          alt={`${conversation.bookTitle} — book cover`}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-col md:col-span-3">
        <div className="flex items-center gap-3">
          <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-stone">
            <Image
              src={conversation.authorPhoto}
              alt={conversation.authorName}
              fill
              sizes="44px"
              className="object-cover"
              loading="lazy"
            />
          </span>
          <div>
            <p className="text-sm font-semibold">{conversation.authorName}</p>
            {conversation.authorRole && (
              <p className="text-xs text-charcoal/60">
                {conversation.authorRole}
              </p>
            )}
          </div>
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold leading-snug">
          {conversation.conversationTitle}
        </h3>
        <p className="mt-1 text-sm font-medium text-bronze">
          {conversation.bookTitle}
        </p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-charcoal/70">
          {conversation.conversationDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-charcoal/60">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {conversation.duration}
          </span>
          {published && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {published}
            </span>
          )}
        </div>

        <div className="mt-6">
          <AudioPlayer
            src={conversation.audioUrl}
            title={`${conversation.authorName} — ${conversation.conversationTitle}`}
          />
        </div>
      </div>
    </motion.article>
  );
}

/** Signature homepage section: one featured conversation. */
export function FeaturedConversation() {
  return (
    <section id="featured-conversation" className="section overflow-x-clip bg-stone/50">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Featured Conversation"
          title="Listen to Our Latest Conversation"
          subtitle="A professionally produced audio conversation introducing an author to readers."
        />
        <div className="mt-12">
          <ConversationCard conversation={featuredConversation} />
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/conversations"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-bronze"
          >
            Explore All Conversations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
