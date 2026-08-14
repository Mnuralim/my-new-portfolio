"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { stats } from "@/lib/data";

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="px-4 sm:px-8 py-16 sm:py-[100px] grid lg:grid-cols-[1.2fr_0.9fr] gap-12 lg:gap-[60px] items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-block font-mono text-meta-xs tracking-[0.08em] px-3.5 py-1.5 rounded-[6px] mb-7"
            style={{ color: "#0b0b0c", background: "var(--color-accent)" }}
          >
            {"// WEB DEVELOPER & IT SUPPORT"}
          </div>

          <h1
            lang="en"
            className="font-sans font-extrabold leading-[1.02] tracking-[-0.02em] text-[clamp(2.5rem,8vw,5.4rem)] mb-7"
            style={{ color: "var(--c-text)" }}
          >
            Build.
            <br />
            Deploy.
            <br />
            <span style={{ color: "var(--color-accent)" }}>Solve.</span>
          </h1>

          <p
            className="text-meta-lg leading-[1.6] max-w-[520px] mb-10"
            style={{ color: "var(--c-muted)" }}
          >
            Gue bikin web yang berfungsi dengan baik dan bantu sistem IT
            berjalan tanpa hambatan. Full-stack dev + troubleshooter yang
            passionate.
          </p>

          <div className="flex items-center gap-4 flex-wrap mb-16">
            <Link href="/#projects" className="btn-primary btn-tactile">
              Lihat Proyek
            </Link>
            <Link href="/#contact" className="btn-ghost btn-tactile">
              Hubungi Gue
            </Link>
          </div>

          <div className="flex gap-12 flex-wrap">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="font-sans font-extrabold text-[1.9rem] leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  {stat.num}
                </span>
                <span
                  className="text-meta-xs tracking-widest"
                  style={{ color: "var(--c-muted2)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block rounded-[14px] overflow-hidden"
          style={{
            background: "var(--c-cardbg2)",
            border: "1px solid var(--c-cardborder)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          <div
            className="flex items-center gap-2 px-[18px] py-3.5"
            style={{ borderBottom: "1px solid var(--c-cardborder)" }}
          >
            <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F56]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#FFBD2E]" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#27C93F]" />
            <span
              className="font-mono text-meta-xs ml-2"
              style={{ color: "var(--c-muted2)" }}
            >
              izzy@dev — zsh
            </span>
          </div>
          <div className="p-[22px] font-mono text-meta-sm leading-[1.9]">
            <div>
              <span style={{ color: "var(--color-accent)" }}>→ </span>
              whoami
            </div>
            <div className="mb-3.5" style={{ color: "var(--c-muted2)" }}>
              {"// Fullstack Dev + IT Support"}
            </div>
            <div>
              <span style={{ color: "var(--color-accent)" }}>→ </span>
              cat stack.txt
            </div>
            <div className="mb-3.5" style={{ color: "var(--c-muted2)" }}>
              Next.js · Bun · Prisma
              <br />
              Solidity · MySQL · Linux
            </div>
            <div>
              <span style={{ color: "var(--color-accent)" }}>→ </span>
              status
            </div>
            <div className="mb-3.5 text-[#5FE07A]">
              ● ONLINE &amp; READY TO BUILD
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--color-accent)" }}>→</span>
              <span className="inline-block w-2 h-[15px] bg-accent animate-blink align-middle" />
            </div>
          </div>
      </motion.div>
    </section>
  );
}
