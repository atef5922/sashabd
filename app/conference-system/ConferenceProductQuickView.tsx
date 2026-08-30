"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ConferenceProductCardData } from "./ConferenceProductCard";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function ConferenceProductQuickView({
  product,
  productHref,
  quotationHref,
}: {
  product: ConferenceProductCardData;
  productHref: string;
  quotationHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeImageSrc, setActiveImageSrc] = useState(product.image.src);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const closeDialog = useCallback(() => setOpen(false), []);
  const galleryImages = useMemo(() => {
    const seen = new Set<string>();
    return (product.images?.length ? product.images : [product.image]).filter((image) => {
      if (seen.has(image.src)) return false;
      seen.add(image.src);
      return true;
    });
  }, [product.image, product.images]);
  const activeImage = galleryImages.find((image) => image.src === activeImageSrc) ?? galleryImages[0] ?? product.image;
  const highlights = [...new Set([
    ...(product.features ?? []),
    ...product.keySpecs.map((spec) => spec.value),
  ])].filter(Boolean).slice(0, 4);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    const triggerElement = triggerRef.current;
    const restoreFocusTarget = triggerElement
      ?? (previouslyFocused instanceof HTMLElement ? previouslyFocused : null);
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
        .filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusTarget?.focus();
    };
  }, [closeDialog, open]);

  const dialog = open ? (
    <div
      className="conference-quick-view-overlay fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-[2px] sm:p-5"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
      data-conference-quick-view-overlay
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="conference-quick-view-dialog relative max-h-[calc(100dvh-24px)] w-full max-w-[1120px] overflow-hidden rounded-xl bg-white shadow-[0_28px_90px_rgba(2,8,23,0.4)] sm:max-h-[calc(100dvh-40px)] sm:w-[calc(100vw-40px)] sm:rounded-2xl"
        data-conference-quick-view-dialog
      >
        <div className="relative z-20 flex min-h-12 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-700">Quick product preview</p>
            <p className="truncate text-[11px] font-semibold text-slate-500">Verified catalog details</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeDialog}
            aria-label={`Close quick view for ${product.name}`}
            className="conference-quick-view-close inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white text-lg leading-none text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div
          className={`conference-quick-view-layout grid min-w-0 max-h-[calc(100dvh-72px)] overflow-y-auto sm:max-h-[calc(100dvh-88px)] lg:h-[min(540px,calc(100dvh-88px))] lg:overflow-hidden ${galleryImages.length > 1 ? "lg:grid-cols-[76px_minmax(0,0.95fr)_minmax(360px,1.05fr)]" : "lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]"}`}
          data-has-gallery={galleryImages.length > 1 ? "true" : "false"}
        >
          {galleryImages.length > 1 ? (
            <div className="conference-quick-view-thumbnails order-2 flex gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50 p-3 lg:order-none lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:border-b-0 lg:border-r">
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImageSrc(image.src)}
                  aria-label={`Show ${product.name}, image ${index + 1}`}
                  aria-pressed={activeImage.src === image.src}
                  className={`conference-quick-view-thumbnail relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition hover:border-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 ${activeImage.src === image.src ? "border-orange-500 shadow-sm" : "border-slate-200"}`}
                >
                  <Image src={image.src} alt="" fill sizes="64px" className="object-contain p-1.5" />
                </button>
              ))}
            </div>
          ) : null}

          <div className="conference-quick-view-preview order-1 flex min-h-[230px] min-w-0 flex-col border-b border-slate-200 bg-white lg:order-none lg:min-h-0 lg:border-b-0 lg:border-r">
            <div className="relative min-h-0 flex-1">
              <Image
                src={activeImage.src}
                alt={activeImage.alt || product.name}
                fill
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-contain p-6 sm:p-8 lg:p-7"
                priority
              />
              {product.brandName ? (
                <span className="absolute left-4 top-4 rounded-md bg-[#071936] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white shadow-md">
                  {product.brandName}
                </span>
              ) : null}
            </div>
          </div>

          <div className="conference-quick-view-details order-3 min-w-0 bg-white p-4 sm:p-5 lg:order-none lg:overflow-y-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-extrabold text-orange-800">{product.productTypeLabel}</span>
              {product.connectionLabel ? <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-extrabold text-sky-800">{product.connectionLabel}</span> : null}
              {product.availabilityLabel ? <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-800">{product.availabilityLabel}</span> : null}
            </div>

            <h2 id={titleId} className="mt-3 line-clamp-2 break-words text-2xl font-extrabold leading-tight tracking-tight text-[#071936] [overflow-wrap:anywhere]">{product.name}</h2>
            <p id={descriptionId} className="mt-1.5 line-clamp-1 text-left text-xs font-semibold leading-5 text-slate-600">
              {[product.model ? `Model: ${product.model}` : "", product.systemFamily].filter(Boolean).join(" · ") || "Conference system product"}
            </p>
            {product.shortDescription ? <p className="mt-2 line-clamp-2 text-left text-xs leading-5 text-slate-600">{product.shortDescription}</p> : null}

            <div className="mt-3 border-y border-slate-200 bg-slate-50 px-3.5 py-2.5">
              <p className="text-left text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">{product.price.qualifier ?? "Current price"}</p>
              <p className="mt-0.5 break-words text-xl font-extrabold tracking-tight text-[#f05a19] [font-variant-numeric:tabular-nums]">{product.price.label}</p>
              <p className="mt-0.5 line-clamp-1 text-left text-[10px] leading-4 text-slate-500">Final pricing may depend on quantity, room requirements and installation scope.</p>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link
                prefetch={false}
                href={quotationHref}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2"
              >
                Request a Quote
              </Link>
              <Link
                prefetch={false}
                href={productHref}
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#071936] bg-white px-4 py-2 text-xs font-extrabold text-[#071936] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/35"
              >
                View Full Details
              </Link>
            </div>

            <section className="mt-4 border-t border-slate-200 pt-3" aria-labelledby={`${titleId}-overview`}>
              <h3 id={`${titleId}-overview`} className="text-base font-extrabold text-[#071936]">Quick Overview</h3>
              {product.keySpecs.length ? (
                <dl className="mt-2 space-y-1">
                  {product.keySpecs.slice(0, 3).map((spec) => (
                    <div key={`${spec.label}-${spec.value}`} className="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)] gap-2 text-[11px] leading-4">
                      <dt className="relative pl-3 font-extrabold text-slate-700 before:absolute before:left-0 before:top-[0.55rem] before:h-1 before:w-1 before:rounded-full before:bg-orange-500">{spec.label}</dt>
                      <dd className="min-w-0 break-words text-left font-medium text-slate-600 [overflow-wrap:anywhere]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : highlights.length ? (
                <ul className="mt-2 space-y-1">
                  {highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="relative line-clamp-1 break-words pl-4 text-left text-[11px] font-medium leading-4 text-slate-600 before:absolute before:left-0 before:top-1.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-orange-500 [overflow-wrap:anywhere]">{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Quick view ${product.name}`}
        className="inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none">
          <path d="M2.2 10s2.8-4.6 7.8-4.6 7.8 4.6 7.8 4.6-2.8 4.6-7.8 4.6S2.2 10 2.2 10Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Quick View
      </button>
      {typeof document !== "undefined" && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
