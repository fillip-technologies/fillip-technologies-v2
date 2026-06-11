import type { MenuButtonProps } from "./types";

/** Animated hamburger â†’ Ã— icon */
function MenuButton({ open, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative w-10 h-10 flex flex-col justify-center items-center gap-[5px]"
    >
      <span className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
      <span className={`block h-[1.5px] w-3.5 bg-current rounded-full transition-all duration-300 ${open ? "opacity-0 w-5" : ""}`} />
      <span className={`block h-[1.5px] w-5 bg-current rounded-full transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
    </button>
  );
}

export default MenuButton;
