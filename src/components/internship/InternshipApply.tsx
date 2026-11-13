import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { OFFICE, REGISTRATION_FEE } from "./constants";
import RegistrationWizard from "./RegistrationWizard";

export default function InternshipApply() {
  return (
    <section id="apply" className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#0242a2 1px,transparent 1px),linear-gradient(to bottom,#0242a2 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Apply for internship
          </span>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">
            Register in a few <span className="text-primary">simple steps</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Accept the terms, fill in your details, pay the registration fee and you&apos;re in.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          <RegistrationWizard />

          <aside className="grid gap-5 sm:grid-cols-2 lg:sticky lg:top-28 lg:grid-cols-1">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
              <p className="bg-navy px-6 py-3.5 text-sm font-bold text-white">Registration fee</p>
              <div className="px-6 py-6 text-center">
                <p className="text-5xl font-black tracking-tight text-primary">{REGISTRATION_FEE}</p>
                <p className="mt-2 text-xs text-slate-500">One-time registration amount</p>
              </div>
              <p className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-xs leading-5 text-slate-500">
                This is a fully paid programme (training, platform &amp; internship). Our team will share the complete fee details.
              </p>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white">
              <p className="bg-navy px-6 py-3.5 text-sm font-bold text-white">Office &amp; contact</p>
              <ul className="space-y-4 px-6 py-6 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                  <span>
                    <strong className="block text-slate-900">{OFFICE.name}</strong>
                    {OFFICE.address}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-1 size-4 shrink-0 text-primary" />
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-1 size-4 shrink-0 text-primary" />
                  <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-primary">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Globe className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{OFFICE.website}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
