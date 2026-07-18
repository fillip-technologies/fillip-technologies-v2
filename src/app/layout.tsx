import "./globals.css";

import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/images/fav-icon.png", type: "image/png" }],
    shortcut: [{ url: "/images/fav-icon.png", type: "image/png" }],
    apple: [{ url: "/images/fav-icon.png", type: "image/png" }],
  },
  openGraph: {
    siteName: siteConfig.name,
  },
};

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
