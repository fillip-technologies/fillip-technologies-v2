import Link from "next/link";
import type { NavLinkProps } from "./types";

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function NavLink({ href = "#", label }: NavLinkProps) {
  const className = `
    relative text-[16px]  tracking-wide whitespace-nowrap
    after:absolute after:left-0 after:-bottom-px
    after:h-px after:w-0 after:bg-current
    after:transition-[width] after:duration-300
    hover:after:w-full
  `;

  if (href === "#") {
    return (
      <button type="button" className={className}>
        {label}
      </button>
    );
  }

  if (isInternalRoute(href)) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
    >
      {label}
    </a>
  );
}

export default NavLink;
