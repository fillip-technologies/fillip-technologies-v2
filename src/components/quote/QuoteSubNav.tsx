"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Layers, Package } from "lucide-react";

const TABS = [
  { label: "Packages", href: "/get-a-quote", icon: Package },
  { label: "Custom", href: "/get-a-quote/custom", icon: Layers },
  { label: "Requirement", href: "/get-a-quote/requirement", icon: FileText },
];

// Secondary navigation for the Get-a-Quote section, shown directly under the
// main site nav. Highlights the active tab from the current path.
export default function QuoteSubNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/get-a-quote" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="sticky top-[80px] z-40 border-b border-[var(--border)] bg-white/85 backdrop-blur lg:top-[92px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav className="flex gap-1 overflow-x-auto">
          {TABS.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors ${
                  active ? "text-[var(--primary)]" : "text-[var(--body)] hover:text-[var(--heading)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {active ? (
                  <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[var(--primary)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
