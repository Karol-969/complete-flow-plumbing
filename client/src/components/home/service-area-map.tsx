import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { REGIONS, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export function ServiceAreaMap() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4">Our Service Area</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Serving the Southern Highlands, Illawarra & South Coast
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the Sutherland Shire down to the Southern Tablelands, Complete Flow Plumbing
            provides fast, reliable plumbing services across {REGIONS.length} regions.
          </p>
        </div>

        <Card className="p-2 sm:p-3 mb-12 bg-foreground/5 border-border overflow-hidden">
          <div className="relative w-full overflow-hidden rounded-md border border-border">
            <iframe
              title={`${BUSINESS_INFO.name} service area map`}
              src={BUSINESS_INFO.googleMapsUrl}
              className="w-full h-[320px] md:h-[420px] border-0 grayscale-[20%] contrast-[1.05]"
              style={{ filter: "invert(0)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              data-testid="service-area-google-map"
            />
          </div>
        </Card>

        <div className="mb-12">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">
            Regions We Service
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {REGIONS.map((region) => (
              <Link
                key={region.slug}
                href={`/locations/region/${region.slug}`}
                className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                data-testid={`region-chip-${region.slug}`}
              >
                <MapPin className="h-4 w-4 text-primary transition-colors group-hover:text-primary-foreground" />
                {region.displayName}
              </Link>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-primary text-primary-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Not Sure If We Service Your Area?</h3>
              <p className="text-primary-foreground/80">
                Give us a call and we'll let you know if we can help. We're expanding our service area regularly!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="secondary" data-testid="map-call-cta">
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {BUSINESS_INFO.phone}
                </a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/locations" className="flex items-center gap-2">
                  View All Areas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
