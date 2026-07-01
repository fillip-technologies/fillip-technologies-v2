import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Fillip Technologies",
  description: "Get in touch with the Fillip Technologies team. Reach out for custom software development, mobile app development, e-commerce, and high-impact digital solutions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#f8fafc] text-slate-900 pb-24">
      {/* Contact Hero banner */}
      <ContactHero />
      
      {/* Contact Layout Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto -mt-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>

          {/* Message Form (Right Column) */}
          <div className="lg:col-span-7">
            <ContactForm source="Contact Page" />
          </div>
          
        </div>
      </section>
    </main>
  );
}
