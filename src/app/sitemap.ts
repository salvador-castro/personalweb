import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

export const dynamic = "force-static";

const routePriority: Record<string, number> = {
  "/": 1.0,
  "/sobre-mi": 0.8,
  "/trabajos": 0.8,
  "/blog": 0.8,
  "/gallery": 0.5,
};

const routeChangeFrequency: Record<string, "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"> = {
  "/": "weekly",
  "/sobre-mi": "monthly",
  "/trabajos": "monthly",
  "/blog": "weekly",
  "/gallery": "monthly",
};

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `https://${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const trabajos = getPosts(["src", "app", "trabajos", "projects"]).map((post) => ({
    url: `https://${baseURL}/trabajos/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route as keyof typeof routesConfig]);

  const routes = activeRoutes.map((route) => ({
    url: `https://${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: routeChangeFrequency[route] ?? "monthly",
    priority: routePriority[route] ?? 0.5,
  }));

  const allBlogPosts = getPosts(["src", "app", "blog", "posts"]);
  const uniqueTags = [...new Set(allBlogPosts.map((p) => p.metadata.tag).filter(Boolean))] as string[];
  const tagPages = uniqueTags.map((tag) => ({
    url: `https://${baseURL}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogs, ...trabajos, ...tagPages];
}
