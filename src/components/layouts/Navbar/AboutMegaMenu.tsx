"use client";

import NavDropdownMenu from "./NavDropdownMenu";
import { useAboutMenu } from "./useAboutMenu";

export default function  AboutMegaMenu() {
  const items = useAboutMenu();

  return (
    <NavDropdownMenu
      label="About"
      items={items}
      align="left"
      widthClass="w-[min(260px,calc(100vw-32px))]"
    />
  );
}
