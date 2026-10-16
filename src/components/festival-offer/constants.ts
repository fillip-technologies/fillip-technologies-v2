/**
 * Campaign-only constants for the /festival-offer Meta Ads landing page.
 *
 * The promotional number here (+91 75459 99996) is printed on the Festive
 * Growth 360 graphic and is intentionally DIFFERENT from the site-wide
 * WhatsApp number in components/Home/WhatsAppButton.tsx. Keep it scoped to
 * this campaign — do not propagate it to the rest of the site.
 */

export const CAMPAIGN_PHONE_DISPLAY = "+91 75459 99996";
export const CAMPAIGN_PHONE_TEL = "tel:+917545999996";
export const CAMPAIGN_WHATSAPP_URL = "https://wa.me/917545999996";

/** Anchor target for every "Claim Your Festive Offer" CTA on the page. */
export const ENQUIRY_ANCHOR = "festive-enquiry";
export const ENQUIRY_HREF = `#${ENQUIRY_ANCHOR}`;

export const OFFER = {
  regularPrice: "₹25,000",
  festivePrice: "₹9,999",
  per: "/month",
  discount: "60% OFF",
  validity: "11 October 2026 – 1 January 2027",
  validityShort: "Valid 11 Oct 2026 – 1 Jan 2027",
} as const;

/** Festive palette, kept local so globals.css stays untouched. */
export const FESTIVE = {
  navy: "#081C2E",
  navyDeep: "#06161F",
  gold: "#C9972B",
  goldBright: "#F0B429",
  saffron: "#F59E0B",
  ivory: "#FDFBF5",
} as const;
