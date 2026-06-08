import { HOME_FAQS, BUSINESS_INFO } from "@shared/schema";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-5">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers. If you can't find what you're
            looking for, give us a call any time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {HOME_FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card rounded-2xl border border-border/60 shadow-card px-6 transition-all hover:border-primary/40"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline py-6 gap-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions — call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground mb-5">
            Still have questions? Our team is here to help, 24/7.
          </p>
          <a
            href={`tel:${BUSINESS_INFO.phoneTel}`}
            data-testid="faq-call-cta"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition-all"
          >
            <Phone className="h-5 w-5" />
            Call {BUSINESS_INFO.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
