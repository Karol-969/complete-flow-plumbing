import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import promiseBg from "@assets/cfp-gallery-16.jpeg";
import {
  Wallet,
  Award,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";

// The 4-colour Google "G" — same mark used in the header rating badge.
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

// Each promise gets its own vivid gradient icon tile + matching corner glow,
// so the grid reads as bold and graphical rather than a flat list of cards.
const promiseItems = [
  {
    icon: Wallet,
    label: "No Call-Out Fee",
    description:
      "Free quotes and honest upfront pricing — you know the cost before we start.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-400/25",
  },
  {
    icon: Award,
    label: "Workmanship Guarantee",
    description: `Every job is backed by our ${BUSINESS_INFO.guarantee.toLowerCase()}.`,
    gradient: "from-sky-500 to-blue-700",
    glow: "bg-sky-400/25",
  },
  {
    icon: Clock,
    label: "24/7 Emergency Service",
    description: "Day or night, a local plumber answers the call.",
    gradient: "from-rose-500 to-red-600",
    glow: "bg-rose-400/25",
  },
  {
    icon: ShieldCheck,
    label: "Licensed NSW Experts",
    description: `Fully licensed NSW plumbers — Lic. ${BUSINESS_INFO.licence}.`,
    gradient: "from-violet-500 to-indigo-700",
    glow: "bg-violet-400/25",
  },
  {
    icon: ShieldAlert,
    label: "Fully Insured",
    description: "Comprehensive cover for total peace of mind on every job.",
    gradient: "from-cyan-500 to-sky-600",
    glow: "bg-cyan-400/25",
  },
  {
    icon: Zap,
    label: "Same-Day Service",
    description: "Fast local response when you need a plumber today.",
    gradient: "from-amber-500 to-orange-600",
    glow: "bg-amber-400/25",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Springy "pop" — overshoots slightly so cards bounce in one-by-one.
const POP = { type: "spring" as const, stiffness: 240, damping: 15, mass: 0.7 };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: POP },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24, scale: 0.88 },
  show: { opacity: 1, x: 0, scale: 1, transition: POP },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24, scale: 0.88 },
  show: { opacity: 1, x: 0, scale: 1, transition: POP },
};
const popHeading: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: POP },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function PromiseReviews() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, fall back to a plain opacity fade.
  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  // Spring pop on interactive cards — lift + slight scale overshoot.
  const hoverLift = reduce
    ? undefined
    : {
        scale: 1.03,
        y: -6,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      };

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Darkened, blurred real job photo as a subtle background texture */}
      <img
        src={promiseBg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16] blur-[2px] scale-105"
      />
      {/* Gradient + vignette so the cards stay crisp and readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background"
      />
      {/* Atmospheric sky glow behind the header — gently floats */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[42rem] max-w-full rounded-full bg-primary/15 blur-3xl"
        animate={reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={
          reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14 md:mb-20 max-w-2xl mx-auto"
        >
          <motion.p
            variants={v(fadeUp)}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            variants={v(popHeading)}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            The Complete Flow <span className="text-primary">Promise</span>
          </motion.h2>
          <motion.p
            variants={v(fadeUp)}
            className="mt-5 text-lg text-muted-foreground"
          >
            Locally owned, fully licensed and insured. Real plumbers who do the
            job right and stand behind every visit.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {/* LEFT: 2x3 promise grid — staggered, alternating directions */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          >
            {promiseItems.map((item, index) => {
              const dirVariant =
                index % 3 === 0 ? fadeUp : index % 3 === 1 ? fadeLeft : fadeRight;
              const isEmergency = item.label === "24/7 Emergency Service";
              return (
                <motion.div
                  key={item.label}
                  variants={v(dirVariant)}
                  whileHover={hoverLift}
                  className="group relative flex flex-col overflow-hidden bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-colors hover:border-primary/40 hover:shadow-glow"
                  data-testid={`promise-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {/* coloured corner glow — fades in on hover for depth */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${item.glow}`}
                  />
                  {/* thin gradient accent bar along the top edge */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient} opacity-70`}
                  />
                  <motion.span
                    className={`relative mb-5 inline-flex w-fit items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white p-3.5 shadow-lg`}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            scale: 1.12,
                            rotate: -6,
                            transition: { type: "spring", stiffness: 300, damping: 15 },
                          }
                    }
                    animate={
                      reduce || !isEmergency ? undefined : { scale: [1, 1.08, 1] }
                    }
                    transition={
                      reduce || !isEmergency
                        ? undefined
                        : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.span>
                  <h3 className="relative text-lg font-bold text-foreground leading-tight">
                    {item.label}
                  </h3>
                  <p className="relative text-sm text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT: real Google rating card — 5.0 from 48 verified reviews. */}
          <motion.div
            variants={v(fadeRight)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={hoverLift}
            className="group relative overflow-hidden rounded-2xl border border-border/60 shadow-card p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-card via-card to-primary/5 transition-colors hover:border-primary/40 hover:shadow-glow"
            data-testid="card-reviews"
          >
            {/* soft Google-blue glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#4285F4]/15 blur-3xl"
            />

            <div className="relative flex items-center gap-4 mb-6">
              <motion.span
                className="inline-flex items-center justify-center rounded-2xl bg-white ring-1 ring-border shadow-md p-3"
                whileHover={reduce ? undefined : { scale: 1.1, rotate: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <GoogleG className="h-9 w-9" />
              </motion.span>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Rated on Google
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Verified customer reviews
                </p>
              </div>
            </div>

            <div className="relative flex items-end gap-3 mb-2">
              <span className="text-6xl font-black tracking-tight text-foreground leading-none">
                {BUSINESS_INFO.googleRating}
              </span>
              <div className="flex flex-col pb-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground mt-1">
                  out of 5.0
                </span>
              </div>
            </div>

            <p className="relative text-foreground font-semibold mb-1">
              {BUSINESS_INFO.googleReviewCount} Google reviews
            </p>
            <p className="relative text-muted-foreground leading-relaxed mb-8">
              Local families and businesses across our service area trust
              Complete Flow Plumbing — and they say so on Google.
            </p>

            <motion.div
              className="relative w-full sm:w-fit"
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 17 },
                    }
              }
              whileTap={
                reduce
                  ? undefined
                  : {
                      scale: 0.9,
                      transition: { type: "spring", stiffness: 400, damping: 17 },
                    }
              }
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
                data-testid="button-reviews-google"
              >
                <a
                  href={BUSINESS_INFO.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  data-testid="link-reviews-google"
                >
                  Read our Google reviews
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
