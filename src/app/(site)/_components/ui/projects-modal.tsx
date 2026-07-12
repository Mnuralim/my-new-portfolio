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
    <div className="flex overflow-x-auto">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          style={{ borderRight: "2px solid #2a2a2a" }}
          className={`
            font-mono text-meta-2xs tracking-widest
            px-5 py-3 cursor-pointer whitespace-nowrap
            border-none transition-all duration-200
            ${
              activeFilter === f
                ? "bg-accent text-black"
                : "bg-transparent text-[#999999] hover:text-[#ffff00] hover:bg-[#161616]"
            }
          `}
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
          MENAMPILKAN <span className="text-[#ffff00]">{filtered.length}</span>{" "}
          DARI <span className="text-[#ffff00]">{allProjects.length}</span> PROYEK
        </>
      }
    >
      <ModalButton onClick={onClose}>TUTUP</ModalButton>
    </ModalFooter>
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
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-[#999999] text-meta-sm tracking-widest">
            TIDAK ADA PROYEK DI KATEGORI INI
          </div>
        ) : (
          filtered.map((project, i) => (
            <a
              key={project.num}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className={`
                block p-6 no-underline relative
                transition-colors duration-200 hover:bg-[#161616]
                group cursor-pointer
                ${i % 2 === 0 ? "sm:border-r-2 border-[#2a2a2a]" : ""}
                border-b-2 border-[#2a2a2a]
                last:border-b-0
                [&:nth-last-child(2):nth-child(odd)]:border-b-0
              `}
            >
              <div
                className="font-display font-extrabold text-[2.2rem] leading-none mb-3"
                style={{ WebkitTextStroke: "1px #333", color: "transparent" }}
              >
                {project.num}
              </div>

              <span
                className={`${tagClass(
                  project.tagColor
                )} mb-2 block w-fit text-meta-2xs`}
              >
                {project.tag}
              </span>

              <h3 className="font-display font-bold text-meta-lg leading-[1.25] tracking-tight mb-2 text-[#ffff00] group-hover:text-white transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-meta-xs text-[#999999] leading-[1.8] mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-meta-2xs px-1.5 py-0.5 bg-[#0a0a0a] border border-[#2a2a2a] text-[#444444] tracking-[1px]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <span className="absolute top-4 right-4 text-[#999999] text-base group-hover:text-[#ffff00] transition-colors duration-200">
                ↗
              </span>
            </a>
          ))
        )}
      </div>
    </Modal>
  );
}
