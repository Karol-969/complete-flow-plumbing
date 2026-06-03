import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import {
  Wallet,
  Award,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Zap,
  ExternalLink,
  Star,
} from "lucide-react";

const promiseItems = [
  {
    icon: Wallet,
    label: "Honest Upfront Pricing",
    description: "We tell you the price before we start.",
  },
  {
    icon: Award,
    label: "Workmanship Guarantee",
    description: BUSINESS_INFO.guarantee,
  },
  {
    icon: Clock,
    label: "24/7 Emergency Service",
    description: "Day or night, we answer the call.",
  },
  {
    icon: ShieldCheck,
    label: "Licensed NSW Experts",
    description: `Lic. ${BUSINESS_INFO.licence}`,
  },
  {
    icon: ShieldAlert,
    label: "Fully Insured",
    description: "Total peace of mind on every job.",
  },
  {
    icon: Zap,
    label: "Same-Day Service",
    description: "Fast local response when you need it.",
  },
];

export function PromiseReviews() {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            The Complete Flow Promise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* LEFT: 2x3 promise grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {promiseItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex flex-col bg-card rounded-xl2 border border-border shadow-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                data-testid={`promise-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="mb-4 inline-flex w-fit items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-foreground leading-tight">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: honest reviews card.
              NOTE: This is an honest stand-in for a live Google reviews widget.
              Once Complete Flow Plumbing has real Google reviews, drop a live
              reviews widget in here (it can read aggregate rating/count then).
              Until then we show NO star count or aggregate rating. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-xl2 border border-border shadow-card p-8 md:p-10 flex flex-col lg:h-full lg:justify-center"
            data-testid="card-reviews"
          >
            <span className="mb-5 inline-flex w-fit items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3">
              <Star className="h-7 w-7" />
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              Rated by local customers
            </h3>
            <p className="text-muted-foreground mb-8">
              We&apos;re building our Google review profile — see what customers
              say or leave us a review.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
              data-testid="button-reviews-google"
            >
              <a
                href={BUSINESS_INFO.googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
                data-testid="link-reviews-google"
              >
                <ExternalLink className="h-5 w-5" />
                See us on Google
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
