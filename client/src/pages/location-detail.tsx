import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "wouter";
import { QuoteForm } from "@/components/forms/quote-form";
import { SEOHead } from "@/components/seo/seo-head";
import { LocalBusinessSchema, LocationSchema, FAQSchema } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { 
  SOUTHERN_HIGHLANDS_SUBURBS, 
  SYDNEY_METRO_SUBURBS, 
  SERVICES, 
  BUSINESS_INFO,
  ALL_LOCATIONS,
  type FAQ,
  type Location
} from "@shared/schema";
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Siren,
  Wrench,
  Droplets,
  Flame,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const generateLocalFAQs = (suburbName: string, region: string): FAQ[] => [
  {
    question: `Do you provide emergency plumbing services in ${suburbName}?`,
    answer: `Yes! Complete Flow Plumbing offers 24/7 emergency plumbing services in ${suburbName} and surrounding areas. We aim to respond within 60 minutes for urgent calls. Our emergency plumbers are on standby around the clock, including weekends and public holidays.`,
  },
  {
    question: `How quickly can a plumber get to ${suburbName}?`,
    answer: `For standard appointments, we offer same-day service in ${suburbName}. For emergencies, we prioritize rapid response and typically arrive within 30-60 minutes. Being locally based in ${region === 'southern-highlands' ? 'the Southern Highlands' : 'Sydney'}, we can reach ${suburbName} quickly.`,
  },
  {
    question: `What plumbing services do you offer in ${suburbName}?`,
    answer: `We provide comprehensive plumbing services in ${suburbName} including: blocked drain clearing with CCTV inspection, hot water system repairs and installations (gas, electric, solar, heat pump), gas fitting and leak detection, toilet and tap repairs, pipe relining and replacement, bathroom renovations, and stormwater drainage solutions.`,
  },
  {
    question: `Do you charge a call-out fee in ${suburbName}?`,
    answer: `No call-out fee for standard service calls during business hours in ${suburbName}. Emergency after-hours calls may incur a small surcharge which we communicate upfront. We always provide a written quote before starting any work so there are no surprises.`,
  },
  {
    question: `Are your plumbers licensed to work in ${suburbName}?`,
    answer: `Absolutely. All our plumbers are fully licensed with NSW Fair Trading (Licence ${BUSINESS_INFO.licence}) and carry comprehensive public liability insurance. We're qualified to work throughout ${suburbName} and all of NSW.`,
  },
  {
    question: `What are common plumbing problems in ${suburbName} homes?`,
    answer: `Common issues we see in ${suburbName} include: blocked drains from tree roots (especially in older properties with clay pipes), hot water system failures during winter months, leaking taps and running toilets, burst pipes during temperature extremes, and stormwater drainage problems. ${region === 'southern-highlands' ? 'The cooler climate in the Southern Highlands can also lead to frozen pipes in winter.' : 'Sydney\'s clay soil can cause pipe movement and joint failures.'}`,
  },
  {
    question: `How much does a plumber cost in ${suburbName}?`,
    answer: `Plumbing costs vary depending on the job. Simple repairs like fixing a leaking tap typically start from $120, while more complex jobs are quoted individually. We offer free quotes for larger jobs and always provide upfront pricing before starting work.`,
  },
  {
    question: `Do you offer warranties on your work in ${suburbName}?`,
    answer: `Yes! All our workmanship comes with a lifetime guarantee. We also honor manufacturer warranties on all products we install. If something isn't right, we'll come back and fix it at no extra cost.`,
  },
];

const generateSuburbContent = (location: Location): { intro: string; localInfo: string; services: string; pipes: string } => {
  const regionName = location.region === 'southern-highlands' ? 'Southern Highlands' : 'Greater Sydney';
  const isSH = location.region === 'southern-highlands';

  const pipeType = isSH
    ? `Many ${location.name} homes, especially those built before the 1980s, have clay or terracotta sewer pipes that are susceptible to tree root intrusion and joint failure. Our CCTV drain inspection service identifies exactly what's happening inside your pipes before we recommend a solution.`
    : `${location.name} has a mix of older clay pipes and modern PVC systems depending on the era of construction. Sydney's clay soil creates ground movement that can cause pipe joints to separate over time, and native trees are notorious for root intrusion into sewer lines.`;

  const climateNote = isSH
    ? `The Southern Highlands climate, with its cooler winters and occasional frosts, creates unique challenges for ${location.name} plumbing. Pipe freezing and hot water system failures are more common here than in coastal Sydney, and our team is experienced with the specific issues that arise in a highland environment.`
    : `${location.name} residents experience Sydney's full range of plumbing demands — from summer storm overflows to winter hot water failures. Our team is familiar with the local infrastructure, council requirements, and Sydney Water regulations that apply to all plumbing work in ${location.name}.`;

  return {
    intro: `Looking for a trusted plumber in ${location.name}? Complete Flow Plumbing provides fast, reliable plumbing services throughout ${location.name} and the surrounding ${regionName} area. Our licensed NSW plumbers are available 24 hours a day, 7 days a week for plumbing emergencies, and offer same-day bookings for all standard plumbing work. We provide upfront written quotes, no call-out fees during business hours, and back every job with a lifetime workmanship guarantee.`,
    localInfo: `${climateNote} Whether you need an emergency plumber in ${location.name} at 2am, a blocked drain cleared before guests arrive, a hot water system replaced today, or a gas appliance installed safely — Complete Flow Plumbing is your local ${location.name} plumber. We service residential homes, rental properties, strata buildings, and small commercial premises throughout ${location.name}.`,
    services: `Our plumbers in ${location.name} handle the full range of residential and commercial plumbing: blocked drains and CCTV inspection, hot water system repairs and replacement (gas, electric, heat pump, solar), gas fitting and gas leak detection, leaking taps and burst pipes, toilet repairs and replacements, bathroom and kitchen plumbing, pipe relining, stormwater drainage, and more. If it involves water or gas pipes in ${location.name}, we do it.`,
    pipes: pipeType,
  };
};

