# Complete Flow Plumbing - Design Guidelines

## Design Approach

**Selected Approach:** Service Industry Best Practices (Hybrid)
Drawing from high-converting service websites like HomeAdvisor, Angi, and Thumbtack, combined with clean, trust-focused design patterns. This is a conversion-focused, utility-first design where speed, clarity, and mobile accessibility are paramount.

**Core Principles:**
- Immediate action pathways (call/quote)
- Trust-first visual hierarchy
- Mobile-dominant experience
- Minimal friction to conversion
- Professional trade aesthetic

---

## Typography System

**Primary Font:** Inter (Google Fonts) - Clean, highly legible, professional
**Secondary Font:** Work Sans (Google Fonts) - For headings, friendly but authoritative

**Hierarchy:**
- H1: text-4xl md:text-5xl font-bold (Service page titles, suburb headings)
- H2: text-3xl md:text-4xl font-semibold (Major sections)
- H3: text-2xl md:text-3xl font-semibold (Subsections, service cards)
- H4: text-xl md:text-2xl font-medium (Card titles, FAQs)
- Body Large: text-lg (Hero subtext, important CTAs)
- Body: text-base (Standard content)
- Small: text-sm (Footer links, disclaimers, meta info)

**Critical:** Phone numbers should be text-2xl md:text-3xl font-bold throughout

---

## Layout & Spacing System

**Tailwind Spacing Units:** 4, 6, 8, 12, 16, 24
- Component padding: p-4 (mobile), p-6 to p-8 (desktop)
- Section spacing: py-12 md:py-16 lg:py-24
- Card gaps: gap-6 md:gap-8
- Element margins: mb-4, mb-6, mb-8

**Container Strategy:**
- Max width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Service pages content: max-w-4xl mx-auto
- Full-width sections with contained inner content

**Grid Patterns:**
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Before/After gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Trust badges: grid-cols-2 md:grid-cols-4

---

## Component Library

### Navigation (Desktop & Mobile)

**Desktop Header:**
- Sticky positioning (sticky top-0 z-50)
- Logo left, navigation center, phone + CTA right
- Height: h-20
- Drop shadow on scroll
- Services mega-menu dropdown (appears on hover, grid layout with icons)

**Mobile Header:**
- Logo left, hamburger right
- Sticky phone bar below header (h-14, always visible)
- Full-screen slide-in menu with large touch targets

**Sticky Mobile CTAs:**
- Fixed bottom bar: bottom-0 left-0 right-0
- Two buttons side-by-side: "Call Now" | "Get Quote"
- Height: h-16
- Blur background effect (backdrop-blur-md)

### Hero Section (Homepage)

**Structure:**
- Full-width background image (uploaded van/plumber at work)
- Height: min-h-[500px] md:min-h-[600px]
- Overlay with semi-transparent gradient
- Centered content with max-w-4xl
- Components: H1 + subheading + dual CTA buttons + trust badges row
- Emergency badge: Floating pill "24/7 Emergency Available" in top-right

**CTA Buttons on Hero:**
- Primary: Large (h-14 px-8 text-lg), blurred background (backdrop-blur-sm)
- Secondary: Same size, border style with blurred background
- Gap between: gap-4
- Icons from Heroicons (phone, document)

### Service Cards

**Layout:** Card with icon/image top, content below
- Rounded corners: rounded-xl
- Padding: p-6
- Border: border-2
- Hover: Subtle lift transform
- Icon/Image: h-16 w-16 mb-4
- Title: H4 styling
- Description: 2-3 lines, text-sm
- CTA link: "Learn More →" text-base font-medium

### Trust Signals Section

**Components:**
- Licensed/Insured badges
- Years in business
- Guarantee seals
- Payment methods
- Review stars + count
- Display as: grid-cols-2 md:grid-cols-4 items-center justify-items-center

### Before/After Gallery

**Implementation:**
- Masonry or standard grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Each item: Image with caption overlay on hover
- Rounded corners: rounded-lg
- Gap: gap-4
- Lightbox modal on click (use library like PhotoSwipe)

### Quote/Booking Forms

**Structure:**
- Two-column on desktop: grid-cols-1 md:grid-cols-2 gap-4
- Fields: Name, Phone (required), Email, Suburb (dropdown), Service Type (dropdown), Urgency (radio), Message (textarea), Photo upload
- Input styling: h-12, rounded-lg, border-2, focus ring
- Submit button: Full-width on mobile, w-auto md:w-48 on desktop
- Validation states with icons

