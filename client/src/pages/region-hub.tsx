import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "wouter";
import { QuoteForm } from "@/components/forms/quote-form";
import { SEOHead } from "@/components/seo/seo-head";
import {
  LocalBusinessSchema,
  FAQSchema,
  BreadcrumbSchema,
} from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  REGIONS,
  SERVICES,
  BUSINESS_INFO,
  regionBySlug,
  locationsByRegion,
  type FAQ,
} from "@shared/schema";
import { useEffect } from "react";
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Siren,
  Wrench,
  ShieldCheck,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Generate region-specific FAQs from the region's local angle and common issues
const generateRegionFAQs = (
  displayName: string,
  localAngle: string,
  commonIssues: string[],
  suburbCount: number,
): FAQ[] => [
  {
    question: `Do you provide emergency plumbing across the ${displayName}?`,
    answer: `Yes. Complete Flow Plumbing offers 24/7 emergency plumbing throughout the ${displayName}, covering all ${suburbCount} suburbs and townships we list on this page. Our licensed plumbers are on call around the clock, including weekends and public holidays, and aim to respond fast to urgent burst pipes, blocked drains, and hot water failures.`,
  },
  {
    question: `Which ${displayName} suburbs do you cover?`,
    answer: `We service the entire ${displayName} region — all ${suburbCount} suburbs listed on this page and the surrounding areas. Wherever you are in the ${displayName}, you can tap your suburb above to see a dedicated local plumbing page, or simply call us and we'll dispatch a plumber to you.`,
  },
  {
    question: `What plumbing problems are most common in the ${displayName}?`,
    answer: `In the ${displayName} we regularly handle: ${commonIssues.join("; ")}. ${localAngle} Our team understands the local conditions and brings the right equipment for the job the first time.`,
  },
  {
    question: `Do you charge a call-out fee in the ${displayName}?`,
    answer: `No call-out fee for standard service calls during business hours anywhere in the ${displayName}. Emergency after-hours work may attract a small surcharge, which we always confirm with you upfront. Every job is quoted in writing before we start so there are no surprises.`,
  },
  {
    question: `Are your ${displayName} plumbers licensed and insured?`,
    answer: `Absolutely. All our plumbers are fully licensed with NSW Fair Trading (Licence ${BUSINESS_INFO.licence}) and carry comprehensive public liability insurance. We are qualified to work throughout the ${displayName} and all of NSW.`,
  },
  {
    question: `How quickly can a plumber reach me in the ${displayName}?`,
    answer: `For standard appointments we offer same-day service across the ${displayName}. For emergencies we prioritise rapid response and dispatch the nearest available plumber. Because we work locally across the region, we can reach most ${displayName} addresses quickly.`,
  },
];

