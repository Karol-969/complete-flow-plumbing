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
    label: "No Call-Out Fee",
    description: "Free quotes and honest upfront pricing — you know the cost before we start.",
  },
  {
    icon: Award,
    label: "Workmanship Guarantee",
    description: `Every job is backed by our ${BUSINESS_INFO.guarantee.toLowerCase()}.`,
  },
  {
    icon: Clock,
    label: "24/7 Emergency Service",
    description: "Day or night, a local plumber answers the call.",
  },
  {
    icon: ShieldCheck,
    label: "Licensed NSW Experts",
    description: `Fully licensed NSW plumbers — Lic. ${BUSINESS_INFO.licence}.`,
  },
  {
    icon: ShieldAlert,
    label: "Fully Insured",
    description: "Comprehensive cover for total peace of mind on every job.",
  },
  {
    icon: Zap,
    label: "Same-Day Service",
    description: "Fast local response when you need a plumber today.",
  },
];

export function PromiseReviews() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[42rem] max-w-full rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-20 max-w-2xl mx-auto"
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            The Complete Flow <span className="text-primary">Promise</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Locally owned, fully licensed and insured. Real plumbers who do the
            job right and stand behind every visit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {/* LEFT: 2x3 promise grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {promiseItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group flex flex-col bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                data-testid={`promise-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="mb-5 inline-flex w-fit items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3.5 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-foreground leading-tight">
                  {item.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="group bg-card rounded-2xl border border-border/60 shadow-card p-8 md:p-10 flex flex-col justify-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            data-testid="card-reviews"
          >
            <span className="mb-6 inline-flex w-fit items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 text-primary p-3.5 transition-colors group-hover:bg-primary/20">
              <Star className="h-7 w-7" />
            </span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              Rated by <span className="text-primary">local</span> customers
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We&apos;re building our Google review profile. See what local
              customers say, or leave us a review after your job.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
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
