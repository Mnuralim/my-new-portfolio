import { getAllSkills } from "@/actions/skill";
import { SkillList } from "./list";

interface Props {
  searchParams: Promise<SkillParams>;
}

export async function SkillServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllSkills(params);

  return (
    <SkillList
      skills={data.skills}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
