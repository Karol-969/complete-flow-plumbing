import { Layout } from "@/components/layout/layout";
import { Hero } from "@/components/home/hero";
import { FeatureCards } from "@/components/home/feature-cards";
import { ServicesGrid } from "@/components/home/services-grid";
import { HighlightCircles } from "@/components/home/highlight-circles";
import { MeetTheTeam } from "@/components/home/meet-the-team";
import { WorkGallery } from "@/components/home/work-gallery";
import { PromiseReviews } from "@/components/home/promise-reviews";
import { ServiceAreaMap } from "@/components/home/service-area-map";
import { GoogleReviews } from "@/components/home/google-reviews";
import { SeoContent } from "@/components/home/seo-content";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
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
        description="Complete Flow Plumbing proudly services the Southern Highlands, Wollondilly, Macarthur, the Sutherland Shire, St George, Bayside, the Eastern Suburbs, Wollongong & Illawarra, the Blue Mountains, Western Sydney, and Goulburn & the Southern Tablelands. 24/7 emergency plumbing, blocked drains, hot water & gas fitting. No call-out fee — call 0468 723 029."
        canonical="/"
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema faqs={HOME_FAQS} />

      <Hero />
      <FeatureCards />
      <ServicesGrid />
      <HighlightCircles />
      <MeetTheTeam />
      <WorkGallery />
      <PromiseReviews />
      <ServiceAreaMap />
      <GoogleReviews />
      <SeoContent />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
