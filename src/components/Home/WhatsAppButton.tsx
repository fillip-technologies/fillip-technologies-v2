"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_NUMBER = "917257930444";

/**
 * Floating WhatsApp chat button. Rendered once in the root layout so it shows on
 * every public page; hidden in the admin panel.
 *
 * z-[940]: above page content and the navbar (z-900), below the mobile menu
 * drawer (z-950/960) and the site popup (z-10000), so it never covers them.
 */
export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-[940] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 motion-safe:animate-ping"></span>
      <FaWhatsapp className="relative z-10 h-7 w-7" />
    </a>
  );
}
