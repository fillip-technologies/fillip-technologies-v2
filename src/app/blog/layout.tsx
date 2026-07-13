import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";

export default function BlogLayout({
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
