import { Phone, Search, FileText, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Contact us 24/7 for emergency or standard plumbing needs.",
  },
  {
    icon: Search,
    title: "Diagnose",
    description: "Our licensed plumber inspects and identifies the issue.",
  },
  {
    icon: FileText,
    title: "Quote",
    description: "Receive an upfront, transparent quote before any work begins.",
  },
  {
    icon: Wrench,
    title: "Fix",
    description: "We complete the work efficiently and clean up after ourselves.",
  },
];

export function ProcessSteps() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Fast, Transparent Service in 4 Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, straightforward service from your first call to the final cleanup.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Dashed connector line spanning the steps (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-12 left-0 right-0 mx-[12.5%] border-t-2 border-dashed border-border"
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
              data-testid={`process-step-${index + 1}`}
            >
              <div className="relative z-10 flex flex-col items-center">
                {/* Big translucent sky numeral */}
                <span
                  aria-hidden="true"
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-extrabold leading-none text-primary/30 select-none"
                >
                  {index + 1}
                </span>

                {/* Icon tile (solid backdrop so the dashed connector doesn't show through) */}
                <div className="relative mb-5 rounded-xl bg-background p-1">
                  <div className="flex items-center justify-center bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
