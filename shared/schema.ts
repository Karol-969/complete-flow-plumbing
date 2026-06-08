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

// Quote request schema
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

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please provide more details"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Service type for frontend
export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  category: "drainage" | "hot-water" | "gas" | "leak-detection" | "emergency";
}

// Location/suburb type
export interface Location {
  id: string;
  slug: string;
  name: string;
  region:
    | "southern-highlands"
    | "wollondilly"
    | "macarthur"
    | "sutherland-shire"
    | "st-george"
    | "bayside"
    | "eastern-suburbs"
    | "wollongong-illawarra"
    | "blue-mountains"
    | "western-sydney"
    | "goulburn-southern-tablelands";
  postcode?: string;
  nearby?: string[];
}

// Service region type
export interface Region {
  slug: string;
  name: string;
  displayName: string;
  theName: string;
  blurb: string;
  localAngle: string;
  commonIssues: string[];
  targetKeywords: string[];
}

// Testimonial type
export interface Testimonial {
  id: string;
  name: string;
  suburb: string;
  service: string;
  rating: number;
  text: string;
}

// Google review type
export interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  date?: string;
  initial?: string;
}

// Real Google reviews for the business.
// IMPORTANT: keep this truthful — only the client's REAL Google reviews go here.
// Real, verbatim customer reviews from Complete Flow Plumbing's Google listing.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Nikki Riesel",
    rating: 5,
    date: "8 months ago",
    text: "The most incredible, professional plumbing service I have ever used! I genuinely couldn't recommend Complete Flow Plumbing more. They replaced a new toilet in my bathroom that was complex to install, however the team made the whole process feel seamless. They were extremely accommodating and easy to communicate with. Thank you again for the excellent work!",
  },
  {
    name: "Suraj Sitaula",
    rating: 5,
    date: "8 months ago",
    text: "I had a problem with my water pressure and called a couple of plumbers, but it was so hard to get one asap. I called Complete Flow Plumbing and David answered, well spoken, and within 30 mins was at my house sorting it out for me. David, you are a champion. My wife and kids are happy now.",
  },
  {
    name: "Alexander Pegios",
    rating: 5,
    date: "8 months ago",
    text: "I needed a plumber ASAP and David understood my urgency. I rang a couple of other companies who didn't treat my problem like it was important enough. David came out, was swift in identifying and solving the problem and was incredibly easy to deal with. I am 100% going to use David again. Would highly recommend!",
  },
  {
    name: "Jahirul Islam",
    rating: 5,
    date: "8 months ago",
    text: "David from Complete Flow Plumbing provided exceptional service repairing a busted pipe at my home. He was punctual, knowledgeable, and meticulous, ensuring the issue was resolved efficiently and effectively. I highly recommend David and Complete Flow Plumbing for anyone seeking reliable, high-quality plumbing services.",
  },
  {
    name: "Eucharist Pati",
    rating: 5,
    date: "8 months ago",
    text: "David from Complete Flow Plumbing did a fantastic job helping my uncle with his plumbing needs. He was prompt, professional, and explained everything clearly so my uncle knew what was going on. The work was done quickly and to a really high standard. We couldn't be happier with the service – thanks again, David!",
  },
  {
    name: "Mark Supple",
    rating: 5,
    date: "8 months ago",
    text: "I cannot talk highly enough of the service and quality of work I received from David at Complete Flow Plumbing. He was helpful on the phone, quick to come out, fast to locate and fix the issue, and was in and out in under an hour. Highly recommended.",
  },
  {
    name: "Jane Liou",
    rating: 5,
    date: "a year ago",
    text: "Couldn't be happier with the work David did with the plumbing of my new home that needed lots of fixing. He was so professional, honest and communicated so efficiently with me. Wouldn't recommend anyone else. Thank you again, David!",
  },
  {
    name: "T Hart",
    rating: 5,
    date: "8 months ago",
    text: "A week ago, I started having issues with my taps always leaking, made a call, and David came out within 30 mins. He found the issue and replaced what had to be done. I am one happy customer. Thanks again, David!",
  },
  {
    name: "Debbie Ayrey",
    rating: 5,
    date: "8 months ago",
    text: "My experience with David was awesome. Honest, friendly and very knowledgeable. Do yourself a favour and give these guys a go for anything you may need help with. I highly recommend 100%.",
  },
  {
    name: "Courtney Pryor",
    rating: 5,
    date: "8 months ago",
    text: "Would definitely recommend David for all plumbing services. He was very professional and his rates were very reasonable. Would hire him again when needed.",
  },
  {
    name: "Yasin Arafat",
    rating: 5,
    date: "8 months ago",
    text: "David from Complete Flow Plumbing came out today and helped me with my drain issue. He did such a great job, and I appreciate it, mate. Thanks again!",
  },
  {
    name: "Kaniz Fatema",
    rating: 5,
    date: "8 months ago",
    text: "I needed my bathroom renovated. I called so many plumbers and the prices were crazy. I called David and he came out and checked the job. His price was amazing — I gave him the job on the spot. Well recommended to anyone!",
  },
];

// FAQ type
export interface FAQ {
  question: string;
  answer: string;
}

// Business info constants
export const BUSINESS_INFO = {
  name: "Complete Flow Plumbing",
  phone: "0468 723 029",
  phoneTel: "0468723029",
  email: "completeflowplumbing@gmail.com",
  abn: "45 685 684 020",
  licence: "395338C",
  address: "Southern Highlands to the Eastern Suburbs, NSW",
  serviceHours: "24/7 Emergency Service",
  googleReviewLink: "https://share.google/MlV4FnguDrFbQd3mm",
  googleRating: "5.0",
  googleReviewCount: 38, // real reviews collected; update to the exact current Google total

  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160000!2d150.5800!3d-34.6200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a5f2aa4a9cc1%3A0x5017d681632ccc0!2sWollongong%20to%20the%20Southern%20Highlands%2C%20NSW!5e0!3m2!1sen!2sau!4v1703000000000!5m2!1sen!2sau",
  googleMapsSearchUrl: "https://www.google.com/maps/search/Complete+Flow+Plumbing",
  tagline: "Your Local Emergency & Same-Day Plumber",
  guarantee: "Workmanship Guarantee",
} as const;

// Work portfolio images for gallery
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

