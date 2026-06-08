import { Layout } from "@/components/layout/layout";
import { SEOHead } from "@/components/seo/seo-head";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { BUSINESS_INFO } from "@shared/schema";
import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
}

export function LegalPage({
  title,
  metaTitle,
  metaDescription,
  canonical,
  lastUpdated,
  intro,
  children,
}: LegalPageProps) {
  return (
    <Layout>
      <SEOHead title={metaTitle} description={metaDescription} canonical={canonical} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a66c2] via-[#0a5598] to-[#063b66] py-16 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#00d4ff]/15 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white"
          >
            {title}
          </motion.h1>
          <p className="text-white/80 text-sm mt-4">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-lg text-muted-foreground leading-relaxed mb-12">
            {intro}
          </div>

          <div className="space-y-10">{children}</div>

          {/* Contact callout */}
          <div className="mt-14 rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-background p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground mb-3">
              Questions about this page?
            </h2>
            <p className="text-muted-foreground mb-5">
              Get in touch with {BUSINESS_INFO.name} and we&apos;ll be happy to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                <Phone className="h-5 w-5" />
                {BUSINESS_INFO.phone}
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-card px-6 py-3 font-semibold text-foreground ring-1 ring-border transition hover:border-primary/40"
              >
                <Mail className="h-5 w-5 text-primary" />
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        {heading}
      </h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
