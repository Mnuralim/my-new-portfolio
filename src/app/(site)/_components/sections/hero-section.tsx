"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { stats } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;
const faint = { stroke: "#F5F0E6", strokeOpacity: 0.16, strokeWidth: 44 };
const mustard = { stroke: "#E8B94A", strokeWidth: 44 };

// "~50" -> { pre: "~", n: 50, suf: "" }; null when there is no number worth counting
function parseStat(num: string) {
  const m = num.match(/^(\D*)(\d+)(\D*)$/);
  return m && +m[2] > 1 ? { pre: m[1], n: +m[2], suf: m[3] } : null;
}

function HeroPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const panel = ref.current;
    if (!panel || reduce) return;

    const move = (e: PointerEvent) => {
      const r = panel.getBoundingClientRect();
      panel.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
      panel.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const leave = () => {
      panel.style.setProperty("--px", "0");
      panel.style.setProperty("--py", "0");
    };
    panel.addEventListener("pointermove", move);
    panel.addEventListener("pointerleave", leave);

    // pause the loop while the panel is off screen
    const io = new IntersectionObserver(([e]) => panel.classList.toggle("off", !e.isIntersecting));
    io.observe(panel);

    // count-up once on mount
    let raf = 0;
    const els = [...panel.querySelectorAll<HTMLElement>("[data-count]")];
    const t0 = performance.now() + 500;
    const tick = (t: number) => {
      const k = Math.min(Math.max((t - t0) / 1200, 0), 1);
      const eased = 1 - Math.pow(1 - k, 3);
      els.forEach((el) => {
        const s = parseStat(el.dataset.count!)!;
        el.textContent = s.pre + Math.round(s.n * eased) + s.suf;
      });
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    if (els.length) raf = requestAnimationFrame(tick);

    return () => {
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.35, ease }}
      className="hero-panel relative overflow-hidden rounded-[24px] grid grid-cols-1 gap-6 px-6 py-7 lg:grid-cols-[auto_1fr] lg:grid-rows-[100%] lg:items-center lg:gap-10 lg:px-10 lg:py-9 lg:aspect-[16/9.5]"
      style={{ background: "var(--c-panel)", color: "var(--c-on-panel)" }}
    >
      <div
        className="ly flex flex-row gap-3 justify-between sm:justify-start sm:gap-14 lg:flex-col lg:gap-[26px]"
        style={{ "--d": -3 } as React.CSSProperties}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <b
              className="block font-semibold text-[26px] lg:text-[30px] leading-none tracking-[-0.02em] tabular-nums"
              data-count={parseStat(stat.num) ? stat.num : undefined}
            >
              {stat.num}
            </b>
            <span className="block mt-1.5 text-[13px] lg:text-sm" style={{ color: "var(--c-on-panel-muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* logo 2x2 jadi carousel vertikal: iz -> zy -> iz (duplikat supaya loop mulus) */}
      <svg
        viewBox="-10 -10 360 340"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="-order-1 lg:order-none w-full h-[clamp(180px,48vw,300px)] lg:h-full min-h-0 overflow-hidden"
        strokeLinecap="round"
      >
        <g className="track">
          <g>
            <g className="ly" style={{ "--d": 4 } as React.CSSProperties}>
              <g className="sq">
                <line className="draw d0" pathLength={1} x1="50" y1="130" x2="50" y2="262" {...faint} />
              </g>
            </g>
            <g className="ly" style={{ "--d": 7 } as React.CSSProperties}>
              <line className="draw d1" pathLength={1} x1="132" y1="130" x2="292" y2="130" {...faint} />
              <line className="draw d3" pathLength={1} x1="132" y1="262" x2="292" y2="262" {...faint} />
              <line className="draw d2" pathLength={1} x1="132" y1="262" x2="292" y2="130" {...mustard} />
            </g>
            <g className="ly" style={{ "--d": 12 } as React.CSSProperties}>
              <g className="pop">
                <circle className="hop" cx="50" cy="56" r="26" fill="#E8B94A" />
              </g>
            </g>
          </g>
          <g transform="translate(0 340)">
            <g className="ly" style={{ "--d": 7 } as React.CSSProperties}>
              <line x1="10" y1="130" x2="160" y2="130" {...faint} />
              <line x1="10" y1="262" x2="160" y2="262" {...faint} />
              <line className="z2" pathLength={1} x1="10" y1="262" x2="160" y2="130" {...mustard} />
            </g>
            <g className="ly" style={{ "--d": 10 } as React.CSSProperties}>
              <line x1="208" y1="130" x2="284" y2="222" {...faint} />
              <line x1="320" y1="130" x2="254" y2="300" {...faint} />
            </g>
          </g>
          <g transform="translate(0 680)">
            <line x1="50" y1="130" x2="50" y2="262" {...faint} />
            <line x1="132" y1="130" x2="292" y2="130" {...faint} />
            <line x1="132" y1="262" x2="292" y2="262" {...faint} />
            <line x1="132" y1="262" x2="292" y2="130" {...mustard} />
            <circle cx="50" cy="56" r="26" fill="#E8B94A" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion();
  const words = ["Build.", "Deploy.", "Solve."];

  return (
    <section className="px-4 sm:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
      <h1
        lang="en"
        className="font-sans font-bold leading-[1.02] tracking-[-0.035em] text-[clamp(2.75rem,7.2vw,5.5rem)]"
        style={{ color: "var(--c-text)" }}
      >
        {words.map((w, i) => (
          <motion.span
            key={w}
            className="hero-word inline-block mr-[0.25em] last:mr-0"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, delay: i * 0.08, ease }}
          >
            {i === words.length - 1 ? <span className="mark">{w}</span> : w}
          </motion.span>
        ))}
      </h1>

      <div className="grid grid-cols-1 gap-8 mt-8 md:mt-12 lg:grid-cols-[5fr_7fr] lg:gap-12 lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.25, ease }}
        >
          <p className="text-[1.1rem] sm:text-[1.2rem] leading-[1.55] max-w-[30ch]" style={{ color: "var(--c-muted)" }}>
            Gue bikin aplikasi web buat bisnis nyata, sekaligus ngurus jaringan dan server Linux-nya.
            Dari requirement sampai deploy.
          </p>
          <div className="flex gap-3 flex-wrap mt-8">
            <Link href="/#contact" className="btn-primary btn-tactile">
              Hubungi gue
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-cv"))}
              className="btn-ghost btn-tactile"
            >
              Unduh CV
            </button>
          </div>
        </motion.div>

        <HeroPanel />
      </div>
    </section>
  );
}
