import { cache } from "react";
import { getContentData } from "./queries";

export type PopupFrequency = "every" | "session" | "day" | "once";

export type SitePopup = {
  image: string;
  link: string;
  frequency: PopupFrequency;
  /** Seconds after page load before the popup opens. */
  delay: number;
};

const FREQUENCIES: PopupFrequency[] = ["every", "session", "day", "once"];

/**
 * Read the site-wide popup ad (content key `global.popup`). Returns null when no
 * image is set, i.e. the popup is switched off. Wrapped in `cache()` so the
 * layout's call is one DB read per request.
 */
export const getSitePopup = cache(async (): Promise<SitePopup | null> => {
  const data = await getContentData("global.popup", {
    image: "",
    link: "",
    frequency: "every",
    delay: "1.5",
  });
  const image = String(data.image ?? "").trim();
  if (!image) return null;
  const frequency = FREQUENCIES.find((f) => f === data.frequency) ?? "every";
  const delay = Number(data.delay);
  return {
    image,
    link: String(data.link ?? "").trim(),
    frequency,
    delay: Number.isFinite(delay) && delay >= 0 ? Math.min(delay, 60) : 1.5,
  };
});
