"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ctaBanner } from "@/data/home";

export function CTABanner() {
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
          {/* Copy */}
          <div className="p-10 text-white md:col-span-3 md:p-14">
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              {ctaBanner.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
              {ctaBanner.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={ctaBanner.primaryCta.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-bronze"
              >
                {ctaBanner.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href={ctaBanner.secondaryCta.href} className="btn-outline-light">
                {ctaBanner.secondaryCta.label}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[220px] md:col-span-2">
            <Image
              src={ctaBanner.image}
              alt={ctaBanner.imageAlt}
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
