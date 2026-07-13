import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | Fillip Technologies",
  description: "Read the terms for using the Fillip Technologies website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="bg-background">
      <section className="px-6 pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl">Terms</h1>
          <p className="mt-5 text-base leading-8 text-body">
            These terms apply when you use the Fillip Technologies website or engage with us for digital, software, marketing, hardware, or consulting services.
          </p>

          <div className="mt-12 space-y-9 text-body">
            <section>
              <h2 className="text-2xl font-bold text-heading">Use of Website</h2>
              <p className="mt-3 leading-8">
                You agree to use this website for lawful purposes only. You must not attempt to disrupt, misuse, copy, scrape, or damage any part of the website or its systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Service Engagements</h2>
              <p className="mt-3 leading-8">
                Project scope, timelines, deliverables, pricing, revisions, support, and payment terms are defined in the relevant proposal, quotation, invoice, or written agreement shared with the client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Intellectual Property</h2>
              <p className="mt-3 leading-8">
                Website content, designs, code, graphics, brand assets, and materials created by Fillip Technologies remain protected by applicable intellectual property laws unless ownership transfer is agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Payments and Approvals</h2>
              <p className="mt-3 leading-8">
                Work may begin after required approvals and advance payments. Delays in content, approvals, access, or payments may affect timelines and delivery schedules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Limitation of Liability</h2>
              <p className="mt-3 leading-8">
                Fillip Technologies is not liable for indirect losses, third-party platform changes, downtime outside our control, or outcomes affected by client-side delays, external tools, or market conditions.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
