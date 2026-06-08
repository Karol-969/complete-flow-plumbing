import { HOME_FAQS, BUSINESS_INFO } from "@shared/schema";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Springy overshoot — elements pop/bounce slightly as they reveal.
const POP_SPRING = { type: "spring" as const, stiffness: 240, damping: 15, mass: 0.7 };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: POP_SPRING },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24, scale: 0.88 },
  show: { opacity: 1, x: 0, scale: 1, transition: POP_SPRING },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function FAQSection() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, fall back to a plain opacity fade.
  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  const rowHover = reduce
    ? undefined
    : {
        y: -3,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      };

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header — gently floats */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        animate={
          reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
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
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {HOME_FAQS.map((faq, index) => (
              <motion.div key={index} variants={v(fadeLeft)} whileHover={rowHover}>
                <AccordionItem
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
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Still have questions — call CTA */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground mb-5">
            Still have questions? Our team is here to help, 24/7.
          </p>
          <motion.a
            href={`tel:${BUSINESS_INFO.phoneTel}`}
            data-testid="faq-call-cta"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition-all"
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.9 }}
            transition={reduce ? undefined : { type: "spring", stiffness: 400, damping: 17 }}
          >
            <Phone className="h-5 w-5" />
            Call {BUSINESS_INFO.phone}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
