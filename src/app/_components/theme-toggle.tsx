"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_EVENT = "themechange";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getSnapshot(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): "light" | "dark" | null {
  return null;
}

interface Props {
  scrolled?: boolean;
}

export default function ThemeToggle({ scrolled = false }: Props) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  if (!theme) {
    return (
      <div
        className="w-9 h-9 border-2 border-black dark:border-[#2a2a2a] flex-shrink-0"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      className={`
        w-9 h-9 flex-shrink-0 flex items-center justify-center
        bg-transparent
        cursor-pointer transition-all duration-200
        ${
          scrolled
            ? "text-[#f0f0f0] border-2 border-[#2a2a2a] hover:border-accent hover:bg-transparent hover:text-[#ffff00]"
            : "text-black border-2 border-black hover:border-[#00FFFF] hover:bg-[#00FFFF] hover:text-black"
        }
        dark:text-[#f0f0f0] dark:border-[#2a2a2a] dark:hover:border-accent dark:hover:bg-transparent dark:hover:text-[#ffff00]
      `}
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
}
