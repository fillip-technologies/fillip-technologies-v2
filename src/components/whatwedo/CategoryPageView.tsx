import TrustedBrandsSection from "@/components/performance-marketing/TrustedBrandsSection";
import IndustryHero from "@/components/industries/medical/IndustryHero";
import IndustryChallengesSection from "@/components/industries/medical/IndustryChallengesSection";
import IndustryGrowthEngine from "@/components/industries/medical/IndustryGrowthEngine";
import IndustryProcessTimeline from "@/components/industries/medical/IndustryProcessTimeline";
import IndustryWhyChooseUs from "@/components/industries/medical/IndustryWhyChooseUs";
import IndustryTestimonials from "@/components/industries/medical/IndustryTestimonials";
import IndustryFAQ from "@/components/industries/medical/IndustryFAQ";
import { getContentData } from "@/server/content/queries";
import { getWhatWeDoSectionSpec, whatwedoDefault } from "@/server/content/whatwedo-sections";
import { getGlobalTestimonials } from "@/server/content/global-testimonials";

// Read one category section's CMS content (stored flat under
// `whatwedo.<slug>.<id>`), merged over the generic default, then unflattened
// into the shape the (reused) industry components take.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sectionData(slug: string, id: string): Promise<any> {
  const spec = getWhatWeDoSectionSpec(id)!;
  const flat = await getContentData(`whatwedo.${slug}.${id}`, spec.flatten(whatwedoDefault(slug, id)));
  return spec.unflatten(flat);
}

/**
 * Shared renderer for every /what-we-do/<slug> category page. All categories use
 * this one template — content comes from the CMS (falling back to the generic
 * defaultCategoryData). Reuses the industry section components.
 */
export default async function CategoryPageView({ slug }: { slug: string }) {
  const [hero, challenges, growthEngine, timeline, whyChooseUs, testimonials, faqs, globalTestimonials] = await Promise.all([
    sectionData(slug, "hero"),
    sectionData(slug, "challenges"),
    sectionData(slug, "growthEngine"),
    sectionData(slug, "timeline"),
    sectionData(slug, "whyChooseUs"),
    sectionData(slug, "testimonials"),
    sectionData(slug, "faqs"),
    getGlobalTestimonials(),
  ]);
  // Use the single site-wide testimonials list; keep this page's own heading.
  testimonials.items = globalTestimonials;

  return (
    <main>
      <IndustryHero data={hero} />
      <TrustedBrandsSection />
      <IndustryChallengesSection data={challenges} />
      <IndustryGrowthEngine data={growthEngine} />
      <IndustryProcessTimeline data={timeline} />
      <IndustryWhyChooseUs data={whyChooseUs} />
      <IndustryTestimonials data={testimonials} />
      <IndustryFAQ data={faqs} />
    </main>
  );
}
