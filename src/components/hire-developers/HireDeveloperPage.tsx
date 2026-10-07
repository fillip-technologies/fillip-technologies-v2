import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHireRoleContent } from "@/data/hire-developers";
import type { HireRoleContent } from "@/data/hire-developers/types";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { buildJsonLdForPage, JsonLdScript } from "@/lib/seo/schema";
import type { SeoPageRecord } from "@/lib/seo/types";
import HireHero from "./HireHero";
import HireCapabilities from "./HireCapabilities";
import HireTechStack from "./HireTechStack";
import HireSpecialists from "./HireSpecialists";
import HireUseCases from "./HireUseCases";
import HireWhyFillip from "./HireWhyFillip";
import HireEngagementModels from "./HireEngagementModels";
import HireProcess from "./HireProcess";
import HireTeamIntegration from "./HireTeamIntegration";
import HireProjects from "./HireProjects";
import HireSecurity from "./HireSecurity";
import HireCost from "./HireCost";
import HireFaq from "./HireFaq";
import HireFinalCta from "./HireFinalCta";

function toSeoRecord(c: HireRoleContent): SeoPageRecord {
  return {
    path: c.path,
    kind: "landing",
    status: "published",
    title: c.seo.metaTitle,
    description: c.seo.metaDescription,
    keywords: c.seo.keywords,
    canonical: c.path,
    robots: { index: true, follow: true },
    openGraph: { image: c.images.heroImage?.src, type: "website" },
    serviceName: c.seo.title,
    h1: c.seo.title,
    faq: c.sections.showFaq ? c.faq.items : [],
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: c.seo.title, item: c.path },
    ],
    schema: { webpage: true, service: true, breadcrumb: true, faq: Boolean(c.sections.showFaq) },
    source: `static:hire-developers/${c.slug}`,
  };
}

/**
 * Master Hire Developers page. Every /hire-*-developers route renders this
 * with its role slug; all content comes from src/data/hire-developers.
 */
export default function HireDeveloperPage({ slug }: { slug: string }) {
  const c = getHireRoleContent(slug);
  if (!c) notFound();
  const show = c.sections;
  const img = c.images;

  // The case-study screenshot comes from the role's image slot, so a missing
  // file falls back to the placeholder slot instead of a broken image.
  const featured = c.caseStudies.featured
    ? {
        ...c.caseStudies.featured,
        image:
          img.caseStudyImage && c.caseStudies.featured.image
            ? { ...c.caseStudies.featured.image, src: img.caseStudyImage.src, alt: img.caseStudyImage.alt }
            : null,
      }
    : null;

  return (
    <>
      <JsonLdScript data={buildJsonLdForPage(toSeoRecord(c))} />
      <main>
        <HireHero hero={c.hero} image={img.heroImage} />
        {show.showCapabilities && <HireCapabilities content={c.capabilities} />}
        {show.showTechnologyStack && <HireTechStack content={c.techStack} />}
        {show.showSpecialistTypes && <HireSpecialists content={c.specialists} image={img.specialistImage} />}
        {show.showUseCases && <HireUseCases content={c.useCases} image={img.solutionsImage} />}
        {show.showWhyFillip && <HireWhyFillip content={c.whyFillip} image={img.whyFillipImage} />}
        {show.showEngagementModels && <HireEngagementModels content={c.engagementModels} image={img.engagementImage} />}
        {show.showHiringProcess && <HireProcess content={c.hiringProcess} image={img.hiringImage} />}
        {show.showCollaboration && <HireTeamIntegration content={c.collaboration} image={img.collaborationImage} />}
        {show.showCaseStudies && (featured || c.caseStudies.secondary.length > 0) && (
          <HireProjects content={{ ...c.caseStudies, featured }} />
        )}
        {show.showSecuritySection && <HireSecurity content={c.security} image={img.securityImage} />}
        {show.showCostSection && <HireCost content={c.cost} />}
        {show.showFaq && <HireFaq content={c.faq} />}
        {show.showFinalCta && <HireFinalCta content={c.finalCta} image={img.finalCtaImage} />}
      </main>
    </>
  );
}

export function hireDeveloperMetadata(slug: string): Metadata {
  const c = getHireRoleContent(slug);
  return c ? buildSeoMetadata(toSeoRecord(c)) : {};
}

// Used by each /hire-*-developers route file.
export function createHirePage(slug: string) {
  return {
    generateMetadata: (): Metadata => hireDeveloperMetadata(slug),
    Page: function HireRolePage() {
      return <HireDeveloperPage slug={slug} />;
    },
  };
}
