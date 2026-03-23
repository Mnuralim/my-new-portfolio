"use client";
import { projects } from "@/lib/data";
import type { Project } from "../../../../types";
import { useState } from "react";
import ProjectsModal from "../ui/projects-modal";

function tagClass(color?: Project["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  return "tag-accent";
}

export default function ProjectsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section id="projects" className="px-10 pb-20">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="section-label flex-1">03 / PROJECTS</div>
          <button
            onClick={() => setModalOpen(true)}
            className="
              text-[0.65rem] tracking-widest text-muted
              border-b border-border pb-0.5 mb-12 ml-4
              bg-transparent font-mono cursor-pointer
              transition-colors hover:text-accent hover:border-accent
            "
          >
            VIEW ALL PROJECTS →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {featured && (
            <div
              data-cursor-hover
              className="md:col-span-2 border-2 border-accent bg-card p-8 relative overflow-hidden -mb-px"
            >
              <div className="font-display font-extrabold text-[4rem] leading-none mb-4 text-accent opacity-15">
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
              <p className="text-[0.75rem] text-muted leading-[1.8] mb-6">
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
                className="absolute top-6 right-6 w-9 h-9 border-2 border-border flex items-center justify-center text-muted text-base no-underline transition-all duration-200 hover:border-accent hover:text-accent"
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
              className="border-2 border-border -mt-px -ml-px p-8 relative overflow-hidden group transition-colors duration-200 hover:border-accent"
            >
              <div
                className="font-display font-extrabold text-[4rem] leading-none mb-4"
                style={{
                  WebkitTextStroke: "1px #2a2a2a",
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
              <p className="text-[0.75rem] text-muted leading-[1.8] mb-6">
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
                className="absolute top-6 right-6 w-9 h-9 border-2 border-border flex items-center justify-center text-muted text-base no-underline transition-all duration-200 hover:border-accent hover:text-accent"
                aria-label={`View ${project.title}`}
              >
                ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      <ProjectsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
