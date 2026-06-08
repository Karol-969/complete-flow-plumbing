import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEWS, BUSINESS_INFO } from "@shared/schema";
import { ExternalLink, PenLine } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Springy "pop" transition — overshoots slightly so elements bounce in.
const POP_SPRING = { type: "spring", stiffness: 240, damping: 15, mass: 0.7 } as const;
// Snappy bounce for interactive taps/hovers.
const TAP_SPRING = { type: "spring", stiffness: 400, damping: 17 } as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: POP_SPRING },
};
const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: POP_SPRING },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Official 4-colour Google "G" logo as an inline SVG.
 * Colours: blue #4285F4, red #EA4335, yellow #FBBC05, green #34A853.
 */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/** A single gold Google-style star. */
function GoogleStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#FBBC05"
        d="M12 17.27l5.18 3.12c.39.24.87-.11.77-.55l-1.37-5.89 4.57-3.96c.34-.29.16-.85-.29-.89l-6.02-.51-2.35-5.56c-.18-.42-.77-.42-.95 0L9.18 8.59l-6.02.51c-.45.04-.63.6-.29.89l4.57 3.96-1.37 5.89c-.1.44.38.79.77.55L12 17.27z"
      />
    </svg>
  );
}

/** A row of `count` gold stars (out of 5) with a subtle staggered pop-in. */
function StarRow({ count = 5, className = "" }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  const full = Math.max(0, Math.min(5, Math.round(count)));

  const starContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 },
    },
  };
  const starItem: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.4 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", stiffness: 400, damping: 16 },
        },
      };

  return (
    <motion.div
      className={`flex items-center gap-0.5 ${className}`}
      aria-label={`${full} out of 5 stars`}
      variants={starContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span key={i} variants={starItem} className="inline-flex">
          <GoogleStar className={`h-5 w-5 ${i < full ? "" : "opacity-25"}`} />
        </motion.span>
      ))}
    </motion.div>
  );
}

// Pleasant, accessible avatar background colours (Google-ish palette).
const AVATAR_COLORS = [
  "bg-[#4285F4]",
  "bg-[#EA4335]",
  "bg-[#34A853]",
  "bg-[#FBBC05]",
  "bg-[#9334E6]",
  "bg-[#1A73E8]",
];

export function GoogleReviews() {
  const reduce = useReducedMotion();
  const reviews = GOOGLE_REVIEWS;
  const hasReviews = reviews.length > 0;

  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  const hoverLift = reduce
    ? undefined
    : {
        y: -6,
        scale: 1.03,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      };

  // Snappy bounce for CTA buttons on hover / tap.
  const tapPop = {
    whileHover: reduce ? undefined : { scale: 1.05 },
    whileTap: reduce ? undefined : { scale: 0.9 },
    transition: TAP_SPRING,
  };

  // Only ever derived from REAL data — never a hardcoded/fake number.
  const average = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Faint Google multicolour top accent line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]"
      />
      {/* Soft Google-blue tint glow behind the header — gently floats */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[42rem] max-w-full rounded-full bg-[#4285F4]/10 blur-3xl"
        animate={
          reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-16 max-w-2xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={v(fadeUp)}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Rated on Google
          </motion.p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.span
              variants={v(zoomIn)}
              className="inline-flex"
              whileHover={reduce ? undefined : { scale: 1.1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            >
              <GoogleG className="h-9 w-9 md:h-10 md:w-10" />
            </motion.span>
            <motion.h2
              variants={v(zoomIn)}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Our Google Reviews
            </motion.h2>
          </div>
          <motion.div variants={v(fadeUp)} className="flex flex-col items-center gap-2">
            <StarRow count={hasReviews ? average : 5} />
            {/* Only show an average if it comes from REAL reviews. */}
            {hasReviews && (
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">{BUSINESS_INFO.googleRating}</span>{" "}
                rating from {BUSINESS_INFO.googleReviewCount} Google reviews
              </p>
            )}
          </motion.div>
        </motion.div>

        {hasReviews ? (
          /* ---- Real reviews: Google-style review cards ---- */
          <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {reviews.map((review, index) => {
              const initial = (
                review.initial ?? review.name.trim().charAt(0)
              ).toUpperCase();
              const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
              return (
                <motion.article
                  key={`${review.name}-${index}`}
                  variants={v(fadeUp)}
                  whileHover={hoverLift}
                  className="relative flex flex-col rounded-2xl border border-border/60 bg-white p-6 md:p-7 shadow-card transition-colors hover:border-primary/40 hover:shadow-glow"
                  data-testid={`google-review-${index}`}
                >
                  {/* Google "G" glyph in the corner */}
                  <GoogleG className="absolute right-5 top-5 h-6 w-6 opacity-90" />

                  {/* Reviewer identity */}
                  <div className="flex items-center gap-3 pr-8">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${avatarColor}`}
                      aria-hidden="true"
                    >
                      {initial}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground leading-tight truncate">
                        {review.name}
                      </p>
                      {review.date && (
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <StarRow count={review.rating} className="mt-4" />

                  {/* Review text */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {review.text}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
          <motion.div
            className="mt-12 flex justify-center"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.88 }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={reduce ? { duration: 0.6, ease: EASE } : POP_SPRING}
          >
            <motion.div {...tapPop}>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
                data-testid="button-all-google-reviews"
              >
                <a
                  href={BUSINESS_INFO.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  Read all our reviews on Google
                </a>
              </Button>
            </motion.div>
          </motion.div>
          </>
        ) : (
          /* ---- Empty state: Google-branded CTA card ----
             Real reviews go in GOOGLE_REVIEWS (schema.ts). Until then we show the
             Google-branded CTA — a live widget (e.g. Trustindex) can also be
             embedded here. No fake rating number or review count is shown. */
          <motion.div
            variants={v(zoomIn)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={hoverLift}
            className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-white p-8 md:p-12 text-center shadow-card transition-colors hover:border-primary/40 hover:shadow-glow"
            data-testid="google-reviews-cta"
          >
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4285F4]/10 ring-1 ring-[#4285F4]/20"
              whileHover={reduce ? undefined : { scale: 1.1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            >
              <GoogleG className="h-9 w-9" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              See what our customers say on Google
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
              We&apos;re building our Google review profile. Read our reviews on
              Google, or leave one after your job — it helps other locals find a
              plumber they can trust.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.div className="w-full sm:w-fit" {...tapPop}>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
                  data-testid="button-read-google-reviews"
                >
                  <a
                    href={BUSINESS_INFO.googleReviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                    data-testid="link-read-google-reviews"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Read our Google Reviews
                  </a>
                </Button>
              </motion.div>
              <motion.div className="w-full sm:w-fit" {...tapPop}>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto ring-1 ring-border hover:ring-primary text-foreground rounded-full px-7 py-3.5 font-semibold transition"
                  data-testid="button-leave-google-review"
                >
                  <a
                    href={BUSINESS_INFO.googleReviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                    data-testid="link-leave-google-review"
                  >
                    <PenLine className="h-5 w-5" />
                    Leave us a Review
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
