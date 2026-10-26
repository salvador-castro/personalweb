import { getBlogTags, getPosts, newestLastModified, postLastModified } from "@/app/utils/utils";
import { baseURL, routes as routesConfig, sobremi } from "@/app/resources";
import { getTotalPages, POSTS_PER_PAGE } from "@/components/blog/BlogPagination";
import { MIN_POSTS_TO_INDEX_TAG, tagPath } from "@/app/utils/tags";
import { servicePages, servicePath } from "@/app/resources/services";
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
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicios = routesConfig["/servicios"]
    ? servicePages.map((page) => ({
        url: `${baseURL}${servicePath(page.slug)}`,
        lastModified: pricing.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }))
    : [];

  const newestPost = newestLastModified(allBlogPosts);
  const newestProject = allProjects.map((post) => post.metadata.publishedAt).sort().at(-1);

  const routeLastModified: Record<string, string | undefined> = {
    // The home lists services, the featured project and the latest posts
    "/": [newestPost, newestProject, pricing.updatedAt].filter(Boolean).sort().at(-1),
    "/servicios": pricing.updatedAt,
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

  // Same order as the blog listing: each page's lastmod is the newest post it shows
  const blogPages = Array.from({ length: getTotalPages() - 1 }, (_, i) => {
    const page = i + 2;
    const start = (page - 1) * POSTS_PER_PAGE;
    return {
      url: `${baseURL}/blog/page/${page}`,
      lastModified: newestLastModified(allBlogPosts.slice(start, start + POSTS_PER_PAGE)),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    };
  });

  return [...routes, ...servicios, ...blogs, ...blogPages, ...trabajos, ...tagPages];
}
