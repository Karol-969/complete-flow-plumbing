import fs from "fs";
import path from "path";
import { BUSINESS_INFO, SERVICES, TESTIMONIALS, HOME_FAQS } from "@shared/schema";

const CMS_FILE = path.resolve(import.meta.dirname, "..", "cms-data.json");

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface TrackingConfig {
  googleAnalyticsId: string;
  googleTagManagerId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  facebookPixelId: string;
  facebookConversionsApi: string;
  hotjarId: string;
  customHeadScripts: string;
  customBodyScripts: string;
}

export interface CmsData {
  pageSEO: Record<string, PageSEO>;
  businessInfo: typeof BUSINESS_INFO;
  services: Array<{
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    icon: string;
    category: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    suburb: string;
    service: string;
    rating: number;
    text: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  tracking: TrackingConfig;
}

function getDefaults(): CmsData {
  return {
    pageSEO: {
      home: {
        title: "Plumber Sydney | #1 Emergency & Same-Day Plumbing | Complete Flow Plumbing",
        description: "Sydney's trusted local plumber. 24/7 emergency plumber, blocked drains, hot water systems, gas fitting & leak detection. Licensed NSW plumbers. No call-out fee. Call 0468 723 029 now!",
        keywords: ["plumber sydney", "emergency plumber sydney", "24/7 plumber sydney", "plumber southern highlands", "blocked drains sydney", "hot water system sydney", "gas plumber sydney", "leak detection sydney", "licensed plumber nsw", "local plumber near me"],
      },
      about: {
        title: "About Us | Complete Flow Plumbing",
        description: "Learn about Complete Flow Plumbing — licensed, insured plumbers serving Sydney & Southern Highlands. 15+ years experience, 5000+ jobs completed.",
        keywords: ["about complete flow plumbing", "licensed plumber sydney", "plumbing company southern highlands"],
      },
      services: {
        title: "Our Plumbing Services | Complete Flow Plumbing",
        description: "Full range of plumbing services in Sydney & Southern Highlands. Emergency plumbing, blocked drains, hot water, gas fitting, leak detection & more.",
        keywords: ["plumbing services sydney", "blocked drains", "hot water systems", "gas fitting", "leak detection"],
      },
      locations: {
        title: "Service Areas | Complete Flow Plumbing",
        description: "Complete Flow Plumbing services Sydney & Southern Highlands. Find your local plumber in Bowral, Mittagong, Moss Vale, Campbelltown, Camden & more.",
        keywords: ["plumber near me", "plumber southern highlands", "plumber sydney suburbs"],
      },
      contact: {
        title: "Contact Us | Complete Flow Plumbing",
        description: "Get in touch with Complete Flow Plumbing. Call 0468 723 029 for emergency plumbing or request a free quote online.",
        keywords: ["contact plumber sydney", "plumbing quote", "emergency plumber phone"],
      },
      blog: {
        title: "Plumbing Tips & Blog | Complete Flow Plumbing",
        description: "Expert plumbing tips, DIY guides, and industry insights from Complete Flow Plumbing. Learn how to handle common plumbing issues.",
        keywords: ["plumbing tips", "plumbing blog", "DIY plumbing", "plumbing advice sydney"],
      },
    },
    businessInfo: { ...BUSINESS_INFO },
    services: SERVICES.map(s => ({ ...s })),
    testimonials: TESTIMONIALS.map(t => ({ ...t })),
    faqs: HOME_FAQS.map(f => ({ ...f })),
    tracking: {
      googleAnalyticsId: "",
      googleTagManagerId: "",
      googleAdsId: "",
      googleAdsConversionLabel: "",
      facebookPixelId: "",
      facebookConversionsApi: "",
      hotjarId: "",
      customHeadScripts: "",
      customBodyScripts: "",
    },
  };
}

function load(): CmsData {
  try {
    if (fs.existsSync(CMS_FILE)) {
      const raw = fs.readFileSync(CMS_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
    // fall through to defaults
  }
  const defaults = getDefaults();
  save(defaults);
  return defaults;
}

function save(data: CmsData): void {
  fs.writeFileSync(CMS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

let cmsData: CmsData = load();

export const cmsStore = {
  getAll(): CmsData {
    return cmsData;
  },

  getPageSEO(page: string): PageSEO | undefined {
    return cmsData.pageSEO[page];
  },

  updatePageSEO(page: string, seo: PageSEO): void {
    cmsData.pageSEO[page] = seo;
    save(cmsData);
  },

  getBusinessInfo() {
    return cmsData.businessInfo;
  },

  updateBusinessInfo(info: typeof BUSINESS_INFO): void {
    cmsData.businessInfo = info;
    save(cmsData);
  },

  getServices() {
    return cmsData.services;
  },

  updateService(id: string, data: CmsData["services"][0]): void {
    const idx = cmsData.services.findIndex(s => s.id === id);
    if (idx !== -1) {
      cmsData.services[idx] = data;
      save(cmsData);
    }
  },

  addService(data: CmsData["services"][0]): void {
    cmsData.services.push(data);
    save(cmsData);
  },

  deleteService(id: string): void {
    cmsData.services = cmsData.services.filter(s => s.id !== id);
    save(cmsData);
  },

  getTestimonials() {
    return cmsData.testimonials;
  },

  updateTestimonial(id: string, data: CmsData["testimonials"][0]): void {
    const idx = cmsData.testimonials.findIndex(t => t.id === id);
    if (idx !== -1) {
      cmsData.testimonials[idx] = data;
      save(cmsData);
    }
  },

  addTestimonial(data: CmsData["testimonials"][0]): void {
    cmsData.testimonials.push(data);
    save(cmsData);
  },

  deleteTestimonial(id: string): void {
    cmsData.testimonials = cmsData.testimonials.filter(t => t.id !== id);
    save(cmsData);
  },

  getFAQs() {
    return cmsData.faqs;
  },

  updateFAQs(faqs: CmsData["faqs"]): void {
    cmsData.faqs = faqs;
    save(cmsData);
  },

  getTracking(): TrackingConfig {
    return cmsData.tracking;
  },

  updateTracking(tracking: TrackingConfig): void {
    cmsData.tracking = tracking;
    save(cmsData);
  },

  reload(): void {
    cmsData = load();
  },
};
