"use client";
import type { Project } from "../../../../../types";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section id="projects" className="px-4 sm:px-8 pt-10 pb-16 sm:pb-20">
        <div className="flex justify-between items-baseline flex-wrap gap-4 mb-12">
          <h2 className="section-label !mb-0">01 / Projects</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="text-meta-sm font-medium bg-transparent border-none cursor-pointer p-0"
            style={{ color: "var(--c-text)" }}
          >
            View all projects →
          </button>
        </div>

        {featured && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card-hoverable rounded-[14px] p-8 sm:p-11 mb-6"
            style={{
              border: "1px solid var(--c-cardborder)",
              background: "linear-gradient(180deg, var(--c-grad1), var(--c-grad2))",
            }}
          >
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="font-mono text-meta-sm px-2.5 py-1 rounded-[6px]"
                style={{ color: "var(--color-accent)", background: "rgba(244,228,0,0.1)" }}
              >
                FEATURED
              </span>
              <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
                {featured.num}
              </span>
            </div>
            <h3
              className="font-sans font-bold text-[1.6rem] mb-3.5"
              style={{ color: "var(--c-text)" }}
            >
              {featured.title}
            </h3>
            <p
              className="text-base leading-[1.6] max-w-[680px] mb-6"
              style={{ color: "var(--c-muted)" }}
            >
              {featured.description}
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2.5 flex-wrap">
                {featured.stack.map((s) => (
                  <span key={s} className={tagClass(featured.tagColor)}>
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={featured.href}
                className="w-10 h-10 rounded-full flex items-center justify-center text-base no-underline transition-opacity hover:opacity-70"
                style={{ border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                aria-label={`View ${featured.title}`}
              >
                ↗
              </a>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.num}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="card-hoverable rounded-[14px] p-8 sm:p-9"
              style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)" }}
            >
              <div className="flex items-center gap-3.5 mb-4.5 mb-[18px]">
                <span
                  className="font-mono text-meta-sm px-2.5 py-1 rounded-[6px]"
                  style={{ color: "var(--c-muted2)", border: "1px solid var(--c-border)" }}
                >
                  {project.tag}
                </span>
                <span className="font-mono text-meta-sm" style={{ color: "var(--c-muted2)" }}>
                  {project.num}
                </span>
              </div>
              <h3
                className="font-sans font-bold text-[1.35rem] mb-3"
                style={{ color: "var(--c-text)" }}
              >
                {project.title}
              </h3>
              <p
                className="text-meta-lg leading-[1.6] mb-[22px]"
                style={{ color: "var(--c-muted)" }}
              >
                {project.description}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  {project.stack.map((s) => (
                    <span key={s} className={tagClass(project.tagColor)}>
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={project.href}
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-meta-lg no-underline flex-shrink-0 transition-opacity hover:opacity-70"
                  style={{ border: "1px solid var(--c-border)", color: "var(--c-text)" }}
                  aria-label={`View ${project.title}`}
                >
                  ↗
                </a>
              </div>
            </motion.div>
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
