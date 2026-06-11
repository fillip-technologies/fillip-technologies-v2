import { redirect } from "next/navigation";
import Logo from "@/components/layouts/Navbar/Logo";
import { getSession } from "@/server/auth/session";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  // Already signed in? Skip the login form.
  if (await getSession()) redirect("/admin");

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Company logo, top-left */}
      <div className="absolute left-6 top-6">
        <Logo width={150} height={40} />
      </div>

      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-heading">Admin sign in</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter your credentials to access the dashboard.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
