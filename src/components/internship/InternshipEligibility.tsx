import { Award, CalendarCheck, CircleCheck, TriangleAlert, Wallet } from "lucide-react";
import { ELIGIBILITY, IMPORTANT_NOTES } from "./constants";

const NOTE_ICONS = [Wallet, Award, CalendarCheck] as const;

export default function InternshipEligibility() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Eligibility</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">Is this internship for you?</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Who can apply */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_44px_rgba(15,23,42,0.05)] sm:p-9">
            <h3 className="text-xl font-bold text-slate-950">Who can apply</h3>
            <ul className="mt-6 space-y-4">
              {ELIGIBILITY.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <CircleCheck className="mt-1 size-5 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Before you apply */}
          <div className="rounded-[28px] border border-amber-200/70 bg-amber-50/50 p-7 sm:p-9">
            <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
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
          </div>
        </div>
      </div>
    </section>
  );
}
