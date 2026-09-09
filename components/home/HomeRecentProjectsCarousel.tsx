"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type HomeProject = {
  badge: string;
  title: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  organization: string;
  location: string;
  specification: string;
  description: string;
  href: string;
};

function MetaIcon({ kind }: { kind: "location" | "specification" | "description" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" className="home-project-meta-icon mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1456d9]" aria-hidden="true" {...common}>
      {kind === "location" ? (
        <><path d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10Z" /><circle cx="12" cy="11" r="2" /></>
      ) : kind === "specification" ? (
        <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 3v4M16 3v4M7 10h10M8 14h3" /></>
      ) : (
        <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>
      )}
    </svg>
  );
}

export default function HomeRecentProjectsCarousel({ projects }: { projects: readonly HomeProject[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activePage, setActivePage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  useEffect(() => {
    function updateCardsPerPage() {
      const nextCardsPerPage = window.matchMedia("(min-width: 768px)").matches
        ? 3
        : window.matchMedia("(min-width: 640px)").matches
          ? 2
          : 1;

      setCardsPerPage((currentCardsPerPage) => {
        if (currentCardsPerPage === nextCardsPerPage) return currentCardsPerPage;
        carouselRef.current?.scrollTo({ left: 0, behavior: "auto" });
        setActivePage(0);
        return nextCardsPerPage;
      });
    }

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const pageCount = Math.max(1, Math.ceil(projects.length / cardsPerPage));

  function scrollToPage(pageIndex: number) {
    const carousel = carouselRef.current;
    const safePageIndex = Math.min(Math.max(pageIndex, 0), pageCount - 1);
    const card = cardRefs.current[safePageIndex * cardsPerPage];
    if (!carousel || !card) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const cardScrollLeft = card.offsetLeft - carousel.offsetLeft;
    const targetLeft = safePageIndex === pageCount - 1
      ? maxScrollLeft
      : Math.min(cardScrollLeft, maxScrollLeft);

    carousel.scrollTo({
      left: targetLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActivePage(safePageIndex);
  }

  function updateActivePage() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
    const scrollProgress = maxScrollLeft > 0 ? carousel.scrollLeft / maxScrollLeft : 0;
    const nextPage = Math.min(pageCount - 1, Math.round(scrollProgress * (pageCount - 1)));
    setActivePage(nextPage);
  }

  return (
    <>
      <div
        ref={carouselRef}
        onScroll={updateActivePage}
        className="home-projects-carousel mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
        aria-label="Recent installation projects"
      >
        {projects.map((project, index) => (
          <article
            id={`home-project-${index + 1}`}
            key={project.href}
            ref={(node) => { cardRefs.current[index] = node; }}
            className="home-project-card flex shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="home-project-image relative overflow-hidden bg-slate-100">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 639px) 84vw, (max-width: 1023px) 48vw, 29vw"
                className="object-cover transition duration-500 motion-safe:hover:scale-[1.025]"
                style={{ objectPosition: project.imagePosition ?? "center" }}
              />
              <span className="home-project-badge absolute left-3 top-3 rounded-md bg-[#0b4bc4] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.04em] text-white shadow-sm">
                {project.badge}
              </span>
            </div>

            <div className="home-project-body flex flex-1 flex-col px-4 pb-4 pt-3.5">
              <h3 className="home-project-card-title !pb-0 font-extrabold tracking-[-0.01em] text-[#071936] after:!hidden">{project.title}</h3>
              <div className="home-project-meta-list mt-3">
                <p className="home-project-meta flex items-start gap-2 font-medium text-slate-600">
                  <MetaIcon kind="location" />
                  <span><strong className="font-bold text-slate-700">{project.organization}</strong> · {project.location}</span>
                </p>
                <p className="home-project-meta flex items-start gap-2 font-medium text-slate-600"><MetaIcon kind="specification" /> <span>{project.specification}</span></p>
                <p className="home-project-meta flex items-start gap-2 font-medium text-slate-600"><MetaIcon kind="description" /> <span>{project.description}</span></p>
              </div>
              <Link
                href={project.href}
                aria-label={`View project: ${project.title}`}
                className="home-project-link mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-[#1456d9] hover:text-[#0a3d9f]"
              >
                View Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-0.5" aria-label="Choose a project page">
        {Array.from({ length: pageCount }, (_, pageIndex) => {
          const firstProjectIndex = Math.min(pageIndex * cardsPerPage, projects.length - 1);

          return (
          <button
            key={`page-${pageIndex}-${cardsPerPage}`}
            type="button"
            onClick={() => scrollToPage(pageIndex)}
            className="home-project-dot-target grid h-6 w-6 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1456d9] focus-visible:ring-offset-1"
            aria-label={`Show project page ${pageIndex + 1} of ${pageCount}`}
            aria-controls={`home-project-${firstProjectIndex + 1}`}
            aria-current={activePage === pageIndex ? "true" : undefined}
          >
            <span className={`home-project-dot h-1.5 w-1.5 rounded-full transition-colors ${activePage === pageIndex ? "home-project-dot-active" : "home-project-dot-inactive"}`} aria-hidden="true" />
          </button>
          );
        })}
      </div>
    </>
  );
}
