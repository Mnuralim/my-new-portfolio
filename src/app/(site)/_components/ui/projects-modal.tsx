"use client";

import { useState } from "react";
import type { Project } from "../../../../../types";
import ModalFooter from "./modal-footer";
import ModalButton from "./modal-button";
import Modal from "./modal";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProjects: (Project & { filter: string })[];
}

const FILTERS = ["SEMUA", "WEB DEV", "IT SUPPORT", "BLOCKCHAIN"];

function tagClass(color?: Project["tagColor"]) {
  if (color === "it") return "tag-it";
  if (color === "net") return "tag-net";
  if (color === "purple") return "tag-purple";
  return "tag-accent";
}

export default function ProjectsModal({
  isOpen,
  onClose,
  allProjects,
}: ProjectsModalProps) {
  const [activeFilter, setActiveFilter] = useState("SEMUA");

  const filtered =
    activeFilter === "SEMUA"
      ? allProjects
      : allProjects.filter((p) => p.filter === activeFilter);

  const filterTabs = (
    <div className="flex gap-2 overflow-x-auto px-6 py-4">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          aria-pressed={activeFilter === f}
          style={{
            color: activeFilter === f ? "#0b0b0c" : "var(--c-muted2)",
            background: activeFilter === f ? "var(--color-accent)" : "transparent",
            border: activeFilter === f ? "1px solid var(--color-accent)" : "1px solid var(--c-border)",
          }}
          className="font-mono text-meta-2xs tracking-widest px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition-all duration-200"
        >
          {f}
        </button>
      ))}
    </div>
  );

  const footer = (
    <ModalFooter
      info={
        <>
          MENAMPILKAN{" "}
          <span style={{ color: "var(--color-accent)" }}>{filtered.length}</span>{" "}
          DARI{" "}
          <span style={{ color: "var(--color-accent)" }}>{allProjects.length}</span>{" "}
          PROYEK
        </>
      }
    >
      <ModalButton onClick={onClose}>TUTUP</ModalButton>
    </ModalFooter>
  );

  const liveCount = (
    <p aria-live="polite" className="sr-only">
      Menampilkan {filtered.length} dari {allProjects.length} proyek.
    </p>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ALL PROJECTS"
      eyebrow="// 03 / PROJECTS"
      size="lg"
      subheader={filterTabs}
      footer={footer}
    >
      <div className="p-6">
        {liveCount}
        {filtered.length === 0 ? (
          <div
            className="py-16 text-center text-meta-sm tracking-widest"
            style={{ color: "var(--c-muted2)" }}
          >
            TIDAK ADA PROYEK DI KATEGORI INI
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((project) => (
              <a
                key={project.num}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hoverable block p-6 rounded-[12px] no-underline relative overflow-hidden"
                style={{ border: "1px solid var(--c-cardborder)", background: "var(--c-cardbg)" }}
              >
                <div
                  className="absolute -top-2 -right-1 font-sans font-extrabold text-[3.2rem] leading-none pointer-events-none select-none"
                  style={{ color: "var(--c-divider)" }}
                >
                  {project.num}
                </div>

                <div className="relative">
                  <span
                    className={`${tagClass(project.tagColor)} mb-3 block w-fit text-meta-2xs`}
                  >
                    {project.tag}
                  </span>

                  <h3
                    className="font-sans font-bold text-meta-lg leading-[1.25] tracking-tight mb-2 pr-8"
                    style={{ color: "var(--c-text)" }}
                  >
                    {project.title}
                    <span className="sr-only"> (buka di tab baru)</span>
                  </h3>

                  <p
                    className="text-meta-xs leading-[1.8] mb-4"
                    style={{ color: "var(--c-muted)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="text-meta-2xs px-2 py-0.5 rounded-full tracking-[1px]"
                        style={{ color: "var(--c-muted3)", border: "1px solid var(--c-border)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className="absolute top-5 right-5 text-base"
                  style={{ color: "var(--c-muted2)" }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
