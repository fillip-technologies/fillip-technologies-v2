import type { SectionHeading, TechCategory } from "@/data/hire-developers/types";
import HighlightTitle from "./HighlightTitle";
import { DynamicIcon } from "./icons";

function TechChip({ name }: { name: string }) {
  return (
    <li className="group/chip inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-[#0242A2] hover:shadow-[0_6px_16px_rgba(15,111,255,0.15)] sm:text-[13px]">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#0242A2] to-[#38BDF8] transition-transform duration-200 group-hover/chip:scale-150" />
      {name}
    </li>
  );
}

function CategoryCard({
  category,
  index,
  connector,
  className = "",
}: {
  category: TechCategory;
  index: number;
  connector?: "left" | "right" | "top";
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(7,47,55,0.05)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(2,66,162,0.12)] sm:p-6 ${className}`}
    >
      {/* Connector to the hub (desktop only) */}
      {connector === "right" && (
        <span aria-hidden className="absolute top-1/2 -right-10 hidden h-px w-10 bg-gradient-to-r from-blue-200 to-blue-300 lg:block">
          <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-[#0F6FFF]" />
        </span>
      )}
      {connector === "left" && (
        <span aria-hidden className="absolute top-1/2 -left-10 hidden h-px w-10 bg-gradient-to-l from-blue-200 to-blue-300 lg:block">
          <span className="absolute -left-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-[#0F6FFF]" />
        </span>
      )}
      {connector === "top" && (
        <span aria-hidden className="absolute -top-8 left-1/2 hidden h-8 w-px bg-gradient-to-t from-blue-200 to-blue-300 lg:block">
          <span className="absolute -left-[3px] -top-1 h-[7px] w-[7px] rounded-full bg-[#0F6FFF]" />
        </span>
      )}

      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0242A2] ring-1 ring-blue-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#0242A2] group-hover:to-[#38BDF8] group-hover:text-white group-hover:ring-transparent">
          <DynamicIcon name={category.icon} className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
        </span>
        <div className="min-w-0">
          <span className="text-[11px] font-semibold tracking-wider text-[#0F6FFF]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-base font-semibold leading-snug text-slate-900">{category.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{category.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {category.items.map((item) => (
          <TechChip key={item.name} name={item.name} />
        ))}
      </ul>
    </div>
  );
}

function HubCard({ category }: { category: TechCategory }) {
  return (
    <div className="relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-blue-200/70 bg-gradient-to-b from-blue-50 via-white to-white p-6 text-center shadow-[0_28px_80px_rgba(15,111,255,0.16)] sm:p-8">
      {/* Orb */}
      <div aria-hidden className="relative mt-2 flex h-40 w-40 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-blue-200/70" />
        <span className="absolute inset-5 rounded-full border border-blue-200" />
        <span className="absolute inset-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 blur-md" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0242A2] via-[#0F6FFF] to-[#38BDF8] text-white shadow-[0_12px_30px_rgba(15,111,255,0.35)]">
          <DynamicIcon name={category.icon} className="h-7 w-7" />
        </span>
        {/* Orbit nodes */}
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38BDF8] ring-4 ring-white" />
        <span className="absolute bottom-[14%] left-[6%] h-2 w-2 rounded-full bg-[#0F6FFF] ring-4 ring-white" />
        <span className="absolute bottom-[14%] right-[6%] h-2 w-2 rounded-full bg-[#0242A2] ring-4 ring-white" />
      </div>

      <span className="mt-6 text-[11px] font-semibold tracking-wider text-[#0F6FFF]">01 · CORE</span>
      <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{category.title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{category.description}</p>
      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {category.items.map((item) => (
          <TechChip key={item.name} name={item.name} />
        ))}
      </ul>
    </div>
  );
}

// The first category is the featured hub; the next five sit around it.
export default function HireTechStack({ content }: { content: SectionHeading & { categories: TechCategory[] } }) {
  const [hub, frameworks, backend, data, cloud, integrations] = content.categories;

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/50 via-cyan-100/40 to-transparent blur-[120px]"
      />

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#0242A2]">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            <HighlightTitle title={content.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {content.description}
          </p>
        </div>

        {/* Ecosystem: hub in the centre, layers either side, integrations below */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-x-10 lg:gap-y-8">
          <div className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <HubCard category={hub} />
          </div>
          <CategoryCard category={frameworks} index={1} connector="right" className="lg:col-start-1 lg:row-start-1" />
          <CategoryCard category={backend} index={2} connector="right" className="lg:col-start-1 lg:row-start-2" />
          <CategoryCard category={data} index={3} connector="left" className="lg:col-start-3 lg:row-start-1" />
          <CategoryCard category={cloud} index={4} connector="left" className="lg:col-start-3 lg:row-start-2" />
          <CategoryCard
            category={integrations}
            index={5}
            connector="top"
            className="md:col-span-2 lg:col-span-3 lg:mx-auto lg:w-full lg:max-w-3xl"
          />
        </div>
      </div>
    </section>
  );
}
