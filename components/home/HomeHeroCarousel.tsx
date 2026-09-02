"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  features: readonly string[];
  mobilePosition: string;
};

const heroSlides: readonly HeroSlide[] = [
  {
    id: "led-display",
    eyebrow: "LED DISPLAY SOLUTIONS",
    title: "LED Display Solutions in Bangladesh",
    description:
      "Indoor, outdoor and rental LED displays with controllers, accessories, installation and dependable project support.",
    image: "/images/home_hero/led-display-hero.webp",
    imageAlt: "LED display showroom with indoor and outdoor screens, controllers and display accessories",
    primaryLabel: "Explore LED Displays",
    primaryHref: "/led-display/",
    secondaryLabel: "Get Free BOQ",
    secondaryHref: "/contact/?project=led-display",
    features: ["Indoor & Outdoor", "Rental LED Screens", "Controllers & Accessories", "Installation & Support"],
    mobilePosition: "68% center",
  },
  {
    id: "conference-system",
    eyebrow: "CONFERENCE SYSTEMS",
    title: "Professional Conference System Solutions",
    description:
      "Wired, wireless, digital and hybrid meeting-room systems with microphones, control units, DSP and complete BOQ support.",
    image: "/images/home_hero/conference-system-home-hero.webp",
    imageAlt: "Professional conference room with chairman and delegate microphones and system control equipment",
    primaryLabel: "Explore Conference Systems",
    primaryHref: "/conference-system/",
    secondaryLabel: "Plan Your Conference Room",
    secondaryHref: "/contact/?project=conference-system",
    features: ["Wired & Wireless", "Digital & Hybrid", "Chairman & Delegate Units", "Room Integration"],
    mobilePosition: "70% center",
  },
  {
    id: "pa-system",
    eyebrow: "PA & PROFESSIONAL AUDIO",
    title: "Complete PA Sound System Solutions",
    description:
      "Amplifiers, mixers, microphones and speaker systems for offices, institutions, auditoriums and public venues.",
    image: "/images/home_hero/pa-system-home-hero.webp",
    imageAlt: "Professional PA sound system with amplifiers, digital mixer, equipment rack and speakers",
    primaryLabel: "Explore PA Systems",
    primaryHref: "/pa-system/",
    secondaryLabel: "Get Audio System BOQ",
    secondaryHref: "/contact/?project=pa-system",
    features: ["PA Amplifiers", "Paging & Microphones", "Indoor & Outdoor Speakers", "Audio Commissioning"],
    mobilePosition: "70% center",
  },
  {
    id: "turnstile-gate",
    eyebrow: "ACCESS CONTROL SOLUTIONS",
    title: "Turnstile Gate & Smart Entrance Systems",
    description:
      "Flap barriers, swing gates and access-control integration for secure corporate, institutional and industrial entrances.",
    image: "/images/home_hero/Turnstile-gate-System-home-hero.webp",
    imageAlt: "Modern corporate entrance with turnstile gates and face recognition access control terminals",
    primaryLabel: "Explore Turnstile Gates",
    primaryHref: "/turnstile-gate/",
    secondaryLabel: "Plan Your Entrance",
    secondaryHref: "/contact/?project=turnstile-gate",
    features: ["Flap & Swing Barriers", "RFID & Biometrics", "Face & QR Access", "Installation & Training"],
    mobilePosition: "70% center",
  },
] as const;

