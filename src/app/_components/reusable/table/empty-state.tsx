import { cn } from "@/lib/utils";
import type { EmptyStateProps } from "./types";

export const DefaultEmptyState = ({
  icon = "//",
  iconClassName,
  message = "Belum ada data.",
  messageClassName,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2 font-mono">
      <span className={cn("text-2xl tracking-widest", iconClassName)}>
        {icon}
      </span>
      <p className={cn("text-meta-sm tracking-widest", messageClassName)}>
        {message}
      </p>
    </div>
  );
};
