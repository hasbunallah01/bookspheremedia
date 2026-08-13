"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { newsletter } from "@/data/home";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "inline" | "footer";
}

/**
 * Newsletter form UI template.
 * NOTE: placeholder only — no backend is wired yet. Submission
 * shows a confirmation state locally. Wire to a real endpoint later.
 */
export function NewsletterForm({ variant = "inline" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footer = variant === "footer";

  const submit = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm",
          footer ? "text-white/80" : "text-forest",
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <div className={cn("flex gap-2", footer ? "flex-col" : "flex-col sm:flex-row")}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Enter your email"
        aria-label="Email address"
        className={cn(
          "w-full rounded-md border px-4 py-2.5 text-sm outline-none transition",
          footer
            ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-bronze"
            : "border-mist bg-white text-charcoal placeholder:text-charcoal/40 focus:border-forest",
        )}
      />
      <button
        type="button"
        onClick={submit}
        className={cn(footer ? "btn-bronze !py-2.5" : "btn-forest !py-2.5", "shrink-0")}
      >
        Subscribe
      </button>
    </div>
  );
}

/** "Stay Inspired" strip above the footer. */
export function StayInspired() {
  return (
    <section className="border-t border-mist bg-ivory px-6 py-12 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="container-wide flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
      >
        <div>
          <h2 className="font-display text-2xl font-bold">{newsletter.title}</h2>
          <p className="mt-1 max-w-xl text-sm text-charcoal/70">
            {newsletter.description}
          </p>
        </div>
        <div className="w-full max-w-md">
          <NewsletterForm />
        </div>
      </motion.div>
    </section>
  );
}
