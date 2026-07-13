import {
  Search,
  SearchX,
  Gauge,
  Bot,
  ShieldCheck,
  Activity,
  Code2,
  Network,
  Link2,
  Database,
  Globe2,
  FileCode2,
  BarChart3,
  TriangleAlert,
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  MousePointerClick,
  Megaphone,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";

/**
 * Fixed set of icons the SEO / Marketing CMS sections can reference by name.
 * The admin stores a plain string key (e.g. "gauge"); the components resolve it
 * to a lucide icon via {@link resolveIcon}, falling back to a safe default so an
 * unknown or empty value never crashes the page.
 */
export const SEO_ICONS: Record<string, LucideIcon> = {
  search: Search,
  "search-x": SearchX,
  gauge: Gauge,
  bot: Bot,
  shield: ShieldCheck,
  activity: Activity,
  code: Code2,
  network: Network,
  link: Link2,
  database: Database,
  globe: Globe2,
  file: FileCode2,
  chart: BarChart3,
  "triangle-alert": TriangleAlert,
  check: CheckCircle2,
  zap: Zap,
  target: Target,
  trending: TrendingUp,
  click: MousePointerClick,
  megaphone: Megaphone,
  users: Users,
  location: MapPin,
};

/** Comma-separated list of valid icon keys — handy for admin field help text. */
export const SEO_ICON_KEYS = Object.keys(SEO_ICONS).join(", ");

const FALLBACK_ICON: LucideIcon = Search;

/** Resolve an icon name to a lucide component, with a safe fallback. */
export function resolveIcon(name?: string): LucideIcon {
  if (!name) return FALLBACK_ICON;
  return SEO_ICONS[name.trim().toLowerCase()] ?? FALLBACK_ICON;
}
