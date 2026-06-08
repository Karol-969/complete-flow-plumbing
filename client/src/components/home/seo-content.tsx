import { Link } from "wouter";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BUSINESS_INFO, SERVICES } from "@shared/schema";
import { Phone, Siren, ExternalLink, ArrowRight, ChevronRight } from "lucide-react";

const phoneTel = BUSINESS_INFO.phoneTel;

const EASE = [0.22, 1, 0.36, 1] as const;

// Springy "pop" transition — overshoots slightly so elements bounce in.
const POP_SPRING = { type: "spring", stiffness: 240, damping: 15, mass: 0.7 } as const;
// Snappy bounce for interactive taps/hovers.
const TAP_SPRING = { type: "spring", stiffness: 400, damping: 17 } as const;

const WHY_US = [
  {
    title: "Licensed NSW Plumbers",
    desc: `All plumbers hold a current NSW Fair Trading licence (${BUSINESS_INFO.licence}). Verify any plumber before they enter your home.`,
  },
  {
    title: "Upfront Pricing",
    desc: "You receive a written quote before work starts. The price you're quoted is the price you pay — no surprise charges, and no call-out fee during business hours.",
  },
  {
    title: "24/7 Emergency Response",
    desc: "For genuine plumbing emergencies across all 11 regions we service, we respond fast — day or night. Our vans are stocked with common parts for same-visit repairs.",
  },
  {
    title: BUSINESS_INFO.guarantee,
    desc: "We stand behind every job. If our workmanship causes a problem, we return and put it right.",
  },
  {
    title: "Fully Insured & Code Compliant",
    desc: "All work meets Sydney Water and NSW plumbing code requirements, and we handle the required compliance certificates.",
  },
  {
    title: "CCTV Camera Technology",
    desc: "We use drain cameras on every drain job to identify the real cause — not just clear the symptom. You see exactly what we see.",
  },
];

const SUBURB_LINKS = [
  "Plumber Cronulla", "Plumber Miranda", "Plumber Caringbah",
  "Plumber Menai", "Plumber Picton", "Plumber Tahmoor",
  "Plumber Appin", "Plumber Wilton", "Plumber Bowral",
  "Plumber Mittagong", "Plumber Moss Vale", "Plumber Berrima",
  "Plumber Wollongong", "Plumber Corrimal", "Plumber Thirroul",
  "Plumber Dapto", "Plumber Shellharbour", "Plumber Albion Park",
  "Plumber Kiama", "Plumber Oak Flats", "Plumber Goulburn",
  "Plumber Marulan", "Plumber Crookwell", "Plumber Yass",
];

const SERVICE_AREAS = [
  { name: "Sutherland Shire", sub: "Cronulla, Miranda, Menai" },
  { name: "Wollondilly", sub: "Picton, Tahmoor, Appin" },
  { name: "Southern Highlands", sub: "Bowral, Mittagong, Moss Vale" },
  { name: "Wollongong", sub: "Wollongong, Corrimal, Dapto" },
  { name: "Illawarra", sub: "Shellharbour, Albion Park, Kiama" },
  { name: "Southern Tablelands", sub: "Goulburn, Marulan, Crookwell" },
];

const SERVICE_COLUMNS = [
  {
    title: "Emergency Plumber",
    href: "/services/emergency-plumbing",
    desc: "24/7 emergency plumbing across all 11 regions. Burst pipes, flooding, sewage overflow — we respond fast. No call-out fee during business hours, every day including public holidays.",
  },
  {
    title: "Blocked Drains",
    href: "/services/blocked-drains",
    desc: "CCTV drain camera inspection to find the exact cause, followed by hydro jet clearing. We fix the root cause — not just the symptom. Tree-root intrusion specialists for older and heritage suburbs.",
  },
  {
    title: "Hot Water Systems",
    href: "/services/hot-water-systems",
    desc: "Same-day hot water repairs and replacements. Gas continuous flow, electric storage, heat pump, and solar hot water. All brands serviced.",
  },
  {
    title: "Gas Plumber",
    href: "/services/gas-fitting",
    desc: "Licensed gas plumbers for all gas fitting, gas leak detection, gas appliance installation, and gas line repairs across all 11 regions. Certificate of Compliance provided on every job.",
  },
  {
    title: "Pipe Relining",
    href: "/services/pipe-relining",
    desc: "No-dig pipe relining repairs damaged sewer and drain pipes from the inside. No excavation, no disruption to gardens or driveways. Ideal for older clay pipe systems.",
  },
  {
    title: "Leak Detection",
    href: "/services/leak-detection",
    desc: "Advanced electronic leak detection finds hidden water leaks in walls, slabs, and underground pipes without destructive searching. Stop water damage before it becomes a major repair.",
  },
];

