"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const images = [
  "/assets/control-systems/interactive-flat-panel/interactive-flat-panel-hero.webp",
  "/assets/control-systems/digital-podium/digital-podium-hero.webp",
  "/assets/control-systems/turnstile/turnstile-gate-hero.webp",
];

const mobileImagePositions = ["center 22%", "center 20%", "center 24%"];

export default function HeroBackground({
  className,
  showArrows = false,
  dotsClassName,
  imageSize = "cover",
  imagePositions,
}: {
  className?: string;
  showArrows?: boolean;
  dotsClassName?: string;
  imageSize?: "cover" | "contain";
  imagePositions?: string[];
}) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionRef = useRef<number | null>(null);
  const dragStartRef = useRef<number | null>(null);
  const dragStartYRef = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const dragOffsetYRef = useRef(0);
  const isHorizontalDragRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const runSlideChange = useCallback((direction: 1 | -1) => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    setIndex((prev) => (prev + direction + images.length) % images.length);

    if (transitionRef.current) {
      window.clearTimeout(transitionRef.current);
    }

    transitionRef.current = window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1000);
  }, []);

  const nextSlide = useCallback(() => {
    runSlideChange(1);
  }, [runSlideChange]);

  const prevSlide = useCallback(() => {
    runSlideChange(-1);
  }, [runSlideChange]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionRef.current) window.clearTimeout(transitionRef.current);
    };
  }, [nextSlide]);

  const beginDrag = (clientX: number, clientY: number) => {
    dragStartRef.current = clientX;
    dragStartYRef.current = clientY;
    dragOffsetRef.current = 0;
    dragOffsetYRef.current = 0;
    isHorizontalDragRef.current = false;
    setDragOffset(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const updateDrag = (clientX: number, clientY: number) => {
    if (dragStartRef.current === null) return;

    const nextOffset = clientX - dragStartRef.current;
    const nextOffsetY = dragStartYRef.current === null ? 0 : clientY - dragStartYRef.current;
    const absX = Math.abs(nextOffset);
    const absY = Math.abs(nextOffsetY);

    if (!isHorizontalDragRef.current && (absX > 8 || absY > 8)) {
      isHorizontalDragRef.current = absX > absY * 1.2;
    }

    dragOffsetYRef.current = nextOffsetY;
    dragOffsetRef.current = isHorizontalDragRef.current ? nextOffset : 0;
    setDragOffset(dragOffsetRef.current);
  };

  const endDrag = () => {
    if (dragStartRef.current !== null) {
      const isSwipe = isHorizontalDragRef.current && Math.abs(dragOffsetRef.current) > Math.abs(dragOffsetYRef.current);

      if (isSwipe && dragOffsetRef.current < -60) {
        nextSlide();
      } else if (isSwipe && dragOffsetRef.current > 60) {
        prevSlide();
      }
      resetTimer();
    }

    dragStartRef.current = null;
    dragStartYRef.current = null;
    dragOffsetRef.current = 0;
    dragOffsetYRef.current = 0;
    isHorizontalDragRef.current = false;
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    beginDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const handleMouseLeave = () => {
    if (dragStartRef.current !== null) {
      endDrag();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    beginDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    updateDrag(touch.clientX, touch.clientY);
    if (isHorizontalDragRef.current && Math.abs(dragOffsetRef.current) > 8 && e.cancelable) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  return (
    <div
      className={cn(
        "pointer-events-auto absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing select-none",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {images.map((src, i) => {
        let offset = i - index;

        // Circular logic for seamless loop from right to left
        if (offset < -1 && index === images.length - 1 && i === 0) offset = 1;
        if (offset > 1 && index === 0 && i === images.length - 1) offset = -1;

        const isVisible = Math.abs(offset) <= 1;

        return (
          <div
            key={src}
            className={`absolute inset-0 bg-center transition-transform duration-1000 ease-in-out`}
            style={{
              backgroundImage: `url('${src}')`,
              backgroundSize: imageSize,
              backgroundRepeat: "no-repeat",
              backgroundPosition: imagePositions?.[i] ?? "center",
              transform: `translateX(calc(${offset * 100}% + ${dragOffset}px))`,
              opacity: isVisible ? 1 : 0,
              zIndex: i === index ? 1 : 0,
              visibility: isVisible ? "visible" : "hidden",
            }}
          />
        );
      })}

      {showArrows ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
              resetTimer();
            }}
            className="absolute left-3 top-1/2 z-30 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/28 text-white shadow-md backdrop-blur-sm transition hover:bg-black/40"
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
              <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
              resetTimer();
            }}
            className="absolute right-3 top-1/2 z-30 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/28 text-white shadow-md backdrop-blur-sm transition hover:bg-black/40"
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
              <path d="m10 7 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      ) : null}

      {/* Pagination Dots */}
      <div className={cn("absolute left-1/2 z-30 flex -translate-x-1/2", dotsClassName ?? "bottom-10 gap-2.5")}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
              resetTimer();
            }}
            className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
              i === index ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/35 pointer-events-none" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.28))",
        }}
      />
    </div>
  );
}

export { mobileImagePositions };
