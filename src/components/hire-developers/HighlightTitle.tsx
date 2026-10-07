import type { TitleParts } from "@/data/hire-developers/types";

// Renders "before <gradient>highlight</gradient> after", as used by every
// section heading on the Hire Developers page.
export default function HighlightTitle({ title, breakBeforeAfter = false }: { title: TitleParts; breakBeforeAfter?: boolean }) {
  return (
    <>
      {title.before && <>{title.before} </>}
      <span className="bg-gradient-to-r from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] bg-clip-text text-transparent">
        {title.highlight}
      </span>
      {title.after && (
        <>
          {breakBeforeAfter ? <br className="hidden sm:block" /> : " "}
          {title.after}
        </>
      )}
    </>
  );
}
