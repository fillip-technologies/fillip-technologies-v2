import { Award, CalendarCheck, CircleCheck, TriangleAlert, Wallet } from "lucide-react";
import { ELIGIBILITY, IMPORTANT_NOTES } from "./constants";
import Blobs from "./Blobs";
import { PopIn } from "./motion";
import SectionHeading, { Highlight } from "./SectionHeading";

const NOTE_ICONS = [Wallet, Award, CalendarCheck] as const;

export default function InternshipEligibility() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Blobs />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          align="split"
          title={
            <>
              Is this internship <Highlight>for you?</Highlight>
            </>
          }
          description="Check who can apply and read the three programme notes before you register."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Who can apply */}
          <PopIn index={0} className="rounded-[28px] bg-white shadow-[0_16px_40px_-24px_rgba(2,30,80,0.25)] ring-1 ring-slate-200/70 p-7 sm:p-9">
            <h3 className="intern-display text-xl text-[#0b1733]">Who can apply</h3>
            <ul className="mt-6 space-y-4">
              {ELIGIBILITY.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <CircleCheck className="mt-1 size-5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </PopIn>

          {/* Before you apply */}
          <PopIn index={1} className="rounded-[28px] bg-amber-50/70 p-7 ring-1 ring-amber-200/70 sm:p-9">
            <h3 className="intern-display flex items-center gap-2 text-xl text-[#0b1733]">
              <TriangleAlert className="size-5 text-amber-600" /> Before you apply
            </h3>
            <ol className="mt-6 space-y-5">
              {IMPORTANT_NOTES.map(({ title, description }, i) => {
                const Icon = NOTE_ICONS[i % NOTE_ICONS.length];
                return (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-amber-700 ring-1 ring-amber-200">
                      <Icon className="size-[18px]" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </PopIn>
        </div>
      </div>
    </section>
  );
}
