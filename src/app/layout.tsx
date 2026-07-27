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
      <body className={geist.className}>{children}</body>
    </html>
  );
}
