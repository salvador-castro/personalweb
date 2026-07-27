import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  IconButton,
  Line,
  SmartLink,
  Grid,
  Card,
  Icon,
} from "@/once-ui/components";
import { Projects } from "@/components/trabajos/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, sobremi, person, newsletter, social, trabajos, servicios } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Meta, Schema } from "@/once-ui/modules";
import { getPosts } from "@/app/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "trabajos", "projects"]);

  return (
    <Column fillWidth maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ── HERO ── */}
      <Column fillWidth paddingY="40" gap="l">
        <Row fillWidth gap="xl" vertical="center" mobileDirection="column">
          {/* Left: text */}
          <Column flex={3} gap="m">
            {home.featured && (
              <RevealFx fillWidth horizontal="start" paddingBottom="8">
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                  href={home.featured.href}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </RevealFx>
            )}

            <RevealFx translateY="4" fillWidth horizontal="start">
              <Heading wrap="balance" variant="display-strong-m">
                {home.headline}
              </Heading>
            </RevealFx>

            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>

            {/* Social links */}
            <RevealFx delay={0.3} horizontal="start">
              <Row gap="8" paddingTop="4">
                {social.map((item) => (
                  item.link && (
                    <IconButton
                      key={item.name}
                      href={item.link}
                      icon={item.icon}
                      variant="ghost"
                      size="m"
                      tooltip={item.name}
                    />
                  )
                ))}
              </Row>
            </RevealFx>

            <RevealFx delay={0.4} horizontal="start">
              <Row gap="12" paddingTop="8" wrap>
                <Button
                  href={servicios.cta.whatsappHref}
                  variant="primary"
                  size="m"
                  prefixIcon="whatsapp"
                >
                  Pedí tu presupuesto
                </Button>
                <Button
                  href={servicios.path}
                  variant="secondary"
                  size="m"
                  arrowIcon
                >
                  Ver servicios
                </Button>
              </Row>
            </RevealFx>

            <RevealFx delay={0.45} horizontal="start">
              <Row gap="16" paddingTop="4" wrap>
                <SmartLink href={trabajos.path}>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Ver casos de éxito →
                  </Text>
                </SmartLink>
                <SmartLink href={sobremi.path}>
                  <Flex gap="8" vertical="center">
                    {sobremi.avatar.display && (
                      <Avatar
                        style={{ marginRight: "-0.25rem" }}
                        src={person.avatar}
                        size="xs"
                      />
                    )}
                    <Text variant="label-default-s" onBackground="neutral-weak">
                      Sobre mí →
                    </Text>
                  </Flex>
                </SmartLink>
              </Row>
            </RevealFx>
          </Column>

          {/* Right: avatar */}
          <RevealFx flex={1} horizontal="center" delay={0.3}>
            <Avatar src={person.avatar} size="xl" />
          </RevealFx>
        </Row>
      </Column>

      <Line />

      {/* ── SERVICIOS ── */}
      <Column fillWidth gap="m">
        <RevealFx translateY="4" fillWidth horizontal="start">
          <Row fillWidth vertical="center" horizontal="space-between">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Servicios para tu negocio
            </Heading>
            <SmartLink href={servicios.path}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Ver todos →
              </Text>
            </SmartLink>
          </Row>
        </RevealFx>
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Grid fillWidth columns="4" mobileColumns="1" tabletColumns="2" gap="16">
            {servicios.offerings.map((offering) => (
              <Card
                key={offering.slug}
                href={servicios.path}
                direction="column"
                padding="20"
                gap="8"
                radius="l"
              >
                <Icon name={offering.icon} onBackground="brand-weak" />
                <Text variant="heading-strong-s">{offering.title}</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {offering.tagline}
                </Text>
              </Card>
            ))}
          </Grid>
        </RevealFx>
      </Column>

      <Line />

      {/* ── PROYECTO DESTACADO ── */}
      <Column fillWidth gap="m">
        <RevealFx translateY="4" fillWidth horizontal="start">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            Proyecto destacado
          </Heading>
        </RevealFx>
        <RevealFx translateY="16" delay={0.2} fillWidth>
          <Projects range={[1, 1]} projects={allProjects} />
        </RevealFx>
      </Column>

      {/* ── BLOG ── */}
      {routes["/blog"] && (
        <>
          <Line />
          <Column fillWidth gap="m">
            <RevealFx translateY="4" fillWidth horizontal="start">
              <Row fillWidth vertical="center" horizontal="space-between">
                <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  📡 Últimas señales tech
                </Heading>
                <SmartLink href="/blog">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Ver todo →
                  </Text>
                </SmartLink>
              </Row>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth>
              <Posts range={[1, 2]} columns="2" />
            </RevealFx>
          </Column>
        </>
      )}

      {/* ── MÁS PROYECTOS ── */}
      {allProjects.length > 1 && (
        <>
          <Line />
          <Column fillWidth gap="m">
            <RevealFx translateY="4" fillWidth horizontal="start">
              <Row fillWidth vertical="center" horizontal="space-between">
                <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  Más proyectos
                </Heading>
                <SmartLink href={trabajos.path}>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Ver todos →
                  </Text>
                </SmartLink>
              </Row>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth>
              <Projects range={[2, 2]} projects={allProjects} />
            </RevealFx>
          </Column>
        </>
      )}

      {/* ── NEWSLETTER ── */}
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
