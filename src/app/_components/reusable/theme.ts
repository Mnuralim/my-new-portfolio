export interface ThemeTokens {
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  headerText: string;
  headerBorder: string;
  rowBg: string;
  rowBgAlt: string;
  rowHover: string;
  rowBorder: string;
  cellText: string;
  mobileCardBg: string;
  mobileCardBorder: string;
  mobileTitleText: string;
  mobileMetaLabel: string;
  mobileMetaValue: string;
  mobileFooterBorder: string;
  emptyText: string;
  emptyIcon: string;

  wrapperBg: string;
  wrapperBorder: string;
  infoText: string;
  infoTextBold: string;
  divider: string;
  pageActive: string;
  pageInactive: string;
  ellipsis: string;
  navBtn: string;
  navBtnDisabled: string;
  ippBtn: string;
  ippChevron: string;
  dropdown: string;
  dropdownItem: string;
  dropdownItemActive: string;
  dropdownDot: string;

  filterInputBg: string;
  filterInputBorder: string;
  filterInputText: string;
  filterInputPlaceholder: string;
  filterInputIcon: string;
  filterSortBg: string;
  filterSortBorder: string;
  filterSortText: string;
  filterSortDivider: string;
  filterDivider: string;
  filterActionPrimary: string;
  filterActionPrimaryText: string;
  filterActionOutlineBorder: string;
  filterActionOutlineText: string;

  pageSubtitle: string;
  pageTitle: string;
  pageAddBtn: string;
  pageAddBtnText: string;

  overlaySpinner: string;
  overlayTitle: string;
  overlaySubtitle: string;
}

export const theme: ThemeTokens = {
  cardBg: "bg-card",
  cardBorder: "border-line",
  headerBg: "bg-base",
  headerText: "text-muted",
  headerBorder: "border-b border-line",
  rowBg: "bg-transparent",
  rowBgAlt: "bg-soft/40",
  rowHover: "hover:bg-soft",
  rowBorder: "border-b border-line",
  cellText: "text-fg",
  mobileCardBg: "bg-card",
  mobileCardBorder: "border-line",
  mobileTitleText: "text-fg",
  mobileMetaLabel: "text-muted",
  mobileMetaValue: "text-fg",
  mobileFooterBorder: "border-line",
  emptyText: "text-muted",
  emptyIcon: "text-line",

  wrapperBg: "bg-card",
  wrapperBorder: "border-line",
  infoText: "text-muted",
  infoTextBold: "text-fg",
  divider: "bg-line",
  pageActive: "bg-accent text-[#0b0b0c] border-accent",
  pageInactive:
    "border-line bg-transparent text-muted hover:border-accent hover:text-accent active:scale-[0.96]",
  ellipsis: "text-muted",
  navBtn:
    "border-line bg-transparent text-muted hover:border-accent hover:text-accent active:scale-[0.97]",
  navBtnDisabled: "opacity-40 cursor-not-allowed border-line bg-transparent text-muted",
  ippBtn: "border-line bg-transparent text-muted hover:border-accent hover:text-accent",
  ippChevron: "text-muted",
  dropdown: "bg-card border-line",
  dropdownItem: "text-muted hover:bg-soft",
  dropdownItemActive: "font-semibold text-accent bg-soft",
  dropdownDot: "bg-accent",

  filterInputBg: "bg-base",
  filterInputBorder: "border-line",
  filterInputText: "text-fg",
  filterInputPlaceholder: "placeholder:text-faint",
  filterInputIcon: "text-muted",
  filterSortBg: "bg-base",
  filterSortBorder: "border-line",
  filterSortText: "text-muted",
  filterSortDivider: "bg-line",
  filterDivider: "bg-line",
  filterActionPrimary: "bg-accent",
  filterActionPrimaryText: "text-[#0b0b0c]",
  filterActionOutlineBorder: "border-line",
  filterActionOutlineText: "text-muted",

  pageSubtitle: "text-muted",
  pageTitle: "text-fg",
  pageAddBtn: "bg-accent border-accent text-[#0b0b0c] hover:opacity-90",
  pageAddBtnText: "font-semibold",

  overlaySpinner: "text-accent",
  overlayTitle: "text-fg",
  overlaySubtitle: "text-muted",
};
