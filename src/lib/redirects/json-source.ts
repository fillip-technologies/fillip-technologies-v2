import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { RedirectSource } from "./source";
import type { NextRedirectRule, RedirectRule } from "./types";

const redirectRuleSchema = z.object({
  source: z.string().startsWith("/"),
  destination: z.string().min(1),
  type: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]),
  enabled: z.boolean(),
  note: z.string().optional(),
});

const redirectsSchema = z.array(redirectRuleSchema);

const redirectsPath = path.join(process.cwd(), "src", "data", "redirects.json");

function normalizeRedirectPath(value: string) {
  if (value !== "/" && value.endsWith("/")) return value.slice(0, -1);
  return value;
}

function toNextRedirect(rule: RedirectRule): NextRedirectRule {
  if (rule.type === 301 || rule.type === 302) {
    return {
      source: rule.source,
      destination: rule.destination,
      statusCode: rule.type,
    };
  }

  if (rule.type === 308) {
    return {
      source: rule.source,
      destination: rule.destination,
      permanent: true,
    };
  }

  return {
    source: rule.source,
    destination: rule.destination,
    permanent: false,
  };
}

export class JsonRedirectSource implements RedirectSource {
  private redirectsPromise?: Promise<RedirectRule[]>;

  async getAll(): Promise<RedirectRule[]> {
    if (process.env.NODE_ENV === "development") {
      return this.loadRedirects();
    }

    this.redirectsPromise ??= this.loadRedirects();
    return this.redirectsPromise;
  }

  async getBySource(source: string): Promise<RedirectRule | null> {
    const normalizedSource = normalizeRedirectPath(source);

    return (
      (await this.getAll()).find(
        (rule) => normalizeRedirectPath(rule.source) === normalizedSource,
      ) ?? null
    );
  }

  private async loadRedirects(): Promise<RedirectRule[]> {
    const parsed = redirectsSchema.safeParse(
      JSON.parse(await fs.readFile(redirectsPath, "utf8")),
    );

    if (!parsed.success) {
      const details = parsed.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; ");

      throw new Error(`Invalid redirects in ${redirectsPath}: ${details}`);
    }

    return parsed.data;
  }
}

export async function getNextRedirects(): Promise<NextRedirectRule[]> {
  const source = new JsonRedirectSource();
  const redirects = await source.getAll();

  return redirects.filter((rule) => rule.enabled).map(toNextRedirect);
}
