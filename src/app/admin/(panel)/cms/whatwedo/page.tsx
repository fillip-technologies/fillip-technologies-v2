import Link from "next/link";
import { listCategories } from "@/server/content/whatwedo-registry";
import WhatWeDoManager from "./WhatWeDoManager";

export const metadata = { title: "What We Do — CMS" };
export const dynamic = "force-dynamic";

export default async function WhatWeDoListPage() {
  const categories = await listCategories("whatwedo");

  return (
    <section className="max-w-3xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / What We Do
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">What We Do — category pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit and publish the <code>/what-we-do/&lt;slug&gt;</code> category pages. Open one to edit its
        sections, images and menu links, preview privately, then publish or unpublish to control
        whether it appears in the “What We Do” menu.
      </p>

      <WhatWeDoManager initial={categories} />
    </section>
  );
}
