import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Clock, Wallet, ClipboardCheck, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";

const FEATURES = [
  {
    icon: Clock,
    title: "Fast Same-Day Service",
    line: "Local plumbers, on the way today",
  },
  {
    icon: Wallet,
    title: "$0 Call-Out Fee",
    line: "No call-out fee during business hours",
  },
  {
    icon: ClipboardCheck,
    title: "Free Quotes, Upfront Pricing",
    line: "Know the price before we start",
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
      className="relative bg-background py-20 md:py-28"
      data-testid="section-feature-cards"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
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
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-colors hover:border-primary/40 hover:shadow-glow md:p-8"
              data-testid={`card-feature-${index}`}
            >
              <motion.span
                className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3.5 text-primary ring-1 ring-primary/20"
                whileHover={
                  reduce ? undefined : { scale: 1.12, rotate: -6 }
                }
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
              >
                <feature.icon className="h-6 w-6" />
              </motion.span>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground">{feature.line}</p>
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
