"use client";

import { motion } from "framer-motion";
import { whyBooksphere } from "@/data/home";
import { iconMap } from "@/components/home/IconMap";

export function WhyBooksphere() {
  return (
    <section id="why-booksphere" className="section bg-ivory">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-3xl font-bold md:text-4xl"
        >
          {whyBooksphere.title}
        </motion.h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3 md:gap-6 lg:mt-10 lg:gap-8">
          {whyBooksphere.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center sm:text-left md:flex md:items-start md:gap-4 lg:block"
              >
                <span className="mx-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forest/20 bg-forest/5 text-forest sm:mx-0">
                  {Icon && <Icon className="h-5 w-5" />}
                </span>
                <div>
                  <h3 className="mt-4 font-display text-lg font-semibold md:mt-0 lg:mt-4">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
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
