"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import CvModal from "./cv-modal";
import type { CvFile } from "@/lib/data";
import Image from "next/image";
import ThemeToggle from "@/app/_components/theme-toggle";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Credentials", href: "/#credentials" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ cvs }: { cvs: CvFile[] }) {
  const [cvOpen, setCvOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  // hero "Unduh CV" button opens the same modal
  useEffect(() => {
    const open = () => setCvOpen(true);
    window.addEventListener("open-cv", open);
    return () => window.removeEventListener("open-cv", open);
  }, []);

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-[72px] flex items-center gap-10 px-4 sm:px-8 backdrop-blur-md"
        style={{ background: "var(--c-navbg)" }}
      >
        <Link href="/" className="flex-shrink-0 mr-auto lg:mr-0" aria-label="izzy, beranda">
          <Image src="/07-izzy-susun-2x2.png" alt="" width={40} height={40} priority />
        </Link>

        <ul className="hidden lg:flex gap-7 list-none mr-auto">
          {navLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="text-[0.95rem] no-underline transition-colors hover:text-[var(--c-text)]"
                  style={{ color: isActive ? "var(--c-text)" : "var(--c-muted)" }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/#contact" className="btn-primary btn-tactile hidden sm:inline-flex">
            Hubungi gue
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full cursor-pointer bg-transparent"
            style={{ border: "1px solid var(--c-border)", color: "var(--c-text)" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden sticky top-[72px] z-40 overflow-hidden"
            style={{ background: "var(--c-bg)", borderBottom: "1px solid var(--c-divider)" }}
          >
            <ul className="flex flex-col list-none px-4 py-2">
              {navLinks.map((link) => {
                const isActive = link.href === pathname;
                return (
                  <li key={link.label} style={{ borderTop: "1px solid var(--c-divider)" }}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="block py-3.5 text-meta-md no-underline"
                      style={{ color: isActive ? "var(--color-accent)" : "var(--c-text)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li style={{ borderTop: "1px solid var(--c-divider)" }} className="py-3.5">
                <button
                  onClick={() => {
                    setCvOpen(true);
                    setMobileOpen(false);
                  }}
                  className="text-meta-md bg-transparent border-none cursor-pointer p-0"
                  style={{ color: "var(--c-text)" }}
                >
                  View CV
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <CvModal cvs={cvs} isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
