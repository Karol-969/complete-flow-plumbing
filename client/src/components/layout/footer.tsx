import { Link } from "wouter";
import { motion } from "framer-motion";
import { BUSINESS_INFO, SERVICES, REGIONS } from "@shared/schema";
import logoWhite from "@assets/logo-white.png";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

const telHref = `tel:${BUSINESS_INFO.phoneTel}`;

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/locations", label: "Areas We Service" },
  { href: "/blog", label: "Blog & Tips" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
        data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <ChevronRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" />
        <span>{label}</span>
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a66c2] via-[#0a5598] to-[#06365c] text-white">
      {/* atmospheric sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-10 h-64 w-64 rounded-full bg-[#00d4ff]/15 blur-3xl"
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-flex items-center mb-5">
              <img
                src={logoWhite}
                alt="Complete Flow Plumbing"
                className="h-14 w-auto"
                data-testid="footer-logo"
              />
            </Link>
            <p className="text-white/85 text-sm leading-relaxed mb-5 max-w-md">
              Complete Flow Plumbing proudly services the Southern Highlands,
              Wollondilly, Macarthur, the Sutherland Shire, St George, Bayside,
              the Eastern Suburbs, Wollongong &amp; Illawarra, the Blue
              Mountains, Western Sydney, and Goulburn &amp; the Southern
              Tablelands.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
                <ShieldCheck className="h-4 w-4 text-[#7fe0ff]" /> Licensed NSW
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
                <Award className="h-4 w-4 text-[#7fe0ff]" /> Fully Insured
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
                <CheckCircle className="h-4 w-4 text-[#7fe0ff]" />{" "}
                {BUSINESS_INFO.guarantee}
              </span>
            </div>
            <a
              href={BUSINESS_INFO.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
              data-testid="footer-google-review"
            >
              <Star className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
              {BUSINESS_INFO.googleRating}★ · Leave us a Google review
            </a>
          </motion.div>

          {/* Our Services */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold tracking-widest uppercase mb-5 text-white">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {SERVICES.slice(0, 4).map((s) => (
                <FooterLink key={s.id} href={`/services/${s.slug}`} label={s.title} />
              ))}
              <FooterLink href="/services" label="View all services" />
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold tracking-widest uppercase mb-5 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <FooterLink key={l.href} href={l.href} label={l.label} />
              ))}
            </ul>
          </motion.div>

          {/* Areas We Service */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold tracking-widest uppercase mb-5 text-white">
              Areas We Service
            </h3>
            <ul className="space-y-3 text-sm">
              {REGIONS.slice(0, 5).map((r) => (
                <FooterLink
                  key={r.slug}
                  href={`/locations/region/${r.slug}`}
                  label={r.displayName}
                />
              ))}
              <FooterLink href="/locations" label="View all areas" />
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-2"
          >
            <h3 className="text-sm font-bold tracking-widest uppercase mb-5 text-white">
              Complete Flow Plumbing
            </h3>
            <ul className="space-y-4">
              <li>
                <a href={telHref} className="flex items-start gap-3 group" data-testid="footer-phone">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                    <Phone className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-white">Call Us</span>
                    <span className="text-white/85 group-hover:text-white transition-colors">
                      {BUSINESS_INFO.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-3 group"
                  data-testid="footer-email"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                    <Mail className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-white">Email Us</span>
                    <span className="text-white/85 break-all group-hover:text-white transition-colors">
                      {BUSINESS_INFO.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                  <MapPin className="h-4 w-4 text-white" />
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-white">Find Us</span>
                  <span className="text-white/85">{BUSINESS_INFO.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
                  <BadgeCheck className="h-4 w-4 text-white" />
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-white">Our Licence</span>
                  <span className="text-white/85">NSW Lic. {BUSINESS_INFO.licence}</span>
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/75 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
              reserved.
            </p>
            <p className="mt-1">
              ABN: {BUSINESS_INFO.abn} &nbsp;|&nbsp; NSW Licence:{" "}
              <span className="font-medium text-white">{BUSINESS_INFO.licence}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/75 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0a66c2] shadow transition hover:scale-[1.03] active:scale-95"
              data-testid="footer-bottom-call"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
