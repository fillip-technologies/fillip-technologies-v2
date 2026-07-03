import Link from "next/link";
import { listIndustries } from "@/server/content/industry-registry";
import IndustriesManager from "./IndustriesManager";

export const metadata = { title: "Industries — CMS" };
export const dynamic = "force-dynamic";

export default async function IndustriesListPage() {
  const industries = await listIndustries();

  return (
    <section className="max-w-3xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Industries
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Industry pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Create, edit and publish <code>/industries/&lt;slug&gt;</code> pages. New pages start as
        drafts — edit their sections, preview privately, then publish to go live.
      </p>

      <IndustriesManager initial={industries} />
    </section>
  );
}
