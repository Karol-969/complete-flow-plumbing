import { motion } from "framer-motion";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone } from "lucide-react";

export function CallBar() {
  return (
    <section
      className="bg-foreground/95 border-y border-border"
      data-testid="section-call-bar"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6"
      >
        <a
          href={`tel:${BUSINESS_INFO.phoneTel}`}
          className="group flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-background"
          data-testid="link-callbar-phone"
        >
          <span className="inline-flex items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/30 text-primary p-2.5">
            <Phone className="h-5 w-5" />
          </span>
          <span className="text-lg md:text-2xl font-bold tracking-tight">
            Call Now for Fast Assistance:{" "}
            <span className="text-primary group-hover:brightness-110 transition">
              {BUSINESS_INFO.phone}
            </span>
          </span>
        </a>
      </motion.div>
    </section>
  );
}
