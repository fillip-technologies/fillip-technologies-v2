import Link from "next/link";
import {
  Home,
  Menu,
  FileText,
  Building2,
  LayoutGrid,
  Boxes,
  Code,
  Smartphone,
  Server,
  Palette,
  Search,
  Puzzle,
} from "lucide-react";

export const metadata = { title: "CMS — Admin" };

// Per-card accent classes. Kept as literal strings so Tailwind picks them up.
const ACCENT: Record<string, { chip: string; hover: string }> = {
  blue: { chip: "bg-blue-500/10 text-blue-600", hover: "hover:border-blue-400/60" },
  cyan: { chip: "bg-cyan-500/10 text-cyan-600", hover: "hover:border-cyan-400/60" },
  violet: { chip: "bg-violet-500/10 text-violet-600", hover: "hover:border-violet-400/60" },
  indigo: { chip: "bg-indigo-500/10 text-indigo-600", hover: "hover:border-indigo-400/60" },
  pink: { chip: "bg-pink-500/10 text-pink-600", hover: "hover:border-pink-400/60" },
  emerald: { chip: "bg-emerald-500/10 text-emerald-600", hover: "hover:border-emerald-400/60" },
  amber: { chip: "bg-amber-500/10 text-amber-600", hover: "hover:border-amber-400/60" },
  sky: { chip: "bg-sky-500/10 text-sky-600", hover: "hover:border-sky-400/60" },
  orange: { chip: "bg-orange-500/10 text-orange-600", hover: "hover:border-orange-400/60" },
  teal: { chip: "bg-teal-500/10 text-teal-600", hover: "hover:border-teal-400/60" },
  rose: { chip: "bg-rose-500/10 text-rose-600", hover: "hover:border-rose-400/60" },
};

const GROUP_DOT: Record<string, string> = {
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  orange: "bg-orange-500",
  teal: "bg-teal-500",
};

type Area = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  accent: keyof typeof ACCENT;
};

// CMS hub, grouped so each area maps clearly to a part of the public site.
const CMS_GROUPS: { title: string; dot: keyof typeof GROUP_DOT; areas: Area[] }[] = [
  {
    title: "Site pages",
    dot: "blue",
    areas: [
      {
        href: "/admin/cms/home",
        label: "Home Page",
        description: "Edit the hero, headings and sections on the public home page.",
        icon: Home,
        accent: "blue",
      },
      {
        href: "/admin/cms/pages",
        label: "About Pages",
        description: "Edit the Our Story, Portfolio and Our Culture pages.",
        icon: FileText,
        accent: "cyan",
      },
    ],
  },
  {
    title: "What We Do menu",
    dot: "violet",
    areas: [
      {
        href: "/admin/cms/category/web-development",
        label: "Web Development",
        description: "Pages under the Web Development column (e.g. /services/ecommerce-development).",
        icon: Code,
        accent: "blue",
      },
      {
        href: "/admin/cms/category/mobile-app-development",
        label: "Mobile App Development",
        description: "Pages under the Mobile App column (e.g. /mobile-app-development/android).",
        icon: Smartphone,
        accent: "violet",
      },
      {
        href: "/admin/cms/category/software-enterprise",
        label: "Software & Enterprise",
        description: "Pages under the Software & Enterprise column (e.g. /software-development/crm-development).",
        icon: Server,
        accent: "indigo",
      },
      {
        href: "/admin/cms/category/creative-experience-design",
        label: "Creative Experience Design",
        description: "Pages under the Creative Design column (e.g. /design/ui-ux-designing).",
        icon: Palette,
        accent: "pink",
      },
      {
        href: "/admin/cms/category/seo-performance-marketing",
        label: "SEO & Performance Marketing",
        description: "Pages under the SEO & Marketing column (e.g. /marketing/technical-seo).",
        icon: Search,
        accent: "emerald",
      },
      {
        href: "/admin/cms/category/challenges-we-solve",
        label: "Challenges We Solve",
        description: "Pages under the Challenges column (e.g. /challenges/low-organic-traffic).",
        icon: Puzzle,
        accent: "amber",
      },
      {
        href: "/admin/cms/whatwedo",
        label: "What We Do categories",
        description: "The category landing pages (/what-we-do/<slug>) and their menu columns — edit, publish.",
        icon: LayoutGrid,
        accent: "sky",
      },
    ],
  },
  {
    title: "Solutions menu",
    dot: "orange",
    areas: [
      {
        href: "/admin/cms/solutions",
        label: "Solutions",
        description: "Business & Hardware Solution pages behind the Solutions menu. Create, edit, publish.",
        icon: Boxes,
        accent: "orange",
      },
    ],
  },
  {
    title: "Other",
    dot: "teal",
    areas: [
      {
        href: "/admin/cms/industries",
        label: "Industries",
        description: "Edit each industry page (hero, challenges, timeline, FAQs…).",
        icon: Building2,
        accent: "teal",
      },
      {
        href: "/admin/cms/nav",
        label: "Navigation",
        description: "Manage the top-nav “About” dropdown — add, edit or reorder pages with their URLs.",
        icon: Menu,
        accent: "rose",
      },
    ],
  },
];

export default function CmsHubPage() {
  return (
    <section>
      <h1 className="mb-1 text-lg font-semibold text-heading">Content</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Manage the content shown on the public website. Each card maps to a part of the site.
      </p>

      <div className="space-y-8">
        {CMS_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className={`size-2 rounded-full ${GROUP_DOT[group.dot]}`} aria-hidden={true} />
              {group.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.areas.map(({ href, label, description, icon: Icon, accent }) => (
                <Link
                  key={href}
                  href={href}
                  className={`group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${ACCENT[accent].hover}`}
                >
                  <span
                    className={`mb-3 flex size-10 items-center justify-center rounded-lg ${ACCENT[accent].chip}`}
                  >
                    <Icon size={20} aria-hidden={true} />
                  </span>
                  <h3 className="font-medium text-heading group-hover:text-primary">{label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
