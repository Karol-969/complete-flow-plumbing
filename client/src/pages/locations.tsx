import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { SEOHead } from "@/components/seo/seo-head";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { WebGLBackground } from "@/components/effects/webgl-background";
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
  Sparkles,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] },
  }),
};

const heroIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Region cards reveal from alternating directions for richer motion.
const regionCardIn: Variants = {
  hidden: (i: number = 0) => ({
    opacity: 0,
    x: i % 2 === 0 ? -36 : 36,
    y: 24,
  }),
  show: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
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

  // Group the filtered suburbs by first letter for the alphabetical list.
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

  const selectRegion = (slug: string) => {
    setActiveRegion(slug);
    // Reset the letter filter when the region changes so the new region's
    // suburbs aren't accidentally hidden by a stale letter selection.
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

      {/* ============================ DARK WEBGL HERO ======================== */}
      <section className="relative isolate overflow-hidden min-h-[60vh] flex items-center">
        {/* Animated WebGL plasma background */}
        <WebGLBackground />

        {/* Dark scrim for text legibility over the animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03132c]/70 via-[#041027]/60 to-[#03132c]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,transparent_30%,rgba(3,19,44,0.9)_100%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.p
            initial="hidden"
            animate="show"
            custom={0}
            variants={heroIn}
            className="inline-flex items-center gap-2 text-cyan-300/90 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-5"
          >
            <Sparkles className="h-4 w-4" />
            Areas We Service
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={heroIn}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.05]"
          >
            Search Your{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Area
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={heroIn}
            className="mt-6 text-lg md:text-xl text-slate-200/90 max-w-3xl"
          >
            {serviceAreaSentence}
          </motion.p>

          {/* Search box living in the hero */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={heroIn}
            className="mt-9 max-w-2xl"
          >
            <div className="group relative">
              <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400/40 to-sky-500/40 opacity-0 blur transition-opacity duration-300 group-focus-within:opacity-100" />
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search your suburb…"
                  aria-label="Search your suburb"
                  data-testid="locations-search-input"
                  className="w-full rounded-2xl border border-white/15 bg-white/95 backdrop-blur pl-12 pr-12 py-4 text-base text-slate-900 placeholder:text-slate-400 shadow-2xl shadow-cyan-900/30 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    data-testid="locations-search-clear"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-3 text-sm text-slate-300/80"
              aria-live="polite"
              data-testid="hero-result-count"
            >
              {filtered.length} {filtered.length === 1 ? "suburb" : "suburbs"}{" "}
              available
              {activeRegionData ? ` in ${activeRegionData.displayName}` : " across 6 regions"}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ====================== INTERACTIVE REGION GRID ===================== */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-2xl mb-10 md:mb-14"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
              Browse By Region
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              Pick your region
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Tap a region to filter the suburb list below — or jump straight to
              its hub to see every local plumbing service we offer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* All regions card */}
            <motion.button
              type="button"
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={regionCardIn}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => selectRegion(ALL_REGIONS_KEY)}
              data-testid="region-card-all"
              aria-pressed={activeRegion === ALL_REGIONS_KEY}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 text-left shadow-card transition-shadow ${
                activeRegion === ALL_REGIONS_KEY
                  ? "border-primary/60 ring-2 ring-primary shadow-glow"
                  : "border-border hover:border-primary/50 hover:shadow-glow"
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-400 text-primary-foreground shadow-glow">
                <Sparkles className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                All Regions
              </h3>
              <p className="relative mt-2 flex-1 text-sm text-muted-foreground">
                See every suburb we cover across the Shire, Illawarra, Highlands
                and beyond.
              </p>
              <span className="relative mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 ring-1 ring-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                <MapPin className="h-3.5 w-3.5" />
                {ALL_LOCATIONS.length} suburbs
              </span>
            </motion.button>

            {/* One card per real region */}
            {REGIONS.map((region, index) => {
              const count = locationsByRegion(region.slug).length;
              const isActive = activeRegion === region.slug;
              return (
                <motion.div
                  key={region.slug}
                  custom={index + 1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={regionCardIn}
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-shadow ${
                    isActive
                      ? "border-primary/60 ring-2 ring-primary shadow-glow"
                      : "border-border hover:border-primary/50 hover:shadow-glow"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* The whole card body filters; the footer link goes to the hub */}
                  <button
                    type="button"
                    onClick={() => selectRegion(region.slug)}
                    data-testid={`region-card-${region.slug}`}
                    aria-pressed={isActive}
                    className="relative flex flex-1 flex-col text-left outline-none"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground transition-transform duration-300 group-hover:scale-110 ${
                        isActive
                          ? "bg-gradient-to-br from-primary to-sky-400 shadow-glow"
                          : "bg-gradient-to-br from-primary/90 to-sky-500/90"
                      }`}
                    >
                      <MapPin className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {region.displayName}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {region.blurb}
                    </p>
                    <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 ring-1 ring-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      <MapPin className="h-3.5 w-3.5" />
                      {count} suburbs
                    </span>
                  </button>

                  {/* Region hub CTA — keeps the SEO hub linked */}
                  <Link
                    href={`/locations/region/${region.slug}`}
                    data-testid={`region-hub-link-${region.slug}`}
                    className="relative mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold text-primary transition-colors hover:text-sky-500"
                  >
                    View {region.displayName}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================== FILTER BAR + RESULTS LIST ===================== */}
      <section className="relative bg-card py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter controls card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-background shadow-card p-5 md:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {activeRegionData
                    ? `Suburbs in ${activeRegionData.displayName}`
                    : "All suburbs we cover"}
                </h2>
                <p
                  className="mt-1 text-sm font-medium text-muted-foreground"
                  data-testid="locations-result-count"
                  aria-live="polite"
                >
                  Showing {filtered.length}{" "}
                  {filtered.length === 1 ? "suburb" : "suburbs"}
                  {activeRegionData ? ` in ${activeRegionData.displayName}` : ""}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  data-testid="locations-clear-all"
                  className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/50"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </button>
              )}
            </div>

            {/* A–Z alphabet filter */}
            <div
              className="mt-5 flex flex-wrap items-center gap-1.5"
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
                    ? "bg-primary text-primary-foreground shadow-glow"
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
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : enabled
                          ? "bg-card border border-border text-foreground hover:border-primary/50 hover:-translate-y-0.5"
                          : "bg-muted/40 text-muted-foreground/40 cursor-not-allowed"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active-region hub callout */}
          {activeRegionData && (
            <motion.div
              key={activeRegionData.slug}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mt-8 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 to-sky-500/5 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Plumber {activeRegionData.displayName}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {activeRegionData.blurb}
                </p>
              </div>
              <Button
                asChild
                className="shrink-0 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
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

          {/* Results */}
          <div className="mt-10">
            {filtered.length === 0 ? (
              /* Empty state */
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="rounded-2xl border border-border bg-background shadow-card p-8 md:p-12 text-center"
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
                  className="mt-6 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
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
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                    data-testid={`letter-group-${letter}`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-400 text-lg font-bold text-primary-foreground shadow-glow">
                        {letter}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                    </div>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {suburbs.map((suburb, i) => (
                        <motion.li
                          key={suburb.id}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: Math.min(i, 8) * 0.03,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={`/locations/${suburb.slug}`}
                            data-testid={`location-${suburb.slug}`}
                            className="group flex items-center gap-3 rounded-2xl border border-border bg-card shadow-card p-3.5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
                          >
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                              <MapPin className="h-4 w-4" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                                Plumber {suburb.name}
                              </span>
                              {suburb.postcode && (
                                <span className="block text-xs text-muted-foreground">
                                  {suburb.postcode}
                                </span>
                              )}
                            </span>
                            <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0 text-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Closing CTA */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-border bg-gradient-to-br from-background to-primary/5 shadow-card p-8 text-center md:p-10"
          >
            <p className="text-lg font-semibold text-foreground">
              Can't find your suburb? We may still be able to help.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
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
