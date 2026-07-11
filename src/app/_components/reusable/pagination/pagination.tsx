"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { theme as t } from "../theme";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  className?: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (ipp: number) => void;
  labels?: {
    itemsLabel?: string;
    showingText?: string;
    displayingText?: string;
    ofText?: string;
    prevText?: string;
    nextText?: string;
  };
}

function calcDropdownStyle(rect: DOMRect, minWidth = 80): React.CSSProperties {
  const DROPDOWN_H = 200;
  const spaceBelow = window.innerHeight - rect.bottom;
  const w = Math.max(rect.width, minWidth);
  if (spaceBelow >= DROPDOWN_H) {
    return {
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      minWidth: w,
      maxHeight: DROPDOWN_H,
    };
  }
  return {
    position: "fixed",
    top: rect.top - DROPDOWN_H - 4,
    left: rect.left,
    minWidth: w,
    maxHeight: DROPDOWN_H,
  };
}

interface PortalDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  dropdownStyle: React.CSSProperties;
  dropdownCls: string;
  children: React.ReactNode;
}

function PortalDropdown({
  isOpen,
  onClose,
  dropdownStyle,
  dropdownCls,
  children,
}: PortalDropdownProps) {
  if (!isOpen || typeof document === "undefined") return null;
  return createPortal(
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div
        className={cn(
          "fixed z-[9999] shadow-lg py-1 overflow-y-auto border-2",
          dropdownCls
        )}
        style={dropdownStyle}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

interface IppControlProps {
  isOpen: boolean;
  dropdownStyle: React.CSSProperties;
  onOpen: (rect: DOMRect) => void;
  onClose: () => void;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onSelect: (opt: number) => void;
}

function IppControl({
  isOpen,
  dropdownStyle,
  onOpen,
  onClose,
  itemsPerPage,
  itemsPerPageOptions,
  onSelect,
}: IppControlProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    if (isOpen) onClose();
    else if (btnRef.current) onOpen(btnRef.current.getBoundingClientRect());
  };

  return (
    <div className="relative flex-shrink-0">
      <button
        ref={btnRef}
        onClick={handleClick}
        type="button"
        className={cn(
          "flex items-center gap-1.5 h-7 px-2 border-2 font-mono",
          "text-meta-xs tracking-widest transition-all",
          t.ippBtn
        )}
      >
        <span>{itemsPerPage}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform",
            t.ippChevron,
            isOpen && "rotate-180"
          )}
        />
      </button>

      <PortalDropdown
        isOpen={isOpen}
        onClose={onClose}
        dropdownStyle={dropdownStyle}
        dropdownCls={t.dropdown}
      >
        {itemsPerPageOptions.map((opt) => (
          <button
            key={opt}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(opt);
            }}
            className={cn(
              "w-full flex items-center justify-between px-3 py-1.5 text-meta-xs tracking-widest font-mono transition-colors",
              opt === itemsPerPage ? t.dropdownItemActive : t.dropdownItem
            )}
          >
            <span>{opt}</span>
            {opt === itemsPerPage && (
              <span className={cn("w-1.5 h-1.5 rounded-full", t.dropdownDot)} />
            )}
          </button>
        ))}
      </PortalDropdown>
    </div>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions = [10, 25, 50, 100],
  className = "",
  onPageChange,
  onItemsPerPageChange,
  labels = {},
}: PaginationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const L = {
    itemsLabel: "data",
    showingText: "Tampilkan",
    displayingText: "Menampilkan",
    ofText: "dari",
    prevText: "Sebelumnya",
    nextText: "Selanjutnya",
    ...labels,
  };

  const handleItemsPerPage = (opt: number) => {
    setIsOpen(false);
    onItemsPerPageChange?.(opt);
  };

  const handleOpen = (rect: DOMRect) => {
    setDropdownStyle(calcDropdownStyle(rect));
    setIsOpen(true);
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const result: (number | "...")[] = [1];
    if (currentPage > 4) result.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      result.push(i);
    if (currentPage < totalPages - 3) result.push("...");
    result.push(totalPages);
    return result;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  const ippProps = {
    isOpen,
    dropdownStyle,
    onOpen: handleOpen,
    onClose: () => setIsOpen(false),
    itemsPerPage,
    itemsPerPageOptions,
    onSelect: handleItemsPerPage,
  };

  return (
    <div className={cn("w-full font-mono", className)}>
      <div className="block sm:hidden">
        <div className={cn("border-2 p-3 space-y-3", t.wrapperBg, t.wrapperBorder)}>
          <div className="flex items-center justify-between">
            <span className={cn("text-meta-xs", t.infoText)}>
              {startItem}–{endItem} {L.ofText}{" "}
              <span className={cn("font-semibold", t.infoTextBold)}>
                {totalItems}
              </span>
            </span>
            <div className="flex items-center gap-2">
              <span className={cn("text-meta-xs", t.infoText)}>
                {L.showingText}
              </span>
              <IppControl {...ippProps} />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "h-7 px-3 text-meta-xs tracking-widest font-medium border-2 transition-all flex items-center gap-1",
                currentPage === 1 ? t.navBtnDisabled : t.navBtn
              )}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{L.prevText}</span>
            </button>
            <div className="flex items-center gap-1 overflow-x-auto">
              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`d${i}`} className={cn("px-1 text-meta-xs", t.ellipsis)}>
                    ···
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => onPageChange(p as number)}
                    className={cn(
                      "min-w-[28px] h-7 px-2 text-meta-xs font-medium border-2 transition-all",
                      p === currentPage ? t.pageActive : t.pageInactive
                    )}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "h-7 px-3 text-meta-xs tracking-widest font-medium border-2 transition-all flex items-center gap-1",
                currentPage === totalPages ? t.navBtnDisabled : t.navBtn
              )}
            >
              <span>{L.nextText}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={cn("text-meta-xs whitespace-nowrap", t.infoText)}>
            {L.displayingText}{" "}
            <span className={cn("font-semibold", t.infoTextBold)}>
              {startItem}–{endItem}
            </span>{" "}
            {L.ofText}{" "}
            <span className={cn("font-semibold", t.infoTextBold)}>
              {totalItems}
            </span>{" "}
            {L.itemsLabel}
          </span>
          <div className={cn("w-px h-4", t.divider)} />
          <div className="flex items-center gap-2">
            <span className={cn("text-meta-xs whitespace-nowrap", t.infoText)}>
              {L.showingText}
            </span>
            <IppControl {...ippProps} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "h-7 px-3 text-meta-xs tracking-widest font-medium border-2 transition-all flex items-center gap-1",
              currentPage === 1 ? t.navBtnDisabled : t.navBtn
            )}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{L.prevText}</span>
          </button>
          <div className="flex items-center gap-1 mx-1">
            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <span key={`d${i}`} className={cn("px-1.5 text-meta-xs", t.ellipsis)}>
                  ···
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p as number)}
                  className={cn(
                    "min-w-[28px] h-7 px-2 text-meta-xs font-medium border-2 transition-all",
                    p === currentPage ? t.pageActive : t.pageInactive
                  )}
                >
                  {p}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "h-7 px-3 text-meta-xs tracking-widest font-medium border-2 transition-all flex items-center gap-1",
              currentPage === totalPages ? t.navBtnDisabled : t.navBtn
            )}
          >
            <span className="hidden md:inline">{L.nextText}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
