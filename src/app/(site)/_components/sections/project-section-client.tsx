"use client";
import type { Project } from "../../../../../types";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import ProjectsModal from "../ui/projects-modal";
import { isVideoUrl } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface Props {
  projects: Project[];
  allProjects: (Project & { filter: string })[];
}

// external links open in a new tab; site-relative ones (e.g. /blog/...) stay in this tab
export function linkTarget(href: string) {
  return href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

// image or looping muted video (mp4/webm); with reduced motion the video stays on its first frame
export function CoverMedia({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  if (isVideoUrl(src))
    return (
      <video
        key={String(reduce)}
        src={src}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        muted
        loop
        playsInline
        autoPlay={!reduce}
        preload="metadata"
        // deterrent only: hides "copy/save video" menus, but the URL is still visible in DevTools
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        disableRemotePlayback
        draggable={false}
        className="w-full h-full object-cover select-none"
      />
    );
  return (
    // eslint-disable-next-line @next/next/no-img-element -- ImageKit URLs aren't in next/image remotePatterns
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectLink({ href, title }: { href?: string | null; title: string }) {
  if (!href)
    return (
      <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
        Private / internal
      </span>
    );
  return (
    <a
      href={href}
      {...linkTarget(href)}
      className="group inline-flex items-center gap-1.5 font-semibold no-underline"
      style={{ color: "var(--c-text)" }}
      aria-label={`View ${title}`}
    >
      View project
      <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Cover({ src, alt, label, className }: { src?: string | null; alt: string; label?: string; className: string }) {
  return (
    <div className={`${className} overflow-hidden rounded-[24px] grid place-items-center`} style={{ background: "var(--c-divider)" }}>
      {!src && label && (
        <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted)" }}>
          {label}
        </span>
      )}
      {src && (
        <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
          <CoverMedia src={src} alt={alt} />
        </div>
      )}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <div className="font-mono text-meta-sm" style={{ color: "var(--c-muted)" }}>
      {items.join(", ")}
    </div>
  );
}

export function ProjectsSectionClient({ projects, allProjects }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const reduce = useReducedMotion();
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p !== featured);
  const reveal = (delay = 0) => ({
    // same initial on server and client (avoids hydration mismatch); reduced motion just skips the tween
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: reduce ? { duration: 0 } : { duration: 0.8, delay, ease },
  });

  return (
    <>
      <section id="projects" className="px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
          <h2 className="section-label !mb-0">Projects</h2>
          <button onClick={() => setModalOpen(true)} className="btn-ghost btn-tactile">
            View all projects
          </button>
        </div>

        {featured && (
          <motion.article {...reveal()} className="group grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-6 lg:gap-12 items-center">
            <Cover src={featured.coverImage} alt={featured.title} label={featured.tag} className="aspect-[4/3]" />
            <div>
              <h3 className="font-semibold text-[1.75rem] sm:text-[2rem] leading-[1.15] tracking-[-0.02em]" style={{ color: "var(--c-text)" }}>
                {featured.title}
              </h3>
              <p className="text-[1.05rem] leading-[1.6] max-w-[42ch] mt-3.5 mb-5" style={{ color: "var(--c-muted)" }}>
                {featured.description}
              </p>
              <Stack items={featured.stack} />
              <div className="mt-7">
                <ProjectLink href={featured.href} title={featured.title} />
              </div>
            </div>
          </motion.article>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 mt-14 lg:mt-[72px]">
            {rest.map((project, i) => (
              <motion.article key={project.title} {...reveal(i * 0.08)} className="group flex flex-col">
                <Cover src={project.coverImage} alt={project.title} label={project.tag} className="aspect-[16/10] mb-5" />
                <h3 className="font-semibold text-[1.35rem] tracking-[-0.01em]" style={{ color: "var(--c-text)" }}>
                  {project.title}
                </h3>
                <p className="leading-[1.6] max-w-[46ch] mt-1.5 mb-3" style={{ color: "var(--c-muted)" }}>
                  {project.description}
                </p>
                <Stack items={project.stack} />
                <div className="mt-4">
                  <ProjectLink href={project.href} title={project.title} />
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      <ProjectsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        allProjects={allProjects}
      />
    </>
  );
}
