import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";
import { listServicePages } from "@/server/content/servicepage-registry";
import { listCategories } from "@/server/content/whatwedo-registry";
import { SERVICE_TEMPLATES, isSolutionTemplate } from "@/server/content/servicepage-templates";
import ServicePagesManager from "../services/ServicePagesManager";

export const metadata = { title: "Solutions — CMS" };
export const dynamic = "force-dynamic";

// Solution pages that use a bespoke, hand-built layout instead of the generic
// service-page renderer. Their content lives under CMS group `page.<slug>.*`
// and MUST be edited via the dedicated page editor — editing them in the generic
// section editor writes keys the live page never reads (nothing would show).
const BESPOKE_SOLUTION_PAGES = [
  {
    title: "Security Surveillance",
    editHref: "/admin/cms/pages/security-surveillance",
    publicHref: "/hardware-solutions/security-surveillance",
  },
  {
    title: "WhatsApp Business",
    editHref: "/admin/cms/pages/whatsapp-business",
    publicHref: "/solutions/whatsapp-business",
  },
  {
    title: "Ticket Booking",
    editHref: "/admin/cms/pages/ticket-booking",
    publicHref: "/solutions/ticket-booking",
  },
  {
    title: "SMS Communication",
    editHref: "/admin/cms/pages/sms-communication",
    publicHref: "/solutions/sms-communication",
  },
];

export default async function SolutionPagesCmsPage() {
  const [allPages, categories] = await Promise.all([
    listServicePages(),
    listCategories("solutions"),
  ]);
  // Only the Solutions-menu pages (hardware + business solution templates).
  const pages = allPages.filter((p) => isSolutionTemplate(p.template));
  const templates = SERVICE_TEMPLATES.filter((t) => isSolutionTemplate(t.id));

  return (
    <section>
      <nav className="mb-2 text-sm text-muted-foreground">
        <Link href="/admin/cms" className="hover:text-heading">
          Content
        </Link>{" "}
        / Solutions
      </nav>
      <h1 className="mb-1 text-lg font-semibold text-heading">Solutions — solution pages</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        The detail pages behind the “Solutions” menu (e.g. <code>/hardware-solutions/networking</code>,{" "}
        <code>/solutions/ticket-booking</code>). Create a page under a solution category, edit its
        sections, then publish — its link is added to that category’s menu automatically.
      </p>

      <ServicePagesManager
        initial={pages}
        categories={categories.map((c) => ({ slug: c.slug, label: c.label }))}
        templates={templates.map((t) => ({ id: t.id, label: t.label, urlPrefix: t.urlPrefix }))}
      />

      {/* Custom-layout solution pages — hand-built designs edited via their own
          page editor, listed here so everything under the Solutions menu is
          reachable from one place. */}
      <div className="mt-10">
        <h2 className="mb-1 text-sm font-semibold text-heading">Custom-layout solution pages</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          These use a bespoke design and are edited in their own page editor (their content lives
          under <code>page.&lt;slug&gt;</code>). Use “Edit” below — editing them in the generic
          section editor above won’t affect the live page.
        </p>
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
          {BESPOKE_SOLUTION_PAGES.map((p) => (
            <li
              key={p.editHref}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            >
              <Link href={p.editHref} className="min-w-0 flex-1 group">
                <p className="flex items-center gap-2 font-medium text-heading group-hover:text-primary">
                  {p.title}
                  <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-medium text-orange-600">
                    Custom layout
                  </span>
                </p>
                <p className="truncate text-sm text-muted-foreground">{p.publicHref}</p>
              </Link>

              <div className="flex items-center gap-1">
                <a
                  href={p.publicHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View live page"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-heading"
                >
                  <ExternalLink size={16} />
                </a>
                <Link
                  href={p.editHref}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-body transition-colors hover:bg-card"
                >
                  <Pencil size={14} /> Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
