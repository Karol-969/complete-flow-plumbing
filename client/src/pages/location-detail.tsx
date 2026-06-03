import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { QuoteForm } from "@/components/forms/quote-form";
import { SEOHead } from "@/components/seo/seo-head";
import { LocalBusinessSchema, LocationSchema, FAQSchema } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { iconMap } from "@/components/home/services-grid";
import {
  SERVICES,
  BUSINESS_INFO,
  ALL_LOCATIONS,
  regionBySlug,
  type FAQ,
  type Location,
  type Region,
} from "@shared/schema";
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Siren,
  Wrench,
  ShieldCheck,
  Users,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

// Fallback region descriptor so content generation never breaks if a region
// somehow has no matching entry in REGIONS (defensive — all 6 are present).
const FALLBACK_REGION: Region = {
  slug: "",
  name: "the local area",
  displayName: "the local area",
  theName: "the local area",
  blurb: "",
  localAngle:
    "Local NSW conditions including ageing pipework, seasonal weather extremes and tree-root drain intrusion.",
  commonIssues: [
    "Blocked drains and tree-root intrusion",
    "Hot water system failures",
    "Leaking taps and burst pipes",
    "Gas fitting and leak detection",
  ],
  targetKeywords: [],
};

// Resolve the Region descriptor for a location, falling back gracefully.
const getRegion = (location: Location): Region =>
  regionBySlug(location.region) ?? FALLBACK_REGION;

// Pick the first listed common issue (region-specific) for FAQ copy.
const primaryIssue = (region: Region): string =>
  (region.commonIssues[0] ?? "blocked drains and hot water faults").toLowerCase();

// Generate local FAQs for each suburb — unique per region via localAngle/commonIssues.
const generateLocalFAQs = (location: Location, region: Region): FAQ[] => {
  const suburbName = location.name;
  const theName = region.theName;
  const issuesList = region.commonIssues.join(", ").toLowerCase();

  return [
    {
      question: `Do you provide emergency plumbing services in ${suburbName}?`,
      answer: `Yes! Complete Flow Plumbing offers 24/7 emergency plumbing services in ${suburbName} and across ${theName}. We aim to respond fast for urgent calls — burst pipes, gas leaks, blocked sewers and no hot water. Our emergency plumbers are on standby around the clock, including weekends and public holidays.`,
    },
    {
      question: `How quickly can a plumber get to ${suburbName}?`,
      answer: `For standard appointments, we offer same-day service in ${suburbName}. For emergencies, we prioritise rapid response. As local plumbers who work throughout ${theName} every day, we know the streets, the access challenges and the typical plumbing setups around ${suburbName}, so we arrive prepared.`,
    },
    {
      question: `What plumbing services do you offer in ${suburbName}?`,
      answer: `We provide comprehensive plumbing services in ${suburbName} including: blocked drain clearing with CCTV inspection, hot water system repairs and installations (gas, electric, solar, heat pump), gas fitting and leak detection, toilet and tap repairs, pipe relining and replacement, bathroom renovations, and stormwater drainage solutions. In ${theName} we particularly often handle ${issuesList}.`,
    },
    {
      question: `Do you charge a call-out fee in ${suburbName}?`,
      answer: `No call-out fee for standard service calls during business hours in ${suburbName}. Emergency after-hours calls may incur a small surcharge which we communicate upfront. We always provide a written quote before starting any work so there are no surprises.`,
    },
    {
      question: `Are your plumbers licensed to work in ${suburbName}?`,
      answer: `Absolutely. All our plumbers are fully licensed with NSW Fair Trading (Licence ${BUSINESS_INFO.licence}) and carry comprehensive public liability insurance. We're qualified to work throughout ${suburbName}, ${theName} and all of NSW.`,
    },
    {
      question: `What are common plumbing problems in ${suburbName} homes?`,
      answer: `Across ${theName} the issues we see most are ${issuesList}. ${region.localAngle} In ${suburbName} specifically we tailor our approach to the local property types and conditions, diagnosing the real cause before recommending a fix.`,
    },
    {
      question: `How much does a plumber cost in ${suburbName}?`,
      answer: `Plumbing costs vary depending on the job. Simple repairs like fixing a leaking tap typically start from $120, while more complex jobs — such as ${primaryIssue(region)} — are quoted individually after inspection. We offer free quotes for larger jobs and always provide upfront pricing before starting work in ${suburbName}.`,
    },
    {
      question: `Do you offer warranties on your work in ${suburbName}?`,
      answer: `Yes! All our workmanship comes with a guarantee. We also honour manufacturer warranties on all products we install. If something isn't right, we'll come back and fix it at no extra cost.`,
    },
  ];
};

