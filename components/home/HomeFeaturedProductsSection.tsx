"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const featuredProducts = [
  {
    brand: "BOSCH",
    brandColor: "#e30613",
    title: "Bosch CCS 1000 D Conference System",
    image: "/images/conference_system_products/bosch_products/Bosch-CCS-1000-D-Digital-Discussion-System.webp",
    href: "/conference-system/bosch-ccsd-cu-ccs-1000-d-conference-control-unit/",
    features: ["High-quality digital discussion system", "Scalable and future-ready setup"],
  },
  {
    brand: "TOA",
    brandColor: "#555b62",
    title: "TOA TZ-105 10W Column Speaker",
    image: "/images/PA/TOA-TZ-105-10W-Column-Speaker-600x600.webp",
    href: "/pa-system/toa-tz-105-10w-column-speaker/",
    features: ["Clear voice and wide coverage", "100V line PA installation support"],
  },
  {
    brand: "SPON",
    brandColor: "#0075be",
    title: "SPON Digital Conference System",
    image: "/images/Conference system/SPON LCS-5251CD Digital Conference Microphone System.webp",
    href: "/conference-system/spon-lcs-5251cd-digital-conference-microphone-system/",
    features: ["Digital signal processing", "Stable chairman and delegate performance"],
  },
  {
    brand: "ACCESS CONTROL",
    brandColor: "#ef3b22",
    title: "DS2000 Speed Gate Turnstile",
    image: "/images/Turnstile/DS2000-dimension-600x600.webp",
    href: "/turnstile-gate/ds2000-speed-gate-turnstile/",
    features: ["Smart access-control integration", "Fast and secure pedestrian passage"],
  },
  {
    brand: "LED DISPLAY",
    brandColor: "#ef3b22",
    title: "P1.25 Indoor LED Display Module",
    image: "/images/indoor/P1.25-Indoor-LED-Display.webp",
    href: "/led-display/indoor-led/p1-25-indoor-led-display/",
    features: ["Ultra-fine pitch viewing", "Premium control-room display solution"],
  },
  {
    brand: "TURNSTILE",
    brandColor: "#ef3b22",
    title: "DS312 Flap Turnstile Gate",
    image: "/images/Turnstile/DS312-flap-turnstile-dimension-600x600.webp",
    href: "/turnstile-gate/ds312-flap-turnstile-gate/",
    features: ["RFID and biometric integration", "Professional lobby access control"],
  },
] as const;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
      <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiagonalArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M6 14 14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeFeaturedProductsSection() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const moveCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const firstSlide = carousel.querySelector<HTMLElement>(".home-featured-product-slide");
    if (!firstSlide) return;

    const slideWidth = firstSlide.getBoundingClientRect().width;
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap || window.getComputedStyle(carousel).gap) || 0;
    const visibleSlides = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1;
    const pageDistance = (slideWidth + gap) * visibleSlides;
    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const isAtStart = carousel.scrollLeft <= 2;
    const isAtEnd = carousel.scrollLeft >= maxScrollLeft - 2;
    const targetLeft = direction === 1
      ? (isAtEnd ? 0 : Math.min(maxScrollLeft, carousel.scrollLeft + pageDistance))
      : (isAtStart ? maxScrollLeft : Math.max(0, carousel.scrollLeft - pageDistance));

    carousel.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return (
    <section
      id="home-featured-products"
      aria-labelledby="home-featured-products-heading"
      className="scroll-mt-24 border-t bg-[#f7f9fd] px-4 py-5 text-left sm:px-5 md:px-7 md:py-6"
    >
      <style>{`
        #home-featured-products .home-section-eyebrow,
        #home-featured-products .home-featured-view-all {
          color: #1d4ed8 !important;
        }
        #home-featured-products .home-featured-view-all {
          border-color: #1d4ed8 !important;
        }
        #home-featured-products {
          border-top-color: #e7edf5 !important;
          background: #f7f9fd !important;
        }
        #home-featured-products .home-featured-product-card {
          border-color: #dfe6f0 !important;
          border-radius: 10px !important;
        }
        #home-featured-products p,
        #home-featured-products li {
          text-align: left !important;
          text-align-last: auto !important;
        }
        .home-featured-product-slide { width: 82%; }
        @media (min-width: 640px) {
          .home-featured-product-slide { width: 48.8%; }
        }
        @media (min-width: 1024px) {
          .home-featured-product-slide { width: calc((100% - 36px) / 4); }
        }
        #home-featured-products .home-featured-product-title {
          font-size: 13px !important;
          line-height: 16px !important;
        }
        #home-featured-products .home-featured-request-price {
          color: #1d4ed8 !important;
        }
        #home-featured-products .home-featured-pagination {
          border-color: #dfe6f0 !important;
          background: #ffffff !important;
          color: #334e73 !important;
        }
        #home-featured-products .home-featured-check {
          background: #eaf2ff !important;
          color: #2c66a8 !important;
        }
        #home-featured-products .home-featured-card-action {
          background: #071936 !important;
          color: #ffffff !important;
        }
      `}</style>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="home-section-eyebrow text-[9px] font-black uppercase tracking-[0.13em] sm:text-[10px]">Featured Products</p>
          <h2 id="home-featured-products-heading" className="mt-1 !pb-0 text-[22px] font-black tracking-[-0.025em] text-[#071936] after:!hidden sm:text-2xl">
            Explore Our Best Products
          </h2>
        </div>
        <Link
          href="/#browse-products"
          className="home-featured-view-all inline-flex shrink-0 items-center gap-1.5 rounded-md border bg-white px-3 py-2 text-[9px] font-extrabold transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:text-[10px]"
        >
          View All Products
          <ArrowIcon />
        </Link>
      </div>

      <div className="relative mt-4">
        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          aria-label="Show previous featured products"
          className="home-featured-pagination pointer-events-auto absolute left-0 top-1/2 z-20 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-[0_4px_12px_rgba(15,23,42,0.12)] transition hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          <ChevronIcon direction="left" />
        </button>

        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredProducts.map((product) => (
            <div
              key={product.href}
              className="home-featured-product-slide min-w-0 flex-none snap-start"
            >
              <article className="home-featured-product-card group flex h-full min-w-0 flex-col border bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex h-7 items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.08em]" style={{ color: product.brandColor }}>
                    {product.brand}
                  </span>
                </div>

                <Link href={product.href} prefetch={false} className="relative mt-1 block aspect-[16/10] overflow-hidden rounded-lg bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 lg:h-32 lg:aspect-auto">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 639px) 78vw, (max-width: 1023px) 46vw, 24vw"
                    className="object-contain p-1 transition duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </Link>

                <h3 className="home-featured-product-title mt-3 min-h-8 break-words font-extrabold text-[#071936]">
                  <Link href={product.href} prefetch={false} className="transition hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                    {product.title}
                  </Link>
                </h3>

                <ul className="mt-2 space-y-1.5 text-[9.5px] font-medium leading-4 text-slate-600 sm:text-[10px]">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5">
                      <span className="home-featured-check mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full">
                        <svg viewBox="0 0 14 14" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                          <path d="m2.5 7 2.2 2.2 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <Link href="/contact/" className="home-featured-request-price text-[9px] font-extrabold hover:text-[#153ca5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:text-[10px]">
                    Request Price
                  </Link>
                  <Link
                    href={product.href}
                    prefetch={false}
                    aria-label={`View ${product.title}`}
                    className="home-featured-card-action inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  >
                    <DiagonalArrowIcon />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => moveCarousel(1)}
          aria-label="Show next featured products"
          className="home-featured-pagination pointer-events-auto absolute right-0 top-1/2 z-20 inline-flex h-10 w-10 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border shadow-[0_4px_12px_rgba(15,23,42,0.12)] transition hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
