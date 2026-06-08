import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { REGIONS, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export function ServiceAreaMap() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[42rem] max-w-full bg-primary/10 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Service Area
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Sutherland Shire to the{" "}
            <span className="text-primary">Southern Tablelands</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            {BUSINESS_INFO.name} provides fast, reliable plumbing across{" "}
            {REGIONS.length} regions — from the coast to the highlands.
          </p>
        </motion.div>

        {/* Google Maps iframe */}
        <motion.div
          className="mb-16 rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden p-2 sm:p-3 transition-all hover:border-primary/40 hover:shadow-glow"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="relative w-full overflow-hidden rounded-xl border border-border/60">
            <iframe
              title={`${BUSINESS_INFO.name} service area map`}
              src={BUSINESS_INFO.googleMapsUrl}
              className="w-full h-[340px] md:h-[460px] border-0 grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              data-testid="service-area-google-map"
            />
          </div>
        </motion.div>

        {/* Region pill links */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-8">
            Regions We Service
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {REGIONS.map((region, index) => (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link
                  href={`/locations/region/${region.slug}`}
                  className="group flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
                  data-testid={`region-chip-${region.slug}`}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {region.displayName}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* "Not sure?" CTA card */}
        <motion.div
          className="bg-card rounded-2xl border border-border/60 shadow-card p-8 md:p-10 transition-all hover:border-primary/40 hover:shadow-glow"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
                Not Sure If We Service Your <span className="text-primary">Area</span>?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Give us a call and we&apos;ll let you know if we can help. We&apos;re
                expanding our service area regularly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                asChild
                className="bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
                data-testid="map-call-cta"
              >
                <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {BUSINESS_INFO.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-7 py-3.5 font-semibold transition"
              >
                <Link href="/locations" className="flex items-center gap-2">
                  View All Areas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
