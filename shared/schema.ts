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
    | "sutherland-shire"
    | "wollondilly"
    | "southern-highlands"
    | "wollongong"
    | "illawarra"
    | "southern-tablelands";
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
export const GOOGLE_REVIEWS: GoogleReview[] = []; // TODO: populate with the client's real Google reviews once provided

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
  address: "Sutherland Shire to the Southern Highlands, NSW",
  serviceHours: "24/7 Emergency Service",
  googleReviewLink: "https://share.google/MlV4FnguDrFbQd3mm",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424146.1027831!2d150.3500!3d-34.4700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a5f2aa4a9cc1%3A0x5017d681632ccc0!2sSouthern%20Highlands%2C%20NSW!5e0!3m2!1sen!2sau!4v1703000000000!5m2!1sen!2sau",
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

// Service regions
export const REGIONS: Region[] = [
  {
    slug: "sutherland-shire",
    name: "Sutherland Shire",
    displayName: "Sutherland Shire",
    theName: "the Sutherland Shire",
    blurb:
      "Licensed local plumbers servicing the entire Sutherland Shire, from Cronulla to Menai, with fast emergency callouts, blocked drains, hot water and gas fitting.",
    localAngle:
      "Coastal/beachside Sydney. Salt-air corrosion of pipes and fittings, older fibro and brick homes, pool and outdoor plumbing, stormwater near the Royal National Park and Port Hacking.",
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
      "plumber Engadine",
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
      "Semi-rural Macarthur fringe. Rainwater tanks, septic and on-site wastewater systems, bore pumps, acreage properties on tank water, long driveways and rural water supply.",
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
      "hot water repairs Thirlmere",
      "plumber Appin",
    ],
  },
  {
    slug: "southern-highlands",
    name: "Southern Highlands",
    displayName: "Southern Highlands",
    theName: "the Southern Highlands",
    blurb:
      "Reliable Southern Highlands plumbers serving Bowral, Mittagong and Moss Vale with emergency repairs, blocked drains, gas fitting and hot water installation.",
    localAngle:
      "Cool-climate heritage region. Burst pipes in winter frosts, heritage homes with old clay and cast-iron pipes needing relining, tree-root drain blockages, slow-combustion and gas heating plumbing.",
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
      "plumber Bundanoon",
    ],
  },
  {
    slug: "wollongong",
    name: "Wollongong",
    displayName: "Wollongong",
    theName: "Wollongong",
    blurb:
      "Wollongong's go-to plumbers for blocked drains, burst pipes, hot water and emergency callouts across the northern beaches, city and western suburbs.",
    localAngle:
      "Coastal city between escarpment and sea. Mix of high-rise units and houses, escarpment stormwater runoff, salt corrosion on the coast, older Port Kembla/Warrawong housing, unit and strata plumbing.",
    commonIssues: [
      "Strata and unit plumbing in high-rise",
      "Escarpment stormwater and flooding",
      "Salt-corroded coastal pipework",
      "Hot water and burst pipe emergencies",
    ],
    targetKeywords: [
      "plumber Wollongong",
      "emergency plumber Wollongong",
      "blocked drains Corrimal",
      "burst pipe repair Figtree",
      "hot water repairs Dapto",
      "plumber Thirroul",
    ],
  },
  {
    slug: "illawarra",
    name: "Illawarra",
    displayName: "Illawarra",
    theName: "the Illawarra",
    blurb:
      "Plumbing services across the Illawarra coast and Shellharbour-Kiama region, from blocked drains and leak detection to gas fitting and emergency repairs.",
    localAngle:
      "South coast growth corridor. New estates (Shell Cove, Calderwood, Flinders) needing fit-outs alongside older coastal homes, salt-air corrosion, lake and coastal stormwater around Lake Illawarra.",
    commonIssues: [
      "New-estate plumbing fit-outs and rectification",
      "Salt-corroded fittings near the coast",
      "Blocked drains from coastal sand and runoff",
      "Hot water and gas installation",
    ],
    targetKeywords: [
      "plumber Illawarra",
      "emergency plumber Shellharbour",
      "blocked drains Albion Park",
      "plumber Kiama",
      "hot water repairs Oak Flats",
      "leak detection Warilla",
    ],
  },
  {
    slug: "southern-tablelands",
    name: "Southern Tablelands",
    displayName: "Southern Tablelands",
    theName: "the Southern Tablelands",
    blurb:
      "Plumbers servicing the Southern Tablelands including Goulburn, Marulan and Crookwell for rural and town plumbing, blocked drains, tanks and hot water.",
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
      "emergency plumber Southern Tablelands",
      "blocked drains Marulan",
      "plumber Crookwell",
      "rural water tank plumber Goulburn",
      "hot water repairs Yass",
    ],
  },
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

