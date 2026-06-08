import { Layout } from "@/components/layout/layout";
import { QuoteForm } from "@/components/forms/quote-form";
import { BUSINESS_INFO } from "@shared/schema";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ownerPhoto from "@assets/cfp-owner.jpeg";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Siren,
  Star,
  Wallet,
  FileCheck,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// The 4-colour Google "G".
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

const POP = { type: "spring" as const, stiffness: 240, damping: 16, mass: 0.7 };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: POP },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: POP },
};
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: POP },
};

// Real, verifiable value props — no fabricated discounts or offers.
const trustItems = [
  { icon: Wallet, label: "No Call-Out Fee", sub: "On standard service calls" },
  { icon: FileCheck, label: "Free Upfront Quotes", sub: "Know the price first" },
  { icon: Zap, label: "Same-Day Service", sub: "Fast local response" },
  { icon: Clock, label: "24/7 Emergencies", sub: "Day or night, we answer" },
  {
    icon: ShieldCheck,
    label: "Licensed & Insured",
    sub: `NSW Lic. ${BUSINESS_INFO.licence}`,
  },
];

const heroBullets = [
  "No call-out fee on standard service calls",
  "Free, no-obligation upfront quotes",
  "Fully licensed & insured NSW plumbers",
];

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    primary: BUSINESS_INFO.phone,
    sub: "Available 24/7 for emergencies",
    href: `tel:${BUSINESS_INFO.phoneTel}`,
    testid: "contact-phone",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: BUSINESS_INFO.email,
    sub: "We reply within 24 hours",
    href: `mailto:${BUSINESS_INFO.email}`,
    testid: "contact-email",
  },
  {
    icon: MapPin,
    title: "Service Area",
    primary: BUSINESS_INFO.address,
    sub: "11 regions across greater Sydney, the Illawarra & Southern Highlands",
    href: undefined,
    testid: "contact-area",
  },
  {
    icon: Clock,
    title: "Service Hours",
    primary: BUSINESS_INFO.serviceHours,
    sub: "Emergency services around the clock",
    href: undefined,
    testid: "contact-hours",
  },
];

export default function Contact() {
  const reduce = useReducedMotion();

  return (
    <Layout>
      {/* ===== HERO with form ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a66c2] via-[#0a5598] to-[#063b66] py-16 md:py-24">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#00d4ff]/15 blur-3xl" />
        {/* dotted texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: pitch + trust */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="show"
              className="text-white"
            >
              <p className="text-[#9fe3ff] text-sm font-semibold tracking-widest uppercase mb-3">
                Get In Touch
              </p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5">
                Let&apos;s get your
                <br />
                plumbing <span className="text-[#7fe0ff]">sorted</span>.
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl mb-7">
                Book a free quote in under a minute, or call now for emergency
                help. A local, licensed plumber — not a call centre — picks up.
              </p>

              {/* Google rating + Call CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-lg font-bold text-[#0a66c2] shadow-lg transition hover:scale-[1.03] active:scale-95"
                  data-testid="hero-call"
                >
                  <Phone className="h-5 w-5" />
                  Call {BUSINESS_INFO.phone}
                </a>
                <a
                  href={BUSINESS_INFO.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
                  data-testid="hero-google-rating"
                >
                  <GoogleG className="h-7 w-7" />
                  <span className="flex flex-col leading-tight text-left">
                    <span className="flex items-center gap-1 font-bold">
                      {BUSINESS_INFO.googleRating}
                      <span className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                        ))}
                      </span>
                    </span>
                    <span className="text-xs text-white/80">
                      {BUSINESS_INFO.googleReviewCount} Google reviews
                    </span>
                  </span>
                </a>
              </div>

              <ul className="space-y-2.5">
                {heroBullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#7fe0ff]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: quote form card */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              className="relative"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-3xl bg-white/10 blur-xl"
              />
              <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <QuoteForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Emergency strip ===== */}
      <section className="py-4 bg-emergency">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Siren className="h-5 w-5" />
              <span className="font-semibold">Got a plumbing emergency?</span>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="text-xl font-bold hover:underline flex items-center gap-2"
              data-testid="emergency-phone"
            >
              <Phone className="h-5 w-5" />
              Call Now: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== Trust strip ===== */}
      <section className="bg-background border-b border-border/60 py-10 md:py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {trustItems.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -4 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <item.icon className="h-7 w-7" />
                </span>
                <span className="font-bold text-foreground text-sm md:text-base">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">{item.sub}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Contact cards ===== */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-primary/5">
        <div aria-hidden className="pointer-events-none absolute -top-16 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-[#00d4ff]/10 blur-3xl" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Contact Details
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Reach Us <span className="text-primary">Your Way</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {contactCards.map((card) => {
              const inner = (
                <>
                  <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a66c2] to-[#063b66] text-white shadow-lg">
                    <card.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="font-semibold text-primary break-words">
                    {card.primary}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {card.sub}
                  </p>
                </>
              );
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex flex-col bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-7 transition-colors hover:border-primary/40 hover:shadow-glow"
                  data-testid={card.testid}
                >
                  {card.href ? (
                    <a href={card.href} className="flex flex-col h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== Meet David ===== */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-primary/15 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
                <img
                  src={ownerPhoto}
                  alt="David Taha, owner of Complete Flow Plumbing"
                  className="w-full h-full object-cover aspect-[4/3]"
                  data-testid="owner-photo"
                />
              </div>
              {/* floating licence badge */}
              <div className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-border">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="text-sm font-bold text-foreground">
                  NSW Lic. {BUSINESS_INFO.licence}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                Meet The Owner
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-5">
                You&apos;re dealing with <span className="text-primary">David</span>,
                not a call centre
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                Complete Flow Plumbing is owned and run by David Taha, a fully
                licensed NSW plumber (Lic. {BUSINESS_INFO.licence}). David built
                Complete Flow around three simple things: honest upfront pricing,
                tidy workmanship, and genuine 24/7 availability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                When you call, you talk to the people who actually do the work —
                across the Southern Highlands, the Illawarra, the Sutherland
                Shire and right through to the Eastern Suburbs. No surprises, no
                pressure, just plumbing done right.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
                  data-testid="owner-call"
                >
                  <Phone className="h-5 w-5" />
                  Call {BUSINESS_INFO.phone}
                </a>
                <a
                  href={BUSINESS_INFO.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                  data-testid="owner-google"
                >
                  See our {BUSINESS_INFO.googleRating}★ Google reviews
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Service area map ===== */}
      <section className="relative">
        <div className="bg-foreground/5 py-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Where We Work
          </h2>
          <p className="text-muted-foreground mt-1">
            Proudly servicing 11 regions across greater Sydney, the Illawarra &amp;
            Southern Highlands
          </p>
        </div>
        <iframe
          src={BUSINESS_INFO.googleMapsUrl}
          title="Complete Flow Plumbing service area"
          className="w-full h-[28rem] border-0 grayscale-[15%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </Layout>
  );
}
