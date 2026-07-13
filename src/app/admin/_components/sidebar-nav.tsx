"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/skills", label: "SKILLS" },
  { href: "/admin/experiences", label: "EXPERIENCES" },
  { href: "/admin/projects", label: "PROJECTS" },
  { href: "/admin/services", label: "SERVICES" },
  { href: "/admin/contact-links", label: "CONTACT LINKS" },
  { href: "/admin/blog-posts", label: "BLOG POSTS" },
  { href: "/admin/playlists", label: "PLAYLISTS" },
  { href: "/admin/profile", label: "PROFILE" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-meta-sm tracking-widest py-2.5 border-b border-[#2a2a2a] transition-colors",
              isActive ? "text-[#ffff00]" : "text-[#999999] hover:text-[#ffff00]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
