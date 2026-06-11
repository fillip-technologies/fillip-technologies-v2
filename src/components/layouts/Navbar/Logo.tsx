import Image from "next/image";
import type { LogoProps } from "./types";

function Logo({ width = 160, height = 44 }: LogoProps) {
  return (
    <Image
      src="/images/logo/fillip-technologies.png"
      alt="Fillip Technologies"
      width={width}
      height={height}
      priority
    />
  );
}

export default Logo;
