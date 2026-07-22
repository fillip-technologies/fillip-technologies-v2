import type { NextConfig } from "next";
import { getNextRedirects } from "./src/lib/redirects/json-source";

const nextConfig: NextConfig = {
  experimental: {
    // Admin Direct Mail attachments are sent through a Server Action, whose body
    // defaults to a 1MB cap. Raise it above our 15MB total-attachment limit
    // (plus multipart/base64 overhead). See src/server/mail/actions.ts.
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
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
  async rewrites() {
    return [
      {
        source: "/carrer",
        destination: "/others/carrer",
      },
    ];
  },
  async redirects() {
    return getNextRedirects();
  },
};

export default nextConfig;
