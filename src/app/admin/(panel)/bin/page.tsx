import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import { listTrashedLeads } from "@/server/contact/queries";
import BinTable from "./BinTable";

export const metadata = { title: "Bin — Admin" };

// Always render fresh; never cache this page.
export const dynamic = "force-dynamic";

export default async function BinPage() {
  if (!(await getSession())) redirect("/admin/login");

  const leads = await listTrashedLeads();

  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h1 className="text-lg font-semibold text-heading">Bin</h1>
        <span className="text-sm text-muted-foreground">{leads.length} item(s)</span>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-md border border-border bg-card p-6 text-center text-muted-foreground">
          The Bin is empty. Deleted leads and applications appear here and can be restored.
        </p>
      ) : (
        <BinTable leads={leads} />
      )}
    </section>
  );
}
