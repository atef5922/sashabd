import manifest from "./generated/image-variants.json";

const variants = manifest as unknown as Record<string, [number, string][]>;

export function imageVariants(src: string) {
  try { return variants[decodeURIComponent(src.split(/[?#]/)[0])]; } catch { return undefined; }
}

/** Native img equivalent of the global Next Image loader; dimensions/styles stay with the caller. */
export function responsiveImageProps(src: string, sizes = "(max-width: 640px) 100vw, 50vw") {
  const available = imageVariants(src);
  if (!available?.length) return { src };
  return {
    src: (available.find(([width]) => width >= 1280) ?? available[available.length - 1])[1],
    srcSet: available.map(([width, url]) => url + " " + width + "w").join(", "),
    sizes,
  };
}
