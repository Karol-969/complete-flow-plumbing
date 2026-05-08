import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import { cmsStore } from "./cms-store";
import { storage } from "./storage";
import createMemoryStore from "memorystore";

const ADMIN_USER = "admin";
const ADMIN_PASS = "CompleteFlow2024!";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export function registerAdminRoutes(app: Express) {
  const MemoryStore = createMemoryStore(session);

  app.use(
    session({
      secret: "cfp-admin-secret-key-2024",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStore({ checkPeriod: 86400000 }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      },
    })
  );

  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  app.get("/api/admin/cms", requireAdmin, (_req, res) => {
    res.json(cmsStore.getAll());
  });

  app.get("/api/admin/seo/:page", requireAdmin, (req, res) => {
    const seo = cmsStore.getPageSEO(req.params.page);
    if (seo) {
      res.json(seo);
    } else {
      res.status(404).json({ message: "Page not found" });
    }
  });

  app.put("/api/admin/seo/:page", requireAdmin, (req, res) => {
    cmsStore.updatePageSEO(req.params.page, req.body);
    res.json({ success: true });
  });

  app.get("/api/admin/business-info", requireAdmin, (_req, res) => {
    res.json(cmsStore.getBusinessInfo());
  });

  app.put("/api/admin/business-info", requireAdmin, (req, res) => {
    cmsStore.updateBusinessInfo(req.body);
    res.json({ success: true });
  });

  app.get("/api/admin/services", requireAdmin, (_req, res) => {
    res.json(cmsStore.getServices());
  });

  app.put("/api/admin/services/:id", requireAdmin, (req, res) => {
    cmsStore.updateService(req.params.id, req.body);
    res.json({ success: true });
  });

  app.post("/api/admin/services", requireAdmin, (req, res) => {
    cmsStore.addService(req.body);
    res.json({ success: true });
  });

  app.delete("/api/admin/services/:id", requireAdmin, (req, res) => {
    cmsStore.deleteService(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/testimonials", requireAdmin, (_req, res) => {
    res.json(cmsStore.getTestimonials());
  });

  app.put("/api/admin/testimonials/:id", requireAdmin, (req, res) => {
    cmsStore.updateTestimonial(req.params.id, req.body);
    res.json({ success: true });
  });

  app.post("/api/admin/testimonials", requireAdmin, (req, res) => {
    cmsStore.addTestimonial(req.body);
    res.json({ success: true });
  });

  app.delete("/api/admin/testimonials/:id", requireAdmin, (req, res) => {
    cmsStore.deleteTestimonial(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/faqs", requireAdmin, (_req, res) => {
    res.json(cmsStore.getFAQs());
  });

  app.put("/api/admin/faqs", requireAdmin, (req, res) => {
    cmsStore.updateFAQs(req.body);
    res.json({ success: true });
  });

  app.get("/api/admin/tracking", requireAdmin, (_req, res) => {
    res.json(cmsStore.getTracking());
  });

  app.put("/api/admin/tracking", requireAdmin, (req, res) => {
    cmsStore.updateTracking(req.body);
    res.json({ success: true });
  });

  app.get("/api/admin/submissions", requireAdmin, async (_req, res) => {
    const quotes = await storage.getQuotes();
    const contacts = await storage.getContacts();
    res.json({ quotes, contacts });
  });
}