export function SeoContent() {
  const reduce = useReducedMotion();

  // When reduced motion is requested, every reveal collapses to a plain fade
  // (no scale / offset) and pop springs are disabled.
  const popTransition = reduce ? { duration: 0.6, ease: EASE } : POP_SPRING;
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.88 },
    show: { opacity: 1, y: 0, scale: 1, transition: popTransition },
  };
  const fadeLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -24, scale: reduce ? 1 : 0.88 },
    show: { opacity: 1, x: 0, scale: 1, transition: popTransition },
  };
  const fadeRight: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : 24, scale: reduce ? 1 : 0.88 },
    show: { opacity: 1, x: 0, scale: 1, transition: popTransition },
  };
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const tightContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };

  const hoverCard = reduce
    ? undefined
    : { y: -6, scale: 1.03, transition: { type: "spring" as const, stiffness: 300, damping: 20 } };
  const hoverTap = {
    whileHover: reduce ? undefined : { scale: 1.05 },
    whileTap: reduce ? undefined : { scale: 0.9 },
    transition: TAP_SPRING,
  };

  return (
    <section className="py-20 md:py-28 bg-background border-t border-border/60">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Main prose column — slides in from the left */}
          <motion.div
            className="lg:col-span-2 space-y-14"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Lead block — staggered prose */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
                variants={fadeUp}
              >
                Your Local Plumber
              </motion.p>
              <motion.h2
                className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
                variants={fadeUp}
              >
                Trusted Across 11 Regions — Serving{" "}
                <span className="text-primary">90+ Suburbs</span>
              </motion.h2>
              <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-sky-400 prose-a:no-underline hover:prose-a:text-sky-300 hover:prose-a:underline prose-strong:text-foreground">
                <motion.p className="!text-lg !leading-relaxed" variants={fadeUp}>
                  {BUSINESS_INFO.name} proudly services the Southern Highlands, Wollondilly,
                  Macarthur, the Sutherland Shire, St George, Bayside, the Eastern Suburbs,
                  Wollongong &amp; Illawarra, the Blue Mountains, Western Sydney, and Goulburn
                  &amp; the Southern Tablelands.
                  Whether you need an emergency plumber in Cronulla at 2am, a blocked drain
                  cleared in Picton, a hot water system replaced in Wollongong, or gas
                  fitting in Bowral — our team responds fast, quotes upfront, and backs
                  every job with a {BUSINESS_INFO.guarantee.toLowerCase()}.
                </motion.p>
                <motion.p variants={fadeUp}>
                  As a local plumber with deep roots across these communities, we understand
                  the specific plumbing challenges our region faces: salt-air corrosion on
                  the coast, ageing clay and cast-iron pipes in heritage homes, tree-root
                  intrusions, septic and rainwater systems on rural acreage, and the wear
                  that temperature extremes put on hot water systems.
                </motion.p>
              </div>
            </motion.div>

            {/* Services */}
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                Complete Plumbing Services Across All 11 Regions
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {SERVICE_COLUMNS.map((svc, index) => (
                  <motion.div
                    key={svc.href}
                    className="bg-card rounded-2xl border border-border/60 shadow-card p-6 transition-all hover:border-primary/40 hover:shadow-glow"
                    /* Alternate the card entry direction for visual interest */
                    variants={index % 2 === 0 ? fadeLeft : fadeRight}
                    whileHover={hoverCard}
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      <Link
                        href={svc.href}
                        className="hover:text-primary transition-colors"
                      >
                        {svc.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {svc.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Why choose us */}
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                Why Local Homeowners Choose {BUSINESS_INFO.name}
              </motion.h2>
              <motion.div
                className="space-y-5"
                variants={tightContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                {WHY_US.map((item) => (
                  <motion.div key={item.title} className="flex gap-4" variants={fadeUp}>
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 text-primary text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <span className="font-semibold text-foreground">{item.title}: </span>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Suburb links */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4"
                variants={fadeUp}
              >
                Plumbing Services Across Our 11 Regions — All Suburbs
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-sm mb-6 max-w-prose leading-relaxed"
                variants={fadeUp}
              >
                We service suburbs and towns across the Southern Highlands, Wollondilly,
                Macarthur, the Sutherland Shire, St George, Bayside, the Eastern Suburbs,
                Wollongong &amp; Illawarra, the Blue Mountains, Western Sydney, and Goulburn
                &amp; the Southern Tablelands:
              </motion.p>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-muted-foreground"
                variants={tightContainer}
              >
                {SUBURB_LINKS.map((loc) => {
                  const suburb = loc
                    .replace("Plumber ", "")
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <motion.div key={loc} variants={fadeUp}>
                      <Link
                        href={`/locations/${suburb}`}
                        className="hover:text-primary transition-colors py-0.5"
                      >
                        {loc}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
              <motion.div variants={fadeUp} className="inline-block">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1 mt-6 text-primary text-sm font-semibold hover:underline"
                >
                  View all 90+ service areas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Sidebar — slides in from the right, cards stagger */}
          <motion.aside
            className="space-y-6"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              className="space-y-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              {/* Call direct */}
              <motion.div
                className="bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-glow"
                variants={fadeUp}
                whileHover={hoverCard}
              >
                <h3 className="text-lg font-bold text-foreground mb-1">Call Direct — 24/7</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  For emergencies, call us directly. We answer every call.
                </p>
                <motion.a
                  href={`tel:${phoneTel}`}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-lg rounded-full px-6 py-4 shadow-glow hover:brightness-110 transition-all"
                  data-testid="seo-content-phone"
                  {...hoverTap}
                >
                  <Phone className="h-5 w-5" />
                  {BUSINESS_INFO.phone}
                </motion.a>
                <p className="text-center text-muted-foreground text-xs mt-3">
                  No call-out fee during business hours
                </p>
              </motion.div>

              {/* Our services */}
              <motion.div
                className="bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-glow"
                variants={fadeUp}
                whileHover={hoverCard}
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Our Services</h3>
                <ul className="space-y-2.5">
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Reviews on Google */}
              <motion.div
                className="bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-glow"
                variants={fadeUp}
                whileHover={hoverCard}
              >
                <h3 className="text-lg font-bold text-foreground mb-2">What Our Customers Say</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Read genuine reviews from local homeowners, or share your own experience.
                </p>
                <motion.a
                  href={BUSINESS_INFO.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full ring-1 ring-border hover:ring-primary text-foreground font-semibold rounded-full px-6 py-3 transition-all"
                  data-testid="seo-content-google-reviews"
                  {...hoverTap}
                >
                  <ExternalLink className="h-4 w-4 text-primary" />
                  See our reviews on Google
                </motion.a>
              </motion.div>

              {/* Emergency — gentle breathing pulse on the badge */}
              <motion.div
                className="bg-emergency/10 border border-emergency/20 rounded-2xl p-6 md:p-8"
                variants={fadeUp}
                whileHover={hoverCard}
              >
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <motion.span
                    className="inline-flex"
                    animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
                    transition={
                      reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <Siren className="h-5 w-5 text-emergency" />
                  </motion.span>
                  Plumbing Emergency?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Burst pipe? Flooding? Sewage backup? Gas leak? Do not wait — call now.
                </p>
                <motion.a
                  href={`tel:${phoneTel}`}
                  className="flex items-center justify-center gap-2 w-full bg-emergency text-white font-bold rounded-full px-4 py-3 hover:brightness-110 transition-all"
                  data-testid="seo-content-emergency"
                  {...hoverTap}
                >
                  <Phone className="h-4 w-4" />
                  {BUSINESS_INFO.phone}
                </motion.a>
              </motion.div>

              {/* Service areas */}
              <motion.div
                className="bg-card rounded-2xl border border-border/60 shadow-card p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-glow"
                variants={fadeUp}
                whileHover={hoverCard}
              >
                <h3 className="text-lg font-bold text-foreground mb-3">Service Areas</h3>
                <div className="space-y-2">
                  {SERVICE_AREAS.map((area) => (
                    <div key={area.name} className="flex justify-between gap-3 text-sm">
                      <span className="text-foreground font-medium">{area.name}</span>
                      <span className="text-muted-foreground text-right">{area.sub}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1 mt-4 text-primary text-sm font-semibold hover:underline"
                >
                  See all locations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.aside>

        </div>
      </div>
    </section>
  );
}
