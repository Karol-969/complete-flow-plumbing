import { Link } from "wouter";
import { motion } from "framer-motion";
import { BUSINESS_INFO, SERVICES } from "@shared/schema";
import { Phone, Siren, ExternalLink, ArrowRight, ChevronRight } from "lucide-react";

const phoneTel = BUSINESS_INFO.phone.replace(/\s/g, "");

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
    desc: "For genuine plumbing emergencies across all 6 regions we service, we respond fast — day or night. Our vans are stocked with common parts for same-visit repairs.",
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
    desc: "24/7 emergency plumbing across all 6 regions. Burst pipes, flooding, sewage overflow — we respond fast. No call-out fee during business hours, every day including public holidays.",
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
    desc: "Licensed gas plumbers for all gas fitting, gas leak detection, gas appliance installation, and gas line repairs across all 6 regions. Certificate of Compliance provided on every job.",
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
  return (
    <section className="py-16 md:py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main prose column */}
          <motion.div
            className="lg:col-span-2 space-y-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Lead block — dark-theme prose */}
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                Your Local Plumber
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-5">
                Trusted Across 6 Regions — Serving 90+ Suburbs
              </h2>
              <div className="prose prose-invert max-w-prose prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground">
                <p className="!text-lg !leading-relaxed">
                  {BUSINESS_INFO.name} proudly services Sutherland Shire, Wollondilly, the
                  Southern Highlands, Wollongong, Illawarra and the Southern Tablelands.
                  Whether you need an emergency plumber in Cronulla at 2am, a blocked drain
                  cleared in Picton, a hot water system replaced in Wollongong, or gas
                  fitting in Bowral — our team responds fast, quotes upfront, and backs
                  every job with a {BUSINESS_INFO.guarantee.toLowerCase()}.
                </p>
                <p>
                  As a local plumber with deep roots across these communities, we understand
                  the specific plumbing challenges our region faces: salt-air corrosion on
                  the coast, ageing clay and cast-iron pipes in heritage homes, tree-root
                  intrusions, septic and rainwater systems on rural acreage, and the wear
                  that temperature extremes put on hot water systems.
                </p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                Complete Plumbing Services Across All 6 Regions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SERVICE_COLUMNS.map((svc) => (
                  <div key={svc.href}>
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
                  </div>
                ))}
              </div>
            </div>

            {/* Why choose us */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                Why Local Homeowners Choose {BUSINESS_INFO.name}
              </h2>
              <div className="space-y-4">
                {WHY_US.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 text-primary text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <span className="font-semibold text-foreground">{item.title}: </span>
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suburb links */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                Plumbing Services Across Our 6 Regions — All Suburbs
              </h2>
              <p className="text-muted-foreground text-sm mb-5 max-w-prose leading-relaxed">
                We service suburbs and towns across the Sutherland Shire, Wollondilly, the
                Southern Highlands, Wollongong, the Illawarra and the Southern Tablelands:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                {SUBURB_LINKS.map((loc) => {
                  const suburb = loc
                    .replace("Plumber ", "")
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <Link
                      key={loc}
                      href={`/locations/${suburb}`}
                      className="hover:text-primary transition-colors py-0.5"
                    >
                      {loc}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/locations"
                className="inline-flex items-center gap-1 mt-5 text-primary text-sm font-semibold hover:underline"
              >
                View all 90+ service areas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Call direct */}
            <div className="bg-card rounded-xl2 border border-border shadow-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-1">Call Direct — 24/7</h3>
              <p className="text-muted-foreground text-sm mb-4">
                For emergencies, call us directly. We answer every call.
              </p>
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-lg rounded-full px-6 py-4 shadow-glow hover:brightness-110 transition"
                data-testid="seo-content-phone"
              >
                <Phone className="h-5 w-5" />
                {BUSINESS_INFO.phone}
              </a>
              <p className="text-center text-muted-foreground text-xs mt-3">
                No call-out fee during business hours
              </p>
            </div>

            {/* Our services */}
            <div className="bg-card rounded-xl2 border border-border shadow-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Our Services</h3>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews on Google */}
            <div className="bg-card rounded-xl2 border border-border shadow-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">What Our Customers Say</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Read genuine reviews from local homeowners, or share your own experience.
              </p>
              <a
                href={BUSINESS_INFO.googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full ring-1 ring-border hover:ring-primary text-foreground font-semibold rounded-full px-6 py-3 transition"
                data-testid="seo-content-google-reviews"
              >
                <ExternalLink className="h-4 w-4 text-primary" />
                See our reviews on Google
              </a>
            </div>

            {/* Emergency */}
            <div className="bg-emergency/10 border border-emergency/20 rounded-xl2 p-6">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Siren className="h-5 w-5 text-emergency" />
                Plumbing Emergency?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Burst pipe? Flooding? Sewage backup? Gas leak? Do not wait — call now.
              </p>
              <a
                href={`tel:${phoneTel}`}
                className="flex items-center justify-center gap-2 w-full bg-emergency text-white font-bold rounded-full px-4 py-3 hover:brightness-110 transition"
                data-testid="seo-content-emergency"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS_INFO.phone}
              </a>
            </div>

            {/* Service areas */}
            <div className="bg-card rounded-xl2 border border-border shadow-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Service Areas</h3>
              <div className="space-y-1.5">
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
            </div>
          </motion.aside>

        </div>
      </div>
    </section>
  );
}
