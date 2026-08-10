"use client";

import { useState } from "react";
import HorizontalDragScroll from "@/components/common/HorizontalDragScroll";
import Link from "next/link";

type ChipLink = { href: string; label: string };

function ChevronRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SolutionsTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto mb-1 flex h-8 w-8 -translate-y-0.5 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] align-middle shadow-[0_10px_22px_rgba(0,105,168,0.12)] md:mb-0 md:ml-0 md:mr-2 md:inline-flex md:h-9 md:w-9"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none">
        <rect
          x="4"
          y="5"
          width="16"
          height="10"
          rx="1.8"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 19h6M12 15v4M7.5 9.5h5M16 9.2c1 1 1 2.6 0 3.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function SolutionsBadgeIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
        <rect x="4" y="5" width="16" height="10" rx="1.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 19h6M12 15v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function LedSolutionsChipsSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const chips: ChipLink[] = [
    { href: "/led-display/indoor-led/", label: "Indoor LED Display" },
    { href: "/led-display/outdoor/", label: "Outdoor LED Display" },
    { href: "/led-display/rental-display/", label: "Rental LED Display" },
    { href: "/interactive-flat-panel/", label: "Interactive Flat Panel" },
    { href: "/digital-podium/", label: "Digital Podium" },
    { href: "/led-display/accessories/receiving-card/", label: "Receiving Card" },
    { href: "/led-display/accessories/controller/", label: "Controller" },
    { href: "/led-display/accessories/power-supply/", label: "Power Supply" },
    { href: "/led-display/accessories/led-accessories/", label: "LED Accessories" },
    { href: "/pa-system/", label: "PA System" },
    { href: "/conference-system/", label: "Conference System" },
    { href: "/turnstile-gate/", label: "Turnstile Gate" },
  ];

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(248,250,252,0.82)_100%)] py-5 md:py-6">
      <div className="mx-auto w-full max-w-7xl px-4 py-1 md:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0069A8]/20 bg-white px-4 py-2 text-[12px] font-semibold text-[#0069A8] shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-[#0069A8]/10">
            <SolutionsBadgeIcon />
            <span>Commercial Solutions</span>
          </span>
        </div>
        <h2 className="mx-auto mt-3 max-w-5xl pb-0 text-center text-[19px] font-extrabold leading-tight tracking-tight text-slate-900 after:hidden md:text-[24px]">
          <SolutionsTitleIcon />
          <span>Commercial Display, Audio & Smart Technology Solutions in Bangladesh</span>
        </h2>
        <div className="mx-auto mt-1.5 max-w-5xl text-center text-[12.5px] font-medium leading-6 text-slate-600 md:text-[13.5px]">
          <p className="hidden md:block">
            Explore our <strong className="font-extrabold text-slate-800">LED Displays</strong>,{" "}
            <strong className="font-extrabold text-slate-800">Rental LED Screens</strong>,{" "}
            <strong className="font-extrabold text-slate-800">PA Systems</strong>,{" "}
            <strong className="font-extrabold text-slate-800">Interactive Flat Panels</strong>,{" "}
            <strong className="font-extrabold text-slate-800">Digital Podiums</strong>,{" "}
            <strong className="font-extrabold text-slate-800">Turnstile Gates</strong>
            , and more with expert guidance, detailed specifications, and BOQ-ready quotations for projects across Bangladesh.
          </p>

          <div className="md:hidden">
            {mobileExpanded ? (
              <p className="mx-auto text-[12.5px] leading-5 text-slate-600">
                Explore our <strong className="font-extrabold text-slate-800">LED Displays</strong>,{" "}
                <strong className="font-extrabold text-slate-800">Rental LED Screens</strong>,{" "}
                <strong className="font-extrabold text-slate-800">PA Systems</strong>,{" "}
                <strong className="font-extrabold text-slate-800">Interactive Flat Panels</strong>,{" "}
                <strong className="font-extrabold text-slate-800">Digital Podiums</strong>,{" "}
                <strong className="font-extrabold text-slate-800">Turnstile Gates</strong>, and more with expert guidance,
                detailed specifications, and BOQ-ready quotations for projects across Bangladesh.
              </p>
            ) : (
              <p className="mx-auto max-w-full truncate text-[12.5px] leading-5">
                Explore our LED Displays, Rental LED Screens, PA Systems, Interactive Flat Panels, Digital Podiums...
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

        <nav aria-label="Product category quick links" className="mt-3">
          <HorizontalDragScroll
            ariaLabel="Category link chips"
            className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 scroll-smooth [scrollbar-width:none] [overscroll-behavior-x:contain] [&::-webkit-scrollbar]:hidden"
          >
            {chips.map((item) => (
              <Link
                key={`${item.href}:${item.label}`}
                href={item.href}
                prefetch={false}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[12px] font-semibold text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white hover:text-slate-900 hover:shadow-[0_12px_26px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/45 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="max-w-[26ch] truncate">{item.label}</span>
                <span className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-sky-600 motion-reduce:transition-none">
                  <ChevronRight />
                </span>
              </Link>
            ))}
          </HorizontalDragScroll>
        </nav>
      </div>
    </section>
  );
}
