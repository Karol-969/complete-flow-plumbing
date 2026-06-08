import { Link } from "wouter";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES, BUSINESS_INFO } from "@shared/schema";
import { PipesBackground } from "@/components/effects/pipes-background";
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

// A distinct vivid colour per service so the grid reads as bold and graphical.
const THEMES = [
  { gradient: "from-rose-500 to-red-600", glow: "bg-rose-400/30", watermark: "text-rose-500/10" },
  { gradient: "from-sky-500 to-blue-700", glow: "bg-sky-400/30", watermark: "text-sky-500/10" },
  { gradient: "from-cyan-500 to-sky-600", glow: "bg-cyan-400/30", watermark: "text-cyan-500/10" },
  { gradient: "from-violet-500 to-indigo-700", glow: "bg-violet-400/30", watermark: "text-violet-500/10" },
  { gradient: "from-blue-500 to-indigo-600", glow: "bg-blue-400/30", watermark: "text-blue-500/10" },
  { gradient: "from-orange-500 to-red-600", glow: "bg-orange-400/30", watermark: "text-orange-500/10" },
  { gradient: "from-amber-500 to-orange-600", glow: "bg-amber-400/30", watermark: "text-amber-500/10" },
  { gradient: "from-teal-500 to-emerald-600", glow: "bg-teal-400/30", watermark: "text-teal-500/10" },
  { gradient: "from-sky-500 to-cyan-600", glow: "bg-sky-400/30", watermark: "text-sky-500/10" },
] as const;

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
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduce
        ? { duration: 0.6, ease: EASE }
        : { type: "spring", stiffness: 240, damping: 15, mass: 0.7 },
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
        hover: {},
      };
    }
    const dir = index % 3;
    const hidden =
      dir === 0
        ? { opacity: 0, y: 24, scale: 0.88 }
        : dir === 1
          ? { opacity: 0, x: -24, y: 24, scale: 0.88 }
          : { opacity: 0, x: 24, y: 24, scale: 0.88 };
    return {
      hidden,
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 240, damping: 15, mass: 0.7 },
      },
      hover: {
        y: -6,
        scale: 1.03,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    };
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-sky-50/50 via-background to-sky-50/40 overflow-hidden">
      {/* Faint blueprint grid — a nod to plumbing schematics */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,102,194,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(10,102,194,0.07) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 85%)",
        }}
      />
      {/* Sparse animated pipe network (different layout to the section above) */}
      <PipesBackground variant="b" className="opacity-55" />
      {/* Readability wash so the cards stay crisp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/45"
      />

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

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
            const theme = THEMES[index % THEMES.length];
            return (
              <motion.div
                key={service.id}
                variants={cardVariants(index)}
                whileHover={reduce ? undefined : "hover"}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden bg-card/95 backdrop-blur-sm rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-colors duration-300 hover:border-primary/40 hover:shadow-glow"
                  data-testid={`service-card-${service.slug}`}
                >
                  {/* coloured corner glow on hover */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${theme.glow}`}
                  />
                  {/* gradient accent bar */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.gradient} opacity-80`}
                  />
                  {/* big faint watermark icon */}
                  <IconComponent
                    className={`pointer-events-none absolute -bottom-5 -right-3 h-32 w-32 ${theme.watermark}`}
                  />

                  <motion.div
                    variants={
                      reduce
                        ? undefined
                        : {
                            hover: {
                              scale: 1.12,
                              rotate: -3,
                              transition: {
                                type: "spring",
                                stiffness: 320,
                                damping: 12,
                                mass: 0.6,
                              },
                            },
                          }
                    }
                    className={`relative mb-6 inline-flex w-fit items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} text-white p-3.5 shadow-lg`}
                  >
                    <IconComponent className="h-7 w-7" />
                  </motion.div>
                  <h3 className="relative text-xl font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="relative text-muted-foreground text-[15px] leading-relaxed mb-5 line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <span className="relative mt-auto inline-flex items-center text-primary font-semibold text-sm">
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
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.9 }}
          whileInView={
            reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          viewport={{ once: true, margin: "-80px" }}
          transition={
            reduce
              ? { duration: 0.6, ease: EASE }
              : { type: "spring", stiffness: 240, damping: 15, mass: 0.7 }
          }
          className="text-center mt-16 md:mt-20"
        >
          <motion.div
            className="inline-block"
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
