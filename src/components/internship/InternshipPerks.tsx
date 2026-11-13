import Image from "next/image";
import { Award, BadgeCheck, Hammer, Laptop, School, ScrollText, UsersRound } from "lucide-react";
import { ENGINEERS_CLINIC } from "./constants";

const CERTIFICATES = [
  { icon: Award, title: "Training Certificate", text: "Issued by Fillip Technologies Pvt. Ltd." },
  { icon: BadgeCheck, title: "Internship Certificate", text: "Issued by Fillip Technologies Pvt. Ltd." },
  { icon: ScrollText, title: "Performance transcript", text: "A record of your progress in the programme." },
] as const;

const cardClass = "rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.05)]";

export default function InternshipPerks() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">What you get</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">More than a certificate</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Guided learning, practical work and recognised proof of what you have done.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Certificates (feature card) */}
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#081C2E] via-[#0b2c52] to-[#0242a2] p-7 text-white sm:col-span-2 sm:p-9">
            <div aria-hidden="true" className="absolute -bottom-24 -right-24 size-72 rounded-full border-[48px] border-white/[0.06]" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">On successful completion</p>
            <h3 className="relative mt-3 max-w-md text-2xl font-bold tracking-tight sm:text-3xl">
              Two certificates and a performance transcript
            </h3>
            <ul className="relative mt-8 grid gap-4 sm:grid-cols-3">
              {CERTIFICATES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm">
                  <span className="grid size-10 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-4 font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                </li>
              ))}
            </ul>
            <p className="relative mt-6 text-xs text-slate-400">Subject to programme requirements, including minimum 75% attendance.</p>
          </div>

          {/* Mentorship */}
          <div className={cardClass}>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UsersRound className="size-5" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-slate-950">Guidance from mentors</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Get direction and support from mentors at Fillip Technologies throughout your internship.
            </p>
          </div>

          {/* Practical work */}
          <div className={cardClass}>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Hammer className="size-5" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-slate-950">Learn by doing</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Strengthen your understanding through guided practical tasks and projects aligned with real-world work.
            </p>
          </div>

          {/* Platform */}
          <div className={cardClass}>
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Laptop className="size-5" />
              </span>
              <Image src={ENGINEERS_CLINIC.logo} alt="" width={120} height={44} className="h-9 w-auto object-contain" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-950">{ENGINEERS_CLINIC.name} access</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Your training runs on our learning platform. Login details are shared once your registration is confirmed.
            </p>
          </div>

          {/* Flexible mode */}
          <div className={cardClass}>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <School className="size-5" />
            </span>
            <h3 className="mt-6 text-xl font-bold text-slate-950">Online or classroom</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Join an online batch from anywhere, or learn in person at our classroom in Kankarbagh, Patna.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
