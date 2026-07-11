import Image from "next/image";
import Link from "next/link";
import type { LogoProps } from "./types";

function Logo({ width = 160, height = 44 }: LogoProps) {
  return (
    <Link href="/" aria-label="Fillip Technologies home">
      <Image
        src="/images/logo/fillip-technologies.png"
        alt="Fillip Technologies"
        width={width}
        height={height}
        priority
        style={{ height: "auto" }}
      />
    </Link>
  );
}

export default Logo;
