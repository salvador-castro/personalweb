import { NextResponse, type NextRequest } from "next/server";
import { tagSlug } from "@/app/utils/tags";

const CANONICAL_ORIGIN = "https://www.salvacastro.com.ar";

// Legacy URLs from the duplicated-domain bug, e.g. /https:/www.salvacastro.com.ar/images/x.webp
const DUPLICATED_DOMAIN = /^\/https?:\/+/i;
const SITE_HOST = /^(?:www\.)?salvacastro\.com\.ar(?=\/|$)/i;

// Legacy tag URLs used the raw tag name (/blog/tag/Tecnolog%C3%ADa). next.config redirects
// can't match accented paths and compare case-insensitively, so they're handled here
const TAG_PATH = /^\/blog\/tag\/([^/]+)\/?$/;

// Merged tags: old slug -> the tag that replaced it
const TAG_ALIASES: Record<string, string> = {
  seguridad: "ciberseguridad",
};

function redirect(path: string, search = "") {
  return NextResponse.redirect(`${CANONICAL_ORIGIN}${path}${search}`, 301);
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
    if (SITE_HOST.test(rest)) return redirect(rest.replace(SITE_HOST, "") || "/", search);
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
