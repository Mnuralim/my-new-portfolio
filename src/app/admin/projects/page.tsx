import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { ProjectServer } from "./_components/server";

interface Props {
  searchParams: Promise<ProjectParams>;
}

export default function ProjectsAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Projects" subtitle="Kelola data proyek">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <ProjectServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
