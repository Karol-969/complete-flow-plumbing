import { Layout } from "@/components/layout/layout";
import { Hero } from "@/components/home/hero";
import { TrustSignals } from "@/components/home/trust-signals";
import { ServicesGrid } from "@/components/home/services-grid";
import { EmergencyBanner } from "@/components/home/emergency-banner";
import { ProcessSteps } from "@/components/home/process-steps";
import { Testimonials } from "@/components/home/testimonials";
import { ServiceAreas } from "@/components/home/service-areas";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { WorkGallery } from "@/components/home/work-gallery";
import { GoogleMap } from "@/components/home/google-map";
import { ServiceAreaMap } from "@/components/home/service-area-map";
import { SeoContent } from "@/components/home/seo-content";
import { SEOHead } from "@/components/seo/seo-head";
import { LocalBusinessSchema, ReviewSchema, FAQSchema, OrganizationSchema, WebsiteSchema } from "@/components/seo/structured-data";
import { TESTIMONIALS, HOME_FAQS } from "@shared/schema";

export default function Home() {
  const seoKeywords = [
    "plumber sydney",
    "emergency plumber sydney",
    "24/7 plumber sydney",
    "plumber southern highlands",
    "blocked drains sydney",
    "hot water system sydney",
    "gas plumber sydney",
    "leak detection sydney",
    "licensed plumber nsw",
    "local plumber near me",
    "plumber bowral",
    "plumber mittagong",
    "plumber moss vale",
    "plumber campbelltown",
    "plumber picton",
    "plumber camden",
    "blocked toilet sydney",
    "burst pipe emergency",
    "hot water repair",
    "gas leak plumber",
    "drain camera inspection",
    "pipe relining sydney",
    "hydro jetting blocked drain",
    "plumber reviews sydney",
    "affordable plumber sydney",
    "same day plumber",
  ];

  return (
    <Layout>
      <SEOHead
        title="Plumber Sydney | #1 Emergency & Same-Day Plumbing | Complete Flow Plumbing"
        description="Sydney's trusted local plumber. 24/7 emergency plumber, blocked drains, hot water systems, gas fitting & leak detection. Licensed NSW plumbers. No call-out fee. Call 0468 723 029 now!"
        canonical="/"
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <ReviewSchema reviews={TESTIMONIALS} />
      <FAQSchema faqs={HOME_FAQS} />
      
      <Hero />
      <TrustSignals />
      <ServicesGrid />
      <EmergencyBanner />
      <ProcessSteps />
      <WorkGallery />
      <ServiceAreaMap />
      <GoogleMap />
      <Testimonials />
      <FAQSection />
      <SeoContent />
      <CTASection />
    </Layout>
  );
}
