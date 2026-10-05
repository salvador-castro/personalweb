"use client";

import { usePathname } from "next/navigation";
import { routes } from "@/app/resources";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
	children: React.ReactNode;
}

const checkRouteEnabled = (pathname: string | null) => {
  if (!pathname) return false;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  const dynamicRoutes = ["/blog", "/trabajos", "/landings"] as const;
  for (const route of dynamicRoutes) {
    if (pathname.startsWith(route) && routes[route]) {
      return true;
    }
  }

  // Allow /landings/* even if /landings is not in routes config
  if (pathname.startsWith("/landings/")) {
    return true;
  }

  return false;
};

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  // Derived synchronously so public pages are server-rendered (no spinner until hydration)
  const isRouteEnabled = checkRouteEnabled(pathname);

  if (!isRouteEnabled) {
		return <NotFound />;
	}

  return <>{children}</>;
};

export { RouteGuard };