// Services data
export const SERVICES: Service[] = [
  { id: "1", slug: "emergency-plumber", title: "Emergency Plumber (24/7)", shortDescription: "Immediate response for urgent plumbing emergencies, available around the clock.", icon: "Siren", category: "emergency" },
  { id: "2", slug: "blocked-drains", title: "Blocked Drains & Drain Cleaning", shortDescription: "Fast, effective drain clearing using the latest equipment.", icon: "PipeSolid", category: "drainage" },
  { id: "3", slug: "hydro-jetting", title: "Hydro Jetting", shortDescription: "High-pressure water jetting to clear stubborn blockages.", icon: "Droplets", category: "drainage" },
  { id: "4", slug: "cctv-drain-inspection", title: "CCTV Drain Camera Inspection", shortDescription: "See exactly what's happening inside your pipes.", icon: "Camera", category: "drainage" },
  { id: "5", slug: "pipe-relining", title: "Pipe Relining", shortDescription: "No-dig pipe repair that saves your property from excavation.", icon: "Wrench", category: "drainage" },
  { id: "6", slug: "hot-water-systems", title: "Hot Water Systems", shortDescription: "Repair, replacement & installation of all hot water system types.", icon: "Flame", category: "hot-water" },
  { id: "7", slug: "gas-fitting", title: "Gas Fitting & Gas Plumbing", shortDescription: "Licensed gas fitters for safe installation and repairs.", icon: "Fuel", category: "gas" },
  { id: "8", slug: "leak-detection", title: "Leak Detection & Repair", shortDescription: "Find and fix hidden leaks before they cause damage.", icon: "Search", category: "leak-detection" },
  { id: "9", slug: "toilet-repair", title: "Toilet Repair & Unblock", shortDescription: "Quick fixes for blocked, running, or leaking toilets.", icon: "Bath", category: "leak-detection" },
];

