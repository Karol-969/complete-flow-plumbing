// Honest "Meet Your Local Plumber" section — uses the ONE real owner photo we have
// (cfp-owner.jpeg: the licensed local plumber in a branded Complete Flow shirt).
// TODO: add the owner/plumber name + role once the client provides it — do NOT invent a name.

import { motion } from "framer-motion";
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

export function MeetTheTeam() {
  return (
    <section
      className="bg-background py-20 md:py-28"
      data-testid="section-meet-the-team"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Real owner photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-none"
          >
            <div className="group relative overflow-hidden rounded-2xl ring-2 ring-primary/30 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:ring-primary/50">
              {/* subtle sky glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-primary/10 via-transparent to-primary/10"
              />
              <img
                src={owner}
                alt="A licensed local plumber from Complete Flow Plumbing in a branded shirt"
                className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:aspect-[4/5]"
                loading="lazy"
              />
              {/* bottom fade for legibility */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent"
              />
              {/* small brand badge */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm font-semibold text-foreground ring-1 ring-primary/30 backdrop-blur">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  David Taha · NSW Lic. {BUSINESS_INFO.licence}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Honest copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Familiar Faces
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Meet <span className="text-primary">David Taha</span>, Your Local
              Plumber
            </h2>
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

            {/* Trust ticks */}
            <ul className="mt-8 space-y-3">
              {TRUST_TICKS.map((tick) => {
                const Icon = tick.icon;
                return (
                  <li
                    key={tick.label}
                    className="flex items-center gap-3"
                    data-testid={`tick-${tick.label}`}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {tick.label}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary px-7 py-3.5 h-auto text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
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
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full px-7 py-3.5 h-auto text-base font-semibold text-foreground ring-1 ring-border transition hover:ring-primary"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
