import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CLIENT_CATEGORIES } from "@/server/content/client-sections";

export const metadata = { title: "Trusted By Clients — CMS" };

export default function ClientCategoriesPage() {
  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Trusted By Clients
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Trusted By — client logos</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage the client logo wall by category. Each category matches a filter tab
        on the public wall — add, remove or reorder logos per section. Changes apply
        everywhere the wall appears (home page and every service page). The heading
        and stats are edited under Home Page → Our Clients.
      </p>

      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {CLIENT_CATEGORIES.map((category) => (
          <li key={category.id}>
            <Link
              href={`/admin/cms/clients/${category.id}`}
              className="block transition-colors hover:bg-card"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-heading">{category.label}</p>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
