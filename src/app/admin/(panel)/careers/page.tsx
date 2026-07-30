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
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-heading">Career Applications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Job applications and resumes submitted through your careers page.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-sm font-semibold text-white shadow-md shadow-primary/20">
          {leads.length} total
        </span>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground shadow-sm">
          No applications yet. Submissions to the careers form will appear here.
        </p>
      ) : (
        <CareersTable leads={leads} />
      )}
    </section>
  );
}
