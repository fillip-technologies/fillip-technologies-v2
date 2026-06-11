import type { RefObject } from "react";

export interface LogoProps {
  width?: number;
  height?: number;
}

export interface NavLinkProps {
  href?: string;
  label: string;
}

export interface TalkButtonProps {
  dark?: boolean;
}

export interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export interface MobileDrawerProps {
  drawerOpen: boolean;
  overlayRef: RefObject<HTMLDivElement | null>;
  drawerRef: RefObject<HTMLDivElement | null>;
  closeDrawer: () => void;
}
