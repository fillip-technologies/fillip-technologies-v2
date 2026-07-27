import { createElement } from "react";
import {
  CalendarClock,
  Code2,
  Globe,
  Goal,
  LayoutGrid,
  ListChecks,
  MessageSquare,
  Search,
  Share2,
  Target,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";

// Maps a detail-section `icon` name (from src/data/quote/detail.ts) to a lucide
// component, with a safe fallback so an unknown name can never crash the page.
const ICONS: Record<string, LucideIcon> = {
  // How-to-choose steps
  Goal,
  Wallet,
  CalendarClock,
  TrendingUp,
  ListChecks,
  MessageSquare,
  // Service-category cards
  Globe,
  Search,
  Share2,
  Target,
  Code2,
};

export function detailIcon(name: string): LucideIcon {
  return ICONS[name] ?? LayoutGrid;
}

/** Renders a detail-section icon by name (stable ref, no render-time component creation). */
export function DetailIcon({ name, className }: { name: string; className?: string }) {
  return createElement(detailIcon(name), { className });
}
