import Script from "next/script";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";
import AnniversaryPopup from "@/components/AnniversaryPopup/AnniversaryPopup";

// Layout for the public marketing site. The admin area and API routes live
// outside this group, so they don't get the navbar/footer.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PLLBQ2B299"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PLLBQ2B299');
        `}
      </Script>
      <div className="anniversary-site-shell">
        <Navbar />
        {children}

        <Footer />
        <ChatbotWidget />
      </div>
      <AnniversaryPopup />
    </>
  );
}
