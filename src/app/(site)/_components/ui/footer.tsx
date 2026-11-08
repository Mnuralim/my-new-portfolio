import Link from "next/link";
import Image from "next/image";

const links = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer
      className="px-4 sm:px-8 pt-10 pb-14 flex flex-wrap justify-between items-center gap-x-8 gap-y-5 text-sm"
      style={{ color: "var(--c-muted)" }}
    >
      <div className="flex items-center gap-3">
        <Image src="/07-izzy-susun-2x2.png" alt="" width={28} height={28} />
        <span>© 2026 Muhamad Nur Fatahil Alim</span>
      </div>

      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="no-underline transition-colors hover:text-[var(--c-text)]">
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
