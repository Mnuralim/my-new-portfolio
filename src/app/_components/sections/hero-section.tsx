"use client";

import { useState } from "react";
import { stats } from "@/lib/data";
import CvModal from "../ui/cv-modal";

export default function HeroSection() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <section className="min-h-[85vh] flex flex-col justify-center px-10 py-20 border-b-2 border-border relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-2/5 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #2a2a2a 0, #2a2a2a 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, #2a2a2a 0, #2a2a2a 1px, transparent 1px, transparent 60px)
            `,
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-block bg-accent text-black text-[0.65rem] px-3 py-1 tracking-[3px] font-bold mb-6">
            {"// WEB DEVELOPER & IT SUPPORT"}
          </div>

          <h1 className="font-display font-extrabold leading-[0.95] tracking-[-3px] text-[clamp(3rem,8vw,7rem)] mb-8">
            BUILD.
            <br />
            <span className="text-outline">DEPLOY.</span>
            <br />
            <span className="text-accent">SOLVE.</span>
          </h1>

          <p className="text-[0.85rem] text-muted max-w-md leading-[1.8] mb-12">
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

          <div className="flex gap-12 mt-16 pt-8 border-t-2 border-border flex-wrap">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-display font-extrabold text-[2rem] text-accent leading-none">
                  {stat.num}
                </span>
                <span className="text-[0.65rem] tracking-widest text-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-8 right-10 text-[0.65rem] tracking-[3px] text-muted flex items-center gap-2"
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
