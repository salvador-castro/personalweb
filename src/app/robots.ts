// src/app/robots.ts
import { baseURL } from "@/app/resources";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `https://${baseURL}/sitemap.xml`,
  };
}
