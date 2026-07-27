import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { listCareerLeads } from "@/server/contact/queries";
import CareersTable from "./CareersTable";

export const metadata = { title: "Careers — Admin" };

// Always render fresh (applications change); never cache this page.
export const dynamic = "force-dynamic";

export default async function CareersDashboardPage() {
  // Guard the data access itself — don't rely on the layout alone (it renders
  // in parallel and may not re-run on every navigation).
  if (!(await getSession())) redirect("/admin/login");

  const leads = await listCareerLeads();

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="text-lg font-semibold text-heading">Career Applications</h1>
        <span className="text-sm text-muted-foreground">{leads.length} total</span>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-md border border-border bg-card p-6 text-center text-muted-foreground">
          No applications yet. Submissions to the careers form will appear here.
        </p>
      ) : (
        <CareersTable leads={leads} />
      )}
    </section>
  );
}
