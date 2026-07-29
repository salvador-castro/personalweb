import { getPosts } from "@/app/utils/utils";
import { baseURL } from "@/app/resources";
import { person, blog } from "@/app/resources/content";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  const items = posts
    .map((post) => {
      const url = `${baseURL}${blog.path}/${post.slug}`;
      const pubDate = new Date(post.metadata.publishedAt).toUTCString();

      return `    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.metadata.summary)}</description>
      ${post.metadata.tag ? `<category>${escapeXml(post.metadata.tag)}</category>` : ""}
      <author>${escapeXml(person.email)} (${escapeXml(person.name)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(blog.title)}</title>
    <link>${baseURL}${blog.path}</link>
    <atom:link href="${baseURL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(blog.description.replace(/\s+/g, " ").trim())}</description>
    <language>es</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
