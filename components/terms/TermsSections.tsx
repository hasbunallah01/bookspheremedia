"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { iconMap } from "@/components/home/IconMap";
import { termsHero, termsSections, termsCta, type TermItem } from "@/data/terms";

/* ---------- Hero ---------- */

export function TermsHero() {
  return (
    <section className="bg-ivory px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36">
      <div className="container-wide grid items-center gap-12 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-medium uppercase tracking-[0.22em] text-bronze"
          >
            {termsHero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-[56px]"
          >
            {termsHero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/70"
          >
            {termsHero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8"
          >
            <Link href={termsHero.cta.href} className="btn-forest">
              {termsHero.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-card"
        >
          <Image
            src={termsHero.image}
            alt={termsHero.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Numbered section card ---------- */

function TermCard({ item, index }: { item: TermItem; index: number }) {
  const Icon = iconMap[item.icon];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
      className="card-light flex gap-4 p-6 hover:shadow-card-hover md:p-7"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-mist bg-stone text-forest">
        {Icon && <Icon className="h-5 w-5" />}
      </span>
      <div className="min-w-0">
        <span className="font-display text-sm font-bold text-bronze">
          {item.number}
        </span>
        <h3 className="mt-0.5 font-display text-lg font-semibold leading-snug">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
          {item.description}
        </p>
        {item.points && (
          <ul className="mt-3 space-y-1.5">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                <span className="text-sm text-charcoal/75">{point}</span>
              </li>
            ))}
          </ul>
        )}
        {item.number === "14" && (
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-bronze"
          >
            Contact Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

export function TermsSections() {
  return (
    <section className="section bg-white">
      <div className="container-wide grid gap-5 md:grid-cols-2">
        {termsSections.map((item, i) => (
          <TermCard key={item.number} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

export function TermsCTA() {
  return (
    <section className="px-6 pb-16 md:px-10 md:pb-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid overflow-hidden rounded-2xl bg-forest md:grid-cols-5"
        >
          <div className="p-10 text-white md:col-span-3 md:p-14">
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              {termsCta.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              {termsCta.description}
            </p>
            <div className="mt-8">
              <a
                href={termsCta.cta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-bronze"
              >
                {termsCta.cta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative min-h-[220px] md:col-span-2">
            <Image
              src={termsCta.image}
              alt={termsCta.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              loading="lazy"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-forest via-forest/30 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
