"use client";

import { useState } from "react";
import type { CvFile } from "@/lib/data";
import Modal from "./modal";
import ModalFooter from "./modal-footer";
import Chip from "./chip";
import { Download } from "lucide-react";

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
          Diperbarui {CV_UPDATED}
        </>
      }
    >
      {cv && (
        <a href={CV_PATH} download target="_blank" rel="noopener noreferrer" className="btn-primary btn-tactile !h-11">
          <Download size={17} aria-hidden="true" />
          Download PDF
        </a>
      )}
    </ModalFooter>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curriculum vitae"
      eyebrow="Muhamad Nur Fatahil Alim"
      size="lg"
      footer={footer}
    >
      {cvs.length > 1 && (
        <div role="tablist" aria-label="Pilih versi CV" className="flex gap-2 flex-wrap px-6 sm:px-8 pb-5">
          {cvs.map((c, i) => (
            <Chip key={c.fileUrl} role="tab" active={i === active} onClick={() => setActive(i)}>
              {c.title}
            </Chip>
          ))}
        </div>
      )}

      {!cv ? (
        <p className="px-6 sm:px-8 pb-8" style={{ color: "var(--c-muted)" }}>
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
            className="mx-6 sm:mx-8 mb-6 rounded-[16px] overflow-hidden"
            style={{ height: "68vh", background: "var(--c-divider)" }}
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
