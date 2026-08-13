"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

/** Full-width FAQ list — accordion interaction unchanged. */
export function FAQPreview() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const items = faqs.slice(0, 5);

  return (
    <section id="faq" className="section bg-ivory">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display text-3xl font-bold md:text-4xl"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="mt-10 space-y-3">
          {items.map((faq, i) => {
            const open = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card-light overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm font-medium">{faq.question}</span>
                  <Plus
                    className={cn(
                      "h-4 w-4 shrink-0 text-forest transition-transform duration-300",
                      open && "rotate-45",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal/70">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
