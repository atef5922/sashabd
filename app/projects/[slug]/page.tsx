import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { isVercelStagingBuild } from "@/lib/deployment";
import { absoluteUrl, socialImageUrl, withTrailingSlash } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import { conferenceProjects, getProjectBySlug } from "../projectData";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return conferenceProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const canonical = withTrailingSlash(`/projects/${project.slug}/`);
  const image = socialImageUrl(project.image);
  const allowIndexing = !isVercelStagingBuild();

  return {
    title: { absolute: project.seo.title },
    description: project.seo.description,
    alternates: { canonical },
    robots: { index: allowIndexing, follow: allowIndexing },
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      url: canonical,
      type: "article",
      images: [{ url: image, width: 1448, height: 1086, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [image],
    },
  };
}

function BulletList({ items, tone = "orange" }: { items: readonly string[]; tone?: "orange" | "green" }) {
  return (
    <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[13px] font-medium leading-6 text-slate-700 sm:text-sm">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === "green" ? "bg-emerald-600" : "bg-orange-500"}`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CopySection({ id, title, paragraphs }: { id: string; title: string; paragraphs: readonly string[] }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-[13px] leading-7 text-slate-700 sm:text-[15px] sm:leading-8">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const detail = project.detail;
  const canonical = absoluteUrl(`/projects/${project.slug}/`);
  const imageUrl = socialImageUrl(project.image);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: detail.h1,
    description: project.seo.description,
    url: canonical,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: BRAND_NAME,
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: "Conference system installation and AV integration",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: imageUrl,
      caption: project.imageAlt,
      width: 1448,
      height: 1086,
    },
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-3 md:px-6 md:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />

      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/projects/", label: "Projects" },
          { href: `/projects/${project.slug}/`, label: project.title, current: true },
        ]}
        className="mb-4 text-sm text-slate-600"
      />

      <article>
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-9">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange-600">{project.categoryLabel} Case Study</p>
          <h1 className="mt-2 max-w-5xl text-[1.8rem] font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.7rem]">
            {detail.h1}
          </h1>
          <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
            {detail.projectName}
          </p>

          <dl className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Location", project.location],
              ["Completed", project.completed],
              ["Room capacity", project.capacity],
              ["System type", project.systemType],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <dt className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">{label}</dt>
                <dd className="mt-1 text-xs font-bold leading-5 text-slate-800 sm:text-[13px]">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <figure className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1448}
            height={1086}
            priority
            sizes="(max-width: 1279px) calc(100vw - 32px), 1232px"
            className="h-auto w-full object-contain"
          />
        </figure>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-4">
            <CopySection id="project-overview" title="Project Overview" paragraphs={detail.overview} />
            <CopySection id="project-requirement" title="Project Requirement" paragraphs={detail.requirement} />
            <CopySection id="solution-provided" title="Solution Provided" paragraphs={detail.solution} />

            <section id="system-components" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">System &amp; Equipment</h2>
              <BulletList items={detail.systemComponents} />
            </section>

            <section id="scope-of-work" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">Scope of Work</h2>
              <BulletList items={detail.scopeOfWork} />
            </section>

            <section id="project-results" className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">Project Results</h2>
              <BulletList items={detail.results} tone="green" />
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="project-information">
              <h2 id="project-information" className="text-lg font-extrabold text-slate-950">Project Information</h2>
              <dl className="mt-4 divide-y divide-slate-100">
                {detail.systemDetails.map((item) => (
                  <div key={item.label} className="py-3 first:pt-0 last:pb-0">
                    <dt className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">{item.label}</dt>
                    <dd className="mt-1 text-xs font-semibold leading-5 text-slate-700">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5" aria-labelledby="related-conference-links">
              <h2 id="related-conference-links" className="text-lg font-extrabold text-[#071936]">Related Conference Solutions</h2>
              <nav className="mt-3 grid gap-2" aria-label="Related conference system pages">
                {[
                  ["Explore Conference System Solutions", "/conference-system/"],
                  ["Wired Conference Systems", "/conference-system/wired-conference-system/"],
                  ["Digital Conference Systems", "/conference-system/digital-conference-system/"],
                  ["Video Conference Systems", "/conference-system/video-conference-system/"],
                ].map(([label, href]) => (
                  <Link key={href} href={href} className="inline-flex min-h-9 items-center justify-between rounded-lg border border-blue-100 bg-white px-3 text-xs font-bold text-[#1744a1] transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
                    {label}<span aria-hidden="true">→</span>
                  </Link>
                ))}
              </nav>
            </section>
          </aside>
        </div>
      </article>

      <section className="mt-4 rounded-2xl bg-[#071936] px-5 py-7 text-white shadow-lg sm:px-8 sm:py-9" aria-labelledby="conference-project-cta">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="conference-project-cta" className="text-2xl font-extrabold">{detail.ctaHeading ?? "Planning a Conference Room Project?"}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/80">Get a room-specific conference system recommendation, equipment list and BOQ from Sasha Corporation.</p>
          </div>
          <Link href="/contact/?project=conference-system" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-orange-600 px-5 text-sm font-extrabold text-white transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300">
            Request a Conference System BOQ
          </Link>
        </div>
      </section>
    </main>
  );
}
