import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChallengePage from "@/components/challenges/ChallengePage";
import { getChallengeBySlug, getChallenges } from "@/data/challenges/index";

type ChallengeSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getChallenges().map((challenge) => ({ slug: challenge.slug }));
}

export async function generateMetadata({
  params,
}: ChallengeSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) return {};

  return {
    title: `${challenge.title} | Challenges We Solve | Fillip Technologies`,
    description: challenge.summary,
  };
}

export default async function ChallengeSlugPage({ params }: ChallengeSlugPageProps) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) notFound();

  return <ChallengePage data={challenge} />;
}
