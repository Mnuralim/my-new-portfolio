"use client";

import { Search, SortAsc, SortDesc, X, Plus } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { CustomButton, FilterControlProps } from "./types";
import { theme as t } from "../theme";

export const FilterControl = ({
  basePath,
  sortOptions,
  searchPlaceholder = "Cari...",
  currentSortOrder = "desc",
  defaultSortBy = "createdAt",
  showSearch = true,
  hideSortControls = false,
  addButton,
  customButtons = [],
}: FilterControlProps) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const p = new URLSearchParams(searchParams);
      if (e.target.value) {
        p.set("search", e.target.value);
      } else {
        p.delete("search");
      }
      p.delete("skip");
      replace(`${basePath}?${p.toString()}`, { scroll: false });
    },
    500
  );

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = new URLSearchParams(searchParams);
    p.set("sortBy", e.target.value);
    replace(`${basePath}?${p.toString()}`, { scroll: false });
  };

  const handleSortOrder = () => {
    const p = new URLSearchParams(searchParams);
    p.set("sortOrder", currentSortOrder === "asc" ? "desc" : "asc");
    replace(`${basePath}?${p.toString()}`, { scroll: false });
  };

  const handleClearSearch = () => {
    const p = new URLSearchParams(searchParams);
    p.delete("search");
    replace(`${basePath}?${p.toString()}`, { scroll: false });
  };

  const visibleSortOptions = sortOptions.filter((o) => !o.hidden);
  const visibleCustomButtons = customButtons.filter((b) => !b.hidden);
  const hasActions = visibleCustomButtons.length > 0 || !!addButton;

  const actionBtnBase =
    "h-[34px] flex-shrink-0 flex items-center gap-1.5 px-3 text-meta-xs tracking-widest font-bold transition-all active:scale-[0.98] border-2";

  const renderActionButton = (btn: CustomButton, extraCls = "") => (
    <button
      key={btn.label}
      onClick={btn.onClick}
      className={
        btn.className ||
        cn(
          actionBtnBase,
          extraCls,
          btn.variant === "danger"
            ? "bg-accent2 border-accent2 text-black"
            : btn.variant === "success"
            ? "bg-green-500 border-green-500 text-black"
            : btn.variant === "outline"
            ? cn(
                "bg-transparent",
                t.filterActionOutlineBorder,
                t.filterActionOutlineText
              )
            : cn(t.filterActionPrimary, t.filterActionPrimaryText, "border-accent")
        )
      }
    >
      {btn.icon}
      <span>{btn.label}</span>
    </button>
  );

  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {showSearch && (
          <div className="flex-1 min-w-0 relative">
            <input
              type="text"
              onChange={handleSearch}
              defaultValue={searchParams.get("search") || ""}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full h-[34px] text-meta-md font-mono pl-8 pr-8 border-2 outline-none transition-all",
                t.filterInputBg,
                t.filterInputBorder,
                t.filterInputText,
                t.filterInputPlaceholder,
                "focus:border-accent"
              )}
            />
            <Search
              className={cn(
                "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none",
                t.filterInputIcon
              )}
            />
            {searchParams.get("search") && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className={cn("w-3 h-3", t.filterInputIcon)} />
              </button>
            )}
          </div>
        )}

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {!hideSortControls && visibleSortOptions.length > 0 && (
            <div
              className={cn(
                "flex items-center border-2 overflow-hidden flex-shrink-0 h-[34px]",
                t.filterSortBg,
                t.filterSortBorder
              )}
            >
              <select
                onChange={handleSortBy}
                value={searchParams.get("sortBy") || defaultSortBy}
                className={cn(
                  "appearance-none bg-transparent pl-2.5 pr-1 text-meta-sm font-mono focus:outline-none cursor-pointer h-full",
                  t.filterSortText
                )}
              >
                {visibleSortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <div className={cn("w-px h-3.5 mx-1", t.filterSortDivider)} />
              <button
                onClick={handleSortOrder}
                className="h-full px-2 flex items-center transition-colors text-[#999999] hover:text-[#ffff00]"
                title={
                  currentSortOrder === "asc" ? "Urutan naik" : "Urutan turun"
                }
              >
                {currentSortOrder === "asc" ? (
                  <SortAsc className="w-3.5 h-3.5" />
                ) : (
                  <SortDesc className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}

          {hasActions && (
            <>
              <div className={cn("w-px h-5 flex-shrink-0", t.filterDivider)} />
              {visibleCustomButtons.map((btn) => renderActionButton(btn))}
              {addButton && (
                <button
                  onClick={addButton.onClick}
                  className={
                    addButton.className ||
                    cn(
                      actionBtnBase,
                      addButton.variant === "outline"
                        ? cn(
                            "bg-transparent",
                            t.filterActionOutlineBorder,
                            t.filterActionOutlineText
                          )
                        : cn(
                            t.filterActionPrimary,
                            t.filterActionPrimaryText,
                            "border-accent"
                          )
                    )
                  }
                >
                  {addButton.icon || <Plus className="w-3.5 h-3.5" />}
                  <span>{addButton.label || "Tambah"}</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
