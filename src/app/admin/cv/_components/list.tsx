"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Cv } from "@/generated/prisma/client";
import { createCv, updateCv, deleteCv } from "@/actions/cv";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";
import { ImageUploader } from "@/app/admin/_components/image-uploader";

interface Props {
  cvs: Cv[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const inputClass =
  "w-full bg-base border border-line rounded-[9px] px-3 py-2.5 text-meta-md font-mono text-fg outline-none focus:border-accent";

export function CvList({ cvs, totalCount, currentPage, totalPages, itemsPerPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<Cv | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingCv = cvs.find((c) => c.id === confirmId);

  const edit = (cv: Cv | null) => {
    setEditing(cv);
    setFileUrl(cv?.fileUrl ?? "");
  };

  const [createState, createDispatch, createPending] = useActionWithToast(createCv, {
    onSuccess: () => edit(null),
  });
  const [updateState, updateDispatch, updatePending] = useActionWithToast(updateCv, {
    onSuccess: () => edit(null),
  });
  const [, deleteDispatch, deletePending] = useActionWithToast(deleteCv, {
    onSuccess: () => setConfirmId(null),
  });

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  const columns: Column<Cv>[] = [
    {
      key: "title",
      header: "Title",
      width: "35%",
      cardTitle: true,
      cell: (c) => <p className="font-semibold text-accent text-meta-md">{c.title}</p>,
    },
    {
      key: "fileUrl",
      header: "File",
      width: "25%",
      cell: (c) => (
        <a
          href={c.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-meta-sm font-mono hover:text-accent"
        >
          LIHAT PDF ↗
        </a>
      ),
    },
    { key: "order", header: "Order", width: "10%", cardMeta: true, cell: (c) => c.order },
    {
      key: "actions",
      header: "Actions",
      width: "30%",
      align: "center",
      cell: (c) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => edit(c)}
            className="inline-flex items-center justify-center w-11 h-11 text-muted border border-line rounded-[9px] hover:border-accent hover:text-accent transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setConfirmId(c.id)}
            className="inline-flex items-center justify-center w-11 h-11 text-accent2 border rounded-[9px] border-accent2/40 hover:border-accent2 transition-colors"
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
    router.replace(`/admin/cv?${params.toString()}`, { scroll: false });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/cv?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/cv"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "title", label: "Title" },
          ]}
          showSearch
          searchPlaceholder="Cari CV..."
          currentSortOrder={(searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"}
          defaultSortBy="order"
        />

        <DataTable striped data={cvs} keyExtractor={(c) => c.id} columns={columns} />

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

      <div className="bg-card border border-line rounded-[14px] p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <span className="text-meta-xs tracking-widest text-accent">
            {editing ? "EDIT CV" : "TAMBAH CV"}
          </span>
          {editing && (
            <button
              onClick={() => edit(null)}
              className="text-meta-xs text-muted hover:text-accent"
            >
              BATAL
            </button>
          )}
        </div>

        <form action={dispatch} className="flex flex-col gap-4" key={editing?.id ?? "new"}>
          {editing && <input type="hidden" name="id" value={editing.id} />}
          <input type="hidden" name="fileUrl" value={fileUrl} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              TITLE (mis. Network Engineer / Programmer)
            </label>
            <input name="title" defaultValue={editing?.title} required className={inputClass} />
          </div>

          <ImageUploader
            label="FILE PDF"
            folder="cv"
            accept="application/pdf"
            value={fileUrl}
            onChange={setFileUrl}
          />

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">ORDER</label>
            <input
              name="order"
              type="number"
              defaultValue={editing?.order ?? 0}
              className={inputClass}
            />
          </div>

          {state.error && <p className="text-meta-xs text-accent2">{state.error}</p>}

          <button
            type="submit"
            disabled={pending || !fileUrl}
            className="btn-primary disabled:opacity-50"
          >
            {pending ? "MENYIMPAN..." : editing ? "SIMPAN" : "TAMBAH"}
          </button>
        </form>
      </div>

      <PendingOverlay isVisible={deletePending} message="Menghapus CV..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus CV?"
        description={`CV "${confirmingCv?.title ?? ""}" akan dihapus permanen beserta file PDF-nya.`}
        isPending={deletePending}
      />
    </div>
  );
}
