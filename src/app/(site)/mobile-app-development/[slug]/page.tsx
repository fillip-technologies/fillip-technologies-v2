import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MobileAppDevelopmentPage from "@/components/mobile-app-development/MobileAppDevelopmentPage";
import type { MobileAppDevelopmentContent } from "@/data/mobile-app-development";
import { MOBILE_CONTENT } from "@/server/content/mobileapp-sections";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";
import { pageMetadata, pageJsonLd } from "@/lib/seo/page-metadata";
import { JsonLdScript } from "@/lib/seo/schema";

import {
  androidMobileAppContent,
  iosMobileAppContent,
  enterpriseMobileAppContent,
  ecommerceMobileAppContent,
} from "@/data/mobile-app-development";
import { SiteContentModel } from "@/server/db/models";
import { invalidateSnapshot } from "@/server/content/snapshot-cache";

// Content is CMS-managed, so render fresh (mirrors the /services pages).
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return pageMetadata(`/mobile-app-development/${slug}`, { title: `${page.title} | Fillip Technologies` });
  return {};
}

export default async function MobileAppSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the originally-static pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "mobile-app") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "mobile-app")) as MobileAppDevelopmentContent;

    // Ensure Android page uses all 15 FAQs and evicts any stale cached/DB versions
    if (slug === "android") {
      if (!data.faq?.faqs || data.faq.faqs.length < 15) {
        data.faq = androidMobileAppContent.faq;
        try {
          await SiteContentModel.updateOne(
            { key: "servicepage.android.faq" },
            { $set: { data: androidMobileAppContent.faq, updated_at: new Date() } },
            { upsert: true }
          );
          await invalidateSnapshot("content:servicepage.android.faq");
        } catch {
          // best-effort DB update
        }
      }

      if (!data.growthPartner?.rows || data.growthPartner.rows.length < 7) {
        data.growthPartner = androidMobileAppContent.growthPartner;
        try {
          await SiteContentModel.updateOne(
            { key: "servicepage.android.growthPartner" },
            { $set: { data: androidMobileAppContent.growthPartner, updated_at: new Date() } },
            { upsert: true }
          );
          await invalidateSnapshot("content:servicepage.android.growthPartner");
        } catch {
          // best-effort DB update
        }
      }
    }

    // Ensure iOS page uses all 15 FAQs and evicts any stale cached/DB versions
    if (slug === "ios") {
      if (!data.faq?.faqs || data.faq.faqs.length < 15) {
        data.faq = iosMobileAppContent.faq;
        try {
          await SiteContentModel.updateOne(
            { key: "servicepage.ios.faq" },
            { $set: { data: iosMobileAppContent.faq, updated_at: new Date() } },
            { upsert: true }
          );
          await invalidateSnapshot("content:servicepage.ios.faq");
        } catch {
          // best-effort DB update
        }
      }
    }

    // Ensure Enterprise page uses all 15 FAQs and evicts any stale cached/DB versions
    if (slug === "enterprise") {
      if (!data.faq?.faqs || data.faq.faqs.length < 15) {
        data.faq = enterpriseMobileAppContent.faq;
        try {
          await SiteContentModel.updateOne(
            { key: "servicepage.enterprise.faq" },
            { $set: { data: enterpriseMobileAppContent.faq, updated_at: new Date() } },
            { upsert: true }
          );
          await invalidateSnapshot("content:servicepage.enterprise.faq");
        } catch {
          // best-effort DB update
        }
      }
    }

    // Ensure Ecommerce page uses all 15 FAQs and evicts any stale cached/DB versions
    if (slug === "ecommerce") {
      if (!data.faq?.faqs || data.faq.faqs.length < 15) {
        data.faq = ecommerceMobileAppContent.faq;
        try {
          await SiteContentModel.updateOne(
            { key: "servicepage.ecommerce.faq" },
            { $set: { data: ecommerceMobileAppContent.faq, updated_at: new Date() } },
            { upsert: true }
          );
          await invalidateSnapshot("content:servicepage.ecommerce.faq");
        } catch {
          // best-effort DB update
        }
      }
    }

    if (!data.growthPartner && MOBILE_CONTENT[slug]?.growthPartner) {
      data.growthPartner = MOBILE_CONTENT[slug].growthPartner;
    }

    const jsonLd = await pageJsonLd(`/mobile-app-development/${slug}`);
    return (
      <>
        {jsonLd.length ? <JsonLdScript data={jsonLd} /> : null}
        <MobileAppDevelopmentPage data={data} />
      </>
    );
  }

  const staticData = MOBILE_CONTENT[slug];
  if (!staticData) notFound();
  return <MobileAppDevelopmentPage data={staticData} />;
}
