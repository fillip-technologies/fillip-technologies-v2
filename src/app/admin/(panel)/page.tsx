import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { listLeads } from "@/server/contact/queries";

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
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-card text-left text-muted-foreground">
                <Th>Received</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Company</Th>
                <Th>Budget</Th>
                <Th>Message</Th>
                <Th>Source</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/60 align-top">
                  <Td className="whitespace-nowrap text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString()}
                  </Td>
                  <Td>{lead.name}</Td>
                  <Td>
                    <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                      {lead.email}
                    </a>
                  </Td>
                  <Td className="whitespace-nowrap">
                    {lead.phone ? (
                      <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                        {lead.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </Td>
                  <Td>{lead.company ?? "—"}</Td>
                  <Td className="whitespace-nowrap">{lead.budget ?? "—"}</Td>
                  <Td className="max-w-md whitespace-pre-wrap">{lead.message}</Td>
                  <Td className="whitespace-nowrap text-muted-foreground">{lead.source ?? "—"}</Td>
                  <Td>
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs capitalize">
                      {lead.status}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-heading ${className}`}>{children}</td>;
}
