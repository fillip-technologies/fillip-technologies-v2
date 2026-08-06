import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationPage } from "@/server/location-pages/registry";
import { listServicePages } from "@/server/content/servicepage-registry";
import LocationPageEditor from "./LocationPageEditor";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug} — Location Page — CMS` };
}

export default async function LocationPageEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, services] = await Promise.all([getLocationPage(slug), listServicePages()]);
  if (!page) notFound();

  const serviceTitle = services.find((s) => s.slug === page.serviceKey)?.title ?? page.serviceKey;

  return (
    <section className="max-w-3xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        /{" "}
        <Link href="/admin/cms/locations" className="hover:text-heading">
          Locations
        </Link>{" "}
        / {serviceTitle} — {page.city.name}
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">
        {serviceTitle} in {page.city.name}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        /{page.slug} · {page.city.state}, {page.city.country} ·{" "}
        <span className={page.enabled ? "text-green-600" : "text-amber-600"}>
          {page.enabled ? "Live" : "Disabled"}
        </span>
      </p>

      <LocationPageEditor slug={page.slug} initial={page} />
    </section>
  );
}
