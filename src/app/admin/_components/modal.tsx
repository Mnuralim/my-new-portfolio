"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/70 backdrop-blur-sm">
      <div
        ref={modalContentRef}
        className="w-full max-w-md border-2 border-[#2a2a2a] bg-[#161616] mx-3 p-6 relative max-h-[90vh] overflow-y-auto font-mono"
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-1.5 border-2 border-[#2a2a2a] text-[#999999] hover:border-accent hover:text-[#ffff00] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};
