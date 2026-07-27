import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";
import { JsonLdScript, siteJsonLd } from "@/lib/seo/schema";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdScript data={siteJsonLd()} />
      <Navbar />
      {children}
      <Footer />
      <ChatbotWidget />
    </>
  );
}
