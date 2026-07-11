import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { ContactLinkServer } from "./_components/server";

interface Props {
  searchParams: Promise<ContactLinkParams>;
}

export default function ContactLinksAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Contact Links" subtitle="Kelola data kontak">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <ContactLinkServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
