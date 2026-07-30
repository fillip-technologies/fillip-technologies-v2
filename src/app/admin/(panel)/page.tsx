import { redirect } from "next/navigation";
import { Users, Sparkles, PhoneCall, CheckCircle2 } from "lucide-react";
import { getSession } from "@/server/auth/session";
import { listLeads } from "@/server/contact/queries";
import LeadsTable from "./LeadsTable";

export const metadata = { title: "Leads — Admin" };

// Always render fresh (leads change); never cache this page.
export const dynamic = "force-dynamic";

export default async function LeadsDashboardPage() {
  // Guard the data access itself — don't rely on the layout alone (it renders
  // in parallel and may not re-run on every navigation).
  if (!(await getSession())) redirect("/admin/login");

  // Career applications have their own admin section (/admin/careers).
  const leads = await listLeads(100, { excludeCareers: true });

  const count = (s: string) => leads.filter((l) => l.status === s).length;
  const stats = [
    { label: "Total leads", value: leads.length, icon: Users, tint: "from-primary to-accent", ring: "ring-primary/20" },
    { label: "New", value: count("new"), icon: Sparkles, tint: "from-sky-500 to-cyan-400", ring: "ring-sky-500/20" },
    { label: "Contacted", value: count("contacted"), icon: PhoneCall, tint: "from-amber-500 to-orange-400", ring: "ring-amber-500/20" },
    { label: "Converted", value: count("converted"), icon: CheckCircle2, tint: "from-emerald-500 to-green-400", ring: "ring-emerald-500/20" },
  ];

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-heading">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enquiries and quote requests from across your website.
        </p>
      </div>

      {/* Colourful summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tint, ring }) => (
          <div
            key={label}
            className={`flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm ring-1 ${ring}`}
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tint} text-white shadow-md`}>
              <Icon size={20} strokeWidth={2} />
            </span>
            <div>
              <p className="text-2xl font-bold leading-none text-heading">{value}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {leads.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground shadow-sm">
          No leads yet. Submissions to the contact form will appear here.
        </p>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </section>
  );
}
