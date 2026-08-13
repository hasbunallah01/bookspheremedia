"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatWeDo } from "@/data/home";
import { iconMap } from "@/components/home/IconMap";

/** All cards always visible — responsive grid on desktop, stacked on mobile. */
export function WhatWeDo() {
  return (
    <section id="what-we-do" className="section bg-white">
      <div className="container-wide">
        <SectionHeading title="What We Do" />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {whatWeDo.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="card-light p-6 hover:shadow-card-hover"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md border border-mist bg-stone text-forest">
                  {Icon && <Icon className="h-5 w-5" />}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-charcoal/65">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
