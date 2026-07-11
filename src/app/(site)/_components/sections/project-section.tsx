import { getProjects, getAllProjectsForModal } from "@/lib/data";
import { ProjectsSectionClient } from "./project-section-client";

export default async function ProjectsSection() {
  const [projects, allProjects] = await Promise.all([
    getProjects(),
    getAllProjectsForModal(),
  ]);

  return <ProjectsSectionClient projects={projects} allProjects={allProjects} />;
}
