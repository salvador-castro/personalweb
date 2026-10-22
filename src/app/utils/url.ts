import { baseURL } from "@/app/resources";

const ABSOLUTE_URL = /^[a-z][a-z\d+\-.]*:\/\//i;

export function isAbsoluteUrl(value: string): boolean {
  return ABSOLUTE_URL.test(value);
}

/**
 * Joins a base URL with a path. If `pathOrUrl` is already absolute it is
 * returned untouched, so the host/protocol can never be duplicated.
 */
export function joinUrl(base: string, pathOrUrl = "/"): string {
  if (isAbsoluteUrl(pathOrUrl)) return pathOrUrl;
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${normalizedBase}${normalizedPath}`;
}

/** Absolute URL on the site domain (https://www.salvacastro.com.ar/...). */
export function absoluteUrl(pathOrUrl = "/"): string {
  return joinUrl(baseURL, pathOrUrl);
}

/** Path of the dynamic OG image for a title, with the title safely encoded. */
export function ogImagePath(title: string): string {
  return `/og?title=${encodeURIComponent(title)}`;
}

/** Absolute URL of the dynamic OG image for a title. */
export function ogImageUrl(title: string): string {
  return absoluteUrl(ogImagePath(title));
}
