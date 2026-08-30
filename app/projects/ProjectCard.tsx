import Image from "next/image";
import Link from "next/link";
import type { Project } from "./projectData";

type ProjectCardProps = {
  project: Project;
  presentation?: "compact" | "detailed";
};

export default function ProjectCard({ project, presentation = "detailed" }: ProjectCardProps) {
  const compact = presentation === "compact";

  return (
    <article
      className={[
        "group flex h-full min-w-0 flex-col overflow-hidden border bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgba(15,23,42,0.09)]",
        compact ? "rounded-xl border-slate-200" : "rounded-[20px] sm:rounded-3xl",
      ].join(" ")}
    >
      <div className={`relative w-full overflow-hidden bg-slate-100 ${compact ? "aspect-[16/10]" : "aspect-[7/5]"}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            sizes={compact ? "(min-width: 1024px) 44vw, (min-width: 640px) 48vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className={`transition duration-500 group-hover:scale-[1.025] ${project.imageClassName ?? (project.imageFit === "contain" ? "object-contain object-center" : "object-cover")}`}
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" aria-hidden="true" />
        <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white backdrop-blur-sm">
          {project.badge}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-4 sm:p-5" : "p-4 md:p-6"}`}>
        <h3 className={`font-extrabold leading-snug text-slate-950 ${compact ? "line-clamp-2 min-h-10 text-[15px] sm:min-h-11 sm:text-base" : "text-[17px]"}`}>
          {project.title}
        </h3>
        <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-600 sm:text-xs">
          {project.subtitle ?? [project.organization, project.location, project.year].filter(Boolean).join(" | ")}
        </p>

        <p className={`mt-3 text-left font-medium text-slate-600 ${compact ? "text-[11px] leading-5 sm:text-xs" : "text-xs leading-6 sm:text-[13px]"}`}>
          {project.cardDescription ?? project.scope}
        </p>

        {project.tags.length ? (
          <div
            className={`mt-3 flex items-center ${compact ? "flex-nowrap gap-1" : "flex-wrap gap-1.5"}`}
            aria-label="Project details"
          >
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={`${project.id}-${tag}`}
                className={`whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 py-1 font-bold leading-4 text-slate-700 ${
                  compact ? "shrink-0 px-1.5 text-[8px] xl:px-2 xl:text-[9px]" : "px-2.5 text-[9px] sm:text-[10px]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <Link
          href={project.caseStudyHref ?? "/contact/"}
          aria-label={project.caseStudyHref ? `View case study: ${project.title}` : `Request a similar solution to ${project.title}`}
          className={`mt-auto inline-flex min-h-9 w-fit items-center pt-4 text-[11px] font-extrabold text-[#075BC5] transition-colors hover:text-orange-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 ${compact ? "sm:text-xs" : "md:text-xs"}`}
        >
          {project.caseStudyHref ? "View Case Study" : "Request a Similar Solution"}
          <span aria-hidden="true" className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </article>
  );
}
