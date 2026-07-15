"use client";

import Link from "next/link";
import { breadcrumbJsonLd, type BreadcrumbItem } from "@/lib/breadcrumbs";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  showBackLink?: boolean;
  panelClassName?: string;
  backButtonClassName?: string;
};

export default function Breadcrumbs({
  items,
  className = "mb-4 text-sm text-slate-600",
  showBackLink = true,
  panelClassName,
  backButtonClassName,
}: BreadcrumbsProps) {
  const jsonLd = breadcrumbJsonLd(items);
  const fallbackHref = items.length > 1 ? items[items.length - 2]?.href ?? "/" : "/";

  function handleBackClick() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = fallbackHref;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={className}>
        <div
          className={[
            "flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between",
            panelClassName ?? "",
          ].join(" ").trim()}
        >
          <ol className="flex flex-wrap items-center gap-y-1">
            {items.map((item, index) => (
              <li key={`${item.href}-${item.label}`} className="flex items-center">
                {item.current ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-slate-900"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="text-slate-900 hover:underline">
                    {item.label}
                  </Link>
                )}
                {index < items.length - 1 ? (
                  <span className="mx-2 text-slate-400">/</span>
                ) : null}
              </li>
            ))}
          </ol>

          {showBackLink ? (
            <button
              type="button"
              onClick={handleBackClick}
              className={[
                "inline-flex w-fit cursor-pointer items-center justify-center self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:border-slate-300 hover:text-slate-950 md:self-auto",
                backButtonClassName ?? "",
              ].join(" ").trim()}
            >
              Return to previous page
            </button>
          ) : null}
        </div>
      </nav>
    </>
  );
}
