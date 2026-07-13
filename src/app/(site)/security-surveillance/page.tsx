import type { Metadata } from "next";
import SecuritySurveillance from "@/components/Hardware-solution/SecuritySurveillance";
import { getSecuritySurveillanceContent } from "@/server/content/solution-page-content";

export const metadata: Metadata = {
  title: "Security & Surveillance Solutions | Fillip Technologies",
  description: "Secure your business, office, or home with high-performance security systems, HD CCTV cameras, keyless access controls, and 24/7 central monitoring services.",
  alternates: { canonical: "/security-surveillance" },
};

// CMS-managed content — render fresh so edits show without a rebuild.
export const dynamic = "force-dynamic";

export default async function SecuritySurveillancePage() {
  const content = await getSecuritySurveillanceContent();
  return (
    <main className="overflow-hidden bg-background text-heading">
      <SecuritySurveillance content={content} />
    </main>
  );
}
