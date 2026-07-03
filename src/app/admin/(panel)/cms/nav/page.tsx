import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNavMenu } from "@/server/nav/queries";
import { NAV_MENUS } from "@/server/nav/menus";
import NavMenuEditor from "./AboutMenuEditor";

export const metadata = { title: "Navigation — CMS" };
export const dynamic = "force-dynamic";

export default async function NavCmsPage() {
  const [about, industries] = await Promise.all([getNavMenu("about"), getNavMenu("industries")]);

  return (
    <section className="max-w-2xl space-y-12">
      <div>
        <nav className="mb-2 text-sm text-muted-foreground">
          <Link href="/admin/cms" className="hover:text-heading">
            Content
          </Link>{" "}
          / Navigation
        </nav>
        <h1 className="mb-1 text-lg font-semibold text-heading">Top-nav dropdowns</h1>
        <p className="text-sm text-muted-foreground">
          Add, edit, reorder or remove the links in each dropdown — each with a label and a URL
          (e.g. <code>/our-story</code> or a full external link).
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-base font-semibold text-heading">{NAV_MENUS.about.label} menu</h2>
        <NavMenuEditor menuId="about" initial={about} />
      </div>

      <div>
        <h2 className="mb-3 text-base font-semibold text-heading">{NAV_MENUS.industries.label} menu</h2>
        <div className="rounded-lg border border-border bg-card/40 p-5">
          <p className="text-sm text-body">
            The Industries dropdown is generated automatically from your{" "}
            <strong className="text-heading">published</strong> industry pages. Publish, unpublish or
            reorder pages to change these links — labels and order come from each page.
          </p>
          {industries.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {industries.map((i) => (
                <li
                  key={i.href}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {i.label}
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            href="/admin/cms/industries"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Manage industry pages <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
