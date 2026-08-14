"use client";

import Modal from "./modal";
import ModalButton from "./modal-button";
import ModalFooter from "./modal-footer";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_PATH = "/cv.pdf";
const CV_UPDATED = "Maret 2026";

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  const footer = (
    <ModalFooter
      info={
        <>
          Last updated:{" "}
          <span style={{ color: "var(--color-accent)" }}>{CV_UPDATED}</span>
        </>
      }
    >
      <ModalButton onClick={onClose}>TUTUP</ModalButton>
      <ModalButton variant="primary">
        <a href={CV_PATH} download className="no-underline text-inherit">
          DOWNLOAD PDF ↓
        </a>
      </ModalButton>
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
      <p className="sr-only">
        Preview PDF ada di bawah. Kalau gak bisa terlihat, pakai tombol
        Download PDF di footer modal ini.
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
          title="CV Muhamad Nur Alim"
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
    </Modal>
  );
}
