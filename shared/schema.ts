import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number required"),
  email: z.union([z.string().email("Valid email required"), z.literal("")]).optional(),
  suburb: z.string().min(1, "Please select a suburb"),
  serviceType: z.string().min(1, "Please select a service"),
  urgency: z.enum(["emergency", "today", "this_week", "flexible"]),
  message: z.string().optional(),
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;


export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please provide more details"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;


export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  category: "drainage" | "hot-water" | "gas" | "leak-detection" | "emergency";
}


export interface Location {
  id: string;
  slug: string;
  name: string;
  region: "southern-highlands" | "sydney-metro";
}


export interface Testimonial {
  id: string;
  name: string;
  suburb: string;
  service: string;
  rating: number;
  text: string;
}


export interface FAQ {
  question: string;
  answer: string;
}


export const BUSINESS_INFO = {
  name: "Complete Flow Plumbing",
  phone: "0468 723 029",
  email: "completeflowplumbing@gmail.com",
  abn: "45 685 684 020",
  licence: "395338C",
  address: "Sydney & Southern Highlands, NSW",
  serviceHours: "24/7 Emergency Service",
  googleReviewLink: "https://g.page/r/complete-flow-plumbing/review",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.1027831!2d150.3500!3d-34.4700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a5f2aa4a9cc1%3A0x5017d681632ccc0!2sSouthern%20Highlands%2C%20NSW!5e0!3m2!1sen!2sau!4v1703000000000!5m2!1sen!2sau",
  googleMapsSearchUrl: "https://www.google.com/maps/search/Complete+Flow+Plumbing",
  tagline: "Your Local Emergency & Same-Day Plumber",
  guarantee: "Workmanship Guarantee",
} as const;


export const WORK_IMAGES = [
  { id: "1", src: "WhatsApp_Image_2025-12-18_at_6.50.35_PM_1766462914108.jpeg", alt: "Rheem hot water system installation", category: "hot-water" },
  { id: "2", src: "WhatsApp_Image_2025-12-18_at_6.50.36_PM_1766462914109.jpeg", alt: "Rinnai gas continuous flow hot water unit", category: "gas" },
  { id: "3", src: "WhatsApp_Image_2025-12-18_at_6.52.14_PM_1766462914110.jpeg", alt: "Drain cleaning and unblocking work", category: "drainage" },
  { id: "4", src: "WhatsApp_Image_2025-12-18_at_6.52.15_PM_1766462914110.jpeg", alt: "Toilet unblocking service", category: "drainage" },
  { id: "5", src: "WhatsApp_Image_2025-12-18_at_6.52.13_PM_1766462914110.jpeg", alt: "PVC pipe installation", category: "drainage" },
  { id: "6", src: "WhatsApp_Image_2025-12-18_at_6.50.34_PM_(3)_1766462914110.jpeg", alt: "Sewer line installation", category: "drainage" },
  { id: "7", src: "WhatsApp_Image_2025-12-18_at_6.50.34_PM_(2)_1766462914111.jpeg", alt: "Outdoor tap repair", category: "leak-detection" },
  { id: "8", src: "WhatsApp_Image_2025-12-18_at_6.50.34_PM_(1)_1766462914111.jpeg", alt: "Pipe repair and leak fix", category: "leak-detection" },
  { id: "9", src: "WhatsApp_Image_2025-12-18_at_6.50.34_PM_1766462914111.jpeg", alt: "Water pipe installation", category: "leak-detection" },
  { id: "10", src: "WhatsApp_Image_2025-12-18_at_6.50.33_PM_1766462914112.jpeg", alt: "Toilet seat replacement", category: "emergency" },
  { id: "11", src: "WhatsApp_Image_2025-12-18_at_6.50.32_PM_(1)_1766462914112.jpeg", alt: "Tap and valve repair", category: "leak-detection" },
  { id: "12", src: "WhatsApp_Image_2025-12-18_at_6.50.32_PM_1766462914112.jpeg", alt: "Bathroom renovation plumbing", category: "emergency" },
] as const;


