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

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
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
