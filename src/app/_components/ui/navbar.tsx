"use client";

import { useState, useEffect } from "react";
import CvModal from "./cv-modal";
import Image from "next/image";

const navLinks = [
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
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
          flex justify-between items-center px-3 border-b-2 border-border
          sticky top-0 bg-bg z-50 transition-all duration-200
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
            IZZY<span className="text-accent">.</span>DEV
          </div>
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-muted text-[0.72rem] tracking-widest transition-colors hover:text-accent no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center" style={{ gap: 0 }}>
          <button
            onClick={() => setCvOpen(true)}
            className="
              hidden sm:block
              bg-transparent text-white font-mono text-[0.6rem]
              tracking-widest px-4 py-2
              border-2 border-border -mr-px
              cursor-pointer transition-all duration-200
              hover:border-white hover:text-white
            "
          >
            VIEW CV
          </button>

          <div className="hidden sm:block border-2 border-accent text-accent text-[0.6rem] px-3 py-2 tracking-widest">
            OPEN TO WORK
          </div>
        </div>
      </nav>

      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
