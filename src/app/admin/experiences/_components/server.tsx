import { getAllExperiences } from "@/actions/experience";
import { ExperienceList } from "./list";

interface Props {
  searchParams: Promise<ExperienceParams>;
}

export async function ExperienceServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllExperiences(params);

  return (
    <ExperienceList
      experiences={data.experiences}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
