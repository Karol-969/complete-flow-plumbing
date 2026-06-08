import { motion } from "framer-motion";
import { Clock, Wallet, ClipboardCheck, ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";

const FEATURES = [
  {
    icon: Clock,
    title: "Fast Same-Day Service",
    line: "Local plumbers, on the way today",
  },
  {
    icon: Wallet,
    title: "$0 Call-Out Fee",
    line: "No call-out fee during business hours",
  },
  {
    icon: ClipboardCheck,
    title: "Free Quotes, Upfront Pricing",
    line: "Know the price before we start",
  },
] as const;

export function FeatureCards() {
  return (
    <section
      className="relative bg-background py-20 md:py-28"
      data-testid="section-feature-cards"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow md:p-8"
              data-testid={`card-feature-${index}`}
            >
              <span className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3.5 text-primary ring-1 ring-primary/20">
                <feature.icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground">{feature.line}</p>
            </motion.article>
          ))}
        </div>

        {/* Slim trust line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-muted-foreground"
          data-testid="text-feature-trust"
        >
          <ShieldCheck className="h-4 w-4 text-primary" />
          Licensed NSW (Lic. {BUSINESS_INFO.licence}) · Fully Insured · 24/7
          Emergency
        </motion.p>
      </div>
    </section>
  );
}
