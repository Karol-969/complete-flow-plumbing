import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SERVICES, BUSINESS_INFO } from "@shared/schema";
import { 
  ArrowRight, 
  Phone, 
  Siren, 
  Droplets, 
  Flame, 
  Fuel, 
  Search, 
  Wrench, 
  Camera,
  Bath
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

const serviceCategories = [
  {
    title: "Emergency Services",
    description: "Available 24/7 for urgent plumbing emergencies",
    services: SERVICES.filter(s => s.category === "emergency"),
    color: "emergency",
  },
  {
    title: "Drainage & Sewer",
    description: "Expert solutions for blocked drains and sewer issues",
    services: SERVICES.filter(s => s.category === "drainage"),
    color: "primary",
  },
  {
    title: "Hot Water Systems",
    description: "Installation, repair, and replacement services",
    services: SERVICES.filter(s => s.category === "hot-water"),
    color: "primary",
  },
  {
    title: "Gas Fitting",
    description: "Licensed gas fitting and plumbing services",
    services: SERVICES.filter(s => s.category === "gas"),
    color: "primary",
  },
  {
    title: "Leak Detection",
    description: "Find and fix hidden leaks before they cause damage",
    services: SERVICES.filter(s => s.category === "leak-detection"),
    color: "primary",
  },
  {
    title: "General Plumbing",
    description: "Everyday plumbing repairs, maintenance and installations",
    services: SERVICES.filter(s => s.category === "general"),
    color: "primary",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Plumbing Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              From emergency repairs to new installations, Complete Flow Plumbing 
              offers a comprehensive range of professional plumbing services for 
              homes and businesses.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              data-testid="services-emergency-call"
            >
              <a href={`tel:${BUSINESS_INFO.phoneTel}`} className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency? Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {serviceCategories.map((category, catIndex) => (
              <div key={catIndex} data-testid={`service-category-${catIndex}`}>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service) => {
                    const IconComponent = iconMap[service.icon] || Wrench;
                    return (
                      <Card 
                        key={service.id} 
                        className="p-6 hover-elevate group"
                        data-testid={`service-card-${service.slug}`}
                      >
                        <div className={`flex items-center justify-center w-14 h-14 rounded-md mb-4 ${
                          category.color === "emergency" 
                            ? "bg-emergency/10" 
                            : "bg-primary/10"
                        } group-hover:${
                          category.color === "emergency" 
                            ? "bg-emergency/20" 
                            : "bg-primary/20"
                        } transition-colors`}>
                          <IconComponent className={`h-7 w-7 ${
                            category.color === "emergency" 
                              ? "text-emergency" 
                              : "text-primary"
                          }`} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need a Plumber?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact us today for a free quote or call now for emergency assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" data-testid="services-get-quote">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" data-testid="services-call">
              <a href={`tel:${BUSINESS_INFO.phoneTel}`}>
                <Phone className="h-5 w-5 mr-2" />
                {BUSINESS_INFO.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
