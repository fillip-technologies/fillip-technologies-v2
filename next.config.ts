import type { NextConfig } from "next";
import { getNextRedirects } from "./src/lib/redirects/json-source";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["src/data/services/**/*.json", "src/data/blogs/**/*.json", "src/data/redirects.json"],
  },
  images: {
    // Cloudinary-hosted assets (see src/server/cloudinary.ts). Scoped to our
    // cloud's path so only our own media library passes through next/image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/jhosc75n/**",
        search: "",
      },
    ],
  },
  async redirects() {
    return getNextRedirects();
  },
};

export default nextConfig;
