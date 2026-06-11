import NavDropdownMenu from "./NavDropdownMenu";
import { PLATFORMS_MENU } from "./platformsMegaMenuData";

export default function PlatformsMegaMenu() {
  return <NavDropdownMenu label="Platforms" items={PLATFORMS_MENU} />;
}
