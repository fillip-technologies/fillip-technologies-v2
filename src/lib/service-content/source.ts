import type { ServiceLandingPage } from "./types";

export interface ServiceContentSource {
  getBySlug(slug: string): Promise<ServiceLandingPage | null>;
  getAllSlugs(): Promise<string[]>;
}
