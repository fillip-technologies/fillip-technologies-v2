import { MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function TalkButton() {
  return (
    <div className="relative inline-flex">
      {/* AI Stars */}
      <div className="absolute -top-3 right-0 text-[12px] text-primary ai-star pointer-events-none">
        ✦
      </div>

      <div className="absolute -top-1 right-5 text-[8px] text-accent ai-star-delayed pointer-events-none">
        ✧
      </div>

      {/* Border */}
      <div className="animated-border inline-flex rounded-full p-[1px]">
        <div className="flex items-center rounded-full bg-card">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-l-full text-heading transition-colors"
            aria-label="Chat"
          >
            <MessageSquare size={18} />
          </button>

          <div className="h-5 w-px bg-border" />

          <a
            href="https://wa.me/911234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-r-full text-accent"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TalkButton;
