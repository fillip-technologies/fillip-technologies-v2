import { redirect } from "next/navigation";
import { getSession } from "@/server/auth/session";
import ComposeMail from "./ComposeMail";

export const metadata = { title: "Mail — Admin" };

// Never cache: this is an authenticated action surface.
export const dynamic = "force-dynamic";

export default async function MailPage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string; subject?: string; body?: string }>;
}) {
  if (!(await getSession())) redirect("/admin/login");

  const { to, subject, body } = await searchParams;

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-1">
        <h1 className="text-2xl font-bold tracking-tight text-heading">Mail</h1>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Send an email directly to a client. Separate multiple recipients with commas.
      </p>

      <ComposeMail
        key={`${to ?? ""}|${subject ?? ""}|${body ?? ""}`}
        defaultTo={to ?? ""}
        defaultSubject={subject ?? ""}
        defaultMessage={body ?? ""}
      />
    </section>
  );
}
