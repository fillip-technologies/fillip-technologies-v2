import ServicesHub, { type HubGroup } from "@/components/services/ServicesHub";
import { listServicePages } from "@/server/content/servicepage-registry";
import { listPublishedCategories } from "@/server/content/whatwedo-registry";
import {
  getServiceLandingPage,
  getServiceLandingPageSlugs,
} from "@/lib/service-content/repository";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

export const revalidate = 300;

export const generateMetadata = () => pageMetadata("/services");

// Groups are keyed by the CMS category slug that the service pages already carry
// (`categorySlug`), so publishing a page in the admin adds it here automatically.
// Titles/descriptions come from the CMS category where one exists.
const GROUP_ORDER = [
  "web-development",
  "software-enterprise",
  "mobile-app-development",
  "creative-experience-design",
  "seo-performance-marketing",
  "business-solutions",
  "hardware-solutions",
] as const;

const GROUP_FALLBACK: Record<string, { title: string; description: string }> = {
  "web-development": {
    title: "Web Development",
    description: "Websites, ecommerce stores and web applications built to perform.",
  },
  "software-enterprise": {
    title: "Software & Enterprise",
    description: "Custom software, CRM, ERP, SaaS products and API integration.",
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    description: "Android, iOS and cross-platform apps for business and commerce.",
  },
  "creative-experience-design": {
    title: "Design",
    description: "UI/UX, product design, brand identity and motion.",
  },
  "seo-performance-marketing": {
    title: "SEO & Performance Marketing",
    description: "Search, paid media and lead generation campaigns.",
  },
  "business-solutions": {
    title: "Business Solutions",
    description: "Ticketing, SMS and WhatsApp platforms for operations at scale.",
  },
  "hardware-solutions": {
    title: "IT Infrastructure & Hardware",
    description: "Networking, servers, surveillance and system integration.",
  },
};

/**
 * The city landing pages for our own base. These already exist as file-based
 * landing pages but had no inbound internal links anywhere on the site, so the
 * hub is where they become reachable. Derived from the landing-page data itself
 * (`city.name`), so a new Patna page appears here without touching this file.
 */
async function patnaServiceLinks() {
  const slugs = await getServiceLandingPageSlugs();
  const pages = await Promise.all(slugs.map((slug) => getServiceLandingPage(slug)));
  return pages
    .filter((page) => page?.city?.name === "Patna")
    .map((page) => ({
      label: page!.seo.title.replace(/\s*\|.*$/, "").replace(/^Best\s+/i, ""),
      href: `/${page!.slug}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export default async function ServicesPage() {
  const [servicePages, categories, patnaLinks, jsonLd] = await Promise.all([
    listServicePages(),
    listPublishedCategories("whatwedo"),
    patnaServiceLinks(),
    pageJsonLd("/services"),
  ]);

  const categoryMeta = new Map(categories.map((c) => [c.slug, c]));
  const published = servicePages.filter((page) => page.published);

  const groups: HubGroup[] = GROUP_ORDER.map((slug) => {
    const links = published
      .filter((page) => page.categorySlug === slug)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title))
      .map((page) => ({ label: page.title, href: `${page.urlPrefix}/${page.slug}` }));

    const cms = categoryMeta.get(slug);
    const fallback = GROUP_FALLBACK[slug];
    return {
      title: cms?.label || fallback.title,
      description: cms?.description || fallback.description,
      links,
    };
  }).filter((group) => group.links.length > 0);

  if (patnaLinks.length) {
    groups.push({
      title: "Services in Patna",
      description:
        "Our head office is in Patna. These pages cover the same services for businesses based in and around the city.",
      links: patnaLinks,
    });
  }

  // Standalone routes that aren't CMS service pages but are real services.
  groups.push({
    title: "Also from Fillip",
    description: "Standalone services with their own dedicated pages.",
    links: [
      { label: "Graphic Designing", href: "/graphic-designing" },
      { label: "Performance Marketing", href: "/performance-marketing" },
      { label: "Social Media Marketing", href: "/social-media-marketing" },
      { label: "Technical SEO", href: "/technical-seo" },
      { label: "AI Chatbots", href: "/aichatbots" },
      { label: "AI Consulting", href: "/ai-consulting" },
      { label: "Workflow Automation", href: "/workflow-automation" },
    ],
  });

  return (
    <>
      {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
      <ServicesHub groups={groups} />
    </>
  );
}
