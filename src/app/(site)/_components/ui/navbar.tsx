"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import CvModal from "./cv-modal";
import Image from "next/image";
import ThemeToggle from "@/app/_components/theme-toggle";

const navLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [cvOpen, setCvOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-[22px] backdrop-blur-md"
        style={{
          background: "var(--c-navbg)",
          borderBottom: "1px solid var(--c-divider)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div
            className="relative w-[30px] h-[30px] rounded-[7px] flex items-center justify-center flex-shrink-0"
            style={{ background: "#0b0b0c" }}
          >
            <Image
              src="/mylogo.png"
              alt="Izzy Dev Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span
            className="font-mono font-semibold text-base tracking-tight"
            style={{ color: "var(--c-text)" }}
          >
            izzy.dev
          </span>
        </Link>

        <ul className="hidden md:flex gap-7 list-none">
          {navLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className="text-meta-sm no-underline transition-colors"
                  style={{ color: isActive ? "var(--color-accent)" : "var(--c-b5)" }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3.5">
          <ThemeToggle />
          <button
            onClick={() => setCvOpen(true)}
            className="hidden sm:block font-sans text-meta-sm px-4 py-2.5 rounded-[8px] cursor-pointer transition-opacity hover:opacity-70 bg-transparent"
            style={{ color: "var(--c-text)", border: "1px solid var(--c-border)" }}
          >
            View CV
          </button>
          <span
            className="hidden sm:block font-mono text-meta-sm px-3.5 py-2 rounded-[8px] whitespace-nowrap"
            style={{
              color: "var(--color-accent)",
              border: "1px solid #3a3a1f",
              background: "rgba(244,228,0,0.08)",
            }}
          >
            Open to work
          </span>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-[8px] cursor-pointer bg-transparent"
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
            className="md:hidden sticky top-[65px] z-40 overflow-hidden"
            style={{ background: "var(--c-bg)", borderBottom: "1px solid var(--c-divider)" }}
          >
            <ul className="flex flex-col list-none px-4 py-2">
              {navLinks.map((link) => {
                const isActive = link.href === pathname;
                return (
                  <li key={link.label} style={{ borderTop: "1px solid var(--c-divider)" }}>
                    <Link
                      href={link.href}
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
                  onClick={() => setCvOpen(true)}
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

      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
