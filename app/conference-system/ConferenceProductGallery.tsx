"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ConferenceProduct } from "./catalog";

const ACTIVE_BORDER = "#FF6A00";

export default function ConferenceProductGallery({
  productName,
  images,
}: {
  productName: string;
  images: ConferenceProduct["images"];
}) {
  const visibleImages = useMemo(() => {
    const seen = new Set<string>();
    return images.filter((image) => {
      if (seen.has(image.src)) return false;
      seen.add(image.src);
      return true;
    });
  }, [images]);
  const initialImage = visibleImages.find((image) => image.primary) ?? visibleImages[0];
  const [activeImageSrc, setActiveImageSrc] = useState(initialImage.src);
  const activeImage = visibleImages.find((image) => image.src === activeImageSrc) ?? initialImage;

  return (
    <div className="grid gap-3 sm:grid-cols-[84px_minmax(0,1fr)]">
      <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
        {visibleImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveImageSrc(image.src)}
            aria-label={`Show ${image.alt || productName}, image ${index + 1}`}
            aria-pressed={activeImage.src === image.src}
            className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
            style={{ borderColor: activeImage.src === image.src ? ACTIVE_BORDER : "rgba(15,23,42,0.12)" }}
          >
            <Image
              src={image.src}
              alt={`${image.alt} — thumbnail ${index + 1}`}
              fill
              loading="lazy"
              sizes="80px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

      <div className="order-1 relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-white sm:order-2">
        <Image
          src={activeImage.src}
          alt={activeImage.alt || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-2 sm:p-4"
        />
      </div>
    </div>
  );
}
