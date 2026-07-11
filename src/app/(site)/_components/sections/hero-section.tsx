"use client";

import { useState } from "react";
import { stats } from "@/lib/data";
import CvModal from "../ui/cv-modal";

export default function HeroSection() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="min-h-[85vh] flex flex-col justify-center px-3 py-20 border-b-2 border-[#1a1a1a] dark:border-[#2a2a2a] relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-2/5 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, var(--stroke-color) 0, var(--stroke-color) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, var(--stroke-color) 0, var(--stroke-color) 1px, transparent 1px, transparent 60px)
            `,
          }}
        />

        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-16 items-center">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent text-black text-meta-xs px-3 py-1 tracking-[3px] font-bold mb-6">
              {"// WEB DEVELOPER & IT SUPPORT"}
            </div>

            <h1 className="font-display font-extrabold leading-[0.95] tracking-[-3px] text-[clamp(3rem,8vw,7rem)] mb-8">
              BUILD.
              <br />
              <span className="text-outline">DEPLOY.</span>
              <br />
              <span className="text-[#1a1a1a] dark:text-[#e8ff47]">SOLVE.</span>
            </h1>

            <p className="text-meta-lg text-[#6b6b66] dark:text-[#999999] max-w-md leading-[1.8] mb-12">
              Gue bikin web yang berfungsi dengan baik dan bantu sistem IT
              berjalan tanpa hambatan. Full-stack dev + troubleshooter yang
              passionate.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a href="#projects" className="btn-primary">
                LIHAT PROYEK
              </a>
              <a href="#contact" className="btn-ghost">
                HUBUNGI GUE
              </a>
              <button onClick={() => setCvOpen(true)} className="btn-ghost">
                VIEW CV ↗
              </button>
            </div>

            <div className="flex gap-12 mt-16 pt-8 border-t-2 border-[#1a1a1a] dark:border-[#2a2a2a] flex-wrap">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display font-extrabold text-[2rem] text-[#1a1a1a] dark:text-[#e8ff47] leading-none">
                    {stat.num}
                  </span>
                  <span className="text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block w-[340px] bg-[#f2f2ee] dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-[#2a2a2a] font-mono text-meta-sm">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b-2 border-[#1a1a1a] dark:border-[#2a2a2a]">
              <span className="w-2.5 h-2.5 rounded-full bg-accent2" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent3" />
              <span className="ml-2 text-meta-2xs tracking-widest text-[#6b6b66] dark:text-[#999999]">
                izzy@dev — zsh
              </span>
            </div>
            <div className="p-5 leading-[2]">
              <div>
                <span className="text-[#1a1a1a] dark:text-[#e8ff47]">→ </span>
                <span className="text-[#111111] dark:text-[#f0f0f0]">whoami</span>
              </div>
              <div className="text-[#6b6b66] dark:text-[#999999]">
                {"// Fullstack Dev + IT Support"}
              </div>
              <div className="mt-2">
                <span className="text-[#1a1a1a] dark:text-[#e8ff47]">→ </span>
                <span className="text-[#111111] dark:text-[#f0f0f0]">cat stack.txt</span>
              </div>
              <div className="text-[#6b6b66] dark:text-[#999999]">
                Next.js · Bun · Prisma
                <br />
                Solidity · MySQL · Linux
              </div>
              <div className="mt-2">
                <span className="text-[#1a1a1a] dark:text-[#e8ff47]">→ </span>
                <span className="text-[#111111] dark:text-[#f0f0f0]">status</span>
              </div>
              <div className="text-accent3">● ONLINE &amp; READY TO BUILD</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[#1a1a1a] dark:text-[#e8ff47]">→</span>
                <span className="inline-block w-2 h-4 bg-accent animate-blink" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 right-10 text-meta-xs tracking-[3px] text-[#6b6b66] dark:text-[#999999] flex items-center gap-2"
          style={{ writingMode: "vertical-rl" }}
        >
          <span
            className="inline-block w-px bg-muted"
            style={{ height: "40px" }}
          />
          SCROLL DOWN
        </div>
      </section>

      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
