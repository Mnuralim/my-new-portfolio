import { getAllCvs } from "@/actions/cv";
import { CvList } from "./list";

interface Props {
  searchParams: Promise<CvParams>;
}

export async function CvServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllCvs(params);

  return (
    <CvList
      cvs={data.cvs}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
