import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="px-4 sm:px-8 py-9 flex flex-wrap justify-between items-center text-meta-xs tracking-widest gap-3 min-w-0"
      style={{ borderTop: "1px solid var(--c-divider)", color: "var(--c-muted3)" }}
    >
      <span>© 2026 — Muhamad Nur Fatahil Alim · Kolaka, ID</span>
      <div className="flex flex-wrap gap-x-7 gap-y-2">
        <Link href="/#projects" style={{ color: "var(--c-muted2)" }}>Projects</Link>
        <Link href="/#skills" style={{ color: "var(--c-muted2)" }}>Skills</Link>
        <Link href="/#experience" style={{ color: "var(--c-muted2)" }}>Experience</Link>
        <Link href="/#services" style={{ color: "var(--c-muted2)" }}>Services</Link>
        <Link href="/#blog" style={{ color: "var(--c-muted2)" }}>Blog</Link>
        <Link href="/#contact" style={{ color: "var(--c-muted2)" }}>Contact</Link>
      </div>
    </footer>
  );
}
