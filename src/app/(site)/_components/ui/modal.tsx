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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto p-4 sm:p-6"
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
        className={`w-full ${sizeMap[size]} flex flex-col max-h-[90vh] outline-none rounded-[16px] overflow-hidden animate-fadeUp`}
        style={{
          background: "var(--c-cardbg2)",
          border: "1px solid var(--c-cardborder)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="flex justify-between items-center px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--c-cardborder)" }}
        >
          <div className="flex flex-col gap-0.5">
            {eyebrow && (
              <span
                className="text-meta-2xs tracking-[3px]"
                style={{ color: "var(--color-accent)" }}
              >
                {eyebrow}
              </span>
            )}
            <h2
              className="font-sans font-bold text-base tracking-tight leading-none"
              style={{ color: "var(--c-text)" }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-mono bg-transparent cursor-pointer transition-opacity hover:opacity-70"
            style={{ border: "1px solid var(--c-border)", color: "var(--c-muted2)" }}
          >
            ✕
          </button>
        </div>

        {subheader && (
          <div className="flex-shrink-0" style={{ borderBottom: "1px solid var(--c-cardborder)" }}>
            {subheader}
          </div>
        )}

        <div className="overflow-y-auto flex-1">{children}</div>

        {footer && (
          <div
            className="px-6 py-3.5 flex-shrink-0"
            style={{ borderTop: "1px solid var(--c-cardborder)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
