import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChallengePage from "@/components/challenges/ChallengePage";
import type { ChallengeContent } from "@/data/challenges/index";
import { getChallengeBySlug } from "@/data/challenges/index";
import {
  getServicePage,
  getServicePageData,
} from "@/server/content/servicepage-registry";


export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getServicePage(slug);
  if (page) return { title: `${page.title} | Fillip Technologies` };
  return {};
}

export default async function ChallengeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DB-managed page wins; unknown slugs fall back to the static content (zero
  // regression for the seeded pages); truly-unknown slugs 404.
  const page = await getServicePage(slug);
  if (page) {
    if (page.template !== "challenges") notFound(); // lives under another route
    if (!page.published) notFound(); // drafts are visible only via /preview
    const data = (await getServicePageData(slug, "challenges")) as ChallengeContent;
    // `title`/`tags` live on the ServicePage record + seed data, not in the
    // section content, so backfill them so the page heading/eyebrow aren't blank.
    const seed = getChallengeBySlug(slug);
    return (
      <ChallengePage
        data={{
          ...data,
          title: data.title || page.title || seed?.title || "",
          tags: data.tags?.length ? data.tags : seed?.tags ?? [],
          summary: data.summary || seed?.summary || "",
        }}
      />
    );
  }

  const staticData = getChallengeBySlug(slug);
  if (!staticData) notFound();
  return <ChallengePage data={staticData} />;
}
