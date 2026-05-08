import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, FileText, Siren, Shield, Clock, Award } from "lucide-react";
import heroImage from "@assets/image_1766464585703.png";

export function Hero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
      </div>

      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <Badge className="bg-emergency text-emergency-foreground px-4 py-2 text-sm font-semibold animate-pulse">
          <Siren className="h-4 w-4 mr-2" />
          24/7 Emergency Available
        </Badge>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-primary">Emergency & Same-Day</span>
            <span className="block text-white">Plumber Sydney</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Fast, reliable plumbing services across Sydney and the Southern Highlands. 
            Licensed professionals available 24/7 for all your plumbing emergencies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg"
              data-testid="button-hero-call"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center justify-center gap-2" data-testid="link-hero-phone">
                <Phone className="h-5 w-5" />
                Call Now: {BUSINESS_INFO.phone}
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-lg bg-black/30 backdrop-blur-sm text-white border-2 border-primary/50"
              data-testid="button-hero-quote"
            >
              <Link href="/contact" className="flex items-center justify-center gap-2" data-testid="link-hero-contact">
                <FileText className="h-5 w-5" />
                Get Free Quote
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span className="text-sm font-medium">Workmanship Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
