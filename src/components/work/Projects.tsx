// src/components/work/Projects.tsx
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import { Project } from "@/types/project"; // 👈 Importamos el tipo nuevo
//import { Projects } from "@/components/work/Projects";

interface ProjectsProps {
  range?: [number, number?];
  projects?: Project[];
}

export function Projects({ range, projects = [] }: ProjectsProps) {
  const sortedProjects = projects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}