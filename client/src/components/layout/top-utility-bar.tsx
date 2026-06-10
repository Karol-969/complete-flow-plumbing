import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone } from "lucide-react";

export function TopUtilityBar() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="w-full bg-[#04243b] text-white text-xs sm:text-sm"
      role="region"
      aria-label="Contact and availability"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2">
          {/* LEFT: open status with pulsing dot */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              {!reduceMotion && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.4 }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="hidden sm:inline truncate font-medium tracking-tight">
              We&rsquo;re open &mdash; 24/7 Emergency Plumbing
            </span>
          </div>

          {/* RIGHT: phone + book online pill */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="flex items-center gap-1.5 font-semibold tracking-tight hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold tracking-tight hover:brightness-110 transition"
            >
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
