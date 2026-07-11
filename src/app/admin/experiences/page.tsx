import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { ExperienceServer } from "./_components/server";

interface Props {
  searchParams: Promise<ExperienceParams>;
}

export default function ExperiencesAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Experiences" subtitle="Kelola data pengalaman kerja">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <ExperienceServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
