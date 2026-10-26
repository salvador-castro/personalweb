import { notFound } from "next/navigation";
import { getBlogTags } from "@/app/utils/utils";
import { tagPath } from "@/app/utils/tags";
import { Column, Grid, Heading, Tag } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { blog, person } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import Post from "@/components/blog/Post";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getBlogTags().map((tag) => ({ tag: tag.slug }));
}

function findTag(slug: string) {
  return getBlogTags().find((tag) => tag.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = findTag(slug);
  if (!tag) notFound();

  return Meta.generate({
    title: `${tag.name} – ${blog.title}`,
    description: `Posts sobre ${tag.name} en el blog de ${person.name}.`,
    baseURL: baseURL,
    path: tagPath(tag.name),
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: slug } = await params;
  const tag = findTag(slug);
  if (!tag) notFound();

  const path = tagPath(tag.name);

  return (
    <Column maxWidth="s">
      <Schema
        as="blog"
        baseURL={baseURL}
        title={`${tag.name} – ${blog.title}`}
        description={`Posts sobre ${tag.name} en el blog de ${person.name}.`}
        path={path}
        author={{
          name: person.name,
          url: `${baseURL}/sobre-mi`,
          image: `${baseURL}${person.avatar}`,
        }}
        breadcrumb={[
          { name: "Inicio", url: baseURL },
          { name: blog.label, url: `${baseURL}${blog.path}` },
          { name: tag.name, url: `${baseURL}${path}` },
        ]}
      />
      <Heading marginBottom="xs" variant="display-strong-m">
        {blog.title}
      </Heading>
      <Heading as="p" marginBottom="l" variant="body-default-l">
        Posts etiquetados con <Tag label={tag.name} variant="brand" />
      </Heading>
      <Grid columns="1" fillWidth marginBottom="40" gap="12">
        {tag.posts.map((post) => (
          <Post key={post.slug} post={{ ...post, content: "" }} thumbnail direction="column" />
        ))}
      </Grid>
    </Column>
  );
}
