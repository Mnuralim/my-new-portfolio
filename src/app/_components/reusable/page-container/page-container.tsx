import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { theme as t } from "../theme";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  canWrite?: boolean;
  addData?: {
    label: string;
    href: string;
  };
}

export const PageContainer = ({
  children,
  subtitle,
  title,
  canWrite = false,
  addData,
}: PageContainerProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
        <div className="min-w-0">
          {subtitle && (
            <p
              className={cn(
                "text-meta-2xs font-bold tracking-[3px] uppercase mb-1",
                t.pageSubtitle
              )}
            >
              {subtitle}
            </p>
          )}
          {title && (
            <h1
              className={cn(
                "font-display text-[1.4rem] font-bold tracking-tight leading-none",
                t.pageTitle
              )}
            >
              {title}
            </h1>
          )}
        </div>

        {canWrite && (
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <Link
              href={addData?.href || "#"}
              className={cn(
                "flex items-center gap-1.5 transition-all active:scale-[0.98] border-2",
                "text-meta-xs tracking-widest px-3 py-2 whitespace-nowrap",
                t.pageAddBtn,
                t.pageAddBtnText
              )}
            >
              <Plus size={14} strokeWidth={2} className="shrink-0" />
              <span>{addData?.label || "Tambah Data"}</span>
            </Link>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
