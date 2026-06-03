import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, ShieldCheck, Siren, BadgeCheck } from "lucide-react";

const chips = [
  { icon: ShieldCheck, label: "Licensed NSW" },
  { icon: BadgeCheck, label: "Fully Insured" },
  { icon: Siren, label: "24/7 Emergency" },
  { icon: BadgeCheck, label: "Workmanship Guarantee" },
];

export function ValueBand() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-primary to-[hsl(197_100%_42%)]"
      data-testid="section-value-band"
    >
      {/* Soft light blobs for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center"
        >
          {/* Message */}
          <div className="text-primary-foreground">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              No Call-Out Fee. Free Quotes. Same-Day Service.
            </h2>
            <div className="flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/25 px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <chip.icon className="h-4 w-4" />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 lg:items-end">
            <Button
              asChild
              size="lg"
              className="h-14 w-full sm:w-auto px-8 text-lg bg-background text-foreground rounded-full font-bold shadow-card hover:brightness-110 transition"
              data-testid="button-value-book"
            >
              <Link href="/contact" data-testid="link-value-book">
                Book Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-14 w-full sm:w-auto px-8 text-lg text-primary-foreground rounded-full font-bold ring-2 ring-primary-foreground/60 hover:bg-primary-foreground/10 transition"
              data-testid="button-value-call"
            >
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="flex items-center justify-center gap-2"
                data-testid="link-value-phone"
              >
                <Phone className="h-5 w-5" />
                Call {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
