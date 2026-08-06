import Link from "next/link";
import { listLocationPages } from "@/server/location-pages/registry";
import { listServicePages } from "@/server/content/servicepage-registry";
import LocationsManager from "./LocationsManager";

export const metadata = { title: "Location Pages — CMS" };
export const dynamic = "force-dynamic";

export default async function LocationsListPage() {
  const [locations, services] = await Promise.all([listLocationPages(), listServicePages()]);

  return (
    <section className="max-w-4xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Locations
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Location pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Create and manage &ldquo;&lt;service&gt; in &lt;city&gt;&rdquo; landing pages. Each page
        pairs one service with one city — pick the service, enter the city, and the page is
        created (and live) immediately with editable placeholder content.
      </p>

      <LocationsManager
        initial={locations}
        services={services.map((s) => ({ slug: s.slug, title: s.title }))}
      />
    </section>
  );
}
