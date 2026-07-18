"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, type LucideIcon } from "lucide-react";
import { QUOTE_INDUSTRIES } from "@/data/quote/industries";
import { industryIcon } from "./industryIcons";

const BASE = "/contact";

// Tertiary navigation for the "Custom" tab — one pill per industry, plus an
// Overview link. Highlights the active industry from the current path.
export default function IndustryNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav className="flex gap-2 overflow-x-auto py-3">
          <Tab href={BASE} active={pathname === BASE} icon={LayoutGrid} label="Overview" />
          {QUOTE_INDUSTRIES.map((ind) => {
            const href = `${BASE}/${ind.slug}`;
            return (
              <Tab
                key={ind.slug}
                href={href}
                active={pathname === href}
                icon={industryIcon(ind.icon)}
                label={ind.name}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Tab({
  href,
  active,
  icon: Icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-white text-body hover:border-primary/40 hover:text-heading"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