export const SERVICES: Service[] = [
  { id: "1", slug: "emergency-plumber-sydney", title: "Emergency Plumber Sydney (24/7)", shortDescription: "Immediate response for urgent plumbing emergencies, available around the clock.", icon: "Siren", category: "emergency" },
  { id: "2", slug: "blocked-drains", title: "Blocked Drains & Drain Cleaning", shortDescription: "Fast, effective drain clearing using the latest equipment.", icon: "PipeSolid", category: "drainage" },
  { id: "3", slug: "hydro-jetting", title: "Hydro Jetting", shortDescription: "High-pressure water jetting to clear stubborn blockages.", icon: "Droplets", category: "drainage" },
  { id: "4", slug: "cctv-drain-inspection", title: "CCTV Drain Camera Inspection", shortDescription: "See exactly what's happening inside your pipes.", icon: "Camera", category: "drainage" },
  { id: "5", slug: "pipe-relining", title: "Pipe Relining", shortDescription: "No-dig pipe repair that saves your property from excavation.", icon: "Wrench", category: "drainage" },
  { id: "6", slug: "hot-water-systems", title: "Hot Water Systems", shortDescription: "Repair, replacement & installation of all hot water system types.", icon: "Flame", category: "hot-water" },
  { id: "7", slug: "gas-fitting", title: "Gas Fitting & Gas Plumbing", shortDescription: "Licensed gas fitters for safe installation and repairs.", icon: "Fuel", category: "gas" },
  { id: "8", slug: "leak-detection", title: "Leak Detection & Repair", shortDescription: "Find and fix hidden leaks before they cause damage.", icon: "Search", category: "leak-detection" },
  { id: "9", slug: "toilet-repair", title: "Toilet Repair & Unblock", shortDescription: "Quick fixes for blocked, running, or leaking toilets.", icon: "Bath", category: "leak-detection" },
];


export const SOUTHERN_HIGHLANDS_SUBURBS: Location[] = [
  { id: "1", slug: "run-o-waters", name: "Run-O-Waters", region: "southern-highlands" },
  { id: "2", slug: "brisbane-grove", name: "Brisbane Grove", region: "southern-highlands" },
  { id: "3", slug: "marulan", name: "Marulan", region: "southern-highlands" },
  { id: "4", slug: "towrang", name: "Towrang", region: "southern-highlands" },
  { id: "5", slug: "boxers-creek", name: "Boxers Creek", region: "southern-highlands" },
  { id: "6", slug: "bungonia", name: "Bungonia", region: "southern-highlands" },
  { id: "7", slug: "tallong", name: "Tallong", region: "southern-highlands" },
  { id: "8", slug: "brayton", name: "Brayton", region: "southern-highlands" },
  { id: "9", slug: "wingello", name: "Wingello", region: "southern-highlands" },
  { id: "10", slug: "penrose", name: "Penrose", region: "southern-highlands" },
  { id: "11", slug: "bundanoon", name: "Bundanoon", region: "southern-highlands" },
  { id: "12", slug: "exeter", name: "Exeter", region: "southern-highlands" },
  { id: "13", slug: "sutton-forest", name: "Sutton Forest", region: "southern-highlands" },
  { id: "14", slug: "berrima", name: "Berrima", region: "southern-highlands" },
  { id: "15", slug: "new-berrima", name: "New Berrima", region: "southern-highlands" },
  { id: "16", slug: "moss-vale", name: "Moss Vale", region: "southern-highlands" },
  { id: "17", slug: "renwick", name: "Renwick", region: "southern-highlands" },
  { id: "18", slug: "burradoo", name: "Burradoo", region: "southern-highlands" },
  { id: "19", slug: "bowral", name: "Bowral", region: "southern-highlands" },
  { id: "20", slug: "east-bowral", name: "East Bowral", region: "southern-highlands" },
  { id: "21", slug: "mittagong", name: "Mittagong", region: "southern-highlands" },
  { id: "22", slug: "welby", name: "Welby", region: "southern-highlands" },
  { id: "23", slug: "balaclava", name: "Balaclava", region: "southern-highlands" },
  { id: "24", slug: "braemar", name: "Braemar", region: "southern-highlands" },
  { id: "25", slug: "willow-vale", name: "Willow Vale", region: "southern-highlands" },
  { id: "26", slug: "colo-vale", name: "Colo Vale", region: "southern-highlands" },
  { id: "27", slug: "hill-top", name: "Hill Top", region: "southern-highlands" },
  { id: "28", slug: "yerrinbool", name: "Yerrinbool", region: "southern-highlands" },
  { id: "29", slug: "alpine", name: "Alpine", region: "southern-highlands" },
  { id: "30", slug: "robertson", name: "Robertson", region: "southern-highlands" },
  { id: "31", slug: "avoca", name: "Avoca", region: "southern-highlands" },
  { id: "32", slug: "kangaloon", name: "Kangaloon", region: "southern-highlands" },
  { id: "33", slug: "east-kangaloon", name: "East Kangaloon", region: "southern-highlands" },
  { id: "34", slug: "burrawang", name: "Burrawang", region: "southern-highlands" },
  { id: "35", slug: "wildes-meadow", name: "Wildes Meadow", region: "southern-highlands" },
  { id: "36", slug: "knights-hill", name: "Knight's Hill", region: "southern-highlands" },
  { id: "37", slug: "upper-kangaroo-river", name: "Upper Kangaroo River", region: "southern-highlands" },
  { id: "38", slug: "balmoral", name: "Balmoral", region: "southern-highlands" },
  { id: "39", slug: "couridjah", name: "Couridjah", region: "southern-highlands" },
  { id: "40", slug: "tahmoor", name: "Tahmoor", region: "southern-highlands" },
  { id: "41", slug: "thirlmere", name: "Thirlmere", region: "southern-highlands" },
  { id: "42", slug: "buxton", name: "Buxton", region: "southern-highlands" },
  { id: "43", slug: "picton", name: "Picton", region: "southern-highlands" },
  { id: "44", slug: "lakesland", name: "Lakesland", region: "southern-highlands" },
];


