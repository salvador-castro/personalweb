import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  // Set only when the content itself changes (not for title/summary tweaks)
  updatedAt?: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  // Case study sheet (trabajos only)
  client?: string;
  industry?: string;
  location?: string;
  service?: string;
  stack?: string[];
};

import { notFound } from 'next/navigation';
import { ogImagePath } from "@/app/utils/url";
import { tagSlug } from "@/app/utils/tags";

const LOCAL_IMAGE_IN_BODY = /(?:\]\(|src=["'])(\/images\/[^)"'\s]+)/g;

const warnedMissing = new Set<string>();

/** Whether a site-relative asset (e.g. "/images/x.webp") exists in /public. Remote URLs count as existing. */
export function localImageExists(src: string): boolean {
  if (!src.startsWith("/") || src.startsWith("//")) return true;
  const pathname = decodeURI(src.split(/[?#]/)[0]);
  return fs.existsSync(path.join(process.cwd(), "public", pathname));
}

/** Logs a missing image once per file and path, so builds point to exactly what to add. */
function warnMissingImage(filePath: string, src: string) {
  const key = `${filePath}|${src}`;
  if (warnedMissing.has(key)) return;
  warnedMissing.add(key);
  console.warn(
    `[posts] Missing image in ${path.relative(process.cwd(), filePath)}: public${src} (falling back)`
  );
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        notFound();
    }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const title: string = data.title || "";

  // Cover: fall back to the generated OG image when the file isn't in /public
  let image: string = data.image || "";
  if (image && !localImageExists(image)) {
    warnMissingImage(filePath, image);
    image = ogImagePath(title);
  }

  // Gallery (case studies): drop missing files so the carousel never shows a broken image
  const images: string[] = (data.images || []).filter((src: string) => {
    const exists = localImageExists(src);
    if (!exists) warnMissingImage(filePath, src);
    return exists;
  });

  // Images inside the body are skipped at render time (components/mdx.tsx); report them here
  for (const [, src] of content.matchAll(LOCAL_IMAGE_IN_BODY)) {
    if (!localImageExists(src)) warnMissingImage(filePath, src);
  }

  const metadata: Metadata = {
    title,
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    summary: data.summary || "",
    image,
    images,
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    client: data.client,
    industry: data.industry,
    location: data.location,
    service: data.service,
    stack: data.stack || [],
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

let publishedBlogSlugs: Set<string> | undefined;

/**
 * Slugs of the blog posts whose .mdx exists on disk. Computed once per process,
 * so in production it reflects the files present at build time.
 */
export function getPublishedBlogSlugs(): Set<string> {
  publishedBlogSlugs ??= new Set(
    getMDXFiles(path.join(process.cwd(), "src", "app", "blog", "posts")).map((file) =>
      path.basename(file, ".mdx")
    )
  );
  return publishedBlogSlugs;
}

export type BlogPost = ReturnType<typeof getPosts>[number];

/** Blog tags with their posts, newest first. */
export function getBlogTags(): { name: string; slug: string; posts: BlogPost[] }[] {
  const tags = new Map<string, { name: string; slug: string; posts: BlogPost[] }>();
  for (const post of getPosts(["src", "app", "blog", "posts"])) {
    const name = post.metadata.tag;
    if (!name) continue;
    const slug = tagSlug(name);
    if (!tags.has(slug)) tags.set(slug, { name, slug, posts: [] });
    tags.get(slug)!.posts.push(post);
  }
  for (const tag of tags.values()) {
    tag.posts.sort(
      (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
  }
  return [...tags.values()];
}

/** Last real content change of a post: updatedAt if set, otherwise publishedAt. */
export function postLastModified(post: BlogPost): string {
  return post.metadata.updatedAt || post.metadata.publishedAt;
}

/** Most recent postLastModified among the given posts. */
export function newestLastModified(posts: BlogPost[]): string | undefined {
  return posts.map(postLastModified).sort().at(-1);
}