// Wollondilly suburbs
export const WOLLONDILLY_SUBURBS: Location[] = [
  { id: "wd1", slug: "picton", name: "Picton", region: "wollondilly", postcode: "2571", nearby: ["tahmoor", "thirlmere", "the-oaks"] },
  { id: "wd2", slug: "tahmoor", name: "Tahmoor", region: "wollondilly", postcode: "2573", nearby: ["picton", "bargo", "thirlmere"] },
  { id: "wd3", slug: "thirlmere", name: "Thirlmere", region: "wollondilly", postcode: "2572", nearby: ["picton", "tahmoor", "the-oaks"] },
  { id: "wd4", slug: "bargo", name: "Bargo", region: "wollondilly", postcode: "2574", nearby: ["tahmoor", "yanderra", "buxton"] },
  { id: "wd5", slug: "the-oaks", name: "The Oaks", region: "wollondilly", postcode: "2570", nearby: ["oakdale", "picton", "thirlmere"] },
  { id: "wd6", slug: "oakdale", name: "Oakdale", region: "wollondilly", postcode: "2570", nearby: ["the-oaks", "silverdale", "warragamba"] },
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

// Wollongong suburbs
export const WOLLONGONG_SUBURBS: Location[] = [
  { id: "wg1", slug: "wollongong", name: "Wollongong", region: "wollongong", postcode: "2500", nearby: ["fairy-meadow", "figtree", "port-kembla"] },
  { id: "wg2", slug: "thirroul", name: "Thirroul", region: "wollongong", postcode: "2515", nearby: ["austinmer", "bulli", "woonona"] },
  { id: "wg3", slug: "corrimal", name: "Corrimal", region: "wollongong", postcode: "2518", nearby: ["fairy-meadow", "woonona", "balgownie"] },
  { id: "wg4", slug: "fairy-meadow", name: "Fairy Meadow", region: "wollongong", postcode: "2519", nearby: ["corrimal", "wollongong", "balgownie"] },
  { id: "wg5", slug: "figtree", name: "Figtree", region: "wollongong", postcode: "2525", nearby: ["wollongong", "unanderra"] },
  { id: "wg6", slug: "dapto", name: "Dapto", region: "wollongong", postcode: "2530", nearby: ["unanderra", "berkeley"] },
  { id: "wg7", slug: "unanderra", name: "Unanderra", region: "wollongong", postcode: "2526", nearby: ["figtree", "dapto", "berkeley"] },
  { id: "wg8", slug: "bulli", name: "Bulli", region: "wollongong", postcode: "2516", nearby: ["woonona", "thirroul", "austinmer"] },
  { id: "wg9", slug: "woonona", name: "Woonona", region: "wollongong", postcode: "2517", nearby: ["bulli", "corrimal", "thirroul"] },
  { id: "wg10", slug: "port-kembla", name: "Port Kembla", region: "wollongong", postcode: "2505", nearby: ["warrawong", "wollongong", "berkeley"] },
  { id: "wg11", slug: "warrawong", name: "Warrawong", region: "wollongong", postcode: "2502", nearby: ["port-kembla", "berkeley", "unanderra"] },
  { id: "wg12", slug: "helensburgh", name: "Helensburgh", region: "wollongong", postcode: "2508", nearby: ["thirroul", "austinmer"] },
  { id: "wg13", slug: "berkeley", name: "Berkeley", region: "wollongong", postcode: "2506", nearby: ["warrawong", "dapto", "unanderra"] },
  { id: "wg14", slug: "balgownie", name: "Balgownie", region: "wollongong", postcode: "2519", nearby: ["fairy-meadow", "corrimal", "wollongong"] },
  { id: "wg15", slug: "austinmer", name: "Austinmer", region: "wollongong", postcode: "2515", nearby: ["thirroul", "bulli", "helensburgh"] },
];

// Illawarra suburbs
export const ILLAWARRA_SUBURBS: Location[] = [
  { id: "il1", slug: "shellharbour", name: "Shellharbour", region: "illawarra", postcode: "2529", nearby: ["shell-cove", "oak-flats", "barrack-heights"] },
  { id: "il2", slug: "albion-park", name: "Albion Park", region: "illawarra", postcode: "2527", nearby: ["albion-park-rail", "calderwood", "oak-flats"] },
  { id: "il3", slug: "oak-flats", name: "Oak Flats", region: "illawarra", postcode: "2529", nearby: ["albion-park-rail", "shellharbour", "lake-illawarra"] },
  { id: "il4", slug: "warilla", name: "Warilla", region: "illawarra", postcode: "2528", nearby: ["barrack-heights", "lake-illawarra", "shellharbour"] },
  { id: "il5", slug: "shell-cove", name: "Shell Cove", region: "illawarra", postcode: "2529", nearby: ["shellharbour", "barrack-heights", "flinders"] },
  { id: "il6", slug: "kiama", name: "Kiama", region: "illawarra", postcode: "2533", nearby: ["kiama-downs", "minnamurra", "gerringong"] },
  { id: "il7", slug: "kiama-downs", name: "Kiama Downs", region: "illawarra", postcode: "2533", nearby: ["kiama", "minnamurra", "jamberoo"] },
  { id: "il8", slug: "gerringong", name: "Gerringong", region: "illawarra", postcode: "2534", nearby: ["kiama", "kiama-downs"] },
  { id: "il9", slug: "lake-illawarra", name: "Lake Illawarra", region: "illawarra", postcode: "2528", nearby: ["warilla", "oak-flats", "barrack-heights"] },
  { id: "il10", slug: "albion-park-rail", name: "Albion Park Rail", region: "illawarra", postcode: "2527", nearby: ["albion-park", "oak-flats", "shellharbour"] },
  { id: "il11", slug: "calderwood", name: "Calderwood", region: "illawarra", postcode: "2527", nearby: ["albion-park", "albion-park-rail"] },
  { id: "il12", slug: "barrack-heights", name: "Barrack Heights", region: "illawarra", postcode: "2528", nearby: ["warilla", "shellharbour", "lake-illawarra"] },
  { id: "il13", slug: "flinders", name: "Flinders", region: "illawarra", postcode: "2529", nearby: ["shell-cove", "shellharbour", "minnamurra"] },
  { id: "il14", slug: "jamberoo", name: "Jamberoo", region: "illawarra", postcode: "2533", nearby: ["kiama", "kiama-downs", "minnamurra"] },
  { id: "il15", slug: "minnamurra", name: "Minnamurra", region: "illawarra", postcode: "2533", nearby: ["kiama-downs", "kiama", "flinders"] },
];

// Southern Tablelands suburbs
export const SOUTHERN_TABLELANDS_SUBURBS: Location[] = [
  { id: "st1", slug: "goulburn", name: "Goulburn", region: "southern-tablelands", postcode: "2580", nearby: ["marulan", "towrang", "tarago"] },
  { id: "st2", slug: "marulan", name: "Marulan", region: "southern-tablelands", postcode: "2579", nearby: ["towrang", "goulburn", "tallong"] },
  { id: "st3", slug: "crookwell", name: "Crookwell", region: "southern-tablelands", postcode: "2583", nearby: ["gunning", "taralga", "goulburn"] },
  { id: "st4", slug: "gunning", name: "Gunning", region: "southern-tablelands", postcode: "2581", nearby: ["collector", "crookwell", "bowning"] },
  { id: "st5", slug: "tallong", name: "Tallong", region: "southern-tablelands", postcode: "2579", nearby: ["marulan", "towrang", "bungonia"] },
  { id: "st6", slug: "taralga", name: "Taralga", region: "southern-tablelands", postcode: "2580", nearby: ["crookwell", "goulburn"] },
  { id: "st7", slug: "tarago", name: "Tarago", region: "southern-tablelands", postcode: "2580", nearby: ["lake-bathurst", "bungendore", "collector"] },
  { id: "st8", slug: "collector", name: "Collector", region: "southern-tablelands", postcode: "2581", nearby: ["gunning", "tarago", "lake-bathurst"] },
  { id: "st9", slug: "bungonia", name: "Bungonia", region: "southern-tablelands", postcode: "2580", nearby: ["marulan", "tallong", "goulburn"] },
  { id: "st10", slug: "yass", name: "Yass", region: "southern-tablelands", postcode: "2582", nearby: ["murrumbateman", "bowning", "gunning"] },
  { id: "st11", slug: "murrumbateman", name: "Murrumbateman", region: "southern-tablelands", postcode: "2582", nearby: ["yass", "bowning", "bungendore"] },
  { id: "st12", slug: "bowning", name: "Bowning", region: "southern-tablelands", postcode: "2582", nearby: ["yass", "gunning", "murrumbateman"] },
  { id: "st13", slug: "lake-bathurst", name: "Lake Bathurst", region: "southern-tablelands", postcode: "2580", nearby: ["tarago", "collector", "goulburn"] },
  { id: "st14", slug: "towrang", name: "Towrang", region: "southern-tablelands", postcode: "2580", nearby: ["goulburn", "marulan", "tallong"] },
  { id: "st15", slug: "bungendore", name: "Bungendore", region: "southern-tablelands", postcode: "2621", nearby: ["tarago", "murrumbateman", "collector"] },
];

// All locations combined
export const ALL_LOCATIONS: Location[] = [
  ...SUTHERLAND_SHIRE_SUBURBS,
  ...WOLLONDILLY_SUBURBS,
  ...SOUTHERN_HIGHLANDS_SUBURBS,
  ...WOLLONGONG_SUBURBS,
  ...ILLAWARRA_SUBURBS,
  ...SOUTHERN_TABLELANDS_SUBURBS,
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
  { question: "Do you offer 24/7 emergency plumbing services?", answer: "Yes! Complete Flow Plumbing provides 24/7 emergency plumbing services across the Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra and the Southern Tablelands. We understand that plumbing emergencies don't wait for business hours, so neither do we." },
  { question: "How quickly can you respond to an emergency?", answer: "For emergency call-outs, we aim to arrive within 60 minutes in our primary service areas. Our team is strategically located to provide fast response times across all suburbs we service." },
  { question: "Do you provide free quotes?", answer: "Yes, we provide free, no-obligation quotes for all plumbing work. For most jobs, we can give you an upfront fixed price before any work begins, so there are no surprises." },
  { question: "Are your plumbers licensed and insured?", answer: "Absolutely. All our plumbers are fully licensed, insured, and undergo regular training. We hold all required NSW trade licences and comprehensive insurance coverage." },
  { question: "What areas do you service?", answer: "Complete Flow Plumbing proudly services Sutherland Shire, Wollondilly, the Southern Highlands, Wollongong, Illawarra and the Southern Tablelands — covering 90+ suburbs and townships from Cronulla to Goulburn." },
  { question: "Do you charge a call-out fee?", answer: "No call-out fee for standard service calls during business hours. Emergency after-hours calls may incur a small surcharge, which we always communicate upfront." },
  { question: "What payment methods do you accept?", answer: "We accept cash, EFTPOS, credit cards (Visa, Mastercard, Amex), and bank transfer. Payment is due upon completion of work." },
  { question: "Do you offer any guarantees on your work?", answer: "Yes, all our workmanship comes with a guarantee. We stand behind the quality of our work and will return to fix any issues at no additional cost within the guarantee period." },
];
