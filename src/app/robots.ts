import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const isProduction = process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction
        ? ["/admin/", "/api/", "/get-a-quote/custom", "/*/preview"]
        : "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
