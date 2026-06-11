import NavDropdownMenu from "./NavDropdownMenu";
import { INDUSTRIES_MENU } from "./industriesMegaMenuData";

export default function IndustriesMegaMenu() {
  return <NavDropdownMenu label="Industries" items={INDUSTRIES_MENU} />;
}
