"use client";

import Link from "next/link";
import { responsiveImageProps } from "@/lib/responsive-image";
import { useRef } from "react";
import HomeStyleFeatureProductCard from "@/components/products/HomeStyleFeatureProductCard";

type MobileFeaturedProductItem = {
  id: string;
  href: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  imageClassName: string;
  imageContainerClassName?: string;
};

export default function MobileFeaturedProductsRail({
  items,
  viewAllHref,
  title = "Featured Products",
}: {
  items: MobileFeaturedProductItem[];
  viewAllHref: string;
  title?: string;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollRail = (direction: 1 | -1) => {
    const track = railRef.current;
    if (!track) return;
    const amount = Math.max(track.clientWidth - 64, 220) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <div className="md:hidden">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="text-base font-bold leading-tight text-slate-900">{title}</div>
        <Link
          prefetch={false}
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-bold text-slate-800"
        >
          <span>View all products</span>
          <span className="text-[#F56605]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M5 12h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollRail(-1)}
          className="absolute -left-2 top-[28%] z-20 inline-flex -translate-y-1/2 items-center justify-center p-0 text-[#F56605] transition active:scale-95"
          aria-label={`Previous ${title}`}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_2px_4px_rgba(255,255,255,0.55)]" fill="none" aria-hidden="true">
            <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="overflow-hidden px-1">
          <div
            ref={railRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <div key={item.id} className="min-w-[calc((100%-0.75rem)/2)] shrink-0 basis-[calc((100%-0.75rem)/2)] snap-start">
                <HomeStyleFeatureProductCard
                  href={item.href}
                  title={item.title}
                  image={
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                    {...responsiveImageProps(item.imageSrc)}
                      alt={item.imageAlt ?? item.title}
                      className={item.imageClassName}
                      loading="lazy"
                    />
                  }
                  imageContainerClassName={item.imageContainerClassName ?? "bg-slate-50"}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollRail(1)}
          className="absolute -right-2 top-[28%] z-20 inline-flex -translate-y-1/2 items-center justify-center p-0 text-[#F56605] transition active:scale-95"
          aria-label={`Next ${title}`}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_2px_4px_rgba(255,255,255,0.55)]" fill="none" aria-hidden="true">
            <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
