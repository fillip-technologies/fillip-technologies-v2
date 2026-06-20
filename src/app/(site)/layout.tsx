import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";

// Layout for the public marketing site. The admin area and API routes live
// outside this group, so they don't get the navbar/footer.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}

      <Footer />
      <ChatbotWidget />
    </>
  );
}