// Service regions
export const REGIONS: Region[] = [
  {
    slug: "southern-highlands",
    name: "Southern Highlands",
    displayName: "Southern Highlands",
    theName: "the Southern Highlands",
    blurb:
      "Reliable Southern Highlands plumbers serving Bowral, Mittagong and Moss Vale with emergency repairs, blocked drains, gas fitting and hot water installation.",
    localAngle:
      "Cool-climate heritage region. Burst pipes in winter frosts, heritage homes with old clay and cast-iron pipes needing relining, tree-root drain blockages, gas heating plumbing.",
    commonIssues: [
      "Frozen and burst pipes in winter",
      "Tree-root intrusion in old clay drains",
      "Pipe relining for heritage homes",
      "Gas fitting for heating and hot water",
    ],
    targetKeywords: [
      "plumber Southern Highlands",
      "emergency plumber Bowral",
      "blocked drains Mittagong",
      "hot water systems Moss Vale",
      "gas fitter Bowral",
    ],
  },
  {
    slug: "wollondilly",
    name: "Wollondilly",
    displayName: "Wollondilly",
    theName: "Wollondilly",
    blurb:
      "Wollondilly's trusted plumbing team covering Picton, Tahmoor and surrounding rural townships for blocked drains, leak detection, septic and hot water systems.",
    localAngle:
      "Semi-rural Macarthur fringe. Rainwater tanks, septic and on-site wastewater systems, bore pumps, acreage properties on tank water.",
    commonIssues: [
      "Septic and on-site wastewater faults",
      "Rainwater tank pump and supply issues",
      "Tree-root blockages in rural drains",
      "Bore and pressure pump repairs",
    ],
    targetKeywords: [
      "plumber Wollondilly",
      "emergency plumber Picton",
      "blocked drains Tahmoor",
      "septic system plumber Wilton",
      "plumber Appin",
    ],
  },
  {
    slug: "macarthur",
    name: "Macarthur",
    displayName: "Macarthur",
    theName: "Macarthur",
    blurb:
      "Local plumbers across the Macarthur region — Campbelltown, Camden and the fast-growing new estates — for emergency repairs, blocked drains, hot water and gas fitting.",
    localAngle:
      "Growing Macarthur region. A mix of established Campbelltown and Camden homes with ageing pipework and booming new estates (Oran Park, Gregory Hills) needing fresh fit-outs; reactive clay soil drives tree-root drain blockages.",
    commonIssues: [
      "New-estate plumbing fit-outs and rectification",
      "Tree-root blocked drains in older suburbs",
      "Hot water system replacements",
      "Gas fitting for new homes",
    ],
    targetKeywords: [
      "plumber Macarthur",
      "plumber Campbelltown",
      "plumber Camden",
      "emergency plumber Narellan",
      "blocked drains Ingleburn",
    ],
  },
  {
    slug: "sutherland-shire",
    name: "Sutherland Shire",
    displayName: "Sutherland Shire",
    theName: "the Sutherland Shire",
    blurb:
      "Licensed local plumbers servicing the entire Sutherland Shire, from Cronulla to Menai, with fast emergency callouts, blocked drains, hot water and gas fitting.",
    localAngle:
      "Coastal/beachside Sutherland Shire. Salt-air corrosion of pipes and fittings, older fibro and brick homes, pool and outdoor plumbing, stormwater near the Royal National Park and Port Hacking.",
    commonIssues: [
      "Salt-corroded copper pipework near the coast",
      "Blocked stormwater from heavy beachside rain",
      "Hot water system replacements in older homes",
      "Pool and outdoor tap plumbing",
    ],
    targetKeywords: [
      "plumber Sutherland Shire",
      "emergency plumber Cronulla",
      "blocked drains Miranda",
      "hot water repairs Caringbah",
      "gas fitter Menai",
    ],
  },
  {
    slug: "st-george",
    name: "St George",
    displayName: "St George",
    theName: "the St George area",
    blurb:
      "St George plumbers across Hurstville, Kogarah and Bexley — blocked drains, hot water, leak detection and strata plumbing for established homes and units.",
    localAngle:
      "Established St George suburbs with older homes and clay/cast-iron sewer pipes, plus unit and strata plumbing around the Hurstville and Kogarah centres.",
    commonIssues: [
      "Tree-root blocked sewers in old clay pipes",
      "Strata and unit plumbing",
      "Hot water system repairs",
      "Leak detection in older homes",
    ],
    targetKeywords: [
      "plumber St George",
      "plumber Hurstville",
      "plumber Kogarah",
      "blocked drains Bexley",
      "emergency plumber Mortdale",
    ],
  },
  {
    slug: "bayside",
    name: "Bayside",
    displayName: "Bayside",
    theName: "the Bayside area",
    blurb:
      "Bayside plumbers from Mascot to Brighton-Le-Sands — high-rise and strata plumbing, blocked drains, hot water and gas across the Botany Bay corridor.",
    localAngle:
      "Bayside airport and Botany Bay corridor. High-rise unit and strata plumbing (Mascot, Wolli Creek), salt-air corrosion near the bay, older Rockdale and Brighton-Le-Sands homes.",
    commonIssues: [
      "High-rise and strata plumbing",
      "Salt-corroded coastal pipework",
      "Blocked drains and stormwater",
      "Hot water and gas installation",
    ],
    targetKeywords: [
      "plumber Bayside",
      "plumber Mascot",
      "plumber Rockdale",
      "emergency plumber Brighton-Le-Sands",
      "blocked drains Botany",
    ],
  },
  {
    slug: "eastern-suburbs",
    name: "Eastern Suburbs",
    displayName: "Eastern Suburbs",
    theName: "the Eastern Suburbs",
    blurb:
      "Eastern Suburbs plumbers across Bondi, Coogee and Randwick — heritage homes, coastal pipework, apartment and strata plumbing, blocked drains and hot water.",
    localAngle:
      "Premium Eastern Suburbs. Heritage terraces (Paddington, Woollahra) with old pipework, coastal salt corrosion (Bondi, Coogee), and lots of apartment and strata plumbing.",
    commonIssues: [
      "Heritage home pipe relining",
      "Salt-corroded coastal pipework",
      "Apartment and strata plumbing",
      "Bathroom renovations",
    ],
    targetKeywords: [
      "plumber Eastern Suburbs",
      "plumber Bondi",
      "plumber Randwick",
      "emergency plumber Coogee",
      "blocked drains Maroubra",
    ],
  },
  {
    slug: "wollongong-illawarra",
    name: "Wollongong & Illawarra",
    displayName: "Wollongong & Illawarra",
    theName: "Wollongong & the Illawarra",
    blurb:
      "Plumbers across Wollongong and the Illawarra coast — blocked drains, burst pipes, hot water and emergency callouts from Helensburgh to Kiama.",
    localAngle:
      "Coastal Illawarra between escarpment and sea. A mix of high-rise units and houses, escarpment stormwater runoff, salt corrosion on the coast, and new estates around Shell Cove and Albion Park.",
    commonIssues: [
      "Strata and unit plumbing in high-rise",
      "Escarpment stormwater and flooding",
      "Salt-corroded coastal pipework",
      "New-estate fit-outs and hot water",
    ],
    targetKeywords: [
      "plumber Wollongong",
      "plumber Illawarra",
      "emergency plumber Shellharbour",
      "blocked drains Corrimal",
      "plumber Kiama",
    ],
  },
  {
    slug: "blue-mountains",
    name: "Blue Mountains",
    displayName: "Blue Mountains",
    theName: "the Blue Mountains",
    blurb:
      "Blue Mountains plumbers from Glenbrook to Katoomba — winter burst pipes, rainwater tanks, blocked drains, hot water and gas heating across the mountains.",
    localAngle:
      "Cool-climate mountains. Winter frozen and burst pipes, older homes with clay pipes, rainwater tanks on the upper mountains, and bushfire-zone properties.",
    commonIssues: [
      "Frozen and burst pipes in winter",
      "Rainwater tank systems",
      "Tree-root drain blockages",
      "Hot water and gas heating",
    ],
    targetKeywords: [
      "plumber Blue Mountains",
      "plumber Katoomba",
      "emergency plumber Springwood",
      "blocked drains Glenbrook",
      "plumber Leura",
    ],
  },
  {
    slug: "western-sydney",
    name: "Western Sydney",
    displayName: "Western Sydney",
    theName: "Western Sydney",
    blurb:
      "Western Sydney plumbers across Parramatta, Blacktown, Penrith and Liverpool — emergency plumbing, blocked drains, hot water and gas fitting for homes and businesses.",
    localAngle:
      "Vast Western Sydney. Established suburbs with ageing pipework and fast-growing corridors (Rouse Hill, Kellyville); reactive clay soils drive tree-root drain blockages and high demand for hot water and gas work.",
    commonIssues: [
      "Tree-root blocked drains",
      "Hot water system replacements",
      "Gas fitting and compliance",
      "Burst pipes and leak detection",
    ],
    targetKeywords: [
      "plumber Western Sydney",
      "plumber Parramatta",
      "plumber Penrith",
      "emergency plumber Blacktown",
      "blocked drains Liverpool",
    ],
  },
  {
    slug: "goulburn-southern-tablelands",
    name: "Goulburn & Southern Tablelands",
    displayName: "Goulburn & Southern Tablelands",
    theName: "Goulburn & the Southern Tablelands",
    blurb:
      "Plumbers servicing Goulburn and the Southern Tablelands — Marulan, Crookwell, Yass and the rural townships — for blocked drains, tanks, hot water and emergency repairs.",
    localAngle:
      "Rural high country. Hard water and mineral build-up, rainwater tanks and bore pumps on rural properties, frost and burst pipes in cold winters, large acreage and town water supply around Goulburn.",
    commonIssues: [
      "Hard-water scale and hot water faults",
      "Rainwater tank and bore pump systems",
      "Frozen and burst pipes in winter",
      "Rural acreage water supply and drainage",
    ],
    targetKeywords: [
      "plumber Goulburn",
      "plumber Southern Tablelands",
      "blocked drains Marulan",
      "plumber Crookwell",
      "hot water repairs Yass",
    ],
  },
];

// Southern Highlands suburbs
export const SOUTHERN_HIGHLANDS_SUBURBS: Location[] = [
  { id: "sh1", slug: "bowral", name: "Bowral", region: "southern-highlands", postcode: "2576", nearby: ["mittagong", "burradoo", "moss-vale"] },
  { id: "sh2", slug: "mittagong", name: "Mittagong", region: "southern-highlands", postcode: "2575", nearby: ["bowral", "welby", "colo-vale"] },
  { id: "sh3", slug: "moss-vale", name: "Moss Vale", region: "southern-highlands", postcode: "2577", nearby: ["bowral", "sutton-forest", "burradoo"] },
  { id: "sh4", slug: "bundanoon", name: "Bundanoon", region: "southern-highlands", postcode: "2578", nearby: ["penrose", "exeter", "sutton-forest"] },
  { id: "sh5", slug: "robertson", name: "Robertson", region: "southern-highlands", postcode: "2577", nearby: ["burrawang", "moss-vale"] },
  { id: "sh6", slug: "berrima", name: "Berrima", region: "southern-highlands", postcode: "2577", nearby: ["moss-vale", "mittagong", "sutton-forest"] },
  { id: "sh7", slug: "burradoo", name: "Burradoo", region: "southern-highlands", postcode: "2576", nearby: ["bowral", "moss-vale", "mittagong"] },
  { id: "sh8", slug: "colo-vale", name: "Colo Vale", region: "southern-highlands", postcode: "2575", nearby: ["mittagong", "hill-top", "yerrinbool"] },
  { id: "sh9", slug: "sutton-forest", name: "Sutton Forest", region: "southern-highlands", postcode: "2577", nearby: ["moss-vale", "berrima", "exeter"] },
  { id: "sh10", slug: "exeter", name: "Exeter", region: "southern-highlands", postcode: "2579", nearby: ["bundanoon", "sutton-forest", "penrose"] },
  { id: "sh11", slug: "hill-top", name: "Hill Top", region: "southern-highlands", postcode: "2575", nearby: ["colo-vale", "yerrinbool", "mittagong"] },
  { id: "sh12", slug: "yerrinbool", name: "Yerrinbool", region: "southern-highlands", postcode: "2575", nearby: ["hill-top", "colo-vale", "mittagong"] },
  { id: "sh13", slug: "welby", name: "Welby", region: "southern-highlands", postcode: "2575", nearby: ["mittagong", "bowral", "colo-vale"] },
  { id: "sh14", slug: "burrawang", name: "Burrawang", region: "southern-highlands", postcode: "2577", nearby: ["robertson", "moss-vale"] },
  { id: "sh15", slug: "penrose", name: "Penrose", region: "southern-highlands", postcode: "2579", nearby: ["bundanoon", "exeter"] },
];

