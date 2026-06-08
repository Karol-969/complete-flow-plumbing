import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Clock, Wallet, ClipboardCheck, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";
import { PipesBackground } from "@/components/effects/pipes-background";

const FEATURES = [
  {
    icon: Clock,
    title: "Fast Same-Day Service",
    line: "Local plumbers, on the way today",
    gradient: "from-sky-500 to-blue-700",
    glow: "bg-sky-400/30",
    watermark: "text-sky-500/10",
  },
  {
    icon: Wallet,
    title: "$0 Call-Out Fee",
    line: "No call-out fee during business hours",
    gradient: "from-emerald-500 to-teal-600",
    glow: "bg-emerald-400/30",
    watermark: "text-emerald-500/10",
  },
  {
    icon: ClipboardCheck,
    title: "Free Quotes, Upfront Pricing",
    line: "Know the price before we start",
    gradient: "from-amber-500 to-orange-600",
    glow: "bg-amber-400/30",
    watermark: "text-amber-500/10",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function FeatureCards() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12 },
    },
  };

  // Springy pop-in: scale up from 0.88 with a small directional offset and
  // a spring that overshoots so each card visibly "pops" on entry.
  const popTransition = {
    type: "spring" as const,
    stiffness: 240,
    damping: 15,
    mass: 0.7,
  };

  // Alternate directions across the 3 cards: left / up / right.
  const cardVariants: Variants[] = [
    {
      hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88, x: -24 },
      show: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: reduce ? { duration: 0.4, ease: EASE } : popTransition,
      },
    },
    {
      hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88, y: 24 },
      show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: reduce ? { duration: 0.4, ease: EASE } : popTransition,
      },
    },
    {
      hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88, x: 24 },
      show: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: reduce ? { duration: 0.4, ease: EASE } : popTransition,
      },
    },
  ];

  const trustVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: reduce ? { duration: 0.4, ease: EASE } : popTransition,
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-background to-background py-20 md:py-28"
      data-testid="section-feature-cards"
    >
      {/* Animated plumbing pipe network behind the cards */}
      <PipesBackground className="opacity-100" />
      {/* Light readability wash so the cards stay crisp over the pipes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/35"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.title}
              variants={cardVariants[index % cardVariants.length]}
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.03,
                      y: -6,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }
              }
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-6 shadow-card backdrop-blur-sm transition-colors hover:border-primary/40 hover:shadow-glow md:p-8"
              data-testid={`card-feature-${index}`}
            >
              {/* coloured corner glow on hover */}
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${feature.glow}`}
              />
              {/* gradient accent bar */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-80`}
              />
              {/* big faint watermark icon */}
              <feature.icon
                aria-hidden
                className={`pointer-events-none absolute -bottom-5 -right-3 h-32 w-32 ${feature.watermark}`}
              />

              <motion.span
                className={`relative mb-5 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-3.5 text-white shadow-lg`}
                whileHover={reduce ? undefined : { scale: 1.12, rotate: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
              >
                <feature.icon className="h-6 w-6" />
              </motion.span>
              <h3 className="relative mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {feature.title}
              </h3>
              <p className="relative text-base text-muted-foreground">
                {feature.line}
              </p>
            </motion.article>
          ))}
        </motion.div>

        {/* Slim trust line */}
        <motion.p
          variants={trustVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-muted-foreground"
          data-testid="text-feature-trust"
        >
          <motion.span
            className="inline-flex"
            animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
            transition={
              reduce
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
          </motion.span>
          Licensed NSW (Lic. {BUSINESS_INFO.licence}) · Fully Insured · 24/7
          Emergency
        </motion.p>
      </div>
    </section>
  );
}
