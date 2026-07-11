export interface SortOption {
  value: string;
  label: string;
  hidden?: boolean;
}

export interface CustomButton {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "primary" | "outline" | "danger" | "success";
  className?: string;
  hidden?: boolean;
}

export interface FilterControlProps {
  basePath: string;
  sortOptions: SortOption[];
  searchPlaceholder?: string;
  currentSortOrder?: string;
  defaultSortBy?: string;
  showSearch?: boolean;
  hideSortControls?: boolean;
  addButton?: {
    label?: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "primary" | "outline";
    className?: string;
  };
  customButtons?: CustomButton[];
}
