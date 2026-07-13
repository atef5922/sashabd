import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { blogPosts } from "@/lib/blogPosts";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Informative LED display blog in Bangladesh covering price planning, technical selection, installation strategy, and maintenance best practices.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: `Blog | ${BRAND_NAME}`,
    description:
      "Read practical LED display blogs on pricing, deployment, reliability, and project planning.",
    url: "/blog/",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: `Blog | ${BRAND_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${BRAND_NAME}`,
    description:
      "Read practical LED display blogs on pricing, deployment, reliability, and project planning.",
    images: [socialImageUrl()],
  },
};

export default function BlogAndCaseStudyPage() {
  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/blog/", label: "Blog", current: true },
        ]}
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#081a35] via-[#0f2746] to-[#1a314f] p-6 md:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6A00]/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-orange-200">
              LED Knowledge Hub
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">Blog</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-100 md:text-base">
              Deep, practical articles from real Bangladesh LED projects. Learn planning logic, installation details,
              accessory compatibility, and uptime-focused maintenance workflows. For live product options, browse our{" "}
              <Link href="/led-display/" className="font-extrabold text-white underline underline-offset-4">
                LED display page
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#E45700]"
              >
                Plan Your Project
              </Link>
              <Link
                href="/led-display/"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Explore LED Displays
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-100 md:text-sm">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <p className="font-semibold text-orange-200">Articles</p>
              <p className="mt-1 text-xl font-extrabold text-white">{blogPosts.length}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              <p className="font-semibold text-orange-200">Topics</p>
              <p className="mt-1 text-xl font-extrabold text-white">Planning to ROI</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Expert Articles</h2>
          <div className="hidden text-sm font-semibold text-slate-500 md:block">Updated for Bangladesh market</div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((item) => (
            <Link
              key={item.title}
              href={`/blog/${item.slug}`}
              className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: item.coverImagePosition?.card ?? "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 inline-flex rounded-full border border-white/25 bg-slate-950/45 px-3 py-1 text-xs font-bold text-orange-200">
                  {item.tag}
                </div>
                <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/45 px-3 py-1 text-xs font-semibold text-slate-100">
                  {item.readTime}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-[#D94F00]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Updated {formatDate(item.updatedAt)}</span>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6A00]">
                    Read article
                    <span aria-hidden className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Need LED Strategy for Your Business?</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          We can help you choose pitch, cabinet type, controller stack, and a realistic budget from the first call.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-xl bg-[#FF6A00] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#E45700]"
          >
            Get Free Consultation
          </Link>
          <Link
            href="/led-display/"
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
          >
            Explore LED Displays
          </Link>
        </div>
      </section>
    </main>
  );
}

