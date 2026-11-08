"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../../../../types";
import Modal from "./modal";
import Chip from "./chip";
import { CoverMedia, linkTarget } from "../sections/project-section-client";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProjects: (Project & { filter: string })[];
}

// value = what's stored in the DB `filter` column, label = what's shown
const FILTERS = [
  { value: "SEMUA", label: "Semua" },
  { value: "WEB DEV", label: "Web dev" },
  { value: "IT SUPPORT", label: "IT support" },
  { value: "BLOCKCHAIN", label: "Blockchain" },
];

function ProjectCard({ project }: { project: Project }) {
  const { href } = project;
  const body = (
    <>
      <div
        className="aspect-[16/10] overflow-hidden rounded-[16px] mb-4 grid place-items-center"
        style={{ background: "var(--c-divider)" }}
      >
        {project.coverImage ? (
          <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
            <CoverMedia src={project.coverImage} alt="" />
          </div>
        ) : (
          <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted)" }}>
            {project.tag}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-[1.15rem] leading-[1.3] tracking-[-0.01em]" style={{ color: "var(--c-text)" }}>
        {project.title}
        {href && !href.startsWith("/") && <span className="sr-only"> (buka di tab baru)</span>}
      </h3>
      <p className="mt-1.5 leading-[1.6] line-clamp-3" style={{ color: "var(--c-muted)" }}>
        {project.description}
      </p>
      <div className="mt-3 font-mono text-meta-sm" style={{ color: "var(--c-muted3)" }}>
        {project.stack.join(", ")}
      </div>
      <div className="mt-3">
        {href ? (
          <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "var(--c-text)" }}>
            View project
            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : (
          <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
            Private / internal
          </span>
        )}
      </div>
    </>
  );

  return href ? (
    <a href={href} {...linkTarget(href)} className="group flex flex-col no-underline">
      {body}
    </a>
  ) : (
    <div className="group flex flex-col">{body}</div>
  );
}

export default function ProjectsModal({ isOpen, onClose, allProjects }: ProjectsModalProps) {
  const [activeFilter, setActiveFilter] = useState("SEMUA");

  const filtered =
    activeFilter === "SEMUA" ? allProjects : allProjects.filter((p) => p.filter === activeFilter);

  const filterBar = (
    <div className="flex items-center justify-between gap-4 px-6 sm:px-8 pb-5">
      <div className="flex gap-2 overflow-x-auto -mx-1 px-1 [scrollbar-width:none]">
        {FILTERS.map((f) => (
          <Chip key={f.value} active={activeFilter === f.value} onClick={() => setActiveFilter(f.value)}>
            {f.label}
          </Chip>
        ))}
      </div>
      <span aria-live="polite" className="hidden sm:block text-[0.9rem] whitespace-nowrap" style={{ color: "var(--c-muted)" }}>
        {filtered.length} dari {allProjects.length} proyek
      </span>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="All projects" size="xl" subheader={filterBar}>
      <div className="px-6 sm:px-8 pt-2 pb-8">
        {filtered.length === 0 ? (
          <p className="py-16 text-center" style={{ color: "var(--c-muted)" }}>
            Belum ada proyek di kategori ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
