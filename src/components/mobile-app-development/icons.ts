import {
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Cloud,
  CreditCard,
  KeyRound,
  Layers3,
  Lock,
  Package,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { MobileAppIconName } from "@/data/mobile-app-development";

const iconMap: Record<MobileAppIconName, LucideIcon> = {
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Cloud,
  CreditCard,
  KeyRound,
  Layers3,
  Lock,
  Package,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Wallet,
  Workflow,
};

// Look up by icon name, falling back to a safe default. CMS-editable icon
// fields can hold arbitrary text, so `mobileAppIcons[name]` must never be
// undefined (rendering an undefined component crashes the page).
export const mobileAppIcons: Record<string, LucideIcon> = new Proxy(iconMap, {
  get: (target, prop: string) => target[prop as MobileAppIconName] ?? Smartphone,
});
