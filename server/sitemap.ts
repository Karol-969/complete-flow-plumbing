import { SERVICES, ALL_LOCATIONS } from "@shared/schema";

const BASE_URL = "https://completeflowplumbing.com.au";

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    { loc: "/", lastmod: today, changefreq: "weekly", priority: 1.0 },
    { loc: "/about", lastmod: today, changefreq: "monthly", priority: 0.8 },
    { loc: "/services", lastmod: today, changefreq: "weekly", priority: 0.9 },
    { loc: "/locations", lastmod: today, changefreq: "weekly", priority: 0.9 },
    { loc: "/contact", lastmod: today, changefreq: "monthly", priority: 0.8 },
    { loc: "/blog", lastmod: today, changefreq: "weekly", priority: 0.7 },
  ];

  SERVICES.forEach((service) => {
    urls.push({
      loc: `/services/${service.slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.8,
    });
  });

  ALL_LOCATIONS.forEach((location) => {
    urls.push({
      loc: `/locations/${location.slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.85,
    });
  });

  const blogSlugs = [
    "how-to-shut-off-water-mains",
    "burst-pipe-emergency-checklist",
    "how-to-plunge-blocked-toilet",
    "clear-slow-drain-safely",
    "check-hidden-leaks-meter-test",
    "low-water-pressure-quick-checks",
    "no-hot-water-troubleshooting",
    "signs-of-gas-leak",
    "blocked-drains-bowral",
    "plumbing-checks-buying-home",
    "hard-water-effects-plumbing",
    "water-efficient-fixtures-guide",
    "when-to-book-cctv-drain-inspection",
    "what-is-pipe-relining",
    "emergency-plumber-sydney-cost",
    "hot-water-system-types-sydney",
    "blocked-drains-tree-roots",
    "pipe-relining-vs-replacement",
    "prevent-tree-root-damage-pipes",
    "emergency-plumber-sydney-when-to-call",
    "how-much-does-a-plumber-cost-sydney",
    "best-hot-water-system-sydney-homes",
    "blocked-drains-sydney-tree-roots",
    "gas-plumber-sydney-licence-requirements",
    "pipe-relining-vs-replacement-sydney",
    "hot-water-not-working-sydney",
    "plumber-campbelltown-local-guide",
  ];

  blogSlugs.forEach((slug) => {
    urls.push({
      loc: `/blog/${slug}`,
      lastmod: today,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  const urlElements = urls.map(url => `
  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
}

export function generateSitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}