// Wollondilly suburbs
export const WOLLONDILLY_SUBURBS: Location[] = [
  { id: "wd1", slug: "picton", name: "Picton", region: "wollondilly", postcode: "2571", nearby: ["tahmoor", "thirlmere", "the-oaks"] },
  { id: "wd2", slug: "tahmoor", name: "Tahmoor", region: "wollondilly", postcode: "2573", nearby: ["picton", "bargo", "thirlmere"] },
  { id: "wd3", slug: "thirlmere", name: "Thirlmere", region: "wollondilly", postcode: "2572", nearby: ["picton", "tahmoor", "the-oaks"] },
  { id: "wd4", slug: "bargo", name: "Bargo", region: "wollondilly", postcode: "2574", nearby: ["tahmoor", "yanderra", "buxton"] },
  { id: "wd5", slug: "the-oaks", name: "The Oaks", region: "wollondilly", postcode: "2570", nearby: ["oakdale", "picton", "thirlmere"] },
  { id: "wd6", slug: "oakdale", name: "Oakdale", region: "wollondilly", postcode: "2570", nearby: ["the-oaks", "silverdale"] },
  { id: "wd7", slug: "silverdale", name: "Silverdale", region: "wollondilly", postcode: "2752", nearby: ["warragamba", "oakdale", "the-oaks"] },
  { id: "wd8", slug: "douglas-park", name: "Douglas Park", region: "wollondilly", postcode: "2569", nearby: ["menangle", "appin", "picton"] },
  { id: "wd9", slug: "appin", name: "Appin", region: "wollondilly", postcode: "2560", nearby: ["wilton", "douglas-park", "menangle"] },
  { id: "wd10", slug: "wilton", name: "Wilton", region: "wollondilly", postcode: "2571", nearby: ["appin", "picton", "douglas-park"] },
  { id: "wd11", slug: "menangle", name: "Menangle", region: "wollondilly", postcode: "2568", nearby: ["camden-park", "douglas-park", "picton"] },
  { id: "wd12", slug: "buxton", name: "Buxton", region: "wollondilly", postcode: "2571", nearby: ["bargo", "tahmoor", "yanderra"] },
  { id: "wd13", slug: "warragamba", name: "Warragamba", region: "wollondilly", postcode: "2752", nearby: ["silverdale", "oakdale"] },
  { id: "wd14", slug: "yanderra", name: "Yanderra", region: "wollondilly", postcode: "2574", nearby: ["bargo", "buxton", "tahmoor"] },
  { id: "wd15", slug: "camden-park", name: "Camden Park", region: "wollondilly", postcode: "2570", nearby: ["menangle", "douglas-park"] },
];

// Macarthur suburbs
export const MACARTHUR_SUBURBS: Location[] = [
  { id: "mc1", slug: "campbelltown", name: "Campbelltown", region: "macarthur", postcode: "2560", nearby: ["leumeah", "minto", "ingleburn"] },
  { id: "mc2", slug: "camden", name: "Camden", region: "macarthur", postcode: "2570", nearby: ["narellan", "elderslie", "currans-hill"] },
  { id: "mc3", slug: "narellan", name: "Narellan", region: "macarthur", postcode: "2567", nearby: ["camden", "currans-hill", "harrington-park"] },
  { id: "mc4", slug: "ingleburn", name: "Ingleburn", region: "macarthur", postcode: "2565", nearby: ["minto", "glenfield", "campbelltown"] },
  { id: "mc5", slug: "minto", name: "Minto", region: "macarthur", postcode: "2566", nearby: ["ingleburn", "leumeah", "raby"] },
  { id: "mc6", slug: "leumeah", name: "Leumeah", region: "macarthur", postcode: "2560", nearby: ["campbelltown", "minto", "raby"] },
  { id: "mc7", slug: "glenfield", name: "Glenfield", region: "macarthur", postcode: "2167", nearby: ["ingleburn", "minto"] },
  { id: "mc8", slug: "currans-hill", name: "Currans Hill", region: "macarthur", postcode: "2567", nearby: ["narellan", "harrington-park", "mount-annan"] },
  { id: "mc9", slug: "mount-annan", name: "Mount Annan", region: "macarthur", postcode: "2567", nearby: ["currans-hill", "harrington-park", "camden"] },
  { id: "mc10", slug: "harrington-park", name: "Harrington Park", region: "macarthur", postcode: "2567", nearby: ["narellan", "currans-hill", "mount-annan"] },
  { id: "mc11", slug: "gregory-hills", name: "Gregory Hills", region: "macarthur", postcode: "2557", nearby: ["oran-park", "harrington-park", "narellan"] },
  { id: "mc12", slug: "oran-park", name: "Oran Park", region: "macarthur", postcode: "2570", nearby: ["gregory-hills", "narellan", "harrington-park"] },
  { id: "mc13", slug: "elderslie", name: "Elderslie", region: "macarthur", postcode: "2570", nearby: ["camden", "narellan", "currans-hill"] },
  { id: "mc14", slug: "raby", name: "Raby", region: "macarthur", postcode: "2566", nearby: ["minto", "leumeah", "campbelltown"] },
];

