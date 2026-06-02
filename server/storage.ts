import { type User, type InsertUser, type QuoteRequest, type ContactForm } from "@shared/schema";
import { randomUUID } from "crypto";

export interface StoredQuote extends QuoteRequest {
  id: string;
  createdAt: Date;
  read: boolean;
}

export interface StoredContact extends ContactForm {
  id: string;
  createdAt: Date;
  read: boolean;
}

export interface TrackingCode {
  id: string;
  name: string;
  type: "ga4" | "gtm" | "google-ads" | "facebook-pixel" | "custom";
  value: string;
  enabled: boolean;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createQuote(quote: QuoteRequest): Promise<StoredQuote>;
  getQuotes(): Promise<StoredQuote[]>;
  markQuoteRead(id: string): Promise<void>;

  createContact(contact: ContactForm): Promise<StoredContact>;
  getContacts(): Promise<StoredContact[]>;
  markContactRead(id: string): Promise<void>;

  getTrackingCodes(): Promise<TrackingCode[]>;
  saveTrackingCodes(codes: TrackingCode[]): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quotes: Map<string, StoredQuote>;
  private contacts: Map<string, StoredContact>;
  private trackingCodes: TrackingCode[];

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.contacts = new Map();
    this.trackingCodes = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuote(quote: QuoteRequest): Promise<StoredQuote> {
    const id = randomUUID();
    const stored: StoredQuote = { ...quote, id, createdAt: new Date(), read: false };
    this.quotes.set(id, stored);
    return stored;
  }

  async getQuotes(): Promise<StoredQuote[]> {
    return Array.from(this.quotes.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async markQuoteRead(id: string): Promise<void> {
    const q = this.quotes.get(id);
    if (q) this.quotes.set(id, { ...q, read: true });
  }

  async createContact(contact: ContactForm): Promise<StoredContact> {
    const id = randomUUID();
    const stored: StoredContact = { ...contact, id, createdAt: new Date(), read: false };
    this.contacts.set(id, stored);
    return stored;
  }

  async getContacts(): Promise<StoredContact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async markContactRead(id: string): Promise<void> {
    const c = this.contacts.get(id);
    if (c) this.contacts.set(id, { ...c, read: true });
  }

  async getTrackingCodes(): Promise<TrackingCode[]> {
    return this.trackingCodes;
  }

  async saveTrackingCodes(codes: TrackingCode[]): Promise<void> {
    this.trackingCodes = codes;
  }
}

export const storage = new MemStorage();
