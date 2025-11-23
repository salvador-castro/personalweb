import { Column } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { sobremi, person, work } from "@/app/resources/content";
import { Meta, Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";
import { getPosts } from "@/app/utils/utils"; // 👈 Importamos getPosts acá

// ⏩ Hacemos la lectura una sola vez al cargar la página
const allProjects = getPosts(["src", "app", "work", "projects"]);

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`${baseURL}/og?title=${encodeURIComponent(work.title)}`}
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
