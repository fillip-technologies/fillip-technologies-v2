import Link from "next/link";
import type { MegaMenuItem } from "./whatWeDoMegaMenuData";

type NavSubmenuLinkProps = {
  item?: MegaMenuItem;
  href?: string;
  label?: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
};

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function NavSubmenuLink({
  item,
  href = "#",
  label,
  onClick,
  variant = "desktop",
}: NavSubmenuLinkProps) {
  const linkLabel = item?.label ?? label;
  const linkHref = item?.href ?? href;
  const sizeClass =
    variant === "mobile" ? "text-sm leading-6" : "text-[15px] leading-6";

  if (!linkLabel) return null;

  const className = `
    block border-l border-heading/12 py-0.5 pl-4 text-left text-body
    transition-colors hover:text-heading
    ${sizeClass}
  `;

  if (linkHref === "#") {
    return (
      <button type="button" onClick={onClick} className={className}>
        {linkLabel}
      </button>
    );
  }

  if (isInternalRoute(linkHref)) {
    return (
      <Link href={linkHref} onClick={onClick} className={className}>
        {linkLabel}
      </Link>
    );
  }

  return (
    <a
      href={linkHref}
      onClick={onClick}
      className={className}
    >
      {linkLabel}
    </a>
  );
}

export default NavSubmenuLink;