### FAQ Section

**Pattern:** Accordion (using Heroicons chevron)
- Question: font-semibold text-lg, clickable full row
- Answer: Expandable panel, pt-4 pb-6
- Border between items
- Smooth expand/collapse animation

### Testimonials/Reviews

**Card Structure:**
- Quote marks icon (top)
- Review text (2-4 lines, italic)
- Star rating (5-star display)
- Customer name + suburb + service used
- Photo (circular, 48px) if available
- Padding: p-6
- Background treatment (subtle card style)

### Service Area Map Section

**Layout:**
- Split: Image/map left (60%), suburb list right (40%) on desktop
- Stack on mobile
- Suburb list: columns-2 md:columns-3 with checkmarks (Heroicons)
- "View all [X] suburbs we service" CTA button

### Footer

**Multi-section layout:**
- Row 1: Logo + tagline | Quick Links | Services | Contact Info
- Row 2: Service suburbs (collapsed/expandable on mobile)
- Row 3: Copyright | ABN | License | Privacy | Terms
- Newsletter signup embedded in footer (compact, one-line form)
- Social icons (Heroicons or Font Awesome)
- Padding: pt-16 pb-8

---

## Page Templates

### Homepage Sections (in order):
1. Hero with emergency badge
2. Trust signals bar (single row)
3. Top services grid (6-9 cards)
4. Emergency callout banner (full-width, urgent styling)
5. Process steps (4 icons + text: Call → Diagnose → Quote → Fix)
6. Before/After gallery
7. Service areas teaser + map
8. Reviews (3-column grid)
9. FAQ (top 8 questions)
10. Final CTA banner

### Service Pages Structure:
1. Hero (smaller, h-80, service-specific image)
2. Breadcrumbs
3. Intro paragraph + emergency CTA
4. "Why Choose Us" (3-4 points with icons)
5. Service details (2-column: content left, sidebar right with phone/form)
6. Process/What to Expect
7. Pricing transparency section
8. Related services cards
9. Suburb coverage for this service
10. FAQ (service-specific)
11. Review snippets

### Suburb Pages Structure:
1. Hero banner (suburb landmark if available, otherwise service van)
2. H1: "Plumber in [Suburb]"
3. Emergency availability banner
4. Service highlights (grid of 6-8)
5. "Common Issues in [Suburb]" section
6. Local trust signals (reviews from that area)
7. FAQ (suburb-specific)
8. Nearby suburbs links
9. CTA block

---

## Images

**Required Image Placements:**

**Homepage:**
- Hero: Service van or plumber at work (full-width, high-quality)
- Before/After gallery: 8-12 job photos
- Team section: Team photo or individual headshots

**Service Pages:**
- Hero: Service-specific (e.g., CCTV camera for drain inspection, hot water tank for hot water service)
- In-content: 2-3 relevant job photos throughout article

**Suburb Pages:**
- Hero: Local landmark OR service van in area OR job photo from that suburb

**About Page:**
- Team photo (group)
- Individual team member headshots (if available)
- Van/equipment photos
- Office/workshop image

**All uploaded images should use descriptive alt text:** "Complete Flow Plumbing technician performing [service] in [location]"

---

## Mobile-First Requirements

- All touch targets: min-h-12 (48px)
- Form inputs: min-h-12
- Buttons: min-h-12 md:min-h-14
- Phone numbers always one-tap-to-call (tel: links)
- Sticky elements don't obscure content
- Hamburger menu items: Large, well-spaced (h-14 each)
- Gallery images: Swipeable on mobile
- Forms: Single column, generous spacing

---

## Accessibility

- All form inputs with visible labels
- Focus states with clear ring (ring-2)
- Sufficient contrast ratios throughout
- Skip-to-content link
- ARIA labels on icon buttons
- Semantic HTML (nav, main, section, article, aside)
- Keyboard navigation for all interactive elements

---

## Icons

**Library:** Heroicons (via CDN)

**Common Icons Needed:**
- Phone, mail, map pin, clock (header/contact)
- Wrench, droplet, fire, shield (services)
- Check mark (features, suburb lists)
- Star (reviews)
- Menu, X (mobile nav)
- Chevron down (accordions, dropdowns)
- Upload (forms)
- External link (blog posts)