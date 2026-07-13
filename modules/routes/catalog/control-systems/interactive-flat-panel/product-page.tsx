import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import FaqAccordion from "@/components/common/FaqAccordion";
import {
  getInteractiveFlatPanelBySlug,
  interactiveFlatPanelCatalog,
  type InteractiveFlatPanelItem,
} from "./catalog";
import InteractiveFlatPanelProductDetailPage, { type InteractiveFlatPanelFeaturedCard } from "./InteractiveFlatPanelProductDetailPage";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = getInteractiveFlatPanelBySlug(slug);
  if (!item) return { title: "Interactive Flat Panel" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "Interactive flat panel (IFP) selection notes, size guidance, installation scope and quotation support in Bangladesh."
    ),
    path: `/interactive-flat-panel/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | Interactive Flat Panel`,
  });
}

export async function generateStaticParams() {
  return interactiveFlatPanelCatalog.map((x) => ({ slug: x.slug }));
}

function buildDetails(product: InteractiveFlatPanelItem): {
  overview: string;
  highlights: string[];
  specs: { k: string; v: string }[];
  recommendedFor: string[];
  faqs: { q: string; a: string }[];
} {
  type SpecRow = { k: string; v: string };

  const ifpUseCase =
    product.sizeInch <= 65
      ? "Smart classrooms, huddle rooms and small-to-medium meeting spaces"
      : product.sizeInch <= 75
        ? "Medium classrooms, trainings and everyday meeting rooms"
        : product.sizeInch <= 86
          ? "Large classrooms, lecture rooms and corporate boardrooms"
          : product.sizeInch <= 96
            ? "Lecture halls and bigger training rooms"
            : "Auditoriums and large venues where impact matters";

  const mergeSpecs = (...groups: Array<SpecRow[]>): SpecRow[] => {
    const out: SpecRow[] = [];
    const seen = new Set<string>();
    for (const g of groups) {
      for (const row of g) {
        const key = row.k.trim().toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        out.push(row);
      }
    }
    return out;
  };

  const commonExtra: SpecRow[] = [
    { k: "Use-case", v: ifpUseCase },
    { k: "Mount", v: "Wall mount or trolley stand (project dependent)" },
  ];

  const specsLgTr3dkBase = (size: 65 | 75 | 86): SpecRow[] =>
    mergeSpecs(
      [
        { k: "Panel size", v: `${size}"` },
        { k: "Resolution", v: "4K UHD (3840 × 2160)" },
      ],
      size === 65
        ? [
            { k: "Display type", v: "IPS/VA LED-backlit panel" },
            { k: "Brightness", v: "Around 350–400 nits (typical)" },
            { k: "Contrast ratio", v: "Approximately 1200:1 (typ.)" },
            { k: "Viewing angle (H/V)", v: "178° / 178°" },
            { k: "Refresh rate", v: "60 Hz" },
            { k: "Touch technology", v: "Infrared / in-glass (varies by model)" },
            { k: "Touch points", v: "Up to 40-point multi-touch (model dependent)" },
            { k: "Response time", v: "About 6–8 ms (typical)" },
            { k: "Glass type", v: "Anti-glare tempered glass" },
            { k: "Glass hardness", v: "Up to 7H (approx.)" },
            { k: "Operating system", v: "Built-in Android 11 (CreateBoard OS)" },
            { k: "CPU / RAM / storage", v: "Quad-core CPU, 4 GB RAM, 32–64 GB storage (model dependent)" },
            { k: "Speakers", v: "20W + 20W front-facing speakers" },
            { k: "Connectivity (front)", v: "USB, HDMI (varies), touch USB, Type‑C (optional)" },
            { k: "Connectivity (rear)", v: "HDMI in, VGA (optional), audio in/out, USB 2.0/3.0, LAN, RS232 (model dependent)" },
            { k: "Wi‑Fi / network", v: "Built-in Wi‑Fi + LAN" },
            { k: "OPS slot", v: "Yes — OPS PC slot supported (Intel OPS compatible)" },
            { k: "Wall mount / stand", v: "VESA mount compatible; wall bracket / trolley optional" },
            { k: "Power", v: "AC 100–240V, 50/60 Hz" },
            { k: "Operating temperature", v: "0°C to 40°C" },
            { k: "Operating humidity", v: "10%–80% RH (non‑condensing)" },
          ]
        : size === 75
          ? [
              { k: "Brightness", v: "Around 350–400 nits (typical)" },
              { k: "Contrast ratio", v: "Approximately 1200:1 (typ.)" },
              { k: "Viewing angle (H/V)", v: "178° / 178°" },
              { k: "Touch points", v: "Up to 40-point multi-touch" },
              { k: "Touch technology", v: "Infrared / in-glass (model dependent)" },
              { k: "Glass", v: "Anti-glare tempered glass" },
              { k: "OS", v: "Android 11 built-in; OPS slot available for Windows PC" },
              { k: "Speakers", v: "20W + 20W" },
              { k: "Connectivity", v: "HDMI, USB, LAN, audio in/out, Wi‑Fi (model dependent)" },
              { k: "OPS slot", v: "OPS slot supported" },
              { k: "Power", v: "AC 100–240V, 50/60 Hz" },
            ]
          : [
              { k: "Brightness", v: "Around 350–400 nits (typ.)" },
              { k: "Viewing distance", v: "Ideal for ~7–12 m classroom depth" },
              { k: "Touch points", v: "Up to 40-point touch" },
              { k: "OS", v: "Android 11 + OPS slot for Windows" },
              { k: "Speakers", v: "20W + 20W or higher (model dependent)" },
              { k: "Glass type", v: "Anti-glare, anti-fingerprint tempered glass" },
              { k: "Mounting", v: "Wall mount / floor stand / trolley (optional)" },
            ],
      commonExtra,
    );

  const specsLgUltra = (size: 96 | 110): SpecRow[] =>
    mergeSpecs(
      [
        { k: "Panel size", v: `${size}"` },
        { k: "Resolution", v: "4K UHD" },
        { k: "Brightness", v: "Approx. 350–400 nits" },
        { k: "Touch points", v: "Up to 40-point touch" },
        { k: "OS", v: "Android + OPS Windows support" },
        { k: "Speakers", v: "High-power built-in speakers (model dependent)" },
      ],
      commonExtra,
    );

  const specsSamsungFlip65: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '65"' },
      { k: "Resolution", v: "4K UHD (3840 × 2160)" },
      { k: "Touch points", v: "Up to 20-point multi-touch (Flip Pro family)" },
      { k: "Writing mode", v: "Pen + brush tools with thickness sensing" },
      { k: "Glass", v: "Anti-glare, anti-fingerprint glass" },
      { k: "OS", v: "Samsung embedded OS with Flip software" },
      { k: "Connectivity", v: "HDMI, USB, LAN; screen mirroring / wireless casting (model dependent)" },
    ],
    commonExtra,
  );

  const specsSamsungFlip75: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '75"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "Up to 20-point multi-touch" },
      { k: "Features", v: "Low-latency touch, pen + brush tools, screen sharing, annotation" },
    ],
    commonExtra,
  );

  const specsSamsungFlip86: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '86"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "Multi-touch writing support" },
      { k: "Features", v: "Ultra-large 4K display, anti-glare surface, fast writing response, wireless casting" },
    ],
    commonExtra,
  );

  const specsNewline65: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '65"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "Up to 20–40-point touch (model dependent)" },
      { k: "OS", v: "Android-based system with whiteboard + apps" },
      { k: "Speakers", v: "Integrated stereo speakers (typ. 2×15–20W)" },
      { k: "Connectivity", v: "HDMI, USB, LAN, Wi‑Fi (model dependent)" },
      { k: "OPS slot", v: "Yes — supports OPS PC" },
    ],
    commonExtra,
  );

  const specsNewline75: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '75"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "Multi-touch (20–40 points, model dependent)" },
      { k: "OS", v: "Android with Newline interactive suite" },
      { k: "Speakers", v: "High-fidelity integrated speakers" },
    ],
    commonExtra,
  );

  const specsNewline86: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '86"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "Multi-touch interactive surface" },
      { k: "OS", v: "Android + OPS PC support (model dependent)" },
    ],
    commonExtra,
  );

  const specsIngscreenSimple = (size: 65 | 75 | 86): SpecRow[] =>
    mergeSpecs(
      [
        { k: "Pixel pitch", v: "—" },
        { k: "Category", v: "Interactive flat panel" },
        {
          k: "Typical applications",
          v:
            size === 65
              ? "iScreen affordable IFP"
              : size === 75
                ? "iScreen IFP 75"
                : "iScreen 86-inch IFP (Android + OPS)",
        },
        { k: "Price range", v: "On request" },
      ],
      commonExtra,
    );

  const specsIboard65: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '65"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "OS", v: "Android 11 (typical)" },
      { k: "Touch points", v: "20-point touch" },
    ],
    commonExtra,
  );

  const specsIboard75: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '75"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "Multi-touch" },
      { k: "Features", v: "Wireless sharing + touch writing (brand software)" },
    ],
    commonExtra,
  );

  const specsIboard86: SpecRow[] = mergeSpecs(
    [
      { k: "Panel size", v: '86"' },
      { k: "Resolution", v: "4K UHD" },
      { k: "Touch points", v: "40-point touch (typical)" },
      { k: "OS", v: "Android + OPS support" },
    ],
    commonExtra,
  );

  const specsIboard98Simple: SpecRow[] = mergeSpecs(
    [
      { k: "Pixel pitch", v: "—" },
      { k: "Category", v: "Interactive flat panel" },
      { k: "Typical applications", v: "iBoard 98-inch IFP (large venue / large classroom)" },
      { k: "Price range", v: "On request" },
    ],
    commonExtra,
  );

  const baseSpecs: SpecRow[] =
    product.slug === "lg-createboard-65in-4k-touch-classroom"
      ? specsLgTr3dkBase(65)
      : product.slug === "lg-createboard-75in-4k-smart-classroom"
        ? specsLgTr3dkBase(75)
        : product.slug === "lg-createboard-86in-4k-collaboration-display"
          ? specsLgTr3dkBase(86)
          : product.slug === "lg-ultra-96in-4k-interactive-board"
            ? specsLgUltra(96)
            : product.slug === "lg-ultra-110in-4k-flagship-interactive-panel"
              ? specsLgUltra(110)
              : product.slug === "samsung-flip-65in-4k-interactive-panel"
                ? specsSamsungFlip65
                : product.slug === "samsung-flip-75in-4k-smart-teaching-display"
                  ? specsSamsungFlip75
                  : product.slug === "samsung-86in-4k-interactive-classroom-board"
                    ? specsSamsungFlip86
                    : product.slug === "newline-65in-4k-android-interactive-panel"
                      ? specsNewline65
                      : product.slug === "newline-75in-4k-touch-smartboard"
                        ? specsNewline75
                        : product.slug === "newline-86in-4k-collaboration-panel"
                          ? specsNewline86
                          : product.slug === "iscreen-65in-4k-interactive-panel-android"
                            ? specsIngscreenSimple(65)
                            : product.slug === "iscreen-75in-4k-smart-classroom-panel"
                              ? specsIngscreenSimple(75)
                              : product.slug === "iscreen-86in-4k-interactive-board-ops-ready"
                                ? specsIngscreenSimple(86)
                                : product.slug === "iboard-65in-4k-interactive-smart-panel"
                                  ? specsIboard65
                                  : product.slug === "iboard-75in-4k-interactive-teaching-board"
                                    ? specsIboard75
                                    : product.slug === "iboard-86in-4k-large-interactive-panel"
                                      ? specsIboard86
                                      : product.slug === "iboard-98in-4k-large-venue-interactive-panel"
                                        ? specsIboard98Simple
                                        : mergeSpecs(
                                            [
                                              { k: "Screen Size", v: `${product.sizeInch}"` },
                                              { k: "Resolution", v: "4K UHD (typical)" },
                                              { k: "Touch", v: "Multi-touch writing (model dependent)" },
                                              { k: "Platform", v: "Android (built-in) + OPS PC (optional)" },
                                            ],
                                            commonExtra,
                                          );

  const sizeGuidance =
    product.sizeInch <= 65
      ? "65-inch panels are commonly selected for smaller rooms, compact training spaces and huddle-style meetings."
      : product.sizeInch <= 86
        ? "75-86 inch panels are a balanced choice for typical classrooms and meeting rooms with medium seating depth."
        : "96-inch and above panels are usually planned for bigger halls, deep classrooms and premium boardrooms.";

  return {
    overview:
      `An interactive flat panel (IFP) combines a large 4K display with touch writing for teaching and collaboration. ` +
      `This model is positioned as a ${product.sizeInch}" option with practical installation planning and training support. ` +
      sizeGuidance,
    highlights: [
      "Smooth touch writing for annotation, teaching and brainstorming",
      "Wireless screen sharing workflow for laptops and mobile devices (feature set varies by model)",
      "Android-based operation for quick start, plus OPS PC option for full Windows workflow",
      "Installation planning covers mounting height, cable management and room viewing angles",
    ],
    specs: baseSpecs,
    recommendedFor:
      product.sizeInch <= 65
        ? ["Small meeting room", "Principal room", "Compact training"]
        : product.sizeInch <= 86
          ? ["Classroom", "Coaching center", "Training room", "Boardroom"]
          : ["Auditorium", "Large training hall", "Premium boardroom"],
    faqs: [
      {
        q: "Does the quotation include installation?",
        a: "We can quote for supply-only or supply + installation. Installation scope depends on mounting type, cabling distance, power/LAN readiness and any accessories like OPS PC or trolley.",
      },
      {
        q: "How do I choose the right size (65/75/86/96/98/110)?",
        a: "Size selection depends on room depth, viewing distance, and content type. Share room dimensions and seating layout and we will recommend a practical size for readability.",
      },
      {
        q: "Do I need an OPS PC if Android is built-in?",
        a: "Not always. Android is enough for whiteboard, basic apps and casting in many rooms. OPS PC is helpful when you need a full Windows workflow, Office/Teams/Zoom requirements, or heavier content handling.",
      },
    ],
  };
}

