import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-[0.9rem] font-medium no-underline transition-colors hover:border-[var(--c-text)]"
      style={{ border: "1px solid var(--c-border)", color: "var(--c-text)" }}
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {children}
    </Link>
  );
}

// title block for list pages (blog, playlists)
export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="mb-12">
      <h1
        className="font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.035em]"
        style={{ color: "var(--c-text)" }}
      >
        {title}
      </h1>
      {intro && (
        <p className="mt-4 text-[1.1rem] leading-[1.6] max-w-[52ch]" style={{ color: "var(--c-muted)" }}>
          {intro}
        </p>
      )}
    </header>
  );
}
