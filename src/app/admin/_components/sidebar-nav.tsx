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
              "text-meta-sm tracking-widest py-2.5 border-b border-[#d8d8d2] dark:border-[#2a2a2a] transition-colors",
              isActive ? "text-[#1a1a1a] dark:text-[#e8ff47]" : "text-[#6b6b66] dark:text-[#999999] hover:text-[#1a1a1a] dark:hover:text-[#e8ff47]"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