// Sutherland Shire suburbs
export const SUTHERLAND_SHIRE_SUBURBS: Location[] = [
  { id: "ss1", slug: "cronulla", name: "Cronulla", region: "sutherland-shire", postcode: "2230", nearby: ["woolooware", "caringbah", "miranda"] },
  { id: "ss2", slug: "miranda", name: "Miranda", region: "sutherland-shire", postcode: "2228", nearby: ["caringbah", "gymea", "kirrawee", "sylvania"] },
  { id: "ss3", slug: "caringbah", name: "Caringbah", region: "sutherland-shire", postcode: "2229", nearby: ["miranda", "cronulla", "woolooware", "sylvania"] },
  { id: "ss4", slug: "sutherland", name: "Sutherland", region: "sutherland-shire", postcode: "2232", nearby: ["kirrawee", "jannali", "engadine", "gymea"] },
  { id: "ss5", slug: "engadine", name: "Engadine", region: "sutherland-shire", postcode: "2233", nearby: ["heathcote", "sutherland", "menai"] },
  { id: "ss6", slug: "menai", name: "Menai", region: "sutherland-shire", postcode: "2234", nearby: ["bangor", "illawong", "sutherland"] },
  { id: "ss7", slug: "gymea", name: "Gymea", region: "sutherland-shire", postcode: "2227", nearby: ["miranda", "kirrawee", "sutherland"] },
  { id: "ss8", slug: "kirrawee", name: "Kirrawee", region: "sutherland-shire", postcode: "2232", nearby: ["gymea", "sutherland", "miranda"] },
  { id: "ss9", slug: "sylvania", name: "Sylvania", region: "sutherland-shire", postcode: "2224", nearby: ["miranda", "caringbah", "como"] },
  { id: "ss10", slug: "jannali", name: "Jannali", region: "sutherland-shire", postcode: "2226", nearby: ["como", "sutherland", "kirrawee"] },
  { id: "ss11", slug: "como", name: "Como", region: "sutherland-shire", postcode: "2226", nearby: ["jannali", "sylvania", "illawong"] },
  { id: "ss12", slug: "heathcote", name: "Heathcote", region: "sutherland-shire", postcode: "2233", nearby: ["engadine", "sutherland"] },
  { id: "ss13", slug: "illawong", name: "Illawong", region: "sutherland-shire", postcode: "2234", nearby: ["menai", "bangor", "como"] },
  { id: "ss14", slug: "bangor", name: "Bangor", region: "sutherland-shire", postcode: "2234", nearby: ["menai", "illawong", "sutherland"] },
  { id: "ss15", slug: "woolooware", name: "Woolooware", region: "sutherland-shire", postcode: "2230", nearby: ["cronulla", "caringbah", "miranda"] },
];

// St George suburbs
export const ST_GEORGE_SUBURBS: Location[] = [
  { id: "sg1", slug: "hurstville", name: "Hurstville", region: "st-george", postcode: "2220", nearby: ["penshurst", "allawah", "kingsgrove"] },
  { id: "sg2", slug: "kogarah", name: "Kogarah", region: "st-george", postcode: "2217", nearby: ["carlton", "blakehurst", "allawah"] },
  { id: "sg3", slug: "bexley", name: "Bexley", region: "st-george", postcode: "2207", nearby: ["kingsgrove", "carlton", "hurstville"] },
  { id: "sg4", slug: "carlton", name: "Carlton", region: "st-george", postcode: "2218", nearby: ["kogarah", "allawah", "bexley"] },
  { id: "sg5", slug: "beverly-hills", name: "Beverly Hills", region: "st-george", postcode: "2209", nearby: ["kingsgrove", "penshurst", "mortdale"] },
  { id: "sg6", slug: "mortdale", name: "Mortdale", region: "st-george", postcode: "2223", nearby: ["penshurst", "oatley", "peakhurst"] },
  { id: "sg7", slug: "penshurst", name: "Penshurst", region: "st-george", postcode: "2222", nearby: ["mortdale", "hurstville", "beverly-hills"] },
  { id: "sg8", slug: "oatley", name: "Oatley", region: "st-george", postcode: "2223", nearby: ["mortdale", "peakhurst", "hurstville-grove"] },
  { id: "sg9", slug: "kingsgrove", name: "Kingsgrove", region: "st-george", postcode: "2208", nearby: ["bexley", "beverly-hills", "hurstville"] },
  { id: "sg10", slug: "allawah", name: "Allawah", region: "st-george", postcode: "2218", nearby: ["carlton", "hurstville", "kogarah"] },
  { id: "sg11", slug: "hurstville-grove", name: "Hurstville Grove", region: "st-george", postcode: "2220", nearby: ["oatley", "south-hurstville", "blakehurst"] },
  { id: "sg12", slug: "blakehurst", name: "Blakehurst", region: "st-george", postcode: "2221", nearby: ["south-hurstville", "kogarah", "hurstville-grove"] },
  { id: "sg13", slug: "south-hurstville", name: "South Hurstville", region: "st-george", postcode: "2221", nearby: ["blakehurst", "hurstville-grove", "hurstville"] },
  { id: "sg14", slug: "peakhurst", name: "Peakhurst", region: "st-george", postcode: "2210", nearby: ["mortdale", "oatley", "penshurst"] },
];

// Bayside suburbs
export const BAYSIDE_SUBURBS: Location[] = [
  { id: "by1", slug: "mascot", name: "Mascot", region: "bayside", postcode: "2020", nearby: ["botany", "pagewood", "wolli-creek"] },
  { id: "by2", slug: "brighton-le-sands", name: "Brighton-Le-Sands", region: "bayside", postcode: "2216", nearby: ["ramsgate", "monterey", "rockdale"] },
  { id: "by3", slug: "botany", name: "Botany", region: "bayside", postcode: "2019", nearby: ["mascot", "pagewood", "banksia"] },
  { id: "by4", slug: "eastgardens", name: "Eastgardens", region: "bayside", postcode: "2036", nearby: ["pagewood", "botany", "mascot"] },
  { id: "by5", slug: "pagewood", name: "Pagewood", region: "bayside", postcode: "2035", nearby: ["eastgardens", "mascot", "botany"] },
  { id: "by6", slug: "banksia", name: "Banksia", region: "bayside", postcode: "2216", nearby: ["arncliffe", "rockdale", "wolli-creek"] },
  { id: "by7", slug: "arncliffe", name: "Arncliffe", region: "bayside", postcode: "2205", nearby: ["wolli-creek", "banksia", "rockdale"] },
  { id: "by8", slug: "wolli-creek", name: "Wolli Creek", region: "bayside", postcode: "2205", nearby: ["arncliffe", "banksia", "mascot"] },
  { id: "by9", slug: "rockdale", name: "Rockdale", region: "bayside", postcode: "2216", nearby: ["banksia", "brighton-le-sands", "ramsgate"] },
  { id: "by10", slug: "ramsgate", name: "Ramsgate", region: "bayside", postcode: "2217", nearby: ["sans-souci", "brighton-le-sands", "monterey"] },
  { id: "by11", slug: "sans-souci", name: "Sans Souci", region: "bayside", postcode: "2219", nearby: ["ramsgate", "monterey", "brighton-le-sands"] },
  { id: "by12", slug: "monterey", name: "Monterey", region: "bayside", postcode: "2217", nearby: ["brighton-le-sands", "ramsgate", "kyeemagh"] },
  { id: "by13", slug: "kyeemagh", name: "Kyeemagh", region: "bayside", postcode: "2216", nearby: ["brighton-le-sands", "arncliffe", "monterey"] },
];

