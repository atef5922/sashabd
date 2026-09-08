"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { homeBrandLogos } from "@/components/home/HomeTrustServiceStrip";

const featureTags = [
  "LED Display Solutions",
  "Conference System Solutions",
  "PA System Integration",
  "Turnstile & Access Solutions",
] as const;

const brandAltText: Record<(typeof homeBrandLogos)[number]["name"], string> = {
  LianTronics: "LianTronics LED display technology",
  Leyard: "Leyard LED display technology",
  NovaStar: "NovaStar LED display control system",
  "AOTO Electronics": "AOTO Electronics LED display technology",
  "G-Energy": "G-Energy LED display power supply",
  Lampro: "Lampro LED display technology",
  Huidu: "Huidu LED display controller",
  Colorlight: "Colorlight LED display controller",
  "Mean Well": "Mean Well display power supply",
  Mugnee: "Mugnee LED display components",
  "Renex Digital": "Renex Digital LED display technology",
  Synoveta: "Synoveta LED display technology",
  Bosch: "Bosch conference and PA system technology",
  TOA: "TOA conference and PA system technology",
  SPON: "SPON conference and PA system technology",
  CMX: "CMX conference and PA system technology",
};

function TechnologyBrandsTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="technology-brands-title-icon hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[0_10px_22px_rgba(0,105,168,0.12)] md:inline-flex"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
        <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M10.2 12h3.6M12 10.2v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function TechnologyBrandsBadgeIcon() {
  return (
    <span
      aria-hidden="true"
      className="technology-brands-badge-icon inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M17 10h3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function TrustedTechnologyPartnersSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const trustedPartnersSubtitleContent = (
    <>
      Sasha Corporation is an authorized distributor and technology solutions provider in Bangladesh, specializing in{" "}
      <strong className="font-bold text-slate-900">LED Display</strong> and{" "}
      <strong className="font-bold text-slate-900">Conference System</strong> solutions. We work with globally recognized{" "}
      <strong className="font-bold text-slate-900">LED display</strong> and technology brands including{" "}
      <strong className="font-bold text-slate-900">Leyard</strong>,{" "}
      <strong className="font-bold text-slate-900">LianTronics</strong>,{" "}
      <strong className="font-bold text-slate-900">AOTO</strong>,{" "}
      <strong className="font-bold text-slate-900">Lampro</strong> and{" "}
      <strong className="font-bold text-slate-900">NovaStar</strong>, alongside professional{" "}
      <strong className="font-bold text-slate-900">conference</strong> and{" "}
      <strong className="font-bold text-slate-900">PA system</strong> brands such as{" "}
      <strong className="font-bold text-slate-900">Bosch</strong>,{" "}
      <strong className="font-bold text-slate-900">TOA</strong> and{" "}
      <strong className="font-bold text-slate-900">SPON</strong>. We deliver complete solutions for corporate, government,
      commercial and institutional projects, including professional installation, system integration and after-sales
      technical support across Bangladesh.
    </>
  );

  return (
    <section id="home-technology-partners" aria-labelledby="home-technology-partners-title" className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white px-4 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-5 md:px-6">
      <div className="w-full">
        <div className="text-left">
          <span className="home-section-badge technology-partners-eyebrow">
            <TechnologyBrandsBadgeIcon />
            <span>Technology Partners</span>
          </span>
        </div>
        <h2 id="home-technology-partners-title" className="mt-2 flex max-w-4xl items-center gap-2 !pb-0 text-xl font-extrabold leading-7 tracking-tight text-[#071936] after:!hidden lg:text-[22px]">
          <TechnologyBrandsTitleIcon />
          <span className="min-w-0 text-balance">
            Authorized Distributor &amp; <span className="text-[#1660e8]">Technology Partner in Bangladesh</span>
          </span>
        </h2>

        <div className="mt-1 w-full text-left text-[12.5px] font-medium leading-5 text-slate-600 md:text-[13px]">
          <p className="home-section-subtitle hidden md:block">{trustedPartnersSubtitleContent}</p>

          <div className="md:hidden">
            {mobileExpanded ? (
              <p className="home-section-subtitle mx-auto leading-5 text-slate-600">{trustedPartnersSubtitleContent}</p>
            ) : (
              <p className="home-section-subtitle mx-auto max-w-full truncate leading-5">
                Sasha Corporation is an authorized distributor and technology solutions provider in Bangladesh...
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

        <div className="mt-4 rounded-xl bg-slate-50/55 p-3 shadow-[0_4px_16px_rgba(15,23,42,0.035)] md:p-4">
          <div className="group relative min-h-[74px] overflow-hidden rounded-lg border border-[#dce9fb] bg-white px-3 shadow-[0_7px_20px_rgba(16,39,90,.05)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/90 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/90 to-transparent" />
            <div className="home-brand-marquee-track flex min-h-[72px] w-max items-center will-change-transform group-hover:[animation-play-state:paused] motion-reduce:transform-none motion-reduce:animate-none">
              {[0, 1].map((groupIndex) => (
                <div key={groupIndex} aria-hidden={groupIndex === 1 ? "true" : undefined} className="flex shrink-0 items-center">
                  {homeBrandLogos.map((brand) => (
                    <Link key={`${groupIndex}-${brand.name}`} href={brand.href} prefetch={false} aria-label={groupIndex === 0 ? `Browse ${brand.name} solutions` : undefined} tabIndex={groupIndex === 1 ? -1 : undefined} className="relative flex h-10 w-[128px] shrink-0 items-center justify-center overflow-hidden border-r border-[#dce9fb] px-4 transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1465ef]">
                      <Image src={brand.src} alt={groupIndex === 0 ? brandAltText[brand.name] : ""} width={128} height={40} className={`${brand.className} w-auto max-w-[108px] object-contain`} />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pb-1">
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-700 md:gap-2 md:text-xs">
              {featureTags.map((item) => (
                <span key={item} className="whitespace-nowrap rounded-full border bg-slate-50 px-3 py-1.5 md:px-4 md:py-2" style={{ borderColor: "rgba(255,106,0,0.14)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .technology-partners-eyebrow { color: #1456d9 !important; }
        .technology-brands-badge-icon,
        .technology-brands-title-icon {
          color: #1456d9 !important;
          background-color: #edf4ff !important;
          border-color: #d9e7fb !important;
        }
        .technology-brands-badge-icon svg,
        .technology-brands-title-icon svg { color: #1456d9 !important; }
      `}</style>
    </section>
  );
}
