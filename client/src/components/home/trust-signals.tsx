import { motion } from "framer-motion";
import { ShieldCheck, Clock, Wallet, Award, ShieldAlert, Zap } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";

const promiseItems = [
  {
    icon: ShieldCheck,
    label: "Licensed NSW Plumber",
    description: `Licence No. ${BUSINESS_INFO.licence}`,
  },
  {
    icon: Clock,
    label: "24/7 Emergency",
    description: "Day or night, we answer",
  },
  {
    icon: Wallet,
    label: "No Call-Out Fee",
    description: "During business hours",
  },
  {
    icon: Award,
    label: "Workmanship Guarantee",
    description: BUSINESS_INFO.guarantee,
  },
  {
    icon: ShieldAlert,
    label: "Fully Insured",
    description: "Total peace of mind",
  },
  {
    icon: Zap,
    label: "Same-Day Service",
    description: "Fast local response",
  },
];

export function TrustSignals() {
  return (
    <section className="bg-card border-y border-border py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {promiseItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col items-center text-center"
              data-testid={`badge-trust-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3 mb-3">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-sm font-bold text-foreground leading-tight">
                {item.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
