import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { REGIONS, locationsByRegion, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, CheckCircle, ArrowRight, Siren, Clock, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

export default function Locations() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        {/* Atmospheric sky glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 blur-3xl rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Service Areas
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Areas We Service
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete Flow Plumbing proudly services Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra and the Southern Tablelands.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 ring-1 ring-primary/20 text-primary px-4 py-2 text-sm font-semibold">
                <Siren className="h-4 w-4" />
                24/7 Emergency
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 ring-1 ring-primary/20 text-primary px-4 py-2 text-sm font-semibold">
                <Clock className="h-4 w-4" />
                Same-Day Service
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 ring-1 ring-primary/20 text-primary px-4 py-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Licensed NSW Lic. {BUSINESS_INFO.licence}
              </span>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
              data-testid="locations-call"
            >
              <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call: {BUSINESS_INFO.phone}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Region sections */}
      {REGIONS.map((region, index) => {
        const suburbs = locationsByRegion(region.slug);
        return (
          <section
            key={region.slug}
            className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
            data-testid={`region-section-${region.slug}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="mb-12"
              >
                <Link
                  href={`/locations/region/${region.slug}`}
                  className="inline-flex items-center gap-2 group"
                  data-testid={`region-hub-${region.slug}`}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors">
                    {region.displayName}
                  </h2>
                  <ArrowRight className="h-6 w-6 text-primary mb-3 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {region.blurb}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {suburbs.map((suburb, i) => (
                  <motion.div
                    key={suburb.id}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                  >
                    <Link
                      href={`/locations/${suburb.slug}`}
                      data-testid={`location-${suburb.slug}`}
                    >
                      <Card className="bg-card rounded-xl2 border border-border shadow-card group hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow transition-all p-4 h-full">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-2 flex-shrink-0">
                            <MapPin className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            Plumber in {suburb.name}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Why Complete Flow
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Local Service, Professional Results
            </h2>
            <p className="text-muted-foreground">
              As a local plumbing company, we understand the unique needs of homes
              and businesses in each area we service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Fast response times in all service areas",
              "Knowledge of local plumbing systems and NSW regulations",
              "Same-day service available for most suburbs",
              "24/7 emergency service throughout our coverage area",
              "Upfront pricing with no hidden fees",
              `Licensed (NSW Lic. ${BUSINESS_INFO.licence}), insured & guaranteed work`,
            ].map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-3 bg-card rounded-xl2 border border-border shadow-card p-4"
              >
                <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-2 flex-shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </span>
                <span className="text-foreground self-center">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Reviews CTA - truthful, no aggregate claim */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-10 bg-card rounded-xl2 border border-border shadow-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-3 flex-shrink-0">
                <Star className="h-6 w-6" />
              </span>
              <p className="text-foreground font-semibold">
                Worked with us before? See our reviews or leave one on Google.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-6 py-3 font-semibold shrink-0"
              data-testid="locations-reviews"
            >
              <a href={BUSINESS_INFO.googleReviewLink} target="_blank" rel="noopener noreferrer">
                See our Google reviews
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Don't see your suburb listed? We may still be able to help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
              data-testid="locations-contact"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
