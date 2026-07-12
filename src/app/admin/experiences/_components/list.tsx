"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Experience } from "@/generated/prisma/client";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/actions/experience";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  experiences: Experience[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const TYPES = ["FULL-TIME", "CONTRACT", "INTERNSHIP", "PART-TIME"];

export function ExperienceList({
  experiences,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<Experience | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingExp = experiences.find((e) => e.id === confirmId);

  const [createState, createDispatch, createPending] = useActionWithToast(
    createExperience,
    { onSuccess: () => setEditing(null) }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updateExperience,
    { onSuccess: () => setEditing(null) }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(
    deleteExperience,
    { onSuccess: () => setConfirmId(null) }
  );

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  const columns: Column<Experience>[] = [
    {
      key: "num",
      header: "Num",
      width: "10%",
      cardTitle: true,
      cell: (e) => <p className="font-semibold text-meta-md">{e.num}</p>,
    },
    { key: "company", header: "Company", width: "25%", cell: (e) => e.company },
    { key: "role", header: "Role", width: "25%", cell: (e) => e.role },
    {
      key: "period",
      header: "Period",
      width: "20%",
      cardMeta: true,
      cell: (e) => e.period,
    },
    {
      key: "actions",
      header: "Actions",
      width: "20%",
      align: "center",
      cell: (e) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setEditing(e)}
            className="inline-flex items-center justify-center w-11 h-11 text-[#999999] border-2 border-[#2a2a2a] hover:border-accent hover:text-[#ffff00] transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setConfirmId(e.id)}
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
    router.replace(`/admin/experiences?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/experiences?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/experiences"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "company", label: "Company" },
            { value: "period", label: "Period" },
          ]}
          showSearch
          searchPlaceholder="Cari pengalaman..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={experiences}
          keyExtractor={(e) => e.id}
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
            {editing ? "EDIT EXPERIENCE" : "TAMBAH EXPERIENCE"}
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

          <Field label="NUM" name="num" defaultValue={editing?.num} />
          <Field label="PERIOD" name="period" defaultValue={editing?.period} />
          <Field label="COMPANY" name="company" defaultValue={editing?.company} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              TYPE
            </label>
            <select
              name="type"
              defaultValue={editing?.type ?? TYPES[0]}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <Field label="ROLE" name="role" defaultValue={editing?.role} />

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
              TAGS (pisah koma)
            </label>
            <input
              name="tags"
              defaultValue={
                editing ? (editing.tags as string[]).join(", ") : ""
              }
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
            />
          </div>

          <Field
            label="ORDER"
            name="order"
            type="number"
            defaultValue={String(editing?.order ?? 0)}
          />

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

      <PendingOverlay
        isVisible={deletePending}
        message="Menghapus pengalaman..."
      />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Pengalaman?"
        description={`Pengalaman "${
          confirmingExp?.role ?? ""
        }" akan dihapus permanen dan tidak bisa dikembalikan.`}
        isPending={deletePending}
      />
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required
        className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
      />
    </div>
  );
}
