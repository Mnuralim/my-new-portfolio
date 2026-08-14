"use client";

import { useSyncExternalStore } from "react";

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

export default function ThemeToggle() {
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
        className="w-11 h-6 rounded-full flex-shrink-0"
        style={{ border: "1px solid var(--c-border)", background: "var(--c-cardbg)" }}
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      className="relative w-11 h-6 rounded-full flex-shrink-0 cursor-pointer p-0"
      style={{ border: "1px solid var(--c-border)", background: "var(--c-cardbg)" }}
    >
      <span
        className="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-accent transition-[left] duration-200"
        style={{ left: theme === "dark" ? "2px" : "22px" }}
      />
    </button>
  );
}
