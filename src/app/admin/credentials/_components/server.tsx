import { getAllCredentials } from "@/actions/credential";
import { CredentialList } from "./list";

interface Props {
  searchParams: Promise<CredentialParams>;
}

export async function CredentialServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllCredentials(params);

  return (
    <CredentialList
      credentials={data.credentials}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
