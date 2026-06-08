import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BUSINESS_INFO } from "@shared/schema";
import logoImage from "@assets/logo-dark.png";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Flame,
  Fuel,
  Search,
  Siren,
  Wrench,
  Home,
  Users,
  MapPin,
  FileText,
  MessageSquare,
  Droplets,
  Zap,
  Star,
} from "lucide-react";

const phoneTel = BUSINESS_INFO.phone.replace(/\s/g, "");

// Official 4-colour Google "G" mark.
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

// Small "Rated on Google" badge (real 5.0 rating + real review count).
function GoogleRatingBadge() {
  return (
    <a
      href={BUSINESS_INFO.googleReviewLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${BUSINESS_INFO.googleRating} out of 5 on Google from ${BUSINESS_INFO.googleReviewCount} reviews`}
      data-testid="header-google-rating"
      className="hidden md:flex items-center gap-2 rounded-full bg-card border border-border shadow-sm px-3 py-1.5 transition hover:border-primary/40 hover:shadow-glow"
    >
      <GoogleG className="h-5 w-5 shrink-0" />
      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-1">
          <span className="text-sm font-bold text-foreground">{BUSINESS_INFO.googleRating}</span>
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]" />
            ))}
          </span>
        </span>
        <span className="text-[11px] text-muted-foreground">
          {BUSINESS_INFO.googleReviewCount} Google reviews
        </span>
      </span>
    </a>
  );
}

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Users },
  { href: "/services", label: "Services", icon: Wrench, hasDropdown: true },
  { href: "/locations", label: "Areas We Service", icon: MapPin },
  { href: "/blog", label: "Blog & Tips", icon: FileText },
  { href: "/contact", label: "Contact", icon: MessageSquare },
];

const serviceCategories = [
  {
    title: "Emergency",
    icon: Siren,
    items: [
      { href: "/services/emergency-plumber", label: "Emergency Plumber 24/7" },
      { href: "/services/burst-pipe-emergency", label: "Burst Pipe Emergency" },
    ],
  },
  {
    title: "Drainage",
    icon: Droplets,
    items: [
      { href: "/services/blocked-drains", label: "Blocked Drains" },
      { href: "/services/hydro-jetting", label: "Hydro Jetting" },
      { href: "/services/cctv-drain-inspection", label: "CCTV Drain Inspection" },
      { href: "/services/pipe-relining", label: "Pipe Relining" },
    ],
  },
  {
    title: "Hot Water",
    icon: Flame,
    items: [
      { href: "/services/hot-water-systems", label: "Hot Water Systems" },
      { href: "/services/gas-hot-water", label: "Gas Hot Water" },
      { href: "/services/electric-hot-water", label: "Electric Hot Water" },
    ],
  },
  {
    title: "Gas",
    icon: Fuel,
    items: [
      { href: "/services/gas-fitting", label: "Gas Fitting" },
      { href: "/services/gas-leak-detection", label: "Gas Leak Detection" },
    ],
  },
  {
    title: "Leak Detection",
    icon: Search,
    items: [
      { href: "/services/leak-detection", label: "Leak Detection" },
      { href: "/services/leaking-tap-repair", label: "Leaking Tap Repair" },
      { href: "/services/toilet-repair", label: "Toilet Repair" },
    ],
  },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Desktop scroll-state: transparent over the hero, then a frosted bar after 40px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Slim emergency top strip — sits above the header, click-to-call */}
      <div className="w-full bg-emergency text-emergency-foreground">
        <a
          href={`tel:${phoneTel}`}
          className="group flex items-center justify-center gap-x-2 gap-y-1 flex-wrap px-4 py-2 text-center text-xs sm:text-sm font-semibold tracking-wide"
          data-testid="header-emergency-strip"
          aria-label={`24/7 emergency plumber, same-day service, call ${BUSINESS_INFO.phone}`}
        >
          <Zap className="h-4 w-4 flex-shrink-0 fill-current" aria-hidden="true" />
          <span>24/7 Emergency Plumber</span>
          <span className="opacity-50" aria-hidden="true">·</span>
          <span className="hidden sm:inline">Same-Day Service</span>
          <span className="hidden sm:inline opacity-50" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 font-bold underline-offset-4 group-hover:underline">
            <Phone className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Call {BUSINESS_INFO.phone}
          </span>
        </a>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
        data-testid="site-header"
        data-scrolled={scrolled}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo + Google rating */}
            <div className="flex items-center gap-3 lg:gap-5">
              <Link href="/" className="flex items-center gap-3" data-testid="header-logo-link">
                <img
                  src={logoImage}
                  alt="Complete Flow Plumbing"
                  className="h-16 md:h-20 w-auto"
                  data-testid="header-logo"
                />
              </Link>
              <GoogleRatingBadge />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div key={item.href} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                        location.startsWith("/services")
                          ? "text-primary bg-primary/10"
                          : "text-foreground"
                      }`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      data-testid="nav-services-dropdown"
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                        location === item.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground"
                      }`}
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Services Mega Menu */}
                  {item.hasDropdown && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                        servicesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="bg-card rounded-xl2 shadow-card border border-border p-6 min-w-[600px]">
                        <div className="grid grid-cols-3 gap-6">
                          {serviceCategories.map((category) => (
                            <div key={category.title}>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="bg-primary/10 ring-1 ring-primary/20 text-primary rounded-lg p-1.5">
                                  <category.icon className="h-4 w-4" />
                                </span>
                                <span className="font-semibold text-foreground">{category.title}</span>
                              </div>
                              <ul className="space-y-2">
                                {category.items.map((subItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                      data-testid={`nav-service-${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-border">
                          <Link href="/services" className="text-sm font-medium text-primary hover:underline">
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA — real click-to-call phone + always-visible primary Book Now */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${phoneTel}`}
                className="group flex items-center gap-2 text-foreground font-bold text-lg ring-1 ring-border hover:ring-primary rounded-full px-5 py-2.5 transition"
                data-testid="header-phone"
                aria-label={`Call ${BUSINESS_INFO.phone}`}
              >
                <Phone className="h-5 w-5 text-primary" />
                {BUSINESS_INFO.phone}
              </a>
              <a
                href="/contact"
                className="bg-primary text-primary-foreground rounded-full px-6 py-3 font-bold shadow-glow hover:brightness-110 transition"
                data-testid="header-book-now"
              >
                Book Now
              </a>
            </div>

            {/* Mobile menu trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-toggle">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0" aria-describedby={undefined}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <img
                      src={logoImage}
                      alt="Complete Flow Plumbing"
                      className="h-10 w-auto"
                    />
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile menu items */}
                  <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-1">
                      {mainNavItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors hover-elevate ${
                              location === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-foreground"
                            }`}
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile menu footer with CTAs */}
                  <div className="p-4 border-t border-border space-y-3">
                    <a
                      href={`tel:${phoneTel}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-primary-foreground rounded-full font-bold shadow-glow hover:brightness-110 transition"
                      data-testid="mobile-call-now"
                    >
                      <Phone className="h-5 w-5" />
                      Call {BUSINESS_INFO.phone}
                    </a>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-12 ring-1 ring-border hover:ring-primary text-foreground rounded-full font-semibold transition"
                      data-testid="mobile-book-now"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Sticky Mobile CTA Bar — real number, primary Book Now, safe-area aware */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/90 backdrop-blur border-t border-border p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex gap-2">
        <a
          href={`tel:${phoneTel}`}
          className="flex-1 flex items-center justify-center gap-2 h-14 bg-emergency text-emergency-foreground rounded-full text-base font-bold shadow-glow hover:brightness-110 transition"
          data-testid="sticky-call-now"
        >
          <Phone className="h-5 w-5" />
          Call {BUSINESS_INFO.phone}
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 h-14 bg-primary text-primary-foreground rounded-full text-base font-bold shadow-glow hover:brightness-110 transition"
          data-testid="sticky-book-now"
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
