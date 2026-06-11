import "./globals.css";

import { Geist } from "next/font/google";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}