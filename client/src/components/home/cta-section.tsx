import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, FileText, CheckCircle } from "lucide-react";

const benefits = [
  "Free quotes with no obligation",
  "Licensed & fully insured plumbers",
  "Same-day service available",
  "Upfront, transparent pricing",
];

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Your Plumbing Sorted?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Whether it's an emergency or a scheduled service, our team is ready to help. 
              Contact us now for fast, reliable plumbing solutions.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle className="h-5 w-5 text-white/80 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Button 
              asChild 
              size="lg"
              className="h-16 text-xl bg-white text-primary hover:bg-white/90 font-bold"
              data-testid="button-cta-call"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center justify-center gap-3" data-testid="link-cta-phone">
                <Phone className="h-6 w-6" />
                Call: {BUSINESS_INFO.phone}
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size="lg"
              className="h-16 text-xl bg-transparent text-white border-2 border-white/50 hover:bg-white/10"
              data-testid="button-cta-quote"
            >
              <Link href="/contact" className="flex items-center justify-center gap-3" data-testid="link-cta-contact">
                <FileText className="h-6 w-6" />
                Request a Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
