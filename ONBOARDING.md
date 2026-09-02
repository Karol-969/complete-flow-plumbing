# Complete Flow Plumbing — Agent Handoff

Marketing/SEO website for Complete Flow Plumbing (Sydney, Southern Highlands & South Coast).

## Stack
- **Frontend:** React + TypeScript + Vite, Tailwind + shadcn/ui, `wouter` routing, `framer-motion`, TanStack Query.
- **Backend:** Express (TypeScript), in-memory storage (no live DB required to run). `drizzle` config exists but the site runs on in-memory data.
- **Content/data lives in `shared/schema.ts`**: `SERVICES`, `REGIONS`, all suburb lists + `ALL_LOCATIONS`, `BUSINESS_INFO` (phone, review count/rating, licence), `HOME_FAQS`, testimonials.
- **Images:** `attached_assets/` imported via the `@assets` alias. Homepage service-card photos are mapped by slug in `client/src/components/home/services-showcase.tsx` (`PHOTO_BY_SLUG`).

## Layout
- `client/src/pages/` — routed pages (`home.tsx`, `about.tsx`, `services.tsx`, `service-detail.tsx`, `locations.tsx`, `contact.tsx`, `blog*.tsx`, `terms.tsx`).
- `client/src/components/home/` — homepage sections. Home order is set in `pages/home.tsx`.
- `server/` — Express app, routes, admin routes, sitemap.
- Two service-grid components exist: **`services-showcase.tsx` is the live one** (photo cards on the homepage). `services-grid.tsx` (icon cards) is NOT used on home.

## Run & build
```bash
npm install
npm run dev        # dev server on PORT 5000
npm run build      # production build → dist/
npm run start      # serve production build
```
- macOS note: Control Center squats on port 5000, so use `PORT=5090 npm run dev` locally.
- Node v22.

## Git — IMPORTANT (two forks)
- `origin`  = `github.com/Karol-96/complete-flow-plumbing`  (Karol-96's fork)
- `upstream`= `github.com/Karol-969/complete-flow-plumbing`  (**this is the one Render deploys**)
- Deploy branch: **`main` on `upstream`**. Keep both remotes in sync — push to `upstream main` AND `origin main`.
- Current working branch: `sync-origin`.

## Hosting / deploy
- **Render** web service `complete-flow-plumbing` (Docker/Starter), fronted by **Cloudflare**.
- Domain: `https://completeflowplumbing.com.au`.
- **Auto-deploys on push to `upstream/main`.** Build+publish takes ~60s. Watch Events/Logs in the Render dashboard.
- Verify a deploy went live by checking the hashed JS bundle name changes at `/` (e.g. `assets/index-XXXX.js`) and that `sitemap.xml` reflects data changes.

## Environment variables (set in Render → Environment — NOT in the repo)
- `SESSION_SECRET` — session signing secret
- `ADMIN_PASSWORD` — admin panel login
- `MAIL_USER`, `MAIL_PASS` — SMTP creds for the quote/contact form (nodemailer)
- `MAIL_TO` — inbox that receives form submissions
- `PORT`, `NODE_ENV` — runtime (Render sets these)

## Conventions
- All service-area copy lists the regions; there is **no "Western Sydney"** and **no "Penrose"** (removed per client). Region count is **10**.
- Review count/rating come from `BUSINESS_INFO.googleReviewCount` / `googleRating` — change in one place.
- After renaming a service slug, also update: `PHOTO_BY_SLUG` (services-showcase), header nav links, and any `/services/<slug>` prose links.
