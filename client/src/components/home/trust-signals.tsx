import { Shield, Award, Clock, CreditCard, Star, ThumbsUp } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Licensed & Insured", description: "Fully licensed NSW plumbers" },
  { icon: Clock, label: "24/7 Available", description: "Emergency service anytime" },
  { icon: Star, label: "5-Star Rated", description: "100+ Google reviews" },
  { icon: Award, label: "Guaranteed Work", description: "Workmanship guarantee" },
  { icon: CreditCard, label: "Upfront Pricing", description: "No hidden fees" },
  { icon: ThumbsUp, label: "No Call-Out Fee", description: "During business hours" },
];

export function TrustSignals() {
  return (
    <section className="py-8 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center"
              data-testid={`badge-trust-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