const AUTO_PLAY_DELAY = 3000;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "m14.5 6.5-5.5 5.5 5.5 5.5" : "m9.5 6.5 5.5 5.5-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M6 3h9l4 4v14H6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v5h5M9 12h7M9 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function HomeHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = heroSlides[activeIndex];

  const selectSlide = useCallback((nextIndex: number) => {
    setActiveIndex((nextIndex + heroSlides.length) % heroSlides.length);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (isPaused || reduceMotion.matches) return;

    const timer = window.setInterval(showNext, AUTO_PLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, showNext]);

  return (
    <section
      role="region"
      className="home-hero-shell group relative left-1/2 right-1/2 isolate -mx-[50vw] -mt-2 min-h-[430px] w-screen overflow-hidden bg-[#f7f9fc] sm:min-h-[420px] lg:min-h-[clamp(20rem,25vw,23rem)]"
      aria-roledescription="carousel"
      aria-label="Sasha Corporation technology solutions"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (startX === null || endX === undefined) return;
        const distance = endX - startX;
        if (Math.abs(distance) < 55) return;
        if (distance > 0) showPrevious();
        else showNext();
      }}
    >
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.image}
          alt={index === activeIndex ? slide.imageAlt : ""}
          fill
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="100vw"
          className={`h-full w-full object-cover object-[var(--mobile-position)] transition-opacity duration-300 ease-out motion-reduce:transition-none sm:object-[62%_center] lg:object-center ${
            index === activeIndex ? "z-0 opacity-100" : "pointer-events-none -z-10 opacity-0"
          }`}
          style={{ "--mobile-position": slide.mobilePosition } as React.CSSProperties}
        />
      ))}

      <div
        className="absolute inset-0 z-10 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.98)_45%,rgba(255,255,255,.86)_68%,rgba(255,255,255,.35)_100%)] md:bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.96)_34%,rgba(255,255,255,.48)_46%,rgba(255,255,255,.05)_60%,transparent_68%)] lg:bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.94)_27%,rgba(255,255,255,.46)_38%,rgba(255,255,255,.04)_52%,transparent_60%)]"
        aria-hidden="true"
      />

      <div
        key={activeSlide.id}
        role="group"
        className="home-hero-frame relative z-20 mx-auto flex min-h-[430px] w-full max-w-[clamp(80rem,90vw,108rem)] flex-col px-5 py-7 sm:min-h-[420px] sm:px-8 lg:min-h-[clamp(20rem,25vw,23rem)] lg:px-10 lg:py-[clamp(1.5rem,2vw,2rem)]"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${heroSlides.length}: ${activeSlide.title}`}
      >
              <div className="home-hero-content max-w-[19rem] text-left sm:max-w-[34rem] lg:max-w-[39%] lg:translate-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ef4a00] sm:text-[11px]">
                  {activeSlide.eyebrow}
                </p>
                {activeIndex === 0 ? (
                  <h1 className="home-hero-title mt-2 text-[1.75rem] font-black leading-[1.08] tracking-[-0.035em] text-[#071936] sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">
                    {activeSlide.title}
                  </h1>
                ) : (
                  <h2 className="home-hero-title mt-2 !pb-0 text-[1.75rem] font-black leading-[1.08] tracking-[-0.035em] text-[#071936] after:!hidden sm:text-[2rem] lg:text-[2.125rem] xl:text-4xl">
                    {activeSlide.title}
                  </h2>
                )}
                <p className="home-hero-description mt-3 max-w-[38rem] text-[13px] font-medium leading-5 text-slate-700 sm:text-sm sm:leading-6 lg:text-[clamp(0.78rem,0.9vw,0.95rem)]">
                  {activeSlide.description}
                </p>

                <div className="home-hero-actions mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row lg:grid lg:max-w-[23rem] lg:grid-cols-2 xl:flex xl:max-w-none">
                  <Link
                    prefetch={false}
                    href={activeSlide.primaryHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#071936] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(7,25,54,0.18)] transition hover:-translate-y-0.5 hover:bg-[#102b52] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071936] focus-visible:ring-offset-2 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"
                  >
                    <span className="inline-flex"><GridIcon /></span>
                    {activeSlide.primaryLabel}
                  </Link>
                  <Link
                    prefetch={false}
                    href={activeSlide.secondaryHref}
                    className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#ef4a00] to-[#ff6a00] px-5 text-[12px] font-extrabold text-white shadow-[0_8px_22px_rgba(255,94,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:text-[13px] lg:px-2.5 lg:text-[10px] xl:px-5 xl:text-[13px]"
                  >
                    <span className="inline-flex"><DocumentIcon /></span>
                    {activeSlide.secondaryLabel}
                  </Link>
                </div>
              </div>

              <ul className="home-hero-features mt-auto grid max-w-[39rem] grid-cols-2 gap-x-3 gap-y-2.5 pb-9 pt-5 sm:grid-cols-2 sm:gap-x-5 sm:pb-10 lg:w-[56%] lg:max-w-none lg:grid-cols-4 lg:gap-x-7 lg:pb-0 lg:pt-3">
                {activeSlide.features.map((feature) => (
                  <li key={feature} className="flex min-w-0 items-center gap-2 rounded-md border border-white/60 bg-white/75 px-2 py-1.5 text-left text-[#071936] shadow-sm backdrop-blur-[2px] md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:backdrop-blur-none">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#071936]/15 bg-white/80 text-[#ef4a00] shadow-sm">
                      <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path d="m5.5 10 2.7 2.7 6.2-6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[9px] font-black leading-3 sm:text-[9.5px] lg:text-[10px]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

      <button
        type="button"
        onClick={showPrevious}
        className="absolute left-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-[#071936] opacity-100 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:left-4 sm:inline-flex lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
        aria-label="Show previous solution"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={showNext}
        className="absolute right-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-[#071936] opacity-100 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:right-4 sm:inline-flex lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
        aria-label="Show next solution"
      >
        <ArrowIcon direction="right" />
      </button>

      <div className="absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center gap-2 sm:bottom-2">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => selectSlide(index)}
            className={`h-2 rounded-full border backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 motion-reduce:transition-none ${
              index === activeIndex
                ? "w-9 border-white/75 bg-gradient-to-r from-[#ef4a00]/90 to-[#ff8a32]/85 shadow-[0_2px_10px_rgba(239,74,0,0.38)]"
                : "w-2 border-white/70 bg-slate-900/20 shadow-[0_2px_8px_rgba(15,23,42,0.20)] hover:bg-white/65"
            }`}
            aria-label={`Show ${slide.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
