import { getAllPlaylists } from "@/actions/playlist";
import { PlaylistList } from "./list";

interface Props {
  searchParams: Promise<PlaylistParams>;
}

export async function PlaylistServer({ searchParams }: Props) {
  const params = await searchParams;
  const data = await getAllPlaylists(params);

  return (
    <PlaylistList
      playlists={data.playlists}
      totalCount={data.totalCount}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      itemsPerPage={data.itemsPerPage}
    />
  );
}
