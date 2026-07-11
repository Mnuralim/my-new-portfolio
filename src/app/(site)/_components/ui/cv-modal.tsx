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
          Last updated: <span className="text-accent">{CV_UPDATED}</span>
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
      {/* PDF embed via iframe */}
      <div
        className="w-full bg-[#1a1a1a] border-b-2 border-border"
        style={{ height: "70vh" }}
      >
        <iframe
          src={`${CV_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full"
          title="CV Muhamad Nur Alim"
        />
      </div>
    </Modal>
  );
}
