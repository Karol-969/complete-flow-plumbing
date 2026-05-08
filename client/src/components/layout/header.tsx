import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { BUSINESS_INFO } from "@shared/schema";
import logoImage from "@assets/logo_1766462914112.jpeg";
import { 
  Phone, 
  Menu, 
  X, 
  Clock, 
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
  Droplets
} from "lucide-react";

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
      { href: "/services/emergency-plumber-sydney", label: "Emergency Plumber 24/7" },
      { href: "/services/burst-pipe-emergency", label: "Burst Pipe Emergency" },
    ]
  },
  { 
    title: "Drainage", 
    icon: Droplets,
    items: [
      { href: "/services/blocked-drains", label: "Blocked Drains" },
      { href: "/services/hydro-jetting", label: "Hydro Jetting" },
      { href: "/services/cctv-drain-inspection", label: "CCTV Drain Inspection" },
      { href: "/services/pipe-relining", label: "Pipe Relining" },
    ]
  },
  { 
    title: "Hot Water", 
    icon: Flame,
    items: [
      { href: "/services/hot-water-systems", label: "Hot Water Systems" },
      { href: "/services/gas-hot-water", label: "Gas Hot Water" },
      { href: "/services/electric-hot-water", label: "Electric Hot Water" },
    ]
  },
  { 
    title: "Gas", 
    icon: Fuel,
    items: [
      { href: "/services/gas-fitting", label: "Gas Fitting" },
      { href: "/services/gas-leak-detection", label: "Gas Leak Detection" },
    ]
  },
  { 
    title: "Leak Detection", 
    icon: Search,
    items: [
      { href: "/services/leak-detection", label: "Leak Detection" },
      { href: "/services/leaking-tap-repair", label: "Leaking Tap Repair" },
      { href: "/services/toilet-repair", label: "Toilet Repair" },
    ]
  },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      {/* Top bar with emergency message */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
          <span className="flex items-center gap-2">
            <Siren className="h-4 w-4" />
            24/7 Emergency Plumber Available
          </span>
          <span className="text-primary-foreground/70">|</span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Same-Day Service
          </span>
          <span className="text-primary-foreground/70">|</span>
          <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 font-bold hover:underline">
            <Phone className="h-4 w-4" />
            Call Now: {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Complete Flow Plumbing" 
                className="h-14 w-auto"
                data-testid="header-logo"
              />
            </Link>

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
                      data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
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
                      <div className="bg-card rounded-lg shadow-lg border border-border p-6 min-w-[600px]">
                        <div className="grid grid-cols-3 gap-6">
                          {serviceCategories.map((category) => (
                            <div key={category.title}>
                              <div className="flex items-center gap-2 mb-3">
                                <category.icon className="h-5 w-5 text-primary" />
                                <span className="font-semibold text-foreground">{category.title}</span>
                              </div>
                              <ul className="space-y-2">
                                {category.items.map((subItem) => (
                                  <li key={subItem.href}>
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                      data-testid={`nav-service-${subItem.label.toLowerCase().replace(/\s+/g, '-')}`}
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

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-foreground font-bold text-xl">
                <Phone className="h-5 w-5 text-primary" />
                {BUSINESS_INFO.phone}
              </a>
              <Button asChild size="lg" data-testid="header-get-quote">
                <Link href="/contact">Get Quote</Link>
              </Button>
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
                            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
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
                    <Button asChild className="w-full" size="lg" data-testid="mobile-call-now">
                      <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2">
                        <Phone className="h-5 w-5" />
                        Call Now
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg" data-testid="mobile-get-quote">
                      <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                        Get Free Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-2 flex gap-2">
        <Button asChild className="flex-1 h-14 text-base" data-testid="sticky-call-now">
          <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2">
            <Phone className="h-5 w-5" />
            Call Now
          </a>
        </Button>
        <Button asChild variant="secondary" className="flex-1 h-14 text-base" data-testid="sticky-get-quote">
          <Link href="/contact">
            Get Quote
          </Link>
        </Button>
      </div>
    </>
  );
}
