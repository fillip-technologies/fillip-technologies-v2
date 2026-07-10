import type { RedirectRule } from "./types";

export interface RedirectSource {
  getAll(): Promise<RedirectRule[]>;
  getBySource(source: string): Promise<RedirectRule | null>;
}

