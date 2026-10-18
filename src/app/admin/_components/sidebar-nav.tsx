"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/skills", label: "SKILLS" },
  { href: "/admin/experiences", label: "EXPERIENCES" },
  { href: "/admin/projects", label: "PROJECTS" },
  { href: "/admin/services", label: "SERVICES" },
  { href: "/admin/credentials", label: "CREDENTIALS" },
  { href: "/admin/cv", label: "CV" },
  { href: "/admin/contact-links", label: "CONTACT LINKS" },
  { href: "/admin/blog-posts", label: "BLOG POSTS" },
  { href: "/admin/playlists", label: "PLAYLISTS" },
  { href: "/admin/profile", label: "PROFILE" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 md:flex-col md:gap-1 md:overflow-visible">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-meta-sm tracking-widest transition-colors whitespace-nowrap shrink-0",
              "px-3 py-1.5 rounded-full border md:px-0 md:py-2.5 md:rounded-none md:border-0 md:border-b",
              isActive ? "border-accent md:border-line" : "border-line",
              isActive ? "text-accent" : "text-muted hover:text-accent"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
