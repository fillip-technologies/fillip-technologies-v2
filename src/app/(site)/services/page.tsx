import ServicesHub, { type HubGroup } from "@/components/services/ServicesHub";
import { listServicePages } from "@/server/content/servicepage-registry";
import {
  getMenuHrefsByCategory,
  listPublishedCategories,
} from "@/server/content/whatwedo-registry";
import { listEnabledLocationPages } from "@/server/location-pages/registry";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

export const revalidate = 300;

export const generateMetadata = () => pageMetadata("/services");

// Groups are keyed by the CMS category slug that the service pages already carry
// (`categorySlug`). A group lists the published pages that are in that column's
// hover menu, so the hub mirrors the menu; other published pages go under "More
// service pages". Titles/descriptions come from the CMS category where one exists.
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
 * The city landing pages for our own base. They had no inbound internal links
 * anywhere on the site, so the hub is where they become reachable. Derived from
 * the admin-managed location pages (`city.name`), so a new Patna page created
 * under Content → Locations appears here without touching this file.
 */
async function patnaServiceLinks() {
  const pages = await listEnabledLocationPages();
  return pages
    .filter((page) => page.city.name.trim().toLowerCase() === "patna")
    .map((page) => ({
      label: page.seo.title.replace(/\s*\|.*$/, "").replace(/^Best\s+/i, ""),
      href: `/${page.slug}`,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export default async function ServicesPage() {
  const [servicePages, categories, menuHrefs, patnaLinks, jsonLd] = await Promise.all([
    listServicePages(),
    listPublishedCategories("whatwedo"),
    getMenuHrefsByCategory([...GROUP_ORDER]),
    patnaServiceLinks(),
    pageJsonLd("/services"),
  ]);

  const categoryMeta = new Map(categories.map((c) => [c.slug, c]));
  const published = servicePages.filter((page) => page.published);
  const hrefOf = (page: (typeof published)[number]) => `${page.urlPrefix}/${page.slug}`;
  const inMenu = (page: (typeof published)[number]) =>
    !!page.categorySlug && (menuHrefs.get(page.categorySlug)?.has(hrefOf(page)) ?? false);

  const groups: HubGroup[] = GROUP_ORDER.map((slug) => {
    const links = published
      .filter((page) => page.categorySlug === slug && inMenu(page))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title))
      .map((page) => ({ label: page.title, href: hrefOf(page) }));

    const cms = categoryMeta.get(slug);
    const fallback = GROUP_FALLBACK[slug];
    return {
      title: cms?.label || fallback.title,
      description: cms?.description || fallback.description,
      links,
    };
  }).filter((group) => group.links.length > 0);

  // Live pages kept out of the hover menu (e.g. city-specific landing pages) still
  // get an internal link from the hub, just outside the curated column groups.
  const unlisted = published
    .filter((page) => !inMenu(page))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((page) => ({ label: page.title, href: hrefOf(page) }));
  if (unlisted.length) {
    groups.push({
      title: "More service pages",
      description: "Further pages on our services, including location-specific ones.",
      links: unlisted,
    });
  }

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
