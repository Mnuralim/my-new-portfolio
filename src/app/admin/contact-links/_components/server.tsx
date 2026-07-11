import { getAllContactLinks } from "@/actions/contact-link";
import { ContactLinkList } from "./list";

interface Props {
  searchParams: Promise<ContactLinkParams>;
}

export async function ContactLinkServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllContactLinks(params);

  return (
    <ContactLinkList
      contactLinks={data.contactLinks}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
