import { notFound } from "next/navigation";
import { getPosts } from "@/app/utils/utils";
import { Column, Grid, Heading, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { blog, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import Post from "@/components/blog/Post";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const tags = [...new Set(posts.map((post) => post.metadata.tag).filter(Boolean))] as string[];
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return Meta.generate({
    title: `${decodedTag} – ${blog.title}`,
    description: `Posts sobre ${decodedTag} en el blog de ${person.name}.`,
    baseURL: baseURL,
    path: `/blog/tag/${tag}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allPosts = getPosts(["src", "app", "blog", "posts"]);
  const filteredPosts = allPosts
    .filter((post) => post.metadata.tag === decodedTag)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );

  if (filteredPosts.length === 0) {
    notFound();
  }

  return (
    <Column maxWidth="s">
      <Schema
        as="blog"
        baseURL={baseURL}
        title={`${decodedTag} – ${blog.title}`}
        description={`Posts sobre ${decodedTag} en el blog de ${person.name}.`}
        path={`/blog/tag/${tag}`}
        author={{
          name: person.name,
          url: `${baseURL}/sobre-mi`,
          image: `${baseURL}${person.avatar}`,
        }}
        breadcrumb={[
          { name: "Inicio", url: baseURL },
          { name: blog.label, url: `${baseURL}${blog.path}` },
          { name: decodedTag, url: `${baseURL}/blog/tag/${tag}` },
        ]}
      />
      <Heading marginBottom="xs" variant="display-strong-m">
        {blog.title}
      </Heading>
      <Heading marginBottom="l" variant="body-default-l">
        Posts etiquetados con <Tag label={decodedTag} variant="brand" />
      </Heading>
      <Grid columns="1" fillWidth marginBottom="40" gap="12">
        {filteredPosts.map((post) => (
          <Post key={post.slug} post={post} thumbnail direction="column" />
        ))}
      </Grid>
    </Column>
  );
}
