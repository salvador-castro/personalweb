import { baseURL } from "@/app/resources";
import { person, home, servicios } from "@/app/resources/content";
import { pricing, formatPrice, minPrice } from "@/app/resources/pricing";
import { servicePath, type FaqItem } from "@/app/resources/services";
import { absoluteUrl } from "@/app/utils/url";

// Stable @id anchors so every page can reference the same entities
export const schemaIds = {
  person: `${baseURL}/#person`,
  business: `${baseURL}/#business`,
  website: `${baseURL}/#website`,
};

const profiles = [person.github, person.linkedin, person.x, person.youtube].filter(Boolean);

const telephone = `+${person.whatsapp}`;

export const areaServed = [
  { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
  { "@type": "AdministrativeArea", name: "Área Metropolitana de Buenos Aires (AMBA)" },
  { "@type": "Country", name: "Argentina" },
  { "@type": "Country", name: "Uruguay" },
];

const address = {
  "@type": "PostalAddress",
  addressLocality: "Buenos Aires",
  addressRegion: "Ciudad Autónoma de Buenos Aires",
  addressCountry: "AR",
};

/** Offer for a price item, linking to the page of its service. */
export function priceOffer(item: (typeof pricing.items)[number], serviceUrl: string) {
  return {
    "@type": "Offer",
    name: item.label,
    url: serviceUrl,
    priceCurrency: pricing.currency,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: item.from,
      priceCurrency: pricing.currency,
      validFrom: pricing.updatedAt,
    },
    itemOffered: { "@type": "Service", name: item.label, provider: { "@id": schemaIds.business } },
  };
}

/** Site-wide entities: who I am, the business and the website. Rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": schemaIds.person,
        name: person.name,
        givenName: person.firstName,
        familyName: person.lastName,
        jobTitle: person.role,
        description: home.description,
        url: absoluteUrl("/sobre-mi"),
        image: absoluteUrl(person.avatar),
        email: `mailto:${person.email}`,
        telephone,
        address,
        knowsLanguage: ["es", "en"],
        knowsAbout: [
          "Desarrollo web",
          "Diseño de páginas web",
          "Tiendas online",
          "Sistemas de turnos",
          "Next.js",
          "React",
          "SEO",
        ],
        alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Tecnológica Nacional (FRBA)" },
        worksFor: { "@id": schemaIds.business },
        sameAs: profiles,
      },
      {
        "@type": "ProfessionalService",
        "@id": schemaIds.business,
        name: `${person.name} – Desarrollo web para PyMEs`,
        description: servicios.description,
        url: baseURL,
        image: absoluteUrl("/images/avatar-og.jpg"),
        email: person.email,
        telephone,
        address,
        areaServed,
        priceRange: `Desde ${formatPrice(minPrice())} ${pricing.currency}`,
        currenciesAccepted: `${pricing.currency}, ${pricing.foreignCurrency}`,
        founder: { "@id": schemaIds.person },
        sameAs: profiles,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de desarrollo web",
          itemListElement: pricing.items.map((item) => priceOffer(item, absoluteUrl(servicePath(item.service)))),
        },
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website,
        name: person.name,
        alternateName: "salvacastro.com.ar",
        url: baseURL,
        inLanguage: "es-AR",
        publisher: { "@id": schemaIds.person },
      },
    ],
  };
}

export function faqPage(items: FaqItem[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    inLanguage: "es-AR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
