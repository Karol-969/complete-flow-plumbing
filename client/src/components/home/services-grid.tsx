import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@shared/schema";
import {
  Siren,
  Droplets,
  Flame,
  Fuel,
  Search,
  Wrench,
  Camera,
  Bath,
  ArrowRight,
} from "lucide-react";

export const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Siren,
  PipeSolid: Droplets,
  Droplets,
  Camera,
  Wrench,
  Flame,
  Fuel,
  Search,
  Bath,
};

export function ServicesGrid() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* atmospheric sky glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Plumbing Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything Your Property Needs, Done Right
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From emergency repairs to installations, we provide comprehensive
            plumbing solutions for homes and businesses across Sydney and the
            Southern Highlands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col bg-card rounded-xl2 border border-border shadow-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                  data-testid={`service-card-${service.slug}`}
                >
                  <div className="mb-5 inline-flex w-fit items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3 transition-colors group-hover:bg-primary/20">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center text-primary font-semibold text-sm">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
            data-testid="button-view-all-services"
          >
            <Link href="/services" data-testid="link-all-services">
              View All Services
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
