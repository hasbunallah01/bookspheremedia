"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { iconMap } from "@/components/home/IconMap";
import { cn } from "@/lib/utils";

/* ---------- Numbered badge + copper eyebrow (mockup pattern) ---------- */

export function BadgeEyebrow({
  badge,
  eyebrow,
  align = "center",
}: {
  badge: string;
  eyebrow: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-bronze/40 font-display text-sm font-semibold text-bronze">
        {badge}
      </span>
      <span className="eyebrow">{eyebrow}</span>
    </motion.div>
  );
}

/* ---------- Generic icon-card grid (believe / different / work / rules / choose) ---------- */

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export function ValueGrid({
  badge,
  eyebrow,
  title,
  items,
  columns = 3,
  background = "white",
  id,
}: {
  badge: string;
  eyebrow: string;
  title: string;
  items: readonly ValueItem[];
  columns?: 3 | 4 | 5;
  background?: "white" | "ivory";
  id?: string;
}) {
  const cols = {
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    5: "sm:grid-cols-2 lg:grid-cols-5",
  }[columns];

  return (
    <section id={id} className={cn("section", background === "white" ? "bg-white" : "bg-ivory")}>
      <div className="container-wide">
        <BadgeEyebrow badge={badge} eyebrow={eyebrow} />
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-center font-display text-3xl font-bold leading-[1.15] md:text-4xl"
        >
          {title}
        </motion.h2>
        <div className={cn("mt-12 grid grid-cols-1 gap-5", cols)}>
          {items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-light p-6 text-center hover:shadow-card-hover"
              >
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-bronze/30 bg-bronze/5 text-bronze">
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

/* ---------- Editorial image/text split (Our Story / Who We Are) ---------- */

export function EditorialSplit({
  badge,
  eyebrow,
  title,
  paragraphs,
  image,
  imageAlt,
  imageSide = "left",
  background = "white",
}: {
  badge: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  background?: "white" | "ivory";
}) {
  return (
    <section className={cn("section", background === "white" ? "bg-white" : "bg-ivory")}>
      <div className="container-wide grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: imageSide === "left" ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-card",
            imageSide === "right" && "md:order-2",
          )}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>

        <div className={cn(imageSide === "right" && "md:order-1")}>
          <BadgeEyebrow badge={badge} eyebrow={eyebrow} align="left" />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-bold leading-[1.15] md:text-4xl"
          >
            {title}
          </motion.h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <motion.p
                key={p.slice(0, 24)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="text-[15px] leading-relaxed text-charcoal/70"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
