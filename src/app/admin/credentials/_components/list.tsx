"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Credential } from "@/generated/prisma/client";
import { createCredential, updateCredential, deleteCredential } from "@/actions/credential";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  credentials: Credential[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const inputClass =
  "w-full bg-base border border-line rounded-[9px] px-3 py-2.5 text-meta-md font-mono text-fg outline-none focus:border-accent";

export function CredentialList({
  credentials,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<Credential | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingCredential = credentials.find((c) => c.id === confirmId);

  const [createState, createDispatch, createPending] = useActionWithToast(
    createCredential,
    { onSuccess: () => setEditing(null) }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updateCredential,
    { onSuccess: () => setEditing(null) }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(deleteCredential, {
    onSuccess: () => setConfirmId(null),
  });

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  const columns: Column<Credential>[] = [
    {
      key: "kind",
      header: "Kind",
      width: "15%",
      cardTitle: true,
      cell: (c) => <p className="font-semibold text-accent text-meta-xs">{c.kind}</p>,
    },
    { key: "title", header: "Title", width: "40%", cell: (c) => c.title },
    {
      key: "order",
      header: "Order",
      width: "10%",
      cardMeta: true,
      cell: (c) => c.order,
    },
    {
      key: "actions",
      header: "Actions",
      width: "35%",
      align: "center",
      cell: (c) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setEditing(c)}
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
    router.replace(`/admin/credentials?${params.toString()}`, { scroll: false });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/credentials?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/credentials"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "kind", label: "Kind" },
            { value: "title", label: "Title" },
          ]}
          showSearch
          searchPlaceholder="Cari credential..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={credentials}
          keyExtractor={(c) => c.id}
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

      <div className="bg-card border border-line rounded-[14px] p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <span className="text-meta-xs tracking-widest text-accent">
            {editing ? "EDIT CREDENTIAL" : "TAMBAH CREDENTIAL"}
          </span>
          {editing && (
            <button
              onClick={() => setEditing(null)}
              className="text-meta-xs text-muted hover:text-accent"
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

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              KIND
            </label>
            <select name="kind" defaultValue={editing?.kind ?? "CERTIFICATION"} className={inputClass}>
              <option value="EDUCATION">EDUCATION</option>
              <option value="CERTIFICATION">CERTIFICATION</option>
              <option value="PUBLICATION">PUBLICATION</option>
            </select>
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              TITLE (gelar / nama sertifikat / judul)
            </label>
            <textarea
              name="title"
              defaultValue={editing?.title}
              required
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              ISSUER (kampus / penerbit / jurnal)
            </label>
            <input name="issuer" defaultValue={editing?.issuer} required className={inputClass} />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              PERIOD / DATE (opsional)
            </label>
            <input name="period" defaultValue={editing?.period ?? ""} className={inputClass} />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              NOTE (GPA / credential ID / akreditasi, opsional)
            </label>
            <input name="note" defaultValue={editing?.note ?? ""} className={inputClass} />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              URL (link verifikasi / artikel, opsional)
            </label>
            <input
              name="url"
              type="url"
              placeholder="https://..."
              defaultValue={editing?.url ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-muted mb-1.5">
              ORDER
            </label>
            <input
              name="order"
              type="number"
              defaultValue={editing?.order ?? 0}
              className={inputClass}
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

      <PendingOverlay isVisible={deletePending} message="Menghapus credential..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Credential?"
        description={`Credential "${
          confirmingCredential?.title ?? ""
        }" akan dihapus permanen dan tidak bisa dikembalikan.`}
        isPending={deletePending}
      />
    </div>
  );
}
