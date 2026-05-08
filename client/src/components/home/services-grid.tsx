import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@shared/schema";
import { 
  Siren, 
  Droplets, 
  Flame, 
  Fuel, 
  Search, 
  Wrench, 
  Camera,
  Bath,
  ArrowRight
} from "lucide-react";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Siren,
  PipeSolid: Droplets,
  Droplets,
  Camera,
  Wrench,
  Flame,
  Fuel,
  Search,
  Bath,
};

export function ServicesGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Plumbing Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From emergency repairs to installations, we provide comprehensive plumbing 
            solutions for homes and businesses across Sydney.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            return (
              <Card 
                key={service.id} 
                className="p-6 hover-elevate transition-all duration-200 group"
                data-testid={`service-card-${service.slug}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" data-testid="button-view-all-services">
            <Link href="/services" data-testid="link-all-services">
              View All Services
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
