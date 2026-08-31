# Complete Flow Plumbing Website

## Overview
A production-ready SEO-optimized plumbing services website for "Complete Flow Plumbing" serving Sydney and the Southern Highlands region. The site focuses on conversion optimization with mobile-first design and comprehensive local SEO.

## Project Structure

### Frontend (client/)
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation

### Backend (server/)
- **Framework**: Express.js
- **Storage**: In-memory storage (MemStorage)
- **Validation**: Zod schemas

### Key Directories
```
client/src/
├── components/
│   ├── forms/          # Quote and contact forms
│   ├── home/           # Homepage sections
│   ├── layout/         # Header, Footer, Layout
│   └── ui/             # shadcn components
├── pages/              # Route pages
├── hooks/              # Custom hooks
└── lib/                # Utilities

server/
├── routes.ts           # API endpoints
├── storage.ts          # Data storage
└── index.ts            # Server setup

shared/
└── schema.ts           # Shared types, schemas, data
```

## Pages

### Core Pages
- **/** - Homepage with hero, services, testimonials, FAQs
- **/about** - Company story and values
- **/services** - Services hub with all service categories
- **/services/:slug** - Individual service detail pages
- **/locations** - Service areas hub
- **/locations/:slug** - Individual suburb pages
- **/contact** - Contact form and information
- **/blog** - Blog and DIY tutorials hub

## API Endpoints

### POST /api/quotes
Submit a quote request
- Body: `{ name, phone, email?, suburb, serviceType, urgency, message? }`
- Response: `{ success: true, message, id }`

### POST /api/contact
Submit a contact message
- Body: `{ name, phone, email, message }`
- Response: `{ success: true, message, id }`

### GET /api/quotes
Retrieve all quote requests (admin)

### GET /api/contacts
Retrieve all contact messages (admin)

## Data Models (shared/schema.ts)

### QuoteRequest
- name, phone, email (optional), suburb, serviceType, urgency, message

### ContactForm
- name, phone, email, message

### Static Data
- SERVICES: Array of service definitions
- SOUTHERN_HIGHLANDS_SUBURBS: 44 suburbs
- SYDNEY_METRO_SUBURBS: 19 suburbs
- TESTIMONIALS: Customer reviews
- HOME_FAQS: Homepage FAQs
- BUSINESS_INFO: Placeholder business details

## Design System

### Colors
- **Primary**: Blue (210° hue) - Professional, trustworthy
- **Accent**: Orange (35° hue) - CTAs, highlights
- **Emergency**: Red - Emergency banners
- **Success**: Green - Confirmations, checkmarks

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: Bold, text-4xl to text-6xl
- **Body**: text-base to text-lg

### Components
Uses shadcn/ui components:
- Button, Card, Badge, Dialog
- Form, Input, Textarea, Select
- Accordion, Tabs
- Toast notifications

## SEO Features
- Semantic HTML structure
- Meta tags per page
- LocalBusiness schema (JSON-LD)
- FAQ schema for accordion sections
- Clean URL slugs
- Internal linking between services and locations

## SEO Improvements (Latest)
### On-Page SEO Overhaul
- Title tag now starts with primary keyword: "Plumber Sydney | #1 Emergency & Same-Day Plumbing | Complete Flow Plumbing"
- Service page titles: "[Service Name] Sydney | Licensed Same-Day | Complete Flow Plumbing"
- Location page titles: "Plumber [Suburb] | Emergency & Same-Day | Complete Flow Plumbing"
- Canonical URLs hardcoded to https://completeflowplumbing.com.au (no longer client-side generated)
- Meta description contains phone number (0468 723 029) for click-through rate
- Keywords expanded in index.html to cover all major search terms

### Rich Content Section (New: seo-content.tsx)
- Homepage now has a comprehensive SEO content section below FAQs
- Includes H2/H3 hierarchy targeting: "Sydney's Most Trusted Local Plumber", "Complete Plumbing Services", "Why Sydney Homeowners Choose Us"
- 6 service descriptions with internal links to /services/:slug
- 24 suburb location links with "Plumber [Suburb]" anchor text
- Right sidebar with CTA, service list, and coverage area info

### Footer Upgrade
- Footer now links ALL 89 suburbs (Sydney metro + Southern Highlands)
- Anchor text format: "Plumber [Suburb]" — exact keyword match
- Visible section heading: "Plumber Services Across Sydney & Southern Highlands"

### Location Page Content Upgrade
- generateSuburbContent now produces 4 content fields (intro, localInfo, services, pipes)
- Each suburb page has ~400 words of unique, keyword-dense content
- H3 subheadings: "Plumbing Services in [Suburb]" and "Local Pipe & Drain Knowledge"
- Southern Highlands vs Sydney differentiation in climate/pipe content

### Schema & Technical
- Static JSON-LD with AggregateRating (5.0/47 reviews) in index.html for Googlebot pre-JS crawl
- Dynamic LocalBusiness schema includes aggregateRating, 14 areaServed entries, currenciesAccepted, paymentAccepted
- Sydney metro suburbs expanded from 19 to 45
- 8 new keyword-targeted blog posts with full content
- Sitemap includes all 27 blog post URLs
- www → non-www 301 redirect middleware

## Business Info
- **Phone**: 0468 723 029
- **Email**: info@completeflowplumbing.com.au
- **ABN**: 45 685 684 020
- **Licence**: 395338C (NSW Fair Trading)
- **Address**: Sydney & Southern Highlands, NSW (update with physical address when available)
- **Google Review Link**: placeholder — update with real Google Business Profile URL once created

## Image Placeholders
The site includes placeholder blocks for:
- Hero images (van, plumber at work)
- Team photos
- Service-specific images
- Before/after gallery
- Suburb/location images

## Running the Project
```bash
npm run dev
```
Server runs on port 5000 with Vite frontend.

## Key Features
1. **24/7 Emergency CTAs** - Prominent call-to-action buttons
2. **Sticky Mobile CTAs** - Fixed bottom bar on mobile
3. **Quote Form** - Multi-step with urgency selection
4. **Location Pages** - SEO-optimized suburb landing pages
5. **Service Pages** - Detailed service descriptions with FAQs
6. **Trust Signals** - Badges for licensed, insured, guaranteed
7. **Dark Mode** - Theme toggle support
