import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
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
import g27 from "@assets/cfp-gallery-27.jpeg";
import g28 from "@assets/cfp-gallery-28.jpeg";
import g29 from "@assets/cfp-gallery-29.jpeg";
import g30 from "@assets/cfp-gallery-30.jpeg";
import g31 from "@assets/cfp-gallery-31.jpeg";
import g32 from "@assets/cfp-gallery-32.jpeg";
import g33 from "@assets/cfp-gallery-33.jpeg";
import g34 from "@assets/cfp-gallery-34.jpeg";
import g35 from "@assets/cfp-gallery-35.jpeg";
import g36 from "@assets/cfp-gallery-36.jpeg";
import g37 from "@assets/cfp-gallery-37.jpeg";
import g38 from "@assets/cfp-gallery-38.jpeg";
import g39 from "@assets/cfp-gallery-39.jpeg";
import g40 from "@assets/cfp-gallery-40.jpeg";
import workVideo from "@assets/cfp-work-video.mp4";

const ALT_TEXT = `Completed plumbing job by ${BUSINESS_INFO.name}`;

type GalleryImage = {
  src: string;
  alt: string;
};

// The first 26 images are the existing portfolio. Images 27–40 are the
// WhatsApp job photos supplied by the client on 25–26 August 2026.
const GALLERY_IMAGES: GalleryImage[] = [
  ...[
    g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13,
    g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26,
  ].map((src) => ({ src, alt: ALT_TEXT })),
  { src: g27, alt: "Plumber beside a Rinnai Enviroflo hot-water system" },
  { src: g28, alt: "Plumber beside a completed hot-water installation" },
  { src: g29, alt: "Complete Flow Plumbing roof installation work" },
  { src: g30, alt: "Complete Flow Plumbing team with two branded utes" },
  { src: g31, alt: "Installed corrugated rainwater tank beside a home" },
  { src: g32, alt: "Completed channel drain and downpipe installation" },
  { src: g33, alt: "Rheem heat-pump hot-water system and pipework" },
  { src: g34, alt: "Copper plumbing installed inside a wall opening" },
  { src: g35, alt: "Completed outdoor drainage and inspection points" },
  { src: g36, alt: "New PVC and copper plumbing installed in a trench" },
  { src: g37, alt: "Drain-cleaning work with removed debris" },
  { src: g38, alt: "Installed electric storage hot-water system" },
  { src: g39, alt: "Installed Vulcan Duomax hot-water system" },
  { src: g40, alt: "Old hot-water tank prepared for replacement" },
];

// Each slide card width per breakpoint (shrink-0 so they sit in a scroll row).
const SLIDE_WIDTH =
  "shrink-0 snap-start w-[78%] sm:w-[46%] md:w-[33%] lg:w-[25%]";

const EASE = [0.22, 1, 0.36, 1] as const;

const POP_SPRING = {
  type: "spring" as const,
  stiffness: 240,
  damping: 15,
  mass: 0.7,
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: POP_SPRING },
};
const zoomIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  show: { opacity: 1, y: 0, scale: 1, transition: POP_SPRING },
};
const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const total = GALLERY_IMAGES.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // When reduced motion is requested, fall back to a plain opacity fade.
  const v = (motionVariant: Variants) => (reduce ? fade : motionVariant);

  // Stagger the slide cards as the track scrolls into view.
  const trackContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.07,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  };

  // Hover lift/scale for each slide (springy pop), disabled under reduced motion.
  const slideHover = reduce
    ? undefined
    : {
        y: -6,
        scale: 1.03,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      };
  const slideTap = reduce ? undefined : { scale: 0.97 };

  // CTA hover/tap (snappy bounce), disabled under reduced motion.
  const ctaHover = reduce ? undefined : { scale: 1.05 };
  const ctaTap = reduce ? undefined : { scale: 0.9 };
  const ctaSpring = { type: "spring" as const, stiffness: 400, damping: 17 };

  // Subtle continuous float for the decorative glow blob.
  const blobAnim = reduce
    ? undefined
    : { y: [0, -18, 0], opacity: [0.5, 0.8, 0.5] };

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );

  // Slide the horizontal track left/right by roughly one viewport of cards.
  const scrollByPage = useCallback((dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }, []);

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

  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Atmospheric sky glow behind the header — gently floats */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[44rem] max-w-full bg-primary/10 blur-3xl rounded-full"
        animate={blobAnim}
        transition={
          reduce
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — slides up */}
        <motion.div
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
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

        {/* Horizontal slider */}
        <div className="relative">
          {/* Prev / Next arrows (desktop) */}
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous"
            data-testid="gallery-slide-prev"
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-card border border-border shadow-card text-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next"
            data-testid="gallery-slide-next"
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-card border border-border shadow-card text-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Edge fade hints (more content) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent hidden sm:block"
          />

          {/* Scroll track — cards stagger in, each lifts on hover */}
          <motion.div
            ref={trackRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            data-testid="gallery-track"
            variants={trackContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Featured video slide */}
            <motion.div
              variants={v(zoomIn)}
              whileHover={slideHover}
              whileTap={slideTap}
              className={`group relative ${SLIDE_WIDTH} overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card`}
              data-testid="gallery-video"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <video
                  src={workVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={`Short clip of a real plumbing job by ${BUSINESS_INFO.name}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-glow backdrop-blur-sm">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Watch
                </span>
                <span className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-medium text-white/90">
                  <motion.span
                    className="relative flex h-2.5 w-2.5"
                    animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
                    transition={
                      reduce
                        ? undefined
                        : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  </motion.span>
                  Live from the job
                </span>
              </div>
            </motion.div>

            {/* Photo slides */}
            {GALLERY_IMAGES.map(({ src, alt }, index) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                variants={v(zoomIn)}
                whileHover={slideHover}
                whileTap={slideTap}
                className={`group relative block ${SLIDE_WIDTH} overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-glow`}
                data-testid={`gallery-image-${index + 1}`}
                aria-label={`View photo ${index + 1}: ${alt}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow ring-1 ring-white/20 backdrop-blur-sm">
                      <Maximize2 className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile arrows below the track */}
          <div className="mt-5 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border shadow-card text-foreground transition active:bg-primary active:text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border shadow-card text-foreground transition active:bg-primary active:text-primary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CTA — slides up, button hover-scales */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 md:mt-20 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-muted-foreground">
            Need a job done right? Licensed, fully insured and available 24/7.
          </p>
          <motion.div
            whileHover={ctaHover}
            whileTap={ctaTap}
            transition={ctaSpring}
            className="inline-flex"
          >
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
                src={GALLERY_IMAGES[activeIndex].src}
                alt={GALLERY_IMAGES[activeIndex].alt}
                className="max-h-[82vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
              <p className="mt-4 text-sm text-white/70">
                {GALLERY_IMAGES[activeIndex].alt} · {activeIndex + 1} / {total}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WorkGallery;
