"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyAuthorsChooseUs } from "@/data/home";
import { iconMap } from "@/components/home/IconMap";

export function WhyAuthorsChooseUs() {
  return (
    <section id="why-authors" className="section bg-ivory">
      <div className="container-wide">
        <SectionHeading title="Why Authors Choose Us" />
        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {whyAuthorsChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-3 text-left lg:flex-col"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-bronze/25 bg-bronze/5 text-bronze">
                  {Icon && <Icon className="h-4 w-4" />}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-charcoal/65">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
