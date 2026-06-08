import { Layout } from "@/components/layout/layout";
import { QuoteForm } from "@/components/forms/quote-form";
import { Card } from "@/components/ui/card";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Siren } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#0a66c2] via-[#0a5598] to-[#063b66]">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#00d4ff]/15 blur-3xl" />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#9fe3ff] text-sm font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-5">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get in touch for a free quote or call us now for emergency plumbing assistance.
          </p>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-4 bg-emergency">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Siren className="h-5 w-5" />
              <span className="font-semibold">Plumbing Emergency?</span>
            </div>
            <a 
              href={`tel:${BUSINESS_INFO.phoneTel}`}
              className="text-xl font-bold hover:underline flex items-center gap-2"
              data-testid="emergency-phone"
            >
              <Phone className="h-5 w-5" />
              Call Now: {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-primary/5">
        {/* decorative background blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-16 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute top-1/3 right-0 h-72 w-72 rounded-full bg-[#00d4ff]/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        {/* subtle dotted texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(10,102,194,0.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <Card className="p-4">
                  <a 
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="flex items-start gap-4 hover:text-primary transition-colors"
                    data-testid="contact-phone"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <p className="text-xl font-bold text-primary">{BUSINESS_INFO.phone}</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                  </a>
                </Card>

                <Card className="p-4">
                  <a 
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="flex items-start gap-4 hover:text-primary transition-colors"
                    data-testid="contact-email"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-primary">{BUSINESS_INFO.email}</p>
                      <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                    </div>
                  </a>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Service Area</p>
                      <p className="text-muted-foreground">{BUSINESS_INFO.address}</p>
                      <p className="text-sm text-muted-foreground">11 regions across greater Sydney, the Illawarra, Southern Highlands & Southern Tablelands</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Service Hours</p>
                      <p className="text-muted-foreground">{BUSINESS_INFO.serviceHours}</p>
                      <p className="text-sm text-muted-foreground">Emergency services 24/7</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Service area map */}
      <section className="relative">
        <iframe
          src={BUSINESS_INFO.googleMapsUrl}
          title="Complete Flow Plumbing service area"
          className="w-full h-[28rem] border-0 grayscale-[15%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </Layout>
  );
}
