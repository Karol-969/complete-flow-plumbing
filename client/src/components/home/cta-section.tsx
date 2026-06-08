import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, CalendarCheck, Clock, ShieldCheck, MapPin, BadgeCheck } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import teamImage from "@assets/image_1766464585703.png";

const benefits = [
  { icon: Clock, label: "24/7 emergency — no call-out fee" },
  { icon: ShieldCheck, label: `Licensed NSW (Lic. ${BUSINESS_INFO.licence}) & fully insured` },
  { icon: MapPin, label: "Local & same-day service" },
  { icon: BadgeCheck, label: BUSINESS_INFO.guarantee },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function CTASection() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, fall back to a plain opacity fade.
  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-2xl border border-border/60 shadow-card"
        >
          {/* Team photo backdrop */}
          <img
            src={teamImage}
            alt="Complete Flow Plumbing on the job"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80"
          />
          {/* Atmospheric sky glow — gently floats */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[44rem] h-[44rem] bg-primary/15 blur-3xl rounded-full"
            animate={
              reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative px-6 py-16 sm:px-12 md:px-16 md:py-24 text-center"
          >
            <motion.p
              variants={v(fadeUp)}
              className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
            >
              Get It Sorted Today
            </motion.p>
            <motion.h2
              variants={v(zoomIn)}
              className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-5 max-w-3xl mx-auto"
            >
              Ready to Get Your Plumbing{" "}
              <span className="text-primary">Sorted?</span>
            </motion.h2>
            <motion.p
              variants={v(fadeUp)}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Whether it's a 2am burst pipe or a scheduled hot water swap, our team
              is ready. Book online or call now for fast, reliable plumbing across
              the Sutherland Shire, Wollongong, the Southern Highlands and the Illawarra.
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              variants={v(fadeUp)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
            >
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-lg bg-primary text-primary-foreground rounded-full font-bold shadow-glow hover:brightness-110 transition-all w-full sm:w-auto"
                  data-testid="button-cta-book"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3"
                    data-testid="link-cta-book"
                  >
                    <CalendarCheck className="h-6 w-6" />
                    Book Now
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg ring-1 ring-border hover:ring-primary text-foreground rounded-full font-semibold border-0 bg-card/60 backdrop-blur transition-all w-full sm:w-auto"
                  data-testid="button-cta-call"
                >
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="flex items-center justify-center gap-3"
                    data-testid="link-cta-phone"
                  >
                    <Phone className="h-6 w-6 text-primary" />
                    Call {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Truthful benefit chips */}
            <ul className="flex flex-wrap items-center justify-center gap-3 mb-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2.5 rounded-full bg-card/60 ring-1 ring-border/60 px-4 py-2 text-sm text-foreground"
                    variants={v(fadeUp)}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -3,
                            scale: 1.04,
                            transition: { type: "spring" as const, stiffness: 300, damping: 20 },
                          }
                    }
                  >
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium">{benefit.label}</span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.p variants={v(fadeUp)} className="text-sm text-muted-foreground">
              Free, no-obligation quotes. We'll tell you the price before we start.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
