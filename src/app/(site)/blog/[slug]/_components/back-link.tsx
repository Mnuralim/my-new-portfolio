import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  searchParams: Promise<{ playlist?: string }>;
}

export async function BackLink({ searchParams }: Props) {
  const { playlist: playlistSlug } = await searchParams;
  const backHref = playlistSlug ? `/playlist/${playlistSlug}` : "/blog";
  const backLabel = playlistSlug ? "BACK TO PLAYLIST" : "BACK TO BLOG";

  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-2 text-meta-xs tracking-widest px-3 py-2 rounded-[8px] no-underline transition-colors"
      style={{ border: "1px solid var(--c-border)", color: "var(--c-muted2)" }}
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      {backLabel}
    </Link>
  );
}
