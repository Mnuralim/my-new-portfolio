"use client";

import { useState } from "react";
import type { CvFile } from "@/lib/data";
import Modal from "./modal";
import ModalButton from "./modal-button";
import ModalFooter from "./modal-footer";

interface CvModalProps {
  cvs: CvFile[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ cvs, isOpen, onClose }: CvModalProps) {
  const [active, setActive] = useState(0);
  const cv = cvs[active] ?? cvs[0];
  const CV_PATH = cv?.fileUrl ?? "";
  const CV_UPDATED = cv
    ? new Date(cv.updatedAt).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
    : "-";

  const footer = (
    <ModalFooter
      info={
        <>
          Last updated: <span style={{ color: "var(--color-accent)" }}>{CV_UPDATED}</span>
        </>
      }
    >
      <ModalButton onClick={onClose}>TUTUP</ModalButton>
      {cv && (
        <ModalButton variant="primary">
          <a
            href={CV_PATH}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-inherit"
          >
            DOWNLOAD PDF ↓
          </a>
        </ModalButton>
      )}
    </ModalFooter>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="MUHAMAD NUR ALIM"
      eyebrow="// CURRICULUM VITAE"
      size="lg"
      footer={footer}
    >
      {cvs.length > 1 && (
        <div
          role="tablist"
          aria-label="Pilih versi CV"
          className="flex gap-2 flex-wrap px-6 py-4"
          style={{ borderBottom: "1px solid var(--c-cardborder)" }}
        >
          {cvs.map((c, i) => (
            <button
              key={c.fileUrl}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className="font-mono text-meta-xs tracking-widest px-4 py-2 rounded-full cursor-pointer transition-colors"
              style={
                i === active
                  ? {
                      background: "var(--color-accent)",
                      color: "#0b0b0c",
                      border: "1px solid var(--color-accent)",
                    }
                  : {
                      color: "var(--c-muted2)",
                      border: "1px solid var(--c-border)",
                      background: "transparent",
                    }
              }
            >
              {c.title.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {!cv ? (
        <p className="p-6 text-meta-md" style={{ color: "var(--c-muted)" }}>
          CV belum tersedia.
        </p>
      ) : (
        <>
          <p className="sr-only">
            Preview PDF ada di bawah. Kalau gak bisa terlihat, pakai tombol Download PDF di footer
            modal ini.
          </p>
          {/* PDF embed via iframe */}
          <div
            className="w-full"
            style={{
              height: "70vh",
              background: "var(--c-cardbg)",
              borderBottom: "1px solid var(--c-cardborder)",
            }}
          >
            <iframe
              src={`${CV_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full"
              key={CV_PATH}
              title={`CV Muhamad Nur Alim — ${cv.title}`}
            >
              <p style={{ padding: "20px", color: "var(--c-muted)" }}>
                Browser lo gak support preview PDF.{" "}
                <a href={CV_PATH} download style={{ color: "var(--color-accent)" }}>
                  Download langsung
                </a>
                .
              </p>
            </iframe>
          </div>
        </>
      )}
    </Modal>
  );
}
