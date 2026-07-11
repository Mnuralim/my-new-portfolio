import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { ProfileContent } from "./_components/profile-content";

export default function ProfileAdminPage() {
  return (
    <PageContainer title="Profile" subtitle="Kelola akun admin">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <ProfileContent />
      </Suspense>
    </PageContainer>
  );
}
