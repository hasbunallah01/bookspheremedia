"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stats, communityAvatars } from "@/data/home";

export function TrustBar() {
  return (
    <section className="border-y border-mist bg-white px-6 py-12 md:px-10">
      <div className="container-wide">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-xl font-bold md:text-2xl"
        >
          Trusted by Authors. Loved by Readers.
        </motion.h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-12">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-mist">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="px-6 text-center md:px-10"
              >
                <p className="font-display text-2xl font-bold text-forest md:text-3xl">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="mt-1 text-xs text-charcoal/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Community avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {communityAvatars.map((src, i) => (
                <span
                  key={src}
                  className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white"
                  style={{ zIndex: communityAvatars.length - i }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
            <p className="max-w-[180px] text-xs leading-snug text-charcoal/60">
              A growing global community of readers and storytellers.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
