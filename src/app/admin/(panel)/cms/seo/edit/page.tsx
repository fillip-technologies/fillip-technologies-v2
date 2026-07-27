import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { getBaseSeoRecordForPath } from "@/lib/seo/registry";
import { getSeoOverride } from "@/server/content/seo-overrides";
import { normalizePageSeoInput, recordToInput } from "@/lib/seo/page-seo";
import { absoluteUrl, normalizePath } from "@/lib/seo/urls";
import SeoEditor from "../SeoEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit SEO — Admin" };

export default async function EditPageSeo({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  if (!(await getSession())) redirect("/admin/login");

  const { path: rawPath } = await searchParams;
  if (!rawPath) notFound();
  const path = normalizePath(rawPath);

  const base = await getBaseSeoRecordForPath(path);
  if (!base) notFound();

  const fallback = recordToInput(base);
  const stored = await getSeoOverride(path);
  // When nothing is saved yet, seed only the always-present fields (status, slug,
  // robots) from the fallback; text fields stay blank so they inherit the default.
  const initial =
    stored ??
    normalizePageSeoInput({
      slug: fallback.slug,
      status: fallback.status,
      seo: { robots: fallback.seo.robots },
    });

  return (
    <section className="max-w-3xl">
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">Content</Link>{" / "}
        <Link href="/admin/cms/seo" className="hover:text-heading">Site SEO</Link>{" / "}
        <span className="text-heading">{path}</span>
      </nav>
      <h1 className="text-lg font-semibold text-heading">SEO for {path}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {base.kind} page. Blank fields use the built-in default (shown as placeholder).{" "}
        <a href={path} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          View page ↗
        </a>
      </p>

      <SeoEditor path={path} initial={initial} fallback={fallback} computedCanonical={absoluteUrl(path)} />
    </section>
  );
}
