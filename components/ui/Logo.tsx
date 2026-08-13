import Link from "next/link";
import { Feather } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

/** Booksphere Media wordmark with leaf/feather emblem. */
export function Logo({ variant = "dark", className }: LogoProps) {
  const isLight = variant === "light";
  return (
    <Link
      href="/"
      aria-label="Booksphere Media — Home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full ring-1 transition",
          isLight
            ? "bg-white/10 ring-white/25 group-hover:bg-white/15"
            : "bg-forest/5 ring-forest/25 group-hover:bg-forest/10",
        )}
      >
        <Feather
          className={cn("h-4 w-4", isLight ? "text-bronze-200" : "text-forest")}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-[0.18em]",
            isLight ? "text-white" : "text-forest",
          )}
        >
          BOOKSPHERE
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-medium uppercase tracking-[0.5em]",
            isLight ? "text-white/70" : "text-bronze",
          )}
        >
          Media
        </span>
      </span>
    </Link>
  );
}
