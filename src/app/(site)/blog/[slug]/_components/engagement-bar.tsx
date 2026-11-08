"use client";

import { useState, useTransition } from "react";
import { Check, Heart, Link2, Share2 } from "lucide-react";
import { togglePostLike } from "@/actions/engagement";
import { shareLinks } from "@/lib/share";
import { LoginButtons } from "./login-buttons";

interface Props {
  slug: string;
  title: string;
  url: string;
  initialLiked: boolean;
  initialCount: number;
  loggedIn: boolean;
}

const LABELS = { whatsapp: "WhatsApp", facebook: "Facebook", linkedin: "LinkedIn", x: "X", telegram: "Telegram" } as const;

export function EngagementBar({ slug, title, url, initialLiked, initialCount, loggedIn }: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [shareOpen, setShareOpen] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  function like() {
    if (!loggedIn) return setNeedLogin(true);
    // optimistic, then reconcile with the server count
    setLiked(!liked);
    setCount((c) => c + (liked ? -1 : 1));
    startTransition(async () => {
      const res = await togglePostLike(slug);
      if (res.ok) {
        setLiked(res.liked);
        setCount(res.likeCount);
      } else {
        setLiked(liked);
        setCount((c) => c + (liked ? 1 : -1));
      }
    });
  }

  async function share() {
    // phones: native share sheet; desktop: show the list
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* cancelled: fall through to the list */
      }
    }
    setShareOpen((o) => !o);
  }

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const links = shareLinks(url, title);

  return (
    <div className="mt-14 rounded-[24px] p-4 sm:p-5" style={{ background: "var(--c-divider)" }}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={like}
          aria-pressed={liked}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full font-semibold cursor-pointer transition-colors"
          style={
            liked
              ? { background: "var(--color-accent)", color: "var(--c-on-accent)", border: "1px solid var(--color-accent)" }
              : { background: "var(--c-bg)", color: "var(--c-text)", border: "1px solid var(--c-border)" }
          }
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
          {liked ? "Disukai" : "Suka"}
          <span className="tabular-nums" aria-label={`${count} suka`}>
            {count}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button type="button" onClick={copy} className="btn-ghost btn-tactile !h-11 !bg-[var(--c-bg)]">
            {copied ? <Check size={17} aria-hidden="true" /> : <Link2 size={17} aria-hidden="true" />}
            {copied ? "Tersalin" : "Salin link"}
          </button>
          <button
            type="button"
            onClick={share}
            aria-expanded={shareOpen}
            className="btn-ghost btn-tactile !h-11 !bg-[var(--c-bg)]"
          >
            <Share2 size={17} aria-hidden="true" />
            Bagikan
          </button>
        </div>
      </div>

      {shareOpen && (
        <div className="flex flex-wrap gap-2 mt-4">
          {(Object.keys(LABELS) as (keyof typeof LABELS)[]).map((k) => (
            <a
              key={k}
              href={links[k]}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 inline-flex items-center rounded-full text-[0.9rem] font-medium no-underline transition-colors hover:border-[var(--c-text)]"
              style={{ background: "var(--c-bg)", color: "var(--c-text)", border: "1px solid var(--c-border)" }}
            >
              {LABELS[k]}
              <span className="sr-only"> (buka di tab baru)</span>
            </a>
          ))}
        </div>
      )}

      {needLogin && (
        <div className="mt-4">
          <p className="mb-3 text-[0.95rem]" style={{ color: "var(--c-muted)" }}>
            Login dulu buat kasih suka.
          </p>
          <LoginButtons />
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {copied ? "Link tersalin" : ""}
      </p>
    </div>
  );
}
