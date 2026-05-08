import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, Siren, Clock } from "lucide-react";

export function EmergencyBanner() {
  return (
    <section className="py-12 bg-emergency">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 flex-shrink-0">
              <Siren className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Plumbing Emergency?
              </h2>
              <p className="text-white/90 mt-1 flex items-center justify-center lg:justify-start gap-2">
                <Clock className="h-4 w-4" />
                We're available 24 hours a day, 7 days a week
              </p>
            </div>
          </div>

          <Button 
            asChild 
            size="lg"
            className="h-14 px-8 text-lg bg-white text-emergency hover:bg-white/90 font-bold"
            data-testid="button-emergency-call"
          >
            <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-2" data-testid="link-emergency-phone">
              <Phone className="h-5 w-5" />
              Call Now: {BUSINESS_INFO.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
