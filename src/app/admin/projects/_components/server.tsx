import { getAllProjects } from "@/actions/project";
import { ProjectList } from "./list";

interface Props {
  searchParams: Promise<ProjectParams>;
}

export async function ProjectServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllProjects(params);

  return (
    <ProjectList
      projects={data.projects}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
