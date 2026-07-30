import Image from "next/image";
import { redirect } from "next/navigation";
import { Users, FileEdit, Briefcase } from "lucide-react";
import Logo from "@/components/layouts/Navbar/Logo";
import { getSession } from "@/server/auth/session";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login" };

const HIGHLIGHTS = [
  {
    icon: Users,
    title: "Track every lead",
    text: "See enquiries and quote requests the moment they land, and update their status.",
  },
  {
    icon: FileEdit,
    title: "Manage site content",
    text: "Edit pages, services, SEO and media — your website, fully under your control.",
  },
  {
    icon: Briefcase,
    title: "Review job applications",
    text: "Read career requests and download resumes from a single place.",
  },
];

export default async function AdminLoginPage() {
  // Already signed in? Skip the login form.
  if (await getSession()) redirect("/admin");

  return (
    <main className="grid h-screen overflow-hidden lg:grid-cols-2">
      {/* -------------------------------------------- Left: branded UI showcase */}
      <div
        className="relative hidden h-full overflow-hidden lg:block"
        style={{ background: "var(--gradient-primary)" }}
      >
        {/* Soft decorative glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-accent/30 blur-3xl" />

        <div className="relative flex h-full flex-col justify-between gap-8 p-12 xl:p-16">
          {/* Square icon mark (can't stretch) + real text wordmark. */}
          <div className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/fav-icon.png"
              alt="Fillip Technologies"
              width={500}
              height={500}
              className="h-11 w-11 rounded-xl bg-white/95 p-1 shadow-sm"
              priority
            />
            <div className="leading-tight">
              <span className="block text-lg font-semibold tracking-tight text-white">
                Fillip Technologies
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                An IT Service Provider
              </span>
            </div>
          </div>

          {/* Headline block, vertically centered in the freed-up space */}
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <h2 className="max-w-lg text-3xl font-semibold leading-tight text-white xl:text-4xl">
              Our business, managed from one dashboard.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
              Leads, website content and job applications — the Fillip Technologies control center.
            </p>
          </div>

          <ul className="grid shrink-0 gap-5">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/20">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-xs leading-relaxed text-white/60">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------- Right: sign-in form */}
      <div className="flex h-full flex-col justify-center overflow-y-auto px-6 py-8 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <Logo width={160} height={44} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-heading">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage leads, content and job applications.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Fillip Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
