import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BUSINESS_INFO } from "@shared/schema";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowRight,
  Maximize2,
  Play,
} from "lucide-react";

// Real completed-job photos, imported explicitly via the @assets alias so Vite
// fingerprints and bundles them. Other components import @assets the same way.
import g1 from "@assets/cfp-gallery-01.jpeg";
import g2 from "@assets/cfp-gallery-02.jpeg";
import g3 from "@assets/cfp-gallery-03.jpeg";
import g4 from "@assets/cfp-gallery-04.jpeg";
import g5 from "@assets/cfp-gallery-05.jpeg";
import g6 from "@assets/cfp-gallery-06.jpeg";
import g7 from "@assets/cfp-gallery-07.jpeg";
import g8 from "@assets/cfp-gallery-08.jpeg";
import g9 from "@assets/cfp-gallery-09.jpeg";
import g10 from "@assets/cfp-gallery-10.jpeg";
import g11 from "@assets/cfp-gallery-11.jpeg";
import g12 from "@assets/cfp-gallery-12.jpeg";
import g13 from "@assets/cfp-gallery-13.jpeg";
import g14 from "@assets/cfp-gallery-14.jpeg";
import g15 from "@assets/cfp-gallery-15.jpeg";
import g16 from "@assets/cfp-gallery-16.jpeg";
import g17 from "@assets/cfp-gallery-17.jpeg";
import g18 from "@assets/cfp-gallery-18.jpeg";
import g19 from "@assets/cfp-gallery-19.jpeg";
import g20 from "@assets/cfp-gallery-20.jpeg";
import g21 from "@assets/cfp-gallery-21.jpeg";
import g22 from "@assets/cfp-gallery-22.jpeg";
import g23 from "@assets/cfp-gallery-23.jpeg";
import g24 from "@assets/cfp-gallery-24.jpeg";
import g25 from "@assets/cfp-gallery-25.jpeg";
import g26 from "@assets/cfp-gallery-26.jpeg";
import workVideo from "@assets/cfp-work-video.mp4";

// Array of all 26 resolved image URLs, in order.
const GALLERY_IMAGES: string[] = [
  g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13,
  g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26,
];

// Generic, truthful alt text — no invented details, names or counts.
const ALT_TEXT = `Completed plumbing job by ${BUSINESS_INFO.name}`;

// How many photos to show before "View all our work" reveals the rest.
const INITIAL_COUNT = 12;

export function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const isOpen = activeIndex !== null;
  const total = GALLERY_IMAGES.length;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );

  // Keyboard: Escape closes, arrows navigate while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, prev, next]);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const visibleImages = showAll
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.slice(0, INITIAL_COUNT);

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[44rem] max-w-full bg-primary/10 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14 md:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Our Recent Work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-5">
            Real Jobs, <span className="text-primary">Real Results</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A look at recent work from our own jobs — hot water systems, drains,
            gas, sinks, toilets, water filters and pipework. Every photo is a
            real job completed by {BUSINESS_INFO.name}.
          </p>
        </motion.div>

        {/* Premium responsive tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Featured video tile — spans 2 columns on larger screens */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="group relative col-span-2 row-span-1 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            data-testid="gallery-video"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
              <video
                src={workVideo}
                autoPlay
                muted
                loop
                playsInline
                aria-label={`Short clip of a real plumbing job by ${BUSINESS_INFO.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient for badge legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
              {/* Live clip badge */}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-glow backdrop-blur-sm">
                <Play className="h-3.5 w-3.5 fill-current" />
                Watch
              </span>
              <span className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-medium text-white/90">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                Live from the job
              </span>
            </div>
          </motion.div>

          {/* Photo tiles */}
          {visibleImages.map((src, index) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(index, 8) * 0.05,
              }}
              className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              data-testid={`gallery-image-${index + 1}`}
              aria-label={`View photo ${index + 1}: ${ALT_TEXT}`}
            >
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={ALT_TEXT}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay: dark gradient + maximize icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow ring-1 ring-white/20 backdrop-blur-sm">
                    <Maximize2 className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View all our work */}
        {!showAll && total > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
              className="rounded-full border-primary/40 px-7 py-3.5 font-semibold text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition"
              data-testid="button-view-all-work"
            >
              View all our work
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 md:mt-20 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-muted-foreground">
            Need a job done right? Licensed, fully insured and available 24/7.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground rounded-full px-7 py-3.5 font-bold shadow-glow hover:brightness-110 transition"
            data-testid="button-gallery-call"
          >
            <a href={`tel:${BUSINESS_INFO.phoneTel}`} data-testid="link-gallery-call">
              <Phone className="h-5 w-5 mr-2" />
              Call {BUSINESS_INFO.phone}
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && activeIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={ALT_TEXT}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            data-testid="gallery-lightbox"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              data-testid="gallery-close-button"
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              data-testid="gallery-prev"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 sm:p-3 text-white transition hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              data-testid="gallery-next"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 sm:p-3 text-white transition hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            {/* Image — stop propagation so clicking it doesn't close */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full max-w-5xl flex-col items-center"
            >
              <img
                src={GALLERY_IMAGES[activeIndex]}
                alt={ALT_TEXT}
                className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-4 text-sm text-white/70">
                {ALT_TEXT} · {activeIndex + 1} / {total}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WorkGallery;