// Generate unique suburb content based on location and its region's local realities.
const generateSuburbContent = (
  location: Location,
  region: Region,
): { intro: string; localInfo: string; services: string; pipes: string } => {
  const suburbName = location.name;
  const regionName = region.displayName;
  const theName = region.theName;
  const issues = region.commonIssues;
  const issuesSentence = issues.length
    ? `${issues.slice(0, -1).join(", ")}${issues.length > 1 ? " and " : ""}${issues[issues.length - 1]}`.toLowerCase()
    : "blocked drains and hot water faults";

  return {
    intro: `Looking for a trusted plumber in ${suburbName}? Complete Flow Plumbing provides fast, reliable plumbing services throughout ${suburbName} and the wider ${regionName} region. Our licensed NSW plumbers are available 24 hours a day, 7 days a week for plumbing emergencies, and offer same-day bookings for all standard plumbing work. We provide upfront written quotes, no call-out fees during business hours, and back every job with a workmanship guarantee.`,
    localInfo: `${region.localAngle} That's exactly the environment our ${suburbName} plumbers work in every day. Whether you need an emergency plumber in ${suburbName} at 2am, a blocked drain cleared before guests arrive, a hot water system replaced today, or a gas appliance installed safely, Complete Flow Plumbing is your local ${suburbName} plumber. We service residential homes, rental properties, strata buildings, and small commercial premises throughout ${theName}.`,
    services: `Our plumbers in ${suburbName} handle the full range of residential and commercial plumbing: blocked drains and CCTV inspection, hot water system repairs and replacement (gas, electric, heat pump, solar), gas fitting and gas leak detection, leaking taps and burst pipes, toilet repairs and replacements, bathroom and kitchen plumbing, pipe relining, stormwater drainage, and more. If it involves water or gas pipes in ${suburbName}, we do it.`,
    pipes: `Because of the local conditions, ${suburbName} properties commonly need help with ${issuesSentence}. ${region.localAngle} Our CCTV drain inspection and leak detection identify exactly what's happening before we recommend a solution, so you only pay for the work that's actually required.`,
  };
};

