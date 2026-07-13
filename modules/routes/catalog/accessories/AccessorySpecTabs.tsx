"use client";

import { useState } from "react";
import { looksLikePriceText, normalizeDisplayedPriceText } from "@/lib/price";

type KeySpec = { k: string; v: string };

export default function AccessorySpecTabs({
  specs,
  descriptionParagraphs,
  brandMaroon,
}: {
  specs: readonly KeySpec[];
  descriptionParagraphs: readonly string[];
  brandMaroon: string;
}) {
  const [activeTab, setActiveTab] = useState<"spec" | "description">("spec");

  return (
    <div className="rounded-3xl border bg-white p-6 md:p-8" style={{ borderColor: `${brandMaroon}12` }}>
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-6 text-base font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("spec")}
            className="border-b-2 pb-2"
            style={{
              borderColor: activeTab === "spec" ? brandMaroon : "transparent",
              color: activeTab === "spec" ? brandMaroon : "#334155",
            }}
          >
            Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className="border-b-2 pb-2"
            style={{
              borderColor: activeTab === "description" ? brandMaroon : "transparent",
              color: activeTab === "description" ? brandMaroon : "#475569",
            }}
          >
            Description
          </button>
        </div>
      </div>

      {activeTab === "spec" ? (
        <div className="mt-2 divide-y divide-slate-100">
          {specs.map((s) => (
            <div key={`${s.k}-${s.v}`} className="grid grid-cols-[1fr_1.1fr] gap-6 py-3 text-sm">
              <div className="font-semibold text-slate-900">{s.k}</div>
              <div className="text-slate-700">{looksLikePriceText(s.v) ? normalizeDisplayedPriceText(s.v) : s.v}</div>
            </div>
          ))}
        </div>
      ) : null}

      {activeTab === "description" ? (
        <div className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
          {descriptionParagraphs.map((p, idx) => (
            <p key={idx} className="text-justify">
              {p}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
