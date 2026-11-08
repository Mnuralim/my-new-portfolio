import Link from "next/link";

// card for blog posts and playlists: cover, then text below (no labels on top of the image)
export default function ContentCard({
  href,
  cover,
  title,
  description,
  eyebrow,
  meta,
}: {
  href: string;
  cover?: string | null;
  title: string;
  description?: string | null;
  eyebrow?: string;
  meta?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      // no cover: the card becomes a text tile instead of showing an empty image box
      className={`group flex flex-col no-underline ${cover ? "" : "rounded-[24px] p-6 sm:p-7 min-h-[220px] transition-colors"}`}
      style={{ color: "inherit", background: cover ? undefined : "var(--c-divider)" }}
    >
      {cover && (
        <div className="aspect-[16/10] overflow-hidden rounded-[24px] mb-5" style={{ background: "var(--c-divider)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageKit URLs aren't in next/image remotePatterns */}
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>
      )}
      {eyebrow && (
        <div className="font-mono text-meta-sm mb-2" style={{ color: "var(--c-muted)" }}>
          {eyebrow}
        </div>
      )}
      <h3 className="font-semibold text-[1.2rem] leading-[1.3] tracking-[-0.01em]" style={{ color: "var(--c-text)" }}>
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 leading-[1.6] line-clamp-2" style={{ color: "var(--c-muted)" }}>
          {description}
        </p>
      )}
      {meta && (
        <div className={`mt-3 font-mono text-meta-sm ${cover ? "" : "mt-auto pt-4"}`} style={{ color: "var(--c-muted3)" }}>
          {meta}
        </div>
      )}
    </Link>
  );
}
