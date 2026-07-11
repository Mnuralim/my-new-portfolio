export type ColumnAlign = "left" | "center" | "right";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  align?: ColumnAlign;
  hidden?: boolean;
  hideHeaderOnCard?: boolean;
  cardTitle?: boolean;
  cardMeta?: boolean;
  cardFooter?: boolean;
  cell: (item: T) => React.ReactNode;
}

export interface EmptyStateProps {
  icon?: string;
  iconClassName?: string;
  message?: string;
  messageClassName?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  striped?: boolean;
  emptyState?: React.ReactNode;
  emptyStateProps?: EmptyStateProps;
  className?: string;
  tableClassName?: string;
}
