import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 sm:px-8 py-24 sm:py-32 max-w-2xl mx-auto text-center">
      <h1
        className="font-bold text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] mb-4"
        style={{ color: "var(--c-text)" }}
      >
        Halaman gak ketemu.
      </h1>
      <p className="text-[1.1rem] leading-[1.6] mb-8" style={{ color: "var(--c-muted)" }}>
        Halaman yang lo cari gak ada atau udah dipindah.
      </p>
      <Link href="/" className="btn-primary btn-tactile">
        Ke Beranda
      </Link>
    </div>
  );
}
