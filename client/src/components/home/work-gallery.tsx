import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { WORK_IMAGES, BUSINESS_INFO } from "@shared/schema";
import { X, ChevronLeft, ChevronRight, Phone, ArrowRight } from "lucide-react";

// Static @assets imports already present in the repo. WORK_IMAGES in the
// schema reference these exact filenames; we bridge schema data -> resolved
// module by id so the gallery is driven by real WORK_IMAGES without inventing
// any new asset paths.
import hotWater1 from "@assets/WhatsApp_Image_2025-12-18_at_6.50.35_PM_1766462914108.jpeg";
import gasUnit from "@assets/WhatsApp_Image_2025-12-18_at_6.50.36_PM_1766462914109.jpeg";
import drainCleaning from "@assets/WhatsApp_Image_2025-12-18_at_6.52.14_PM_1766462914110.jpeg";
import toiletUnblock from "@assets/WhatsApp_Image_2025-12-18_at_6.52.15_PM_1766462914110.jpeg";
import pvcPipe from "@assets/WhatsApp_Image_2025-12-18_at_6.52.13_PM_1766462914110.jpeg";
import sewerLine from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(3)_1766462914110.jpeg";
import outdoorTap from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(2)_1766462914111.jpeg";
import pipeRepair from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(1)_1766462914111.jpeg";
import waterPipe from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_1766462914111.jpeg";
import toiletSeat from "@assets/WhatsApp_Image_2025-12-18_at_6.50.33_PM_1766462914112.jpeg";
import tapRepair from "@assets/WhatsApp_Image_2025-12-18_at_6.50.32_PM_(1)_1766462914112.jpeg";
import bathroomReno from "@assets/WhatsApp_Image_2025-12-18_at_6.50.32_PM_1766462914112.jpeg";

// Map WORK_IMAGES.id -> resolved image module (build-safe, no new paths).
const IMAGE_BY_ID: Record<string, string> = {
  "1": hotWater1,
  "2": gasUnit,
  "3": drainCleaning,
  "4": toiletUnblock,
  "5": pvcPipe,
  "6": sewerLine,
  "7": outdoorTap,
  "8": pipeRepair,
  "9": waterPipe,
  "10": toiletSeat,
  "11": tapRepair,
  "12": bathroomReno,
};

// Human-readable label for each schema category (truthful, descriptive only).
const CATEGORY_LABEL: Record<string, string> = {
  emergency: "Emergency",
  "hot-water": "Hot Water",
  gas: "Gas Fitting",
  drainage: "Drainage",
  "leak-detection": "Leak & Repair",
};

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

// Build the gallery straight from the real WORK_IMAGES data.
const ITEMS: GalleryItem[] = WORK_IMAGES.filter((img) => IMAGE_BY_ID[img.id]).map(
  (img) => ({
    id: img.id,
    src: IMAGE_BY_ID[img.id],
    alt: img.alt,
    caption: img.alt,
    category: CATEGORY_LABEL[img.category] ?? "Plumbing",
  }),
);

export function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + ITEMS.length) % ITEMS.length)),
    [],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % ITEMS.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next]);

  const active = activeIndex !== null ? ITEMS[activeIndex] : null;

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
            A look at recent jobs across the Sutherland Shire, Wollongong, the
            Southern Highlands and beyond — from emergency dig-ups to hot water
            installs and gas fitting.
          </p>
        </motion.div>

        {/* Clean rounded-2xl photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.06 }}
              className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              data-testid={`gallery-image-${item.id}`}
              aria-label={`View ${item.alt}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle gradient for caption legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Category chip */}
                <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/30 backdrop-blur-sm">
                  {item.category}
                </span>

                {/* Subtle caption */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="text-sm md:text-[15px] font-medium leading-snug text-white">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

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

        {/* Lightbox */}
        <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
          <DialogContent
            className="max-w-4xl p-0 bg-black border-0 overflow-hidden rounded-2xl"
            aria-describedby={undefined}
          >
            <DialogTitle className="sr-only">{active?.alt ?? "Gallery image"}</DialogTitle>
            {active && (
              <div className="relative">
                <img
                  src={active.src}
                  alt={active.alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 to-transparent">
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/30 mb-2">
                    {active.category}
                  </span>
                  <p className="text-white text-sm md:text-base font-medium">
                    {active.caption}
                  </p>
                </div>

                {ITEMS.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous image"
                      data-testid="gallery-prev"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/80"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next image"
                      data-testid="gallery-next"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/80"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  data-testid="gallery-close-button"
                  className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white transition hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