function scoreRelated(current: InteractiveFlatPanelItem, other: InteractiveFlatPanelItem): number {
  const sameBrand = current.brand === other.brand ? 3 : 0;
  const sizeDistance = Math.abs(current.sizeInch - other.sizeInch);
  const sizeScore = sizeDistance === 0 ? 3 : sizeDistance <= 11 ? 2 : sizeDistance <= 21 ? 1 : 0;
  return sameBrand + sizeScore;
}

function getRelatedItems(all: InteractiveFlatPanelItem[], current: InteractiveFlatPanelItem, count: number): InteractiveFlatPanelItem[] {
  return all
    .filter((x) => x.slug !== current.slug)
    .map((x) => ({ x, score: scoreRelated(current, x) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.x);
}

function buildDescriptionParagraph(product: InteractiveFlatPanelItem, details: ReturnType<typeof buildDetails>): string {
  const bestFor = details.recommendedFor.slice(0, 3).join(", ");
  const highlights = details.highlights.slice(0, 3).map((x) => x.replace(/\.$/, "")).join(", ");
  return [
    `${product.title} is commonly considered for ${bestFor}.`,
    product.subtitle,
    `Planning focus includes ${highlights}.`,
    "Final scope depends on mounting method, OPS PC requirement, accessory package, cabling and installation conditions.",
    "We support BOQ planning, model selection, installation and user handover across Bangladesh.",
  ].join(" ");
}

export default async function InteractiveFlatPanelDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
){
  const { slug } = await params;
  const product = getInteractiveFlatPanelBySlug(slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const details = buildDetails(product);
  const related = getRelatedItems(interactiveFlatPanelCatalog, product, 3);
  const description = buildDescriptionParagraph(product, details);

  const featuredCards: InteractiveFlatPanelFeaturedCard[] = related.map((p) => {
    const d = buildDetails(p);
    return { product: p, highlights: d.highlights.slice(0, 4), bestFor: d.recommendedFor.slice(0, 3) };
  });

  const descriptionParagraphs = [details.overview, description];

  return (
    <>
      <InteractiveFlatPanelProductDetailPage
        product={product}
        wa={wa}
        highlights={details.highlights}
        recommendedFor={details.recommendedFor}
        specRows={details.specs}
        descriptionParagraphs={descriptionParagraphs}
        featuredCards={featuredCards}
        relatedLinks={[
          { href: "/interactive-flat-panel/", label: "Interactive Flat Panel listing" },
          { href: "/interactive-flat-panel/#size-selection", label: "Size selection guide" },
          { href: "/contact", label: "Request quotation" },
        ]}
        whatYouGet={[
          "Model and size guidance based on room layout",
          "Mounting + cabling scope planning for clean installation",
          "Optional OPS PC and accessories selection (if required)",
          "Commissioning + basic user handover guidance",
          "Warranty and after-sales support planning",
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-6">
        <div className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">FAQ</h2>
          <p className="mt-1 text-xs leading-6 text-slate-600">
            Quick answers before ordering an interactive flat panel in Bangladesh.
          </p>
          <div className="mt-3">
            <FaqAccordion accent={BRAND.maroon} items={details.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
