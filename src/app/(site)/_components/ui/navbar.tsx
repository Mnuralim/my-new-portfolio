"use client";

import { useState, useEffect } from "react";
import CvModal from "./cv-modal";
import Image from "next/image";
import ThemeToggle from "@/app/_components/theme-toggle";

const navLinks = [
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SERVICES", href: "#services" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          flex justify-between items-center px-3 border-b-2 border-[#1a1a1a] dark:border-[#2a2a2a]
          sticky top-0 bg-[#fafaf8] dark:bg-[#0a0a0a] z-50 transition-all duration-200
          ${scrolled ? "py-4" : "py-5"}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-[30px] h-[30px]">
            <Image
              src="/izzy-dev-nobg2.png"
              alt="Izzy Dev Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="font-display font-extrabold text-lg tracking-tight">
            IZZY<span className="text-[#1a1a1a] dark:text-[#e8ff47]">.</span>DEV
          </div>
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[#6b6b66] dark:text-[#999999] text-meta-sm tracking-widest transition-colors hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center" style={{ gap: 0 }}>
            <button
              onClick={() => setCvOpen(true)}
              className="
                hidden sm:block
                bg-transparent text-[#111111] dark:text-[#f0f0f0] font-mono text-meta-2xs
                tracking-widest px-4 py-2
                border-2 border-[#1a1a1a] dark:border-[#2a2a2a] -mr-px
                cursor-pointer transition-all duration-200
                hover:border-white hover:text-[#111111] dark:hover:text-[#f0f0f0]
              "
            >
              VIEW CV
            </button>

            <div className="hidden sm:block border-2 border-accent text-[#1a1a1a] dark:text-[#e8ff47] text-meta-2xs px-3 py-2 tracking-widest">
              OPEN TO WORK
            </div>
          </div>
        </div>
      </nav>

      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
