"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="px-4 sm:px-8 py-24 sm:py-32 max-w-2xl mx-auto text-center">
      <h1
        className="font-bold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] mb-4"
        style={{ color: "var(--c-text)" }}
      >
        Ada yang salah.
      </h1>
      <p className="text-[1.1rem] leading-[1.6] mb-8" style={{ color: "var(--c-muted)" }}>
        Terjadi kesalahan saat memuat halaman ini. Coba lagi atau kembali ke beranda.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <button onClick={reset} className="btn-primary btn-tactile">
          Coba Lagi
        </button>
        <Link href="/" className="btn-ghost btn-tactile">
          Ke Beranda
        </Link>
      </div>
    </div>
  );
}