export const SYDNEY_METRO_SUBURBS: Location[] = [
  { id: "s1", slug: "parramatta", name: "Parramatta", region: "sydney-metro" },
  { id: "s2", slug: "blacktown", name: "Blacktown", region: "sydney-metro" },
  { id: "s3", slug: "penrith", name: "Penrith", region: "sydney-metro" },
  { id: "s4", slug: "castle-hill", name: "Castle Hill", region: "sydney-metro" },
  { id: "s5", slug: "liverpool", name: "Liverpool", region: "sydney-metro" },
  { id: "s6", slug: "campbelltown", name: "Campbelltown", region: "sydney-metro" },
  { id: "s7", slug: "bondi", name: "Bondi", region: "sydney-metro" },
  { id: "s8", slug: "randwick", name: "Randwick", region: "sydney-metro" },
  { id: "s9", slug: "marrickville", name: "Marrickville", region: "sydney-metro" },
  { id: "s10", slug: "newtown", name: "Newtown", region: "sydney-metro" },
  { id: "s11", slug: "chatswood", name: "Chatswood", region: "sydney-metro" },
  { id: "s12", slug: "hornsby", name: "Hornsby", region: "sydney-metro" },
  { id: "s13", slug: "cronulla", name: "Cronulla", region: "sydney-metro" },
  { id: "s14", slug: "manly", name: "Manly", region: "sydney-metro" },
  { id: "s15", slug: "ryde", name: "Ryde", region: "sydney-metro" },
  { id: "s16", slug: "bankstown", name: "Bankstown", region: "sydney-metro" },
  { id: "s17", slug: "hurstville", name: "Hurstville", region: "sydney-metro" },
  { id: "s18", slug: "baulkham-hills", name: "Baulkham Hills", region: "sydney-metro" },
  { id: "s19", slug: "kellyville", name: "Kellyville", region: "sydney-metro" },
  { id: "s20", slug: "camden", name: "Camden", region: "sydney-metro" },
  { id: "s21", slug: "narellan", name: "Narellan", region: "sydney-metro" },
  { id: "s22", slug: "oran-park", name: "Oran Park", region: "sydney-metro" },
  { id: "s23", slug: "gregory-hills", name: "Gregory Hills", region: "sydney-metro" },
  { id: "s24", slug: "mount-annan", name: "Mount Annan", region: "sydney-metro" },
  { id: "s25", slug: "harrington-park", name: "Harrington Park", region: "sydney-metro" },
  { id: "s26", slug: "gledswood-hills", name: "Gledswood Hills", region: "sydney-metro" },
  { id: "s27", slug: "appin", name: "Appin", region: "sydney-metro" },
  { id: "s28", slug: "wollondilly", name: "Wollondilly", region: "sydney-metro" },
  { id: "s29", slug: "st-marys", name: "St Marys", region: "sydney-metro" },
  { id: "s30", slug: "glenmore-park", name: "Glenmore Park", region: "sydney-metro" },
  { id: "s31", slug: "werrington", name: "Werrington", region: "sydney-metro" },
  { id: "s32", slug: "fairfield", name: "Fairfield", region: "sydney-metro" },
  { id: "s33", slug: "cabramatta", name: "Cabramatta", region: "sydney-metro" },
  { id: "s34", slug: "prestons", name: "Prestons", region: "sydney-metro" },
  { id: "s35", slug: "moorebank", name: "Moorebank", region: "sydney-metro" },
  { id: "s36", slug: "macquarie-fields", name: "Macquarie Fields", region: "sydney-metro" },
  { id: "s37", slug: "ingleburn", name: "Ingleburn", region: "sydney-metro" },
  { id: "s38", slug: "minto", name: "Minto", region: "sydney-metro" },
  { id: "s39", slug: "leumeah", name: "Leumeah", region: "sydney-metro" },
  { id: "s40", slug: "ambarvale", name: "Ambarvale", region: "sydney-metro" },
  { id: "s41", slug: "rosemeadow", name: "Rosemeadow", region: "sydney-metro" },
  { id: "s42", slug: "eagle-vale", name: "Eagle Vale", region: "sydney-metro" },
  { id: "s43", slug: "claymore", name: "Claymore", region: "sydney-metro" },
  { id: "s44", slug: "raby", name: "Raby", region: "sydney-metro" },
  { id: "s45", slug: "blairmount", name: "Blairmount", region: "sydney-metro" },
];


