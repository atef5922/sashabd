import Link from "next/link";
import HomeSectionHeadingIcon from "./HomeSectionHeadingIcon";
import HomeRecentProjectsCarousel, { type HomeProject } from "./HomeRecentProjectsCarousel";
import { projectCaseStudies } from "@/app/projects/projectData";

const sortByCompletionDate = (first: (typeof projectCaseStudies)[number], second: (typeof projectCaseStudies)[number]) =>
  second.completedIso.localeCompare(first.completedIso);

const balancedCaseStudies = [
  ...projectCaseStudies.filter((project) => project.category === "led-display").sort(sortByCompletionDate).slice(0, 3),
  ...projectCaseStudies.filter((project) => project.category === "conference-system").sort(sortByCompletionDate).slice(0, 3),
].sort(sortByCompletionDate);

const projects: HomeProject[] = balancedCaseStudies
  .map((project) => ({
    badge: project.categoryLabel ?? "Completed Project",
    title: project.title,
    image: project.image,
    imageAlt: project.imageAlt,
    imagePosition: project.imagePosition,
    organization: project.organization,
    location: project.location,
    specification: project.systemType ?? project.detail.projectType,
    description: project.cardDescription ?? project.scope,
    href: `/projects/${project.slug}/`,
  }));

export default function HomeRecentProjectsSection() {
  return (
    <section id="recent-project-installations" className="home-recent-projects scroll-mt-24 bg-[#f8faff] px-5 py-7" aria-labelledby="recent-projects-title">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="home-projects-eyebrow home-section-badge">
            <HomeSectionHeadingIcon kind="projects" size="badge" />
            <span>Recent Projects</span>
          </p>
          <h2 id="recent-projects-title" className="home-projects-title mt-2 flex items-center gap-2 !pb-0 font-extrabold leading-tight tracking-[-0.02em] text-[#071936] after:!hidden">
            <HomeSectionHeadingIcon kind="projects" />
            <span>Our <span className="text-[#1660e8]">Successful Installations</span></span>
          </h2>
        </div>
        <Link href="/projects/" className="home-projects-view-all hidden min-h-[31px] shrink-0 items-center justify-center gap-2 rounded-md border border-[#1456d9] bg-white px-3 text-[9px] font-extrabold text-[#1456d9] transition hover:bg-blue-50 sm:inline-flex">
          View All Projects <span aria-hidden="true">→</span>
        </Link>
      </div>

      <HomeRecentProjectsCarousel projects={projects} />

      <Link href="/projects/" className="home-projects-view-all mt-4 inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-[#1456d9] bg-white px-4 text-[10px] font-extrabold text-[#1456d9] sm:hidden">
        View All Projects <span aria-hidden="true">→</span>
      </Link>

      <style>{`
        .home-recent-projects, .home-recent-projects * { text-align: left; }
        .home-recent-projects { padding: 24px 42px 20px !important; background: radial-gradient(circle at 8% 0%, #f4f8ff 0, #fbfdff 35%, #f7faff 100%) !important; }
        .home-projects-eyebrow, .home-project-meta-icon, .home-project-link { color: #1456d9 !important; }
        .home-projects-title { font-size: var(--site-h2-size) !important; line-height: 1.2 !important; }
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
        .home-project-dot { width: 6px !important; height: 6px !important; padding: 0 !important; border: 0 !important; min-width: 0 !important; }
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
