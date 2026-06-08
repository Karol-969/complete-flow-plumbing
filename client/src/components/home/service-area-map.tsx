import { Link } from "wouter";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { REGIONS, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServiceAreaMap() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, every reveal collapses to a plain fade.
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const fadeRight: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const zoomIn: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  };
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const pillContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };

  const hoverCard = reduce
    ? undefined
    : { y: -6, scale: 1.02, transition: { type: "spring" as const, stiffness: 300, damping: 20 } };
  const hoverPill = reduce
    ? undefined
    : { y: -4, scale: 1.04, transition: { type: "spring" as const, stiffness: 300, damping: 20 } };

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header — gently floating */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[42rem] max-w-full bg-primary/10 blur-3xl rounded-full"
        animate={reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
            variants={fadeUp}
          >
            Our Service Area
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
            variants={fadeUp}
          >
            Sutherland Shire to the{" "}
            <span className="text-primary">Southern Tablelands</span>
          </motion.h2>
          <motion.p className="mt-5 text-lg text-muted-foreground" variants={fadeUp}>
            {BUSINESS_INFO.name} provides fast, reliable plumbing across{" "}
            {REGIONS.length} regions — from the coast to the highlands.
          </motion.p>
        </motion.div>

        {/* Google Maps iframe — zooms/fades in */}
        <motion.div
          className="mb-16 rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden p-2 sm:p-3 transition-all hover:border-primary/40 hover:shadow-glow"
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
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
          <motion.h3
            className="text-center text-sm font-semibold uppercase tracking-widest text-primary mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            Regions We Service
          </motion.h3>
          <motion.div
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            variants={pillContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {REGIONS.map((region, index) => (
              <motion.div
                key={region.slug}
                /* Alternate the entry direction left / right for visual interest */
                variants={index % 2 === 0 ? fadeLeft : fadeRight}
                whileHover={hoverPill}
              >
                <Link
                  href={`/locations/region/${region.slug}`}
                  className="group flex items-center gap-2 rounded-full border border-border/60 bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:shadow-glow"
                  data-testid={`region-chip-${region.slug}`}
                >
                  <MapPin className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                  {region.displayName}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* "Not sure?" CTA card */}
        <motion.div
          className="bg-card rounded-2xl border border-border/60 shadow-card p-8 md:p-10 transition-all hover:border-primary/40 hover:shadow-glow"
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          whileHover={hoverCard}
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
                <motion.a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="flex items-center gap-2"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                >
                  <Phone className="h-4 w-4" />
                  {BUSINESS_INFO.phone}
                </motion.a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-7 py-3.5 font-semibold transition"
              >
                <motion.div
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                >
                  <Link href="/locations" className="flex items-center gap-2">
                    View All Areas
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
