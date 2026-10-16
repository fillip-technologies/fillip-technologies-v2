import { BadgeCheck, ClipboardList, Layers, Users } from "lucide-react";
import { MadhubaniPeacock } from "./decor";

/**
 * Capability-based trust strip. Every line is either verifiable from the
 * existing site (founding year lives in src/config/site.ts) or is a stated
 * term of this package — no invented client counts, awards or results.
 */
const TRUST = [
  {
    icon: BadgeCheck,
    title: "13+ Years of Experience",
    copy: "Digital expertise supporting businesses since 2013.",
  },
  {
    icon: Layers,
    title: "In-House Team",
    copy: "Design, content, ads and reporting under one roof.",
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    copy: "One point of contact for your campaign.",
  },
  {
    icon: ClipboardList,
    title: "Transparent Reporting",
    copy: "A monthly performance report, every month.",
  },
];

export default function FestiveTrustBar() {
  return (
    <section className="border-y border-[#C9972B]/15 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <ul className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
          {TRUST.map(({ icon: Icon, title, copy }) => (
            <li
              key={title}
              className="flex items-start gap-3.5 px-0 py-6 sm:px-5 lg:py-8"
            >
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FDF6E7] text-[#A9741B]">
                {title.startsWith("13+") ? (
                  <>
                    <MadhubaniPeacock className="absolute -inset-1 size-12 text-[#B91C1C]/45" />
                    <span className="relative rounded-full bg-[#FDF6E7]/90 px-1 text-[11px] font-extrabold text-[#B91C1C]">
                      13+
                    </span>
                  </>
                ) : (
                  <Icon className="size-5" aria-hidden="true" />
                )}
              </span>
              <div>
                <p className="text-[14.5px] font-bold leading-snug text-[#081C2E]">{title}</p>
                <p className="mt-1 text-[13px] leading-5 text-slate-500">{copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