// Eastern Suburbs suburbs
export const EASTERN_SUBURBS_LIST: Location[] = [
  { id: "es1", slug: "bondi", name: "Bondi", region: "eastern-suburbs", postcode: "2026", nearby: ["bondi-junction", "bronte", "waverley"] },
  { id: "es2", slug: "bondi-junction", name: "Bondi Junction", region: "eastern-suburbs", postcode: "2022", nearby: ["bondi", "waverley", "woollahra"] },
  { id: "es3", slug: "coogee", name: "Coogee", region: "eastern-suburbs", postcode: "2034", nearby: ["clovelly", "randwick", "maroubra"] },
  { id: "es4", slug: "randwick", name: "Randwick", region: "eastern-suburbs", postcode: "2031", nearby: ["coogee", "kensington", "kingsford"] },
  { id: "es5", slug: "maroubra", name: "Maroubra", region: "eastern-suburbs", postcode: "2035", nearby: ["coogee", "kingsford", "kensington"] },
  { id: "es6", slug: "bronte", name: "Bronte", region: "eastern-suburbs", postcode: "2024", nearby: ["clovelly", "waverley", "bondi"] },
  { id: "es7", slug: "clovelly", name: "Clovelly", region: "eastern-suburbs", postcode: "2031", nearby: ["bronte", "coogee", "randwick"] },
  { id: "es8", slug: "waverley", name: "Waverley", region: "eastern-suburbs", postcode: "2024", nearby: ["bronte", "bondi", "bondi-junction"] },
  { id: "es9", slug: "vaucluse", name: "Vaucluse", region: "eastern-suburbs", postcode: "2030", nearby: ["rose-bay", "double-bay", "woollahra"] },
  { id: "es10", slug: "double-bay", name: "Double Bay", region: "eastern-suburbs", postcode: "2028", nearby: ["rose-bay", "woollahra", "paddington"] },
  { id: "es11", slug: "rose-bay", name: "Rose Bay", region: "eastern-suburbs", postcode: "2029", nearby: ["double-bay", "vaucluse", "woollahra"] },
  { id: "es12", slug: "paddington", name: "Paddington", region: "eastern-suburbs", postcode: "2021", nearby: ["woollahra", "double-bay", "bondi-junction"] },
  { id: "es13", slug: "woollahra", name: "Woollahra", region: "eastern-suburbs", postcode: "2025", nearby: ["paddington", "double-bay", "bondi-junction"] },
  { id: "es14", slug: "kensington", name: "Kensington", region: "eastern-suburbs", postcode: "2033", nearby: ["kingsford", "randwick", "maroubra"] },
  { id: "es15", slug: "kingsford", name: "Kingsford", region: "eastern-suburbs", postcode: "2032", nearby: ["kensington", "randwick", "maroubra"] },
];

// Wollongong & Illawarra suburbs
export const WOLLONGONG_ILLAWARRA_SUBURBS: Location[] = [
  { id: "wi1", slug: "wollongong", name: "Wollongong", region: "wollongong-illawarra", postcode: "2500", nearby: ["fairy-meadow", "figtree", "port-kembla"] },
  { id: "wi2", slug: "thirroul", name: "Thirroul", region: "wollongong-illawarra", postcode: "2515", nearby: ["bulli", "woonona", "helensburgh"] },
  { id: "wi3", slug: "corrimal", name: "Corrimal", region: "wollongong-illawarra", postcode: "2518", nearby: ["fairy-meadow", "woonona", "bulli"] },
  { id: "wi4", slug: "fairy-meadow", name: "Fairy Meadow", region: "wollongong-illawarra", postcode: "2519", nearby: ["corrimal", "wollongong", "figtree"] },
  { id: "wi5", slug: "figtree", name: "Figtree", region: "wollongong-illawarra", postcode: "2525", nearby: ["wollongong", "unanderra", "fairy-meadow"] },
  { id: "wi6", slug: "dapto", name: "Dapto", region: "wollongong-illawarra", postcode: "2530", nearby: ["unanderra", "albion-park", "oak-flats"] },
  { id: "wi7", slug: "unanderra", name: "Unanderra", region: "wollongong-illawarra", postcode: "2526", nearby: ["figtree", "dapto", "port-kembla"] },
  { id: "wi8", slug: "bulli", name: "Bulli", region: "wollongong-illawarra", postcode: "2516", nearby: ["woonona", "thirroul", "corrimal"] },
  { id: "wi9", slug: "woonona", name: "Woonona", region: "wollongong-illawarra", postcode: "2517", nearby: ["bulli", "corrimal", "thirroul"] },
  { id: "wi10", slug: "port-kembla", name: "Port Kembla", region: "wollongong-illawarra", postcode: "2505", nearby: ["warrawong", "wollongong", "unanderra"] },
  { id: "wi11", slug: "warrawong", name: "Warrawong", region: "wollongong-illawarra", postcode: "2502", nearby: ["port-kembla", "unanderra", "dapto"] },
  { id: "wi12", slug: "helensburgh", name: "Helensburgh", region: "wollongong-illawarra", postcode: "2508", nearby: ["thirroul", "bulli"] },
  { id: "wi13", slug: "shellharbour", name: "Shellharbour", region: "wollongong-illawarra", postcode: "2529", nearby: ["shell-cove", "oak-flats", "albion-park"] },
  { id: "wi14", slug: "albion-park", name: "Albion Park", region: "wollongong-illawarra", postcode: "2527", nearby: ["oak-flats", "shellharbour", "dapto"] },
  { id: "wi15", slug: "oak-flats", name: "Oak Flats", region: "wollongong-illawarra", postcode: "2529", nearby: ["albion-park", "shellharbour", "shell-cove"] },
  { id: "wi16", slug: "kiama", name: "Kiama", region: "wollongong-illawarra", postcode: "2533", nearby: ["gerringong", "shell-cove", "shellharbour"] },
  { id: "wi17", slug: "shell-cove", name: "Shell Cove", region: "wollongong-illawarra", postcode: "2529", nearby: ["shellharbour", "oak-flats", "kiama"] },
  { id: "wi18", slug: "gerringong", name: "Gerringong", region: "wollongong-illawarra", postcode: "2534", nearby: ["kiama", "shell-cove"] },
];

