import { Layout } from "@/components/layout/layout";
import { QuoteForm } from "@/components/forms/quote-form";
import { Card } from "@/components/ui/card";
import { BUSINESS_INFO } from "@shared/schema";
import { Phone, Mail, MapPin, Clock, Siren } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
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
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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
                      <p className="text-sm text-muted-foreground">Sutherland Shire, Wollondilly, Southern Highlands, Wollongong, Illawarra & Southern Tablelands</p>
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

      {/* Map placeholder */}
      <section className="h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground">Service Area Map</p>
            <p className="text-sm text-muted-foreground mt-2">
              [EMBED GOOGLE MAP HERE showing service area]
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
