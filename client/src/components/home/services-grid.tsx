import { Link } from "wouter";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES, BUSINESS_INFO } from "@shared/schema";
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
  ShieldCheck,
  Clock,
  BadgeCheck,
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

// True, non-fabricated trust points sourced from BUSINESS_INFO.
const TRUST_POINTS = [
  { icon: ShieldCheck, label: `Licensed NSW · Lic ${BUSINESS_INFO.licence}` },
  { icon: Clock, label: "24/7 Emergency · Same-Day" },
  { icon: BadgeCheck, label: BUSINESS_INFO.guarantee },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesGrid() {
  const reduce = useReducedMotion();

  const headerContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1 },
    },
  };

  const headerItem: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  const gridContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1 },
    },
  };

  // Cards stagger in, alternating fadeUp with a subtle slide from
  // alternating sides for visual interest.
  const cardVariants = (index: number): Variants => {
    if (reduce) {
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
      };
    }
    const dir = index % 3;
    const hidden =
      dir === 0
        ? { opacity: 0, y: 50 }
        : dir === 1
          ? { opacity: 0, x: -28, y: 24 }
          : { opacity: 0, x: 28, y: 24 };
    return {
      hidden,
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.6, ease: EASE },
      },
    };
  };

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[44rem] max-w-full rounded-full bg-primary/10 blur-3xl"
        animate={
          reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
        >
          <motion.p
            variants={headerItem}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Our Plumbing Services
          </motion.p>
          <motion.h2
            variants={headerItem}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-5"
          >
            Everything Your Property Needs,{" "}
            <span className="text-primary">Done Right</span>
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            From emergency repairs to full installations, we deliver
            comprehensive plumbing for homes and businesses across the
            Sutherland Shire, Wollongong, the Southern Highlands and beyond.
          </motion.p>

          {/* True trust strip — no fabricated claims */}
          <motion.div
            variants={headerItem}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants(index)}
                whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-colors duration-300 hover:border-primary/40 hover:shadow-glow"
                  data-testid={`service-card-${service.slug}`}
                >
                  <div className="mb-6 inline-flex w-fit items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3.5 transition-colors group-hover:bg-primary/20 group-hover:scale-110 group-hover:-rotate-3 motion-safe:duration-300 motion-safe:transition-transform">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center text-primary font-semibold text-sm">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mt-16 md:mt-20"
        >
          <motion.div
            className="inline-block"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
              data-testid="button-view-all-services"
            >
              <Link href="/services" data-testid="link-all-services">
                View All Services
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
