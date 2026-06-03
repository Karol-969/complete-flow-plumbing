import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, FileText, CheckCircle, ShieldCheck, Clock, BadgeCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import teamImage from "@assets/image_1766464585703.png";

const benefits = [
  { icon: Clock, label: "24/7 emergency call-outs — no call-out fee" },
  { icon: ShieldCheck, label: `Licensed NSW plumbers (Lic. ${BUSINESS_INFO.licence}) & fully insured` },
  { icon: MapPin, label: "Local & same-day service available" },
  { icon: BadgeCheck, label: BUSINESS_INFO.guarantee },
];

export function CTASection() {
  return (
    <section className="bg-background">
      {/* Main conversion band */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[44rem] h-[44rem] bg-primary/10 blur-3xl rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                Get It Sorted Today
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                Ready to Get Your Plumbing Sorted?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether it's a 2am burst pipe or a scheduled hot water swap, our team
                is ready. Call now for fast, reliable plumbing across the Highlands,
                Sydney and the Illawarra.
              </p>

              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.li
                      key={index}
                      className="flex items-center gap-4 text-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <span className="bg-primary/10 ring-1 ring-primary/20 text-primary rounded-xl p-2.5 shrink-0">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-medium">{benefit.label}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Button
                asChild
                size="lg"
                className="h-16 text-xl bg-primary text-primary-foreground rounded-full font-bold shadow-glow hover:brightness-110 transition"
                data-testid="button-cta-call"
              >
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="flex items-center justify-center gap-3"
                  data-testid="link-cta-phone"
                >
                  <Phone className="h-6 w-6" />
                  Call: {BUSINESS_INFO.phone}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-16 text-xl ring-1 ring-border hover:ring-primary text-foreground rounded-full font-semibold border-0 bg-transparent transition"
                data-testid="button-cta-quote"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3"
                  data-testid="link-cta-contact"
                >
                  <FileText className="h-6 w-6 text-primary" />
                  Request a Free Quote
                </Link>
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-1">
                Free, no-obligation quotes. We'll tell you the price before we start.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Honest sub-band: a real local plumber, not a call centre */}
      <motion.div
        className="relative border-t border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="bg-card rounded-xl2 border border-border shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[16rem] md:min-h-full">
              <img
                src={teamImage}
                alt="Complete Flow Plumbing on the job in the Southern Highlands"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-card/20 to-card/80 md:bg-gradient-to-l"
              />
            </div>

            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                Talk To a Plumber Now
              </p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                Speak to a real local plumber — not a call centre
              </h3>
              <p className="text-muted-foreground mb-6">
                When you call Complete Flow, you reach the team that actually does the
                work — licensed, insured and local. No scripts, no overseas queue, no
                call-out fee just to come and take a look.
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Honest, upfront advice from a qualified plumber</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>Available 24/7 for genuine plumbing emergencies</span>
                </li>
              </ul>

              <div>
                <Button
                  asChild
                  size="lg"
                  className="h-14 text-lg bg-emergency text-white rounded-full font-bold shadow-glow hover:brightness-110 transition w-full sm:w-auto"
                  data-testid="button-subband-call"
                >
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="flex items-center justify-center gap-3 px-8"
                    data-testid="link-subband-phone"
                  >
                    <Phone className="h-5 w-5" />
                    Call {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
