import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, HeartHandshake, Lightbulb, MapPin, Sparkles, UsersRound } from "lucide-react";
import CareerApplicationForm from "@/components/form/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Careers at Fillip Technologies",
  description: "Explore career opportunities at Fillip Technologies and help build thoughtful digital products, platforms, and growth experiences.",
  alternates: { canonical: "/others/carrer" },
};

const roles = [
  { title: "Frontend Developer", type: "Full time", location: "Patna / Hybrid", description: "Build responsive, accessible interfaces using React, Next.js and modern frontend practices." },
  { title: "Backend Developer", type: "Full time", location: "Patna / Hybrid", description: "Design reliable APIs, integrations and business systems that support scalable digital products." },
  { title: "UI/UX Designer", type: "Full time", location: "Patna / Hybrid", description: "Turn research and product requirements into clear, useful and polished customer experiences." },
  { title: "SEO Specialist", type: "Full time", location: "Patna / Hybrid", description: "Improve technical foundations, content visibility and measurable organic search performance." },
  { title: "Digital Marketing Executive", type: "Full time", location: "Patna / Hybrid", description: "Plan, launch and optimize campaigns across paid, social and performance marketing channels." },
  { title: "Business Development Executive", type: "Full time", location: "Patna / Hybrid", description: "Understand client goals, shape the right solution and build trusted business relationships." },
];

const values = [
  { icon: Lightbulb, title: "Think with purpose", description: "Good ideas begin with curiosity and become valuable through clear execution." },
  { icon: UsersRound, title: "Build together", description: "Designers, developers and strategists solve stronger problems as one team." },
  { icon: Sparkles, title: "Keep improving", description: "We learn continuously, share feedback openly and raise the quality of our work." },
  { icon: HeartHandshake, title: "Care about outcomes", description: "We take ownership of the experience we create for clients and their customers." },
];

export default function CareerPage() {
  return (
    <main className="bg-white text-slate-950">
      <section className="relative overflow-hidden bg-navy pb-24 pt-40 text-white lg:pb-32 lg:pt-48">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "76px 76px" }} />
        <div className="absolute left-1/2 top-0 h-[500px] w-[850px] -translate-x-1/2 rounded-full bg-primary/30 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Careers at Fillip Technologies</p>
          <div className="mt-7 grid items-end gap-10 lg:grid-cols-[1fr_0.65fr]"><h1 className="max-w-4xl text-6xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">Do meaningful work with <span className="text-accent">good people.</span></h1><div><p className="max-w-lg text-lg leading-8 text-white/65">Join a team building digital products, intelligent systems and growth experiences for ambitious businesses.</p><Link href="#open-roles" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy">View open roles <ArrowDown className="size-4" /></Link></div></div>
        </div>
      </section>

      <section className="py-24 lg:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div><span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">People behind the work</span><h2 className="mt-5 text-5xl font-bold leading-none tracking-tight lg:text-6xl">A team that learns, builds and grows together.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">At Fillip Technologies, thoughtful collaboration matters as much as technical skill. We give people room to ask better questions, own their work and create solutions with visible business impact.</p><div className="mt-10 grid grid-cols-3 gap-5 border-t border-slate-200 pt-8"><div><strong className="text-3xl text-primary">10+</strong><p className="mt-1 text-sm text-slate-500">Disciplines</p></div><div><strong className="text-3xl text-primary">Real</strong><p className="mt-1 text-sm text-slate-500">Ownership</p></div><div><strong className="text-3xl text-primary">One</strong><p className="mt-1 text-sm text-slate-500">Team</p></div></div></div><div className="grid grid-cols-2 gap-5"><div className="overflow-hidden rounded-[32px] bg-slate-100 pt-6"><Image src="/images/team/team1.png" alt="Fillip Technologies team member" width={500} height={650} className="h-[430px] w-full object-cover object-top" /></div><div className="mt-14 overflow-hidden rounded-[32px] bg-primary/5 pt-6"><Image src="/images/team/team2.png" alt="Fillip Technologies team member" width={500} height={650} className="h-[430px] w-full object-cover object-top" /></div></div></div></div></section>

      <section className="border-y border-slate-200 bg-slate-50 py-24"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="max-w-3xl"><span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">How we work</span><h2 className="mt-5 text-5xl font-bold tracking-tight">A culture built for thoughtful progress.</h2></div><div className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">{values.map(({icon:Icon,title,description}) => <div key={title} className="bg-white p-7 lg:p-8"><span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-5" /></span><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></div>)}</div></div></section>

      <section id="open-roles" className="py-24 lg:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Open positions</span><h2 className="mt-5 text-5xl font-bold tracking-tight">Find your next role.</h2></div><p className="max-w-md text-lg leading-8 text-slate-600">We look for curious people who care about craft, communication and meaningful outcomes.</p></div><div className="mt-14 grid gap-5 md:grid-cols-2">{roles.map((role) => <article key={role.title} className="group rounded-[24px] border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"><div className="flex items-start justify-between gap-5"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">{role.type}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{role.location}</span></div><h3 className="mt-5 text-2xl font-bold">{role.title}</h3></div><a href={`#apply`} aria-label={`Apply for ${role.title}`} className="grid size-11 shrink-0 place-items-center rounded-full border border-slate-200 transition group-hover:border-primary group-hover:bg-primary group-hover:text-white"><ArrowUpRight className="size-4" /></a></div><p className="mt-4 max-w-xl leading-7 text-slate-600">{role.description}</p><div className="mt-7 flex items-center gap-2 text-sm font-semibold text-slate-700"><MapPin className="size-4 text-primary" />{role.location}</div></article>)}</div><div className="mt-10 flex items-center gap-3 rounded-2xl border border-dashed border-primary/25 bg-primary/[0.035] p-5 text-sm text-slate-600"><BriefcaseBusiness className="size-5 shrink-0 text-primary" /><p>Do not see the perfect role? Select <strong>General application</strong> below and tell us how you can contribute.</p></div></div></section>

      <CareerApplicationForm roles={[...roles.map((role) => role.title), "General application"]} />
    </main>
  );
}
