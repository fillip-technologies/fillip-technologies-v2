import type { Metadata } from "next";
import StoryHero from "@/components/Our-story/StoryHero";
import StatsSection from "@/components/Our-story/StatsSection";
import StoryTimeline from "@/components/Our-story/StoryTimeline";
import MissionVision from "@/components/Our-story/MissionVision";

export const metadata: Metadata = {
  title: "Our Story | Fillip Technologies",
  description: "Discover the journey of Fillip Technologies. Founded in 2018, we grew from a small local agency into a global digital partner delivering software engineering, SaaS systems, and high-impact digital marketing.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <main className="overflow-hidden bg-background text-heading">
      <StoryHero />
      <StatsSection />
      <StoryTimeline />
      <MissionVision />
    </main>
  );
}
