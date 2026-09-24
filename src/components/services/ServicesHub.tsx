import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type HubLink = { label: string; href: string };
export type HubGroup = { title: string; description: string; links: HubLink[] };

/**
 * The /services hub. It is a directory, not a service page: every entry links to
 * a page that already exists in the project, so crawlers and visitors get one
 * reachable index of the catalogue instead of a duplicate of
 * /website-development (which is what this route used to render).
 */
export default function ServicesHub({ groups }: { groups: HubGroup[] }) {
  return (
    <main className="bg-background text-heading">
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          What we do
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Services
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
          Websites, custom software, mobile apps, design, marketing, AI automation
          and IT infrastructure — built and supported by one team. Choose a service
          below to see how we approach it.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.title}
              className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <h2 className="text-xl font-bold tracking-tight">{group.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-body">
                {group.description}
              </p>
              <ul className="mt-6 flex flex-col gap-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-heading transition hover:bg-surface hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className="size-4 shrink-0 opacity-0 transition group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
