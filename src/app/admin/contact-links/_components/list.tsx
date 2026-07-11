"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { ContactLink } from "@/generated/prisma/client";
import {
  createContactLink,
  updateContactLink,
  deleteContactLink,
} from "@/actions/contact-link";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  contactLinks: ContactLink[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}


export function ContactLinkList({
  contactLinks,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<ContactLink | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingLink = contactLinks.find((c) => c.id === confirmId);

  const [createState, createDispatch, createPending] = useActionWithToast(
    createContactLink,
    { onSuccess: () => setEditing(null) }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updateContactLink,
    { onSuccess: () => setEditing(null) }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(
    deleteContactLink,
    { onSuccess: () => setConfirmId(null) }
  );

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  const columns: Column<ContactLink>[] = [
    {
      key: "label",
      header: "Label",
      width: "25%",
      cardTitle: true,
      cell: (c) => <p className="font-semibold text-meta-md">{c.label}</p>,
    },
    {
      key: "href",
      header: "Href",
      width: "45%",
      cardMeta: true,
      cell: (c) => <span className="truncate block">{c.href}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      width: "30%",
      align: "center",
      cell: (c) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setEditing(c)}
            className="inline-flex items-center justify-center w-11 h-11 text-[#6b6b66] dark:text-[#999999] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setConfirmId(c.id)}
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
    router.replace(`/admin/contact-links?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/contact-links?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/contact-links"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "label", label: "Label" },
          ]}
          showSearch
          searchPlaceholder="Cari kontak..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={contactLinks}
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

      <div className="bg-[#f2f2ee] dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <span className="text-meta-xs tracking-widest text-[#1a1a1a] dark:text-[#e8ff47]">
            {editing ? "EDIT CONTACT" : "TAMBAH CONTACT"}
          </span>
          {editing && (
            <button
              onClick={() => setEditing(null)}
              className="text-meta-xs text-[#6b6b66] dark:text-[#999999] hover:text-[#111111] dark:hover:text-[#f0f0f0]"
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
            <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
              LABEL
            </label>
            <input
              name="label"
              defaultValue={editing?.label}
              required
              className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
              HREF
            </label>
            <input
              name="href"
              defaultValue={editing?.href}
              required
              className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
              ORDER
            </label>
            <input
              name="order"
              type="number"
              defaultValue={editing?.order ?? 0}
              className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
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

      <PendingOverlay isVisible={deletePending} message="Menghapus kontak..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Kontak?"
        description={`Kontak "${
          confirmingLink?.label ?? ""
        }" akan dihapus permanen dan tidak bisa dikembalikan.`}
        isPending={deletePending}
      />
    </div>
  );
}
