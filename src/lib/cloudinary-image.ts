import type { ImageLoaderProps } from "next/image";

/**
 * Custom Next.js image loader (configured in next.config.ts → images.loaderFile).
 *
 * For Cloudinary URLs: injects Cloudinary transformation params so the browser
 * fetches the right size + format *directly from Cloudinary's CDN*, bypassing
 * Next.js's image-optimization server entirely. This eliminates a full round-trip
 * through the Node process for every image request.
 *
 * Transformations applied:
 *   f_auto  — serve WebP/AVIF automatically based on the Accept header
 *   c_limit — shrink to fit `width`; never upscale (no quality loss on small screens)
 *   w_N     — pixel width matching the <Image> component's requested breakpoint
 *   q_auto  — Cloudinary picks the best quality/size trade-off automatically
 *
 * For non-Cloudinary URLs (local /public images, external assets): falls back to
 * Next.js's own /_next/image optimizer so those images still get AVIF/WebP and
 * resizing.
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.includes("res.cloudinary.com")) {
    const q = quality ?? "auto";
    // Insert transformation params after /upload/ — before the version segment.
    // Input:  https://res.cloudinary.com/x/image/upload/v123/folder/img.jpg
    // Output: https://res.cloudinary.com/x/image/upload/f_auto,c_limit,w_800,q_auto/v123/folder/img.jpg
    return src.replace("/upload/", `/upload/f_auto,c_limit,w_${width},q_${q}/`);
  }

  // Local or external non-Cloudinary image — route through Next.js optimizer.
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 75),
  });
  return `/_next/image?${params}`;
}
