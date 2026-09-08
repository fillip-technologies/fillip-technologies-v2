import type { NextConfig } from "next";
import { getNextRedirects } from "./src/lib/redirects/json-source";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
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
    // Cloudinary images are served directly from Cloudinary's CDN via the custom
    // loader (src/lib/cloudinary-image.ts). Local images still go through Next.js's
    // optimizer. Both paths produce WebP/AVIF at the right size.
    loaderFile: "./src/lib/cloudinary-image.ts",
    // Keep formats declared so the /_next/image fallback path (for local images)
    // still converts PNG/JPEG to AVIF/WebP.
    formats: ["image/avif", "image/webp"],
    // remotePatterns is still needed so next/image accepts Cloudinary src values
    // without throwing a config error, even though the custom loader bypasses
    // the optimization pipeline for those URLs.
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
