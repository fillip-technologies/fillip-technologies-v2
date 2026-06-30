import NavDropdownMenu from "./NavDropdownMenu";
import { ABOUT_MENU } from "./aboutMegaMenuData";

export default function AboutMegaMenu() {
  return (
    <NavDropdownMenu
      label="About"
      items={ABOUT_MENU}
      align="left"
      widthClass="w-[min(260px,calc(100vw-32px))]"
    />
  );
}
