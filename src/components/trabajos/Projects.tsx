// src/components/trabajos/Projects.tsx
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import { Project } from "@/types/project"; // 👈 Importamos el tipo nuevo
//import { Projects } from "@/components/trabajos/Projects";

interface ProjectsProps {
  range?: [number, number?];
  projects?: Project[];
  // Set to false when the list is below the fold (e.g. on the home page)
  priority?: boolean;
}

export function Projects({ range, projects = [], priority = true }: ProjectsProps) {
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
          priority={priority && index < 2}
          key={post.slug}
          href={`trabajos/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          hasContent={Boolean(post.content?.trim())}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}