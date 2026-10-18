import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { CredentialServer } from "./_components/server";

interface Props {
  searchParams: Promise<CredentialParams>;
}

export default function CredentialsAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Credentials" subtitle="Kelola pendidikan, sertifikat & publikasi">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <CredentialServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
