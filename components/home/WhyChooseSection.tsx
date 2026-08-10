"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type WhyChooseItem = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  accentClassName: string;
  icon: React.ReactNode;
};

const whyChooseItems: WhyChooseItem[] = [
  {
    title: "Project-first consultation",
    description:
      "We align BOQ, site condition, viewing distance and product scope early so your LED display or audio project starts with fewer mistakes.",
    href: "/contact/",
    linkLabel: "Discuss your requirement",
    accentClassName: "text-sky-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H10l-4 3v-3.2A2.5 2.5 0 0 1 5 13.5v-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Specification & quotation clarity",
    description:
      "From pixel pitch and cabinet structure to controller, receiving card and power planning, we keep pricing direction more practical and easier to compare.",
    href: "/services-support/",
    linkLabel: "See planning support",
    accentClassName: "text-emerald-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M7 4h8l4 4v12H7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M15 4v4h4M10 12h6M10 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Reliable branded components",
    description:
      "We focus on stable component selection for Bangladesh conditions so performance, power stability and long-term maintenance stay more dependable.",
    href: "/led-display/",
    linkLabel: "Browse LED solutions",
    accentClassName: "text-orange-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m9.2 12.3 1.8 1.8 3.8-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Installation with testing",
    description:
      "Our workflow covers installation, alignment, controller setup and commissioning so display, conference and access-control systems go live with confidence.",
    href: "/projects/",
    linkLabel: "View executed projects",
    accentClassName: "text-violet-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M4 17h16M6.5 17V9.5L12 6l5.5 3.5V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "After-sales support that continues",
    description:
      "Training, troubleshooting guidance and maintenance support help your team operate LED display, PA system and digital podium solutions more smoothly.",
    href: "/services-support/",
    linkLabel: "Check support coverage",
    accentClassName: "text-cyan-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M4 13a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="3" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="17" y="12" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 19v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Solutions across multiple categories",
    description:
      "One experienced team can support LED display, PA system, conference system, interactive panel and turnstile projects without fragmented coordination.",
    href: "/led-display/",
    linkLabel: "Explore product categories",
    accentClassName: "text-rose-700",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m12 7 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getMobileCardClassName(accentClassName: string) {
  if (accentClassName.includes("sky")) {
    return "border-sky-200/70 bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_46%,#e0f2fe_100%)] shadow-[0_14px_34px_rgba(14,165,233,0.10)]";
  }
  if (accentClassName.includes("emerald")) {
    return "border-emerald-200/70 bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_46%,#d1fae5_100%)] shadow-[0_14px_34px_rgba(16,185,129,0.10)]";
  }
  if (accentClassName.includes("orange")) {
    return "border-orange-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_46%,#ffedd5_100%)] shadow-[0_14px_34px_rgba(249,115,22,0.11)]";
  }
  if (accentClassName.includes("violet")) {
    return "border-violet-200/75 bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_46%,#ede9fe_100%)] shadow-[0_14px_34px_rgba(139,92,246,0.10)]";
  }
  if (accentClassName.includes("cyan")) {
    return "border-cyan-200/75 bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_46%,#cffafe_100%)] shadow-[0_14px_34px_rgba(6,182,212,0.10)]";
  }
  return "border-rose-200/75 bg-[linear-gradient(180deg,#fff1f2_0%,#ffffff_46%,#ffe4e6_100%)] shadow-[0_14px_34px_rgba(244,63,94,0.10)]";
}

function WhyChooseBadgeIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]"
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
        <path
          d="M12 3.5 14.3 8l5 .7-3.6 3.5.9 5-4.6-2.4-4.6 2.4.9-5L4.7 8.7l5-.7L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function WhyChooseTitleIcon() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#0069A8]/20 bg-sky-50 text-[#0069A8] shadow-[0_10px_22px_rgba(0,105,168,0.12)] md:mr-2 md:inline-flex md:h-9 md:w-9"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none">
        <path
          d="M12 3 5 6v6c0 4.2 2.7 7.2 7 9 4.3-1.8 7-4.8 7-9V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m9.2 12.3 1.8 1.8 3.8-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function WhyChooseSection() {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollToSlide = (index: number) => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    const target = cards[index];
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveSlide(index);
  };

  const handleCarouselScroll = () => {
    const container = mobileCarouselRef.current;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    if (!cards.length) return;

    const containerLeft = container.scrollLeft;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - containerLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeSlide) {
      setActiveSlide(nearestIndex);
    }
  };

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(248,250,252,0.92)_48%,rgba(255,255,255,1)_100%)] py-6 md:py-7">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0069A8]/20 bg-white px-4 py-2 text-[12px] font-semibold text-[#0069A8] shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-[#0069A8]/10">
            <WhyChooseBadgeIcon />
            <span>Why Choose Sasha Corporation</span>
          </span>
          <h2 className="mt-3 pb-0 text-[25px] font-extrabold leading-tight tracking-tight text-slate-900 after:hidden md:text-[40px]">
            <WhyChooseTitleIcon />
            <span>Why businesses in Bangladesh choose our technology solutions</span>
          </h2>
          <div className="mt-2 text-sm leading-7 text-slate-600 md:text-[15px]">
            <p className="hidden md:block">
              We combine planning clarity, dependable components, installation execution and long-term support to help LED display,
              PA system, conference and access-control projects move faster with better confidence.
            </p>
            <div className="md:hidden">
              {mobileExpanded ? (
                <p className="text-[13px] leading-5 text-slate-600">
                  We combine planning clarity, dependable components, installation execution and long-term support to help LED display,
                  PA system, conference and access-control projects move faster with better confidence.
                </p>
              ) : (
                <p className="mx-auto max-w-full truncate text-[13px] leading-5">
                  We combine planning clarity, dependable components, installation execution and long-term support...
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
        </div>

        <div className="mt-5 md:hidden">
          <div
            ref={mobileCarouselRef}
            onScroll={handleCarouselScroll}
            className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {whyChooseItems.map((item) => (
              <article
                key={item.title}
                className={`group flex min-h-[16.25rem] w-[89%] shrink-0 snap-start flex-col rounded-[20px] border p-4 transition duration-300 motion-reduce:transition-none ${getMobileCardClassName(item.accentClassName)}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/70 bg-white/80 shadow-sm ${item.accentClassName}`}>
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-bold leading-snug tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-slate-700">
                      {item.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={item.href}
                  prefetch={false}
                  className="mt-auto inline-flex items-center gap-2 pt-4 text-[13px] font-extrabold text-slate-900 transition group-hover:text-slate-950"
                >
                  <span>{item.linkLabel}</span>
                  <span className={`transition group-hover:translate-x-0.5 motion-reduce:transition-none ${item.accentClassName}`}>
                    <ArrowRight />
                  </span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            {whyChooseItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to why choose card ${index + 1}`}
                className={`h-1.5 rounded-full transition ${activeSlide === index ? "w-6 bg-[#F56605]" : "w-1.5 bg-slate-300"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
          {whyChooseItems.map((item) => (
            <article
              key={item.title}
              className="group flex h-full flex-col rounded-[18px] border border-slate-200/80 bg-white/96 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-start gap-3">
                <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-slate-200 bg-slate-50 ${item.accentClassName}`}>
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[20px] font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>

              <Link
                href={item.href}
                prefetch={false}
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold text-sky-700 transition group-hover:text-sky-800"
              >
                <span>{item.linkLabel}</span>
                <span className="transition group-hover:translate-x-0.5 motion-reduce:transition-none">
                  <ArrowRight />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
