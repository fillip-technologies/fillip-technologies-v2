import { createElement } from "react";
import {
  Boxes,
  Building2,
  GraduationCap,
  Hospital,
  LayoutGrid,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

// Maps an industry's `icon` name (from the data module) to a lucide component,
// with a safe fallback so an unknown name can never crash the page.
const ICONS: Record<string, LucideIcon> = {
  Hospital,
  Stethoscope,
  Building2,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Boxes,
};

export function industryIcon(name: string): LucideIcon {
  return ICONS[name] ?? LayoutGrid;
}

/**
 * Renders an industry icon by name. Uses `createElement` so it resolves a stable
 * icon reference without the "component created during render" lint pattern.
 */
export function IndustryIcon({ name, className }: { name: string; className?: string }) {
  return createElement(industryIcon(name), { className });
}
