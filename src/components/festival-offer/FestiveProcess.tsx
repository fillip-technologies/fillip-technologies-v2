import { ClipboardList, LineChart, Rocket, Target } from "lucide-react";
import { GoldDivider, SectionEyebrow } from "./decor";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Share Your Details",
    copy: "Fill in the form above or message us on WhatsApp.",
  },
  {
    icon: Target,
    title: "Get a Custom Plan",
    copy: "We understand your business and map the festive plan to it.",
  },
  {
    icon: Rocket,
    title: "Content & Campaigns",
    copy: "We create, schedule and run your content and ads.",
  },
  {
    icon: LineChart,
    title: "Track Your Growth",
    copy: "You get a monthly report covering what ran and what it did.",
  },
];

export default function FestiveProcess() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#FDFBF5] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Our Process</SectionEyebrow>

          <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-tight text-[#081C2E] sm:text-[40px]">
            Simple. Transparent. Effective.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Getting started takes one conversation.
          </p>

          <GoldDivider className="mt-8" />
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, copy }, index) => (
            <li
              key={title}
              className="relative flex h-full flex-col rounded-2xl border border-[#C9972B]/18 bg-white p-7"
            >
              {/* Connector, desktop only — the last card has nothing to point at. */}
              {index < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-[-13px] top-1/2 hidden h-px w-[26px] -translate-y-1/2 bg-gradient-to-r from-[#C9972B]/50 to-transparent lg:block"
                />
              ) : null}

              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FDF6E7] to-[#F7EAD0] text-[#A9741B]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-[26px] font-extrabold leading-none text-[#C9972B]/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-[16.5px] font-bold leading-snug text-[#081C2E]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
