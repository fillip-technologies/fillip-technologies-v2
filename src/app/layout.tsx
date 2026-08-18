import "./globals.css";

import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo/metadata";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = baseMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Establish the connection to our image CDN early so the first
            next/image request (e.g. the hero) doesn't pay DNS+TLS on the
            critical path. Lighthouse flagged "no origins were preconnected". */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={geist.className}>{children}</body>
    </html>
  );
}
