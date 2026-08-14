import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 sm:px-8 py-32 max-w-7xl mx-auto text-center">
      <div
        className="font-mono text-meta-sm tracking-widest mb-4"
        style={{ color: "var(--color-accent)" }}
      >
        {"// 404"}
      </div>
      <h1
        className="font-sans font-extrabold text-[clamp(2rem,5vw,3rem)] mb-4"
        style={{ color: "var(--c-text)" }}
      >
        Halaman gak ketemu.
      </h1>
      <p className="text-meta-lg mb-8" style={{ color: "var(--c-muted)" }}>
        Halaman yang lo cari gak ada atau udah dipindah.
      </p>
      <Link href="/" className="btn-primary btn-tactile inline-block">
        Ke Beranda
      </Link>
    </div>
  );
}
