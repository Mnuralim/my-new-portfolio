import { Suspense } from "react";
import { PageContainer } from "@/app/_components/reusable/page-container/page-container";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { BlogPostServer } from "./_components/server";

interface Props {
  searchParams: Promise<BlogPostParams>;
}

export default function BlogPostsAdminPage({ searchParams }: Props) {
  return (
    <PageContainer title="Blog Posts" subtitle="Kelola tulisan blog">
      <Suspense fallback={<PendingOverlay isVisible />}>
        <BlogPostServer searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
