import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, Star } from "lucide-react";
import owner from "@assets/cfp-owner.jpeg";
import jobPhoto from "@assets/cfp-gallery-12.jpeg";

const EASE = [0.22, 1, 0.36, 1] as const;

type Circle = {
  tone: "light" | "blue";
  big: string;
  sub: string;
  desc: string;
  cta: { label: string; href: string };
  photo?: string;
  photoAlt?: string;
};

// TRUE value props only — no invented offers/discounts.
const CIRCLES: Circle[] = [
  {
    tone: "light",
    big: "$0",
    sub: "Call-Out Fee",
    desc: "No call-out fee during business hours.",
    cta: { label: "Call Now", href: `tel:${BUSINESS_INFO.phoneTel}` },
    photo: owner,
    photoAlt: "David Taha, Complete Flow Plumbing",
  },
  {
    tone: "blue",
    big: "Free",
    sub: "Upfront Quotes",
    desc: "Know the price before we start — no surprises.",
    cta: { label: "Call Now", href: `tel:${BUSINESS_INFO.phoneTel}` },
    photo: jobPhoto,
    photoAlt: "Completed plumbing job by Complete Flow Plumbing",
  },
  {
    tone: "light",
    big: "Same-Day",
    sub: "Service",
    desc: "A local plumber on the way today.",
    cta: { label: "Call Now", href: `tel:${BUSINESS_INFO.phoneTel}` },
  },
  {
    tone: "blue",
    big: "5.0★",
    sub: "Rated on Google",
    desc: `Rated by ${BUSINESS_INFO.googleReviewCount} local customers.`,
    cta: { label: "See Reviews", href: BUSINESS_INFO.googleReviewLink },
  },
];

export function HighlightCircles() {
  const reduce = useReducedMotion();

  const pop: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.7, y: reduce ? 0 : 30 },
    show: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.4 }
        : { type: "spring" as const, stiffness: 200, damping: 16, delay: i * 0.12 },
    }),
  };

  const float = (d: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -16, 0], x: [0, 8, 0] },
          transition: {
            duration: 11 + d,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <section className="relative overflow-hidden bg-[#0b1220] py-20 md:py-28">
      {/* Decorative floating blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        {...float(0)}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 -top-10 h-64 w-64 rounded-full bg-[#1d4ed8]/30 blur-3xl"
        {...float(3)}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-0 h-56 w-56 rounded-full bg-[#ef4444]/15 blur-3xl"
        {...float(5)}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Why Locals Choose Us
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Real value, <span className="text-primary">no surprises</span>
          </h2>
        </motion.div>

        {/* Circles */}
        <motion.div
          className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:items-center lg:gap-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {CIRCLES.map((c, i) => (
            <motion.div
              key={c.sub}
              custom={i}
              variants={pop}
              className={`relative ${i > 0 ? "lg:-ml-12" : ""}`}
              style={{ zIndex: 10 + i }}
            >
              {/* Peeking real photo */}
              {c.photo && (
                <div className="absolute left-1/2 -top-20 z-0 hidden -translate-x-1/2 lg:block">
                  <div className="h-40 w-40 overflow-hidden rounded-full ring-4 ring-white/10 shadow-2xl">
                    <img
                      src={c.photo}
                      alt={c.photoAlt ?? ""}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* The circle */}
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.05, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className={`relative z-10 flex h-64 w-64 flex-col items-center justify-center rounded-full px-8 text-center shadow-2xl md:h-72 md:w-72 ${
                  c.tone === "light"
                    ? "bg-white text-[#0b1220]"
                    : "bg-gradient-to-br from-[#0a66c2] to-[#0094d9] text-white"
                }`}
              >
                <p className="text-4xl md:text-5xl font-black leading-none">{c.big}</p>
                <p className="mt-1 text-lg md:text-xl font-bold">{c.sub}</p>
                <p
                  className={`mt-2 text-sm leading-snug ${
                    c.tone === "light" ? "text-[#0b1220]/70" : "text-white/85"
                  }`}
                >
                  {c.desc}
                </p>
                <motion.a
                  href={c.cta.href}
                  {...(c.cta.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  whileHover={reduce ? undefined : { scale: 1.06 }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#f0f4f8] px-4 py-2 text-sm font-bold text-[#0a66c2] shadow ring-1 ring-black/5"
                >
                  {c.cta.label === "See Reviews" ? (
                    <Star className="h-4 w-4 fill-[#0a66c2]" />
                  ) : (
                    <Phone className="h-4 w-4" />
                  )}
                  {c.cta.label}
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HighlightCircles;
