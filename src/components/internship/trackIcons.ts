import { BrainCircuit, ChartNoAxesCombined, CodeXml, Megaphone, type LucideIcon } from "lucide-react";
import type { TrackIconKey } from "./constants";

export const TRACK_ICONS: Record<TrackIconKey, LucideIcon> = {
  marketing: Megaphone,
  fullstack: CodeXml,
  ai: BrainCircuit,
  data: ChartNoAxesCombined,
};
