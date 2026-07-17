import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import ComposeMail from "./ComposeMail";

export const metadata = { title: "Direct Mail — Admin" };

// Never cache: this is an authenticated action surface.
export const dynamic = "force-dynamic";

export default async function DirectMailPage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string }>;
}) {
  if (!(await getSession())) redirect("/admin/login");

  const { to } = await searchParams;

  return (
    <section className="max-w-2xl">
      <div className="mb-1">
        <h1 className="text-lg font-semibold text-heading">Direct Mail</h1>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Send an email directly to a client. Separate multiple recipients with commas.
      </p>

      <ComposeMail defaultTo={to ?? ""} />
    </section>
  );
}
