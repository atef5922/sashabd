"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";

export type LedProductToolData = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  quoteHref: string;
  category: string;
  pitch?: string;
  price: string;
  priceNote: string;
  features: readonly string[];
  chips: readonly string[];
  imageFit: "cover" | "contain";
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function ProductDialog({
  onClose,
  returnFocusRef,
  titleId,
  descriptionId,
  eyebrow,
  children,
}: {
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  titleId: string;
  descriptionId: string;
  eyebrow: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const returnFocusElement = returnFocusRef.current;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)]
        .filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      (returnFocusElement ?? previouslyFocused)?.focus();
    };
  }, [onClose, returnFocusRef]);

  const dialog = (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-[2px] sm:p-5"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-led-product-dialog-overlay
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="max-h-[calc(100dvh-24px)] w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-[0_28px_90px_rgba(2,8,23,0.4)] sm:max-h-[calc(100dvh-40px)] sm:rounded-2xl"
        data-led-product-dialog
      >
        <div className="flex min-h-12 items-center justify-between gap-4 border-b border-slate-200 px-4 py-2 sm:px-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-orange-700">{eyebrow}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close product dialog"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-white text-lg text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return typeof document === "undefined" ? null : createPortal(dialog, document.body);
}

export function LedProductQuickView({ product }: { product: LedProductToolData }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const closeDialog = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Quick view ${product.title}`}
        className="inline-flex min-h-9 min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 text-[11px] font-extrabold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0 fill-none">
          <path d="M2.2 10s2.8-4.6 7.8-4.6 7.8 4.6 7.8 4.6-2.8 4.6-7.8 4.6S2.2 10 2.2 10Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        Quick View
      </button>

      {open ? (
        <ProductDialog
          onClose={closeDialog}
          returnFocusRef={triggerRef}
          titleId={titleId}
          descriptionId={descriptionId}
          eyebrow="Quick product preview"
        >
          <div className="grid max-h-[calc(100dvh-72px)] overflow-y-auto lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
            <div className="relative min-h-[260px] border-b border-slate-200 bg-slate-50 sm:min-h-[340px] lg:border-b-0 lg:border-r">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1023px) 100vw, 46vw"
                className={product.imageFit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover object-center"}
              />
            </div>

            <div className="min-w-0 p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[10px] font-extrabold text-orange-800">{product.category}</span>
                {product.pitch ? <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-extrabold text-sky-800">{product.pitch}</span> : null}
              </div>
              <h2 id={titleId} className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#071936]">{product.title}</h2>
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-slate-600">{product.subtitle}</p>

              <div className="mt-4 border-y border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">Price</p>
                <p className="mt-0.5 text-xl font-extrabold text-[#f05a19]">{product.price}</p>
                <p className="mt-0.5 text-[11px] text-slate-500">{product.priceNote}</p>
              </div>

              {product.features.length ? (
                <ul className="mt-4 space-y-2" aria-label={`Key features of ${product.title}`}>
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-xs font-medium leading-5 text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : null}

              {product.chips.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.chips.map((chip) => <span key={chip} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-600">{chip}</span>)}
                </div>
              ) : null}

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <Link href={product.href} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#071936] px-3 text-center text-xs font-extrabold text-[#071936] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/35">View Full Details</Link>
                <Link href={product.quoteHref} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#071936] px-3 text-center text-xs font-extrabold text-white transition hover:bg-[#102b52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/45 focus-visible:ring-offset-2">Get a Quote</Link>
              </div>
            </div>
          </div>
        </ProductDialog>
      ) : null}
    </>
  );
}

export function LedProductCompareTray({
  products,
  feedback,
  onRemove,
  onClear,
}: {
  products: readonly LedProductToolData[];
  feedback: string;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const closeDialog = useCallback(() => setOpen(false), []);

  if (!products.length) return null;

  return (
    <>
      <aside aria-label="Selected LED products for comparison" className="fixed bottom-20 left-3 right-20 z-40 mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur md:bottom-4 md:left-4 md:right-24 md:p-4 xl:inset-x-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-extrabold text-slate-950">Compare LED Products</h3>
              <button type="button" onClick={onClear} className="text-xs font-bold text-slate-600 underline-offset-4 hover:text-orange-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45">Clear</button>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {products.map((product) => (
                <div key={product.id} className="flex min-w-[12rem] items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-100 bg-white">
                    <Image src={product.image} alt="" fill sizes="40px" className={product.imageFit === "contain" ? "object-contain p-0.5" : "object-cover"} />
                  </div>
                  <span className="min-w-0 flex-1 truncate text-xs font-bold text-slate-800">{product.title}</span>
                  <button type="button" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.title} from comparison`} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-white hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40">&times;</button>
                </div>
              ))}
              {Array.from({ length: 3 - products.length }, (_, index) => <div key={`empty-${index}`} className="flex min-w-[8rem] items-center justify-center rounded-lg border border-dashed border-slate-300 px-3 text-xs font-bold text-slate-500">+ Add Product</div>)}
            </div>
            {feedback ? <p className="mt-1 text-xs font-bold text-red-700" role="status">{feedback}</p> : null}
          </div>
          <button
            ref={triggerRef}
            type="button"
            disabled={products.length < 2}
            onClick={() => setOpen(true)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-orange-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            Compare ({products.length})
          </button>
        </div>
      </aside>

      {open ? (
        <ProductDialog
          onClose={closeDialog}
          returnFocusRef={triggerRef}
          titleId={titleId}
          descriptionId={descriptionId}
          eyebrow="LED product comparison"
        >
          <div className="max-h-[calc(100dvh-72px)] overflow-auto p-4 sm:p-6">
            <h2 id={titleId} className="text-2xl font-extrabold tracking-tight text-[#071936]">Compare Selected Products</h2>
            <p id={descriptionId} className="mt-1 text-sm leading-6 text-slate-600">Compare the available catalog information before opening the full product pages.</p>

            <div className="mt-5 min-w-[680px] overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full table-fixed border-collapse text-left text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="w-32 border-r border-slate-200 p-3 font-extrabold text-slate-600">Product</th>
                    {products.map((product) => (
                      <th key={product.id} scope="col" className="border-r border-slate-200 p-3 align-top last:border-r-0">
                        <div className="relative mb-2 aspect-[16/9] overflow-hidden rounded-lg bg-white">
                          <Image src={product.image} alt="" fill sizes="260px" className={product.imageFit === "contain" ? "object-contain p-2" : "object-cover"} />
                        </div>
                        <span className="line-clamp-2 font-extrabold leading-5 text-slate-950">{product.title}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    ["Category", (product: LedProductToolData) => product.category],
                    ["Pixel Pitch", (product: LedProductToolData) => product.pitch ?? "Not specified"],
                    ["Price", (product: LedProductToolData) => product.price],
                    ["Best For", (product: LedProductToolData) => product.chips.join(", ") || "See product details"],
                    ["Key Features", (product: LedProductToolData) => product.features.join("; ") || "See product details"],
                  ].map(([label, getValue]) => (
                    <tr key={label as string}>
                      <th scope="row" className="border-r border-slate-200 bg-slate-50 p-3 align-top font-extrabold text-slate-600">{label as string}</th>
                      {products.map((product) => <td key={product.id} className="border-r border-slate-200 p-3 align-top font-medium leading-5 text-slate-700 last:border-r-0">{(getValue as (item: LedProductToolData) => string)(product)}</td>)}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="border-r border-slate-200 bg-slate-50 p-3 font-extrabold text-slate-600">Action</th>
                    {products.map((product) => <td key={product.id} className="border-r border-slate-200 p-3 last:border-r-0"><Link href={product.href} className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#071936] px-3 text-xs font-extrabold text-white hover:bg-[#102b52]">View Details</Link></td>)}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </ProductDialog>
      ) : null}
    </>
  );
}
