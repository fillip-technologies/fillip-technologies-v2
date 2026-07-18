"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

type GiftLottieProps = {
  /** Public path to the Lottie JSON. Defaults to the gift animation. */
  src?: string;
  className?: string;
  loop?: boolean;
};

/**
 * Plays a Lottie animation loaded at runtime from the /public folder.
 *
 * The JSON is fetched (not imported) so a missing file never breaks the build:
 * if it isn't there yet the component simply renders nothing. Download the
 * animation from LottieFiles and save it as `public/animations/gift.json`.
 */
export default function GiftLottie({
  src = "/animations/gift.json",
  className,
  loop = true,
}: GiftLottieProps) {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    let active = true;
    fetch(src)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active) setData(json);
      })
      .catch(() => {
        /* file not present yet — render nothing */
      });
    return () => {
      active = false;
    };
  }, [src]);

  if (!data) return null;

  return (
    <Lottie
      animationData={data}
      loop={loop}
      autoplay
      className={className}
      // Lottie renders crisply at any size; keep it contained to its box.
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    />
  );
}
