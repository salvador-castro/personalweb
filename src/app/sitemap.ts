import { getBlogTags, getPosts, newestLastModified, postLastModified } from "@/app/utils/utils";
import { baseURL, routes as routesConfig, sobremi, home } from "@/app/resources";
import { MIN_POSTS_TO_INDEX_TAG, tagPath } from "@/app/utils/tags";
import { servicePages, servicePath, servicePagesUpdatedAt } from "@/app/resources/services";
import { pricing } from "@/app/resources/pricing";

export const dynamic = "force-static";

const routePriority: Record<string, number> = {
  "/": 1.0,
  "/servicios": 0.9,
  "/sobre-mi": 0.8,
  "/trabajos": 0.8,
  "/blog": 0.8,
};

const routeChangeFrequency: Record<string, "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"> = {
  "/": "weekly",
  "/servicios": "monthly",
  "/sobre-mi": "monthly",
  "/trabajos": "monthly",
  "/blog": "weekly",
};

// Every lastmod comes from content dates, never from the build date
export default async function sitemap() {
  const allBlogPosts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const allProjects = getPosts(["src", "app", "trabajos", "projects"]);

  const blogs = allBlogPosts.map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: postLastModified(post),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const trabajos = allProjects.map((post) => ({
    url: `${baseURL}/trabajos/${post.slug}`,
    lastModified: postLastModified(post),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Service pages change when prices or their copy change
  const servicesLastModified = [pricing.updatedAt, servicePagesUpdatedAt].sort().at(-1);

  const servicios = routesConfig["/servicios"]
    ? servicePages.map((page) => ({
        url: `${baseURL}${servicePath(page.slug)}`,
        lastModified: servicesLastModified,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }))
    : [];

  const newestPost = newestLastModified(allBlogPosts);
  const newestProject = newestLastModified(allProjects);

  const routeLastModified: Record<string, string | undefined> = {
    // The home lists services, the featured project and the latest posts
    "/": [newestPost, newestProject, servicesLastModified, home.updatedAt].filter(Boolean).sort().at(-1),
    "/servicios": servicesLastModified,
    "/sobre-mi": sobremi.updatedAt,
    "/trabajos": newestProject,
    "/blog": newestPost,
  };

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route as keyof typeof routesConfig]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: routeLastModified[route],
    changeFrequency: routeChangeFrequency[route] ?? "monthly",
    priority: routePriority[route] ?? 0.5,
  }));

  // Thin tags are noindex (see blog/tag/[tag]/page.tsx), so they stay out of the sitemap
  const tagPages = getBlogTags()
    .filter((tag) => tag.posts.length >= MIN_POSTS_TO_INDEX_TAG)
    .map((tag) => ({
      url: `${baseURL}${tagPath(tag.name)}`,
      lastModified: newestLastModified(tag.posts),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  // /blog/page/N stay indexable (each post is linked from them) but out of the sitemap:
  // the posts themselves are listed above with their real lastmod
  return [...routes, ...servicios, ...blogs, ...trabajos, ...tagPages];
}
