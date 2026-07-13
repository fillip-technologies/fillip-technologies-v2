import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, HeartHandshake, Lightbulb, MapPin, Sparkles, UsersRound } from "lucide-react";
import CareerApplicationForm from "@/components/form/CareerApplicationForm";
import { getContentData } from "@/server/content/queries";
import { getPageSection, pageSectionDefaults } from "@/server/content/page-sections";

export const metadata: Metadata = {
  title: "Careers at Fillip Technologies",
  description: "Explore career opportunities at Fillip Technologies and help build thoughtful digital products, platforms, and growth experiences.",
  alternates: { canonical: "/others/carrer" },
};

// Always render the latest CMS content (edits show without a rebuild).
export const dynamic = "force-dynamic";

// Icons for the value cards, applied by position (kept in code).
const VALUE_ICONS = [Lightbulb, UsersRound, Sparkles, HeartHandshake] as const;

type Role = { title: string; type: string; location: string; description: string };
type Value = { title: string; description: string };

function sec(id: string) {
  return getContentData(`page.careers.${id}`, pageSectionDefaults(getPageSection("careers", id)!));
}

export default async function CareerPage() {
  const [hero, team, valuesSection, rolesSection] = await Promise.all([
    sec("hero"),
    sec("team"),
    sec("values"),
    sec("roles"),
  ]);

  const values = (valuesSection.values as Value[]) ?? [];
  const roles = (rolesSection.roles as Role[]) ?? [];

  return (
    <main className="bg-white text-slate-950">
      <section className="relative overflow-hidden bg-navy pb-24 pt-40 text-white lg:pb-32 lg:pt-48">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "76px 76px" }} />
        <div className="absolute left-1/2 top-0 h-[500px] w-[850px] -translate-x-1/2 rounded-full bg-primary/30 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">{hero.eyebrow as string}</p>
          <div className="mt-7 grid items-end gap-10 lg:grid-cols-[1fr_0.65fr]"><h1 className="max-w-4xl text-6xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">{hero.headingLead as string} <span className="text-accent">{hero.headingHighlight as string}</span></h1><div><p className="max-w-lg text-lg leading-8 text-white/65">{hero.subheadline as string}</p><Link href="#open-roles" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy">{hero.ctaLabel as string} <ArrowDown className="size-4" /></Link></div></div>
        </div>
      </section>

      <section className="py-24 lg:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div><span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{team.eyebrow as string}</span><h2 className="mt-5 text-5xl font-bold leading-none tracking-tight lg:text-6xl">{team.heading as string}</h2><p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">{team.description as string}</p><div className="mt-10 grid grid-cols-3 gap-5 border-t border-slate-200 pt-8"><div><strong className="text-3xl text-primary">{team.stat1Value as string}</strong><p className="mt-1 text-sm text-slate-500">{team.stat1Label as string}</p></div><div><strong className="text-3xl text-primary">{team.stat2Value as string}</strong><p className="mt-1 text-sm text-slate-500">{team.stat2Label as string}</p></div><div><strong className="text-3xl text-primary">{team.stat3Value as string}</strong><p className="mt-1 text-sm text-slate-500">{team.stat3Label as string}</p></div></div></div><div className="grid grid-cols-2 gap-5"><div className="overflow-hidden rounded-[32px] bg-slate-100 pt-6"><Image src={team.image1 as string} alt="Fillip Technologies team member" width={500} height={650} className="h-[430px] w-full object-cover object-top" /></div><div className="mt-14 overflow-hidden rounded-[32px] bg-primary/5 pt-6"><Image src={team.image2 as string} alt="Fillip Technologies team member" width={500} height={650} className="h-[430px] w-full object-cover object-top" /></div></div></div></div></section>

      <section className="border-y border-slate-200 bg-slate-50 py-24"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="max-w-3xl"><span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{valuesSection.eyebrow as string}</span><h2 className="mt-5 text-5xl font-bold tracking-tight">{valuesSection.heading as string}</h2></div><div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">{values.map(({title,description}, i) => { const Icon = VALUE_ICONS[i % VALUE_ICONS.length]; return <div key={title || i} className="bg-white p-7 lg:p-8"><span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></span><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></div>; })}</div></div></section>

      <section id="open-roles" className="py-24 lg:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{rolesSection.eyebrow as string}</span><h2 className="mt-5 text-5xl font-bold tracking-tight">{rolesSection.heading as string}</h2></div><p className="max-w-md text-lg leading-8 text-slate-600">{rolesSection.description as string}</p></div><div className="mt-14 grid gap-5 md:grid-cols-2">{roles.map((role, i) => <article key={role.title || i} className="group rounded-[24px] border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"><div className="flex items-start justify-between gap-5"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">{role.type}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{role.location}</span></div><h3 className="mt-5 text-2xl font-bold">{role.title}</h3></div><a href={`#apply`} aria-label={`Apply for ${role.title}`} className="grid size-11 shrink-0 place-items-center rounded-full border border-slate-200 transition group-hover:border-primary group-hover:bg-primary group-hover:text-white"><ArrowUpRight className="size-4" /></a></div><p className="mt-4 max-w-xl leading-7 text-slate-600">{role.description}</p><div className="mt-7 flex items-center gap-2 text-sm font-semibold text-slate-700"><MapPin className="size-4 text-primary" />{role.location}</div></article>)}</div><div className="mt-10 flex items-center gap-3 rounded-2xl border border-dashed border-primary/25 bg-primary/[0.035] p-5 text-sm text-slate-600"><BriefcaseBusiness className="size-5 shrink-0 text-primary" /><p>{rolesSection.note as string}</p></div></div></section>

      <CareerApplicationForm roles={[...roles.map((role) => role.title), "General application"]} />
    </main>
  );
}
