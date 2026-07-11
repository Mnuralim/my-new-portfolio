import { getAllServices } from "@/actions/service";
import { ServiceList } from "./list";

interface Props {
  searchParams: Promise<ServiceParams>;
}

export async function ServiceServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllServices(params);

  return (
    <ServiceList
      services={data.services}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
