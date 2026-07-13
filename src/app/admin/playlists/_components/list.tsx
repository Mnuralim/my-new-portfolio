"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Playlist } from "@/generated/prisma/client";
import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "@/actions/playlist";
import { ImageUploader } from "../../_components/image-uploader";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  playlists: Playlist[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export function PlaylistList({
  playlists,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<Playlist | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingPlaylist = playlists.find((p) => p.id === confirmId);
  const [coverImage, setCoverImage] = useState("");

  const [createState, createDispatch, createPending] = useActionWithToast(
    createPlaylist,
    { onSuccess: () => startNew() }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updatePlaylist,
    { onSuccess: () => startNew() }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(
    deletePlaylist,
    { onSuccess: () => setConfirmId(null) }
  );

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  function startEdit(playlist: Playlist) {
    setEditing(playlist);
    setCoverImage(playlist.coverImage ?? "");
  }

  function startNew() {
    setEditing(null);
    setCoverImage("");
  }

  const columns: Column<Playlist>[] = [
    {
      key: "name",
      header: "Name",
      width: "35%",
      cardTitle: true,
      cell: (p) => <p className="font-semibold text-meta-md">{p.name}</p>,
    },
    { key: "slug", header: "Slug", width: "25%", cardMeta: true, cell: (p) => p.slug },
    {
      key: "order",
      header: "Order",
      width: "15%",
      cardMeta: true,
      cell: (p) => p.order,
    },
    {
      key: "actions",
      header: "Actions",
      width: "25%",
      align: "center",
      cell: (p) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => startEdit(p)}
            className="inline-flex items-center justify-center w-11 h-11 text-[#999999] border-2 border-[#2a2a2a] hover:border-accent hover:text-[#ffff00] transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setConfirmId(p.id)}
            className="inline-flex items-center justify-center w-11 h-11 text-accent2 border-2 border-accent2/40 hover:border-accent2 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    const take = parseInt(params.get("take") || "10");
    params.set("skip", String((page - 1) * take));
    router.replace(`/admin/playlists?${params.toString()}`, { scroll: false });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/playlists?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/playlists"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "name", label: "Name" },
          ]}
          showSearch
          searchPlaceholder="Cari playlist..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={playlists}
          keyExtractor={(p) => p.id}
          columns={columns}
        />

        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={totalCount}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      <div className="bg-[#111111] border-2 border-[#2a2a2a] p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <span className="text-meta-xs tracking-widest text-[#ffff00]">
            {editing ? "EDIT PLAYLIST" : "TAMBAH PLAYLIST"}
          </span>
          {editing && (
            <button
              onClick={startNew}
              className="text-meta-xs text-[#999999] hover:text-[#ffff00]"
            >
              BATAL
            </button>
          )}
        </div>

        <form
          action={dispatch}
          className="flex flex-col gap-4"
          key={editing?.id ?? "new"}
        >
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <input type="hidden" name="coverImage" value={coverImage} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              NAME
            </label>
            <input
              name="name"
              defaultValue={editing?.name}
              required
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              defaultValue={editing?.description ?? ""}
              rows={4}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent resize-none"
            />
          </div>

          <ImageUploader
            label="COVER IMAGE"
            folder="playlist-cover"
            value={coverImage}
            onChange={setCoverImage}
          />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              ORDER
            </label>
            <input
              name="order"
              type="number"
              defaultValue={editing?.order ?? 0}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
            />
          </div>

          {state.error && (
            <p className="text-meta-xs text-accent2">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary disabled:opacity-50"
          >
            {pending ? "MENYIMPAN..." : editing ? "SIMPAN" : "TAMBAH"}
          </button>
        </form>
      </div>

      <PendingOverlay isVisible={deletePending} message="Menghapus playlist..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Playlist?"
        description={`Playlist "${
          confirmingPlaylist?.name ?? ""
        }" akan dihapus permanen dan tidak bisa dikembalikan.`}
        isPending={deletePending}
      />
    </div>
  );
}
