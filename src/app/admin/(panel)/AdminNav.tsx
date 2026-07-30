"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, FileText, Mail, Briefcase, Trash2 } from "lucide-react";

// Admin sidebar navigation. Add new admin features here as they're built.
// `exact` highlights only on an exact path match (use for index routes like /admin).
const NAV_ITEMS = [
  { href: "/admin", label: "Leads", icon: Users, exact: true },
  { href: "/admin/careers", label: "Careers", icon: Briefcase, exact: false },
  { href: "/admin/bin", label: "Bin", icon: Trash2, exact: false },
  { href: "/admin/mail", label: "Mail", icon: Mail, exact: false },
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
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
              active
                ? "bg-gradient-to-r from-primary to-accent font-semibold text-white shadow-lg shadow-primary/30"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon
              size={18}
              aria-hidden="true"
              className={active ? "text-white" : "text-white/60 group-hover:text-white"}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
