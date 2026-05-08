import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Siren, Zap } from "lucide-react";

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

type Category = "Emergency" | "Hot Water" | "Gas" | "Drainage" | "Repairs" | "Renovation";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  { id: "1", src: sewerLine,    alt: "Emergency sewer line excavation and replacement",      category: "Emergency",   caption: "Full sewer line dig-up & replacement — emergency job completed same day" },
  { id: "2", src: pvcPipe,      alt: "Emergency drain excavation and new PVC pipe install",  category: "Emergency",   caption: "Excavated collapsed drain and installed new PVC pipe system" },
  { id: "3", src: waterPipe,    alt: "Burst water main excavation and repair",               category: "Emergency",   caption: "Burst water main dug up and repaired — water restored within hours" },
  { id: "4", src: pipeRepair,   alt: "Emergency underground pipe repair",                    category: "Emergency",   caption: "Emergency underground pipe repair after severe blockage damage" },
  { id: "5", src: hotWater1,    alt: "Rheem hot water system installation",                  category: "Hot Water",   caption: "Rheem continuous flow hot water system — same-day installation" },
  { id: "6", src: gasUnit,      alt: "Rinnai gas continuous flow hot water unit",            category: "Hot Water",   caption: "Rinnai gas hot water unit installed and commissioned" },
  { id: "7", src: drainCleaning,alt: "Drain cleaning and unblocking work",                  category: "Drainage",    caption: "Hydro jet drain cleaning — cleared years of build-up" },
  { id: "8", src: toiletUnblock,alt: "Blocked toilet repair",                               category: "Drainage",    caption: "Blocked toilet cleared and inspected with camera" },
  { id: "9", src: gasUnit,      alt: "Gas unit installation",                               category: "Gas",         caption: "Gas appliance installation with Certificate of Compliance" },
  { id: "10",src: outdoorTap,   alt: "Outdoor tap repair and replacement",                  category: "Repairs",     caption: "Outdoor tap replacement — parts supplied and installed" },
  { id: "11",src: tapRepair,    alt: "Tap and valve repair",                                category: "Repairs",     caption: "Leaking tap repaired — full valve replacement" },
  { id: "12",src: toiletSeat,   alt: "Toilet repair and seat replacement",                  category: "Repairs",     caption: "Toilet repair with new seat and cistern components" },
  { id: "13",src: bathroomReno, alt: "Bathroom renovation plumbing",                        category: "Renovation",  caption: "Complete bathroom rough-in for full renovation" },
];

const CATEGORIES: Category[] = ["Emergency", "Hot Water", "Gas", "Drainage", "Repairs", "Renovation"];

const CATEGORY_CONFIG: Record<Category, { label: string; color: string; badge: string }> = {
  "Emergency":   { label: "Emergency Dig-Up",  color: "bg-emergency text-white",           badge: "bg-emergency/90 text-white" },
  "Hot Water":   { label: "Hot Water",          color: "bg-primary text-primary-foreground", badge: "bg-primary/90 text-white" },
  "Gas":         { label: "Gas Fitting",        color: "bg-orange-500 text-white",           badge: "bg-orange-500/90 text-white" },
  "Drainage":    { label: "Drainage",           color: "bg-blue-600 text-white",             badge: "bg-blue-600/90 text-white" },
  "Repairs":     { label: "Repairs",            color: "bg-green-600 text-white",            badge: "bg-green-600/90 text-white" },
  "Renovation":  { label: "Renovation",         color: "bg-purple-600 text-white",           badge: "bg-purple-600/90 text-white" },
};

export function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("Emergency");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filtered = galleryImages.filter(img => img.category === activeCategory);

  const filteredLengthRef = useRef(filtered.length);
  filteredLengthRef.current = filtered.length;

  const next = useCallback(() => {
    setCurrentSlide(s => (s + 1) % filteredLengthRef.current);
  }, []);

  const prev = useCallback(() => {
    setCurrentSlide(s => (s - 1 + filteredLengthRef.current) % filteredLengthRef.current);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
    setIsAutoPlaying(true);
  }, [activeCategory]);

  useEffect(() => {
    if (!isAutoPlaying || filtered.length <= 1) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, filtered.length, next]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setIsAutoPlaying(true);
  };

  const isSlider = activeCategory === "Emergency";
  const config = CATEGORY_CONFIG[activeCategory];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Recent Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real jobs, real results — see our work across Sydney and the Southern Highlands
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                data-testid={`gallery-tab-${cat.toLowerCase().replace(/\s/g, "-")}`}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                  transition-all duration-200 border-2
                  ${isActive
                    ? `${cfg.color} border-transparent shadow-lg scale-105`
                    : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
                  }
                `}
              >
                {cat === "Emergency" && <Siren className="h-4 w-4" />}
                {cfg.label}
              </button>
            );
          })}
        </div>

        {isSlider && filtered.length > 0 && (
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-emergency/30"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="bg-emergency px-6 py-3 flex items-center gap-3">
              <Siren className="h-5 w-5 text-white animate-pulse" />
              <span className="text-white font-bold text-sm tracking-wide uppercase">
                Emergency Plumbing — Dig-Up & Excavation Work
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentSlide ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    data-testid={`slider-dot-${i}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/9] md:aspect-[21/9] bg-black overflow-hidden">
              {filtered.map((img, i) => (
                <div
                  key={img.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setLightboxImage(img)}
                    data-testid={`emergency-slide-${i}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-6 py-8">
                    <Badge className="bg-emergency text-white mb-3 text-xs font-semibold uppercase tracking-wider">
                      <Zap className="h-3 w-3 mr-1" /> Emergency Job
                    </Badge>
                    <p className="text-white text-lg md:text-xl font-semibold leading-snug max-w-2xl">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => { prev(); setIsAutoPlaying(false); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-all"
                aria-label="Previous slide"
                data-testid="slider-prev"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => { next(); setIsAutoPlaying(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-all"
                aria-label="Next slide"
                data-testid="slider-next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {currentSlide + 1} / {filtered.length}
              </div>
            </div>
          </div>
        )}

        {!isSlider && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer group hover-elevate"
                onClick={() => setLightboxImage(image)}
                data-testid={`gallery-image-${image.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxImage(image);
                  }
                }}
                aria-label={`View ${image.alt}`}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <Badge className={`absolute bottom-2 left-2 text-xs ${config.badge}`}>
                    {image.category}
                  </Badge>
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-4 py-16 text-center text-muted-foreground">
                No images in this category yet.
              </div>
            )}
          </div>
        )}

        <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black border-0" aria-describedby={undefined}>
            <DialogTitle className="sr-only">
              {lightboxImage?.alt ?? "Gallery Image"}
            </DialogTitle>
            {lightboxImage && (
              <div className="relative">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm">{lightboxImage.caption}</p>
                  <Badge className="mt-2">{lightboxImage.category}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                  onClick={() => setLightboxImage(null)}
                  data-testid="gallery-close-button"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
}
