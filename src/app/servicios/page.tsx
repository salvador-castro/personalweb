import {
  Column,
  Row,
  Flex,
  Grid,
  Card,
  Heading,
  Text,
  Button,
  Icon,
  Line,
  RevealFx,
  Tag,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person, sobremi, servicios } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: servicios.title,
    description: servicios.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(servicios.title)}`,
    path: servicios.path,
  });
}

export default function Servicios() {
  return (
    <Column fillWidth maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={servicios.path}
        title={servicios.title}
        description={servicios.description}
        image={`${baseURL}/og?title=${encodeURIComponent(servicios.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
        breadcrumb={[
          { name: "Inicio", url: baseURL },
          { name: servicios.label, url: `${baseURL}${servicios.path}` },
        ]}
      />

      {/* ── HERO ── */}
      <Column fillWidth paddingY="40" gap="m" horizontal="center" align="center">
        <RevealFx translateY="4" fillWidth horizontal="center">
          <Heading wrap="balance" variant="display-strong-m" align="center">
            {servicios.hero.title}
          </Heading>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center">
          <Text
            wrap="balance"
            align="center"
            onBackground="neutral-weak"
            variant="heading-default-xl"
            style={{ maxWidth: "40rem" }}
          >
            {servicios.hero.subline}
          </Text>
        </RevealFx>
        <RevealFx delay={0.3} horizontal="center">
          <Row gap="12" paddingTop="16" wrap horizontal="center">
            <Button
              href={servicios.cta.whatsappHref}
              variant="primary"
              size="m"
              prefixIcon="whatsapp"
            >
              {servicios.cta.whatsappLabel}
            </Button>
            <Button
              href={sobremi.calendar.link}
              variant="secondary"
              size="m"
              prefixIcon="calendar"
            >
              {servicios.cta.calendarLabel}
            </Button>
          </Row>
        </RevealFx>
      </Column>

      <Line />

      {/* ── OFERTA DE SERVICIOS ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Qué puedo hacer por tu negocio
        </Heading>
        <Grid fillWidth columns="2" mobileColumns="1" gap="16">
          {servicios.offerings.map((offering) => (
            <Card key={offering.slug} direction="column" padding="24" gap="12" radius="l">
              <Flex gap="12" vertical="center">
                <Flex
                  radius="full"
                  background="brand-alpha-weak"
                  padding="12"
                  horizontal="center"
                  vertical="center"
                >
                  <Icon name={offering.icon} onBackground="brand-weak" />
                </Flex>
                <Column gap="2">
                  <Text variant="heading-strong-l">{offering.title}</Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {offering.tagline}
                  </Text>
                </Column>
              </Flex>

              <Text variant="body-default-m" onBackground="neutral-weak">
                {offering.description}
              </Text>

              <Column as="ul" gap="8" paddingTop="4">
                {offering.features.map((feature) => (
                  <Row as="li" key={feature} gap="8" vertical="center">
                    <Icon name="checkCircle" size="xs" onBackground="brand-weak" />
                    <Text variant="body-default-s">{feature}</Text>
                  </Row>
                ))}
              </Column>

              {offering.caseStudy && (
                <Row paddingTop="8">
                  <Button
                    href={offering.caseStudy.href}
                    variant="tertiary"
                    size="s"
                    arrowIcon
                  >
                    {offering.caseStudy.label}
                  </Button>
                </Row>
              )}
            </Card>
          ))}
        </Grid>
      </Column>

      <Line />

      {/* ── PROCESO ── */}
      <Column fillWidth gap="m">
        <Heading as="h2" variant="display-strong-xs" wrap="balance">
          Cómo trabajamos
        </Heading>
        <Grid fillWidth columns="4" mobileColumns="1" tabletColumns="2" gap="16">
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

      <Line />

      {/* ── CTA FINAL ── */}
      <Column
        fillWidth
        paddingY="40"
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
        <Text
          align="center"
          onBackground="neutral-weak"
          variant="body-default-l"
          style={{ maxWidth: "32rem" }}
        >
          {servicios.cta.subline}
        </Text>
        <Row gap="12" paddingTop="16" wrap horizontal="center">
          <Button
            href={servicios.cta.whatsappHref}
            variant="primary"
            size="m"
            prefixIcon="whatsapp"
          >
            {servicios.cta.whatsappLabel}
          </Button>
          <Button href={sobremi.calendar.link} variant="secondary" size="m" prefixIcon="calendar">
            {servicios.cta.calendarLabel}
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
