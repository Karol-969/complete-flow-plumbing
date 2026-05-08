import { Layout } from "@/components/layout/layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock } from "lucide-react";

import hotWater1    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.35_PM_1766462914108.jpeg";
import gasUnit      from "@assets/WhatsApp_Image_2025-12-18_at_6.50.36_PM_1766462914109.jpeg";
import drainCleaning from "@assets/WhatsApp_Image_2025-12-18_at_6.52.14_PM_1766462914110.jpeg";
import toiletUnblock from "@assets/WhatsApp_Image_2025-12-18_at_6.52.15_PM_1766462914110.jpeg";
import pvcPipe      from "@assets/WhatsApp_Image_2025-12-18_at_6.52.13_PM_1766462914110.jpeg";
import sewerLine    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(3)_1766462914110.jpeg";
import outdoorTap   from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(2)_1766462914111.jpeg";
import pipeRepair   from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_(1)_1766462914111.jpeg";
import waterPipe    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.34_PM_1766462914111.jpeg";
import tapRepair    from "@assets/WhatsApp_Image_2025-12-18_at_6.50.32_PM_(1)_1766462914112.jpeg";
import bathroomReno from "@assets/WhatsApp_Image_2025-12-18_at_6.50.32_PM_1766462914112.jpeg";

