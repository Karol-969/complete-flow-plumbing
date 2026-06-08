import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEOHead } from "@/components/seo/seo-head";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  REGIONS,
  ALL_LOCATIONS,
  locationsByRegion,
  regionBySlug,
  BUSINESS_INFO,
} from "@shared/schema";
import {
  MapPin,
  Phone,
  Search,
  X,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.04 },
  }),
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ALL_REGIONS_KEY = "all";
const ALL_LETTERS_KEY = "all";

export default function Locations() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>(ALL_REGIONS_KEY);
  const [activeLetter, setActiveLetter] = useState<string>(ALL_LETTERS_KEY);

  const activeRegionData =
    activeRegion === ALL_REGIONS_KEY ? undefined : regionBySlug(activeRegion);

  // Suburbs after applying the REGION filter only — used to decide which
  // alphabet letters are available (and to dim the rest).
  const regionScoped = useMemo(
    () =>
      activeRegion === ALL_REGIONS_KEY
        ? ALL_LOCATIONS
        : locationsByRegion(activeRegion),
    [activeRegion],
  );

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const loc of regionScoped) {
      set.add(loc.name.charAt(0).toUpperCase());
    }
    return set;
  }, [regionScoped]);

  // Final filtered list: region + letter + search text.
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return regionScoped
      .filter((loc) => {
        if (
          activeLetter !== ALL_LETTERS_KEY &&
          loc.name.charAt(0).toUpperCase() !== activeLetter
        ) {
          return false;
        }
        if (query && !loc.name.toLowerCase().includes(query)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [regionScoped, activeLetter, search]);

  // Group the filtered suburbs by first letter for the Mr-Splash-style list.
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const loc of filtered) {
      const letter = loc.name.charAt(0).toUpperCase();
      const bucket = map.get(letter);
      if (bucket) {
        bucket.push(loc);
      } else {
        map.set(letter, [loc]);
      }
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  const hasActiveFilters =
    search.trim() !== "" ||
    activeRegion !== ALL_REGIONS_KEY ||
    activeLetter !== ALL_LETTERS_KEY;

  const clearAll = () => {
    setSearch("");
    setActiveRegion(ALL_REGIONS_KEY);
    setActiveLetter(ALL_LETTERS_KEY);
  };

  const serviceAreaSentence =
    "Complete Flow Plumbing proudly services Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra and the Southern Tablelands.";

  return (
    <Layout>
      <SEOHead
        title="Search Your Area | Plumber Service Areas | Complete Flow Plumbing"
        description={serviceAreaSentence}
        canonical="/locations"
        keywords={[
          "plumber service areas",
          "find a plumber near me",
          "plumber Sutherland Shire",
          "plumber Wollongong",
          "plumber Southern Highlands",
          "plumber Illawarra",
        ]}
      />

      <Breadcrumbs items={[{ name: "Service Areas", url: "/locations" }]} />

      {/* Hero / header */}
      <section className="relative overflow-hidden bg-background py-14 md:py-20">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-primary/10 blur-3xl rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Areas We Service
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5">
              Search Your Area
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {serviceAreaSentence}
            </p>
          </motion.div>

          {/* Search box */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="mt-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your suburb…"
                aria-label="Search your suburb"
                data-testid="locations-search-input"
                className="w-full rounded-xl2 border border-border bg-card shadow-card pl-12 pr-12 py-4 text-base text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  data-testid="locations-search-clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Region filter pills */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-6 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by region"
          >
            <button
              type="button"
              onClick={() => setActiveRegion(ALL_REGIONS_KEY)}
              data-testid="region-pill-all"
              aria-pressed={activeRegion === ALL_REGIONS_KEY}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeRegion === ALL_REGIONS_KEY
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              }`}
            >
              All Regions
            </button>
            {REGIONS.map((region) => {
              const isActive = activeRegion === region.slug;
              return (
                <button
                  key={region.slug}
                  type="button"
                  onClick={() => setActiveRegion(region.slug)}
                  data-testid={`region-pill-${region.slug}`}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-card border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {region.displayName}
                </button>
              );
            })}
          </motion.div>

          {/* A–Z alphabet filter */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Filter by first letter"
          >
            <button
              type="button"
              onClick={() => setActiveLetter(ALL_LETTERS_KEY)}
              data-testid="letter-all"
              aria-pressed={activeLetter === ALL_LETTERS_KEY}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                activeLetter === ALL_LETTERS_KEY
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              }`}
            >
              Show All
            </button>
            {ALPHABET.map((letter) => {
              const enabled = availableLetters.has(letter);
              const isActive = activeLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!enabled}
                  onClick={() => setActiveLetter(letter)}
                  data-testid={`letter-${letter}`}
                  aria-pressed={isActive}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : enabled
                        ? "bg-card border border-border text-foreground hover:border-primary/50"
                        : "bg-muted/40 text-muted-foreground/40 cursor-not-allowed"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </motion.div>

          {/* Result count + clear */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <p
              className="text-sm font-medium text-muted-foreground"
              data-testid="locations-result-count"
              aria-live="polite"
            >
              Showing {filtered.length}{" "}
              {filtered.length === 1 ? "suburb" : "suburbs"}
              {activeRegionData ? ` in ${activeRegionData.displayName}` : ""}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAll}
                data-testid="locations-clear-all"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="pb-16 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* When a region filter is active, surface its hub link */}
          {activeRegionData && (
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl2 border border-border bg-card shadow-card p-5"
            >
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Plumber {activeRegionData.displayName}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                  {activeRegionData.blurb}
                </p>
              </div>
              <Button
                asChild
                className="bg-primary text-primary-foreground rounded-full px-5 py-2.5 font-semibold shrink-0 hover:brightness-110 transition"
                data-testid={`region-hub-cta-${activeRegionData.slug}`}
              >
                <Link
                  href={`/locations/region/${activeRegionData.slug}`}
                  className="flex items-center gap-2"
                >
                  View {activeRegionData.displayName} hub
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          )}

          {filtered.length === 0 ? (
            /* Empty state */
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="rounded-xl2 border border-border bg-card shadow-card p-8 md:p-12 text-center"
              data-testid="locations-empty"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20 text-primary">
                <MapPin className="h-7 w-7" />
              </span>
              <h2 className="text-xl font-bold text-foreground">
                No suburbs match your search
              </h2>
              <p className="mt-2 text-muted-foreground">
                We may still cover you — call us on{" "}
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="font-semibold text-primary hover:underline"
                  data-testid="locations-empty-call"
                >
                  {BUSINESS_INFO.phone}
                </a>{" "}
                and we'll let you know.
              </p>
              <Button
                asChild
                className="mt-6 bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
              >
                <a
                  href={`tel:${BUSINESS_INFO.phoneTel}`}
                  className="inline-flex items-center gap-2"
                >
                  <PhoneCall className="h-5 w-5" />
                  Call {BUSINESS_INFO.phone}
                </a>
              </Button>
            </motion.div>
          ) : (
            /* Grouped alphabetical suburb list */
            <div className="space-y-10">
              {grouped.map(([letter, suburbs], groupIndex) => (
                <motion.div
                  key={letter}
                  custom={groupIndex}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  data-testid={`letter-group-${letter}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 text-primary text-lg font-bold">
                      {letter}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {suburbs.map((suburb) => (
                      <li key={suburb.id}>
                        <Link
                          href={`/locations/${suburb.slug}`}
                          data-testid={`location-${suburb.slug}`}
                          className="group flex items-center gap-3 rounded-xl2 border border-border bg-card shadow-card p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow"
                        >
                          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-primary">
                            <MapPin className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              Plumber {suburb.name}
                            </span>
                            {suburb.postcode && (
                              <span className="block text-xs text-muted-foreground">
                                {suburb.postcode}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Region hub cards — keep the SEO hubs linked */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 max-w-2xl"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Browse By Region
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Explore our service regions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Prefer to browse by area? Jump straight to a region hub to see
              every suburb we cover and the local plumbing issues we fix.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REGIONS.map((region, index) => {
              const count = locationsByRegion(region.slug).length;
              return (
                <motion.div
                  key={region.slug}
                  custom={index}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link
                    href={`/locations/region/${region.slug}`}
                    data-testid={`region-card-${region.slug}`}
                    className="group flex h-full flex-col rounded-xl2 border border-border bg-background shadow-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {region.displayName}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {region.blurb}
                    </p>
                    <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 ring-1 ring-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      <MapPin className="h-3.5 w-3.5" />
                      {count} suburbs
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Closing CTA */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-12 flex flex-col items-center gap-4 rounded-xl2 border border-border bg-background shadow-card p-8 text-center"
          >
            <p className="text-lg font-semibold text-foreground">
              Can't find your suburb? We may still be able to help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
              data-testid="locations-cta-call"
            >
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Call: {BUSINESS_INFO.phone}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
