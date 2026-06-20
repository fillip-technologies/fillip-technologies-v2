import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["src/data/services/**/*.json"],
  },
};

export default nextConfig;
