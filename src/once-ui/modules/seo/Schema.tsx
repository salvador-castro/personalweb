import React from "react";
import { joinUrl, ogImagePath } from "@/app/utils/url";
import { schemaIds } from "@/app/utils/structuredData";
import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SchemaProps {
  as:
    | "website"
    | "article"
    | "blog"
    | "blogPosting"
    | "techArticle"
    | "webPage"
    | "collectionPage"
    | "creativeWork"
    | "organization"
    | "profilePage";
  title: string;
  description: string;
  baseURL: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
  };
  breadcrumb?: BreadcrumbItem[];
  /** Extra properties merged into the main node (e.g. `about`, `mainEntity`) */
  extra?: Record<string, unknown>;
}

const schemaTypeMap = {
  website: "WebSite",
  article: "Article",
  blog: "Blog",
  blogPosting: "BlogPosting",
  techArticle: "TechArticle",
  webPage: "WebPage",
  collectionPage: "CollectionPage",
  creativeWork: "CreativeWork",
  organization: "Organization",
  profilePage: "ProfilePage",
};

// Page-like types: described by name and attached to the site
const pageTypes = new Set(["website", "webPage", "collectionPage", "organization", "profilePage", "blog"]);

export function Schema({
  as,
  title,
  description,
  baseURL,
  path,
  datePublished,
  dateModified,
  image,
  author,
  breadcrumb,
  extra,
}: SchemaProps) {
  // joinUrl keeps absolute images as-is, so callers may pass either a path or a full URL
  const imageUrl = joinUrl(baseURL, image || ogImagePath(title));

  const url = joinUrl(baseURL, path);

  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": schemaTypeMap[as],
    "@id": url,
    url,
    inLanguage: "es-AR",
    isPartOf: { "@id": schemaIds.website },
    image: imageUrl,
    description,
  };

  if (pageTypes.has(as)) {
    schema.name = title;
  } else {
    schema.headline = title;
    schema.mainEntityOfPage = {
      "@type": "WebPage",
      "@id": url,
    };

    if (datePublished) {
      schema.datePublished = datePublished;
      schema.dateModified = dateModified || datePublished;
    }
  }

  if (breadcrumb && breadcrumb.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  if (author) {
    // The author is always the site owner: reference the Person node from the root layout
    const person = {
      "@type": "Person",
      "@id": schemaIds.person,
      name: author.name,
      ...(author.url && { url: author.url }),
      ...(author.image && { image: author.image }),
    };

    if (as === "profilePage") {
      schema.mainEntity = person;
    } else {
      schema.author = person;
    }
  }

  Object.assign(schema, extra);

  return <JsonLd id={`schema-${as}-${path}`} data={schema} />;
}

export default Schema;
