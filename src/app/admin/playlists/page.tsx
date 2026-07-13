import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { PlaylistServer } from "./_components/server";

interface Props {
  searchParams: Promise<PlaylistParams>;
}

export default function PlaylistsAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Playlists" subtitle="Kelola data playlist blog">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <PlaylistServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
