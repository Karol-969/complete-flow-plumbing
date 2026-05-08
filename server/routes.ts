import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quoteRequestSchema, contactFormSchema } from "@shared/schema";
import { z } from "zod";
import { generateSitemap } from "./sitemap";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (host.startsWith("www.")) {
      const newHost = host.slice(4);
      return res.redirect(301, `https://${newHost}${req.url}`);
    }
    next();
  });

  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = quoteRequestSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      
      console.log("New quote request received:", {
        name: quote.name,
        suburb: quote.suburb,
        service: quote.serviceType,
        urgency: quote.urgency,
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Quote request submitted successfully",
        id: quote.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Error creating quote:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit quote request" 
        });
      }
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      console.log("New contact message received:", {
        name: contact.name,
        email: contact.email,
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        id: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(generateSitemap());
  });

  return httpServer;
}
