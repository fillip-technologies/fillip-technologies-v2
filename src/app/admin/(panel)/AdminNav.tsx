"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, FileText } from "lucide-react";

// Admin sidebar navigation. Add new admin features here as they're built.
// `exact` highlights only on an exact path match (use for index routes like /admin).
const NAV_ITEMS = [
  { href: "/admin", label: "Leads", icon: Users, exact: true },
  { href: "/admin/cms", label: "Content", icon: FileText, exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-primary/10 font-medium text-primary"
                : "text-body hover:bg-card hover:text-heading"
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