export const ALL_LOCATIONS = [...SOUTHERN_HIGHLANDS_SUBURBS, ...SYDNEY_METRO_SUBURBS];


export const TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "Sarah M.", suburb: "Bowral", service: "Emergency Plumber", rating: 5, text: "Called at 10pm with a burst pipe. Complete Flow arrived within 30 minutes and had it fixed by midnight. Absolute lifesavers!" },
  { id: "2", name: "James T.", suburb: "Mittagong", service: "Hot Water System", rating: 5, text: "Our hot water system died on a cold winter morning. Same-day replacement and the team was professional, clean, and explained everything clearly." },
  { id: "3", name: "Michelle P.", suburb: "Moss Vale", service: "Blocked Drains", rating: 5, text: "They used a camera to find a tree root blockage and cleared it with hydro jetting. No mess, no stress. Highly recommend!" },
  { id: "4", name: "David L.", suburb: "Bundanoon", service: "Gas Fitting", rating: 5, text: "Licensed, insured, and on time. Had our new gas cooktop installed perfectly. Will use again for all plumbing needs." },
  { id: "5", name: "Karen W.", suburb: "Picton", service: "Leak Detection", rating: 5, text: "Found a hidden leak in our bathroom that was causing mould. Fixed it quickly and saved us thousands in potential damage." },
  { id: "6", name: "Robert H.", suburb: "Thirlmere", service: "Toilet Repair", rating: 5, text: "Quick response for a blocked toilet on a Sunday. Fair pricing with no call-out fee. Great local plumbers!" },
];


export const HOME_FAQS: FAQ[] = [
  { question: "Do you offer 24/7 emergency plumbing services?", answer: "Yes! Complete Flow Plumbing provides 24/7 emergency plumbing services across Sydney and the Southern Highlands. We understand that plumbing emergencies don't wait for business hours, so neither do we." },
  { question: "How quickly can you respond to an emergency?", answer: "For emergency call-outs, we aim to arrive within 60 minutes in our primary service areas. Our team is strategically located to provide fast response times across all suburbs we service." },
  { question: "Do you provide free quotes?", answer: "Yes, we provide free, no-obligation quotes for all plumbing work. For most jobs, we can give you an upfront fixed price before any work begins, so there are no surprises." },
  { question: "Are your plumbers licensed and insured?", answer: "Absolutely. All our plumbers are fully licensed, insured, and undergo regular training. We hold all required NSW trade licences and comprehensive insurance coverage." },
  { question: "What areas do you service?", answer: "We service the entire Southern Highlands region including Bowral, Mittagong, Moss Vale, and surrounding suburbs, as well as Greater Sydney metropolitan areas." },
  { question: "Do you charge a call-out fee?", answer: "No call-out fee for standard service calls during business hours. Emergency after-hours calls may incur a small surcharge, which we always communicate upfront." },
  { question: "What payment methods do you accept?", answer: "We accept cash, EFTPOS, credit cards (Visa, Mastercard, Amex), and bank transfer. Payment is due upon completion of work." },
  { question: "Do you offer any guarantees on your work?", answer: "Yes, all our workmanship comes with a guarantee. We stand behind the quality of our work and will return to fix any issues at no additional cost within the guarantee period." },
];
