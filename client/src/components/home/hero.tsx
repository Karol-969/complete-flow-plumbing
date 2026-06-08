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
import { Phone, Siren, CalendarClock, DollarSign, FileText, Clock, ShieldCheck } from "lucide-react";
import heroImage from "@assets/image_1766464585703.png";

const PREFERRED_TIMES = [
  { value: "first-available", label: "First Available" },
  { value: "morning", label: "Morning (8am – 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "evening", label: "Evening" },
];

const TRUST_CLAIMS = [
  { icon: DollarSign, label: "$0 Call-Out Fee" },
  { icon: FileText, label: "Free Quotes" },
  { icon: Clock, label: "Same-Day" },
  { icon: ShieldCheck, label: "Licensed NSW" },
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
    <section className="relative flex min-h-[600px] items-center overflow-hidden md:min-h-[720px]">
      {/* Cinematic dark background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.4] saturate-[0.75]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Clean dark gradient scrim — left-anchored for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
        {/* Subtle sky glow at the top for atmosphere */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Floating emergency badge */}
      <div className="absolute right-4 top-4 z-20 md:right-8 md:top-8">
        <span className="inline-flex animate-pulse items-center gap-2 rounded-full bg-emergency px-4 py-2 text-sm font-semibold text-emergency-foreground shadow-glow">
          <Siren className="h-4 w-4" />
          24/7 Emergency Available
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: headline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">
              Licensed NSW Plumber · Lic. {BUSINESS_INFO.licence}
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {suburb ? (
                <>
                  Your Local <span className="text-primary">{suburb}</span> Plumber
                </>
              ) : (
                <>
                  Your Local <span className="text-primary">Plumber</span>
                  <span className="mt-3 block text-2xl font-semibold leading-tight tracking-tight text-foreground/85 md:text-3xl lg:text-4xl">
                    Sutherland Shire to the Southern Highlands
                  </span>
                </>
              )}
            </h1>

            {/* Trust subline — clean inline row of TRUE claims */}
            <div className="mb-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              {TRUST_CLAIMS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-foreground/90 md:text-base"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" />
                  {label}
                </span>
              ))}
            </div>

            {/* Dominant dual CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
                data-testid="button-hero-book"
              >
                <Link href="/contact" data-testid="link-hero-book">
                  Book Now
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full px-7 py-3.5 text-base font-semibold text-foreground ring-1 ring-border transition hover:ring-primary"
                data-testid="button-hero-call"
              >
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="flex items-center justify-center gap-2"
                  data-testid="link-hero-phone"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  Call {BUSINESS_INFO.phone}
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Right: inline mini lead-capture card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
            className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow md:p-8"
          >
            <div className="mb-6 flex items-start gap-3.5">
              <span className="rounded-2xl bg-primary/10 p-3.5 text-primary ring-1 ring-primary/20">
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

            <div className="space-y-5">
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
                className="w-full rounded-full bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
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
