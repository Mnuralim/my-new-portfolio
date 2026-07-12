"use client";

import { AlertTriangle } from "lucide-react";
import { Modal } from "./modal";

interface HiddenField {
  name: string;
  value: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  formAction: (formData: FormData) => void;
  hiddenFields?: HiddenField[];
}

export const ConfirmDeleteAlert = ({
  isOpen,
  onClose,
  title = "Hapus Item?",
  description = "Tindakan ini tidak dapat dibatalkan.",
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  isPending = false,
  formAction,
  hiddenFields = [],
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-3 text-center py-2">
        <div className="flex items-center justify-center w-12 h-12 border-2 border-accent2 bg-accent2/10">
          <AlertTriangle size={22} className="text-accent2" />
        </div>

        <div>
          <h3 className="text-meta-lg font-bold text-[#ffff00]">{title}</h3>
          <p className="text-meta-sm text-[#999999] mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex gap-2 mt-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 text-meta-sm tracking-widest border-2 border-[#2a2a2a] text-[#999999] hover:border-white hover:text-[#ffff00] transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <form action={formAction} className="flex-1">
            {hiddenFields.map((field) => (
              <input
                key={field.name}
                type="hidden"
                name={field.name}
                value={field.value}
              />
            ))}
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-4 py-2.5 text-meta-sm tracking-widest bg-accent2 border-2 border-accent2 text-black hover:bg-transparent hover:text-accent2 transition-colors disabled:opacity-50 font-medium"
            >
              {isPending ? "Menghapus..." : confirmLabel}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
