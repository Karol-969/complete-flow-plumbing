import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone, ClipboardCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { BUSINESS_INFO } from "@shared/schema";
import { cn } from "@/lib/utils";
import stepPhoto1 from "@assets/cfp-gallery-04.jpeg";
import stepPhoto3 from "@assets/cfp-gallery-19.jpeg";

type StepItem = {
  id: string;
  /** "blue" => brand-cyan-gradient fill, "white" => white fill */
  fill: "blue" | "white";
  step: number;
  Icon: typeof Phone;
  title: string;
  subtitle: string;
  /** Optional real job photo peeking from behind the circle's top edge */
  peekImage?: string;
  peekAlt?: string;
};

const CALL_HREF = `tel:${BUSINESS_INFO.phoneTel}`;

const STEPS: StepItem[] = [
  {
    id: "call-or-book",
    fill: "white",
    step: 1,
    Icon: Phone,
    title: "Call or Book Online",
    subtitle: "Tell us what's going on, any time — we answer 24/7.",
    peekImage: stepPhoto1,
    peekAlt: "Complete Flow Plumbing plumber on a local Sydney job",
  },
  {
    id: "free-quote",
    fill: "blue",
    step: 2,
    Icon: ClipboardCheck,
    title: "Free Upfront Quote",
    subtitle: "We assess and give you a fixed price before any work starts.",
  },
  {
    id: "same-day-fix",
    fill: "white",
    step: 3,
    Icon: ShieldCheck,
    title: "Same-Day Fix, Done Right",
    subtitle: `A licensed local plumber sorts it, backed by our ${BUSINESS_INFO.guarantee}.`,
    peekImage: stepPhoto3,
    peekAlt: "Completed plumbing repair by Complete Flow Plumbing",
  },
];

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const headingItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stepsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

// Circles spring/pop in, staggered.
const circlePop: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 16, mass: 0.7 },
  },
};

// The dotted connector line draws itself in once the steps appear.
const connectorDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.25 },
  },
};

