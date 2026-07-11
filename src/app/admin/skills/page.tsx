import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { SkillServer } from "./_components/server";

interface Props {
  searchParams: Promise<SkillParams>;
}

export default function SkillsAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Skills" subtitle="Kelola data skills">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <SkillServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
