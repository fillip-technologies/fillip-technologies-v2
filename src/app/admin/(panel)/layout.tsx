import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import Logo from "@/components/layouts/Navbar/Logo";
import { getSession } from "@/server/auth/session";
import { logout } from "@/server/auth/actions";
import AdminNav from "./AdminNav";

/**
 * Authenticated admin shell: fixed sidebar (logo top-left + nav + logout) and a
 * scrollable content area. The login page lives outside this route group, so it
 * is not wrapped by this guard — no redirect loop.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-background text-heading">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-gradient-to-b from-primary/[0.06] via-card/40 to-card/40">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo width={140} height={38} />
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <AdminNav />
        </div>

        {/* Account + logout pinned to the bottom */}
        <div className="border-t border-border p-3">
          <p className="truncate px-3 pb-2 text-xs text-muted-foreground" title={session.email}>
            {session.email}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-card hover:text-heading"
            >
              <LogOut size={18} aria-hidden="true" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden p-6 lg:p-8">{children}</main>
    </div>
  );
}
