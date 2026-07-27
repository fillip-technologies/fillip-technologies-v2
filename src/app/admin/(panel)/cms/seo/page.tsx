import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { getSeoPageRecords, isIndexable } from "@/lib/seo/registry";
import type { SeoPageKind, SeoPageRecord } from "@/lib/seo/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Site SEO — Admin" };

const KIND_ORDER: SeoPageKind[] = ["home", "static", "service", "category", "industry", "landing", "blog"];
const KIND_LABEL: Record<SeoPageKind, string> = {
  home: "Home",
  static: "Static pages",
  service: "Service pages",
  category: "What We Do",
  industry: "Industries",
  landing: "Landing pages",
  blog: "Blog",
};

export default async function SeoListPage() {
  if (!(await getSession())) redirect("/admin/login");

  const records = await getSeoPageRecords();
  const groups = new Map<SeoPageKind, SeoPageRecord[]>();
  for (const record of records) {
    const list = groups.get(record.kind) ?? [];
    list.push(record);
    groups.set(record.kind, list);
  }

  const orderedKinds = [
    ...KIND_ORDER.filter((k) => groups.has(k)),
    ...[...groups.keys()].filter((k) => !KIND_ORDER.includes(k)),
  ];

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">Content</Link> / Site SEO
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Site SEO</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Edit meta, Open Graph, Twitter, canonical, robots and schema signals for any page. Only
        published + indexable pages appear in the sitemap.
      </p>

      <div className="space-y-8">
        {orderedKinds.map((kind) => {
          const list = (groups.get(kind) ?? []).slice().sort((a, b) => a.path.localeCompare(b.path));
          return (
            <div key={kind}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {KIND_LABEL[kind] ?? kind} <span className="text-muted-foreground/70">({list.length})</span>
              </h2>
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {list.map((record) => (
                      <tr key={record.path} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-2.5">
                          <p className="font-medium text-heading">{record.title}</p>
                          <p className="text-xs text-muted-foreground">{record.path}</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2.5">
                          <StatusChip record={record} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-right">
                          <Link
                            href={`/admin/cms/seo/edit?path=${encodeURIComponent(record.path)}`}
                            className="rounded-md border border-border px-3 py-1.5 text-sm text-body hover:border-primary hover:text-primary"
                          >
                            Edit SEO
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatusChip({ record }: { record: SeoPageRecord }) {
  const inSitemap = isIndexable(record);
  const noindex = record.robots?.index === false;
  const label = record.status;
  const color =
    record.status === "published"
      ? "bg-green-500/15 text-green-600"
      : record.status === "archived"
        ? "bg-rose-500/15 text-rose-600"
        : "bg-amber-500/15 text-amber-600";
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${color}`}>{label}</span>
      {noindex ? <span className="rounded-full bg-slate-500/15 px-2 py-0.5 text-xs text-slate-500">noindex</span> : null}
      {inSitemap ? (
        <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-xs text-sky-600">in sitemap</span>
      ) : null}
    </span>
  );
}
