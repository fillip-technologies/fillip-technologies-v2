import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "./constants";

export default function InternshipProcess() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div aria-hidden="true" className="absolute -right-32 -top-40 size-[460px] rounded-full border-[80px] border-white/[0.03]" />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 h-72 w-[560px] rounded-full bg-primary/30 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">How it works</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">From application to your first class</h2>
          </div>
          <Link
            href="#apply"
            className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 lg:self-auto"
          >
            Start your application <ArrowRight className="size-4" />
          </Link>
        </div>

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_STEPS.map(({ title, description }, i) => (
            <li
              key={title}
              className="group relative rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-sky-300/30 hover:bg-white/[0.07] lg:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Step {i + 1}</span>
                <span aria-hidden="true" className="text-4xl font-black tracking-tight text-white/[0.07]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