const blogPosts = [
  {
    slug: "how-to-shut-off-water-mains",
    title: "How to Shut Off Water at the Mains",
    excerpt: "Learn the essential skill of shutting off your water supply in an emergency. Step-by-step guide with safety tips.",
    category: "DIY Tutorial",
    readTime: "5 min read",
    date: "2024-01-15",
    image: waterPipe,
    imageAlt: "Water pipe and shut-off valve at the mains",
  },
  {
    slug: "burst-pipe-emergency-checklist",
    title: "What to Do If You Have a Burst Pipe",
    excerpt: "Emergency checklist for dealing with a burst pipe. Quick actions that can save you thousands in water damage.",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2024-01-10",
    image: pipeRepair,
    imageAlt: "Emergency burst pipe repair and excavation",
  },
  {
    slug: "how-to-plunge-blocked-toilet",
    title: "How to Plunge a Blocked Toilet Correctly",
    excerpt: "The right technique makes all the difference. Learn how to effectively clear a blocked toilet.",
    category: "DIY Tutorial",
    readTime: "3 min read",
    date: "2024-01-05",
    image: toiletUnblock,
    imageAlt: "Blocked toilet repair and unblocking",
  },
  {
    slug: "clear-slow-drain-safely",
    title: "How to Clear a Slow Drain Safely",
    excerpt: "Tips for clearing slow drains without damaging your pipes or using harsh chemicals.",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2023-12-28",
    image: drainCleaning,
    imageAlt: "Drain cleaning and slow drain repair",
  },
  {
    slug: "check-hidden-leaks-meter-test",
    title: "How to Check for Hidden Leaks (Meter Test)",
    excerpt: "Use your water meter to detect hidden leaks before they cause serious damage to your property.",
    category: "DIY Tutorial",
    readTime: "3 min read",
    date: "2023-12-20",
    image: outdoorTap,
    imageAlt: "Water meter and tap leak check",
  },
  {
    slug: "low-water-pressure-quick-checks",
    title: "Why Your Water Pressure is Low (Quick Checks)",
    excerpt: "Common causes of low water pressure and simple checks you can do before calling a plumber.",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2023-12-15",
    image: tapRepair,
    imageAlt: "Low water pressure tap inspection",
  },
  {
    slug: "no-hot-water-troubleshooting",
    title: "No Hot Water Troubleshooting Guide",
    excerpt: "Basic troubleshooting steps for gas and electric hot water systems when you have no hot water.",
    category: "DIY Tutorial",
    readTime: "5 min read",
    date: "2023-12-10",
    image: hotWater1,
    imageAlt: "Hot water system troubleshooting",
  },
  {
    slug: "signs-of-gas-leak",
    title: "Signs of a Gas Leak and What to Do Immediately",
    excerpt: "How to identify a gas leak and the critical safety steps you must take immediately.",
    category: "Safety",
    readTime: "3 min read",
    date: "2023-12-05",
    image: gasUnit,
    imageAlt: "Gas unit and gas leak safety",
  },
  {
    slug: "blocked-drains-bowral",
    title: "Blocked Drains in Bowral: Causes & Fixes",
    excerpt: "Common causes of blocked drains in Bowral homes and how local conditions affect your plumbing.",
    category: "Local Tips",
    readTime: "4 min read",
    date: "2023-11-28",
    image: drainCleaning,
    imageAlt: "Blocked drain cleaning in Bowral",
  },
  {
    slug: "when-to-book-cctv-drain-inspection",
    title: "When to Book a CCTV Drain Inspection",
    excerpt: "Signs that indicate you need a professional drain camera inspection and what to expect.",
    category: "Advice",
    readTime: "4 min read",
    date: "2023-11-20",
    image: pvcPipe,
    imageAlt: "CCTV drain camera inspection of pipes",
  },
  {
    slug: "what-is-pipe-relining",
    title: "What is Pipe Relining? A Simple Explanation",
    excerpt: "Understanding no-dig pipe repair: how it works, when it's needed, and why it saves money.",
    category: "Advice",
    readTime: "5 min read",
    date: "2023-11-15",
    image: pvcPipe,
    imageAlt: "Pipe relining and new PVC pipe installation",
  },
  {
    slug: "prevent-tree-root-damage-pipes",
    title: "Preventing Tree Root Damage in Pipes",
    excerpt: "Maintenance tips to prevent tree roots from invading and damaging your sewer and drain pipes.",
    category: "Maintenance",
    readTime: "4 min read",
    date: "2023-11-10",
    image: sewerLine,
    imageAlt: "Sewer line excavation showing tree root damage",
  },
  {
    slug: "emergency-plumber-sydney-when-to-call",
    title: "Emergency Plumber Sydney: When to Call vs DIY",
    excerpt: "Not every plumbing issue needs an emergency callout. Learn which problems require an immediate plumber and which can wait.",
    category: "Advice",
    readTime: "5 min read",
    date: "2024-02-10",
    image: sewerLine,
    imageAlt: "Emergency plumber dig-up and pipe repair Sydney",
  },
  {
    slug: "how-much-does-a-plumber-cost-sydney",
    title: "How Much Does a Plumber Cost in Sydney? (2024 Guide)",
    excerpt: "Sydney plumbing prices explained. Average costs for common jobs including blocked drains, hot water systems, and emergency callouts.",
    category: "Pricing",
    readTime: "6 min read",
    date: "2024-02-05",
    image: bathroomReno,
    imageAlt: "Plumbing work for bathroom renovation in Sydney",
  },
  {
    slug: "best-hot-water-system-sydney-homes",
    title: "Best Hot Water System for Sydney Homes in 2024",
    excerpt: "Gas, electric, heat pump or solar? We compare the best hot water systems for Sydney's climate and energy costs.",
    category: "Advice",
    readTime: "7 min read",
    date: "2024-01-28",
    image: hotWater1,
    imageAlt: "Best hot water system for Sydney homes",
  },
  {
    slug: "blocked-drains-sydney-tree-roots",
    title: "Blocked Drains Sydney: Why Tree Roots Are the #1 Cause",
    excerpt: "Sydney's older suburbs have a blocked drain epidemic. Here's why tree roots are the main culprit and what you can do about it.",
    category: "Local Tips",
    readTime: "5 min read",
    date: "2024-01-22",
    image: sewerLine,
    imageAlt: "Blocked drain excavation showing tree root intrusion in Sydney",
  },
  {
    slug: "gas-plumber-sydney-licence-requirements",
    title: "Gas Plumber Sydney: What Work Requires a Licensed Plumber?",
    excerpt: "NSW law is strict about gas work. Here's exactly what requires a licensed gas plumber and why you should never DIY gas installations.",
    category: "Safety",
    readTime: "4 min read",
    date: "2024-01-18",
    image: gasUnit,
    imageAlt: "Licensed gas plumber installing a gas unit in Sydney",
  },
  {
    slug: "pipe-relining-vs-replacement-sydney",
    title: "Pipe Relining vs Pipe Replacement: Which Is Better for Sydney Homes?",
    excerpt: "Is pipe relining worth the cost? We compare no-dig relining vs full pipe replacement for Sydney's clay and terracotta pipe systems.",
    category: "Advice",
    readTime: "6 min read",
    date: "2024-01-12",
    image: pvcPipe,
    imageAlt: "Pipe relining vs pipe replacement comparison",
  },
  {
    slug: "hot-water-not-working-sydney",
    title: "No Hot Water in Sydney? Here's What to Check First",
    excerpt: "Before calling a plumber, try these quick checks. Gas pilot light, circuit breakers, and relief valves explained simply.",
    category: "DIY Tutorial",
    readTime: "4 min read",
    date: "2024-01-08",
    image: hotWater1,
    imageAlt: "Hot water system not working - troubleshooting guide",
  },
  {
    slug: "plumber-campbelltown-local-guide",
    title: "Finding a Reliable Plumber in Campbelltown: Local Guide",
    excerpt: "What to look for when hiring a plumber in Campbelltown and surrounding areas. Licensing, insurance, and red flags to avoid.",
    category: "Local Tips",
    readTime: "4 min read",
    date: "2024-01-02",
    image: tapRepair,
    imageAlt: "Licensed plumber repairing tap in Campbelltown",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "DIY Tutorial":
      return "bg-primary/10 text-primary";
    case "Safety":
      return "bg-emergency/10 text-emergency";
    case "Local Tips":
      return "bg-success/10 text-success";
    case "Pricing":
      return "bg-accent/10 text-accent-foreground";
    case "Advice":
      return "bg-primary/10 text-primary";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function Blog() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Plumbing Tips & Advice
            </h1>
            <p className="text-xl text-white/90">
              Helpful articles, DIY tutorials, and expert advice from your local 
              plumbing professionals. Learn how to handle common plumbing issues 
              and know when to call a licensed plumber.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.slug} 
                className="overflow-hidden hover-elevate group"
                data-testid={`blog-post-${index}`}
              >
                {/* Blog image */}
                <div className="h-48 overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <Badge className={`mb-3 ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </Badge>
                  
                  <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-AU', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-medium text-sm hover:underline mt-4"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Have a Plumbing Question?
          </h2>
          <p className="text-muted-foreground mb-8">
            If you can't find the answer you're looking for, get in touch with our team. 
            We're always happy to help!
          </p>
          <Button asChild size="lg" data-testid="blog-contact">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
