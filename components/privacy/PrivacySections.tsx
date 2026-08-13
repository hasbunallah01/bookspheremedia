"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Scale, ShieldCheck } from "lucide-react";
import { BadgeEyebrow } from "@/components/about/AboutBlocks";
import {
  privacyHero,
  editorialStandards,
  termsOfParticipation,
  intellectualProperty,
  securityTrust,
  privacyCta,
} from "@/data/privacy";

/* ---------- Hero ---------- */

export function PrivacyHero() {
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
            {privacyHero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[56px]"
          >
            {privacyHero.titleLead}
            <br />
            <span className="text-bronze">{privacyHero.titleAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/70"
          >
            {privacyHero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8"
          >
            <Link href={privacyHero.cta.href} className="btn-forest">
              {privacyHero.cta.label}
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
            src={privacyHero.image}
            alt={privacyHero.imageAlt}
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

/* ---------- Editorial Standards: points beside an image ---------- */

export function EditorialStandards() {
  return (
    <section className="section bg-white">
      <div className="container-wide grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <BadgeEyebrow
            badge={editorialStandards.badge}
            eyebrow={editorialStandards.eyebrow}
            align="left"
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold leading-[1.15] md:text-4xl"
          >
            {editorialStandards.title}
          </motion.h2>
          <div className="mt-8 space-y-3">
            {editorialStandards.points.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-light flex items-center gap-3 px-5 py-3.5"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-forest" />
                <span className="text-sm font-medium">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-card"
        >
          <Image
            src={editorialStandards.image}
            alt={editorialStandards.imageAlt}
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

/* ---------- Terms of Participation: checklist card ---------- */

export function TermsOfParticipation() {
  return (
    <section className="section bg-ivory">
      <div className="container-narrow">
        <BadgeEyebrow
          badge={termsOfParticipation.badge}
          eyebrow={termsOfParticipation.eyebrow}
        />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-center font-display text-3xl font-bold md:text-4xl"
        >
          {termsOfParticipation.title}
        </motion.h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {termsOfParticipation.points.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-light flex items-start gap-3 p-5"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
              <span className="text-sm leading-relaxed text-charcoal/80">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Intellectual Property + Security & Trust: two feature panels ---------- */

export function IPAndSecurity() {
  return (
    <section className="section bg-white">
      <div className="container-wide grid gap-6 lg:grid-cols-2">
        {/* Intellectual Property */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="card-light flex flex-col p-8 md:p-10"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-bronze/30 bg-bronze/5 text-bronze">
            <Scale className="h-6 w-6" />
          </span>
          <div className="mt-5">
            <BadgeEyebrow
              badge={intellectualProperty.badge}
              eyebrow={intellectualProperty.eyebrow}
              align="left"
            />
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold">
            {intellectualProperty.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
            {intellectualProperty.description}
          </p>
        </motion.div>

        {/* Security & Trust */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-light flex flex-col p-8 md:p-10"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-bronze shadow-card">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div className="mt-5">
            <BadgeEyebrow
              badge={securityTrust.badge}
              eyebrow={securityTrust.eyebrow}
              align="left"
            />
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold">
            {securityTrust.title}
          </h3>
          <div className="mt-4 space-y-2.5">
            {securityTrust.points.map((point) => (
              <div key={point} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                <span className="text-sm leading-relaxed text-charcoal/75">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Final CTA banner ---------- */

export function PrivacyCTA() {
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
              {privacyCta.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              {privacyCta.description}
            </p>
            <div className="mt-8">
              <Link href={privacyCta.cta.href} className="btn-bronze">
                {privacyCta.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[220px] md:col-span-2">
            <Image
              src={privacyCta.image}
              alt={privacyCta.imageAlt}
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
