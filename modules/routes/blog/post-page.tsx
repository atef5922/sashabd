import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import { blogPosts, commonSections, getBlogPostBySlug } from "@/lib/blogPosts";
import { compactBlogTitle, socialImageUrl, withTrailingSlash } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { BRAND_NAME } from "@/lib/brand";

type Params = { slug: string };

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const toSectionId = (heading: string, index: number) =>
  `section-${index + 1}-${heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")}`;

const tokenize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);

const hashString = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
};

const normalizeMetaDescription = (value: string) => value.replace(/\s+/g, " ").trim();

const truncateMetaDescription = (value: string, max = 155) => {
  const normalized = normalizeMetaDescription(value);
  if (normalized.length <= max) return normalized;

  const slice = normalized.slice(0, Math.max(0, max - 3));
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace >= 60 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}...`;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "Blog" };
  }

  const canonical = withTrailingSlash(`/blog/${post.slug}`);
  const seoTitle = compactBlogTitle(post.title);
  const seoDescription = truncateMetaDescription(post.excerpt);
  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    alternates: { canonical },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: socialImageUrl(post.coverImage),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [socialImageUrl(post.coverImage)],
    },
  };
}

export default async function BlogDetailsPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  const allSections = post.hideCommonSections ? post.uniqueSections : [...post.uniqueSections, ...commonSections];
  const h2SectionLinks = allSections.map((section, index) => ({
    id: toSectionId(section.heading, index),
    heading: section.heading,
  }));
  const sectionLinks = [
    { id: "quick-summary", heading: "Quick Summary" },
    { id: "introduction", heading: "Introduction" },
    ...h2SectionLinks,
    { id: "why-choose-us", heading: "Why Choose Us" },
    { id: "conclusion", heading: "Conclusion" },
    { id: "internal-links", heading: "Related Useful Links" },
    { id: "faq", heading: "FAQ" },
    { id: "cta", heading: "Looking for professional LED display solutions?" },
  ];
  const currentKeywordSet = new Set(post.keywords.flatMap((keyword) => tokenize(keyword)));
  const currentTopicSet = new Set([
    ...tokenize(post.title),
    ...tokenize(post.excerpt),
    ...post.keywords.flatMap((keyword) => tokenize(keyword)),
  ]);

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .map((item) => {
      const itemKeywordTokens = item.keywords.flatMap((keyword) => tokenize(keyword));
      const itemTopicTokens = [...tokenize(item.title), ...tokenize(item.excerpt), ...itemKeywordTokens];

      const keywordOverlap = itemKeywordTokens.filter((token) => currentKeywordSet.has(token)).length;
      const topicOverlap = itemTopicTokens.filter((token) => currentTopicSet.has(token)).length;
      const sameTagBonus = item.tag === post.tag ? 6 : 0;

      return {
        ...item,
        relevanceScore: sameTagBonus + keywordOverlap * 3 + topicOverlap,
      };
    })
    .sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) return b.relevanceScore - a.relevanceScore;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    })
    .slice(0, 3);
  const summaryPoints = [
    `Primary focus: ${post.title}.`,
    `Key intent keywords: ${post.keywords.slice(0, 2).join(" | ")}.`,
    "Includes practical decision logic, implementation guidance, and FAQ.",
  ];
  const seoIntro =
    `This article on ${post.title.toLowerCase()} is designed to answer high-intent search queries and help buyers make a confident decision. ` +
    `If you are researching ${post.keywords[0]}, this guide provides practical comparison, real usage context, and implementation-ready direction.`;
  const conclusionText =
    post.slug === "led-display-price-in-bangladesh-complete-buying-guide"
      ? "In summary, this LED display buying guide is best used for planning: confirm environment, viewing distance, content priority, and long-term operating needs first. Then compare current product options on the Sasha LED display hub before requesting a BOQ-based quotation."
      : `In summary, the right decision for ${post.title.toLowerCase()} depends on real site condition, audience distance, content priority, and long-term operating plan. ` +
        `When these inputs are validated early, you can avoid overspending, reduce technical risk, and achieve better uptime with predictable performance.`;
  const conclusionInternalLink =
    post.slug === "led-display-price-in-bangladesh-complete-buying-guide"
      ? {
          phrase: "Sasha LED display hub",
          href: "/led-display/",
        }
      : null;

  const introSecondaryLink = (() => {
    const has = (token: string) => currentTopicSet.has(token);

    if (has("install") || has("installation") || has("maintenance") || has("calibration") || has("repair")) {
      return { href: "/services-support/", label: "installation & maintenance services" } as const;
    }
    if (has("accessory") || has("accessories") || has("controller") || has("receiving") || has("powersupply") || has("power")) {
      return { href: "/led-display/accessories/", label: "LED display accessories" } as const;
    }
    if (has("price") || has("pricing") || has("budget") || has("cost")) {
      return { href: "/led-display/", label: "LED display solutions" } as const;
    }

    const slug = post.slug.toLowerCase();
    const title = post.title.toLowerCase();
    const isIndoorFocused = slug.includes("indoor") || (title.includes("indoor") && !title.includes("outdoor") && !title.includes("rental"));
    const isOutdoorFocused = slug.includes("outdoor") || (title.includes("outdoor") && !title.includes("indoor") && !title.includes("rental"));
    const isRentalFocused = slug.includes("rental") || (title.includes("rental") && !title.includes("indoor") && !title.includes("outdoor"));

    if (isOutdoorFocused) return { href: "/led-display/outdoor/", label: "outdoor LED displays" } as const;
    if (isRentalFocused) return { href: "/led-display/rental-display/", label: "rental LED displays" } as const;
    if (isIndoorFocused) return { href: "/led-display/indoor-led/", label: "indoor LED displays" } as const;

    return null;
  })();

  const blogInternalLinkBlock = (() => {
    const tag = post.tag ?? "";
    const keyword = post.keywords?.[0]?.trim();
    const keywordShort =
      keyword && keyword.length <= 38
        ? keyword
        : keyword
          ? `${keyword.slice(0, 35).trim()}...`
          : null;

    const hubPrefixes = [
      "LED display",
      "LED screen",
      "LED video wall",
      "LED display panel",
      "LED screen display",
      "LED display solutions",
      "LED signage display",
      "LED screen wall",
      "LED display setup",
      "LED wall display",
      "LED display models",
      "LED display options",
    ];
    const hubSuffixes = [
      "price & models",
      "models and pricing",
      "options in Bangladesh",
      "products overview",
      "catalog and planning",
      "buying options",
      "selection overview",
      "product categories",
      "price planning hub",
      "pricing overview",
      "product list",
      "models overview",
      "solutions overview",
      "price overview",
      "product overview",
      "catalog (BD)",
      "options (BD market)",
      "product guide",
      "planning overview",
      "project overview",
    ];
    const hubQualifiers = ["", " (2026)", " (Bangladesh)", " (BD)", " (buyer guide)", " (price planning)"];

    const tagHint = (() => {
      if (tag === "Price Guide") return "price planning";
      if (tag === "Comparison") return "comparison";
      if (tag === "Execution") return "installation planning";
      if (tag === "Accessories") return "accessories & compatibility";
      if (tag === "Maintenance") return "maintenance planning";
      return null;
    })();

    const prefixIndex = hashString(`${post.slug}:p`) % hubPrefixes.length;
    const suffixIndex = hashString(`${post.slug}:s`) % hubSuffixes.length;
    const qualifierIndex = hashString(`${post.slug}:q`) % hubQualifiers.length;

    const tagShift = tagHint ? hashString(tagHint) : 0;
    const pickedPrefix = hubPrefixes[(prefixIndex + tagShift) % hubPrefixes.length];
    const pickedSuffix = hubSuffixes[(suffixIndex + tagShift) % hubSuffixes.length];
    const pickedQualifier = hubQualifiers[(qualifierIndex + tagShift) % hubQualifiers.length];

    const hubAnchorText = `${pickedPrefix} ${pickedSuffix}${pickedQualifier}`;

    const pattern = hashString(`${post.slug}:pattern`) % 14;

    const primary = (
      <Link href="/led-display/" className="font-extrabold text-slate-900 hover:underline">
        {hubAnchorText}
      </Link>
    );
    const secondary = introSecondaryLink ? (
      <Link href={introSecondaryLink.href} className="font-extrabold text-slate-900 hover:underline">
        {introSecondaryLink.label}
      </Link>
    ) : null;

    const wrap = (content: React.ReactNode) => (
      <p className="mt-4 text-sm leading-8 text-slate-700 md:text-base">{content}</p>
    );

    switch (pattern) {
      case 0:
        return wrap(
          <>
            If you want a quick place to start, open {primary}.
            {secondary ? <> For the next step, review {secondary}.</> : null}
          </>,
        );
      case 1:
        return wrap(
          <>
            Short on time? {primary}.
            {secondary ? <> Also relevant: {secondary}.</> : null}
          </>,
        );
      case 2:
        return wrap(
          <>
            For a practical overview before you decide, see {primary}.
            {secondary ? <> You can pair it with {secondary}.</> : null}
          </>,
        );
      case 3:
        return wrap(
          <>
            Related page: {primary}.
            {secondary ? <> For this topic, {secondary} can help too.</> : null}
          </>,
        );
      case 4:
        return wrap(
          <>
            Planning an LED screen in Bangladesh? {primary} helps you compare categories and models without getting lost.
            {secondary ? <> Then check {secondary} if it matches your scope.</> : null}
          </>,
        );
      case 5:
        return wrap(
          <>
            Keep this link handy: {primary}.
            {secondary ? <> When needed, follow up with {secondary}.</> : null}
          </>,
        );
      case 6:
        return wrap(
          <>
            The fastest way to cross-check models is {primary}.
            {secondary ? <> After that, {secondary} is a solid next step.</> : null}
          </>,
        );
      case 7:
        return wrap(
          <>
            If you are researching{" "}
            {keywordShort ? <span className="font-semibold text-slate-900">{keywordShort}</span> : "LED display options"}, start with{" "}
            {primary}.
            {secondary ? <> You may also want {secondary}.</> : null}
          </>,
        );
      case 8:
        return wrap(
          <>
            Prefer one hub page before you go deeper? Start with {primary}.
            {secondary ? <> Then review {secondary}.</> : null}
          </>,
        );
      case 9:
        return wrap(
          <>
            To turn this article into an actual purchase plan, use {primary} to confirm categories and options.
            {secondary ? <> Next: {secondary}.</> : null}
          </>,
        );
      case 10:
        return wrap(
          <>
            Reference link for this article: {primary}.
            {secondary ? <> Related: {secondary}.</> : null}
          </>,
        );
      case 11:
        return wrap(
          <>
            Next step: check {primary} for a complete overview.
            {secondary ? <> For your scope, {secondary} can be helpful.</> : null}
          </>,
        );
      case 12:
        return wrap(
          <>
            If you want to see options in one place, open {primary}.
            {secondary ? <> Then look at {secondary} when you are ready.</> : null}
          </>,
        );
      default:
        return wrap(
          <>
            Before you finalize anything, review {primary} for a quick overview.
            {secondary ? <> Follow-up: {secondary}.</> : null}
          </>,
        );
    }
  })();
  const whyChooseUsByTag: Record<string, { title: string; intro: string; points: string[] }> = {
    "Price Guide": {
      title: "Why Choose Us for LED Display Price Planning",
      intro:
        "For price-focused projects, our team helps you balance budget, specification, and long-term value so you avoid hidden cost and wrong model selection.",
      points: [
        "BOQ-based pricing with clear scope instead of vague package quotations.",
        "Right pitch and brightness recommendation based on actual site and usage.",
        "Transparent cost breakdown for display, control system, installation, and support.",
        "Focus on lifecycle value, not only lowest initial quotation.",
      ],
    },
    Comparison: {
      title: "Why Choose Us for LED Display Comparison and Selection",
      intro:
        "When choosing between options, we provide practical technical comparison and field-based recommendation so your final decision matches real performance needs.",
      points: [
        "Environment-first recommendation for indoor, outdoor, and semi-open sites.",
        "Decision support based on distance, content type, and operating hours.",
        "Clarity on trade-offs between price, brightness, durability, and maintenance.",
        "Final model suggestion aligned with business objective and timeline.",
      ],
    },
    Execution: {
      title: "Why Choose Us for LED Display Installation and Commissioning",
      intro:
        "Execution quality defines real outcome. Our process-driven installation and calibration workflow ensures stable output from day one.",
      points: [
        "Structured commissioning checklist from mounting to mapping and calibration.",
        "Electrical safety and grounding verification before final handover.",
        "Operator training with practical SOP for daily management.",
        "Post-install support readiness for quick troubleshooting.",
      ],
    },
    Accessories: {
      title: "Why Choose Us for LED Accessories and Compatibility",
      intro:
        "Accessory mismatch creates most long-term issues. We design a compatible controller-power-module stack for reliable performance.",
      points: [
        "Compatibility validation across controller, receiving card, and PSU layers.",
        "Ecosystem recommendation based on project complexity and operations style.",
        "Stable component selection to reduce flicker and mapping errors.",
        "Spare policy guidance for fast maintenance recovery.",
      ],
    },
    Maintenance: {
      title: "Why Choose Us for LED Display Maintenance Planning",
      intro:
        "Our maintenance-first approach helps protect uptime, visual quality, and operating consistency throughout the display lifecycle.",
      points: [
        "Routine maintenance calendar tailored to runtime and site conditions.",
        "Preventive checks for power, signal path, and calibration stability.",
        "Fault logging and root-cause workflow to reduce repeated incidents.",
        "Service strategy focused on downtime prevention and faster recovery.",
      ],
    },
    Strategy: {
      title: "Why Choose Us for LED Display Strategy and ROI Decisions",
      intro:
        "For business decisions like rent vs buy, we provide strategy support that connects technical choices with financial outcomes.",
      points: [
        "Use-case based guidance for ownership, rental, and deployment model.",
        "Budget and ROI framing aligned with campaign duration and frequency.",
        "Operational readiness assessment before investment finalization.",
        "Decision support focused on long-term communication impact.",
      ],
    },
    Safety: {
      title: "Why Choose Us for Outdoor LED Safety Planning",
      intro:
        "Outdoor projects require structure and electrical discipline. We plan safety controls from the beginning to protect people and equipment.",
      points: [
        "Structure and service-access considerations integrated into project scope.",
        "Grounding and surge protection recommendations for local risk conditions.",
        "Weather-aware cable routing and panel safety checks.",
        "Safety audit mindset before go-live and handover.",
      ],
    },
    Planning: {
      title: "Why Choose Us for LED Project Planning",
      intro:
        "Strong outcomes come from strong planning. We convert project requirements into practical deployment plans with clear technical logic.",
      points: [
        "Requirement mapping and survey-driven recommendation workflow.",
        "BOQ, risk controls, and integration checks before procurement.",
        "Execution planning that reduces rework and launch delays.",
        "Support from discovery stage to stable operational handover.",
      ],
    },
    "Best Practices": {
      title: "Why Choose Us for LED Best-Practice Implementation",
      intro:
        "We help teams avoid common mistakes by applying proven implementation standards at every project stage.",
      points: [
        "Checklist-driven process from planning to post-handover operations.",
        "Technical review to prevent compatibility and commissioning errors.",
        "Operator and maintenance guidance for consistent quality.",
        "Quality-focused recommendations based on real project lessons.",
      ],
    },
    Corporate: {
      title: "Why Choose Us for Video Wall Solutions for Corporate Office",
      intro:
        "Corporate projects need reliable visual communication with minimal downtime. We align technical design and delivery with office-grade performance expectations.",
      points: [
        "End-to-end support from requirement mapping to installation and handover.",
        "Recommendations grounded in real Bangladesh operating conditions.",
        "Transparent planning with compatibility, safety, and uptime focus.",
        "Long-term service mindset beyond first project delivery.",
      ],
    },
  };
  const whyChooseUsContent = whyChooseUsByTag[post.tag] ?? {
    title: `Why Choose Us for ${post.title}`,
    intro:
      "We combine technical planning, execution discipline, and after-sales support to deliver reliable LED display outcomes aligned with your business goals.",
    points: [
      "End-to-end support from requirement mapping to installation and handover.",
      "Recommendations grounded in real Bangladesh operating conditions.",
      "Transparent planning with compatibility, safety, and uptime focus.",
      "Long-term service mindset beyond first project delivery.",
    ],
  };
  const whyChooseUsTitle = whyChooseUsContent.title;
  const whyChooseUsIntro = whyChooseUsContent.intro;
  const whyChooseUsPoints = whyChooseUsContent.points;
  const internalLinks = [
    { href: "/blog/", label: "All Blog Articles" },
    { href: "/led-display/", label: "LED Display Solutions" },
    { href: "/services-support/", label: "Services & Support" },
    { href: "/led-display/indoor-led/", label: "Indoor LED Display" },
    { href: "/led-display/outdoor/", label: "Outdoor LED Display" },
    { href: "/contact/", label: "Talk to Our Team" },
  ];

  const canonical = withTrailingSlash(`/blog/${post.slug}`);
  const siteUrl = `https://${siteConfig.domain}`;
  const absoluteCanonical = `${siteUrl}${canonical}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "en",
    mainEntityOfPage: absoluteCanonical,
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    keywords: post.keywords.join(", "),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/blog/", label: "Blog" },
          { href: `/blog/${post.slug}/`, label: post.title, current: true },
        ]}
      />

      <article>
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100 md:rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-auto w-full object-contain"
            style={{ objectPosition: post.coverImagePosition?.hero ?? "center" }}
          />
        </div>
        <div className="mt-4 px-1 md:px-0">
          <div className="inline-flex rounded-full border border-[#FF6A0030] bg-[#FF6A0018] px-3 py-1 text-xs font-bold text-[#C84B00]">
            {post.tag}
          </div>
          <h1 className="mt-3 max-w-5xl text-[1.75rem] font-extrabold leading-[1.22] tracking-tight text-slate-900 md:mt-4 md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 max-w-5xl text-justify text-[13px] leading-6 text-slate-700 md:mt-4 md:text-left md:text-base md:leading-7">
            {post.heroIntro}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-700 md:mt-5 md:flex md:flex-wrap md:items-center md:gap-3 md:text-sm">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-center">{post.readTime}</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-center">
              Published {formatDate(post.publishedAt)}
            </span>
            <span className="col-span-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-center md:col-auto">
              Updated {formatDate(post.updatedAt)}
            </span>
          </div>
        </div>
      </article>

      <section className="mt-6 grid gap-[10px] lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-[10px]">
          <article id="quick-summary" className="scroll-mt-24 rounded-[22px] border border-orange-100 bg-orange-50/70 p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold text-slate-900 md:text-2xl">Quick Summary</h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-6 text-slate-700 md:mt-4 md:text-base md:leading-7">
              {summaryPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF6A00]" />
                  <span className="text-justify md:text-left">{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article id="introduction" className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold text-slate-900 md:text-2xl">Introduction</h2>
            <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:mt-4 md:text-left md:text-base md:leading-8">{seoIntro}</p>
            {blogInternalLinkBlock}
          </article>

          <details className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:hidden">
            <summary className="cursor-pointer list-none text-[1.1rem] font-bold text-slate-900">
              Table of Contents
            </summary>
            <ul className="mt-3 space-y-2 text-[13px] text-slate-700">
              {sectionLinks.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition hover:text-[#FF6A00]">
                    {item.heading}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {allSections.map((section, index) => {
            const sectionId = toSectionId(section.heading, index);
            return (
              <article
                key={section.heading}
                id={sectionId}
                className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-8"
              >
                <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                  Section {index + 1}
                </div>
                <h2 className="mt-3 text-[1.1rem] font-bold leading-[1.3] text-slate-900 md:text-2xl">{section.heading}</h2>
                {section.paragraphs.map((text, paragraphIndex) => {
                  const paragraphLink = section.paragraphLinks?.find((link) => link.paragraphIndex === paragraphIndex);

                  return (
                    <p key={text} className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:mt-4 md:text-left md:text-base md:leading-8">
                      {text}
                      {paragraphLink ? (
                        <>
                          {" "}
                          <a
                            href={paragraphLink.href}
                            target="_blank"
                            rel="noopener"
                            className="font-bold text-[#FF6A00] underline decoration-[#FF6A00]/35 underline-offset-4 transition hover:text-[#E45700]"
                          >
                            {paragraphLink.label}
                          </a>
                        </>
                      ) : null}
                    </p>
                  );
                })}
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-2 text-[13px] leading-6 text-slate-700 md:mt-5 md:text-base md:leading-7">
                    {section.bullets.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF6A00]" />
                        <span className="text-justify md:text-left">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.table ? (
                  <div className="mt-4 overflow-x-auto rounded-[18px] border border-slate-200 md:mt-5 md:rounded-2xl">
                    <table className="min-w-full border-collapse text-[13px] md:text-base">
                      <thead className="bg-slate-100">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header} className="border-b border-slate-200 px-3 py-2.5 text-left font-bold text-slate-900 md:px-4 md:py-3">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join("-")} className="bg-white">
                            {row.map((cell) => (
                              <td key={cell} className="border-b border-slate-100 px-3 py-2.5 align-top text-slate-700 last:border-b-0 md:px-4 md:py-3">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </article>
            );
          })}

          <section id="why-choose-us" className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold leading-[1.3] text-slate-900 md:text-2xl">{whyChooseUsTitle}</h2>
            <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:text-left md:text-base md:leading-8">{whyChooseUsIntro}</p>
            <ul className="mt-4 space-y-2 text-[13px] leading-6 text-slate-700 md:text-base md:leading-7">
              {whyChooseUsPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF6A00]" />
                  <span className="text-justify md:text-left">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="conclusion" className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold text-slate-900 md:text-2xl">Conclusion</h2>
            <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:mt-4 md:text-left md:text-base md:leading-8">
              {conclusionInternalLink && conclusionText.includes(conclusionInternalLink.phrase) ? (
                <>
                  {conclusionText.split(conclusionInternalLink.phrase)[0]}
                  <Link
                    href={conclusionInternalLink.href}
                    className="text-inherit"
                  >
                    {conclusionInternalLink.phrase}
                  </Link>
                  {conclusionText.split(conclusionInternalLink.phrase).slice(1).join(conclusionInternalLink.phrase)}
                </>
              ) : (
                conclusionText
              )}
            </p>
          </section>

          <section id="internal-links" className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold text-slate-900 md:text-2xl">Related Useful Links</h2>
            <div className="mt-4 grid gap-[10px] md:grid-cols-2">
              {internalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:border-orange-200 hover:text-[#FF6A00] md:rounded-xl md:px-4 md:py-3 md:text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold text-slate-900 md:text-2xl">FAQ</h2>
            <div className="mt-4 space-y-[10px]">
              {post.faqs.map((faq) => (
                <details key={faq.q} className="group rounded-[14px] border border-slate-200 bg-slate-50 p-3.5 md:rounded-xl md:p-4">
                  <summary className="cursor-pointer text-[13px] font-semibold leading-5 text-slate-900 md:text-base">{faq.q}</summary>
                  <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:text-left md:text-base md:leading-7">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="cta" className="scroll-mt-24 rounded-[22px] border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 p-4 shadow-sm md:rounded-3xl md:p-8">
            <h2 className="text-[1.1rem] font-bold leading-[1.3] text-slate-900 md:text-2xl">Looking for professional LED display solutions?</h2>
            <p className="mt-3 text-justify text-[13px] leading-6 text-slate-700 md:text-left md:text-base md:leading-7">
              Share your location, viewing distance, and target budget. We will suggest pixel pitch, cabinet format,
              and power setup that fits your use case.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#FF6A00] px-3 py-2 text-center text-[11px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#E45700] md:rounded-xl md:px-4 md:py-2 md:text-sm md:font-semibold"
              >
                Talk to an Expert
              </Link>
              <Link
                href="/led-display/"
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-center text-[11px] font-extrabold text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-100 md:rounded-xl md:px-4 md:py-2 md:text-sm md:font-semibold"
              >
                Browse LED Displays
              </Link>
            </div>
          </section>
        </div>

        <aside className="space-y-[10px] lg:sticky lg:top-24">
          <section className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-2xl md:p-5">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900 md:text-sm">Table of Contents</h2>
            <ul className="mt-3 space-y-2 text-[13px] text-slate-700 md:text-sm">
              {sectionLinks.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition hover:text-[#FF6A00]">
                    {item.heading}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-2xl md:p-5">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900 md:text-sm">Quick Facts</h2>
            <div className="mt-3 space-y-2 text-[13px] text-slate-700 md:text-sm">
              <p>
                <span className="font-semibold text-slate-900">Category:</span> {post.tag}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Read Time:</span> {post.readTime}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Updated:</span> {formatDate(post.updatedAt)}
              </p>
            </div>
          </section>

          <section className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm md:rounded-2xl md:p-5">
            <h2 className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900 md:text-sm">Related Posts</h2>
            <div className="mt-4 space-y-[10px]">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}/`}
                  className="group block overflow-hidden rounded-[18px] border border-slate-200 bg-slate-50 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-white hover:shadow-md md:rounded-2xl"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-slate-200 md:h-36">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      sizes="320px"
                      className="object-cover transition duration-300 group-hover:scale-[1.04]"
                      style={{ objectPosition: item.coverImagePosition?.card ?? "center" }}
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="inline-flex rounded-full border border-[#FF6A0030] bg-[#FF6A0014] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C84B00] md:text-[11px]">
                      {item.tag}
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-[14px] font-extrabold leading-5 text-slate-900 transition group-hover:text-[#FF6A00] md:mt-3 md:text-base md:leading-6">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-justify text-[12px] leading-5 text-slate-600 md:mt-2 md:line-clamp-3 md:text-left md:text-sm md:leading-6">
                      {item.excerpt}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-500 md:mt-3 md:text-xs">
                      <span>{item.readTime}</span>
                      <span className="text-[#FF6A00] transition group-hover:translate-x-0.5">Read article -&gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/blog/"
              className="mt-5 inline-flex text-sm font-semibold text-[#FF6A00] hover:underline"
            >
              Back to all articles
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
}
