import Link from "next/link";
import { getAboutMenu } from "@/server/nav/queries";
import AboutMenuEditor from "./AboutMenuEditor";

export const metadata = { title: "Navigation — CMS" };

export default async function NavCmsPage() {
  const items = await getAboutMenu();

  return (
    <section className="max-w-2xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Navigation
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">About menu</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage the links in the top-nav “About” dropdown. Add, edit, reorder or
        remove pages — each with a label and a URL (e.g. <code>/our-story</code>
        {" "}or a full external link).
      </p>

      <AboutMenuEditor initial={items} />
    </section>
  );
}
