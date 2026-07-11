import { cn } from "@/lib/utils";
import { theme as t } from "../theme";
import type { DataTableProps } from "./types";
import { DefaultEmptyState } from "./empty-state";

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  striped = false,
  emptyState,
  emptyStateProps,
  className,
  tableClassName,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      emptyState ?? (
        <DefaultEmptyState
          iconClassName={emptyStateProps?.iconClassName ?? t.emptyIcon}
          messageClassName={emptyStateProps?.messageClassName ?? t.emptyText}
          {...emptyStateProps}
        />
      )
    );
  }

  const visibleColumns = columns.filter((col) => !col.hidden);
  const titleCol = visibleColumns.find((c) => c.cardTitle);
  const metaCols = visibleColumns.filter((c) => c.cardMeta);
  const footerCols = visibleColumns.filter((c) => c.cardFooter);
  const defaultCols = visibleColumns.filter(
    (c) => !c.cardTitle && !c.cardMeta && !c.cardFooter && !c.hideHeaderOnCard
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-2 sm:hidden">
        {data.map((item) => (
          <div
            key={keyExtractor(item)}
            className={cn(
              "border-2 p-3 space-y-2.5",
              t.mobileCardBg,
              t.mobileCardBorder
            )}
          >
            {titleCol && (
              <div
                className={cn(
                  "text-meta-lg font-semibold leading-snug",
                  t.mobileTitleText
                )}
              >
                {titleCol.cell(item)}
              </div>
            )}

            {metaCols.length > 0 && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                {metaCols.map((col) => (
                  <div key={col.key}>
                    <span
                      className={cn(
                        "text-meta-2xs tracking-widest block mb-0.5",
                        t.mobileMetaLabel
                      )}
                    >
                      {col.header}
                    </span>
                    <div className={cn("text-meta-sm", t.mobileMetaValue)}>
                      {col.cell(item)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {defaultCols.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {defaultCols.map((col) => (
                  <div key={col.key} className="flex items-start gap-2">
                    <span
                      className={cn(
                        "text-meta-2xs tracking-widest font-medium w-[90px] shrink-0 pt-px leading-tight",
                        t.mobileMetaLabel
                      )}
                    >
                      {col.header}
                    </span>
                    <span className={cn("text-meta-sm flex-1", t.mobileMetaValue)}>
                      {col.cell(item)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {footerCols.length > 0 && (
              <div
                className={cn(
                  "flex items-center justify-between pt-2 border-t",
                  t.mobileFooterBorder
                )}
              >
                {footerCols.map((col) => (
                  <div key={col.key}>{col.cell(item)}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "hidden sm:block overflow-hidden border-2",
          t.cardBg,
          t.cardBorder
        )}
      >
        <div className="overflow-x-auto">
          <table
            className={cn("w-full min-w-[600px]", tableClassName)}
            style={{ tableLayout: "fixed", borderCollapse: "collapse" }}
          >
            <colgroup>
              {visibleColumns.map((col) => (
                <col key={col.key} style={{ width: col.width }} />
              ))}
            </colgroup>

            <thead>
              <tr className={cn(t.headerBg, t.headerBorder)}>
                {visibleColumns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-meta-xs tracking-widest font-bold",
                      t.headerText,
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={keyExtractor(item)}
                  className={cn(
                    "transition-colors",
                    striped && idx % 2 !== 0 ? t.rowBgAlt : t.rowBg,
                    t.rowHover,
                    t.rowBorder
                  )}
                >
                  {visibleColumns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-3 text-meta-md",
                        t.cellText,
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right"
                      )}
                    >
                      {col.cell(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
