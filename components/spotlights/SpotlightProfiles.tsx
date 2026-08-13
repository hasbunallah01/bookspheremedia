"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  Globe,
  Mail,
  ShoppingCart,
  Star,
  UserRound,
} from "lucide-react";
import { spotlights, type Spotlight } from "@/data/home";

/** Page header in the shared editorial style. */
export function SpotlightsHero() {
  return (
    <section className="bg-ivory px-6 pb-10 pt-28 md:px-10 md:pt-36">
      <div className="container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[12px] font-medium uppercase tracking-[0.22em] text-bronze"
        >
          Featured Spotlight
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[56px]"
        >
          Meet Our Featured Authors
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-charcoal/70"
        >
          The complete profiles behind every spotlight — the books, the
          stories, and the authors who wrote them.
        </motion.p>
      </div>
    </section>
  );
}

/**
 * Full expanded profile — the homepage spotlight card grown into a
 * complete author page: same banner, avatar, identity, metadata, and
 * buttons, plus About the Book and About the Author.
 */
function SpotlightProfile({ item }: { item: Spotlight }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative pt-5"
    >
      <span className="absolute left-4 top-0 z-10 inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-card sm:left-8">
        <Star className="h-3.5 w-3.5 fill-bronze text-bronze" />
        Featured Spotlight
      </span>

      <div className="card-light overflow-hidden p-4 pt-6 sm:p-6 md:p-8">
        {/* Banner + avatar */}
        <div className="relative">
          <div className="relative aspect-[16/8] overflow-hidden rounded-xl sm:aspect-[16/6]">
            <Image
              src={item.banner}
              alt={item.bannerAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full shadow-card-hover ring-4 ring-white sm:h-28 sm:w-28 md:left-10 md:translate-x-0">
            <Image
              src={item.authorPhoto}
              alt={item.authorName}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Identity */}
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

        {/* Book + metadata */}
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_240px]">
          <div className="order-2 md:order-1">
            <h3 className="font-display text-2xl font-bold md:text-3xl">
              {item.bookTitle}
            </h3>
            <p className="mt-2 font-display italic text-bronze">
              {item.tagline}
            </p>
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

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-mist pt-5 sm:gap-6">
              <Meta icon={<CalendarDays className="h-4 w-4" />} label="Published" value={item.publishedDate} />
              <Meta icon={<Globe className="h-4 w-4" />} label="Language" value={item.language} />
              <Meta icon={<BookOpen className="h-4 w-4" />} label="Pages" value={item.pages} />
            </div>
          </div>

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

        {/* About the Book */}
        {item.fullDescription && (
          <div className="mt-10 border-t border-mist pt-8">
            <p className="eyebrow">About the Book</p>
            <div className="mt-4 space-y-4">
              {item.fullDescription.map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="text-[15px] leading-relaxed text-charcoal/70"
                >
                  {p}
                </p>
              ))}
            </div>
            {item.bookQuote && (
              <blockquote className="mt-6 border-l-2 border-bronze/60 pl-5 font-display italic leading-relaxed text-charcoal/80">
                {item.bookQuote.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </blockquote>
            )}
          </div>
        )}

        {/* About the Author */}
        {item.aboutAuthor && (
          <div className="mt-10 border-t border-mist pt-8">
            <p className="eyebrow">About the Author</p>
            <div className="mt-4 space-y-4">
              {item.aboutAuthor.map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="text-[15px] leading-relaxed text-charcoal/70"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
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
          <a
            href={item.learnMoreUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline justify-center"
          >
            <UserRound className="h-4 w-4" />
            Learn More
          </a>
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
    </motion.article>
  );
}

function Meta({
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

/** All authors with full profiles, stacked — future authors appear automatically. */
export function SpotlightProfiles() {
  const full = spotlights.filter((s) => s.fullDescription);
  return (
    <section className="section bg-white">
      <div className="container-narrow space-y-12">
        {full.map((item) => (
          <SpotlightProfile key={item.authorName} item={item} />
        ))}
      </div>
    </section>
  );
}
