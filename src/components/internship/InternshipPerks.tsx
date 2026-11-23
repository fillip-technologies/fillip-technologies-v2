import Image from "next/image";
import { Award, Check, Hammer, School, UsersRound } from "lucide-react";
import Blobs from "./Blobs";
import { ENGINEERS_CLINIC } from "./constants";
import { PopIn } from "./motion";
import SectionHeading, { Highlight } from "./SectionHeading";

/** Decorative certificate drawing (no real names or data). */
function CertificateArt() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-56 w-full max-w-[320px] sm:h-64">
      {/* back sheet */}
      <div className="absolute inset-x-6 top-2 h-48 rotate-[-6deg] rounded-2xl bg-white shadow-[0_18px_40px_-12px_rgba(2,30,80,0.25)] ring-1 ring-slate-200 sm:h-56">
        <div className="absolute inset-3 rounded-xl border border-dashed border-sky-200" />
      </div>
      {/* front sheet */}
      <div className="absolute inset-x-2 top-6 h-48 rotate-[3deg] rounded-2xl bg-white p-5 shadow-[0_24px_50px_-12px_rgba(2,30,80,0.30)] ring-1 ring-slate-200 sm:h-56">
        <div className="absolute inset-2.5 rounded-xl border-2 border-primary/15" />
        <div className="relative flex h-full flex-col items-center text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/70">Certificate</p>
          <p className="intern-display mt-1 text-lg text-[#0b1733]">of Internship</p>
          <span className="mt-3 h-1.5 w-28 rounded-full bg-slate-200" />
          <span className="mt-2 h-1.5 w-40 rounded-full bg-slate-100" />
          <span className="mt-1.5 h-1.5 w-32 rounded-full bg-slate-100" />
          <div className="mt-auto flex w-full items-end justify-between px-2">
            <span className="h-px w-16 bg-slate-300" />
            <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-[0_6px_14px_rgba(245,158,11,0.45)] ring-4 ring-amber-100">
              <Award className="size-6" />
            </span>
            <span className="h-px w-16 bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

const SMALL = [
  {
    icon: UsersRound,
    title: "Guidance from mentors",
    text: "Get direction and support from mentors at Fillip Technologies throughout your internship.",
    tint: "bg-sky-50 text-sky-600",
  },
  {
    icon: Hammer,
    title: "Learn by doing",
    text: "Build your skills through guided practical tasks and projects aligned with real-world work.",
    tint: "bg-violet-50 text-violet-600",
  },
  {
    icon: School,
    title: "Online or classroom",
    text: "Join an online batch from anywhere, or learn in person at our classroom in Kankarbagh, Patna.",
    tint: "bg-emerald-50 text-emerald-600",
  },
] as const;

export default function InternshipPerks() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9fe] py-20 lg:py-28">
      <Blobs />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="split"
          title={
            <>
              More than just a <Highlight>certificate</Highlight>
            </>
          }
          description="Guided learning, practical work and recognised proof of what you have done, from your first class to your last."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Certificates */}
          <PopIn
            index={0}
            className="grid items-center gap-8 overflow-hidden rounded-[28px] bg-white p-7 shadow-[0_20px_50px_-24px_rgba(2,30,80,0.25)] ring-1 ring-slate-200/70 sm:grid-cols-[1fr_0.9fr] sm:p-9 lg:col-span-2"
          >
            <div>
              <h3 className="intern-display text-[1.6rem] leading-tight text-[#0b1733] sm:text-[1.85rem]">
                Two certificates and a performance transcript
              </h3>
              <ul className="mt-5 space-y-3">
                {["Training Certificate", "Internship Certificate", "Performance transcript"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-medium text-slate-700">
                    <span className="grid size-6 place-items-center rounded-full bg-primary text-white">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-5 text-slate-500">
                Issued by Fillip Technologies Pvt. Ltd., subject to programme requirements including 75% attendance.
              </p>
            </div>
            <CertificateArt />
          </PopIn>

          {/* Platform */}
          <PopIn
            index={1}
            className="relative flex flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0242a2] to-[#0b6ad6] p-7 text-white shadow-[0_24px_50px_-20px_rgba(2,66,162,0.55)] sm:p-9"
          >
            <div aria-hidden="true" className="absolute -right-16 -top-16 size-56 rounded-full border-[30px] border-white/10" />
            <span className="relative inline-flex w-fit rounded-2xl bg-white px-4 py-3 shadow-lg">
              <Image src={ENGINEERS_CLINIC.logo} alt={ENGINEERS_CLINIC.name} width={140} height={50} className="h-9 w-auto object-contain" />
            </span>
            <h3 className="intern-display relative mt-7 text-[1.5rem] leading-tight">Learn on {ENGINEERS_CLINIC.name}</h3>
            <p className="relative mt-3 text-sm leading-7 text-sky-100">
              Your training runs on our learning platform. You get your login details once your registration is confirmed.
            </p>
          </PopIn>

          {/* Smaller benefits */}
          {SMALL.map(({ icon: Icon, title, text, tint }, i) => (
            <PopIn
              key={title}
              index={i + 2}
              className="rounded-[28px] bg-white p-7 shadow-[0_16px_40px_-24px_rgba(2,30,80,0.25)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(2,30,80,0.35)]"
            >
              <span className={`grid size-12 place-items-center rounded-2xl ${tint}`}>
                <Icon className="size-5" />
              </span>
              <h3 className="intern-display mt-5 text-lg text-[#0b1733]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
            </PopIn>
          ))}
        </div>
      </div>
    </section>
  );
}
