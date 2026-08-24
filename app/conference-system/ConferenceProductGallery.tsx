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
  const initialImage = visibleImages.find((image) => image.primary)?.src ?? visibleImages[0].src;
  const [activeImage, setActiveImage] = useState(initialImage);

  return (
    <div className="grid gap-3 sm:grid-cols-[84px_minmax(0,1fr)]">
      <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
        {visibleImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveImage(image.src)}
            aria-label={`Show ${productName} image ${index + 1}`}
            aria-pressed={activeImage === image.src}
            className="relative h-20 w-20 flex-none overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
            style={{ borderColor: activeImage === image.src ? ACTIVE_BORDER : "rgba(15,23,42,0.12)" }}
          >
            <Image
              src={image.src}
              alt={`${image.alt} — view ${index + 1}`}
              fill
              sizes="80px"
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>

      <div className="order-1 relative aspect-square overflow-hidden rounded-xl bg-white sm:order-2">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-5 sm:p-8"
        />
      </div>
    </div>
  );
}
