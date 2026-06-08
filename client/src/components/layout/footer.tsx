import { Link } from "wouter";
import { motion } from "framer-motion";
import { BUSINESS_INFO, SERVICES, REGIONS } from "@shared/schema";
import logoImage from "@assets/logo-dark.png";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

const telHref = `tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`;

const companyLinks = [
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background border-t border-border text-foreground">
      {/* Atmospheric sky blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top columns: Services / Company / Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand + service-area sentence */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src={logoImage}
                alt="Complete Flow Plumbing"
                className="h-16 w-auto rounded-lg"
                data-testid="footer-logo"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Complete Flow Plumbing proudly services Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra and the Southern Tablelands.
            </p>

            {/* Trust badges (true claims only) */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                Licensed NSW
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                Fully Insured
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary" />
                {BUSINESS_INFO.guarantee}
              </div>
            </div>

            {/* Google review CTA — no aggregate claims */}
            <a
              href={BUSINESS_INFO.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground ring-1 ring-border hover:ring-primary rounded-full px-4 py-2 transition-colors"
              data-testid="footer-google-review"
            >
              <Star className="h-4 w-4 text-primary" />
              Leave us a Google review
            </a>
          </motion.div>

          {/* Services */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-primary text-sm font-semibold tracking-widest uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
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
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                  data-testid="footer-all-services"
                >
                  View all services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-primary text-sm font-semibold tracking-widest uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h3 className="text-primary text-sm font-semibold tracking-widest uppercase mb-5">
              Contact
            </h3>

            {/* Click-to-call CTA */}
            <a
              href={telHref}
              className="flex items-center gap-3 bg-primary text-primary-foreground rounded-full px-5 py-3 font-bold shadow-glow hover:brightness-110 transition mb-5"
              data-testid="footer-phone"
            >
              <Phone className="h-5 w-5 flex-shrink-0" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <ul className="space-y-3.5">
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm break-all">{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-emergency flex-shrink-0 mt-0.5" />
                <span className="text-sm">{BUSINESS_INFO.serviceHours}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Service Areas — compact region links (full searchable directory lives on /locations) */}
        <div className="mt-14 pt-10 border-t border-border">
          <h3 className="text-base font-bold text-foreground mb-2">
            Plumber Services Across Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra & the Southern Tablelands
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Emergency plumber, blocked drains, hot water systems & gas fitting available across all 6 regions.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {REGIONS.map((region, i) => (
              <motion.div
                key={region.slug}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link
                  href={`/locations/region/${region.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  data-testid={`footer-region-${region.slug}`}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {region.displayName}
                </Link>
              </motion.div>
            ))}
          </div>
          <Link
            href="/locations"
            className="inline-flex items-center gap-1 mt-7 text-sm font-semibold text-primary hover:gap-2 transition-all"
            data-testid="footer-all-areas"
          >
            View all service areas
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
            </p>
            <p className="mt-1">
              ABN: {BUSINESS_INFO.abn} &nbsp;|&nbsp; NSW Licence:{" "}
              <span className="text-foreground font-medium">{BUSINESS_INFO.licence}</span>
            </p>
          </div>
          <div className="flex gap-5">
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
