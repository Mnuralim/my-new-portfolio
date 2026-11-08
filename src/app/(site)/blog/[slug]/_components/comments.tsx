"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, LogOut, Reply, Trash2 } from "lucide-react";
import {
  addComment,
  deleteComment,
  getComments,
  toggleCommentLike,
  type CommentItem,
  type CommentSort,
} from "@/actions/comment";
import { signOut, type PublicUser } from "@/actions/user";
import Chip from "../../../_components/ui/chip";
import { LoginButtons } from "./login-buttons";

const MAX = 2000;
const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

function timeAgo(iso: string) {
  const secs = (new Date(iso).getTime() - Date.now()) / 1000;
  for (const [unit, size] of STEPS) if (Math.abs(secs) >= size) return rtf.format(Math.round(secs / size), unit);
  return "baru saja";
}

function Avatar({ name, image, size }: { name: string; image: string | null; size: number }) {
  const style = { width: size, height: size };
  if (image)
    // eslint-disable-next-line @next/next/no-img-element -- provider avatar hosts aren't in next/image remotePatterns
    return <img src={image} alt="" style={style} referrerPolicy="no-referrer" className="rounded-full flex-shrink-0 object-cover" />;
  return (
    <span
      aria-hidden="true"
      style={{ ...style, background: "var(--c-panel)", color: "var(--c-mark)" }}
      className="rounded-full flex-shrink-0 grid place-items-center font-semibold"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function CommentForm({
  user,
  onSubmit,
  initial = "",
  autoFocus,
  onCancel,
  compact,
}: {
  user: PublicUser;
  onSubmit: (text: string) => Promise<string | null>;
  initial?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
  compact?: boolean;
}) {
  const [text, setText] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const err = await onSubmit(text);
      setError(err);
      if (!err) setText("");
    });
  }

  return (
    <form onSubmit={submit} className="flex gap-3">
      <Avatar name={user.name} image={user.image} size={compact ? 32 : 40} />
      <div className="flex-1 min-w-0">
        <label className="sr-only" htmlFor={compact ? undefined : "comment-input"}>
          Tulis komentar
        </label>
        <textarea
          id={compact ? undefined : "comment-input"}
          aria-label={compact ? "Tulis balasan" : undefined}
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus={autoFocus}
          maxLength={MAX}
          rows={compact ? 2 : 3}
          placeholder={compact ? "Tulis balasan..." : "Tulis komentar..."}
          className="w-full rounded-[16px] px-4 py-3 leading-[1.6] resize-y outline-none transition-colors focus:border-[var(--color-accent)]"
          style={{ background: "var(--c-bg)", border: "1px solid var(--c-border)", color: "var(--c-text)" }}
        />
        <div className="flex items-center justify-between gap-3 mt-2 flex-wrap">
          <span aria-live="polite" className="text-[0.9rem]" style={{ color: error ? "var(--color-accent2)" : "var(--c-muted3)" }}>
            {error ?? `${text.length}/${MAX}`}
          </span>
          <div className="flex gap-2">
            {onCancel && (
              <button type="button" onClick={onCancel} className="btn-ghost btn-tactile !h-10 !px-4">
                Batal
              </button>
            )}
            <button type="submit" disabled={pending || !text.trim()} className="btn-primary btn-tactile !h-10 !px-5 disabled:opacity-50">
              {pending ? "Mengirim..." : compact ? "Balas" : "Kirim"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function CommentRow({
  c,
  isReply,
  user,
  onLike,
  onDelete,
  onReply,
}: {
  c: CommentItem;
  isReply?: boolean;
  user: PublicUser | null;
  onLike: (c: CommentItem) => void;
  onDelete: (c: CommentItem) => void;
  onReply: (c: CommentItem) => void;
}) {
  const action = "inline-flex items-center gap-1.5 h-9 px-2 -ml-2 rounded-full text-[0.9rem] font-medium bg-transparent border-none cursor-pointer transition-colors hover:text-[var(--c-text)]";
  return (
    <div className="flex gap-3">
      <Avatar name={c.author.name} image={c.author.image} size={isReply ? 32 : 40} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-x-2 flex-wrap">
          <span className="font-semibold" style={{ color: "var(--c-text)" }}>
            {c.author.name}
          </span>
          <time dateTime={c.createdAt} suppressHydrationWarning className="text-[0.85rem]" style={{ color: "var(--c-muted3)" }}>
            {timeAgo(c.createdAt)}
          </time>
        </div>
        <p className="mt-1 leading-[1.65] whitespace-pre-wrap break-words" style={{ color: "var(--c-b5)" }}>
          {c.content}
        </p>
        <div className="flex items-center gap-3 mt-1" style={{ color: "var(--c-muted)" }}>
          <button
            type="button"
            onClick={() => onLike(c)}
            aria-pressed={c.likedByMe}
            aria-label={`Suka komentar ${c.author.name}, ${c.likeCount} suka`}
            className={action}
            style={c.likedByMe ? { color: "var(--color-accent)" } : undefined}
          >
            <Heart size={16} fill={c.likedByMe ? "currentColor" : "none"} aria-hidden="true" />
            <span className="tabular-nums">{c.likeCount || ""}</span>
          </button>
          {user && (
            <button type="button" onClick={() => onReply(c)} className={action}>
              <Reply size={16} aria-hidden="true" />
              Balas
            </button>
          )}
          {c.canDelete && (
            <button type="button" onClick={() => onDelete(c)} className={action}>
              <Trash2 size={16} aria-hidden="true" />
              Hapus
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface Props {
  slug: string;
  user: PublicUser | null;
  initialComments: CommentItem[];
}

export function Comments({ slug, user, initialComments }: Props) {
  const router = useRouter();
  const authError = useSearchParams().has("authError");
  const [comments, setComments] = useState(initialComments);
  const [sort, setSort] = useState<CommentSort>("relevant");
  const [replyTo, setReplyTo] = useState<{ rootId: string; mention: string } | null>(null);
  const [needLogin, setNeedLogin] = useState(false);
  const [loading, startTransition] = useTransition();

  const total = comments.reduce((n, c) => n + 1 + c.replies.length, 0);

  // apply a change to one comment wherever it sits (top level or reply)
  const patch = (id: string, fn: (c: CommentItem) => CommentItem | null) =>
    setComments((list) =>
      list.flatMap((c) => {
        const next = c.id === id ? fn(c) : c;
        if (!next) return [];
        return [{ ...next, replies: next.replies.flatMap((r) => (r.id === id ? (fn(r) ?? []) : [r])) }];
      })
    );

  function changeSort(next: CommentSort) {
    setSort(next);
    startTransition(async () => setComments(await getComments(slug, next)));
  }

  async function post(text: string) {
    const res = await addComment(slug, text);
    if (!res.ok) return res.error;
    setComments((list) => [res.comment, ...list]);
    return null;
  }

  async function reply(rootId: string, text: string) {
    const res = await addComment(slug, text, rootId);
    if (!res.ok) return res.error;
    setComments((list) => list.map((c) => (c.id === rootId ? { ...c, replies: [...c.replies, res.comment] } : c)));
    setReplyTo(null);
    return null;
  }

  function like(c: CommentItem) {
    if (!user) return setNeedLogin(true);
    patch(c.id, (x) => ({ ...x, likedByMe: !x.likedByMe, likeCount: x.likeCount + (x.likedByMe ? -1 : 1) }));
    startTransition(async () => {
      const res = await toggleCommentLike(c.id);
      patch(c.id, (x) => (res.ok ? { ...x, likedByMe: res.liked, likeCount: res.likeCount } : { ...x, likedByMe: c.likedByMe, likeCount: c.likeCount }));
    });
  }

  function remove(c: CommentItem) {
    const msg = c.replies.length ? "Hapus komentar ini beserta balasannya?" : "Hapus komentar ini?";
    if (!window.confirm(msg)) return;
    startTransition(async () => {
      const res = await deleteComment(c.id);
      if (res.ok) patch(c.id, () => null);
    });
  }

  function logout() {
    startTransition(async () => {
      await signOut();
      router.refresh();
    });
  }

  return (
    <section id="comments" aria-labelledby="comments-title" className="mt-16 pt-10" style={{ borderTop: "1px solid var(--c-border)" }}>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
        <h2 id="comments-title" className="font-semibold text-[1.6rem] tracking-[-0.02em]" style={{ color: "var(--c-text)" }}>
          Komentar <span style={{ color: "var(--c-muted3)" }}>{total}</span>
        </h2>
        {comments.length > 1 && (
          <div className="flex gap-2" role="group" aria-label="Urutkan komentar">
            <Chip active={sort === "relevant"} onClick={() => changeSort("relevant")}>
              Paling relevan
            </Chip>
            <Chip active={sort === "newest"} onClick={() => changeSort("newest")}>
              Terbaru
            </Chip>
          </div>
        )}
      </div>

      {user ? (
        <div className="mb-10">
          <CommentForm user={user} onSubmit={post} />
          <div className="mt-3 pl-[52px] flex items-center gap-2 text-[0.9rem]" style={{ color: "var(--c-muted)" }}>
            Login sebagai <span className="font-medium" style={{ color: "var(--c-text)" }}>{user.name}</span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1 bg-transparent border-none cursor-pointer underline underline-offset-2"
              style={{ color: "var(--c-muted)" }}
            >
              <LogOut size={14} aria-hidden="true" />
              Keluar
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-10 rounded-[24px] p-6 sm:p-7" style={{ background: "var(--c-divider)" }}>
          <p className="font-semibold text-[1.1rem]" style={{ color: "var(--c-text)" }}>
            {needLogin ? "Login dulu buat kasih suka atau komentar." : "Ikut ngobrol di sini"}
          </p>
          <p className="mt-1 mb-4" style={{ color: "var(--c-muted)" }}>
            Login pakai akun Google atau GitHub. Nama dan foto profilmu yang tampil di komentar.
          </p>
          {authError && (
            <p role="alert" className="mb-4 text-[0.95rem]" style={{ color: "var(--color-accent2)" }}>
              Login gagal atau dibatalkan. Coba lagi.
            </p>
          )}
          <LoginButtons />
          <p className="mt-4 text-[0.85rem]" style={{ color: "var(--c-muted3)" }}>
            Dengan login, kamu setuju dengan{" "}
            <Link href="/terms" className="underline underline-offset-2" style={{ color: "inherit" }}>
              Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="underline underline-offset-2" style={{ color: "inherit" }}>
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>
      )}

      {comments.length === 0 ? (
        <p style={{ color: "var(--c-muted)" }}>Belum ada komentar. Jadi yang pertama.</p>
      ) : (
        <ul className="flex flex-col gap-8" aria-busy={loading}>
          {comments.map((c) => (
            <li key={c.id}>
              <CommentRow c={c} user={user} onLike={like} onDelete={remove} onReply={(x) => setReplyTo({ rootId: c.id, mention: x.id === c.id ? "" : `@${x.author.name} ` })} />

              {(c.replies.length > 0 || replyTo?.rootId === c.id) && (
                <div className="mt-5 ml-[52px] flex flex-col gap-5">
                  {c.replies.map((r) => (
                    <CommentRow
                      key={r.id}
                      c={r}
                      isReply
                      user={user}
                      onLike={like}
                      onDelete={remove}
                      onReply={(x) => setReplyTo({ rootId: c.id, mention: `@${x.author.name} ` })}
                    />
                  ))}
                  {user && replyTo?.rootId === c.id && (
                    <CommentForm
                      key={replyTo.mention}
                      user={user}
                      compact
                      autoFocus
                      initial={replyTo.mention}
                      onCancel={() => setReplyTo(null)}
                      onSubmit={(text) => reply(c.id, text)}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
