"use client";

import { imageVariants } from "./responsive-image";

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const available = imageVariants(src);
  if (!available?.length) return src;
  return (available.find(([size]) => size >= width) ?? available[available.length - 1])[1];
}
