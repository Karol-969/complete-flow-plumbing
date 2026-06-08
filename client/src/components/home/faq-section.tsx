import { HOME_FAQS, BUSINESS_INFO } from "@shared/schema";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Phone,
  Clock,
  Timer,
  Receipt,
  ShieldCheck,
  MapPin,
  Wallet,
  CreditCard,
  Award,
  HelpCircle,
  MessageCircleQuestion,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WebGLBackground } from "@/components/effects/webgl-background";

// A relevant icon per question, in the same order as HOME_FAQS. Falls back to
// a question mark if more FAQs are added later.
const FAQ_ICONS = [
  Clock, // 24/7 emergency
  Timer, // how quickly
  Receipt, // free quotes
  ShieldCheck, // licensed & insured
  MapPin, // areas serviced
  Wallet, // call-out fee
  CreditCard, // payment methods
  Award, // guarantees
];

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
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24, scale: 0.88 },
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
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 },
    },
  };

  const rowHover = reduce
    ? undefined
    : {
        y: -3,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      {/* Atmospheric sky glow behind the section — gently floats */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        animate={reduce ? undefined : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={
          reduce ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* LEFT: WebGL panel with the heading + call CTA (sticky on desktop) */}
          <motion.aside
            variants={v(fadeLeft)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a66c2] via-[#0a5598] to-[#063b66] p-8 md:p-10 text-white shadow-glow">
              {/* animated WebGL backdrop with graceful fallback */}
              <WebGLBackground className="opacity-40" />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#00d4ff]/20 blur-3xl"
              />

              <div className="relative">
                <motion.span
                  className="inline-flex items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 p-4 backdrop-blur mb-6"
                  animate={
                    reduce ? undefined : { y: [0, -8, 0], rotate: [0, -4, 0] }
                  }
                  transition={
                    reduce
                      ? undefined
                      : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <MessageCircleQuestion className="h-9 w-9 text-white" />
                </motion.span>

                <p className="text-[#9fe3ff] text-sm font-semibold tracking-widest uppercase mb-3">
                  FAQ
                </p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-white/85 leading-relaxed mb-8">
                  Everything you need to know about booking a local, licensed
                  plumber. Can&apos;t find your answer? We&apos;re a phone call
                  away, 24/7.
                </p>

                <motion.a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  data-testid="faq-call-cta"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0a66c2] rounded-full px-7 py-3.5 font-bold shadow-lg hover:bg-white/90 transition-all"
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                  transition={
                    reduce ? undefined : { type: "spring", stiffness: 400, damping: 17 }
                  }
                >
                  <Phone className="h-5 w-5" />
                  Call {BUSINESS_INFO.phone}
                </motion.a>
              </div>
            </div>
          </motion.aside>

          {/* RIGHT: icon-tagged accordion */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-3"
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {HOME_FAQS.map((faq, index) => {
                const Icon = FAQ_ICONS[index] ?? HelpCircle;
                return (
                  <motion.div
                    key={index}
                    variants={v(fadeRight)}
                    whileHover={rowHover}
                  >
                    <AccordionItem
                      value={`faq-${index}`}
                      className="group bg-card rounded-2xl border border-border/60 shadow-card px-5 md:px-6 transition-all hover:border-primary/40 hover:shadow-glow data-[state=open]:border-primary/50 data-[state=open]:shadow-glow"
                      data-testid={`faq-item-${index}`}
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline py-5 gap-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary [&[data-state=open]]:text-primary">
                        <span className="flex items-center gap-4">
                          <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span>{faq.question}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 pl-[3.75rem] pr-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
