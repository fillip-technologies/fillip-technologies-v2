import Link from "next/link";
import { Home, Menu, FileText } from "lucide-react";

export const metadata = { title: "CMS — Admin" };

// CMS hub. Each card is a content area; add more as the CMS grows.
const CMS_AREAS = [
  {
    href: "/admin/cms/home",
    label: "Home Page",
    description: "Edit the hero, headings and sections on the public home page.",
    icon: Home,
  },
  {
    href: "/admin/cms/nav",
    label: "Navigation",
    description: "Manage the top-nav “About” dropdown — add, edit or reorder pages with their URLs.",
    icon: Menu,
  },
  {
    href: "/admin/cms/pages",
    label: "About Pages",
    description: "Edit the content of the Our Story, Portfolio and Our Culture pages.",
    icon: FileText,
  },
];

export default function CmsHubPage() {
  return (
    <section>
      <h1 className="mb-1 text-lg font-semibold text-heading">Content</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage the content shown on the public website.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CMS_AREAS.map(({ href, label, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <Icon size={20} className="mb-3 text-primary" aria-hidden="true" />
            <h2 className="font-medium text-heading group-hover:text-primary">{label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