// Soft blobs gently float in the light background.
const blobFloat: Variants = {
  animate: (i: number) => ({
    x: [0, i % 2 === 0 ? 24 : -24, 0],
    y: [0, i % 2 === 0 ? -18 : 18, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 16 + i * 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  // Gentle continuous float for each circle (disabled when reduced motion).
  const circleFloat: Variants = {
    rest: { y: 0 },
    float: (i: number) => ({
      y: reduceMotion ? 0 : [0, -10, 0],
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          },
    }),
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-sky-50 via-white to-sky-50 py-20 md:py-28"
      data-testid="section-how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      {/* Soft floating blobs in the light background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          custom={0}
          variants={blobFloat}
          animate={reduceMotion ? undefined : "animate"}
          className="absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          custom={1}
          variants={blobFloat}
          animate={reduceMotion ? undefined : "animate"}
          className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-sky-300/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mb-20 max-w-3xl text-center md:mb-28"
        >
          <motion.p
            variants={headingItem}
            className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-primary"
            data-testid="text-how-it-works-eyebrow"
          >
            How It Works
          </motion.p>
          <motion.h2
            id="how-it-works-heading"
            variants={headingItem}
            className="font-heading text-3xl font-black tracking-tight leading-tight text-[#0b1220] md:text-5xl"
            data-testid="text-how-it-works-headline"
          >
            Help is{" "}
            <span className="text-primary">3 simple steps</span> away
          </motion.h2>
          <motion.p
            variants={headingItem}
            className="mt-5 text-base leading-relaxed text-[#04243b]/70 md:text-lg"
            data-testid="text-how-it-works-subtext"
          >
            From your first call to the job done right — friendly, upfront, and sorted the same day.
          </motion.p>
        </motion.div>

        {/* Linear process: spaced row connected by a dotted line on lg; stacks on mobile */}
        <motion.div
          variants={stepsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Continuous horizontal dotted connector behind the circles (desktop only).
              Inset so it spans between circle centres, not into the outer edges. */}
          <div
            className="pointer-events-none absolute left-[16.6667%] right-[16.6667%] top-1/2 z-0 hidden -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <motion.div
              variants={connectorDraw}
              style={{ originX: 0 }}
              className="flex items-center"
            >
              <span className="h-[3px] flex-1 rounded-full bg-[repeating-linear-gradient(to_right,theme(colors.primary/0.55)_0_7px,transparent_7px_15px)]" />
              <ArrowRight className="-ml-1 h-6 w-6 shrink-0 text-primary/70" />
              <span className="h-[3px] flex-1 rounded-full bg-[repeating-linear-gradient(to_right,theme(colors.primary/0.55)_0_7px,transparent_7px_15px)]" />
              <ArrowRight className="-ml-1 h-6 w-6 shrink-0 text-primary/70" />
            </motion.div>
          </div>

          <div
            className={cn(
              "relative z-10 flex flex-col items-center gap-16",
              "lg:flex-row lg:items-start lg:justify-between lg:gap-8",
            )}
          >
            {STEPS.map((item, index) => (
              <StepCircle
                key={item.id}
                item={item}
                index={index}
                isLast={index === STEPS.length - 1}
                circleFloat={circleFloat}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-20 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-24"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25"
            data-testid="button-how-it-works-book"
          >
            Book Your Plumber
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href={CALL_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#0b1220]/15 bg-white px-8 py-4 text-base font-bold text-[#0b1220] shadow-sm transition-all hover:border-primary/40 hover:text-primary"
            data-testid="button-how-it-works-call"
          >
            <Phone className="h-5 w-5" />
            Call {BUSINESS_INFO.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function StepCircle({
  item,
  index,
  isLast,
  circleFloat,
  reduceMotion,
}: {
  item: StepItem;
  index: number;
  isLast: boolean;
  circleFloat: Variants;
  reduceMotion: boolean;
}) {
  const isBlue = item.fill === "blue";
  const { Icon } = item;

  return (
    <motion.div
      variants={circlePop}
      className={cn(
        // Stacks full-width-ish on mobile, fixed circle in a spaced row on lg
        "relative flex w-full max-w-[20rem] flex-col items-center sm:max-w-[22rem]",
        "lg:w-[18.5rem] lg:max-w-none xl:w-[20rem]",
      )}
      data-testid={`circle-step-${item.id}`}
    >
      {/* Peeking job photo behind the circle's top edge (only some steps) */}
      {item.peekImage && (
        <div className="pointer-events-none absolute inset-x-0 -top-12 z-20 flex justify-center md:-top-14">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-xl md:h-28 md:w-28">
            <img
              src={item.peekImage}
              alt={item.peekAlt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover"
              data-testid={`img-step-peek-${item.id}`}
            />
          </div>
        </div>
      )}

      <motion.div
        custom={index}
        variants={circleFloat}
        initial="rest"
        animate={reduceMotion ? "rest" : "float"}
        whileHover={reduceMotion ? undefined : { scale: 1.05, y: -6 }}
        className={cn(
          // The circle. Square aspect + rounded-full => true circle on lg.
          "relative flex w-full flex-col items-center justify-center text-center",
          "rounded-[2rem] px-7 pb-9 shadow-2xl ring-1",
          "lg:aspect-square lg:rounded-full lg:px-9",
          // Extra top padding when a photo peeks over the edge
          item.peekImage ? "pt-16" : "pt-9",
          isBlue
            ? "bg-gradient-to-br from-[#06a5d8] to-[#0489c2] text-primary-foreground ring-white/20"
            : "bg-white text-[#0b1220] ring-black/5",
        )}
      >
        {/* Prominent step number badge */}
        <span
          className={cn(
            "absolute -top-4 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-base font-black shadow-md ring-4 ring-white",
            isBlue
              ? "bg-white text-primary"
              : "bg-primary text-primary-foreground",
          )}
          data-testid={`badge-step-number-${item.id}`}
          aria-hidden="true"
        >
          {item.step}
        </span>

        {/* Icon */}
        <span
          className={cn(
            "mb-3 mt-2 flex h-14 w-14 items-center justify-center rounded-full",
            isBlue ? "bg-white/15" : "bg-primary/10",
          )}
        >
          <Icon
            className={cn("h-7 w-7", isBlue ? "text-white" : "text-primary")}
            strokeWidth={2.25}
          />
        </span>

        <h3
          className={cn(
            "font-heading text-xl font-extrabold tracking-tight leading-tight md:text-[1.4rem]",
            isBlue ? "text-white" : "text-[#0b1220]",
          )}
          data-testid={`text-step-title-${item.id}`}
        >
          <span className="sr-only">{`Step ${item.step}: `}</span>
          {item.title}
        </h3>

        <p
          className={cn(
            "mt-2 max-w-[15rem] text-sm leading-snug md:text-[0.95rem]",
            isBlue ? "text-white/90" : "text-[#04243b]/65",
          )}
          data-testid={`text-step-subtitle-${item.id}`}
        >
          {item.subtitle}
        </p>
      </motion.div>

      {/* Down-arrow connector between stacked steps (mobile / tablet only) */}
      {!isLast && (
        <div
          className="mt-10 flex flex-col items-center gap-1 lg:hidden"
          aria-hidden="true"
        >
          <span className="h-9 w-[3px] rounded-full bg-[repeating-linear-gradient(to_bottom,theme(colors.primary/0.55)_0_7px,transparent_7px_15px)]" />
          <ArrowRight className="h-5 w-5 rotate-90 text-primary/70" />
        </div>
      )}
    </motion.div>
  );
}