// Blue Mountains suburbs
export const BLUE_MOUNTAINS_SUBURBS: Location[] = [
  { id: "bm1", slug: "katoomba", name: "Katoomba", region: "blue-mountains", postcode: "2780", nearby: ["leura", "wentworth-falls", "blackheath"] },
  { id: "bm2", slug: "leura", name: "Leura", region: "blue-mountains", postcode: "2780", nearby: ["katoomba", "wentworth-falls", "blackheath"] },
  { id: "bm3", slug: "springwood", name: "Springwood", region: "blue-mountains", postcode: "2777", nearby: ["faulconbridge", "winmalee", "blaxland"] },
  { id: "bm4", slug: "glenbrook", name: "Glenbrook", region: "blue-mountains", postcode: "2773", nearby: ["blaxland", "warrimoo", "springwood"] },
  { id: "bm5", slug: "blaxland", name: "Blaxland", region: "blue-mountains", postcode: "2774", nearby: ["glenbrook", "warrimoo", "springwood"] },
  { id: "bm6", slug: "wentworth-falls", name: "Wentworth Falls", region: "blue-mountains", postcode: "2782", nearby: ["leura", "katoomba", "lawson"] },
  { id: "bm7", slug: "lawson", name: "Lawson", region: "blue-mountains", postcode: "2783", nearby: ["hazelbrook", "wentworth-falls", "faulconbridge"] },
  { id: "bm8", slug: "hazelbrook", name: "Hazelbrook", region: "blue-mountains", postcode: "2779", nearby: ["lawson", "faulconbridge", "wentworth-falls"] },
  { id: "bm9", slug: "faulconbridge", name: "Faulconbridge", region: "blue-mountains", postcode: "2776", nearby: ["springwood", "winmalee", "hazelbrook"] },
  { id: "bm10", slug: "winmalee", name: "Winmalee", region: "blue-mountains", postcode: "2777", nearby: ["springwood", "faulconbridge", "valley-heights"] },
  { id: "bm11", slug: "blackheath", name: "Blackheath", region: "blue-mountains", postcode: "2785", nearby: ["katoomba", "mount-victoria", "leura"] },
  { id: "bm12", slug: "warrimoo", name: "Warrimoo", region: "blue-mountains", postcode: "2774", nearby: ["blaxland", "valley-heights", "glenbrook"] },
  { id: "bm13", slug: "valley-heights", name: "Valley Heights", region: "blue-mountains", postcode: "2777", nearby: ["warrimoo", "springwood", "winmalee"] },
  { id: "bm14", slug: "mount-victoria", name: "Mount Victoria", region: "blue-mountains", postcode: "2786", nearby: ["blackheath", "katoomba"] },
];

// Western Sydney suburbs
export const WESTERN_SYDNEY_SUBURBS: Location[] = [
  { id: "ws1", slug: "parramatta", name: "Parramatta", region: "western-sydney", postcode: "2150", nearby: ["granville", "merrylands", "auburn"] },
  { id: "ws2", slug: "blacktown", name: "Blacktown", region: "western-sydney", postcode: "2148", nearby: ["mount-druitt", "quakers-hill", "kellyville"] },
  { id: "ws3", slug: "penrith", name: "Penrith", region: "western-sydney", postcode: "2750", nearby: ["st-marys", "mount-druitt"] },
  { id: "ws4", slug: "liverpool", name: "Liverpool", region: "western-sydney", postcode: "2170", nearby: ["fairfield", "merrylands"] },
  { id: "ws5", slug: "fairfield", name: "Fairfield", region: "western-sydney", postcode: "2165", nearby: ["liverpool", "merrylands", "granville"] },
  { id: "ws6", slug: "mount-druitt", name: "Mount Druitt", region: "western-sydney", postcode: "2770", nearby: ["st-marys", "blacktown", "quakers-hill"] },
  { id: "ws7", slug: "merrylands", name: "Merrylands", region: "western-sydney", postcode: "2160", nearby: ["granville", "parramatta", "fairfield"] },
  { id: "ws8", slug: "auburn", name: "Auburn", region: "western-sydney", postcode: "2144", nearby: ["granville", "parramatta", "merrylands"] },
  { id: "ws9", slug: "granville", name: "Granville", region: "western-sydney", postcode: "2142", nearby: ["parramatta", "merrylands", "auburn"] },
  { id: "ws10", slug: "st-marys", name: "St Marys", region: "western-sydney", postcode: "2760", nearby: ["mount-druitt", "penrith"] },
  { id: "ws11", slug: "castle-hill", name: "Castle Hill", region: "western-sydney", postcode: "2154", nearby: ["baulkham-hills", "kellyville", "rouse-hill"] },
  { id: "ws12", slug: "baulkham-hills", name: "Baulkham Hills", region: "western-sydney", postcode: "2153", nearby: ["castle-hill", "kellyville", "parramatta"] },
  { id: "ws13", slug: "kellyville", name: "Kellyville", region: "western-sydney", postcode: "2155", nearby: ["rouse-hill", "castle-hill", "baulkham-hills"] },
  { id: "ws14", slug: "quakers-hill", name: "Quakers Hill", region: "western-sydney", postcode: "2763", nearby: ["blacktown", "rouse-hill", "mount-druitt"] },
  { id: "ws15", slug: "rouse-hill", name: "Rouse Hill", region: "western-sydney", postcode: "2155", nearby: ["kellyville", "quakers-hill", "castle-hill"] },
];

