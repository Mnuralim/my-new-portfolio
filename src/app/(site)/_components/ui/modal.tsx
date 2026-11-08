"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

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
  xl: "max-w-5xl",
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
    const FOCUSABLE_SELECTOR =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
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
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-6 backdrop-blur-sm"
      style={{ background: "var(--overlay-backdrop)" }}
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
        className={`w-full ${sizeMap[size]} flex flex-col max-h-[92vh] outline-none rounded-[24px] overflow-hidden animate-fade-up`}
        style={{
          background: "var(--overlay-card-bg)",
          border: "1px solid var(--overlay-card-border)",
          boxShadow: "var(--overlay-card-shadow)",
        }}
      >
        <div className="flex justify-between items-start gap-4 px-6 sm:px-8 pt-6 sm:pt-7 pb-4 flex-shrink-0">
          <div>
            <h2
              className="font-sans font-semibold text-[1.5rem] sm:text-[1.75rem] leading-[1.15] tracking-[-0.02em]"
              style={{ color: "var(--c-text)" }}
            >
              {title}
            </h2>
            {eyebrow && (
              <p className="mt-1 text-[0.95rem]" style={{ color: "var(--c-muted)" }}>
                {eyebrow}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-11 h-11 rounded-full flex-shrink-0 grid place-items-center bg-transparent cursor-pointer transition-colors hover:border-[var(--c-text)]"
            style={{ border: "1px solid var(--c-border)", color: "var(--c-text)" }}
          >
            <X size={18} />
          </button>
        </div>

        {subheader && <div className="flex-shrink-0">{subheader}</div>}

        <div className="overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div
            className="px-6 sm:px-8 py-4 flex-shrink-0"
            style={{ borderTop: "1px solid var(--c-border)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
