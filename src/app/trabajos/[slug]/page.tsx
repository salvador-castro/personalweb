import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Card, Column, Flex, Heading, Row, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { absoluteUrl, ogImageUrl } from "@/app/utils/url";
import { sobremi, person, trabajos, servicios } from "@/app/resources/content";
import { getServicePage, servicePath } from "@/app/resources/services";
import { formatPrice, minPrice } from "@/app/resources/pricing";
import { schemaIds } from "@/app/utils/structuredData";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import { Metadata } from "next";
import { Meta, Schema } from "@/once-ui/modules";

// Unknown slugs must return a real 404 instead of a streamed 200
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "trabajos", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "trabajos", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) notFound();

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image ? absoluteUrl(post.metadata.image) : ogImageUrl(post.metadata.title),
    path: `${trabajos.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "trabajos", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  const { client, industry, location, stack = [], link } = post.metadata;
  const servicePage = post.metadata.service ? getServicePage(post.metadata.service) : undefined;
  const isRepository = Boolean(link?.includes("github.com"));
  const sheet = [
    client && { label: "Cliente", value: client },
    industry && { label: "Rubro", value: industry },
    location && { label: "Ubicación", value: location },
  ].filter((row): row is { label: string; value: string } => Boolean(row));

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="creativeWork"
        baseURL={baseURL}
        path={`${trabajos.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.images[0] ? absoluteUrl(post.metadata.images[0]) : ogImageUrl(post.metadata.title)}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
        breadcrumb={[
          { name: "Inicio", url: baseURL },
          { name: trabajos.label, url: `${baseURL}${trabajos.path}` },
          { name: post.metadata.title, url: `${baseURL}${trabajos.path}/${post.slug}` },
        ]}
        extra={{
          creator: { "@id": schemaIds.person },
          ...(stack.length > 0 && { keywords: stack.join(", ") }),
          ...(industry && { genre: industry }),
          ...(location && { locationCreated: { "@type": "Place", name: location } }),
          ...(link && !isRepository && { sameAs: link }),
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button data-border="rounded" href="/trabajos" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Trabajos
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {post.metadata.summary}
        </Text>
        {(sheet.length > 0 || servicePage || stack.length > 0 || link) && (
          <Card direction="column" padding="20" gap="12" radius="l" fillWidth>
            {sheet.map((row) => (
              <Row key={row.label} gap="12">
                <Text variant="label-default-s" onBackground="neutral-weak" style={{ minWidth: "6rem" }}>
                  {row.label}
                </Text>
                <Text variant="body-default-s">{row.value}</Text>
              </Row>
            ))}
            {servicePage && (
              <Row gap="12">
                <Text variant="label-default-s" onBackground="neutral-weak" style={{ minWidth: "6rem" }}>
                  Servicio
                </Text>
                <SmartLink href={servicePath(servicePage.slug)}>
                  <Text variant="body-default-s">{servicePage.name}</Text>
                </SmartLink>
              </Row>
            )}
            {stack.length > 0 && (
              <Row gap="12">
                <Text variant="label-default-s" onBackground="neutral-weak" style={{ minWidth: "6rem" }}>
                  Tecnologías
                </Text>
                <Row gap="4" wrap>
                  {stack.map((tech) => (
                    <Tag key={tech} size="s">
                      {tech}
                    </Tag>
                  ))}
                </Row>
              </Row>
            )}
            {link && (
              <Row gap="12">
                <Text variant="label-default-s" onBackground="neutral-weak" style={{ minWidth: "6rem" }}>
                  {isRepository ? "Código" : "Sitio"}
                </Text>
                <SmartLink href={link} suffixIcon="arrowUpRightFromSquare">
                  <Text variant="body-default-s">{link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</Text>
                </SmartLink>
              </Row>
            )}
          </Card>
        )}
      </Column>
      {post.metadata.images.length > 0 && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={`Captura del proyecto ${post.metadata.title}`}
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
        {servicePage && (
          <Card direction="column" padding="24" gap="12" radius="l" marginTop="40" background="brand-alpha-weak">
            <Heading as="h2" variant="heading-strong-l" wrap="balance">
              ¿Necesitás algo así para tu negocio?
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {servicePage.name}: {servicePage.serviceType.toLowerCase()} desde{" "}
              {formatPrice(minPrice(servicePage.slug))}. Contame qué necesitás y te paso un presupuesto sin compromiso.
            </Text>
            <Row gap="12" wrap paddingTop="4">
              <Button href={servicePath(servicePage.slug)} variant="secondary" size="s" arrowIcon>
                Ver servicio y precios
              </Button>
              <Button href={servicios.cta.whatsappHref} variant="primary" size="s" prefixIcon="whatsapp">
                {servicios.cta.whatsappLabel}
              </Button>
            </Row>
          </Card>
        )}
      </Column>
      <ScrollToHash />
    </Column>
  );
}
