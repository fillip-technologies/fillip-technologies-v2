import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { getSession } from "@/server/auth/session";
import { logout } from "@/server/auth/actions";
import AdminNav from "./AdminNav";

/**
 * Authenticated admin shell: a deep navy sidebar (brand logo + nav + account)
 * and a tinted, scrollable content area so white cards stand out. The login
 * page lives outside this route group, so it isn't wrapped by this guard.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const initial = (session.email?.[0] ?? "A").toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-heading">
      {/* Sidebar — fixed full height; only the content area scrolls */}
      <aside
        className="relative flex h-screen w-64 shrink-0 flex-col overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(180deg, #0a2450 0%, #081C2E 55%, #061423 100%)",
        }}
      >
        {/* Decorative brand glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-52 w-52 rounded-full bg-primary/30 blur-3xl" />

        {/* Brand */}
        <div className="relative flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
          <Image
            src="/images/fav-icon.png"
            alt="Fillip Technologies"
            width={500}
            height={500}
            className="h-9 w-9 rounded-lg bg-white/95 p-0.5 shadow-sm"
            priority
          />
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">Fillip</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
              Admin Panel
            </span>
          </div>
        </div>

        <div className="relative flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Menu
          </p>
          <AdminNav />
        </div>

        {/* Account + logout pinned to the bottom */}
        <div className="relative border-t border-white/10 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-sm font-semibold text-white">
              {initial}
            </span>
            <p className="truncate text-xs text-white/70" title={session.email}>
              {session.email}
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut size={18} aria-hidden="true" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content — scrolls independently of the fixed sidebar */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">{children}</main>
    </div>
  );
}
