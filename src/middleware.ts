import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.salvacastro.com.ar";

// Legacy URLs from the duplicated-domain bug, e.g. /https:/www.salvacastro.com.ar/images/x.webp
const DUPLICATED_DOMAIN = /^\/https?:\/+/i;
const SITE_HOST = /^(?:www\.)?salvacastro\.com\.ar(?=\/|$)/i;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (DUPLICATED_DOMAIN.test(pathname)) {
    const rest = pathname.replace(DUPLICATED_DOMAIN, "");
    if (SITE_HOST.test(rest)) {
      const path = rest.replace(SITE_HOST, "") || "/";
      return NextResponse.redirect(`${CANONICAL_ORIGIN}${path}${search}`, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, real files under /public and the favicon.
  // File extensions are not excluded on purpose: the legacy URLs end in .webp
  matcher: ["/((?!_next/|images/|fonts/|favicon\\.ico).*)"],
};
