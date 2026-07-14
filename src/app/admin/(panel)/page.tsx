import { redirect } from "next/navigation";
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

  const leads = await listLeads();

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="text-lg font-semibold text-heading">Leads</h1>
        <span className="text-sm text-muted-foreground">{leads.length} total</span>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-md border border-border bg-card p-6 text-center text-muted-foreground">
          No leads yet. Submissions to the contact form will appear here.
        </p>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </section>
  );
}
