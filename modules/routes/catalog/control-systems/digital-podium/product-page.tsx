import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import Link from "next/link";
import FaqAccordion from "@/components/common/FaqAccordion";
import DigitalPodiumProductDetailPage from "./DigitalPodiumProductDetailPage";
import { digitalPodiumCatalog, getDigitalPodiumBySlug } from "./catalog";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function rotateBySeed<T>(items: T[], seed: number): T[] {
  if (items.length <= 1) return items;
  const offset = seed % items.length;
  return items.slice(offset).concat(items.slice(0, offset));
}

function pickFeaturedProducts(slug: string, count = 3) {
  const current = getDigitalPodiumBySlug(slug);
  const candidates = digitalPodiumCatalog.filter((x) => x.slug !== slug);
  if (!current) return candidates.slice(0, count);

  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));
  const recSet = new Set(current.recommendedFor.map((t) => t.toLowerCase()));

  const scored = candidates
    .map((p) => {
      const scoreTags = p.tags.reduce((acc, t) => acc + (tagSet.has(t.toLowerCase()) ? 2 : 0), 0);
      const scoreRec = p.recommendedFor.reduce((acc, t) => acc + (recSet.has(t.toLowerCase()) ? 3 : 0), 0);
      const scoreTitle = p.title.toLowerCase().includes("smart classroom") && current.title.toLowerCase().includes("smart classroom") ? 1 : 0;
      return { p, score: scoreTags + scoreRec + scoreTitle };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored.filter((x) => x.score > 0).map((x) => x.p);
  const fallback = scored.filter((x) => x.score === 0).map((x) => x.p);

  const seed = hashSeed(slug);
  const rotatedFallback = rotateBySeed(fallback, seed);

  const picked: typeof candidates = [];
  for (const p of best) {
    if (picked.length >= count) break;
    picked.push(p);
  }
  for (const p of rotatedFallback) {
    if (picked.length >= count) break;
    picked.push(p);
  }
  return picked.slice(0, count);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getDigitalPodiumBySlug(slug);
  if (!item) return { title: "Digital Podium" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "Digital podium specification summary, integration notes (projector/IFP/PA), and installation support in Bangladesh."
    ),
    path: `/digital-podium/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | Digital Podium`,
  });
}

export async function generateStaticParams() {
  return digitalPodiumCatalog.map((x) => ({ slug: x.slug }));
}

export default async function DigitalPodiumProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getDigitalPodiumBySlug(slug);

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
        <div className="rounded-3xl border bg-white p-8" style={{ borderColor: `${BRAND.maroon}12` }}>
          <h1 className="text-xl font-extrabold text-slate-900">Digital Podium model not found</h1>
          <p className="mt-2 text-slate-600 leading-7">
            The requested model does not exist. Please go back to the Digital Podium listing.
          </p>
          <Link
            href="/digital-podium/"
            className="mt-4 inline-flex rounded-xl px-5 py-3 text-sm font-extrabold text-white"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Back to Digital Podium
          </Link>
        </div>
      </div>
    );
  }

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = pickFeaturedProducts(product.slug, 3);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <>
      <DigitalPodiumProductDetailPage
        product={product}
        wa={wa}
        featuredCards={featuredProducts.map((p) => ({
          product: p,
          highlights: p.cardHighlights.slice(0, 4),
          recommendedFor: p.recommendedFor.slice(0, 3),
        }))}
        relatedLinks={[
          { href: "/digital-podium/", label: "Digital Podium listing" },
          { href: "/pa-system/", label: "PA Sound System" },
          { href: "/contact/", label: "Contact / BOQ quotation" },
          { href: "/services-support/", label: "Installation support" },
        ]}
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-6">
        <section className="mt-8 rounded-3xl border bg-white p-7 md:p-10" style={{ borderColor: `${BRAND.maroon}12` }}>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQs</h2>
              <p className="mt-2 text-slate-600 leading-7">
                Quick answers about configuration, integration and installation support in Bangladesh.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <FaqAccordion accent={BRAND.maroon} items={product.faqs} columns={2} />
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        </section>
      </div>
    </>
  );
}

