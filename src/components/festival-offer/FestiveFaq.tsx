import { Plus } from "lucide-react";
import { CAMPAIGN_PHONE_DISPLAY, CAMPAIGN_PHONE_TEL } from "./constants";
import { MandalaCorner, SectionEyebrow } from "./decor";

/**
 * Native <details>/<summary> accordion — keyboard accessible and open-by-
 * default for search engines, with no client JS and no extra dependency.
 *
 * Answers stick to the stated terms of this offer. Where a policy is not
 * documented (contract length, GST), the answer points to the team rather
 * than inventing one.
 */
const FAQS = [
  {
    q: "Is advertising spend included in the package?",
    a: "No. The ₹9,999/month covers the work — creatives, reels, social media management, Google Business Profile, campaign management and reporting. Your advertising budget is paid separately and goes directly to the ad platform.",
  },
  {
    q: "What is included in the monthly package?",
    a: "10–12 branded graphics, 8–10 reels or videos edited from your footage, social media management, Google Business Profile updates and promotional posts, Meta Ads management, plus a content calendar and a monthly performance report.",
  },
  {
    q: "Do you create content from scratch?",
    a: "Graphics are designed from scratch by our team. Reels and videos are edited from footage you provide — we handle the editing, captions and formatting for each platform.",
  },
  {
    q: "What if I do not have photos or videos?",
    a: "We can work with your existing product images and brand assets. If you need fresh footage, a photo or video shoot can be arranged, but shoots are charged separately and are not part of this package.",
  },
  {
    q: "How will campaign performance be reported?",
    a: "You receive a monthly performance report covering what was published, how the campaigns ran and what we are adjusting next, alongside the content calendar for the coming month.",
  },
  {
    q: "Is a long-term contract required?",
    a: "Billing is monthly in advance. For the exact engagement terms — including duration, notice and GST treatment — our team will confirm everything in writing before any work begins.",
  },
  {
    q: "What do you need from my side to start?",
    a: "Access to your social accounts and Google Business Profile, your brand assets, and a point of contact for approvals. Website work and paid tools, if any are needed, are quoted separately.",
  },
];

export default function FestiveFaq() {
  return (
    <section
      id="faqs"
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 lg:py-28"
    >
      <MandalaCorner
        className="pointer-events-none absolute -left-24 bottom-8 hidden h-[300px] w-[300px] text-[#C9972B]/15 lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:pt-4">
            <SectionEyebrow>Frequently Asked Questions</SectionEyebrow>

            <h2 className="mt-5 text-[30px] font-bold leading-[1.12] tracking-tight text-[#081C2E] sm:text-[38px]">
              Quick answers
              <span className="block text-[#0242a2]">for you</span>
            </h2>

            <p className="mt-5 max-w-sm text-[15px] leading-7 text-slate-600">
              Everything worth knowing about the festive offer before you enquire.
            </p>

            <p className="mt-6 text-[14px] leading-6 text-slate-500">
              Still unsure?{" "}
              <a
                href={CAMPAIGN_PHONE_TEL}
                className="font-semibold text-[#0242a2] underline-offset-4 hover:underline"
              >
                Call {CAMPAIGN_PHONE_DISPLAY}
              </a>{" "}
              and ask us directly.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-[#C9972B]/18 bg-[#FDFBF5] px-6 py-5 transition-colors duration-200 open:border-[#C9972B]/40 open:bg-white hover:border-[#C9972B]/35"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left text-[15.5px] font-semibold leading-snug text-[#081C2E] marker:hidden [&::-webkit-details-marker]:hidden">
                  {q}
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#C9972B]/15 text-[#A9741B] transition-transform duration-200 group-open:rotate-45"
                  >
                    <Plus className="size-3.5" strokeWidth={3} />
                  </span>
                </summary>

                <p className="mt-3.5 pr-10 text-sm leading-7 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
