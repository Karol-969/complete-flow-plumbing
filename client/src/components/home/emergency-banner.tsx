import { BUSINESS_INFO } from "@shared/schema";
import { Phone, Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const phoneTel = BUSINESS_INFO.phone.replace(/\s/g, "");

/**
 * Slim, high-urgency emergency strip.
 *
 * Designed to sit above the header as a top strip and is also reused as a
 * recurring emergency CTA elsewhere on the page. Uses the `emergency` token
 * sparingly per the design system. Click-to-call on the whole strip.
 */
export function EmergencyBanner() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden bg-emergency text-emergency-foreground">
      {/* Subtle continuous shimmer sweeping across the bar (transform/opacity only) */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          animate={{ x: ["0%", "400%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2,
          }}
        />
      )}
      <a
        href={`tel:${phoneTel}`}
        className="group relative flex items-center justify-center gap-x-2 gap-y-1 flex-wrap px-4 py-2 text-center text-xs sm:text-sm font-semibold tracking-wide"
        data-testid="link-emergency-phone"
        aria-label={`24/7 emergency plumber, same-day service, call ${BUSINESS_INFO.phone}`}
      >
        <motion.span
          className="inline-flex"
          animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
          transition={
            reduce
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Zap className="h-4 w-4 flex-shrink-0 fill-current" aria-hidden="true" />
        </motion.span>
        <span>24/7 Emergency Plumber</span>
        <span className="opacity-50" aria-hidden="true">·</span>
        <span className="hidden xs:inline sm:inline">Same-Day Service</span>
        <span className="hidden sm:inline opacity-50" aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5 font-bold underline-offset-4 group-hover:underline">
          <Phone className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          Call {BUSINESS_INFO.phone}
        </span>
      </a>
    </div>
  );
}
