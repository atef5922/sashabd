"use client";

import { Children, useRef } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ResponsiveProductCarousel({
  children,
  desktopClassName,
  className,
  mobileGapClassName = "gap-3",
  mobileLayout = "carousel",
  hideMobileArrows = false,
  desktopContents = false,
}: {
  children: React.ReactNode;
  desktopClassName?: string;
  className?: string;
  mobileGapClassName?: string;
  mobileLayout?: "carousel" | "grid";
  hideMobileArrows?: boolean;
  desktopContents?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const items = Children.toArray(children);

  const scrollTrack = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? track.clientWidth * 0.5;
    track.scrollBy({ left: direction * (cardWidth + 12), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", desktopContents && "md:contents", className)}>
      {!hideMobileArrows && mobileLayout === "carousel" ? (
        <>
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            className="absolute -left-2 top-[28%] z-20 inline-flex -translate-y-1/2 items-center justify-center p-0 text-[#F56605] transition active:scale-95 md:hidden"
            aria-label="Previous products"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_2px_4px_rgba(255,255,255,0.55)]" fill="none" aria-hidden="true">
              <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollTrack(1)}
            className="absolute -right-2 top-[28%] z-20 inline-flex -translate-y-1/2 items-center justify-center p-0 text-[#F56605] transition active:scale-95 md:hidden"
            aria-label="Next products"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-[0_2px_4px_rgba(255,255,255,0.55)]" fill="none" aria-hidden="true">
              <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      ) : null}

      <div className={cn("overflow-hidden px-1 md:px-0", desktopContents && "md:contents md:px-0")}>
        <div
          ref={trackRef}
          className={cn(
            mobileLayout === "grid"
              ? desktopContents
                ? "grid grid-cols-2 overflow-visible pb-1 pt-1 md:contents md:pb-0 md:pt-0"
                : "grid grid-cols-2 overflow-visible pb-1 pt-1 md:grid md:overflow-visible md:pb-0 md:pt-0"
              : desktopContents
                ? "flex snap-x snap-mandatory overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:contents md:overflow-visible md:snap-none md:pb-0 md:pt-0"
                : "flex snap-x snap-mandatory overflow-x-auto pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:overflow-visible md:snap-none md:pb-0 md:pt-0",
            mobileGapClassName,
            !desktopContents && desktopClassName,
          )}
        >
          {items.map((child, index) => (
            <div
              key={index}
              className={cn(
                mobileLayout === "grid"
                  ? "min-w-0"
                  : "min-w-[calc((100%-0.75rem)/2)] shrink-0 basis-[calc((100%-0.75rem)/2)] snap-start",
                "md:min-w-0 md:basis-auto md:shrink",
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
