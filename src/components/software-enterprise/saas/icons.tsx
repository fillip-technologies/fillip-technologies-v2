import {
  Database,
  ShieldCheck,
  Layers,
  CheckCircle2,
  Server,
  Globe,
  RefreshCw,
  Cpu,
  Cloud,
  Lock,
  Zap,
  Activity,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon registry for the SaaS-style Software & Enterprise layout. CMS content
 * stores an icon *key* (a string); the components resolve it to a lucide icon
 * here so the editable data stays free of React references.
 */
export const SAAS_ICONS: Record<string, LucideIcon> = {
  database: Database,
  shield: ShieldCheck,
  layers: Layers,
  check: CheckCircle2,
  server: Server,
  globe: Globe,
  refresh: RefreshCw,
  cpu: Cpu,
  cloud: Cloud,
  lock: Lock,
  zap: Zap,
  activity: Activity,
};

/** Resolve an icon key to a component, falling back to a neutral icon. */
export function saasIcon(key?: string): LucideIcon {
  return SAAS_ICONS[key ?? ""] ?? Layers;
}
