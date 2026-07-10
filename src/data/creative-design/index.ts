import type { CreativeDesignContent } from "./types";
import { uiUxDesigningContent } from "./uiUxDesigning";
import { productDesignContent } from "./productDesign";
import { logoDesigningContent } from "./logoDesigning";
import { brandIdentityContent } from "./brandIdentity";
import { motionVideoDesignContent } from "./motionVideoDesign";

export type {
  CreativeDesignContent,
  PortfolioItem,
  WhyChooseReason,
  CreativeDesignFaqItem,
} from "./types";

export {
  uiUxDesigningContent,
  productDesignContent,
  logoDesigningContent,
  brandIdentityContent,
  motionVideoDesignContent,
};

/**
 * Static default content for the seeded "creative-design" pages, keyed by slug.
 * Drives both the CMS defaults (fallback until edited) and the public route's
 * static fallback (mirrors SOFTWARE_ENTERPRISE_CONTENT).
 */
export const CREATIVE_DESIGN_CONTENT: Record<string, CreativeDesignContent> = {
  "ui-ux-designing": uiUxDesigningContent,
  "product-design": productDesignContent,
  "logo-designing": logoDesigningContent,
  "brand-identity": brandIdentityContent,
  "motion-video-design": motionVideoDesignContent,
};

/** Look up seeded creative-design content by slug. */
export function getCreativeDesignBySlug(
  slug: string
): CreativeDesignContent | undefined {
  return CREATIVE_DESIGN_CONTENT[slug];
}
