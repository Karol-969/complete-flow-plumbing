import { Layout } from "@/components/layout/layout";
import { HeroFullBleed } from "@/components/home/hero-fullbleed";
import { TrustBand } from "@/components/home/trust-band";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { HowItWorks } from "@/components/home/how-it-works";
import { WorkGallery } from "@/components/home/work-gallery";
import { ServiceAreaMap } from "@/components/home/service-area-map";
import { GoogleReviews } from "@/components/home/google-reviews";
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
        title="Local Plumber | Southern Highlands & South Coast | Complete Flow Plumbing"
        description="Your local plumber for the Southern Highlands and South Coast, including Bowral, Picton, Wollongong, Nowra and Goulburn. Emergency plumbing, blocked drains, hot water and general plumbing. No call-out fee — call 0468 723 029."
        canonical="/"
        keywords={seoKeywords}
      />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <WebsiteSchema />
      <FAQSchema faqs={HOME_FAQS} />

      <HeroFullBleed />
      <TrustBand />
      <HowItWorks />
      <ServicesShowcase />
      <WorkGallery />
      <ServiceAreaMap />
      <GoogleReviews />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
