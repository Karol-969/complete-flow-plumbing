import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SOUTHERN_HIGHLANDS_SUBURBS, SYDNEY_METRO_SUBURBS, BUSINESS_INFO } from "@shared/schema";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export function ServiceAreaMap() {
  const allSuburbs = [...SOUTHERN_HIGHLANDS_SUBURBS, ...SYDNEY_METRO_SUBURBS];
  
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4">Our Service Area</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Serving 60+ Suburbs Across Sydney & Southern Highlands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the Southern Highlands to greater Sydney, Complete Flow Plumbing provides 
            fast, reliable plumbing services to your local area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Southern Highlands</h3>
                <p className="text-sm text-muted-foreground">{SOUTHERN_HIGHLANDS_SUBURBS.length} suburbs serviced</p>
              </div>
            </div>
            
            <div className="relative h-64 mb-6 rounded-md overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20 border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {SOUTHERN_HIGHLANDS_SUBURBS.slice(0, 15).map((suburb, index) => {
                    const positions = [
                      { top: '20%', left: '30%' },
                      { top: '35%', left: '55%' },
                      { top: '25%', left: '70%' },
                      { top: '45%', left: '25%' },
                      { top: '50%', left: '45%' },
                      { top: '40%', left: '65%' },
                      { top: '60%', left: '35%' },
                      { top: '55%', left: '55%' },
                      { top: '65%', left: '75%' },
                      { top: '70%', left: '20%' },
                      { top: '75%', left: '50%' },
                      { top: '30%', left: '40%' },
                      { top: '80%', left: '65%' },
                      { top: '15%', left: '50%' },
                      { top: '85%', left: '40%' },
                    ];
                    const pos = positions[index % positions.length];
                    return (
                      <div 
                        key={suburb.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: pos.top, left: pos.left }}
                      >
                        <div className="flex flex-col items-center">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-xs text-foreground font-medium whitespace-nowrap bg-background/80 px-1 rounded">
                            {suburb.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {SOUTHERN_HIGHLANDS_SUBURBS.slice(0, 8).map((suburb) => (
                <Link 
                  key={suburb.id}
                  href={`/locations/${suburb.slug}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {suburb.name}
                </Link>
              ))}
              <Link 
                href="/locations"
                className="text-xs text-primary font-medium hover:underline"
              >
                +{SOUTHERN_HIGHLANDS_SUBURBS.length - 8} more
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                <MapPin className="h-5 w-5 text-background" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Sydney Metro</h3>
                <p className="text-sm text-muted-foreground">{SYDNEY_METRO_SUBURBS.length} suburbs serviced</p>
              </div>
            </div>
            
            <div className="relative h-64 mb-6 rounded-md overflow-hidden bg-gradient-to-br from-foreground/5 to-foreground/20 border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {SYDNEY_METRO_SUBURBS.slice(0, 12).map((suburb, index) => {
                    const positions = [
                      { top: '25%', left: '25%' },
                      { top: '30%', left: '50%' },
                      { top: '20%', left: '75%' },
                      { top: '45%', left: '30%' },
                      { top: '50%', left: '55%' },
                      { top: '40%', left: '70%' },
                      { top: '65%', left: '25%' },
                      { top: '60%', left: '50%' },
                      { top: '70%', left: '70%' },
                      { top: '80%', left: '35%' },
                      { top: '75%', left: '60%' },
                      { top: '35%', left: '40%' },
                    ];
                    const pos = positions[index % positions.length];
                    return (
                      <div 
                        key={suburb.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: pos.top, left: pos.left }}
                      >
                        <div className="flex flex-col items-center">
                          <MapPin className="h-4 w-4 text-foreground" />
                          <span className="text-xs text-foreground font-medium whitespace-nowrap bg-background/80 px-1 rounded">
                            {suburb.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {SYDNEY_METRO_SUBURBS.slice(0, 8).map((suburb) => (
                <Link 
                  key={suburb.id}
                  href={`/locations/${suburb.slug}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {suburb.name}
                </Link>
              ))}
              {SYDNEY_METRO_SUBURBS.length > 8 && (
                <Link 
                  href="/locations"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  +{SYDNEY_METRO_SUBURBS.length - 8} more
                </Link>
              )}
            </div>
          </Card>
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
