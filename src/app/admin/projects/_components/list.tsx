"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Project } from "@/generated/prisma/client";
import { createProject, updateProject, deleteProject } from "@/actions/project";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";

interface Props {
  projects: Project[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const TAG_COLORS = ["accent", "it", "net", "purple"];

export function ProjectList({
  projects,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<Project | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingProject = projects.find((p) => p.id === confirmId);

  const [createState, createDispatch, createPending] = useActionWithToast(
    createProject,
    { onSuccess: () => setEditing(null) }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updateProject,
    { onSuccess: () => setEditing(null) }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(deleteProject, {
    onSuccess: () => setConfirmId(null),
  });

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  const columns: Column<Project>[] = [
    {
      key: "num",
      header: "Num",
      width: "10%",
      cardTitle: true,
      cell: (p) => <p className="font-semibold text-meta-md">{p.num}</p>,
    },
    { key: "title", header: "Title", width: "30%", cell: (p) => p.title },
    { key: "tag", header: "Tag", width: "15%", cardMeta: true, cell: (p) => p.tag },
    {
      key: "featured",
      header: "Featured",
      width: "15%",
      cardMeta: true,
      cell: (p) => (p.featured ? "YES" : "-"),
    },
    {
      key: "actions",
      header: "Actions",
      width: "20%",
      align: "center",
      cell: (p) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => setEditing(p)}
            className="inline-flex items-center justify-center w-11 h-11 text-[#6b6b66] dark:text-[#999999] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] transition-colors"
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
    router.replace(`/admin/projects?${params.toString()}`, { scroll: false });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/projects?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/projects"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "title", label: "Title" },
            { value: "tag", label: "Tag" },
          ]}
          showSearch
          searchPlaceholder="Cari project..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={projects}
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

      <div className="bg-[#f2f2ee] dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] p-6 h-fit">
        <div className="flex justify-between items-center mb-6">
          <span className="text-meta-xs tracking-widest text-[#1a1a1a] dark:text-[#e8ff47]">
            {editing ? "EDIT PROJECT" : "TAMBAH PROJECT"}
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

          <Field label="NUM" name="num" defaultValue={editing?.num} />
          <Field label="TAG" name="tag" defaultValue={editing?.tag} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
              TAG COLOR
            </label>
            <select
              name="tagColor"
              defaultValue={editing?.tagColor ?? "accent"}
              className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
            >
              {TAG_COLORS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Field label="TITLE" name="title" defaultValue={editing?.title} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              defaultValue={editing?.description}
              required
              rows={4}
              className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent resize-none"
            />
          </div>

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
              STACK (pisah koma)
            </label>
            <input
              name="stack"
              defaultValue={
                editing ? (editing.stack as string[]).join(", ") : ""
              }
              className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
            />
          </div>

          <Field label="HREF" name="href" defaultValue={editing?.href} />
          <Field
            label="FILTER (WEB DEV / IT SUPPORT / BLOCKCHAIN)"
            name="filter"
            defaultValue={editing?.filter ?? ""}
            required={false}
          />

          <label className="flex items-center gap-2 text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999]">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={editing?.featured}
              className="accent-[var(--color-accent)]"
            />
            FEATURED
          </label>

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

      <PendingOverlay isVisible={deletePending} message="Menghapus project..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Project?"
        description={`Project "${
          confirmingProject?.title ?? ""
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
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999] mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full bg-[#fafaf8] dark:bg-[#0a0a0a] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#111111] dark:text-[#f0f0f0] outline-none focus:border-accent"
      />
    </div>
  );
}