export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const location = ALL_LOCATIONS.find(l => l.slug === slug);
  
  if (!location) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Location Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The location you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/locations">View All Locations</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const localFAQs = generateLocalFAQs(location.name, location.region);
  const suburbContent = generateSuburbContent(location);
  const regionDisplayName = location.region === 'southern-highlands' ? 'Southern Highlands' : 'Sydney';
  
  const allRegionSuburbs = location.region === "southern-highlands" 
    ? SOUTHERN_HIGHLANDS_SUBURBS 
    : SYDNEY_METRO_SUBURBS;
  const nearbySuburbs = allRegionSuburbs.filter(s => s.id !== location.id).slice(0, 6);

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
  ];

  return (
    <Layout>
      <SEOHead
        title={`Plumber ${location.name} | Emergency & Same-Day | Complete Flow Plumbing`}
        description={`Local plumber ${location.name}. Blocked drains, hot water systems, gas fitting & emergency plumbing. No call-out fee. Licensed NSW plumbers. Call 0468 723 029 — we respond fast.`}
        canonical={`/locations/${location.slug}`}
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <LocationSchema location={location} />
      <FAQSchema faqs={localFAQs} />
      
      <Breadcrumbs items={[
        { name: "Locations", url: "/locations" },
        { name: regionDisplayName, url: `/locations?region=${location.region}` },
        { name: location.name, url: `/locations/${location.slug}` }
      ]} />

      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plumber in {location.name}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            Professional, reliable plumbing services in {location.name}, {regionDisplayName}. 
            Available 24/7 for emergencies with same-day service for most jobs.
          </p>
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
              <CheckCircle className="h-4 w-4 mr-2" />
              Licensed & Insured
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-4 bg-emergency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <span className="font-semibold">Need a plumber in {location.name} now?</span>
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-xl font-bold hover:underline flex items-center gap-2"
              data-testid="location-emergency-phone"
            >
              <Phone className="h-5 w-5" />
              Call: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Your Local Plumber in {location.name}
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                  <p className="text-foreground/80 leading-relaxed">{suburbContent.intro}</p>
                  <p className="text-foreground/80 leading-relaxed">{suburbContent.localInfo}</p>
                  <h3 className="text-lg font-semibold text-foreground pt-2">
                    Plumbing Services in {location.name}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{suburbContent.services}</p>
                  <h3 className="text-lg font-semibold text-foreground pt-2">
                    Local Pipe & Drain Knowledge — {location.name}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{suburbContent.pipes}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <ShieldCheck className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Licensed</p>
                      <p className="text-sm text-muted-foreground">NSW Lic. {BUSINESS_INFO.licence}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Star className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">5-Star Rated</p>
                      <p className="text-sm text-muted-foreground">Google Reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Users className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Local Team</p>
                      <p className="text-sm text-muted-foreground">Fast Response</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Plumbing Services in {location.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.slice(0, 6).map((service) => (
                    <Link 
                      key={service.id}
                      href={`/services/${service.slug}`}
                      data-testid={`location-service-${service.slug}`}
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

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Common Plumbing Issues in {location.name} Homes
                </h2>
                <div className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                        <Droplets className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Blocked Drains</h3>
                        <p className="text-sm text-muted-foreground">
                          Tree roots, grease buildup, and debris are common causes of blocked 
                          drains in {location.name}. Our CCTV drain inspection and hydro jetting 
                          services can quickly diagnose and clear even the toughest blockages.
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                        <Flame className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Hot Water Problems</h3>
                        <p className="text-sm text-muted-foreground">
                          Cold showers are no fun, especially in {location.name}'s cooler months. 
                          We service, repair, and install all types of hot water systems including 
                          gas, electric, solar, and heat pump units.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

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

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Nearby Suburbs We Service
                </h2>
                <div className="flex flex-wrap gap-3">
                  {nearbySuburbs.map((suburb) => (
                    <Link 
                      key={suburb.id}
                      href={`/locations/${suburb.slug}`}
                      data-testid={`nearby-${suburb.slug}`}
                    >
                      <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                        <MapPin className="h-3 w-3 mr-1" />
                        {suburb.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card className="p-6 bg-primary text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">
                    Need a Plumber in {location.name}?
                  </h3>
                  <p className="text-primary-foreground/90 mb-6">
                    Call now for same-day service or emergency assistance.
                  </p>
                  <Button 
                    asChild 
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90"
                    data-testid="location-sidebar-call"
                  >
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center justify-center gap-2">
                      <Phone className="h-5 w-5" />
                      {BUSINESS_INFO.phone}
                    </a>
                  </Button>
                </Card>

                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
