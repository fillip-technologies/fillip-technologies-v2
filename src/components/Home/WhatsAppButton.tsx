"use client";

import { FaWhatsapp } from "react-icons/fa6";

const WHATSAPP_NUMBER = "917257930444";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping"></span>
      <FaWhatsapp className="h-7 w-7 relative z-10" />
    </a>
  );
}
