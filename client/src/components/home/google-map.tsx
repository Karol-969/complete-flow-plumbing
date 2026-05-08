import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { MapPin, ExternalLink } from "lucide-react";

export function GoogleMap() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Us on Google Maps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We service Sydney and the Southern Highlands region. Find our location and get directions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <iframe
                src={BUSINESS_INFO.googleMapsUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Complete Flow Plumbing - Service Area Map"
                className="w-full"
                data-testid="google-map-embed"
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Service Areas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We proudly service all suburbs across Sydney and the Southern Highlands including Bowral, Mittagong, Moss Vale, and surrounding areas.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href={BUSINESS_INFO.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      data-testid="google-maps-link"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View on Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">24/7 Emergency Service</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Plumbing emergency? We're available around the clock across our entire service area.
              </p>
              <Button asChild variant="secondary" className="w-full">
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} data-testid="map-call-button">
                  Call {BUSINESS_INFO.phone}
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
