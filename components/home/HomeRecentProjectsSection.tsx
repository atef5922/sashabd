"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Project = {
  badge: string;
  title: string;
  image: string;
  imagePosition?: string;
  location: string;
  specification: string;
  description: string;
  href: string;
};

const projects: Project[] = [
  {
    badge: "LED Display",
    title: "Indoor LED Display Installation",
    image: "/images/indoor/P2.5-Indoor-LED-Display.webp",
    location: "Bangabandhu International Conference Center, Dhaka",
    specification: "P2.5 LED Display   |   Size: 28ft x 12ft",
    description: "High resolution LED display for conference and event management.",
    href: "/led-display/indoor-led/",
  },
  {
    badge: "Conference System",
    title: "Boardroom Conference Solution",
    image: "/images/conference_landing/video-hybrid-conference-system-hero.webp",
    imagePosition: "right center",
    location: "Corporate Office, Gulshan, Dhaka",
    specification: "Digital Conference System   |   20 Seats",
    description: "Complete digital conference system with recording and video conferencing.",
    href: "/projects/corporate-boardroom-conference-system-dhaka/",
  },
  {
    badge: "Turnstile Gate",
    title: "Access Control System Installation",
    image: "/images/home_hero/Turnstile-gate-System-home-hero.webp",
    imagePosition: "right center",
    location: "Factory and Industrial Facility, Gazipur",
    specification: "Tripod Turnstile + Access Control",
    description: "Secure access control system with RFID and biometric integration.",
    href: "/turnstile-gate/",
  },
  {
    badge: "Smart Meeting Room",
    title: "Hybrid Meeting Room Integration",
    image: "/images/conference_system_projects/coference_p2.webp",
    location: "SREDA, Dhaka",
    specification: "Hybrid conference system · 10–12 seats",
    description: "Integrated audio, video and collaboration tools for effortless hybrid meetings.",
    href: "/projects/smart-meeting-room-conference-system-dhaka/",
  },
];

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

export default function HomeRecentProjectsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeProject, setActiveProject] = useState(0);

  function scrollToProject(index: number) {
    const carousel = carouselRef.current;
    const card = cardRefs.current[index];
    if (!carousel || !card) return;

    carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: "smooth" });
    setActiveProject(index);
  }

  function updateActiveProject() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const left = carousel.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - carousel.offsetLeft - left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveProject(closestIndex);
  }

  return (
    <section id="recent-project-installations" className="home-recent-projects scroll-mt-24 bg-[#f8faff] px-5 py-7" aria-labelledby="recent-projects-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="home-projects-eyebrow text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#1456d9]">Recent Projects</p>
          <h2 id="recent-projects-title" className="home-projects-title mt-1.5 !pb-0 font-extrabold leading-tight tracking-[-0.02em] text-[#071936] after:!hidden">
            Our Successful Installations
          </h2>
        </div>
        <Link href="/projects/" className="home-projects-view-all hidden min-h-[31px] shrink-0 items-center justify-center gap-2 rounded-md border border-[#1456d9] bg-white px-3 text-[9px] font-extrabold text-[#1456d9] transition hover:bg-blue-50 sm:inline-flex">
          View All Projects <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        ref={carouselRef}
        onScroll={updateActiveProject}
        className="home-projects-carousel mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
        aria-label="Recent installation projects"
      >
        {projects.map((project, index) => (
          <article
            key={project.title}
            ref={(node) => { cardRefs.current[index] = node; }}
            className="home-project-card flex shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="home-project-image relative overflow-hidden bg-slate-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 639px) 84vw, (max-width: 1023px) 48vw, 29vw"
                className="object-cover transition duration-500 hover:scale-[1.025]"
                style={{ objectPosition: project.imagePosition ?? "center" }}
              />
              <span className="home-project-badge absolute left-3 top-3 rounded-md bg-[#0b4bc4] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.04em] text-white shadow-sm">
                {project.badge}
              </span>
            </div>

            <div className="home-project-body flex flex-1 flex-col px-4 pb-4 pt-3.5">
              <h3 className="home-project-card-title !pb-0 font-extrabold tracking-[-0.01em] text-[#071936] after:!hidden">{project.title}</h3>
              <div className="home-project-meta-list mt-3">
                <p className="home-project-meta flex items-start gap-2 font-medium text-slate-600"><MetaIcon kind="location" /> <span>{project.location}</span></p>
                <p className="home-project-meta flex items-start gap-2 font-medium text-slate-600"><MetaIcon kind="specification" /> <span>{project.specification}</span></p>
                <p className="home-project-meta flex items-start gap-2 font-medium text-slate-600"><MetaIcon kind="description" /> <span>{project.description}</span></p>
              </div>
              <Link href={project.href} className="home-project-link mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-extrabold text-[#1456d9] hover:text-[#0a3d9f]">
                View Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5" aria-label="Choose a project">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => scrollToProject(index)}
            className={`home-project-dot h-1.5 w-1.5 rounded-full transition-colors ${activeProject === index ? "home-project-dot-active" : "home-project-dot-inactive"}`}
            aria-label={`Show project ${index + 1}: ${project.title}`}
            aria-current={activeProject === index ? "true" : undefined}
          />
        ))}
      </div>

      <Link href="/projects/" className="home-projects-view-all mt-4 inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-[#1456d9] bg-white px-4 text-[10px] font-extrabold text-[#1456d9] sm:hidden">
        View All Projects <span aria-hidden="true">→</span>
      </Link>

      <style>{`
        .home-recent-projects, .home-recent-projects * { text-align: left; }
        .home-recent-projects { padding: 24px 42px 20px !important; background: radial-gradient(circle at 8% 0%, #f4f8ff 0, #fbfdff 35%, #f7faff 100%) !important; }
        .home-projects-eyebrow, .home-project-meta-icon, .home-project-link { color: #1456d9 !important; }
        .home-projects-title { font-size: 20px !important; line-height: 25px !important; }
        .home-projects-carousel { column-gap: 16px !important; scrollbar-width: none; }
        .home-projects-carousel::-webkit-scrollbar { display: none; }
        .home-project-card { width: 84%; box-shadow: 0 5px 16px rgba(15, 23, 42, 0.09) !important; border-radius: 8px !important; }
        .home-project-image { aspect-ratio: 1.54 / 1 !important; min-height: 160px; }
        .home-project-body { padding: 14px 14px 12px !important; }
        .home-project-card-title { font-size: 13px !important; line-height: 17px !important; }
        .home-project-meta-list { display: grid; row-gap: 4px; margin-top: 8px !important; }
        .home-project-meta { font-size: 9px !important; line-height: 16px !important; }
        .home-project-badge { min-height: 20px; padding: 4px 10px !important; border-radius: 4px !important; background: #0b4bc4 !important; color: #fff !important; font-size: 8px !important; line-height: 12px !important; }
        .home-projects-view-all { min-height: 29px !important; padding: 0 12px !important; border-radius: 4px !important; color: #1456d9 !important; background: #fff !important; font-size: 9px !important; }
        .home-project-dot { width: 6px !important; height: 6px !important; padding: 0 !important; border: 0 !important; min-width: 0 !important; cursor: pointer; }
        .home-project-dot-active { background: #1456d9 !important; }
        .home-project-dot-inactive { background: #cbd5e1 !important; }
        @media (max-width: 639px) {
          .home-recent-projects { padding: 24px 16px 22px !important; }
        }
        @media (min-width: 640px) { .home-project-card { width: calc((100% - 16px) / 2); } }
        @media (min-width: 768px) { .home-project-card { width: calc((100% - 32px) / 3); } }
      `}</style>
    </section>
  );
}
