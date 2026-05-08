import { Link } from "wouter";
import { BUSINESS_INFO, SERVICES } from "@shared/schema";

export function SeoContent() {
  return (
    <section className="py-16 md:py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Sydney's Most Trusted Local Plumber — Serving 90+ Suburbs
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Complete Flow Plumbing is a licensed, fully insured plumbing company servicing all of Greater Sydney and the Southern Highlands. Whether you need an emergency plumber in Sydney at 2am, a blocked drain cleared in Campbelltown, a hot water system replaced in Parramatta, or gas fitting in Bowral — our team responds fast, quotes upfront, and backs every job with a workmanship guarantee.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a local Sydney plumber with deep roots in the community, we understand the specific plumbing challenges Sydney homes face: ageing clay pipes in inner suburbs, tree root intrusions, Sydney Water compliance requirements, and the wear that temperature extremes put on hot water systems.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-5">
                Complete Plumbing Services Across Sydney & Southern Highlands
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link href="/services/emergency-plumbing" className="hover:text-primary transition-colors">
                      Emergency Plumber Sydney
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    24/7 emergency plumbing across Sydney. Burst pipes, flooding, sewage overflow — we respond within 60 minutes. No call-out fee during business hours. Available every day including public holidays.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link href="/services/blocked-drains" className="hover:text-primary transition-colors">
                      Blocked Drains Sydney
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    CCTV drain camera inspection to find the exact cause, followed by hydro jet clearing. We fix the root cause — not just the symptom. Tree root intrusion specialists for Sydney's older suburbs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link href="/services/hot-water-systems" className="hover:text-primary transition-colors">
                      Hot Water System Sydney
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Same-day hot water repairs and replacements. Gas continuous flow, electric storage, heat pump, and solar hot water. All brands serviced. Government rebates on qualifying systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link href="/services/gas-fitting" className="hover:text-primary transition-colors">
                      Gas Plumber Sydney
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Licensed gas plumbers for all gas fitting, gas leak detection, gas appliance installation, and gas line repairs across Sydney. Certificate of Compliance provided on every job.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link href="/services/pipe-relining" className="hover:text-primary transition-colors">
                      Pipe Relining Sydney
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    No-dig pipe relining repairs damaged sewer and drain pipes from the inside. No excavation, no disruption to gardens or driveways. 50-year product warranty. Ideal for Sydney's clay pipe systems.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    <Link href="/services/leak-detection" className="hover:text-primary transition-colors">
                      Leak Detection Sydney
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Advanced electronic leak detection finds hidden water leaks in walls, slabs, and underground pipes without destructive searching. Stop water damage before it becomes a major repair.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Why Sydney Homeowners Choose Complete Flow Plumbing
              </h2>
              <div className="space-y-3">
                {[
                  { title: "Licensed NSW Plumbers", desc: `All plumbers hold a current NSW Fair Trading licence (${BUSINESS_INFO.licence}). Verify any plumber before they enter your home.` },
                  { title: "Upfront Fixed Pricing", desc: "You receive a written quote before work starts. The price you're quoted is the price you pay — no hidden call-out fees, no surprise charges." },
                  { title: "60-Minute Emergency Response", desc: "For genuine plumbing emergencies across Greater Sydney, we aim to arrive within 60 minutes. Our vans are stocked with common parts for same-visit repairs." },
                  { title: "Lifetime Workmanship Guarantee", desc: "We stand behind every job. If our workmanship causes a problem, we return and fix it at no cost. No questions asked." },
                  { title: "Sydney Water Compliance", desc: "All work meets Sydney Water and NSW plumbing code requirements. We handle all required compliance certificates." },
                  { title: "CCTV Camera Technology", desc: "We use drain cameras on every drain job to identify the real cause — not just clear the symptom. You see exactly what we see." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <div>
                      <span className="font-semibold text-foreground">{item.title}: </span>
                      <span className="text-muted-foreground text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Plumbing Services Across Greater Sydney — All Suburbs
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                We service all suburbs across Greater Sydney, from the inner city to the outer western growth corridors, the northern beaches, the Sutherland Shire, and the Southern Highlands:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {[
                  "Plumber Parramatta", "Plumber Campbelltown", "Plumber Liverpool",
                  "Plumber Penrith", "Plumber Blacktown", "Plumber Camden",
                  "Plumber Narellan", "Plumber Oran Park", "Plumber Gregory Hills",
                  "Plumber Cronulla", "Plumber Hurstville", "Plumber Bankstown",
                  "Plumber Marrickville", "Plumber Newtown", "Plumber Ryde",
                  "Plumber Bondi", "Plumber Manly", "Plumber Chatswood",
                  "Plumber Bowral", "Plumber Mittagong", "Plumber Moss Vale",
                  "Plumber Picton", "Plumber Bundanoon", "Plumber Berrima",
                ].map((loc) => {
                  const suburb = loc.replace("Plumber ", "").toLowerCase().replace(/\s+/g, "-");
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
              <Link href="/locations" className="inline-block mt-4 text-primary text-sm font-semibold hover:underline">
                View all 90+ service areas →
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-1">Call Direct — 24/7</h3>
              <p className="text-muted-foreground text-sm mb-4">For emergencies, call us directly. We answer every call.</p>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-lg py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="seo-content-phone"
              >
                {BUSINESS_INFO.phone}
              </a>
              <p className="text-center text-muted-foreground text-xs mt-3">No call-out fee during business hours</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Our Services</h3>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary">→</span>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emergency/10 border border-emergency/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Plumbing Emergency?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Burst pipe? Flooding? Sewage backup? Gas leak? Do not wait — call now.
              </p>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="block text-center bg-emergency text-white font-bold py-3 px-4 rounded-lg hover:bg-emergency/90 transition-colors"
                data-testid="seo-content-emergency"
              >
                Emergency: {BUSINESS_INFO.phone}
              </a>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3">Service Areas</h3>
              <div className="space-y-1">
                {[
                  { name: "Greater Sydney", sub: "All 45+ suburbs" },
                  { name: "Southern Highlands", sub: "Bowral, Mittagong, Moss Vale" },
                  { name: "Macarthur Region", sub: "Campbelltown, Camden, Narellan" },
                  { name: "South-West Sydney", sub: "Liverpool, Fairfield, Prestons" },
                  { name: "Western Sydney", sub: "Parramatta, Penrith, Blacktown" },
                ].map((area) => (
                  <div key={area.name} className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{area.name}</span>
                    <span className="text-muted-foreground">{area.sub}</span>
                  </div>
                ))}
              </div>
              <Link href="/locations" className="inline-block mt-4 text-primary text-sm font-semibold hover:underline">
                See all locations →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