export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();

  const location = ALL_LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Location Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The location you're looking for doesn't exist.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
          >
            <Link href="/locations">View All Locations</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const region = getRegion(location);
  const regionDisplayName = region.displayName;
  const theName = region.theName;
  const localFAQs = generateLocalFAQs(location, region);
  const suburbContent = generateSuburbContent(location, region);

  // Nearby suburbs: resolve this location's real adjacent slugs (same region).
  const nearbySuburbs: Location[] = (location.nearby ?? [])
    .map((nearbySlug) => ALL_LOCATIONS.find((l) => l.slug === nearbySlug))
    .filter((l): l is Location => Boolean(l));

  // SEO keywords for this location — generic per-suburb terms plus the region's
  // own curated target keywords for genuinely localised, non-thin content.
  const seoKeywords = [
    `plumber ${location.name}`,
    `plumber in ${location.name}`,
    `${location.name} plumber`,
    `emergency plumber ${location.name}`,
    `24/7 plumber ${location.name}`,
    `blocked drains ${location.name}`,
    `hot water ${location.name}`,
    `gas plumber ${location.name}`,
    `local plumber ${location.name}`,
    `plumbing services ${location.name}`,
    `best plumber ${location.name}`,
    `cheap plumber ${location.name}`,
    `affordable plumber ${location.name}`,
    `licensed plumber ${location.name}`,
    `burst pipe ${location.name}`,
    `leaking tap ${location.name}`,
    `blocked toilet ${location.name}`,
    `drain cleaning ${location.name}`,
    `hot water repair ${location.name}`,
    `gas leak ${location.name}`,
    `plumber near me ${location.name}`,
    `same day plumber ${location.name}`,
    `weekend plumber ${location.name}`,
    `after hours plumber ${location.name}`,
    ...region.targetKeywords,
  ];

  // Region-specific "common issues" cards. Icons come from the per-service
  // iconMap (blocked drains -> PipeSolid, hot water -> Flame) so they stay
  // visually consistent with the home page services grid.
  const issueCards = [
    {
      icon: iconMap["PipeSolid"] ?? Wrench,
      title: region.commonIssues[0] ?? "Blocked Drains",
      body: `In ${location.name}, ${(region.commonIssues[0] ?? "blocked drains").toLowerCase()} is one of the most frequent calls we get. ${region.localAngle} Our CCTV drain inspection and hydro jetting quickly diagnose and resolve the problem at its source.`,
    },
    {
      icon: iconMap["Flame"] ?? Wrench,
      title: region.commonIssues[1] ?? "Hot Water Problems",
      body: `${region.commonIssues[1] ?? "Hot water failures"} are another common issue across ${location.name} and ${theName}. We service, repair, and install all types of hot water systems including gas, electric, solar, and heat pump units — often same day.`,
    },
  ];

  return (
    <Layout>
      <SEOHead
        title={`Plumber ${location.name} | Emergency & Same-Day | Complete Flow Plumbing`}
        description={`Local plumber ${location.name}, ${regionDisplayName}. Blocked drains, hot water systems, gas fitting & emergency plumbing. No call-out fee. Licensed NSW plumbers. Call 0468 723 029 — we respond fast.`}
        canonical={`/locations/${location.slug}`}
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <LocationSchema location={location} />
      <FAQSchema faqs={localFAQs} />

      <Breadcrumbs
        items={[
          { name: "Locations", url: "/locations" },
          { name: regionDisplayName, url: `/locations/region/${location.region}` },
          { name: location.name, url: `/locations/${location.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 blur-3xl rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl">
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              {regionDisplayName} · NSW
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Plumber in {location.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              Professional, reliable plumbing services in {location.name}, {regionDisplayName}.
              Available 24/7 for emergencies with same-day service for most jobs.
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
                Licensed & Insured
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
                data-testid="location-hero-call"
              >
                <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call: {BUSINESS_INFO.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-6 py-3 font-semibold"
                data-testid="location-hero-quote"
              >
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 bg-emergency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <span className="font-semibold">Need a plumber in {location.name} now?</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="text-xl font-bold hover:underline flex items-center gap-2"
              data-testid="location-emergency-phone"
            >
              <Phone className="h-5 w-5" />
              Call: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Intro - Unique content for SEO */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                  Your Local Plumber
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                  Your Local Plumber in {location.name}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{suburbContent.intro}</p>
                  <p className="text-muted-foreground leading-relaxed">{suburbContent.localInfo}</p>
                  <h3 className="text-lg font-semibold text-foreground pt-2">
                    Plumbing Services in {location.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{suburbContent.services}</p>
                  <h3 className="text-lg font-semibold text-foreground pt-2">
                    Local Pipe & Drain Knowledge — {location.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{suburbContent.pipes}</p>
                </div>

                {/* Why Choose Us - Local trust signals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="flex items-center gap-3 bg-card rounded-xl2 border border-border shadow-card p-4">
                    <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-3 flex-shrink-0">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Licensed</p>
                      <p className="text-sm text-muted-foreground">NSW Lic. {BUSINESS_INFO.licence}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-card rounded-xl2 border border-border shadow-card p-4">
                    <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-3 flex-shrink-0">
                      <Clock className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Same-Day Service</p>
                      <p className="text-sm text-muted-foreground">Fast local response</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-card rounded-xl2 border border-border shadow-card p-4">
                    <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-3 flex-shrink-0">
                      <Users className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Local Team</p>
                      <p className="text-sm text-muted-foreground">{BUSINESS_INFO.guarantee}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Services - per-service icons from iconMap */}
              <div>
                <motion.h2
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6"
                >
                  Plumbing Services in {location.name}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.slice(0, 6).map((service, i) => {
                    const Icon = iconMap[service.icon] || Wrench;
                    return (
                      <motion.div
                        key={service.id}
                        custom={i}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                      >
                        <Link
                          href={`/services/${service.slug}`}
                          data-testid={`location-service-${service.slug}`}
                        >
                          <Card className="bg-card rounded-xl2 border border-border shadow-card group hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow transition-all p-4 h-full">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-3 flex-shrink-0">
                                <Icon className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {service.title}
                                </p>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {service.shortDescription}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="ring-1 ring-border hover:ring-primary text-foreground rounded-full px-6 py-3 font-semibold"
                  >
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </div>

              {/* Common Issues - region-specific */}
              <div>
                <motion.h2
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6"
                >
                  Common Plumbing Issues in {location.name} Homes
                </motion.h2>
                <div className="space-y-4">
                  {issueCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                      >
                        <Card className="bg-card rounded-xl2 border border-border shadow-card hover:border-primary/50 hover:shadow-glow transition-all p-6">
                          <div className="flex items-start gap-4">
                            <span className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-3 flex-shrink-0">
                              <Icon className="h-6 w-6" />
                            </span>
                            <div>
                              <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                              <p className="text-sm text-muted-foreground">{card.body}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <motion.h2
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6"
                >
                  Frequently Asked Questions
                </motion.h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {localFAQs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-card rounded-xl2 border border-border shadow-card px-6 data-[state=open]:border-primary/50"
                      data-testid={`location-faq-${index}`}
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Nearby Suburbs - real adjacent slugs from location.nearby */}
              {nearbySuburbs.length > 0 && (
                <div>
                  <motion.h2
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6"
                  >
                    Nearby Suburbs We Service
                  </motion.h2>
                  <div className="flex flex-wrap gap-3">
                    {nearbySuburbs.map((suburb, i) => (
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
                          data-testid={`nearby-${suburb.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border shadow-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary hover:shadow-glow transition-all"
                        >
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {suburb.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Contact */}
                <Card className="bg-card rounded-xl2 border border-border shadow-card p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Need a Plumber in {location.name}?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Call now for same-day service or emergency assistance.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
                    data-testid="location-sidebar-call"
                  >
                    <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      {BUSINESS_INFO.phone}
                    </a>
                  </Button>
                  <p className="text-center text-muted-foreground text-xs mt-3">
                    No call-out fee during business hours
                  </p>
                </Card>

                {/* Reviews CTA - truthful, no aggregate rating */}
                <Card className="bg-card rounded-xl2 border border-border shadow-card p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      Happy with our work?
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    See what local customers say, or leave us a review on Google.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full ring-1 ring-border hover:ring-primary text-foreground rounded-full px-6 py-3 font-semibold"
                    data-testid="location-google-reviews"
                  >
                    <a
                      href={BUSINESS_INFO.googleReviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See our Google reviews
                    </a>
                  </Button>
                </Card>

                {/* Quote Form */}
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
