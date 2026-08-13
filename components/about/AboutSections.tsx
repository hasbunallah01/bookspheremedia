"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { iconMap } from "@/components/home/IconMap";
import { BadgeEyebrow } from "@/components/about/AboutBlocks";
import {
  aboutHero,
  mission,
  vision,
  journey,
  authorChecklist,
  editorialStandards,
  gallery,
  communityStats,
  aboutCta,
} from "@/data/about";

/* ---------- 1. Hero — same style as homepage hero ---------- */

export function AboutHero() {
  return (
    <section className="bg-ivory pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-wide grid items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-medium uppercase tracking-[0.22em] text-bronze"
          >
            {aboutHero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[56px]"
          >
            {aboutHero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/70"
          >
            {aboutHero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href={aboutHero.primaryCta.href} className="btn-forest">
              {aboutHero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={aboutHero.secondaryCta.href} className="btn-outline">
              {aboutHero.secondaryCta.label}
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
            src={aboutHero.image}
            alt={aboutHero.imageAlt}
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

/* ---------- 5+6. Mission & Vision cards ---------- */

function MissionVisionCard({
  data,
  delay,
}: {
  data: typeof mission | typeof vision;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      className="card-light grid items-center gap-6 overflow-hidden hover:shadow-card-hover lg:grid-cols-2"
    >
      <div className="p-7 lg:p-8">
        <BadgeEyebrow badge={data.badge} eyebrow={data.eyebrow} align="left" />
        <h3 className="mt-4 font-display text-2xl font-bold leading-snug">
          {data.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
          {data.description}
        </p>
      </div>
      <div className="relative min-h-[220px] self-stretch lg:min-h-full">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export function MissionVision() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide grid gap-6 lg:grid-cols-2">
        <MissionVisionCard data={mission} delay={0} />
        <MissionVisionCard data={vision} delay={0.1} />
      </div>
    </section>
  );
}

/* ---------- 8. Journey timeline — homepage HowItWorks style, 5 steps ---------- */

export function Journey() {
  return (
    <section id="journey" className="section bg-ivory">
      <div className="container-wide">
        <BadgeEyebrow badge={journey.badge} eyebrow={journey.eyebrow} />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-center font-display text-3xl font-bold md:text-4xl"
        >
          {journey.title}
        </motion.h2>
        <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-1/2 hidden border-t border-dashed border-mist lg:block"
          />
          {journey.steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-light relative p-6 text-center hover:shadow-card-hover"
              >
                <p className="font-display text-2xl font-bold text-mist">
                  {step.step}
                </p>
                <span className="mx-auto mt-3 grid h-11 w-11 place-items-center rounded-full border border-forest/20 bg-forest/5 text-forest">
                  {Icon && <Icon className="h-5 w-5" />}
                </span>
                <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13px] text-charcoal/65">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 10. Author checklist ---------- */

export function AuthorChecklist() {
  return (
    <section className="section bg-ivory">
      <div className="container-wide grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <BadgeEyebrow
            badge={authorChecklist.badge}
            eyebrow={authorChecklist.eyebrow}
            align="left"
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold leading-[1.15] md:text-4xl"
          >
            {authorChecklist.title}
          </motion.h2>
          <div className="mt-8 space-y-3">
            {authorChecklist.items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-light flex items-center gap-3 px-5 py-3.5"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-forest" />
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-xl shadow-card"
        >
          <Image
            src={authorChecklist.image}
            alt={authorChecklist.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 11. Editorial standards ---------- */

export function EditorialStandards() {
  return (
    <section className="section bg-white">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card-light flex flex-col items-center gap-6 p-8 text-center md:flex-row md:p-10 md:text-left"
        >
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-bronze/30 bg-forest text-bronze shadow-card">
            <ShieldCheck className="h-9 w-9" />
          </span>
          <div>
            <BadgeEyebrow
              badge={editorialStandards.badge}
              eyebrow={editorialStandards.eyebrow}
              align="left"
            />
            <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              {editorialStandards.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              {editorialStandards.description}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {editorialStandards.values.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-mist bg-stone px-3.5 py-1.5 text-xs font-medium text-charcoal/80"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 14. Behind the Spotlight gallery ---------- */

export function SpotlightGallery() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <BadgeEyebrow badge={gallery.badge} eyebrow={gallery.eyebrow} />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-center font-display text-3xl font-bold md:text-4xl"
        >
          {gallery.title}
        </motion.h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {gallery.images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative overflow-hidden rounded-xl shadow-card ${
                i === 0
                  ? "aspect-[4/5] md:col-span-2 md:row-span-2 md:aspect-auto"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 16. Community stats — homepage stat style ---------- */

export function CommunityStats() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <BadgeEyebrow
          badge={communityStats.badge}
          eyebrow={communityStats.eyebrow}
        />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-center font-display text-3xl font-bold md:text-4xl"
        >
          {communityStats.title}
        </motion.h2>
        <div className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-3 md:divide-x md:divide-mist">
          {communityStats.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="px-6 text-center md:px-10"
            >
              <p className="font-display text-3xl font-bold text-forest md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-charcoal/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 17. Closing CTA — homepage banner style ---------- */

export function AboutCTA() {
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
              {aboutCta.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              {aboutCta.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={aboutCta.primaryCta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-bronze"
              >
                {aboutCta.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href={aboutCta.secondaryCta.href}
                className="btn-outline-light"
              >
                {aboutCta.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[220px] md:col-span-2">
            <Image
              src={aboutCta.image}
              alt={aboutCta.imageAlt}
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
