"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { hero } from "@/data/home";

export function Hero() {
  return (
    <section className="bg-ivory px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20">
      <div className="container-wide grid items-center gap-12 md:grid-cols-2">
        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-medium uppercase tracking-[0.22em] text-charcoal/55"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-xl text-balance font-display text-4xl font-bold leading-[1.12] md:text-5xl lg:text-[56px]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-md text-pretty text-base leading-relaxed text-charcoal/70"
          >
            {hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link href={hero.primaryCta.href} className="btn-forest">
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full border border-charcoal/25">
                <Play className="h-3 w-3 fill-current" />
              </span>
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-card"
        >
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
