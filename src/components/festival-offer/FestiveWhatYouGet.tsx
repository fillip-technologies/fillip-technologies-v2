import { BarChart3, Film, Megaphone, Palette, Share2, Store } from "lucide-react";
import { OFFER } from "./constants";
import { GoldDivider, MandalaCorner, PujaAlpana, SectionEyebrow } from "./decor";

const DELIVERABLES = [
  {
    icon: Palette,
    title: "Branded Graphics",
    copy: "10–12 branded graphics a month — festive greetings, offers and product creatives.",
  },
  {
    icon: Film,
    title: "Reels & Videos",
    copy: "8–10 reels and videos, edited from the footage you provide.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    copy: "Planning, publishing and day-to-day account management.",
  },
  {
    icon: Store,
    title: "Google Business Profile",
    copy: "Profile updates and promotional posts to help local customers find you.",
  },
  {
    icon: Megaphone,
    title: "Meta Ads Management",
    copy: "Campaign targeting, monitoring and ongoing optimisation.",
  },
  {
    icon: BarChart3,
    title: "Strategy & Reporting",
    copy: "A content calendar plus a monthly performance report.",
  },
];

export default function FestiveWhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="relative scroll-mt-24 overflow-hidden bg-[#FDFBF5] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <MandalaCorner className="absolute -left-28 top-10 hidden h-[320px] w-[320px] text-[#C9972B]/15 lg:block" />
        <PujaAlpana className="absolute -right-24 bottom-0 hidden h-[330px] w-[330px] text-[#B91C1C]/10 lg:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>What You Get</SectionEyebrow>

          <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-tight text-[#081C2E] sm:text-[40px]">
            Complete Digital Marketing Support
            <span className="block text-[#0242a2]">
              Only at {OFFER.festivePrice}
              {OFFER.per}
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Everything you need to stay active, reach the right people and grow through
            the festive season.
          </p>

          <GoldDivider className="mt-8" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {DELIVERABLES.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="group flex h-full flex-col rounded-2xl border border-[#C9972B]/18 bg-white p-7 shadow-[0_2px_10px_rgba(8,28,46,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#C9972B]/40 hover:shadow-[0_18px_40px_rgba(8,28,46,0.08)]"
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FDF6E7] to-[#F7EAD0] text-[#A9741B] transition-colors duration-300 group-hover:from-[#C9972B] group-hover:to-[#F0B429] group-hover:text-white">
                <Icon className="size-[22px]" aria-hidden="true" />
              </span>

              <h3 className="text-[17px] font-bold leading-snug text-[#081C2E]">{title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>

        {/* The package boundaries, stated plainly rather than buried in the FAQ. */}
        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#C9972B]/20 bg-white px-6 py-4 text-center text-[13px] leading-6 text-slate-500">
          <span className="font-semibold text-[#081C2E]">Please note:</span> advertising
          spend, photo/video shoots, website work and paid tools are charged separately.
          Billing is monthly in advance, and GST treatment will be confirmed by our team.
        </p>
      </div>
    </section>
  );
}
