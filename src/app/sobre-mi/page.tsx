import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/sobremi/TableOfContents";
import styles from "@/components/sobremi/sobremi.module.scss";
import { person, sobremi, social } from "@/app/resources/content";
import React from "react";
import { Meta, Schema } from "@/once-ui/modules";
import Image from "next/image";

export async function generateMetadata() {
  return Meta.generate({
    title: sobremi.title,
    description: sobremi.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(sobremi.title)}`,
    path: sobremi.path,
  });
}

export default function SobreMi() {
  const structure = [
    {
      title: sobremi.intro.title,
      display: sobremi.intro.display,
      items: [],
    },
    {
      title: sobremi.work.title,
      display: sobremi.work.display,
      items: sobremi.work.experiences.map((experience) => experience.company),
    },
    {
      title: sobremi.studies.title,
      display: sobremi.studies.display,
      items: sobremi.studies.institutions.map((institution) => institution.name),
    },
    {
      title: sobremi.technical.title,
      display: sobremi.technical.display,
      items: sobremi.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={sobremi.title}
        description={sobremi.description}
        path={sobremi.path}
        image={`${baseURL}/og?title=${encodeURIComponent(sobremi.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {sobremi.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} sobremi={sobremi} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {sobremi.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={sobremi.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {sobremi.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Flex paddingX="8">
                  <Text>Agendar una llamada</Text>
                </Flex>
                <IconButton
                  href={sobremi.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                        <React.Fragment key={item.name}>
                            <Button
                                className="s-flex-hide"
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                variant="secondary"
                            />
                            <IconButton
                                className="s-flex-show"
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                            />
                        </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>

          {sobremi.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {sobremi.intro.description}
            </Column>
          )}

          {sobremi.work.display && (
            <>
              <Heading as="h2" id={sobremi.work.title} variant="display-strong-s" marginBottom="m">
                {sobremi.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {sobremi.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: JSX.Element, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images.map((image: { src: string; alt?: string }, imgIndex: number) => (
                    <Flex
                      key={imgIndex}
                      horizontal="center"
                      align="center"
                      padding="4"
                      style={{
                        width: "48px",
                        height: "48px",
                        transition: "transform 0.2s ease-in-out",
                      }}
                      className="hover:scale-110"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || "Imagen de experiencia"}
                        width={32}
                        height={32}
                        style={{
                          objectFit: "contain",
                          borderRadius: "999px",
                        }}
                      />
                    </Flex>
                  ))}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {sobremi.studies.display && (
            <>
              <Heading as="h2" id={sobremi.studies.title} variant="display-strong-s" marginBottom="m">
                {sobremi.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {sobremi.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {sobremi.technical.display && (
            <>
              <Heading
                as="h2"
                id={sobremi.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {sobremi.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {sobremi.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.images && skill.images.length > 0 && (
                    <Flex fillWidth paddingTop="m" gap="12" wrap>
                      {skill.images.map((image, imgIndex) => (
                        <Flex
                          key={imgIndex}
                          horizontal="center"
                          align="center"
                          padding="4"
                          style={{
                            width: "48px",
                            height: "48px",
                            transition: "transform 0.2s ease-in-out",
                          }}
                          className="hover:scale-110"
                        >
                          <Image
                            src={image?.src}
                            alt={image?.alt || "Tecnología"}
                            width={32}
                            height={32}
                            style={{
                              objectFit: "contain",
                              borderRadius: "999px",
                            }}
                          />
                        </Flex>
                      ))}
                    </Flex>
                  )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
