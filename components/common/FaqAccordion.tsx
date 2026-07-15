"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({
  items = [],
  accent = "#FF6A00",
  columns = 2,
  density = "default",
  className = "",
}: {
  items?: readonly FaqItem[];
  accent?: string;
  columns?: 1 | 2;
  density?: "default" | "compact";
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const compact = density === "compact";
  const buttonPaddingClass = compact ? "px-4 py-3" : "p-5";
  const buttonGapClass = compact ? "gap-3" : "gap-4";
  const contentGapClass = compact ? "gap-3" : "gap-4";
  const badgeClass = compact
    ? "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-extrabold"
    : "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-extrabold";
  const questionClass = compact
    ? "min-w-0 flex-1 text-[12px] font-extrabold leading-snug tracking-[-0.01em] text-slate-900 md:whitespace-nowrap"
    : "min-w-0 flex-1 text-[13px] font-extrabold leading-snug text-slate-900";
  const toggleClass = compact
    ? "flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600"
    : "flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600";
  const answerWrapClass = compact ? "grid overflow-hidden px-4 transition-all duration-300" : "grid overflow-hidden px-5 transition-all duration-300";
  const answerTextClass = compact ? "text-[13px] leading-6 text-slate-600" : "text-sm text-slate-600 leading-7";

  return (
    <div className={`grid items-start gap-4 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-1"} ${className}`.trim()}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={`${i}-${item.q}`}
            className="self-start rounded-2xl border bg-white transition"
            style={{
              borderColor: isOpen ? `${accent}55` : "rgba(15,23,42,0.12)",
              boxShadow: isOpen ? "0 10px 30px rgba(2,6,23,0.06)" : "none",
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`flex w-full items-center justify-between ${buttonGapClass} ${buttonPaddingClass} text-left`}
              aria-expanded={isOpen}
            >
              <div className={`flex min-w-0 items-center ${contentGapClass}`}>
                <div
                  className={badgeClass}
                  style={{
                    borderColor: `${accent}55`,
                    color: accent,
                    background: `${accent}0A`,
                  }}
                >
                  {i + 1}
                </div>

                <div className={questionClass}>{item.q}</div>
              </div>

              <div className={toggleClass}>
                {isOpen ? "\u2212" : "+"}
              </div>
            </button>

            <div
              className={`${answerWrapClass} ${
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className={answerTextClass}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

