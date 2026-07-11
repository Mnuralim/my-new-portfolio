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
  cardBg: "bg-white dark:bg-[#161616]",
  cardBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  headerBg: "bg-[#f2f2ee] dark:bg-[#111111]",
  headerText: "text-[#6b6b66] dark:text-[#999999]",
  headerBorder: "border-b-2 border-[#1a1a1a] dark:border-[#2a2a2a]",
  rowBg: "bg-transparent",
  rowBgAlt: "bg-[#f2f2ee]/50 dark:bg-[#111111]/50",
  rowHover: "hover:bg-[#f2f2ee] dark:hover:bg-[#111111]",
  rowBorder: "border-b border-[#d8d8d2] dark:border-[#2a2a2a]",
  cellText: "text-[#111111] dark:text-[#f0f0f0]",
  mobileCardBg: "bg-white dark:bg-[#161616]",
  mobileCardBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  mobileTitleText: "text-[#111111] dark:text-[#f0f0f0]",
  mobileMetaLabel: "text-[#6b6b66] dark:text-[#999999]",
  mobileMetaValue: "text-[#111111] dark:text-[#f0f0f0]",
  mobileFooterBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  emptyText: "text-[#6b6b66] dark:text-[#999999]",
  emptyIcon: "text-[#d8d8d2] dark:text-[#2a2a2a]",

  wrapperBg: "bg-white dark:bg-[#161616]",
  wrapperBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  infoText: "text-[#6b6b66] dark:text-[#999999]",
  infoTextBold: "text-[#111111] dark:text-[#f0f0f0]",
  divider: "bg-[#d8d8d2] dark:bg-[#2a2a2a]",
  pageActive: "bg-accent text-black border-accent",
  pageInactive:
    "border-[#d8d8d2] dark:border-[#2a2a2a] bg-transparent text-[#6b6b66] dark:text-[#999999] hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] active:scale-[0.96]",
  ellipsis: "text-[#6b6b66] dark:text-[#999999]",
  navBtn:
    "border-[#d8d8d2] dark:border-[#2a2a2a] bg-transparent text-[#6b6b66] dark:text-[#999999] hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] active:scale-[0.97]",
  navBtnDisabled:
    "opacity-40 cursor-not-allowed border-[#d8d8d2] dark:border-[#2a2a2a] bg-transparent text-[#6b6b66] dark:text-[#999999]",
  ippBtn:
    "border-[#d8d8d2] dark:border-[#2a2a2a] bg-transparent text-[#6b6b66] dark:text-[#999999] hover:border-accent hover:text-[#1a1a1a] dark:hover:text-[#e8ff47]",
  ippChevron: "text-[#6b6b66] dark:text-[#999999]",
  dropdown: "bg-white dark:bg-[#161616] border-[#d8d8d2] dark:border-[#2a2a2a]",
  dropdownItem: "text-[#6b6b66] dark:text-[#999999] hover:bg-[#f2f2ee] dark:hover:bg-[#111111]",
  dropdownItemActive: "font-semibold text-[#1a1a1a] dark:text-[#e8ff47] bg-[#f2f2ee] dark:bg-[#111111]",
  dropdownDot: "bg-accent",

  filterInputBg: "bg-[#fafaf8] dark:bg-[#0a0a0a]",
  filterInputBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  filterInputText: "text-[#111111] dark:text-[#f0f0f0]",
  filterInputPlaceholder: "placeholder:text-[#75756c] dark:placeholder:text-[#444444]",
  filterInputIcon: "text-[#6b6b66] dark:text-[#999999]",
  filterSortBg: "bg-[#fafaf8] dark:bg-[#0a0a0a]",
  filterSortBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  filterSortText: "text-[#6b6b66] dark:text-[#999999]",
  filterSortDivider: "bg-[#d8d8d2] dark:bg-[#2a2a2a]",
  filterDivider: "bg-[#d8d8d2] dark:bg-[#2a2a2a]",
  filterActionPrimary: "bg-accent",
  filterActionPrimaryText: "text-black",
  filterActionOutlineBorder: "border-[#d8d8d2] dark:border-[#2a2a2a]",
  filterActionOutlineText: "text-[#6b6b66] dark:text-[#999999]",

  pageSubtitle: "text-[#6b6b66] dark:text-[#999999]",
  pageTitle: "text-[#111111] dark:text-[#f0f0f0]",
  pageAddBtn: "bg-accent hover:bg-transparent border-2 border-accent active:scale-[0.98]",
  pageAddBtnText: "text-black hover:text-[#1a1a1a] dark:hover:text-[#e8ff47] font-bold",

  overlaySpinner: "text-[#1a1a1a] dark:text-[#e8ff47]",
  overlayTitle: "text-[#111111] dark:text-[#f0f0f0]",
  overlaySubtitle: "text-[#6b6b66] dark:text-[#999999]",
};
