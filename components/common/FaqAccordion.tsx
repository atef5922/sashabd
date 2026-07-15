"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export default function FaqAccordion({
  items = [],
  accent = "#FF6A00",
  columns = 2,
  className = "",
}: {
  items?: readonly FaqItem[];
  accent?: string;
  columns?: 1 | 2;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-extrabold"
                  style={{
                    borderColor: `${accent}55`,
                    color: accent,
                    background: `${accent}0A`,
                  }}
                >
                  {i + 1}
                </div>

                <div className="text-sm font-extrabold text-slate-900">{item.q}</div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600">
                {isOpen ? "\u2212" : "+"}
              </div>
            </button>

            <div
              className={`grid overflow-hidden px-5 transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className="text-sm text-slate-600 leading-7">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

