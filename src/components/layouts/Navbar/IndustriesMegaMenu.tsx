"use client";

import NavDropdownMenu from "./NavDropdownMenu";
import { INDUSTRIES_MENU } from "./industriesMegaMenuData";
import { useNavMenu } from "./useAboutMenu";

export default function IndustriesMegaMenu() {
  const items = useNavMenu("industries", INDUSTRIES_MENU.map((i) => ({ label: i.label, href: i.href })));
  return <NavDropdownMenu label="Industries" items={items} />;
}
