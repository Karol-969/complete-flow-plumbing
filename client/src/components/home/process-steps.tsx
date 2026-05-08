import { Phone, Search, FileText, Wrench } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "1. Call Us",
    description: "Contact us 24/7 for emergency or standard plumbing needs",
  },
  {
    icon: Search,
    title: "2. Diagnose",
    description: "Our licensed plumber inspects and identifies the issue",
  },
  {
    icon: FileText,
    title: "3. Quote",
    description: "Receive an upfront, transparent quote before any work begins",
  },
  {
    icon: Wrench,
    title: "4. Fix",
    description: "We complete the work efficiently and clean up after ourselves",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, straightforward service from start to finish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative text-center"
              data-testid={`process-step-${index + 1}`}
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground mb-4">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
