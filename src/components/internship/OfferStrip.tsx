import { OFFER_HIGHLIGHTS } from "./constants";

/** Running highlight strip shown under the internship hero. */
export default function OfferStrip() {
  // Two copies so the marquee (translateX -50%) loops without a gap.
  const items = [...OFFER_HIGHLIGHTS, ...OFFER_HIGHLIGHTS];

  return (
    <section aria-label="Internship highlights" className="relative overflow-hidden bg-navy py-4 text-white">
      <p className="sr-only">{OFFER_HIGHLIGHTS.join(". ")}.</p>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
      <div
        aria-hidden="true"
        className="hover-pause flex w-max items-center whitespace-nowrap motion-safe:animate-[marquee-2x_38s_linear_infinite]"
      >
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 text-sm font-semibold tracking-wide sm:text-base">
            <span className={i % 2 === 0 ? "text-white" : "text-sky-300"}>{text}</span>
            <span className="text-[#f97316]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
