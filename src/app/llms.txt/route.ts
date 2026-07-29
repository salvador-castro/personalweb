import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";
import { person, home, blog, servicios, trabajos, sobremi } from "@/app/resources/content";

export const dynamic = "force-static";

export async function GET() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  const pages = [
    routesConfig["/"] && `- [${home.label}](${baseURL}/): ${home.description}`,
    routesConfig["/servicios"] && `- [${servicios.label}](${baseURL}${servicios.path}): ${servicios.description}`,
    routesConfig["/sobre-mi"] && `- [${sobremi.label}](${baseURL}${sobremi.path}): ${sobremi.description}`,
    routesConfig["/trabajos"] && `- [${trabajos.label}](${baseURL}${trabajos.path}): ${trabajos.description}`,
  ].filter(Boolean);

  const postLines = posts.map(
    (post) =>
      `- [${post.metadata.title}](${baseURL}${blog.path}/${post.slug}): ${post.metadata.summary}`,
  );

  const lines = [
    `# ${person.name}`,
    "",
    `> ${home.description}`,
    "",
    `${person.name} es ${person.role}, con base en ${person.location.replace("America/Argentina/", "")}, Argentina.`,
    "",
    "## Páginas",
    "",
    ...pages,
    "",
    "## Blog",
    "",
    `${blog.description.replace(/\s+/g, " ").trim()}`,
    "",
    ...postLines,
    "",
    "## Feeds",
    "",
    `- [Sitemap](${baseURL}/sitemap.xml)`,
    `- [RSS del blog](${baseURL}/rss.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
