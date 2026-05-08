import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SOUTHERN_HIGHLANDS_SUBURBS, SYDNEY_METRO_SUBURBS } from "@shared/schema";
import { MapPin, CheckCircle, ArrowRight } from "lucide-react";

export function ServiceAreas() {
  const displaySuburbs = [...SOUTHERN_HIGHLANDS_SUBURBS.slice(0, 8), ...SYDNEY_METRO_SUBURBS.slice(0, 4)];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map placeholder */}
          <div className="relative bg-card rounded-lg border border-border overflow-hidden aspect-square lg:aspect-[4/3]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">Service Area Map</p>
                <p className="text-sm text-muted-foreground mt-2">
                  [UPLOAD IMAGE HERE: Map showing service areas across Sydney and Southern Highlands]
                </p>
              </div>
            </div>
          </div>

          {/* Suburbs list */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Areas We Service
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Providing expert plumbing services across the Southern Highlands and Greater Sydney. 
              Same-day service available in most areas.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {displaySuburbs.map((suburb) => (
                <Link 
                  key={suburb.id}
                  href={`/locations/${suburb.slug}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  data-testid={`suburb-link-${suburb.slug}`}
                >
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-sm">{suburb.name}</span>
                </Link>
              ))}
            </div>

            <Button asChild size="lg" data-testid="view-all-locations">
              <Link href="/locations">
                View All {SOUTHERN_HIGHLANDS_SUBURBS.length + SYDNEY_METRO_SUBURBS.length} Suburbs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
