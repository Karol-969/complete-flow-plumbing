import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { CheckCircle2, Star } from "lucide-react";
import bandImg from "@assets/cfp-gallery-16.jpeg";
import ownerImg from "@assets/cfp-owner.jpeg";

const PROMISES: { lead: string; text: string }[] = [
  { lead: "A plumber who answers the phone", text: "24/7" },
  { lead: "Free, upfront quotes", text: "no surprises" },
  { lead: "Same-day service", text: "when you need it" },
  { lead: "Fully licensed & insured", text: "NSW plumbers" },
  { lead: "A tidy job site", text: "every time" },
  { lead: "Honest advice", text: "never upsold" },
];

export function PromiseBand() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      data-testid="section-promise-band"
    >
      {/* Faint background photo */}
      <img
        src={bandImg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Strong cyan/navy overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#0a66c2]/95 via-[#0a5598]/92 to-[#04243b]/95"
      />
      {/* Blurred glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#7fe0ff]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#0a66c2]/40 blur-3xl"
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-white">
          {/* LEFT */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#7fe0ff] mb-4">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.05] mb-8">
              We Believe You Deserve&hellip;
            </h2>

            <ul className="space-y-3 mb-10">
              {PROMISES.map((p, i) => (
                <motion.li
                  key={p.lead}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.07 }}
                  className="flex items-start gap-3"
                  data-testid={`promise-row-${i}`}
                >
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#7fe0ff]" />
                  <p className="text-base md:text-lg text-white/95">
                    <span className="font-bold text-white">{p.lead}</span>
                    {" — "}
                    {p.text}
                  </p>
                </motion.li>
              ))}
            </ul>

            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg bg-white text-[#04243b] rounded-full font-bold shadow-card hover:bg-white/90 transition"
              data-testid="button-promise-quote"
            >
              <Link href="/contact" data-testid="link-promise-quote">
                Get My Free Quote
              </Link>
            </Button>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none hidden sm:block"
          >
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/25 shadow-2xl">
              <img
                src={ownerImg}
                alt={`${BUSINESS_INFO.name} owner David Taha, licensed NSW plumber`}
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#04243b]/40 to-transparent"
              />
            </div>

            {/* Floating rating chip */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card ring-1 ring-black/5"
              data-testid="chip-promise-rating"
            >
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold text-[#04243b]">
                {BUSINESS_INFO.googleRating} star
              </span>
              <span className="text-sm text-[#04243b]/60">
                &middot; {BUSINESS_INFO.googleReviewCount} reviews
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
