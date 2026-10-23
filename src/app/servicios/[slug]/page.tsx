import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Icon,
  Line,
  Row,
  Tag,
  Text,
} from "@/once-ui/components";
import { TrackClick } from "@/components";
import { Faq } from "@/components/Faq";
import { baseURL } from "@/app/resources";
import { person, sobremi, servicios, trabajos, waLink } from "@/app/resources/content";
import { getServicePage, servicePages, servicePath } from "@/app/resources/services";
import { pricing, pricesForService, formatPrice, minPrice, pricesUpdatedText } from "@/app/resources/pricing";
import { areaServed, faqPage, priceOffer, schemaIds } from "@/app/utils/structuredData";
import { absoluteUrl, ogImageUrl } from "@/app/utils/url";
import { getPosts } from "@/app/utils/utils";
import { JsonLd, Meta, Schema } from "@/once-ui/modules";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return Meta.generate({
    title: page.title,
    description: page.description,
    baseURL: baseURL,
    image: ogImageUrl(page.headline),
    path: servicePath(page.slug),
  });
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);

  if (!page) {
    notFound();
  }

  const url = absoluteUrl(servicePath(page.slug));
  const prices = pricesForService(page.slug);
  const projects = getPosts(["src", "app", "trabajos", "projects"]);
  const cases = page.cases
    .map((caseSlug) => projects.find((project) => project.slug === caseSlug))
    .filter((project) => project !== undefined);
  const otherServices = servicePages.filter((other) => other.slug !== page.slug);
  const whatsappHref = waLink(page.whatsappMessage);

  return (
    <Column fillWidth maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={servicePath(page.slug)}
        title={page.title}
        description={page.description}
        image={ogImageUrl(page.headline)}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
        breadcrumb={[
          { name: "Inicio", url: baseURL },
          { name: servicios.label, url: `${baseURL}${servicios.path}` },
          { name: page.name, url },
        ]}
        extra={{ mainEntity: { "@id": `${url}#service` } }}
      />
      <JsonLd
        id={`schema-service-${page.slug}`}
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.headline,
          serviceType: page.serviceType,
          description: page.answer,
          url,
          provider: { "@id": schemaIds.business },
          areaServed,
          offers: prices.map((item) => priceOffer(item, url)),
        }}
      />
      <JsonLd id={`schema-faq-${page.slug}`} data={faqPage(page.faq, url)} />

      {/* ── HERO ── */}
      <Column fillWidth paddingY="32" gap="m">
        <Row>
          <Button
            data-border="rounded"
            href={servicios.path}
            variant="tertiary"
            weight="default"
            size="s"
            prefixIcon="chevronLeft"
          >
            Servicios
          </Button>
        </Row>
        <Heading wrap="balance" variant="display-strong-m">
          {page.headline}
        </Heading>
        <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
          {page.answer}
        </Text>
        <Row gap="12" paddingTop="8" wrap>
          <TrackClick event="whatsapp_click" properties={{ source: `servicio_${page.slug}_hero` }}>
            <Button href={whatsappHref} variant="primary" size="m" prefixIcon="whatsapp">
              Pedí tu presupuesto
            </Button>
          </TrackClick>
          <TrackClick event="calendar_click" properties={{ source: `servicio_${page.slug}_hero` }}>
            <Button href={sobremi.calendar.link} variant="secondary" size="m" prefixIcon="calendar">
              {servicios.cta.calendarLabel}
            </Button>
          </TrackClick>
        </Row>
      </Column>

      {/* ── PRECIOS ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Precios orientativos
        </Heading>
        <Grid fillWidth columns={prices.length > 1 ? "2" : "1"} mobileColumns="1" gap="16">
          {prices.map((item) => (
            <Card key={item.id} direction="column" padding="24" gap="8" radius="l">
              <Text variant="heading-strong-m">{item.label}</Text>
              <Row gap="8" vertical="end">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  desde
                </Text>
                <Text variant="display-strong-xs">{formatPrice(item.from)}</Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {pricing.currency}
                </Text>
              </Row>
            </Card>
          ))}
        </Grid>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {pricesUpdatedText}. El precio final depende del alcance de cada proyecto.{" "}
          {pricing.foreignNote}
        </Text>
      </Column>

      <Line />

      {/* ── PARA QUIÉN / QUÉ INCLUYE ── */}
      <Grid fillWidth columns="2" mobileColumns="1" gap="40">
        <Column gap="m">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Para quién es
          </Heading>
          <Column as="ul" gap="12">
            {page.audience.map((item) => (
              <Row as="li" key={item} gap="8">
                <Icon name="person" size="xs" onBackground="brand-weak" />
                <Text variant="body-default-m">{item}</Text>
              </Row>
            ))}
          </Column>
        </Column>
        <Column gap="m">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Qué incluye
          </Heading>
          <Column as="ul" gap="12">
            {page.includes.map((item) => (
              <Row as="li" key={item} gap="8">
                <Icon name="checkCircle" size="xs" onBackground="brand-weak" />
                <Text variant="body-default-m">{item}</Text>
              </Row>
            ))}
          </Column>
        </Column>
      </Grid>

      <Line />

      {/* ── PROCESO Y PLAZOS ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Cómo trabajamos y cuánto tarda
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          {page.timeline}
        </Text>
        <Grid fillWidth columns="4" mobileColumns="1" tabletColumns="2" gap="16" paddingTop="8">
          {servicios.process.map((step, index) => (
            <Column key={step.title} gap="8">
              <Tag size="l" variant="brand">
                {String(index + 1).padStart(2, "0")}
              </Tag>
              <Text variant="heading-strong-m">{step.title}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {step.description}
              </Text>
            </Column>
          ))}
        </Grid>
      </Column>

      {/* ── CASOS ── */}
      {cases.length > 0 && (
        <>
          <Line />
          <Column fillWidth gap="m">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Casos reales
            </Heading>
            <Grid fillWidth columns="2" mobileColumns="1" gap="16">
              {cases.map((project) => (
                <Card
                  key={project.slug}
                  href={`${trabajos.path}/${project.slug}`}
                  fillWidth
                  direction="column"
                  padding="20"
                  gap="8"
                  radius="l"
                >
                  <Text variant="heading-strong-m">{project.metadata.title}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {project.metadata.summary}
                  </Text>
                  <Text variant="label-default-s" onBackground="brand-weak">
                    Ver caso →
                  </Text>
                </Card>
              ))}
            </Grid>
          </Column>
        </>
      )}

      <Line />

      <Faq items={page.faq} />

      <Line />

      {/* ── OTROS SERVICIOS ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Otros servicios
        </Heading>
        <Grid fillWidth columns="3" mobileColumns="1" gap="16">
          {otherServices.map((other) => (
            <Card
              key={other.slug}
              href={servicePath(other.slug)}
              fillWidth
              direction="column"
              padding="20"
              gap="8"
              radius="l"
            >
              <Icon name={other.icon} onBackground="brand-weak" />
              <Text variant="heading-strong-s">{other.name}</Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                desde {formatPrice(minPrice(other.slug))}
              </Text>
            </Card>
          ))}
        </Grid>
      </Column>

      {/* ── CTA FINAL ── */}
      <Column
        fillWidth
        gap="m"
        horizontal="center"
        align="center"
        background="brand-alpha-weak"
        radius="xl"
        padding="40"
      >
        <Heading as="h2" variant="display-strong-s" align="center" wrap="balance">
          {servicios.cta.title}
        </Heading>
        <Text align="center" onBackground="neutral-weak" variant="body-default-l" style={{ maxWidth: "32rem" }}>
          {servicios.cta.subline}
        </Text>
        <Row gap="12" paddingTop="16" wrap horizontal="center">
          <TrackClick event="whatsapp_click" properties={{ source: `servicio_${page.slug}_cta_final` }}>
            <Button href={whatsappHref} variant="primary" size="m" prefixIcon="whatsapp">
              {servicios.cta.whatsappLabel}
            </Button>
          </TrackClick>
          <TrackClick event="calendar_click" properties={{ source: `servicio_${page.slug}_cta_final` }}>
            <Button href={sobremi.calendar.link} variant="secondary" size="m" prefixIcon="calendar">
              {servicios.cta.calendarLabel}
            </Button>
          </TrackClick>
        </Row>
      </Column>
    </Column>
  );
}
