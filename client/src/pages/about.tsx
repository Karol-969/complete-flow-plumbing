import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BUSINESS_INFO } from "@shared/schema";
import teamVanImage from "@assets/image_1766464585703.png";
import { 
  Shield, 
  Award, 
  Users, 
  Clock, 
  Wrench, 
  Heart,
  Phone,
  CheckCircle
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "All our plumbers are fully licensed with NSW Fair Trading and carry comprehensive insurance.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "We respect your time. Our plumbers arrive within the scheduled window, every time.",
  },
  {
    icon: Award,
    title: "Quality Workmanship",
    description: "We stand behind our work with a comprehensive workmanship guarantee on all jobs.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We go above and beyond to exceed expectations.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Jobs Completed" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Emergency Service" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Complete Flow Plumbing
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted local plumbers serving the Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, the Illawarra and the Southern Tablelands
            with professional, reliable plumbing services since 2008.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Complete Flow Plumbing was founded with a simple mission: to provide 
                  the highest quality plumbing services with complete transparency and 
                  exceptional customer care.
                </p>
                <p>
                  What started as a small family operation has grown into a trusted team
                  of licensed plumbers serving homes and businesses across the Sutherland Shire,
                  Wollondilly, the beautiful Southern Highlands, Wollongong, the Illawarra and the Southern Tablelands.
                </p>
                <p>
                  We've built our reputation on reliability, honest pricing, and workmanship 
                  that stands the test of time. Our team uses the latest technology including 
                  CCTV drain cameras, hydro jetting equipment, and pipe relining systems to 
                  provide modern solutions to traditional plumbing problems.
                </p>
                <p>
                  Whether it's a 2 AM emergency or a scheduled hot water installation, 
                  we treat every job with the same level of professionalism and care.
                </p>
              </div>
            </div>

            {/* Team photo */}
            <div className="relative rounded-lg border border-border overflow-hidden">
              <img 
                src={teamVanImage} 
                alt="Complete Flow Plumbing team and service van" 
                className="w-full h-auto object-cover"
                data-testid="team-photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-6 text-center"
                data-testid={`value-${index}`}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Van photo */}
            <div className="relative rounded-lg border border-border overflow-hidden order-2 lg:order-1">
              <img 
                src={teamVanImage} 
                alt="Complete Flow Plumbing fully equipped service van" 
                className="w-full h-auto object-cover"
                data-testid="van-photo"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Complete Flow?
              </h2>
              <ul className="space-y-4">
                {[
                  "Licensed and fully insured plumbers",
                  "24/7 emergency service availability",
                  "Upfront, transparent pricing - no hidden fees",
                  "Same-day service for most jobs",
                  "Clean and respectful - we leave no mess",
                  "Modern equipment including CCTV and hydro jetting",
                  "Comprehensive workmanship guarantee",
                  "Locally owned and operated",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" data-testid="about-contact">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" size="lg" data-testid="about-call">
                  <a href={`tel:${BUSINESS_INFO.phoneTel}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call: {BUSINESS_INFO.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
