import "./globals.css";

import { Geist } from "next/font/google";

<<<<<<< HEAD
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

=======
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
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
<<<<<<< HEAD
      <body className={geist.className}>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
=======
      <body className={geist.className}>{children}</body>
    </html>
  );
}
>>>>>>> af48a69 (This describes the CMS expansion specifically. If you want the commit to also cover the earlier work on this branch (admin auth, leads API, the (site) route-group split), let me know and the message can be broadened — or keep commits scoped per-feature, which is cleaner.)
