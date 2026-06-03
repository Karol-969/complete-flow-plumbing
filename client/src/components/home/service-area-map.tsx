import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { REGIONS, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, ArrowRight } from "lucide-react";

const phoneTel = BUSINESS_INFO.phone.replace(/\s/g, "");

export function ServiceAreaMap() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[40rem] bg-primary/10 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Service Area
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Serving the Southern Highlands, Illawarra &amp; South Coast
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the Sutherland Shire down to the Southern Tablelands, {BUSINESS_INFO.name}{" "}
            provides fast, reliable plumbing services across {REGIONS.length} regions.
          </p>
        </motion.div>

        {/* Google Maps iframe */}
        <motion.div
          className="mb-12 rounded-xl2 border border-border bg-card shadow-card overflow-hidden p-2 sm:p-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="relative w-full overflow-hidden rounded-xl border border-border">
            <iframe
              title={`${BUSINESS_INFO.name} service area map`}
              src={BUSINESS_INFO.googleMapsUrl}
              className="w-full h-[320px] md:h-[420px] border-0 grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              data-testid="service-area-google-map"
            />
          </div>
        </motion.div>

        {/* Region pill links */}
        <div className="mb-12">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Regions We Service
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {REGIONS.map((region, index) => (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/locations/region/${region.slug}`}
                  className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-glow"
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
          className="bg-card rounded-xl2 border border-border shadow-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">
                Not Sure If We Service Your Area?
              </h3>
              <p className="text-muted-foreground">
                Give us a call and we'll let you know if we can help. We're expanding our
                service area regularly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                asChild
                className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
                data-testid="map-call-cta"
              >
                <a href={`tel:${phoneTel}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {BUSINESS_INFO.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-6 py-3 font-semibold transition"
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
