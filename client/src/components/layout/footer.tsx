import { Link } from "wouter";
import { BUSINESS_INFO, SERVICES, SOUTHERN_HIGHLANDS_SUBURBS, SYDNEY_METRO_SUBURBS } from "@shared/schema";
import logoImage from "@assets/logo_1766462914112.jpeg";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Shield,
  Award,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Service Areas" },
  { href: "/blog", label: "Blog & Tips" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  const allSuburbs = [...SYDNEY_METRO_SUBURBS, ...SOUTHERN_HIGHLANDS_SUBURBS];

  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img 
                src={logoImage} 
                alt="Complete Flow Plumbing" 
                className="h-16 w-auto"
                data-testid="footer-logo"
              />
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Your trusted local plumber serving Sydney and the Southern Highlands. 
              Available 24/7 for emergency plumbing services.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Licensed
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                Insured
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                Guaranteed
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.slug}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/services"
                  className="text-sm text-primary hover:underline"
                >
                  View all services →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, '')}`} 
                  className="flex items-start gap-3 text-foreground hover:text-primary transition-colors"
                  data-testid="footer-phone"
                >
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg font-bold">{BUSINESS_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{BUSINESS_INFO.serviceHours}</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                size="icon" 
                data-testid="footer-facebook"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                data-testid="footer-instagram"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-semibold text-foreground mb-2">Plumber Services Across Sydney & Southern Highlands</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Emergency plumber, blocked drains, hot water systems & gas fitting available across all suburbs.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-1">
            {allSuburbs.map((suburb) => (
              <Link
                key={suburb.id}
                href={`/locations/${suburb.slug}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate"
                data-testid={`footer-suburb-${suburb.slug}`}
              >
                Plumber {suburb.name}
              </Link>
            ))}
          </div>
          <Link
            href="/locations"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            View all {allSuburbs.length} service areas →
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
            <p className="mt-1">ABN: {BUSINESS_INFO.abn} | Licence: {BUSINESS_INFO.licence}</p>
          </div>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
