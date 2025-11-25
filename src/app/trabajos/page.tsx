import { Column } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
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
    image: `${baseURL}/og?title=${encodeURIComponent(trabajos.title)}`,
    path: trabajos.path,
  });
}

export default function Trabajos() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={trabajos.path}
        title={trabajos.title}
        description={trabajos.description}
        image={`${baseURL}/og?title=${encodeURIComponent(trabajos.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${sobremi.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Projects projects={allProjects} /> {/* 👈 Pasamos los proyectos por props */}
    </Column>
  );
}
