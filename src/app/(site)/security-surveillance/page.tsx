import type { Metadata } from "next";
import SecuritySurveillance from "@/components/Hardware-solution/SecuritySurveillance";

export const metadata: Metadata = {
  title: "Security & Surveillance Solutions | Fillip Technologies",
  description: "Secure your business, office, or home with high-performance security systems, HD CCTV cameras, keyless access controls, and 24/7 central monitoring services.",
  alternates: { canonical: "/security-surveillance" },
};

export default function SecuritySurveillancePage() {
  return (
    <main className="overflow-hidden bg-background text-heading">
      <SecuritySurveillance />
    </main>
  );
}
