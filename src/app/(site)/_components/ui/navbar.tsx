"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CvModal from "./cv-modal";
import Image from "next/image";
import ThemeToggle from "@/app/_components/theme-toggle";

const navLinks = [
  { label: "PROJECTS", href: "/#projects" },
  { label: "SKILLS", href: "/#skills" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "SERVICES", href: "/#services" },
  { label: "BLOG", href: "/#blog" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const pathname = usePathname();
  const isWhiteRoute =
    pathname?.startsWith("/blog") || pathname?.startsWith("/playlist") || false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50 transition-all duration-200
          border-b-2
          ${
            scrolled
              ? "py-4 bg-black border-accent dark:bg-[#0a0a0a] dark:border-[#2a2a2a]"
              : isWhiteRoute
              ? "py-5 bg-white border-[#e5e5e5] dark:bg-[#0a0a0a] dark:border-[#2a2a2a]"
              : "py-5 bg-[#ffff00] border-black dark:bg-[#0a0a0a] dark:border-[#2a2a2a]"
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-3">
          <div className="flex items-center gap-2">
            <div className="relative w-[30px] h-[30px]">
              <Image
                src="/mylogo-black.png"
                alt="Izzy Dev Logo"
                fill
                className={`object-contain ${
                  scrolled ? "hidden" : "block"
                } dark:hidden`}
              />
              <Image
                src="/mylogo.png"
                alt="Izzy Dev Logo"
                fill
                className={`object-contain ${
                  scrolled ? "block" : "hidden"
                } dark:block`}
              />
            </div>
            <div
              className={`font-display font-extrabold text-lg tracking-tight ${
                scrolled ? "text-[#ffff00]" : "text-black"
              } dark:text-[#ffff00]`}
            >
              IZZY.DEV
            </div>
          </div>

          <ul className="hidden md:flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`
                    text-meta-sm tracking-widest transition-colors no-underline
                    ${
                      scrolled
                        ? "text-[#ffff00] hover:text-[#ffff00]/80"
                        : "text-black/70 hover:text-black"
                    }
                    dark:text-[#999999] dark:hover:text-[#ffff00]
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle scrolled={scrolled} />
            <div className="flex items-center" style={{ gap: 0 }}>
              <button
                onClick={() => setCvOpen(true)}
                className={`
                  hidden sm:block
                  bg-transparent font-mono text-meta-2xs
                  tracking-widest px-4 py-2
                  -mr-px
                  cursor-pointer transition-all duration-200
                  ${
                    scrolled
                      ? "text-[#f0f0f0] border-2 border-[#2a2a2a] hover:bg-transparent hover:text-[#ffff00]"
                      : "text-black border-2 border-black hover:bg-[#00FFFF] hover:text-black"
                  }
                  dark:text-[#f0f0f0] dark:border-[#2a2a2a] dark:hover:bg-transparent dark:hover:text-[#ffff00]
                `}
              >
                VIEW CV
              </button>

              <div
                className={`
                  hidden sm:block text-meta-2xs px-3 py-2 tracking-widest
                  ${
                    scrolled
                      ? "bg-transparent border-2 border-accent text-[#ffff00]"
                      : "bg-black border-2 border-black text-[#ffff00]"
                  }
                  dark:bg-transparent dark:border-accent dark:text-[#ffff00]
                `}
              >
                OPEN TO WORK
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
