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
          flex justify-between items-center px-3 border-b-2 border-black dark:border-[#2a2a2a]
          sticky top-0 bg-[#ffff00] dark:bg-[#0a0a0a] z-50 transition-all duration-200
          ${scrolled ? "py-4" : "py-5"}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="relative w-[30px] h-[30px]">
            <Image
              src="/mylogo-black.png"
              alt="Izzy Dev Logo"
              fill
              className="object-contain block dark:hidden"
            />
            <Image
              src="/mylogo.png"
              alt="Izzy Dev Logo"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
          <div className="font-display font-extrabold text-lg tracking-tight">
            IZZY<span className="text-black dark:text-[#ffff00]">.</span>DEV
          </div>
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-black/70 dark:text-[#999999] text-meta-sm tracking-widest transition-colors hover:text-black dark:hover:text-[#ffff00] no-underline"
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
                bg-transparent text-black dark:text-[#f0f0f0] font-mono text-meta-2xs
                tracking-widest px-4 py-2
                border-2 border-black dark:border-[#2a2a2a] -mr-px
                cursor-pointer transition-all duration-200
                hover:bg-black hover:text-[#ffff00] dark:hover:bg-transparent dark:hover:text-[#ffff00]
              "
            >
              VIEW CV
            </button>

            <div className="hidden sm:block bg-black border-2 border-black text-[#ffff00] dark:bg-transparent dark:border-accent dark:text-[#ffff00] text-meta-2xs px-3 py-2 tracking-widest">
              OPEN TO WORK
            </div>
          </div>
        </div>
      </nav>

      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
