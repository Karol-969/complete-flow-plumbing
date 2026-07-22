import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICES, REGIONS } from "@shared/schema";
import { Search, ArrowRight, MapPin, Wrench } from "lucide-react";

// Real job photos chosen to MATCH each service.
import imgEmergency from "@assets/cfp-gallery-18.jpeg";
import imgDrains from "@assets/cfp-gallery-01.jpeg";
import imgHydro from "@assets/cfp-gallery-07.jpeg";
import imgCctv from "@assets/cfp-gallery-23.jpeg";
import imgRelining from "@assets/cfp-gallery-04.jpeg";
import imgHotWater from "@assets/cfp-gallery-08.jpeg";
import imgGas from "@assets/cfp-gallery-03.jpeg";
import imgLeak from "@assets/cfp-gallery-11.jpeg";
import imgToilet from "@assets/cfp-gallery-20.jpeg";

// Map each service slug to a photo that actually depicts that work.
const PHOTO_BY_SLUG: Record<string, string> = {
  "emergency-plumber": imgEmergency,
  "water-mains": imgDrains,
  "hydro-jetting": imgHydro,
  "water-filter": imgCctv,
  "drainage": imgRelining,
  "hot-water-systems": imgHotWater,
  "gas-fitting": imgGas,
  "kitchen-tap-mixer": imgLeak,
  "toilet-repair": imgToilet,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function ServicesShowcase() {
  const reduce = useReducedMotion();
  const [, setLocation] = useLocation();

  const [service, setService] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const handleFind = () => {
    if (service) {
      setLocation(`/services/${service}`);
    } else if (region) {
      setLocation(`/locations/region/${region}`);
    } else {
      setLocation("/services");
    }
  };

  const headerContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1 },
    },
  };

  const headerItem: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.6, ease: EASE }
        : { type: "spring", stiffness: 240, damping: 15, mass: 0.7 },
    },
  };

  const gridContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 },
    },
  };

  const cardVariants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
      }
    : {
        hidden: { opacity: 0, y: 28, scale: 0.94 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 240, damping: 16, mass: 0.7 },
        },
      };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
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
            We Specialise In The Following Plumbing Services
          </motion.h2>
          <motion.p
            variants={headerItem}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Pick a service and your area to find the right local plumber fast,
            or browse our full range of work below.
          </motion.p>
        </motion.div>

        {/* Service + suburb finder */}
        <motion.div
          variants={headerItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto rounded-2xl border border-border bg-card shadow-card p-4 flex flex-col md:flex-row gap-3 mb-14 md:mb-20"
        >
          <div className="flex-1">
            <Select value={service} onValueChange={setService}>
              <SelectTrigger
                className="h-12 rounded-full px-5 text-base"
                aria-label="Choose a plumbing service"
                data-testid="select-service"
              >
                <span className="flex items-center gap-2 truncate">
                  <Wrench className="h-4 w-4 shrink-0 text-primary" />
                  <SelectValue placeholder="Choose a service" />
                </span>
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s.slug} value={s.slug}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger
                className="h-12 rounded-full px-5 text-base"
                aria-label="Choose your area"
                data-testid="select-region"
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <SelectValue placeholder="Choose your area" />
                </span>
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r.slug} value={r.slug}>
                    {r.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            onClick={handleFind}
            size="lg"
            className="h-12 rounded-full px-7 font-bold bg-primary text-primary-foreground hover:brightness-110 transition shrink-0"
            data-testid="button-find-plumber"
          >
            <Search className="h-5 w-5 mr-2" />
            Find a Plumber
          </Button>
        </motion.div>

        {/* Photo service cards */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((s) => {
            const photo = PHOTO_BY_SLUG[s.slug] ?? imgEmergency;
            return (
              <motion.div key={s.id} variants={cardVariants} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl shadow-card"
                  data-testid={`showcase-card-${s.slug}`}
                >
                  {/* Photo */}
                  <img
                    src={photo}
                    alt={s.title}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Bottom gradient overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />

                  {/* Subtle cyan accent bar above the title */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span
                      aria-hidden
                      className="block h-1 w-10 rounded-full bg-primary mb-3 transition-all duration-500 group-hover:w-16"
                    />
                    <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-white drop-shadow">
                      {s.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center text-sm font-semibold text-white/0 -translate-y-1 opacity-0 transition-all duration-300 group-hover:text-white group-hover:translate-y-0 group-hover:opacity-100">
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
