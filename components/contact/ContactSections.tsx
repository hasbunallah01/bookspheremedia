"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/components/home/IconMap";
import { contactHeader, contactCards } from "@/data/contact";

/** Light editorial page header — homepage hero typography. */
export function ContactHeader() {
  return (
    <section className="bg-ivory px-6 pb-10 pt-28 md:px-10 md:pt-36">
      <div className="container-narrow text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[12px] font-medium uppercase tracking-[0.22em] text-bronze"
        >
          {contactHeader.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[56px]"
        >
          {contactHeader.titleLead}{" "}
          <span className="italic text-bronze">{contactHeader.titleAccent}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-charcoal/70"
        >
          {contactHeader.description}
        </motion.p>
      </div>
    </section>
  );
}

/** Email / press cards in homepage card style. */
export function ContactCards() {
  return (
    <section className="bg-ivory px-6 pb-6 md:px-10">
      <div className="container-wide grid gap-5 sm:grid-cols-2">
        {contactCards.map((c, i) => {
          const Icon = iconMap[c.icon];
          return (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="card-light group p-6 hover:shadow-card-hover"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-bronze/30 bg-bronze/5 text-bronze transition group-hover:bg-bronze/10">
                {Icon && <Icon className="h-5 w-5" />}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-charcoal/65 transition group-hover:text-forest">
                {c.body}
              </p>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
