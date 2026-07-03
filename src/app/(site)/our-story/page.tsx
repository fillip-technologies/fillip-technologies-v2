import type { Metadata } from "next";
import StoryHero from "@/components/Our-story/StoryHero";
import StatsSection from "@/components/Our-story/StatsSection";
import StoryTimeline from "@/components/Our-story/StoryTimeline";
import MissionVision from "@/components/Our-story/MissionVision";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";

export const metadata: Metadata = {
  title: "Our Story | Fillip Technologies",
  description: "Discover the journey of Fillip Technologies. Founded in 2018, we grew from a small local agency into a global digital partner delivering software engineering, SaaS systems, and high-impact digital marketing.",
  alternates: { canonical: "/our-story" },
};

// Always render the latest CMS content (edits show without a rebuild).
export const dynamic = "force-dynamic";

function sec(id: string) {
  return getContentData(`page.our-story.${id}`, pageSectionDefaults(getPageSection("our-story", id)!));
}

export default async function OurStoryPage() {
  const [hero, stats, timeline, missionvision] = await Promise.all([
    sec("hero"),
    sec("stats"),
    sec("timeline"),
    sec("missionvision"),
  ]);

  return (
    <main className="overflow-hidden bg-background text-heading">
      <StoryHero content={hero} />
      <StatsSection content={stats} />
      <StoryTimeline content={timeline} />
      <MissionVision content={missionvision} />
    </main>
  );
}
