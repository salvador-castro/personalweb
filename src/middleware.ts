import { NextResponse, type NextRequest } from "next/server";
import { tagSlug } from "@/app/utils/tags";
import { LEGACY_PROJECT_SLUGS } from "@/app/trabajos/legacySlugs";

const CANONICAL_ORIGIN = "https://www.salvacastro.com.ar";

// Legacy URLs from the duplicated-domain bug, e.g. /https:/www.salvacastro.com.ar/images/x.webp
const DUPLICATED_DOMAIN = /^\/https?:\/+/i;
const SITE_HOST = /^(?:www\.)?salvacastro\.com\.ar(?=\/|$)/i;

// Legacy tag URLs used the raw tag name (/blog/tag/Tecnolog%C3%ADa). next.config redirects
// can't match accented paths and compare case-insensitively, so they're handled here
const TAG_PATH = /^\/blog\/tag\/([^/]+)\/?$/;

// Project URLs used PascalCase slugs (/trabajos/ClaptonBarberia); now they are kebab-case.
// Matched case-sensitively here because next.config redirects compare paths case-insensitively,
// which would loop on slugs that only change case (/trabajos/Turnos-Clapton -> /trabajos/turnos-clapton)
const PROJECT_PATH = /^\/trabajos\/([^/]+)\/?$/;

// Junk URLs Google discovered from broken links: /&, /&amp;..., /%26...
const AMPERSAND_PATH = /^\/(?:&|%26)/i;

// Merged tags: old slug -> the tag that replaced it
const TAG_ALIASES: Record<string, string> = {
  seguridad: "ciberseguridad",
};

function redirect(path: string, search = "") {
  return NextResponse.redirect(`${CANONICAL_ORIGIN}${path}${search}`, 301);
}

/** 410 Gone: tells crawlers the URL never comes back, so it drops out of the index faster than a 404. */
function gone() {
  return new NextResponse("410 Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

function decode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (DUPLICATED_DOMAIN.test(pathname)) {
    const rest = pathname.replace(DUPLICATED_DOMAIN, "");
    // Our own host duplicated: send it to the real page or image
    if (SITE_HOST.test(rest)) return redirect(rest.replace(SITE_HOST, "") || "/", search);
    // Any other absolute URL glued to the path is junk
    return gone();
  }

  if (AMPERSAND_PATH.test(pathname)) return gone();

  const projectMatch = pathname.match(PROJECT_PATH);
  if (projectMatch) {
    const raw = decode(projectMatch[1]);
    const slug = LEGACY_PROJECT_SLUGS[raw.toLowerCase()] ?? raw.toLowerCase();
    if (slug !== projectMatch[1]) return redirect(`/trabajos/${slug}`, search);
  }

  const tagMatch = pathname.match(TAG_PATH);
  if (tagMatch) {
    const cleanSlug = tagSlug(decode(tagMatch[1]));
    const slug = TAG_ALIASES[cleanSlug] ?? cleanSlug;
    if (slug && slug !== tagMatch[1]) return redirect(`/blog/tag/${slug}`, search);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, real files under /public and the favicon.
  // File extensions are not excluded on purpose: the legacy URLs end in .webp
  matcher: ["/((?!_next/|images/|fonts/|favicon\\.ico).*)"],
};
