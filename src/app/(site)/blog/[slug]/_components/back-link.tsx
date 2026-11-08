import { BackPill } from "../../../_components/ui/page-header";

interface Props {
  searchParams: Promise<{ playlist?: string }>;
}

export async function BackLink({ searchParams }: Props) {
  const { playlist: playlistSlug } = await searchParams;
  return playlistSlug ? (
    <BackPill href={`/playlist/${playlistSlug}`}>Back to playlist</BackPill>
  ) : (
    <BackPill href="/blog">Back to blog</BackPill>
  );
}
