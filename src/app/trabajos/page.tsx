import { Column, Heading, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { ogImageUrl } from "@/app/utils/url";
import { sobremi, person, trabajos } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import { Projects } from "@/components/trabajos/Projects";
import { getPosts } from "@/app/utils/utils";

const allProjects = getPosts(["src", "app", "trabajos", "projects"]);

export async function generateMetadata() {
  return Meta.generate({
    title: trabajos.title,
    description: trabajos.description,
    baseURL: baseURL,
    image: ogImageUrl(trabajos.title),
    path: trabajos.path,
  });
}

export default function Trabajos() {
  return (
    <Column maxWidth="m">
      <Schema
        as="collectionPage"
        baseURL={baseURL}
        path={trabajos.path}
        title={trabajos.title}
        description={trabajos.description}
        image={ogImageUrl(trabajos.title)}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column paddingX="l" gap="12" marginBottom="40">
        <Heading variant="display-strong-m" wrap="balance">
          {trabajos.headline}
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          {trabajos.description}
        </Text>
      </Column>
      <Projects projects={allProjects} /> {/* 👈 Pasamos los proyectos por props */}
    </Column>
  );
}
