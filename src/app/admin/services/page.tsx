import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { ServiceServer } from "./_components/server";

interface Props {
  searchParams: Promise<ServiceParams>;
}

export default function ServicesAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Services" subtitle="Kelola data layanan">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <ServiceServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
