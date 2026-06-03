import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { REGIONS, locationsByRegion, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, CheckCircle, ArrowRight } from "lucide-react";

export default function Locations() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Areas We Service
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Complete Flow Plumbing proudly services Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra and the Southern Tablelands.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              data-testid="locations-call"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call: {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Region sections */}
      {REGIONS.map((region, index) => {
        const suburbs = locationsByRegion(region.slug);
        return (
          <section
            key={region.slug}
            className={`py-16 md:py-24 ${index % 2 === 0 ? "bg-background" : "bg-muted/50"}`}
            data-testid={`region-section-${region.slug}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <Link
                  href={`/locations/region/${region.slug}`}
                  className="inline-flex items-center gap-2 group"
                  data-testid={`region-hub-${region.slug}`}
                >
                  <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {region.displayName}
                  </h2>
                </Link>
                <p className="text-lg text-muted-foreground">
                  {region.blurb}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {suburbs.map((suburb) => (
                  <Link
                    key={suburb.id}
                    href={`/locations/${suburb.slug}`}
                    data-testid={`location-${suburb.slug}`}
                  >
                    <Card className="p-4 hover-elevate transition-all group">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          Plumber in {suburb.name}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Local Service, Professional Results
            </h2>
            <p className="text-muted-foreground">
              As a local plumbing company, we understand the unique needs of homes
              and businesses in each area we service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Fast response times in all service areas",
              "Knowledge of local plumbing systems and regulations",
              "Same-day service available for most suburbs",
              "24/7 emergency service throughout our coverage area",
              "Competitive pricing with no hidden fees",
              "Licensed, insured, and guaranteed work",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see your suburb listed? We may still be able to help!
            </p>
            <Button asChild size="lg" data-testid="locations-contact">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
