"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/home";

function TestimonialCard({
  t,
  hidden,
}: {
  t: (typeof testimonials)[number];
  hidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={hidden}
      className="card-light flex w-[280px] shrink-0 flex-col p-6 sm:w-[340px] lg:w-[380px] lg:p-7"
    >
      <Quote className="h-6 w-6 text-bronze" aria-hidden />
      <blockquote className="mt-4 flex-1 font-display text-[15px] italic leading-relaxed text-charcoal/85">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={t.avatar}
            alt={hidden ? "" : t.name}
            fill
            sizes="40px"
            className="object-cover"
            loading="lazy"
          />
        </span>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-charcoal/60">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Continuously scrolling testimonial marquee — slow right-to-left,
 * seamless infinite loop (track holds two identical copies and
 * translates by exactly -50%). Pauses on hover; respects
 * prefers-reduced-motion.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="section overflow-x-clip bg-white">
      <div className="container-wide">
        <SectionHeading title="What Our Authors Say" />
      </div>
      <div className="marquee-mask mt-12">
        <div className="marquee-track flex w-max">
          {[false, true].map((hidden) => (
            <div key={String(hidden)} className="flex gap-6 pr-6">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} hidden={hidden} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
