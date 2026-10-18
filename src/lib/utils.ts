import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// custom text-meta-* sizes would otherwise be merged away as text colors (and vice versa)
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["meta-2xs", "meta-xs", "meta-sm", "meta-md", "meta-lg"] } },
});

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)([?#]|$)/i.test(url);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
