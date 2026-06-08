import { useEffect } from "react";
import { BUSINESS_INFO, REGIONS, type Service, type Location, type FAQ } from "@shared/schema";

interface LocalBusinessSchemaProps {
  additionalType?: string;
}

export function LocalBusinessSchema({ additionalType }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Plumber"],
    ...(additionalType && { additionalType }),
    "@id": "https://completeflowplumbing.com.au/#organization",
    name: BUSINESS_INFO.name,
    description: "Professional plumbing services across the Sutherland Shire, Wollondilly, Southern Highlands, Wollongong, Illawarra and Southern Tablelands. 24/7 emergency plumber, blocked drains, hot water systems, gas fitting, and leak detection. Licensed & insured.",
    url: "https://completeflowplumbing.com.au",
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    image: "https://completeflowplumbing.com.au/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressRegion: "NSW",
      addressCountry: "AU"
    },
    areaServed: REGIONS.map((region) => ({
      "@type": "AdministrativeArea",
      name: region.displayName
    })),
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Credit Card, EFTPOS, Bank Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59"
      }
    ],
    sameAs: [
      BUSINESS_INFO.googleReviewLink,
      "https://completeflowplumbing.com.au"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing Services Across Sydney, the Illawarra, Southern Highlands & Southern Tablelands",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Plumbing", description: "24/7 emergency plumber available across all our service regions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Blocked Drains", description: "Fast blocked drain clearing using CCTV and hydro jetting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hot Water Systems", description: "Hot water system repair, replacement and installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gas Fitting", description: "Licensed gas plumber for all gas fitting and repairs" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Leak Detection", description: "Advanced leak detection to find and fix hidden water leaks" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pipe Relining", description: "No-dig pipe relining to repair damaged pipes without excavation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "CCTV Drain Inspection", description: "Camera drain inspection to identify blockages and pipe damage" } }
      ]
    }
  };

  return <JsonLd data={schema} id="local-business-schema" />;
}

interface ServiceSchemaProps {
  service: Service;
  suburb?: string;
}

export function ServiceSchema({ service, suburb }: ServiceSchemaProps) {
  const serviceName = suburb 
    ? `${service.title} in ${suburb}` 
    : service.title;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone
    },
    areaServed: suburb ? {
      "@type": "City",
      name: suburb
    } : {
      "@type": "State",
      name: "New South Wales"
    },
    serviceType: service.title,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: typeof window !== 'undefined' ? window.location.href : '',
      servicePhone: BUSINESS_INFO.phone,
      availableLanguage: "English"
    }
  };

  return <JsonLd data={schema} id={`service-schema-${service.slug}`} />;
}

interface FAQSchemaProps {
  faqs: FAQ[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return <JsonLd data={schema} id="faq-schema" />;
}

// NOTE: Review/AggregateRating schema intentionally removed. Structured-data
// reviews must reflect REAL, verifiable customer reviews — fabricated ratings
// risk a Google manual action. Re-add only when wired to genuine review data.

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`
    }))
  };

  return <JsonLd data={schema} id="breadcrumb-schema" />;
}

interface LocationSchemaProps {
  location: Location;
}

export function LocationSchema({ location }: LocationSchemaProps) {
  const regionName = REGIONS.find((r) => r.slug === location.region)?.displayName ?? "New South Wales";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Plumber in ${location.name}`,
    description: `Professional plumbing services in ${location.name}, ${regionName}. Emergency plumber, blocked drains, hot water, gas fitting. Call now!`,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone
    },
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: "New South Wales",
        containedInPlace: {
          "@type": "Country",
          name: "Australia"
        }
      }
    },
    serviceType: "Plumbing Services"
  };

  return <JsonLd data={schema} id={`location-schema-${location.slug}`} />;
}

interface HowToSchemaProps {
  title: string;
  steps: string[];
}

export function HowToSchema({ title, steps }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: step
    }))
  };

  return <JsonLd data={schema} id="howto-schema" />;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  author?: string;
}

export function ArticleSchema({ title, description, datePublished, author = BUSINESS_INFO.name }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phone
    },
    datePublished: datePublished,
    dateModified: datePublished
  };

  return <JsonLd data={schema} id="article-schema" />;
}

interface OrganizationSchemaProps {}

export function OrganizationSchema({}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    logo: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '',
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_INFO.phone,
      contactType: "customer service",
      areaServed: "AU",
      availableLanguage: "English"
    },
    sameAs: [
      BUSINESS_INFO.googleReviewLink
    ]
  };

  return <JsonLd data={schema} id="organization-schema" />;
}

interface WebsiteSchemaProps {}

export function WebsiteSchema({}: WebsiteSchemaProps) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_INFO.name,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/locations/{search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLd data={schema} id="website-schema" />;
}

interface JsonLdProps {
  data: object;
  id: string;
}

function JsonLd({ data, id }: JsonLdProps) {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [data, id]);

  return null;
}
