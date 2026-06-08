// Honest "Meet Your Local Plumber" section — uses the ONE real owner photo we have
// (cfp-owner.jpeg: the licensed local plumber in a branded Complete Flow shirt).
// TODO: add the owner/plumber name + role once the client provides it — do NOT invent a name.

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, BadgeCheck, ShieldCheck, Clock, CalendarCheck } from "lucide-react";
import owner from "@assets/cfp-owner.jpeg";

// Honest trust ticks — no invented names, reviews, ratings, or counts.
const TRUST_TICKS = [
  { icon: BadgeCheck, label: `Qualified Supervisor — NSW Lic. ${BUSINESS_INFO.licence}` },
  { icon: ShieldCheck, label: "Fully insured" },
  { icon: Clock, label: "Same-day service" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

// Springy "pop" — overshoots slightly so elements bounce in on entry.
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
// Heading pop — scales up from 0.9 with the same springy overshoot.
const popHeading: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: POP },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function MeetTheTeam() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, fall back to a plain opacity fade.
  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  const ticksContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: reduce ? 0 : 0.1 },
    },
  };

  // Snappy spring bounce for CTAs — pop up on hover, squash on tap.
  const ctaSpring = { type: "spring" as const, stiffness: 400, damping: 17 };
  const hoverScale = reduce
    ? undefined
    : { scale: 1.05, transition: ctaSpring };
  const tapScale = reduce ? undefined : { scale: 0.9, transition: ctaSpring };

  return (
    <section
      className="bg-background py-20 md:py-28"
      data-testid="section-meet-the-team"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Real owner photo — slides in from the LEFT */}
          <motion.div variants={v(fadeLeft)} className="order-1 lg:order-none">
            <motion.div
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.03,
                      y: -6,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }
              }
              className="group relative overflow-hidden rounded-2xl ring-2 ring-primary/30 shadow-card transition-shadow duration-300 hover:shadow-glow hover:ring-primary/50"
            >
              {/* subtle sky glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px z-10 rounded-2xl bg-gradient-to-tr from-primary/10 via-transparent to-primary/10"
              />
              <img
                src={owner}
                alt="A licensed local plumber from Complete Flow Plumbing in a branded shirt"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:aspect-[3/4] lg:aspect-[4/5] motion-reduce:transform-none"
                loading="lazy"
              />
              {/* bottom fade for legibility */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-background/80 to-transparent"
              />
              {/* small brand badge */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-primary/30 backdrop-blur">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  David Taha · NSW Lic. {BUSINESS_INFO.licence}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Honest copy — slides in from the RIGHT */}
          <motion.div variants={v(fadeRight)}>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Familiar Faces
            </p>
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
              variants={v(popHeading)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              Meet <span className="text-primary">David Taha</span>, Your Local
              Plumber
            </motion.h2>
            <p className="mt-3 text-base font-semibold text-foreground">
              Owner &amp; Licensed Plumber · Qualified Supervisor ·{" "}
              <span className="text-primary">
                NSW Contractor Licence {BUSINESS_INFO.licence}
              </span>
            </p>
            <p className="mt-5 text-lg text-muted-foreground max-w-prose">
              When you call Complete Flow Plumbing you deal directly with David
              Taha — a licensed local plumber and qualified supervisor who turns
              up, does the job right, and stands behind it. No call centres, no
              subcontractors you have never met — just honest, reliable work from
              someone who knows your area.
            </p>

            {/* Trust ticks — stagger in */}
            <motion.ul
              className="mt-8 space-y-3"
              variants={ticksContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {TRUST_TICKS.map((tick) => {
                const Icon = tick.icon;
                return (
                  <motion.li
                    key={tick.label}
                    variants={v(fadeUp)}
                    className="flex items-center gap-3"
                    data-testid={`tick-${tick.label}`}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {tick.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* CTAs — hover-scale */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={hoverScale}
                whileTap={tapScale}
                className="flex"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-primary px-7 py-3.5 h-auto text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
                  data-testid="button-team-call"
                >
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="flex items-center justify-center gap-2"
                    data-testid="link-team-phone"
                  >
                    <Phone className="h-5 w-5" />
                    Call {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={hoverScale}
                whileTap={tapScale}
                className="flex"
              >
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full rounded-full px-7 py-3.5 h-auto text-base font-semibold text-foreground ring-1 ring-border transition hover:ring-primary"
                  data-testid="button-team-book"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2"
                    data-testid="link-team-book"
                  >
                    <CalendarCheck className="h-5 w-5 text-primary" />
                    Book Online
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
