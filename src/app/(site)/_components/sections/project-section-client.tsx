"use client";
import type { Project } from "../../../../../types";
import { useState } from "react";
import ProjectsModal from "../ui/projects-modal";

interface Props {
  projects: Project[];
  allProjects: (Project & { filter: string })[];
}

function tagClass(color?: Project["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export function ProjectsSectionClient({ projects, allProjects }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section id="projects" className="px-3 pb-20">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="section-label flex-1">01 / PROJECTS</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="
              text-meta-xs tracking-widest text-[#6b6b66] dark:text-[#999999]
              border-b border-[#d8d8d2] dark:border-[#2a2a2a] pb-0.5 mb-12 ml-4
              bg-transparent font-mono cursor-pointer
              transition-colors hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] hover:border-accent
            "
          >
            VIEW ALL PROJECTS →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {featured && (
            <div
              data-cursor-hover
              className="md:col-span-2 border-2 border-accent bg-white dark:bg-[#161616] p-8 relative overflow-hidden -mb-px"
            >
              <div className="font-display font-extrabold text-[4rem] leading-none mb-4 text-[#1a1a1a] dark:text-[#e8ff47] opacity-15">
                {featured.num}
              </div>
              <span
                className={`${tagClass(featured.tagColor)} mb-4 block w-fit`}
              >
                {featured.tag}
              </span>
              <h3 className="font-display font-extrabold text-[1.3rem] tracking-tight leading-[1.2] mb-3">
                {featured.title}
              </h3>
              <p className="text-meta-md text-[#6b6b66] dark:text-[#999999] leading-[1.8] mb-6">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {featured.stack.map((s) => (
                  <span key={s} className="stack-pill">
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={featured.href}
                className="absolute top-6 right-6 w-11 h-11 border-2 border-[#1a1a1a] dark:border-[#2a2a2a] flex items-center justify-center text-[#6b6b66] dark:text-[#999999] text-base no-underline transition-all duration-200 hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47]"
                aria-label={`View ${featured.title}`}
              >
                ↗
              </a>
            </div>
          )}

          {rest.map((project) => (
            <div
              key={project.num}
              data-cursor-hover
              className="border-2 border-[#1a1a1a] dark:border-[#2a2a2a] -mt-px -ml-px p-8 relative overflow-hidden group transition-colors duration-200 hover:border-accent"
            >
              <div
                className="font-display font-extrabold text-[4rem] leading-none mb-4"
                style={{
                  WebkitTextStroke: "1px var(--stroke-color)",
                  color: "transparent",
                }}
              >
                {project.num}
              </div>
              <span
                className={`${tagClass(project.tagColor)} mb-4 block w-fit`}
              >
                {project.tag}
              </span>
              <h3 className="font-display font-extrabold text-[1.3rem] tracking-tight leading-[1.2] mb-3">
                {project.title}
              </h3>
              <p className="text-meta-md text-[#6b6b66] dark:text-[#999999] leading-[1.8] mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="stack-pill">
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={project.href}
                className="absolute top-6 right-6 w-11 h-11 border-2 border-[#1a1a1a] dark:border-[#2a2a2a] flex items-center justify-center text-[#6b6b66] dark:text-[#999999] text-base no-underline transition-all duration-200 hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47]"
                aria-label={`View ${project.title}`}
              >
                ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      <ProjectsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        allProjects={allProjects}
      />
    </>
  );
}
