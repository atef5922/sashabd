"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const HERO_SLIDE_INTERVAL_MS = 5000;

const heroSlides = [
  {
    image: "/images/led hero/indoor-led-hero.webp",
    alt: "Indoor LED video wall, LED display modules and controller in a modern commercial interior",
    label: "Indoor LED display solution",
  },
  {
    image: "/images/led hero/outdoor-led-hero.webp",
    alt: "Outdoor LED billboard, weatherproof LED cabinets and display modules",
    label: "Outdoor LED display solution",
  },
] as const;

const heroFeatures = [
  {
    title: "Indoor LED Displays",
    description: "P0.9-P3 Fine-Pitch Options",
    icon: "indoor",
  },
  {
    title: "Outdoor LED Screens",
    description: "P2.5-P10 Weatherproof Range",
    icon: "outdoor",
  },
  {
    title: "Rental LED Solutions",
    description: "Events, Stages & Campaigns",
    icon: "rental",
  },
  {
    title: "Installation & Support",
    description: "Project-Based Local Service",
    icon: "support",
  },
] as const;

type HeroFeatureIcon = (typeof heroFeatures)[number]["icon"];

function FeatureIcon({ icon }: { icon: HeroFeatureIcon }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };

  switch (icon) {
    case "indoor":
      return (
        <svg {...commonProps}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "outdoor":
      return (
        <svg {...commonProps}>
          <rect x="3" y="3" width="18" height="12" rx="2" />
          <path d="M8 21h8M12 15v6M6 7h12M7 11h4" />
        </svg>
      );
    case "rental":
      return (
        <svg {...commonProps}>
          <rect x="5" y="6" width="14" height="12" rx="2" />
          <path d="M9 3h6M9 21h6M8 10h8M8 14h5" />
        </svg>
      );
    case "support":
      return (
        <svg {...commonProps}>
          <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
          <path d="M18 19c0 1.1-.9 2-2 2h-4" />
          <rect x="2" y="13" width="4" height="6" rx="2" />
          <rect x="18" y="13" width="4" height="6" rx="2" />
        </svg>
      );
  }
}

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {direction === "previous" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default function LedDisplayHero({ currentYear }: { currentYear: number }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showSlide = useCallback((nextIndex: number) => {
    setActiveIndex((nextIndex + heroSlides.length) % heroSlides.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(showNext, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, showNext]);

  return (
    <section
      className="led-display-hero-shell group/ledhero relative left-1/2 right-1/2 isolate -mx-[50vw] -mt-2 min-h-[430px] w-screen overflow-hidden bg-[#f7f9fc] sm:min-h-[420px] lg:min-h-[clamp(20rem,25vw,23rem)]"
      aria-labelledby="led-display-hero-heading"
      aria-roledescription="carousel"
      aria-label="LED display solutions"
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.image}
            alt={index === activeIndex ? slide.alt : ""}
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            className="object-cover object-[70%_center] md:object-center"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:hidden"
        aria-hidden="true"
      />

      <div className="led-display-hero-frame relative mx-auto flex min-h-[430px] w-full max-w-[clamp(80rem,90vw,108rem)] flex-col px-5 py-7 sm:min-h-[420px] sm:px-8 lg:min-h-[clamp(20rem,25vw,23rem)] lg:px-10 lg:py-[clamp(1.5rem,2vw,2rem)]">
        <div className="led-display-hero-content max-w-[19rem] text-left sm:max-w-[34rem] lg:max-w-[39%] lg:translate-y-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ef4a00] sm:text-[11px]">
            Commercial LED Display Solutions
          </p>
          <h1
            id="led-display-hero-heading"
            className="led-display-hero-title mt-2 text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl"
          >
            LED Display Price
            <span className="block">in Bangladesh {currentYear}</span>
          </h1>
          <p className="led-display-hero-description mt-3 max-w-[38rem] text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">
            Compare indoor, outdoor and rental LED displays with expert guidance on pixel pitch, controllers, installation and project-based pricing.
          </p>

          <div className="led-display-hero-actions mt-4 flex flex-col gap-2.5 min-[430px]:flex-row sm:mt-5 lg:grid lg:max-w-[23rem] lg:grid-cols-2 xl:flex xl:max-w-none">
            <Link
              href="/contact/?project=led-display"
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3h9l4 4v14H6z" />
                <path d="M14 3v5h5M9 12h7M9 16h7" />
              </svg>
              Get Free BOQ
            </Link>
            <a
              href="#led-products"
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#071936] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
              Browse LED Displays
            </a>
          </div>
        </div>

        <ul className="led-display-hero-features mt-auto grid max-w-[39rem] grid-cols-2 gap-x-3 gap-y-2.5 pb-9 pt-5 sm:grid-cols-2 sm:gap-x-5 sm:pb-10 lg:w-[56%] lg:max-w-none lg:grid-cols-4 lg:gap-x-7 lg:pb-0 lg:pt-3">
          {heroFeatures.map((feature) => (
            <li
              key={feature.title}
              className="flex min-w-0 items-center gap-2 rounded-md border border-white/60 bg-white/75 px-2 py-1.5 text-left text-[#071936] shadow-sm backdrop-blur-[2px] md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:backdrop-blur-none"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-[#071936] drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] [&>svg]:h-5 [&>svg]:w-5 lg:[&>svg]:h-[22px] lg:[&>svg]:w-[22px]">
                <FeatureIcon icon={feature.icon} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[9px] font-black leading-3 tracking-[-0.015em] sm:whitespace-nowrap sm:text-[9.5px] lg:text-[10px]">
                  {feature.title}
                </strong>
                <span className="mt-0.5 block text-[7.5px] font-bold leading-3 text-slate-600 sm:text-[8px] md:whitespace-nowrap lg:text-[8.5px]">
                  {feature.description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={showPrevious}
        className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#071936] opacity-100 shadow-[0_6px_20px_rgba(15,23,42,0.14)] transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b5bdd] sm:inline-flex lg:left-5 lg:opacity-0 lg:group-hover/ledhero:opacity-100 lg:group-focus-within/ledhero:opacity-100"
        aria-label="Show previous LED display banner"
      >
        <ArrowIcon direction="previous" />
      </button>
      <button
        type="button"
        onClick={showNext}
        className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/95 text-[#071936] opacity-100 shadow-[0_6px_20px_rgba(15,23,42,0.14)] transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b5bdd] sm:inline-flex lg:right-5 lg:opacity-0 lg:group-hover/ledhero:opacity-100 lg:group-focus-within/ledhero:opacity-100"
        aria-label="Show next LED display banner"
      >
        <ArrowIcon direction="next" />
      </button>

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5" aria-label="Choose LED display banner">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => showSlide(index)}
            className={`h-2 cursor-pointer rounded-full border border-white/80 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b5bdd] focus-visible:ring-offset-2 ${
              index === activeIndex ? "w-8 bg-[#ff5a00]" : "w-2 bg-slate-400/65 hover:bg-slate-600"
            }`}
            aria-label={`Show ${slide.label}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