// Goulburn & Southern Tablelands suburbs
export const GOULBURN_SOUTHERN_TABLELANDS_SUBURBS: Location[] = [
  { id: "gt1", slug: "goulburn", name: "Goulburn", region: "goulburn-southern-tablelands", postcode: "2580", nearby: ["marulan", "towrang", "taralga"] },
  { id: "gt2", slug: "marulan", name: "Marulan", region: "goulburn-southern-tablelands", postcode: "2579", nearby: ["towrang", "goulburn", "tallong"] },
  { id: "gt3", slug: "crookwell", name: "Crookwell", region: "goulburn-southern-tablelands", postcode: "2583", nearby: ["gunning", "taralga", "goulburn"] },
  { id: "gt4", slug: "gunning", name: "Gunning", region: "goulburn-southern-tablelands", postcode: "2581", nearby: ["collector", "crookwell", "bowning"] },
  { id: "gt5", slug: "tallong", name: "Tallong", region: "goulburn-southern-tablelands", postcode: "2579", nearby: ["marulan", "towrang", "bungonia"] },
  { id: "gt6", slug: "taralga", name: "Taralga", region: "goulburn-southern-tablelands", postcode: "2580", nearby: ["crookwell", "goulburn"] },
  { id: "gt7", slug: "tarago", name: "Tarago", region: "goulburn-southern-tablelands", postcode: "2580", nearby: ["lake-bathurst", "bungendore", "collector"] },
  { id: "gt8", slug: "collector", name: "Collector", region: "goulburn-southern-tablelands", postcode: "2581", nearby: ["gunning", "tarago", "lake-bathurst"] },
  { id: "gt9", slug: "bungonia", name: "Bungonia", region: "goulburn-southern-tablelands", postcode: "2580", nearby: ["marulan", "tallong", "goulburn"] },
  { id: "gt10", slug: "yass", name: "Yass", region: "goulburn-southern-tablelands", postcode: "2582", nearby: ["murrumbateman", "bowning", "gunning"] },
  { id: "gt11", slug: "murrumbateman", name: "Murrumbateman", region: "goulburn-southern-tablelands", postcode: "2582", nearby: ["yass", "bowning", "bungendore"] },
  { id: "gt12", slug: "bowning", name: "Bowning", region: "goulburn-southern-tablelands", postcode: "2582", nearby: ["yass", "gunning", "murrumbateman"] },
  { id: "gt13", slug: "lake-bathurst", name: "Lake Bathurst", region: "goulburn-southern-tablelands", postcode: "2580", nearby: ["tarago", "collector", "goulburn"] },
  { id: "gt14", slug: "towrang", name: "Towrang", region: "goulburn-southern-tablelands", postcode: "2580", nearby: ["goulburn", "marulan", "tallong"] },
  { id: "gt15", slug: "bungendore", name: "Bungendore", region: "goulburn-southern-tablelands", postcode: "2621", nearby: ["tarago", "murrumbateman", "collector"] },
];

// All locations combined
export const ALL_LOCATIONS: Location[] = [
  ...SOUTHERN_HIGHLANDS_SUBURBS,
  ...WOLLONDILLY_SUBURBS,
  ...MACARTHUR_SUBURBS,
  ...SUTHERLAND_SHIRE_SUBURBS,
  ...ST_GEORGE_SUBURBS,
  ...BAYSIDE_SUBURBS,
  ...EASTERN_SUBURBS_LIST,
  ...WOLLONGONG_ILLAWARRA_SUBURBS,
  ...BLUE_MOUNTAINS_SUBURBS,
  ...WESTERN_SYDNEY_SUBURBS,
  ...GOULBURN_SOUTHERN_TABLELANDS_SUBURBS,
];

// Lookup helpers
export function regionBySlug(slug: string): Region | undefined {
  return REGIONS.find((region) => region.slug === slug);
}

export function locationsByRegion(slug: string): Location[] {
  return ALL_LOCATIONS.filter((location) => location.region === slug);
}

// Sample testimonials
export const TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "Sarah M.", suburb: "Bowral", service: "Emergency Plumber", rating: 5, text: "Called at 10pm with a burst pipe. Complete Flow arrived within 30 minutes and had it fixed by midnight. Absolute lifesavers!" },
  { id: "2", name: "James T.", suburb: "Mittagong", service: "Hot Water System", rating: 5, text: "Our hot water system died on a cold winter morning. Same-day replacement and the team was professional, clean, and explained everything clearly." },
  { id: "3", name: "Michelle P.", suburb: "Moss Vale", service: "Blocked Drains", rating: 5, text: "They used a camera to find a tree root blockage and cleared it with hydro jetting. No mess, no stress. Highly recommend!" },
  { id: "4", name: "David L.", suburb: "Bundanoon", service: "Gas Fitting", rating: 5, text: "Licensed, insured, and on time. Had our new gas cooktop installed perfectly. Will use again for all plumbing needs." },
  { id: "5", name: "Karen W.", suburb: "Picton", service: "Leak Detection", rating: 5, text: "Found a hidden leak in our bathroom that was causing mould. Fixed it quickly and saved us thousands in potential damage." },
  { id: "6", name: "Robert H.", suburb: "Thirlmere", service: "Toilet Repair", rating: 5, text: "Quick response for a blocked toilet on a Sunday. Fair pricing with no call-out fee. Great local plumbers!" },
];

// Home page FAQs
export const HOME_FAQS: FAQ[] = [
  { question: "Do you offer 24/7 emergency plumbing services?", answer: "Yes! Complete Flow Plumbing proudly services the Southern Highlands, Wollondilly, Macarthur, the Sutherland Shire, St George, Bayside, the Eastern Suburbs, Wollongong & Illawarra, the Blue Mountains, Western Sydney, and Goulburn & the Southern Tablelands. We understand that plumbing emergencies don't wait for business hours, so neither do we." },
  { question: "How quickly can you respond to an emergency?", answer: "For emergency call-outs, we aim to arrive within 60 minutes in our primary service areas. Our team is strategically located to provide fast response times across all suburbs we service." },
  { question: "Do you provide free quotes?", answer: "Yes, we provide free, no-obligation quotes for all plumbing work. For most jobs, we can give you an upfront fixed price before any work begins, so there are no surprises." },
  { question: "Are your plumbers licensed and insured?", answer: "Absolutely. All our plumbers are fully licensed, insured, and undergo regular training. We hold all required NSW trade licences and comprehensive insurance coverage." },
  { question: "What areas do you service?", answer: "Complete Flow Plumbing proudly services the Southern Highlands, Wollondilly, Macarthur, the Sutherland Shire, St George, Bayside, the Eastern Suburbs, Wollongong & Illawarra, the Blue Mountains, Western Sydney, and Goulburn & the Southern Tablelands." },
  { question: "Do you charge a call-out fee?", answer: "No call-out fee for standard service calls during business hours. Emergency after-hours calls may incur a small surcharge, which we always communicate upfront." },
  { question: "What payment methods do you accept?", answer: "We accept cash, EFTPOS, credit cards (Visa, Mastercard, Amex), and bank transfer. Payment is due upon completion of work." },
  { question: "Do you offer any guarantees on your work?", answer: "Yes, all our workmanship comes with a guarantee. We stand behind the quality of our work and will return to fix any issues at no additional cost within the guarantee period." },
];
