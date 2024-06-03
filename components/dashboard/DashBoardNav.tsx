"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardNav({
  allLinks,
}: {
  allLinks: { label: string; path: string; icon: React.ReactNode }[];
}) {
  const pathname = usePathname();
  return (
    <nav className="overflow-auto py-2">
      <ul className="flex gap-6 text-xs font-semibold">
        {allLinks.map((link, index) => (
          <Link
            key={index}
            className={cn(
              "relative flex flex-col items-center gap-1",
              pathname === link.path && "text-primary",
            )}
            href={link.path}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
