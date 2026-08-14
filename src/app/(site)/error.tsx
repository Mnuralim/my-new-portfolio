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
    <div className="px-4 sm:px-8 py-32 max-w-7xl mx-auto text-center">
      <div
        className="font-mono text-meta-sm tracking-widest mb-4"
        style={{ color: "var(--color-accent)" }}
      >
        {"// ERROR"}
      </div>
      <h1
        className="font-sans font-extrabold text-[clamp(2rem,5vw,3rem)] mb-4"
        style={{ color: "var(--c-text)" }}
      >
        Ada yang salah.
      </h1>
      <p className="text-meta-lg mb-8" style={{ color: "var(--c-muted)" }}>
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
