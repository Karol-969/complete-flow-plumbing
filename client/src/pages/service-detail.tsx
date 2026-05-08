import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "wouter";
import { QuoteForm } from "@/components/forms/quote-form";
import { SEOHead } from "@/components/seo/seo-head";
import { LocalBusinessSchema, ServiceSchema, FAQSchema } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SERVICES, BUSINESS_INFO, SOUTHERN_HIGHLANDS_SUBURBS, type FAQ } from "@shared/schema";
import { 
  Phone, 
  CheckCircle, 
  Clock, 
  Shield,
  Award,
  Wrench,
  ArrowRight,
  MapPin
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Generate service-specific FAQs
const generateServiceFAQs = (serviceTitle: string): FAQ[] => [
  {
    question: `How much does ${serviceTitle.toLowerCase()} cost?`,
    answer: `The cost of ${serviceTitle.toLowerCase()} varies depending on the complexity of the job. We provide free, upfront quotes before any work begins so you know exactly what to expect. Contact us for a no-obligation quote.`,
  },
  {
    question: `How quickly can you provide ${serviceTitle.toLowerCase()}?`,
    answer: `We offer same-day service for most ${serviceTitle.toLowerCase()} jobs. For emergencies, we prioritize rapid response and aim to arrive within 60 minutes.`,
  },
  {
    question: `Do you guarantee your ${serviceTitle.toLowerCase()} work?`,
    answer: `Yes, all our ${serviceTitle.toLowerCase()} work comes with a comprehensive workmanship guarantee. We stand behind the quality of our work and will return to fix any issues at no additional cost within the guarantee period.`,
  },
  {
    question: `Are your plumbers licensed for ${serviceTitle.toLowerCase()}?`,
    answer: `Absolutely. All our plumbers are fully licensed with NSW Fair Trading and carry comprehensive insurance. We're qualified to perform ${serviceTitle.toLowerCase()} and all related plumbing work.`,
  },
];

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const service = SERVICES.find(s => s.slug === slug);
  
  if (!service) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The service you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const serviceFAQs = generateServiceFAQs(service.title);
  const relatedServices = SERVICES.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);
  const featuredSuburbs = SOUTHERN_HIGHLANDS_SUBURBS.slice(0, 8);

  const processSteps = [
    { title: "Call Us", description: "Contact us to describe your issue" },
    { title: "Inspection", description: "We diagnose the problem on-site" },
    { title: "Quote", description: "Receive an upfront, fixed price" },
    { title: "Repair", description: "We complete the work professionally" },
  ];

  // SEO keywords for this service
  const seoKeywords = [
    `${service.title.toLowerCase()} sydney`,
    `${service.title.toLowerCase()} southern highlands`,
    `${service.title.toLowerCase()} near me`,
    `${service.title.toLowerCase()} cost`,
    `${service.title.toLowerCase()} service`,
    `emergency ${service.title.toLowerCase()}`,
    `24/7 ${service.title.toLowerCase()}`,
    `licensed ${service.title.toLowerCase()}`,
  ];

  return (
    <Layout>
      <SEOHead
        title={`${service.title} Sydney | Licensed Same-Day | Complete Flow Plumbing`}
        description={`${service.shortDescription} Trusted ${service.title.toLowerCase()} in Sydney & Southern Highlands. No call-out fee, upfront pricing, 60-min emergency response. Call 0468 723 029.`}
        canonical={`/services/${service.slug}`}
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <ServiceSchema service={service} />
      <FAQSchema faqs={serviceFAQs} />
      
      <Breadcrumbs items={[
        { name: "Services", url: "/services" },
        { name: service.title, url: `/services/${service.slug}` }
      ]} />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mb-6">
            {service.shortDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Same-Day Service
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Licensed & Insured
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Workmanship Guarantee
            </Badge>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-4 bg-emergency">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <span className="font-semibold">Need urgent {service.title.toLowerCase()}?</span>
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-xl font-bold hover:underline flex items-center gap-2"
              data-testid="service-emergency-phone"
            >
              <Phone className="h-5 w-5" />
              Call Now: {BUSINESS_INFO.phone}
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
              {/* About Service */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  About Our {service.title} Service
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    At Complete Flow Plumbing, we provide professional {service.title.toLowerCase()} 
                    services to homes and businesses across Sydney and the Southern Highlands. 
                    Our licensed plumbers use the latest equipment and techniques to deliver 
                    fast, effective solutions.
                  </p>
                  <p>
                    Whether you're dealing with an emergency situation or need routine 
                    maintenance, our team is ready to help. We offer upfront pricing, 
                    same-day service, and a workmanship guarantee on all our work.
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Why Choose Complete Flow for {service.title}?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "24/7 emergency availability",
                    "Upfront, transparent pricing",
                    "Licensed and insured plumbers",
                    "Same-day service available",
                    "Modern equipment and techniques",
                    "Comprehensive workmanship guarantee",
                    "Clean, professional service",
                    "Locally owned and operated",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Our Service Process
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {processSteps.map((step, index) => (
                    <Card key={index} className="p-4 text-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground mx-auto mb-3 font-bold">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {serviceFAQs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="bg-card rounded-lg border border-border px-6"
                      data-testid={`service-faq-${index}`}
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

              {/* Service Areas */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {service.title} in Your Area
                </h2>
                <p className="text-muted-foreground mb-4">
                  We provide {service.title.toLowerCase()} services across Sydney and the Southern Highlands, including:
                </p>
                <div className="flex flex-wrap gap-3">
                  {featuredSuburbs.map((suburb) => (
                    <Link key={suburb.id} href={`/locations/${suburb.slug}`}>
                      <Badge variant="secondary" className="px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <MapPin className="h-3 w-3 mr-1" />
                        {suburb.name}
                      </Badge>
                    </Link>
                  ))}
                  <Link href="/locations">
                    <Badge variant="outline" className="px-3 py-1">
                      View All Areas
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Badge>
                  </Link>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Related Services
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedServices.map((relService) => (
                      <Link key={relService.id} href={`/services/${relService.slug}`}>
                        <Card className="p-4 hover-elevate group">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 flex-shrink-0">
                              <Wrench className="h-5 w-5 text-primary" />
                            </div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                              {relService.title}
                            </p>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Contact */}
                <Card className="p-6 bg-primary text-primary-foreground">
                  <h3 className="text-xl font-bold mb-4">
                    Get {service.title} Today
                  </h3>
                  <p className="text-primary-foreground/90 mb-6">
                    Call now for same-day service or a free quote.
                  </p>
                  <Button 
                    asChild 
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90"
                    data-testid="service-sidebar-call"
                  >
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center justify-center gap-2">
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
