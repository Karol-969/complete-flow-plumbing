// Owner Message — a warm, first-person letter from David Taha, the licensed
// owner of Complete Flow Plumbing. Uses the ONE real owner photo we have
// (cfp-owner.jpeg) and only truthful data — no invented reviews, counts,
// discounts, awards, team members or minute-level guarantees.

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { ShieldCheck, ArrowRight, Phone } from "lucide-react";
import ownerImg from "@assets/cfp-owner.jpeg";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function OwnerMessage() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, fall back to a plain opacity fade.
  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  const ctaSpring = { type: "spring" as const, stiffness: 400, damping: 17 };
  const hoverScale = reduce ? undefined : { scale: 1.05, transition: ctaSpring };
  const tapScale = reduce ? undefined : { scale: 0.95, transition: ctaSpring };

  return (
    <section
      className="bg-gradient-to-b from-background via-primary/5 to-background py-20 md:py-28"
      data-testid="section-owner-message"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: owner photo with accent blob + floating licence pill */}
          <motion.div
            className="relative"
            variants={v(fadeLeft)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* cyan accent blob behind the frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-2/3 w-2/3 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-primary/10">
              <img
                src={ownerImg}
                alt="David Taha, owner and licensed plumber at Complete Flow Plumbing, in a branded shirt"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              {/* subtle navy overlay along the bottom for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#04243b]/40 to-transparent"
              />
            </div>

            {/* floating white pill badge — NSW licence */}
            <div className="absolute -bottom-5 right-5 sm:right-8">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#04243b] shadow-2xl ring-1 ring-black/5"
                data-testid="badge-owner-licence"
              >
                <ShieldCheck className="h-5 w-5 text-primary" />
                NSW Lic. {BUSINESS_INFO.licence}
              </span>
            </div>
          </motion.div>

          {/* RIGHT: the personal letter */}
          <motion.div
            variants={v(fadeRight)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              A Message From The Owner
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Hi, I&apos;m David — and I&apos;ll treat your home like my own
            </h2>

            <div className="mt-6 space-y-5 text-lg text-muted-foreground max-w-prose">
              <p>
                I started Complete Flow Plumbing because I believe every job
                deserves a fully licensed plumber who actually shows up, does it
                properly, and stands behind the work. When you call, you deal
                with me and my team directly — never a call centre or a
                subcontractor you&apos;ve never met.
              </p>
              <p>
                That means honest, upfront pricing with no surprises, tidy
                workmanship that leaves your place as clean as we found it, and a
                genuine{" "}
                <span className="font-semibold text-foreground">
                  24/7 availability
                </span>{" "}
                when things go wrong at the worst possible time.
              </p>
              <p>
                Whether you&apos;re in the Southern Highlands, the Illawarra, or
                right through to the Eastern Suburbs, I&apos;d be glad to help —
                and I&apos;ll always give you straight answers about what your
                home actually needs.
              </p>
            </div>

            {/* signature */}
            <div className="mt-8">
              <p
                className="font-heading italic text-primary text-4xl md:text-5xl"
                data-testid="text-owner-signature"
              >
                David Taha
              </p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                Owner, {BUSINESS_INFO.name}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <motion.div whileHover={hoverScale} whileTap={tapScale} className="flex">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary px-7 py-3.5 h-auto text-base font-bold text-primary-foreground shadow-lg transition hover:brightness-110"
                  data-testid="button-owner-story"
                >
                  <Link
                    href="/about"
                    className="flex items-center justify-center gap-2"
                    data-testid="link-owner-story"
                  >
                    Read Our Story
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 text-base font-semibold text-foreground transition hover:text-primary"
                data-testid="link-owner-phone"
              >
                <Phone className="h-5 w-5 text-primary" />
                {BUSINESS_INFO.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
