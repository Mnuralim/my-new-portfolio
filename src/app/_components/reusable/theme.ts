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
  cardBg: "bg-black dark:bg-[#161616]",
  cardBorder: "border-black dark:border-[#2a2a2a]",
  headerBg: "bg-[#111111] dark:bg-[#111111]",
  headerText: "text-[#999999] dark:text-[#999999]",
  headerBorder: "border-b-2 border-[#2a2a2a] dark:border-[#2a2a2a]",
  rowBg: "bg-transparent",
  rowBgAlt: "bg-[#111111]/50 dark:bg-[#111111]/50",
  rowHover: "hover:bg-[#111111] dark:hover:bg-[#111111]",
  rowBorder: "border-b border-[#2a2a2a] dark:border-[#2a2a2a]",
  cellText: "text-[#f0f0f0] dark:text-[#f0f0f0]",
  mobileCardBg: "bg-black dark:bg-[#161616]",
  mobileCardBorder: "border-[#2a2a2a] dark:border-[#2a2a2a]",
  mobileTitleText: "text-[#f0f0f0] dark:text-[#f0f0f0]",
  mobileMetaLabel: "text-[#999999] dark:text-[#999999]",
  mobileMetaValue: "text-[#f0f0f0] dark:text-[#f0f0f0]",
  mobileFooterBorder: "border-[#2a2a2a] dark:border-[#2a2a2a]",
  emptyText: "text-[#999999] dark:text-[#999999]",
  emptyIcon: "text-[#2a2a2a] dark:text-[#2a2a2a]",

  wrapperBg: "bg-black dark:bg-[#161616]",
  wrapperBorder: "border-[#2a2a2a] dark:border-[#2a2a2a]",
  infoText: "text-[#999999] dark:text-[#999999]",
  infoTextBold: "text-[#f0f0f0] dark:text-[#f0f0f0]",
  divider: "bg-[#2a2a2a] dark:bg-[#2a2a2a]",
  pageActive: "bg-accent text-black border-accent",
  pageInactive:
    "border-[#2a2a2a] dark:border-[#2a2a2a] bg-transparent text-[#999999] dark:text-[#999999] hover:border-accent hover:text-[#ffff00] dark:hover:text-[#ffff00] active:scale-[0.96]",
  ellipsis: "text-[#999999] dark:text-[#999999]",
  navBtn:
    "border-[#2a2a2a] dark:border-[#2a2a2a] bg-transparent text-[#999999] dark:text-[#999999] hover:border-accent hover:text-[#ffff00] dark:hover:text-[#ffff00] active:scale-[0.97]",
  navBtnDisabled:
    "opacity-40 cursor-not-allowed border-[#2a2a2a] dark:border-[#2a2a2a] bg-transparent text-[#999999] dark:text-[#999999]",
  ippBtn:
    "border-[#2a2a2a] dark:border-[#2a2a2a] bg-transparent text-[#999999] dark:text-[#999999] hover:border-accent hover:text-[#ffff00] dark:hover:text-[#ffff00]",
  ippChevron: "text-[#999999] dark:text-[#999999]",
  dropdown: "bg-black dark:bg-[#161616] border-[#2a2a2a] dark:border-[#2a2a2a]",
  dropdownItem: "text-[#999999] dark:text-[#999999] hover:bg-[#111111] dark:hover:bg-[#111111]",
  dropdownItemActive: "font-semibold text-[#ffff00] dark:text-[#ffff00] bg-[#111111] dark:bg-[#111111]",
  dropdownDot: "bg-accent",

  filterInputBg: "bg-[#0a0a0a] dark:bg-[#0a0a0a]",
  filterInputBorder: "border-[#2a2a2a] dark:border-[#2a2a2a]",
  filterInputText: "text-[#f0f0f0] dark:text-[#f0f0f0]",
  filterInputPlaceholder: "placeholder:text-[#444444] dark:placeholder:text-[#444444]",
  filterInputIcon: "text-[#999999] dark:text-[#999999]",
  filterSortBg: "bg-[#0a0a0a] dark:bg-[#0a0a0a]",
  filterSortBorder: "border-[#2a2a2a] dark:border-[#2a2a2a]",
  filterSortText: "text-[#999999] dark:text-[#999999]",
  filterSortDivider: "bg-[#2a2a2a] dark:bg-[#2a2a2a]",
  filterDivider: "bg-[#2a2a2a] dark:bg-[#2a2a2a]",
  filterActionPrimary: "bg-accent",
  filterActionPrimaryText: "text-black",
  filterActionOutlineBorder: "border-[#2a2a2a] dark:border-[#2a2a2a]",
  filterActionOutlineText: "text-[#999999] dark:text-[#999999]",

  pageSubtitle: "text-black/70 dark:text-[#999999]",
  pageTitle: "text-black dark:text-[#f0f0f0]",
  pageAddBtn: "bg-black hover:bg-transparent border-2 border-black text-[#ffff00] hover:text-black dark:bg-accent dark:hover:bg-transparent dark:border-accent dark:text-black dark:hover:text-[#ffff00]",
  pageAddBtnText: "font-bold",

  overlaySpinner: "text-[#ffff00] dark:text-[#ffff00]",
  overlayTitle: "text-[#f0f0f0] dark:text-[#f0f0f0]",
  overlaySubtitle: "text-[#999999] dark:text-[#999999]",
};
