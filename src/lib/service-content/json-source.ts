import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  enterpriseMobileAppContent,
  type MobileAppDevelopmentContent,
} from "@/data/mobile-app-development";
import { websiteDevelopmentContent } from "@/data/website-development";
import {
  aiAutomationContentSchema,
  serviceDefinitionSchema,
  servicePageSchemas,
  type AIAutomationServicePageInput,
  type MobileAppServicePageInput,
  type PerformanceMarketingServicePageInput,
  type ServiceDefinitionInput,
  type ServicePageInput,
  type TechnicalSeoServicePageInput,
  type WebsiteServicePageInput,
} from "./schema";
import type { ServiceContentSource } from "./source";
import type { ServiceLandingPage } from "./types";

type ContentEntry = {
  definition: ServiceDefinitionInput;
  page: ServicePageInput;
  defaults?: unknown;
};

const contentRoot = path.join(process.cwd(), "src", "data", "services");

function validationError(filePath: string, issues: { path: PropertyKey[]; message: string }[]) {
  const details = issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");

  return new Error(`Invalid service content in ${filePath}: ${details}`);
}

async function readJson(filePath: string): Promise<unknown> {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeContent<T>(base: T, overrides: unknown): T {
  if (!isRecord(base) || !isRecord(overrides)) {
    return (overrides ?? base) as T;
  }

  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    merged[key] = key in base
      ? mergeContent(base[key], value)
      : value;
  }

  return merged as T;
}

function createWebsiteLandingPage(
  definition: ServiceDefinitionInput,
  page: WebsiteServicePageInput,
): ServiceLandingPage {
  return {
    slug: page.slug,
    serviceKey: page.serviceKey,
    templateKey: "website-design",
    city: page.city,
    seo: page.seo,
    content: {
      ...websiteDevelopmentContent,
      slug: page.slug,
      hero: page.content.hero ?? websiteDevelopmentContent.hero,
      challenges: page.content.challenges ?? websiteDevelopmentContent.challenges,
      process: page.content.process ?? websiteDevelopmentContent.process,
    },
    faq: page.faq,
  };
}

function createMobileAppLandingPage(
  definition: ServiceDefinitionInput,
  page: MobileAppServicePageInput,
): ServiceLandingPage {
  const mergedContent = mergeContent<MobileAppDevelopmentContent>(
    enterpriseMobileAppContent,
    page.content,
  );

  return {
    slug: page.slug,
    serviceKey: page.serviceKey,
    templateKey: "mobile-app-development",
    city: page.city,
    seo: page.seo,
    content: {
      ...mergedContent,
      faq: {
        ...mergedContent.faq,
        title: page.faq.title,
        description: page.faq.description,
        faqs: page.faq.items,
      },
    },
    faq: page.faq,
  };
}

function createTechnicalSeoLandingPage(
  page: TechnicalSeoServicePageInput,
): ServiceLandingPage {
  return {
    slug: page.slug,
    serviceKey: page.serviceKey,
    templateKey: "technical-seo",
    city: page.city,
    seo: page.seo,
    content: page.content,
    faq: page.faq,
  };
}

function createPerformanceMarketingLandingPage(
  page: PerformanceMarketingServicePageInput,
): ServiceLandingPage {
  return {
    slug: page.slug,
    serviceKey: page.serviceKey,
    templateKey: "performance-marketing",
    city: page.city,
    seo: page.seo,
    content: page.content,
    faq: page.faq,
  };
}

function createAIAutomationLandingPage(
  page: AIAutomationServicePageInput,
  defaults: unknown,
): ServiceLandingPage {
  const contentResult = aiAutomationContentSchema.safeParse(
    mergeContent(defaults, page.content),
  );
  if (!contentResult.success) {
    throw validationError(page.slug, contentResult.error.issues);
  }

  return {
    slug: page.slug,
    serviceKey: page.serviceKey,
    templateKey: "ai-automation",
    city: page.city,
    seo: page.seo,
    content: contentResult.data,
    faq: page.faq,
  };
}

export class JsonServiceContentSource implements ServiceContentSource {
  private entriesPromise?: Promise<Map<string, ContentEntry>>;

  async getBySlug(slug: string): Promise<ServiceLandingPage | null> {
    const entry = (await this.getEntries()).get(slug);
    if (!entry) return null;

    switch (entry.definition.templateKey) {
      case "website-design":
        return createWebsiteLandingPage(
          entry.definition,
          entry.page as WebsiteServicePageInput,
        );
      case "mobile-app-development":
        return createMobileAppLandingPage(
          entry.definition,
          entry.page as MobileAppServicePageInput,
        );
      case "technical-seo":
        return createTechnicalSeoLandingPage(
          entry.page as TechnicalSeoServicePageInput,
        );
      case "performance-marketing":
        return createPerformanceMarketingLandingPage(
          entry.page as PerformanceMarketingServicePageInput,
        );
      case "ai-automation":
        return createAIAutomationLandingPage(
          entry.page as AIAutomationServicePageInput,
          entry.defaults,
        );
    }
  }

  async getAllSlugs(): Promise<string[]> {
    return [...(await this.getEntries()).keys()];
  }

  private getEntries() {
    if (process.env.NODE_ENV === "development") {
      return this.loadEntries();
    }

    this.entriesPromise ??= this.loadEntries();
    return this.entriesPromise;
  }

  private async loadEntries(): Promise<Map<string, ContentEntry>> {
    const entries = new Map<string, ContentEntry>();
    const serviceDirectories = await fs.readdir(contentRoot, { withFileTypes: true });

    for (const directory of serviceDirectories) {
      if (!directory.isDirectory()) continue;

      const serviceDirectory = path.join(contentRoot, directory.name);
      const definitionPath = path.join(serviceDirectory, "service.json");
      const definitionResult = serviceDefinitionSchema.safeParse(
        await readJson(definitionPath),
      );

      if (!definitionResult.success) {
        throw validationError(definitionPath, definitionResult.error.issues);
      }
      if (!definitionResult.data.enabled) continue;

      const defaults = definitionResult.data.defaultsFile
        ? await readJson(path.join(serviceDirectory, definitionResult.data.defaultsFile))
        : undefined;

      const pagesDirectory = path.join(serviceDirectory, "pages");
      const pageFiles = (await fs.readdir(pagesDirectory)).filter((file) =>
        file.endsWith(".json"),
      );

      for (const pageFile of pageFiles) {
        const pagePath = path.join(pagesDirectory, pageFile);
        const pageSchema = servicePageSchemas[definitionResult.data.templateKey];
        const pageResult = pageSchema.safeParse(await readJson(pagePath));

        if (!pageResult.success) {
          throw validationError(pagePath, pageResult.error.issues);
        }

        const page = pageResult.data;
        if (!page.enabled) continue;
        if (page.serviceKey !== definitionResult.data.serviceKey) {
          throw new Error(`Service key mismatch in ${pagePath}`);
        }
        if (entries.has(page.slug)) {
          throw new Error(`Duplicate service landing-page slug: ${page.slug}`);
        }

        entries.set(page.slug, {
          definition: definitionResult.data,
          page,
          defaults,
        });
      }
    }

    return entries;
  }
}
