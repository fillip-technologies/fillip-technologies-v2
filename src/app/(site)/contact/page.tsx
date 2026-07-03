import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ConsultationForm from "@/components/form/ConsultationForm";

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
            <div className="border border-slate-200/80 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-md relative overflow-hidden h-full">
              {/* Soft gradient backgrounds in form card */}
              <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 flex items-center gap-2">
                    Send a Message
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1">
                    Fill in the details below and we will get back to you with a detailed scope report.
                  </p>
                </div>

                <ConsultationForm />
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}
