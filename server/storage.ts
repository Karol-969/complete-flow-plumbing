import { type User, type InsertUser, type QuoteRequest, type ContactForm } from "@shared/schema";
import { randomUUID } from "crypto";

// Quote with ID for storage
export interface StoredQuote extends QuoteRequest {
  id: string;
  createdAt: Date;
}

// Contact message with ID for storage
export interface StoredContact extends ContactForm {
  id: string;
  createdAt: Date;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quote requests
  createQuote(quote: QuoteRequest): Promise<StoredQuote>;
  getQuotes(): Promise<StoredQuote[]>;
  
  // Contact messages
  createContact(contact: ContactForm): Promise<StoredContact>;
  getContacts(): Promise<StoredContact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quotes: Map<string, StoredQuote>;
  private contacts: Map<string, StoredContact>;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.contacts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuote(quote: QuoteRequest): Promise<StoredQuote> {
    const id = randomUUID();
    const storedQuote: StoredQuote = {
      ...quote,
      id,
      createdAt: new Date(),
    };
    this.quotes.set(id, storedQuote);
    return storedQuote;
  }

  async getQuotes(): Promise<StoredQuote[]> {
    return Array.from(this.quotes.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createContact(contact: ContactForm): Promise<StoredContact> {
    const id = randomUUID();
    const storedContact: StoredContact = {
      ...contact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, storedContact);
    return storedContact;
  }

  async getContacts(): Promise<StoredContact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
