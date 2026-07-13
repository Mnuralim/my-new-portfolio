"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type {
  BlogPost,
  BlogPostPlaylist,
  Playlist,
} from "@/generated/prisma/client";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/actions/blog-post";
import { ImageUploader } from "../../_components/image-uploader";
import {
  MarkdownEditor,
  type MarkdownEditorHandle,
} from "../../_components/markdown-editor";
import { FilterControl } from "@/app/_components/reusable/filter-control/filter-control";
import { DataTable } from "@/app/_components/reusable/table/table";
import type { Column } from "@/app/_components/reusable/table/types";
import { Pagination } from "@/app/_components/reusable/pagination/pagination";
import { ConfirmDeleteAlert } from "@/app/admin/_components/confirm-delete-alert";
import { PendingOverlay } from "@/app/admin/_components/pending-overlay";
import { useActionWithToast } from "@/app/admin/_components/use-action-toast";
import axios from "axios";

type BlogPostWithPlaylists = BlogPost & {
  playlists: (BlogPostPlaylist & { playlist: Playlist })[];
};

interface Props {
  blogPosts: BlogPostWithPlaylists[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  allPlaylists: Playlist[];
}

const TAG_COLORS = ["accent", "it", "net"];

export function BlogPostList({
  blogPosts,
  totalCount,
  currentPage,
  totalPages,
  itemsPerPage,
  allPlaylists,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [editing, setEditing] = useState<BlogPostWithPlaylists | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const confirmingPost = blogPosts.find((p) => p.id === confirmId);
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [insertingImage, setInsertingImage] = useState(false);
  const editorRef = useRef<MarkdownEditorHandle>(null);

  const [createState, createDispatch, createPending] = useActionWithToast(
    createBlogPost,
    { onSuccess: () => startNew() }
  );
  const [updateState, updateDispatch, updatePending] = useActionWithToast(
    updateBlogPost,
    { onSuccess: () => startNew() }
  );
  const [, deleteDispatch, deletePending] = useActionWithToast(
    deleteBlogPost,
    { onSuccess: () => setConfirmId(null) }
  );

  const state = editing ? updateState : createState;
  const dispatch = editing ? updateDispatch : createDispatch;
  const pending = editing ? updatePending : createPending;

  function startEdit(post: BlogPostWithPlaylists) {
    setEditing(post);
    setCoverImage(post.coverImage ?? "");
    setContent(post.content);
  }

  function startNew() {
    setEditing(null);
    setCoverImage("");
    setContent("");
  }

  async function insertInlineImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setInsertingImage(true);
    try {
      const authResponse = await axios.get("/api/imagekit-auth");
      const authData = authResponse.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `content-${Date.now()}-${file.name}`);
      formData.append("folder", "portfolio/blog-content");
      formData.append("publicKey", authData.publicKey);
      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);

      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData
      );

      const url = response.data.url as string;
      const markdownImg = `![](${url})`;

      if (editorRef.current) {
        editorRef.current.insertAtCursor(markdownImg);
      } else {
        setContent((prev) => prev + markdownImg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setInsertingImage(false);
      e.target.value = "";
    }
  }

  const columns: Column<BlogPostWithPlaylists>[] = [
    {
      key: "title",
      header: "Title",
      width: "40%",
      cardTitle: true,
      cell: (p) => <p className="font-semibold text-meta-md">{p.title}</p>,
    },
    {
      key: "slug",
      header: "Slug",
      width: "25%",
      cardMeta: true,
      cell: (p) => p.slug,
    },
    {
      key: "date",
      header: "Date",
      width: "15%",
      cardMeta: true,
      cell: (p) => p.date,
    },
    {
      key: "actions",
      header: "Actions",
      width: "20%",
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
    router.replace(`/admin/blog-posts?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleItemsPerPageChange = (ipp: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("take", String(ipp));
    params.delete("skip");
    router.replace(`/admin/blog-posts?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
      <div>
        <FilterControl
          basePath="/admin/blog-posts"
          sortOptions={[
            { value: "order", label: "Order" },
            { value: "title", label: "Title" },
            { value: "date", label: "Date" },
          ]}
          showSearch
          searchPlaceholder="Cari post..."
          currentSortOrder={
            (searchParams.get("sortOrder") as "asc" | "desc") ?? "asc"
          }
          defaultSortBy="order"
        />

        <DataTable
          striped
          data={blogPosts}
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
            {editing ? "EDIT POST" : "TAMBAH POST"}
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

          <Field label="NUM" name="num" defaultValue={editing?.num} />
          <Field label="TAG" name="tag" defaultValue={editing?.tag} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              TAG COLOR
            </label>
            <select
              name="tagColor"
              defaultValue={editing?.tagColor ?? "accent"}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent"
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
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              DESCRIPTION (excerpt)
            </label>
            <textarea
              name="description"
              defaultValue={editing?.description}
              required
              rows={2}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent resize-none"
            />
          </div>

          <ImageUploader
            label="COVER IMAGE"
            folder="blog-cover"
            value={coverImage}
            onChange={setCoverImage}
          />

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-meta-2xs tracking-widest text-[#999999]">
                CONTENT (markdown)
              </label>
              <label className="text-meta-2xs tracking-widest text-[#ffff00] cursor-pointer hover:opacity-70">
                {insertingImage ? "UPLOADING..." : "+ SISIP GAMBAR"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={insertInlineImage}
                  disabled={insertingImage}
                  className="hidden"
                />
              </label>
            </div>
            <input type="hidden" name="content" value={content} />
            <MarkdownEditor
              ref={editorRef}
              value={content}
              onChange={setContent}
              rows={12}
            />
            {!content && (
              <p className="text-meta-2xs text-accent2 mt-1.5">
                Content wajib diisi.
              </p>
            )}
          </div>

          <Field label="DATE" name="date" defaultValue={editing?.date} />
          <Field
            label="READ TIME"
            name="readTime"
            defaultValue={editing?.readTime}
          />
          <Field label="VIEWS" name="views" defaultValue={editing?.views} />

          <div>
            <label className="block text-meta-2xs tracking-widest text-[#999999] mb-1.5">
              PLAYLISTS
            </label>
            <select
              multiple
              name="playlistIds"
              defaultValue={editing?.playlists.map((p) => p.playlistId) ?? []}
              className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] px-3 py-2.5 text-meta-md font-mono text-[#ffff00] outline-none focus:border-accent min-h-[120px]"
            >
              {allPlaylists.map((pl) => (
                <option key={pl.id} value={pl.id}>
                  {pl.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-meta-xs tracking-widest text-[#999999]">
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

      <PendingOverlay isVisible={deletePending} message="Menghapus post..." />

      <ConfirmDeleteAlert
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        formAction={deleteDispatch}
        hiddenFields={[{ name: "id", value: confirmId ?? "" }]}
        title="Hapus Post?"
        description={`Post "${
          confirmingPost?.title ?? ""
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
