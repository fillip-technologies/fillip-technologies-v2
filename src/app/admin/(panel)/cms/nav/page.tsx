import Link from "next/link";
import { getNavMenu } from "@/server/nav/queries";
import { NAV_MENUS } from "@/server/nav/menus";
import NavMenuEditor from "./AboutMenuEditor";

export const metadata = { title: "Navigation — CMS" };

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
        <NavMenuEditor menuId="industries" initial={industries} />
      </div>
    </section>
  );
}
