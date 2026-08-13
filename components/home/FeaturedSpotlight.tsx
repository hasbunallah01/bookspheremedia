"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe,
  Mail,
  ShoppingCart,
  Star,
  UserRound,
} from "lucide-react";
import { spotlights, type Spotlight } from "@/data/home";

/**
 * Premium editorial author card — the reusable template for every
 * featured author. All content comes from data/home.ts (spotlights[]);
 * replace the data object to feature a new author. The carousel
 * controls cycle through all entries.
 */
function SpotlightCard({ item }: { item: Spotlight }) {
  return (
    <div className="p-4 pt-6 sm:p-6 md:p-8">
      {/* Banner with overlapping author photo */}
      <div className="relative">
        <div className="relative aspect-[16/7] overflow-hidden rounded-xl sm:aspect-[16/6]">
          <Image
            src={item.banner}
            alt={item.bannerAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full shadow-card-hover ring-4 ring-white sm:h-28 sm:w-28 md:left-10 md:translate-x-0">
          <Image
            src={item.authorPhoto}
            alt={item.authorName}
            fill
            sizes="112px"
            className="object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Author identity */}
      <div className="mt-14 text-center md:mt-4 md:pl-44 md:text-left">
        <h2 className="font-display text-2xl font-bold text-forest md:text-3xl">
          {item.authorName}
        </h2>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-charcoal/70">
          <span aria-hidden className="text-bronze">✒</span>
          {item.authorTitle}
        </p>
        <span
          aria-hidden
          className="mx-auto mt-2 block h-px w-14 bg-bronze/60 md:mx-0"
        />
      </div>

      {/* Book block: cover + details */}
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_240px]">
        <div className="order-2 md:order-1">
          <h3 className="font-display text-2xl font-bold md:text-3xl">
            {item.bookTitle}
          </h3>
          <p className="mt-2 font-display italic text-bronze">{item.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.genres.map((g) => (
              <span
                key={g}
                className="rounded-full border border-mist bg-stone px-3.5 py-1.5 text-xs font-medium text-charcoal/75"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-charcoal/70">
            {item.description}
          </p>

          {/* Meta row */}
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-mist pt-5 sm:gap-6">
            <MetaItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Published"
              value={item.publishedDate}
            />
            <MetaItem
              icon={<Globe className="h-4 w-4" />}
              label="Language"
              value={item.language}
            />
            <MetaItem
              icon={<BookOpen className="h-4 w-4" />}
              label="Pages"
              value={item.pages}
            />
          </div>
        </div>

        {/* Book cover — floats up beside the identity block on desktop */}
        <div className="order-1 mx-auto w-40 sm:w-44 md:order-2 md:-mt-24 md:w-auto">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-card-hover ring-1 ring-mist">
            <Image
              src={item.bookCover}
              alt={`${item.bookTitle} — book cover`}
              fill
              sizes="(max-width: 768px) 176px, 240px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <a
          href={item.contactUrl}
          {...(item.contactUrl.startsWith("http")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
          className="btn-forest justify-center"
        >
          <Mail className="h-4 w-4" />
          Contact Author
        </a>
        {item.learnMoreUrl === "#" ? (
          <a
            href="#"
            aria-disabled="true"
            title="Full spotlight page coming soon"
            onClick={(e) => e.preventDefault()}
            className="btn-outline justify-center"
          >
            <UserRound className="h-4 w-4" />
            Learn More
          </a>
        ) : (
          <a
            href={item.learnMoreUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline justify-center"
          >
            <UserRound className="h-4 w-4" />
            Learn More
          </a>
        )}
        <a
          href={item.buyUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-bronze justify-center"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy Book
        </a>
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-forest">{icon}</span>
      <span>
        <span className="block text-xs text-charcoal/55">{label}</span>
        <span className="block text-sm font-medium">{value}</span>
      </span>
    </div>
  );
}

export function FeaturedSpotlight() {
  const [index, setIndex] = useState(0);
  const count = spotlights.length;
  const item = spotlights[index];

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <section id="featured-spotlight" className="section overflow-x-clip bg-ivory">
      <div className="container-wide">
        <div className="relative pt-5">
          {/* Overlapping section chip */}
          <span className="absolute left-4 top-0 z-10 inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-card sm:left-8">
            <Star className="h-3.5 w-3.5 fill-bronze text-bronze" />
            Featured Spotlight
          </span>

          <div className="card-light overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.authorName}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <SpotlightCard item={item} />
              </motion.div>
            </AnimatePresence>

            {/* Carousel controls — unchanged behavior */}
            <div className="flex items-center justify-between border-t border-mist px-6 py-4 md:px-8">
              <div className="flex gap-2">
                {spotlights.map((s, i) => (
                  <button
                    key={s.authorName}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to spotlight ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-forest" : "w-2 bg-mist"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous spotlight"
                  className="grid h-9 w-9 place-items-center rounded-full border border-mist bg-white text-charcoal transition hover:border-forest hover:text-forest"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next spotlight"
                  className="grid h-9 w-9 place-items-center rounded-full border border-mist bg-white text-charcoal transition hover:border-forest hover:text-forest"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/spotlights"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-bronze"
          >
            View Recent Spotlights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
