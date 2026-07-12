"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Service } from "@/generated/prisma/client";
import { createService, updateService, deleteService } from "@/actions/service";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  services: Service[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}


export function ServiceList({
  services,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<Service | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingService = services.find((s) => s.id === confirmId);

  const [createState, createDispatch, createPending] = useActionWithToast(
    createService,
    { onSuccess: () => setEditing(null) }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updateService,
    { onSuccess: () => setEditing(null) }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(deleteService, {
    onSuccess: () => setConfirmId(null),
  });

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  const columns: Column<Service>[] = [
    {
      key: "icon",
      header: "Icon",
      width: "15%",
      cardTitle: true,
      cell: (s) => <p className="font-semibold text-[#ffff00] text-meta-md">{s.icon}</p>,
    },
    { key: "title", header: "Title", width: "35%", cell: (s) => s.title },
    {
      key: "order",
      header: "Order",
      width: "15%",
      cardMeta: true,
      cell: (s) => s.order,
    },
    {
      key: "actions",
      header: "Actions",
      width: "35%",
      align: "center",
      cell: (s) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setEditing(s)}
            className="inline-flex items-center justify-center w-11 h-11 text-[#999999] border-2 border-[#2a2a2a] hover:border-accent hover:text-[#ffff00] transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setConfirmId(s.id)}
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
    router.replace(`/admin/services?${params.toString()}`, { scroll: false });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/services?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/services"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "title", label: "Title" },
          ]}
          showSearch
          searchPlaceholder="Cari layanan..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={services}
          keyExtractor={(s) => s.id}
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
            {editing ? "EDIT SERVICE" : "TAMBAH SERVICE"}
          </span>
          {editing && (
            <button
              onClick={() => setEditing(null)}
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

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              ICON (unicode/symbol)
            </label>
            <input
              name="icon"
              defaultValue={editing?.icon}
              required
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              TITLE
            </label>
            <input
              name="title"
              defaultValue={editing?.title}
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
              defaultValue={editing?.description}
              required
              rows={4}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent resize-none"
            />
          </div>

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

      <PendingOverlay isVisible={deletePending} message="Menghapus layanan..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Layanan?"
        description={`Layanan "${
          confirmingService?.title ?? ""
        }" akan dihapus permanen dan tidak bisa dikembalikan.`}
        isPending={deletePending}
      />
    </div>
  );
}
