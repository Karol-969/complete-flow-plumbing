import { useEffect } from "react";
import { BUSINESS_INFO } from "@shared/schema";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article" | "local.business";
  image?: string;
  keywords?: string[];
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  type = "website",
  image,
  keywords = [],
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes(BUSINESS_INFO.name) 
    ? title 
    : `${title} | ${BUSINESS_INFO.name}`;
  
  const baseUrl = "https://completeflowplumbing.com.au";
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : (typeof window !== 'undefined' ? `${baseUrl}${window.location.pathname}` : baseUrl);
  const imageUrl = image || `${baseUrl}/og-image.png`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));
    
    if (noindex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow');
    }

    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type, true);
    updateMeta('og:url', canonicalUrl, true);
    updateMeta('og:image', imageUrl, true);
    updateMeta('og:site_name', BUSINESS_INFO.name, true);
    updateMeta('og:locale', 'en_AU', true);

    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', imageUrl);

    updateLink('canonical', canonicalUrl);

    updateMeta('geo.region', 'AU-NSW');
    updateMeta('geo.placename', 'Sydney');

    return () => {
    };
  }, [fullTitle, description, canonicalUrl, imageUrl, type, keywords, noindex]);

  return null;
}
