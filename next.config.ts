import type { NextConfig } from "next";
import { getNextRedirects } from "./src/lib/redirects/json-source";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["src/data/services/**/*.json", "src/data/blogs/**/*.json", "src/data/redirects.json"],
  },
  async redirects() {
    return getNextRedirects();
  },
};

export default nextConfig;
