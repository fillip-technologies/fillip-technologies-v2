import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies | Fillip Technologies",
  description: "Learn how Fillip Technologies uses cookies and similar technologies on its website.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="bg-background">
      <section className="px-6 pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl">Cookies</h1>
          <p className="mt-5 text-base leading-8 text-body">
            Our website may use cookies and similar technologies to improve performance, understand visitor behavior, and support marketing and analytics.
          </p>

          <div className="mt-12 space-y-9 text-body">
            <section>
              <h2 className="text-2xl font-bold text-heading">What Cookies Are</h2>
              <p className="mt-3 leading-8">
                Cookies are small files stored on your device by a website. They help websites remember preferences, measure usage, and provide smoother browsing experiences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">How We Use Cookies</h2>
              <p className="mt-3 leading-8">
                We may use cookies for essential site functions, analytics, performance monitoring, form tracking, advertising measurement, and improving website content and navigation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Third-Party Cookies</h2>
              <p className="mt-3 leading-8">
                Analytics, advertising, embedded media, and communication tools may place cookies according to their own policies. These tools help us understand and improve user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Managing Cookies</h2>
              <p className="mt-3 leading-8">
                You can manage or disable cookies through your browser settings. Some website features may not work properly if essential cookies are blocked.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
