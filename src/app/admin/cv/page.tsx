import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { CvServer } from "./_components/server";

interface Props {
  searchParams: Promise<CvParams>;
}

export default function CvAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="CV" subtitle="Kelola file CV (PDF)">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <CvServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
