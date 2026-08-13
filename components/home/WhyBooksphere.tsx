"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { whyBooksphere } from "@/data/home";
import { iconMap } from "@/components/home/IconMap";

/**
 * Two-column from md up: smaller image left, all content right.
 * Below md: image above content (unchanged mobile behavior).
 */
export function WhyBooksphere() {
  return (
    <section id="why-booksphere" className="section bg-ivory">
      <div className="container-wide grid items-center gap-10 md:grid-cols-12 lg:gap-12">
        {/* Image — reduced, hero-like proportion */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-card md:col-span-5 lg:col-span-4"
        >
          <Image
            src={whyBooksphere.image}
            alt={whyBooksphere.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Content */}
        <div className="md:col-span-7 lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center font-display text-3xl font-bold md:text-left md:text-4xl"
          >
            {whyBooksphere.title}
          </motion.h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3 md:grid-cols-1 md:gap-6 lg:mt-10 lg:grid-cols-3 lg:gap-8">
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
      </div>
    </section>
  );
}
