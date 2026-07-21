"use client";

import { useEffect, useRef, useState } from "react";

const trustedTechPartnerLogos: Array<{ name: string; src: string; href?: string }> = [
  { name: "Absen", src: "/images/logo/absen.webp", href: "https://www.absen.com/" },
  { name: "Unilumin", src: "/images/logo/unilumin.webp", href: "https://www.unilumin.com/" },
  { name: "Leyard", src: "/images/logo/leyard.webp", href: "https://www.leyardhk.com/" },
  { name: "LianTronics", src: "/images/logo/liantronics.png", href: "https://www.liantronics.com/" },
  { name: "AOTO Electronics", src: "/images/logo/aoto-electronics.webp", href: "https://en.aoto.com/" },
  { name: "G-Energy", src: "/images/logo/g-energy.webp" },
  { name: "Lampro", src: "/images/logo/lampro.webp", href: "https://www.lampro.net/" },
  { name: "NovaStar", src: "/images/logo/novastar.webp", href: "https://www.novastar.tech/" },
  { name: "Huidu", src: "/images/brands/huidu.webp", href: "https://www.huidu.cn/" },
  { name: "Colorlight", src: "/images/logo/colorlight.webp", href: "https://en.colorlightinside.com/" },
  { name: "Mean Well", src: "/images/logo/mean-well.webp", href: "https://www.meanwell.com/" },
  { name: "Mugnee Multiple Limited", src: "/images/logo/mugnee.webp", href: "https://www.mugnee.com/" },
  { name: "Renex Digital", src: "/images/brands/renex-exact.webp", href: "https://renex.com.bd/" },
];

const hiddenPartnerNames = new Set(["Absen", "Unilumin", "Leyard"]);
const visibleTrustedTechPartnerLogos = trustedTechPartnerLogos.filter((brand) => !hiddenPartnerNames.has(brand.name));

const featureTags = [
  "Quality-focused workflow",
  "Authorized brand ecosystem",
  "Industry-grade components",
  "Project-based support & service",
] as const;

function getLogoClassName(name: string) {
  if (name === "G-Energy") return "h-10 w-auto max-w-[118px] object-contain md:h-12 md:max-w-[152px]";
  if (name === "LianTronics") return "h-7 w-auto max-w-[108px] object-contain md:h-9 md:max-w-[148px]";
  if (name === "AOTO Electronics") return "h-8 w-auto max-w-[102px] object-contain md:h-10 md:max-w-[132px]";
  if (name === "Lampro") return "h-7 w-auto max-w-[104px] object-contain md:h-9 md:max-w-[136px]";
  if (name === "Huidu") return "h-8 w-auto max-w-[116px] object-contain md:h-10 md:max-w-[145px]";
  if (name === "NovaStar") return "h-8 w-auto max-w-[118px] object-contain md:h-10 md:max-w-[150px]";
  if (name === "Mugnee Multiple Limited") return "h-8 w-auto max-w-[122px] object-contain md:h-10 md:max-w-[156px]";
  if (name === "Renex Digital") return "h-10 w-full max-w-none object-cover object-center md:h-12";
  return "h-8 w-auto max-w-[112px] object-contain md:h-10 md:max-w-[146px]";
}

export default function TrustedTechnologyPartnersSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const marqueeFrameRef = useRef<number | null>(null);
  const marqueeOffsetRef = useRef(0);
  const trustedPartnersSubtitle =
    "We use globally trusted LED display components in Bangladesh projects with LianTronics, AOTO Electronics, G-Energy, Lampro, NovaStar, Huidu, Colorlight, Mean Well, Mugnee Multiple Limited, and Renex Digital to ensure stable performance, reliable power, and long-term support.";
  const trustedPartnersSubtitleContent = (
    <>
      We use globally trusted LED display components in Bangladesh projects with{" "}
      <span className="font-bold text-slate-900">LianTronics</span>,{" "}
      <span className="font-bold text-slate-900">AOTO Electronics</span>,{" "}
      <span className="font-bold text-slate-900">G-Energy</span>,{" "}
      <span className="font-bold text-slate-900">Lampro</span>,{" "}
      <span className="font-bold text-slate-900">NovaStar</span>,{" "}
      <span className="font-bold text-slate-900">Huidu</span>,{" "}
      <span className="font-bold text-slate-900">Colorlight</span>,{" "}
      <span className="font-bold text-slate-900">Mean Well</span>,{" "}
      <span className="font-bold text-slate-900">Mugnee Multiple Limited</span>, and{" "}
      <span className="font-bold text-slate-900">Renex Digital</span> to ensure stable performance, reliable power, and
      long-term support.
    </>
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const stopMarquee = () => {
      if (marqueeFrameRef.current !== null) {
        window.cancelAnimationFrame(marqueeFrameRef.current);
        marqueeFrameRef.current = null;
      }
    };

    const resetMarquee = () => {
      marqueeOffsetRef.current = 0;
      if (marqueeTrackRef.current) {
        marqueeTrackRef.current.style.transform = "";
      }
    };

    const startMarquee = () => {
      const track = marqueeTrackRef.current;
      if (!track || !mediaQuery.matches) return;

      stopMarquee();
      let lastTime: number | null = null;

      const tick = (time: number) => {
        const currentTrack = marqueeTrackRef.current;
        if (!currentTrack || !mediaQuery.matches) return;

        if (lastTime === null) lastTime = time;
        const delta = time - lastTime;
        lastTime = time;

        const loopWidth = currentTrack.scrollWidth / 2;
        if (loopWidth <= 0) {
          marqueeFrameRef.current = window.requestAnimationFrame(tick);
          return;
        }

        marqueeOffsetRef.current = (marqueeOffsetRef.current + delta * 0.03) % loopWidth;
        currentTrack.style.transform = `translate3d(-${marqueeOffsetRef.current}px, 0, 0)`;
        marqueeFrameRef.current = window.requestAnimationFrame(tick);
      };

      marqueeFrameRef.current = window.requestAnimationFrame(tick);
    };

    const syncMode = () => {
      if (mediaQuery.matches) {
        startMarquee();
      } else {
        stopMarquee();
        resetMarquee();
      }
    };

    syncMode();
    mediaQuery.addEventListener("change", syncMode);

    return () => {
      mediaQuery.removeEventListener("change", syncMode);
      stopMarquee();
      resetMarquee();
    };
  }, []);

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-slate-50/80 py-5 md:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 py-1 md:px-6">
        <h2 className="mx-auto flex max-w-5xl items-start justify-center gap-2 pb-0 text-center text-[1.45rem] font-bold leading-[1.25] text-slate-900 after:hidden md:items-center md:text-2xl">
          <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-6 w-6 shrink-0 text-slate-800 md:mt-0" aria-hidden="true">
            <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span className="min-w-0 text-balance">Trusted Technology Partners & Authorized Brands</span>
        </h2>

        <div className="mx-auto mt-2 max-w-5xl text-center text-sm leading-6 text-slate-600">
          <p className="hidden md:block">{trustedPartnersSubtitleContent}</p>

          <div className="md:hidden">
            {mobileExpanded ? (
              <p className="mx-auto text-[13px] leading-5 text-slate-600">{trustedPartnersSubtitleContent}</p>
            ) : (
              <p className="mx-auto max-w-full truncate text-[13px] leading-5">
                We use globally trusted LED display components in Bangladesh projects with LianTronics, AOTO Electronics...
              </p>
            )}
            <button
              type="button"
              onClick={() => setMobileExpanded((prev) => !prev)}
              className="mt-1 inline-flex items-center justify-center text-[12px] font-semibold text-[#F56605]"
            >
              {mobileExpanded ? "Show less" : "Learn more"}
            </button>
          </div>
        </div>

        <div className="mt-4 -mx-4 rounded-none bg-white/95 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 md:mx-0 md:rounded-[28px] md:p-5">
          <div className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 md:w-14"
              style={{ background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))" }}
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 md:w-14"
              style={{ background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))" }}
            />

            <div className="group">
              <div
                ref={marqueeTrackRef}
                className="flex w-max gap-2 will-change-transform md:gap-3 md:animate-[renexMarquee_42s_linear_infinite] md:group-hover:[animation-play-state:paused] motion-reduce:animate-none"
              >
                {[...visibleTrustedTechPartnerLogos, ...visibleTrustedTechPartnerLogos].map((brand, index) =>
                  brand.href ? (
                    <a
                      key={`${brand.name}-${index}`}
                      href={brand.href}
                      target="_blank"
                      rel="nofollow noreferrer"
                      className="flex h-[3.25rem] w-[7.75rem] shrink-0 items-center justify-center rounded-2xl border bg-white px-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:h-16 md:w-40 md:rounded-[20px] md:px-4"
                      style={{ borderColor: "rgba(255,106,0,0.12)" }}
                      title={brand.name}
                      aria-label={brand.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.src}
                        alt={brand.name}
                        className={getLogoClassName(brand.name)}
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <div
                      key={`${brand.name}-${index}`}
                      className="flex h-[3.25rem] w-[7.75rem] shrink-0 items-center justify-center rounded-2xl border bg-white px-3 shadow-sm md:h-16 md:w-40 md:rounded-[20px] md:px-4"
                      style={{ borderColor: "rgba(255,106,0,0.12)" }}
                      title={brand.name}
                      aria-label={brand.name}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.src}
                        alt={brand.name}
                        className={getLogoClassName(brand.name)}
                        loading="lazy"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full flex-nowrap items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-700 md:w-auto md:min-w-0 md:flex-wrap md:gap-2 md:text-xs">
              {featureTags.map((item) => (
                <span key={item} className="whitespace-nowrap rounded-full border bg-slate-50 px-3 py-1.5 md:px-4 md:py-2" style={{ borderColor: "rgba(255,106,0,0.14)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