export default function RegionHub() {
  const { regionSlug } = useParams<{ regionSlug: string }>();

  const region = regionBySlug(regionSlug ?? "");
  const suburbs = region ? locationsByRegion(region.slug) : [];

  // Redirect to the locations index when the region does not exist.
  useEffect(() => {
    if (regionSlug !== undefined && !region) {
      window.location.replace("/locations");
    }
  }, [regionSlug, region]);

  if (!region) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Region Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The service region you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/locations">View All Locations</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const localFAQs = generateRegionFAQs(
    region.displayName,
    region.localAngle,
    region.commonIssues,
    suburbs.length,
  );

  // The other five region hubs to cross-link to.
  const otherRegions = REGIONS.filter((r) => r.slug !== region.slug);

  // A unique paragraph built from the region's local angle and common issues.
  const localParagraph = `What sets plumbing in the ${region.displayName} apart? ${region.localAngle} That's why our local crews come prepared for the issues we see most often here: ${region.commonIssues
    .map((issue) => issue.charAt(0).toLowerCase() + issue.slice(1))
    .join(", ")}. From the first phone call to the final clean-up, you get a plumber who knows the ${region.displayName} and treats your home or business with respect.`;

  // SEO keywords for the region — combine the curated targetKeywords with broad region terms.
  const seoKeywords = [
    `plumber ${region.displayName}`,
    `plumber in ${region.displayName}`,
    `${region.displayName} plumber`,
    `emergency plumber ${region.displayName}`,
    `24/7 plumber ${region.displayName}`,
    `blocked drains ${region.displayName}`,
    `hot water ${region.displayName}`,
    `gas fitter ${region.displayName}`,
    `local plumber ${region.displayName}`,
    `same day plumber ${region.displayName}`,
    ...region.targetKeywords,
  ];

  // A Service node with areaServed AdministrativeArea covering the whole region.
  const regionServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Plumbing Services in the ${region.displayName}`,
    description: region.blurb,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: region.displayName,
      containedInPlace: {
        "@type": "State",
        name: "New South Wales",
        containedInPlace: {
          "@type": "Country",
          name: "Australia",
        },
      },
    },
    serviceType: "Plumbing Services",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Plumbing Services — ${region.displayName}`,
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.title} in the ${region.displayName}`,
          description: service.shortDescription,
        },
      })),
    },
  };

  const breadcrumbItems = [
    { name: "Locations", url: "/locations" },
    { name: region.displayName, url: `/locations/region/${region.slug}` },
  ];

  return (
    <Layout>
      <SEOHead
        title={`Plumber ${region.displayName} | Emergency & Same-Day | Complete Flow Plumbing`}
        description={region.blurb}
        canonical={`/locations/region/${region.slug}`}
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <RegionServiceJsonLd data={regionServiceSchema} slug={region.slug} />
      <FAQSchema faqs={localFAQs} />
      {/* Breadcrumbs renders its own BreadcrumbSchema, but we add an explicit
          node too so the structured data is present even if markup changes. */}
      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, ...breadcrumbItems]}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Local {region.displayName} Plumber
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-6">{region.blurb}</p>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Siren className="h-4 w-4 mr-2" />
              24/7 Emergency
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Same-Day Service
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              {suburbs.length} Suburbs Covered
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Licensed & Insured
            </Badge>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 bg-emergency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <span className="font-semibold">
              Need a plumber in the {region.displayName} now?
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-xl font-bold hover:underline flex items-center gap-2"
              data-testid="region-emergency-phone"
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
            <div className="lg:col-span-2 space-y-12">
              {/* Intro - blurb + unique local content */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Plumbing Across the {region.displayName}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                  <p className="text-foreground/80 leading-relaxed">
                    {region.blurb}
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    {localParagraph}
                  </p>
                </div>

                {/* Common issues for the region */}
                <h3 className="text-lg font-semibold text-foreground pt-6 mb-4">
                  Common Plumbing Issues in the {region.displayName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {region.commonIssues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg"
                      data-testid={`region-issue-${index}`}
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80">{issue}</p>
                    </div>
                  ))}
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Licensed</p>
                      <p className="text-sm text-muted-foreground">
                        NSW Lic. {BUSINESS_INFO.licence}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Star className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Same-Day Service
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Fast local response
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">
                        Local Team
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Fast Response
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suburb grid - all suburbs in the region */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Suburbs We Service in the {region.displayName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suburbs.map((suburb) => (
                    <Link
                      key={suburb.id}
                      href={`/locations/${suburb.slug}`}
                      data-testid={`region-suburb-${suburb.slug}`}
                    >
                      <Card className="p-4 hover-elevate group h-full">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                              Plumber in {suburb.name}
                            </p>
                            {suburb.postcode && (
                              <p className="text-sm text-muted-foreground">
                                {suburb.postcode}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Plumbing Services in the {region.displayName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      data-testid={`region-service-${service.slug}`}
                    >
                      <Card className="p-4 hover-elevate group">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 flex-shrink-0">
                            <Wrench className="h-5 w-5 text-primary" />
                          </div>
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
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline">
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {localFAQs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`faq-${index}`}
                      className="bg-card rounded-lg border border-border px-6"
                      data-testid={`region-faq-${index}`}
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

              {/* Cross-links to the other region hubs */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Other Regions We Service
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherRegions.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/locations/region/${other.slug}`}
                      data-testid={`region-link-${other.slug}`}
                    >
                      <Card className="p-5 hover-elevate group h-full">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              Plumber {other.displayName}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {other.blurb}
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Contact */}
                <Card className="p-6 bg-primary text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">
                    Need a Plumber in the {region.displayName}?
                  </h3>
                  <p className="text-primary-foreground/90 mb-6">
                    Call now for same-day service or emergency assistance
                    anywhere in the {region.displayName}.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90"
                    data-testid="region-sidebar-call"
                  >
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="flex items-center justify-center gap-2"
                    >
                      <Phone className="h-5 w-5" />
                      {BUSINESS_INFO.phone}
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

// Region-specific Service JSON-LD node. The shared ServiceSchema helper only
// emits a City/State areaServed, so this region hub injects its own Service
// node with an AdministrativeArea areaServed via the same JsonLd mechanism.
interface RegionServiceJsonLdProps {
  data: object;
  slug: string;
}

function RegionServiceJsonLd({ data, slug }: RegionServiceJsonLdProps) {
  const id = `region-service-schema-${slug}`;
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
    };
  }, [data, id]);

  return null;
}
