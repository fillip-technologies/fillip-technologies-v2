"use client";

import NavDropdownMenu from "./NavDropdownMenu";
import { INDUSTRIES_MENU } from "./industriesMegaMenuData";
import { useNavMenu } from "./useAboutMenu";

export default function IndustriesMegaMenu() {
  const items = useNavMenu("industries", INDUSTRIES_MENU.map((i) => ({ label: i.label, href: i.href })));
  const displayItems = items.map((item) => ({
    ...item,
    label: item.label.endsWith("Industries") ? item.label : `${item.label} Industries`,
  }));

  return <NavDropdownMenu label="Industries" items={displayItems} widthClass="w-[min(280px,calc(100vw-32px))]" />;
}
