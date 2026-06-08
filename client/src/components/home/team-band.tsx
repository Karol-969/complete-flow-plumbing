import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, CalendarCheck } from "lucide-react";
import teamImage from "@assets/image_1766464585703.png";

export function TeamBand() {
  return (
    <section className="bg-background py-16 md:py-24" data-testid="section-team-band">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl2 border border-border shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-2"
        >
          {/* Real work/team photo */}
          <div className="relative min-h-[18rem] md:min-h-full">
            <img
              src={teamImage}
              alt="Complete Flow Plumbing — a licensed local plumber on the job"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/20 to-transparent md:bg-gradient-to-r"
            />
          </div>

          {/* Text panel with subtle sky tint */}
          <div className="relative bg-primary/5 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            />
            <p className="relative text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Talk To a Plumber Now
            </p>
            <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
              Speak to a real local plumber — not a call centre
            </h2>
            <p className="relative text-muted-foreground mb-8 max-w-prose">
              When you call Complete Flow Plumbing you reach a licensed local
              plumber who knows your area — no overseas call centres, no
              runaround.
            </p>

            <div className="relative flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-lg bg-primary text-primary-foreground rounded-full font-bold shadow-glow hover:brightness-110 transition"
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
                className="h-14 px-8 text-lg text-foreground rounded-full font-semibold ring-1 ring-border hover:ring-primary transition"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
