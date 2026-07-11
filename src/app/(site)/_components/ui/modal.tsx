"use client";

import { useEffect, useRef } from "react";

type ModalSize = "sm" | "md" | "lg" | "full";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  size?: ModalSize;
  footer?: React.ReactNode;
  children: React.ReactNode;
  subheader?: React.ReactNode;
}

const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-xl",
  lg: "max-w-3xl",
  full: "max-w-[95vw]",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  eyebrow,
  size = "md",
  footer,
  children,
  subheader,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-y-auto p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          w-full ${sizeMap[size]} bg-surface border-2 border-border
          flex flex-col max-h-[90vh] outline-none
          animate-fadeUp
        `}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b-2 border-border flex-shrink-0">
          <div className="flex flex-col gap-0.5">
            {eyebrow && (
              <span className="text-[0.55rem] tracking-[3px] text-accent">
                {eyebrow}
              </span>
            )}
            <h2 className="font-display font-extrabold text-base tracking-tight leading-none">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="
              w-9 h-9 border-2 border-border flex-shrink-0
              flex items-center justify-center
              text-muted text-sm font-mono
              bg-transparent cursor-pointer
              transition-all duration-200
              hover:border-accent hover:text-accent
            "
          >
            ✕
          </button>
        </div>

        {subheader && (
          <div className="border-b-2 border-border flex-shrink-0">
            {subheader}
          </div>
        )}

        <div className="overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div className="border-t-2 border-border px-6 py-3.5 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
