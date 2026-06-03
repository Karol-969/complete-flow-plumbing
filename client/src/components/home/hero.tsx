import { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUSINESS_INFO, SERVICES } from "@shared/schema";
import { Phone, Siren, Shield, Clock, BadgeCheck, CalendarClock } from "lucide-react";
import heroImage from "@assets/image_1766464585703.png";

const PREFERRED_TIMES = [
  { value: "first-available", label: "First Available" },
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening" },
];

function toTitleCase(input: string): string {
  return input
    .replace(/[-_+]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function Hero() {
  const search = useSearch();
  const [, navigate] = useLocation();

  const suburbParam = new URLSearchParams(search).get("suburb");
  const suburb = suburbParam ? toTitleCase(suburbParam) : null;

  const [serviceType, setServiceType] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const handleQuote = () => {
    const params = new URLSearchParams();
    if (serviceType) params.set("serviceType", serviceType);
    if (preferredTime) params.set("time", preferredTime);
    const query = params.toString();
    navigate(`/contact${query ? `?${query}` : ""}`);
  };

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
      {/* Cinematic dark background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.45] saturate-[0.7]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Left-anchored gradient scrim from background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        {/* Sky radial blur blob for atmosphere */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Floating emergency badge */}
      <div className="absolute right-4 top-4 z-20 md:right-8 md:top-8">
        <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-emergency-foreground shadow-glow">
          <Siren className="h-4 w-4" />
          24/7 Emergency Available
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Licensed NSW Plumber · Lic. {BUSINESS_INFO.licence}
            </p>

            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {suburb ? (
                <>
                  Your Local <span className="text-primary">{suburb}</span> Plumber
                </>
              ) : (
                <>
                  Your Local <span className="text-primary">Plumber</span>
                  <span className="block text-3xl font-semibold text-foreground/90 md:text-4xl lg:text-5xl">
                    Sutherland Shire to the Southern Highlands
                  </span>
                </>
              )}
            </h1>

            {/* Trust subline — true claims only */}
            <p className="mb-8 max-w-xl text-base text-muted-foreground md:text-lg">
              24/7 emergency · no call-out fee · licensed NSW · same-day service.
            </p>

            {/* Dominant dual CTA */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
                data-testid="button-hero-book"
              >
                <Link href="/contact" data-testid="link-hero-book">
                  Book Now
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full px-6 py-3 text-base font-semibold text-foreground ring-1 ring-border transition hover:ring-primary"
                data-testid="button-hero-call"
              >
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2"
                  data-testid="link-hero-phone"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  Call {BUSINESS_INFO.phone}
                </a>
              </Button>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Licensed &amp; insured
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Same-day service
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                No call-out fee
              </span>
            </div>
          </motion.div>

          {/* Right: inline mini lead-capture card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="group rounded-xl2 border border-border bg-card p-6 shadow-card transition-all hover:border-primary/50 hover:shadow-glow md:p-7"
          >
            <div className="mb-5 flex items-start gap-3">
              <span className="rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/20">
                <CalendarClock className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  What do you need help with?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tell us the basics and we&apos;ll get straight back to you.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Service type
                </label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger
                    className="h-11 rounded-lg border-border bg-background"
                    data-testid="select-hero-service"
                  >
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((service) => (
                      <SelectItem key={service.id} value={service.slug}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Preferred time
                </label>
                <Select value={preferredTime} onValueChange={setPreferredTime}>
                  <SelectTrigger
                    className="h-11 rounded-lg border-border bg-background"
                    data-testid="select-hero-time"
                  >
                    <SelectValue placeholder="When suits you?" />
                  </SelectTrigger>
                  <SelectContent>
                    {PREFERRED_TIMES.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleQuote}
                className="w-full rounded-full bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
                data-testid="button-hero-quote"
              >
                Get My Quote
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                {BUSINESS_INFO.guarantee} · Fully insured · Local NSW team
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
