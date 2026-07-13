import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance | Fillip Technologies",
  description: "Learn about Fillip Technologies compliance approach for responsible service delivery, data handling, and project execution.",
  alternates: { canonical: "/compliance" },
};

export default function CompliancePage() {
  return (
    <main className="bg-background">
      <section className="px-6 pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl">Compliance</h1>
          <p className="mt-5 text-base leading-8 text-body">
            Fillip Technologies follows responsible business practices for client work, digital services, data handling, communication, and project delivery.
          </p>

          <div className="mt-12 space-y-9 text-body">
            <section>
              <h2 className="text-2xl font-bold text-heading">Responsible Delivery</h2>
              <p className="mt-3 leading-8">
                We work with documented scopes, clear approvals, defined responsibilities, and transparent communication to reduce confusion and support accountable delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Data Handling</h2>
              <p className="mt-3 leading-8">
                Client data, credentials, documents, and project information are handled with care and shared only with team members or service partners who need access for delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Digital Marketing Compliance</h2>
              <p className="mt-3 leading-8">
                We aim to follow platform policies, advertising guidelines, consent-based communication practices, and applicable rules for SEO, ads, messaging, and campaign execution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Security and Access</h2>
              <p className="mt-3 leading-8">
                Access to client platforms, hosting, analytics, ad accounts, and software systems is used only for approved work and should be revoked or rotated when projects end.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Questions</h2>
              <p className="mt-3 leading-8">
                For compliance-related questions, contact Fillip Technologies at info@filliptechnologies.com.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
