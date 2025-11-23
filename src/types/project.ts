// src/types/project.ts

export interface TeamMember {
    avatar: string;
  }
  
  export interface ProjectMetadata {
    title: string;
    summary: string;
    publishedAt: string; // fechas como strings ISO
    images: string[]; // array de URLs
    team?: TeamMember[]; // opcional
    link?: string; // opcional
  }
  
  export interface Project {
    slug: string;
    content: string;
    metadata: ProjectMetadata;
  }  