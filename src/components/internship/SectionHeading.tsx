import type { ReactNode } from "react";
import { Reveal } from "./motion";

/** Keyword inside a section title, filled with a slowly shifting gradient. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="intern-aurora">{children}</span>;
}

/** Title style shared by every section heading on the page. */
export const titleClass = "intern-display text-balance text-[2rem] leading-[1.15] text-[#0b1733] sm:text-[2.5rem] lg:text-[2.85rem]";

/**
 * Section header (title + optional description), revealed on scroll.
 * - center: stacked and centred
 * - split:  title on the left, description on the right (desktop)
 */
export default function SectionHeading({
  title,
  description,
  align = "center",
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "split";
}) {
  if (align === "split") {
    return (
      <Reveal className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <h2 className={titleClass}>{title}</h2>
        {description ? <p className="text-[17px] leading-8 text-slate-600 lg:pb-1.5">{description}</p> : null}
      </Reveal>
    );
  }
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <h2 className={titleClass}>{title}</h2>
      {description ? <p className="mx-auto mt-4 max-w-xl text-[17px] leading-8 text-slate-600">{description}</p> : null}
    </Reveal>
  );
}
