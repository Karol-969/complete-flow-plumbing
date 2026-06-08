// TODO: replace placeholder images and labels with real team photos and names supplied by the client.
// This section intentionally uses an existing repo image as a placeholder and HONEST neutral role
// labels — NO fabricated plumber names, headshots, or invented people. Swap in real team photos
// + names once the client provides them.

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, BadgeCheck, ShieldCheck, MapPin } from "lucide-react";
import teamImage from "@assets/image_1766464585703.png";

// Placeholder team cards — honest neutral roles only, no invented personal names.
// Each card reuses an existing real image already in the repo until real headshots arrive.
const TEAM_PLACEHOLDERS = [
  {
    role: "Licensed Plumber",
    note: `Fully licensed NSW (Lic. ${BUSINESS_INFO.licence})`,
    icon: BadgeCheck,
  },
  {
    role: "Your Local Team",
    note: "Locally owned — knows your area",
    icon: MapPin,
  },
  {
    role: "Licensed Gas Fitter",
    note: "Licensed & fully insured",
    icon: ShieldCheck,
  },
  {
    role: "24/7 Emergency Plumber",
    note: "On call day and night",
    icon: Phone,
  },
] as const;

export function MeetTheTeam() {
  return (
    <section
      className="bg-background py-20 md:py-28"
      data-testid="section-meet-the-team"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Familiar Faces
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Meet Your <span className="text-primary">Local Plumbers</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-prose">
            When you call Complete Flow Plumbing you reach a licensed local
            plumber who knows your area, not a call centre.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TEAM_PLACEHOLDERS.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                data-testid={`card-team-${index}`}
              >
                {/* Placeholder photo — sky ring, room for a real headshot */}
                <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-2xl ring-2 ring-primary/30 ring-offset-2 ring-offset-card">
                  <img
                    src={teamImage}
                    alt="Complete Flow Plumbing — a licensed local plumber (placeholder photo)"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/40 to-transparent"
                  />
                </div>

                {/* Name placeholder — intentionally NOT a fabricated personal name */}
                <p className="mt-6 text-center text-lg font-bold tracking-tight text-foreground">
                  Your Local Plumber
                </p>

                {/* Honest neutral role label */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center justify-center rounded-2xl bg-primary/10 p-2 text-primary ring-1 ring-primary/20">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {member.role}
                  </span>
                </div>

                <p className="mt-3 text-center text-sm text-muted-foreground">
                  {member.note}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 md:mt-16 flex flex-col items-center justify-center gap-4 text-center"
        >
          <p className="text-muted-foreground max-w-prose">
            Speak to a real local plumber now — fully licensed, fully insured,
            available 24/7.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground rounded-full px-7 py-3.5 h-auto text-lg font-bold shadow-glow hover:brightness-110 transition"
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
      </div>
    </section>
  );
}
