import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-heading">
      <div className="mx-auto flex max-w-3xl flex-col items-start">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-body">
          The page you are looking for may have been moved, unpublished, or no longer exists.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
