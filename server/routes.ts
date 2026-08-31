import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quoteRequestSchema, contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { generateSitemap } from "./sitemap";
import { sendLeadEmail } from "./email";

const RETIRED_LOCATION_SLUGS = [
  "penrose",
  "parramatta",
  "blacktown",
  "penrith",
  "liverpool",
  "fairfield",
  "mount-druitt",
  "merrylands",
  "auburn",
  "granville",
  "st-marys",
  "castle-hill",
  "baulkham-hills",
  "kellyville",
  "quakers-hill",
  "rouse-hill",
  "mascot",
  "brighton-le-sands",
  "botany",
  "eastgardens",
  "pagewood",
  "banksia",
  "arncliffe",
  "wolli-creek",
  "rockdale",
  "ramsgate",
  "sans-souci",
  "monterey",
  "kyeemagh",
  "katoomba",
  "leura",
  "springwood",
  "glenbrook",
  "blaxland",
  "wentworth-falls",
  "lawson",
  "hazelbrook",
  "faulconbridge",
  "winmalee",
  "blackheath",
  "warrimoo",
  "valley-heights",
  "mount-victoria",
] as const;

const RETIRED_LOCATION_PATHS = [
  "/locations/region/western-sydney",
  "/locations/western-sydney",
  "/western-sydney",
  "/locations/region/bayside",
  "/locations/bayside",
  "/bayside",
  "/locations/region/blue-mountains",
  "/locations/blue-mountains",
  "/blue-mountains",
  ...RETIRED_LOCATION_SLUGS.flatMap((slug) => [
    `/${slug}`,
    `/locations/${slug}`,
  ]),
];

function sendRetiredLocationResponse(res: Response) {
  return res
    .status(410)
    .set("X-Robots-Tag", "noindex, nofollow")
    .set("Cache-Control", "public, max-age=3600")
    .type("html")
    .send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow">
    <title>Service area removed | Complete Flow Plumbing</title>
  </head>
  <body>
    <main>
      <h1>This service-area page has been removed.</h1>
      <p>Visit <a href="/locations">our current service areas</a>.</p>
    </main>
  </body>
</html>`);
}

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.isAdmin) return next();
  res.status(401).json({ success: false, message: "Unauthorised" });
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // These locations were explicitly retired by the client. Returning 410
  // prevents the SPA fallback from keeping stale pages indexed by Google.
  app.get(RETIRED_LOCATION_PATHS, (_req, res) => {
    return sendRetiredLocationResponse(res);
  });

  // www → non-www redirect
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (host.startsWith("www.")) {
      const newHost = host.slice(4);
      return res.redirect(301, `https://${newHost}${req.url}`);
    }
    next();
  });

  // ─── Public: Quote & Contact Forms ───────────────────────────────────────

  app.post("/api/quotes", async (req, res) => {
    try {
      const data = quoteRequestSchema.parse(req.body);
      const quote = await storage.createQuote(data);
      console.log("New quote:", { name: quote.name, suburb: quote.suburb, service: quote.serviceType });
      // Do not report success unless the business inbox accepts the message.
      const emailSent = await sendLeadEmail(`New Quote Request — ${quote.name} (${quote.suburb})`, {
        Name: quote.name,
        Phone: quote.phone,
        Email: quote.email || "(not provided)",
        Suburb: quote.suburb,
        Service: quote.serviceType,
        Urgency: quote.urgency,
        Message: quote.message || "(none)",
      });
      if (!emailSent) {
        return res.status(503).json({
          success: false,
          message: "We could not deliver your request. Please call 0468 723 029.",
        });
      }
      res.status(201).json({ success: true, message: "Quote submitted", id: quote.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error creating quote:", error);
        res.status(500).json({ success: false, message: "Failed to submit quote" });
      }
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactFormSchema.parse(req.body);
      const contact = await storage.createContact(data);
      console.log("New contact:", { name: contact.name, email: contact.email });
      const emailSent = await sendLeadEmail(`New Contact Message — ${contact.name}`, {
        Name: contact.name,
        Phone: contact.phone,
        Email: contact.email,
        Message: contact.message,
      });
      if (!emailSent) {
        return res.status(503).json({
          success: false,
          message: "We could not deliver your message. Please call 0468 723 029.",
        });
      }
      res.status(201).json({ success: true, message: "Message sent", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    }
  });

  // ─── Public: Tracking codes (safe read-only for injection) ───────────────

  app.get("/api/tracking", async (req, res) => {
    try {
      const codes = await storage.getTrackingCodes();
      res.json(codes.filter(c => c.enabled));
    } catch {
      res.json([]);
    }
  });

  // ─── Admin: Auth ─────────────────────────────────────────────────────────

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "CompleteFlow2024!";
    if (password === adminPassword) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Incorrect password" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {});
    res.json({ success: true });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // ─── Admin: Leads & Contacts ─────────────────────────────────────────────

  app.get("/api/admin/quotes", requireAdmin, async (req, res) => {
    try {
      res.json(await storage.getQuotes());
    } catch {
      res.status(500).json({ message: "Failed" });
    }
  });

  app.patch("/api/admin/quotes/:id/read", requireAdmin, async (req, res) => {
    try {
      await storage.markQuoteRead(req.params.id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (req, res) => {
    try {
      res.json(await storage.getContacts());
    } catch {
      res.status(500).json({ message: "Failed" });
    }
  });

  app.patch("/api/admin/contacts/:id/read", requireAdmin, async (req, res) => {
    try {
      await storage.markContactRead(req.params.id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed" });
    }
  });

  // ─── Admin: Tracking Codes ────────────────────────────────────────────────

  app.get("/api/admin/tracking", requireAdmin, async (req, res) => {
    try {
      res.json(await storage.getTrackingCodes());
    } catch {
      res.status(500).json({ message: "Failed" });
    }
  });

  app.post("/api/admin/tracking", requireAdmin, async (req, res) => {
    try {
      const codes = req.body;
      if (!Array.isArray(codes)) return res.status(400).json({ message: "Expected array" });
      await storage.saveTrackingCodes(codes);
      res.json({ success: true });
    } catch {
      res.status(500).json({ message: "Failed" });
    }
  });

  // ─── Legacy public admin endpoints (kept for backward compat) ────────────

  app.get("/api/quotes", requireAdmin, async (req, res) => {
    try { res.json(await storage.getQuotes()); } catch { res.status(500).json({ message: "Failed" }); }
  });

  app.get("/api/contacts", requireAdmin, async (req, res) => {
    try { res.json(await storage.getContacts()); } catch { res.status(500).json({ message: "Failed" }); }
  });

  // ─── Sitemap ─────────────────────────────────────────────────────────────

  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(generateSitemap());
  });

  return httpServer;
}
