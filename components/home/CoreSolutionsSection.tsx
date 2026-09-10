import Image from "next/image";
import Link from "next/link";

const coreSolutions = [
  {
    title: "LED Display",
    description: "High-performance LED displays for every indoor and outdoor application.",
    href: "/led-display/",
    image: "/assets/home/core-solutions/led-display.webp",
    imageAlt: "Indoor and outdoor LED display solutions",
    imagePosition: "76% center",
  },
  {
    title: "Conference System",
    description: "Integrated audio, video and conferencing solutions for seamless collaboration.",
    href: "/conference-system/",
    image: "/assets/home/core-solutions/conference-system.webp",
    imageAlt: "Professional conference room system",
    imagePosition: "79% center",
  },
  {
    title: "PA System",
    description: "Public address and voice evacuation systems for clear and reliable communication.",
    href: "/pa-system/",
    image: "/assets/home/core-solutions/pa-system.webp",
    imageAlt: "Professional PA sound system equipment",
    imagePosition: "79% center",
  },
  {
    title: "Turnstile & Access Control",
    description: "Smart access control and turnstile solutions for enhanced security and monitoring.",
    href: "/turnstile-gate/",
    image: "/assets/home/core-solutions/turnstile-access-control.webp",
    imageAlt: "Turnstile gate and access control solution",
    imagePosition: "78% center",
  },
  {
    title: "Interactive Flat Panel",
    description: "Interactive displays for education, corporate training and smart presentations.",
    href: "/interactive-flat-panel/",
    image: "/assets/home/core-solutions/interactive-flat-panel.webp",
    imageAlt: "Interactive flat panel for corporate collaboration",
    imagePosition: "center",
  },
  {
    title: "Digital Podium",
    description: "Advanced digital podiums for modern presentations and professional events.",
    href: "/digital-podium/",
    image: "/assets/home/core-solutions/digital-podium.webp",
    imageAlt: "Digital podium in a professional auditorium",
    imagePosition: "center",
  },
] as const;

const additionalSolutionLinks = [
  { label: "Indoor LED Display", href: "/led-display/indoor-led/" },
  { label: "Outdoor LED Display", href: "/led-display/outdoor/" },
  { label: "Rental LED Display", href: "/led-display/rental-display/" },
  { label: "Audio Conference System", href: "/conference-system/audio-conference-system/" },
  { label: "Video Conference System", href: "/conference-system/video-conference-system/" },
  { label: "Wired Conference System", href: "/conference-system/wired-conference-system/" },
  { label: "Wireless Conference System", href: "/conference-system/wireless-conference-system/" },
] as const;

function ExploreArrow() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TitleRule({ reverse = false }: { reverse?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-px w-16 shrink-0 sm:w-24"
      style={{
        background: reverse
          ? "linear-gradient(to left, transparent, rgba(29, 78, 216, 0.55))"
          : "linear-gradient(to right, transparent, rgba(29, 78, 216, 0.55))",
      }}
    >
      <span
        className={`absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full ${reverse ? "left-0" : "right-0"}`}
        style={{ backgroundColor: "#1d4ed8" }}
      />
    </span>
  );
}

export default function CoreSolutionsSection() {
  return (
    <section
      id="core-solutions"
      aria-labelledby="core-solutions-heading"
      className="rounded-2xl border border-slate-200/90 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.98),rgba(248,250,252,0.96)_58%,rgba(241,245,249,0.94))] px-3 py-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] sm:px-4 md:px-5"
    >
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <TitleRule />
        <h2 id="core-solutions-heading" className="!pb-0 text-center text-xl font-black tracking-[-0.025em] text-[#071936] after:!hidden sm:text-2xl">
          Core <span className="text-[#1660e8]">Solutions</span>
        </h2>
        <TitleRule reverse />
      </div>

      <p className="home-section-subtitle mx-auto mt-1 max-w-3xl text-center font-medium leading-4 text-slate-500">
        Commercial LED display, conference, PA, interactive and access-control solutions for projects across Bangladesh.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {coreSolutions.map((solution) => (
          <article
            key={solution.title}
            className="group flex min-w-0 flex-col rounded-xl border border-slate-200/90 bg-white p-2 shadow-[0_3px_12px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,23,42,0.11)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={solution.image}
                alt={solution.imageAlt}
                fill
                sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 16vw"
                className="object-cover transition duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                style={{ objectPosition: solution.imagePosition }}
              />
            </div>

            <h3 className="core-solution-title mt-2 font-extrabold text-[#071936]">
              {solution.title}
            </h3>
            <p className="mt-1 flex-1 text-[9.5px] font-medium leading-[1.45] text-slate-600 sm:text-[10px]">
              {solution.description}
            </p>

            <Link
              href={solution.href}
              prefetch={false}
              className="core-solution-explore-link mt-3 inline-flex w-fit items-center gap-1 text-[10px] font-extrabold text-[#1d4ed8] transition hover:text-[#153ca5] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              aria-label={`Explore ${solution.title}`}
            >
              Explore
              <ExploreArrow />
            </Link>
          </article>
        ))}
      </div>

      <nav aria-label="Additional commercial solution categories" className="mt-3 border-t border-slate-200/80 pt-3">
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {additionalSolutionLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[9.5px] font-bold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:px-3 sm:text-[10px]"
            >
              {item.label}
              <ExploreArrow />
            </Link>
          ))}
        </div>
      </nav>
      <style>{`
        .core-solution-title {
          white-space: nowrap;
          font-size: 9px !important;
          line-height: 1.2 !important;
          letter-spacing: -0.025em;
        }
        @media (min-width: 640px) {
          .core-solution-title { font-size: 11px !important; }
        }
        @media (min-width: 1024px) {
          .core-solution-title { font-size: clamp(10px, 0.88vw, 12px) !important; }
        }
        @media (min-width: 1280px) {
          .core-solution-title { font-size: 13px !important; }
        }
        @media (min-width: 1440px) {
          .core-solution-title { font-size: calc(13 * var(--home-unit)) !important; }
        }
        .core-solution-explore-link { color: #1456d9 !important; }
        .core-solution-explore-link:hover { color: #0f3f9f !important; }
        .core-solution-explore-link svg { color: inherit !important; }
      `}</style>
    </section>
  );
}
