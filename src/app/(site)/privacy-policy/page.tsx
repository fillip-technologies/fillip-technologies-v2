import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fillip Technologies",
  description: "Read how Fillip Technologies collects, uses, protects, and manages information shared through our website and services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background">
      <section className="px-6 pb-16 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-heading md:text-5xl">Privacy Policy</h1>
          <p className="mt-5 text-base leading-8 text-body">
            Fillip Technologies respects your privacy. This policy explains how we handle information shared with us through our website, enquiry forms, calls, emails, campaigns, and service interactions.
          </p>

          <div className="mt-12 space-y-9 text-body">
            <section>
              <h2 className="text-2xl font-bold text-heading">Information We Collect</h2>
              <p className="mt-3 leading-8">
                We may collect your name, phone number, email address, company name, website URL, project requirements, billing details, communication records, and information submitted through forms or service requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">How We Use Information</h2>
              <p className="mt-3 leading-8">
                We use information to respond to enquiries, prepare proposals, deliver services, provide support, improve our website, manage billing, share project updates, and communicate relevant service information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Data Protection</h2>
              <p className="mt-3 leading-8">
                We take reasonable technical and operational steps to protect your information from unauthorized access, misuse, loss, or disclosure. Access is limited to team members and service partners who need it for business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Third-Party Services</h2>
              <p className="mt-3 leading-8">
                We may use trusted tools for hosting, analytics, advertising, communication, payment, and project delivery. These services may process limited information according to their own privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-heading">Contact</h2>
              <p className="mt-3 leading-8">
                For privacy-related questions, contact us at info@filliptechnologies.com.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
