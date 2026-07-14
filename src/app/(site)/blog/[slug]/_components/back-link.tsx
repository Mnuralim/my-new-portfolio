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
      className="inline-flex items-center gap-2 text-meta-xs tracking-widest px-3 py-2 border border-[#e5e5e5] dark:border-[#2a2a2a] text-black/70 dark:text-[#999999] no-underline hover:border-black dark:hover:border-accent hover:text-black dark:hover:text-[#ffff00] transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      {backLabel}
    </Link>
  );
}
