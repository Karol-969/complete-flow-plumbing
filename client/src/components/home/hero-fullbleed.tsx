import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, Star, CheckCircle2, ArrowRight } from "lucide-react";
import bgImg from "@assets/cfp-truck-hero.jpeg";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
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

const VALUE_PROPS = [
  "$0 Call-Out Fee",
  "Free Quotes",
  "Same-Day Service",
  "Licensed NSW",
];

export function HeroFullBleed() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const item = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* ===== FULL-BLEED PHOTO BACKGROUND ===== */}
      <img
        src={bgImg}
        alt="Complete Flow Plumbing — licensed Sydney plumber on the job"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark legibility gradient over the photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04243b]/90 via-[#04243b]/70 to-[#0a66c2]/55" />

      {/* Blurred cyan glow blobs for depth */}
      <div className="pointer-events-none absolute -top-40 right-[6%] h-[30rem] w-[30rem] rounded-full bg-primary/30 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 left-[-6rem] h-[26rem] w-[26rem] rounded-full bg-[#7fe0ff]/20 blur-[120px]" />

      {/* ===== ROTATING SERVICE BADGE (top-right, desktop only) ===== */}
      <div className="pointer-events-none absolute right-8 top-8 z-20 hidden lg:block xl:right-16">
        <motion.div
          aria-hidden="true"
          className="relative h-32 w-32"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { repeat: Infinity, ease: "linear", duration: 26 }
          }
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_40px_-8px_rgba(4,36,59,0.7)] ring-1 ring-white/25">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path
                  id="cfp-badge-arc"
                  d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                />
              </defs>
              <text className="fill-current text-[19px] font-black uppercase tracking-[0.18em]">
                <textPath href="#cfp-badge-arc" startOffset="0%">
                  NOW SERVICING · 10 REGIONS ·
                </textPath>
              </text>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-white"
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#7fe0ff]"
          >
            Local · Licensed · 24/7
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.03]"
          >
            Your Local Plumber — Sydney to the{" "}
            <span className="text-[#7fe0ff]">Southern Highlands</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg md:text-xl text-white/90"
          >
            Licensed, local NSW plumbers handling emergencies, blocked drains,
            hot water and gas fitting across 10 regions — from the Southern
            Highlands to the Eastern Suburbs.
          </motion.p>

          {/* Value-prop row */}
          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
          >
            {VALUE_PROPS.map((label) => (
              <li key={label} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#7fe0ff]" />
                <span className="text-sm md:text-base font-semibold text-white">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* Google rating widget */}
          <motion.div variants={item} className="mt-8">
            <a
              href={BUSINESS_INFO.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-hero-google-reviews"
              className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2.5 ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/15"
            >
              <GoogleG className="h-6 w-6" />
              <span className="text-lg font-bold text-white">
                {BUSINESS_INFO.googleRating}
              </span>
              <span className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]"
                  />
                ))}
              </span>
              <span className="text-sm font-medium text-white/85">
                {BUSINESS_INFO.googleReviewCount} Google reviews
              </span>
            </a>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-white px-8 text-base font-bold text-[#0a66c2] shadow-lg transition hover:bg-white/90"
              data-testid="button-hero-book"
            >
              <Link href="/contact" data-testid="link-hero-book">
                <span className="flex items-center gap-2">
                  Book Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/70 bg-transparent px-8 text-base font-bold text-white transition hover:bg-white/10"
              data-testid="button-hero-call"
            >
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="flex items-center justify-center gap-2"
                data-testid="link-hero-phone"
              >
                <Phone className="h-5 w-5" />
                Call {BUSINESS_INFO.phone}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
