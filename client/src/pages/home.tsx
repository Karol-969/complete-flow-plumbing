import { Layout } from "@/components/layout/layout";
import { Hero } from "@/components/home/hero";
import { TrustSignals } from "@/components/home/trust-signals";
import { ServicesGrid } from "@/components/home/services-grid";
import { EmergencyBanner } from "@/components/home/emergency-banner";
import { ProcessSteps } from "@/components/home/process-steps";
import { Testimonials } from "@/components/home/testimonials";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { WorkGallery } from "@/components/home/work-gallery";
import { ServiceAreaMap } from "@/components/home/service-area-map";
import { SeoContent } from "@/components/home/seo-content";
import { SEOHead } from "@/components/seo/seo-head";
import { LocalBusinessSchema, FAQSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo/structured-data";
import { HOME_FAQS } from "@shared/schema";

export default function Home() {
  const seoKeywords = [
    "plumber sutherland shire",
    "emergency plumber cronulla",
    "plumber wollongong",
    "emergency plumber wollongong",
    "plumber southern highlands",
    "plumber bowral",
    "plumber illawarra",
    "plumber shellharbour",
    "plumber wollondilly",
    "plumber picton",
    "plumber goulburn",
    "blocked drains",
    "hot water systems",
    "gas fitter nsw",
    "leak detection",
    "burst pipe emergency",
    "pipe relining",
    "licensed plumber nsw",
    "local plumber near me",
    "same day plumber",
    "24/7 emergency plumber",
  ];

  return (
    <Layout>
      <SEOHead
        title="Plumber Sutherland Shire to Southern Highlands | Complete Flow Plumbing"
        description="Licensed local plumbers servicing Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra & the Southern Tablelands. 24/7 emergency plumbing, blocked drains, hot water & gas fitting. No call-out fee — call 0468 723 029."
        canonical="/"
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema faqs={HOME_FAQS} />
      
      <Hero />
      <TrustSignals />
      <ServicesGrid />
      <EmergencyBanner />
      <ProcessSteps />
      <WorkGallery />
      <ServiceAreaMap />
      <Testimonials />
      <FAQSection />
      <SeoContent />
      <CTASection />
    </Layout>
  );
}
