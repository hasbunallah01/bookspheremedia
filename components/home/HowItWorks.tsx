"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/home";
import { iconMap } from "@/components/home/IconMap";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-wide">
        <SectionHeading title="How It Works" />
        <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line (desktop) */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-1/2 hidden border-t border-dashed border-mist lg:block"
          />
          {howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-light relative p-6 text-center hover:shadow-card-hover"
              >
                <p className="font-display text-2xl font-bold text-mist">
                  {step.step}
                </p>
                <span className="mx-auto mt-3 grid h-11 w-11 place-items-center rounded-full border border-forest/20 bg-forest/5 text-forest">
                  {Icon && <Icon className="h-5 w-5" />}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">
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
