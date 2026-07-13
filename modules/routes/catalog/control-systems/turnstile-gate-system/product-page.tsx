import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import FaqAccordion from "@/components/common/FaqAccordion";
import { getTurnstileBySlug, turnstileCatalog, type TurnstileItem } from "./catalog";
import TurnstileProductDetailPage, { type TurnstileFeaturedCard } from "./TurnstileProductDetailPage";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = getTurnstileBySlug(slug);
  if (!item) return { title: "Turnstile Gate System" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "Turnstile gate specifications, access device compatibility, lane planning, and installation support in Bangladesh."
    ),
    path: `/turnstile-gate/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | Turnstile Gate System`,
  });
}

export async function generateStaticParams() {
  return turnstileCatalog.map((x) => ({ slug: x.slug }));
}

function buildDetails(product: TurnstileItem): {
  overview: string;
  keyFeatures: string[];
  specs: { k: string; v: string }[];
  recommendedFor: string[];
  faqs: { q: string; a: string }[];
} {
  switch (product.kind) {
    case "tripod_turnstile":
      return {
        overview:
          "Tripod turnstiles are a cost-effective entry control option for staff and student gates. They are commonly paired with RFID, fingerprint, or face recognition terminals and configured to log entry/exit for attendance and security workflows.",
        keyFeatures: [
          "Single-lane controlled entry with bidirectional logic (setup dependent)",
          "Works with common access devices (RFID/biometric)",
          "Practical for factories, campuses, and staff entrances",
          "Supports attendance and access control reporting when integrated",
        ],
        specs: [
          { k: "Gate Type", v: "Tripod turnstile" },
          { k: "Lane", v: "Single-lane (typical)" },
          { k: "Access Options", v: "RFID / fingerprint / face (integration dependent)" },
          { k: "Use", v: "Staff and controlled entry points" },
          { k: "Integration", v: "Access control panel / attendance system" },
          { k: "Installation", v: "Power + LAN + controller commissioning" },
        ],
        recommendedFor: ["Factory entry", "Campus gate", "Office staff entry", "Secure building entrance"],
        faqs: [
          {
            q: "Can tripod turnstile integrate with attendance software?",
            a: "Yes. With the correct access device and controller configuration, logs can be used for attendance reporting and HR workflows.",
          },
        ],
      };

    case "flap_barrier":
      return {
        overview:
          "Flap barrier gates are used in premium entrances where appearance, smooth flow, and sensor-based anti-tailgating matter. They work well with RFID, face recognition, and QR workflows depending on the selected access device.",
        keyFeatures: [
          "Optical sensor detection for controlled passage",
          "Anti-tailgating / alarm logic (configuration dependent)",
          "Premium design for corporate lobbies and banks",
          "Supports RFID/face/QR devices based on integration",
        ],
        specs: [
          { k: "Gate Type", v: "Flap barrier (optical)" },
          { k: "Flow", v: "Fast (project dependent)" },
          { k: "Security", v: "Medium to high (setup dependent)" },
          { k: "Access Options", v: "RFID / face / QR (device dependent)" },
          { k: "Use", v: "Premium lobby entrances" },
          { k: "Integration", v: "Controller + software configuration" },
        ],
        recommendedFor: ["Bank entrance", "Corporate lobby", "IT park", "Government building"],
        faqs: [
          {
            q: "Do flap barriers prevent tailgating?",
            a: "They can reduce tailgating using sensors and rules, but final effectiveness depends on lane planning, access policy, and configuration.",
          },
        ],
      };

    case "swing_speed_gate":
      return {
        overview:
          "Swing barrier and speed gate turnstiles are chosen for faster passage and modern lobby design. They can support wide-lane entry for accessibility or trolley movement, and integrate with RFID, face, or QR access depending on the project.",
        keyFeatures: [
          "Fast passage with sensor monitoring (model dependent)",
          "Modern slim design for premium entrances",
          "Wide-lane friendly for accessibility use cases",
          "Compatible with RFID/QR/face workflows (device dependent)",
        ],
        specs: [
          { k: "Gate Type", v: "Swing barrier / speed gate" },
          { k: "Pricing Unit", v: "Per lane (typical)" },
          { k: "Flow", v: "Fast" },
          { k: "Access Options", v: "RFID / face / QR (device dependent)" },
          { k: "Use", v: "Premium entrances and visitor flow" },
          { k: "Installation", v: "Power + LAN + sensor commissioning" },
        ],
        recommendedFor: ["Hotel entrance", "Corporate HQ", "Premium office", "Showroom / hospital wide lane"],
        faqs: [
          {
            q: "Is swing barrier better for wheelchair access?",
            a: "Often yes, because swing gates can be configured for wider lanes. Final lane width and accessibility planning depends on entrance space and flow requirements.",
          },
        ],
      };

    case "waist_high_turnstile":
      return {
        overview:
          "Waist-high turnstiles are a durable option for moderate traffic entry points. They can be configured for single or double lanes and integrated with common access methods for basic access control and logging.",
        keyFeatures: [
          "Durable mechanism for day-to-day entry control",
          "Single or double lane options (project dependent)",
          "Works with RFID/PIN/biometric devices via integration",
          "Low-maintenance choice for many institutions",
        ],
        specs: [
          { k: "Gate Type", v: "Waist-high turnstile" },
          { k: "Lane", v: "Single / double (project dependent)" },
          { k: "Access Options", v: "RFID / PIN / biometric (integration dependent)" },
          { k: "Use", v: "Moderate traffic entrances" },
          { k: "Integration", v: "Controller + attendance/access system" },
          { k: "Installation", v: "Power + LAN + mounting planning" },
        ],
        recommendedFor: ["School entry", "Office entry", "Factory staff gate", "Institution entrances"],
        faqs: [
          {
            q: "Can I add fingerprint later?",
            a: "Usually yes, if the controller and wiring plan supports it. It’s best to plan the access mode early so cabling and mounting remain clean.",
          },
        ],
      };

    case "full_height_turnstile":
      return {
        overview:
          "Full-height turnstile gates are used when maximum entry security is required. They create a taller physical barrier, reduce bypass attempts, and support strict access rules for factories and restricted zones with reliable entry/exit logging.",
        keyFeatures: [
          "Maximum physical security for restricted areas and perimeters",
          "Supports RFID/biometric/QR access workflows (integration dependent)",
          "Better control against climbing and unauthorized bypass",
          "Useful for shift entry gates with strict policies and logs",
        ],
        specs: [
          { k: "Gate Type", v: "Full-height turnstile" },
          { k: "Pricing Unit", v: "Per lane (typical)" },
          { k: "Security", v: "High" },
          { k: "Access Options", v: "RFID / fingerprint / face / QR (device dependent)" },
          { k: "Use", v: "Factory entry & restricted zones" },
          { k: "Integration", v: "Controller + software rules (optional attendance)" },
        ],
        recommendedFor: ["Factory main gate", "Restricted zones", "Perimeter access control", "High-security sites"],
        faqs: [
          {
            q: "Is full-height gate necessary for my factory?",
            a: "If you need stronger physical security and tighter access control at entry points, full-height gates are often the best choice. We recommend after reviewing traffic flow, security policy and space.",
          },
        ],
      };

    case "ai_face_turnstile":
    default:
      return {
        overview:
          "AI face recognition turnstile gates combine controlled entry with face verification workflows. They can be integrated with attendance and reporting systems depending on the selected terminal and software setup.",
        keyFeatures: [
          "Face recognition terminal integration (device dependent)",
          "Fast verification for smoother entry flow (model dependent)",
          "Attendance/HR reporting integration possible",
          "Useful for modern touchless access control policies",
        ],
        specs: [
          { k: "Gate Type", v: "Smart turnstile with face terminal integration" },
          { k: "Access Method", v: "Face recognition (optional multi-factor)" },
          { k: "Use", v: "Touchless access + attendance workflows" },
          { k: "Integration", v: "Software setup + admin training" },
          { k: "Installation", v: "Power + LAN + commissioning" },
          { k: "Optional", v: "Additional checks depend on selected device" },
        ],
        recommendedFor: ["Corporate HQ", "Factories with attendance", "Institutions", "Premium secure entry"],
        faqs: [
          {
            q: "Will face recognition work reliably in real sites?",
            a: "Reliability depends on terminal selection, mounting height, lighting, and correct configuration. A site check helps choose a suitable setup.",
          },
        ],
      };
  }
}

function getRelatedTurnstileItems(all: TurnstileItem[], current: TurnstileItem, count: number): TurnstileItem[] {
  const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));

  const scored = all
    .filter((x) => x.slug !== current.slug)
    .map((x) => {
      const tags = x.tags.map((t) => t.toLowerCase());
      const sharedTags = tags.reduce((acc, t) => (currentTags.has(t) ? acc + 1 : acc), 0);
      const sameKind = x.kind === current.kind ? 1 : 0;
      const score = sharedTags * 2 + sameKind * 3;
      return { x, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.x);
}

function buildDescriptionParagraph(product: TurnstileItem, details: ReturnType<typeof buildDetails>): string {
  const useCases = details.recommendedFor.length ? details.recommendedFor.slice(0, 4).join(", ") : "turnstile access control projects";
  const features = details.keyFeatures.length ? details.keyFeatures.slice(0, 3).map((x) => x.replace(/\.$/, "")).join(", ") : product.tags.join(", ");

  return [
    `${product.title} is commonly selected for ${useCases}.`,
    `${product.subtitle}`,
    `Key planning focus includes ${features}.`,
    "Final configuration depends on lane width, people flow, access device choice, controller rules and site wiring requirements.",
    "We support selection, wiring, controller integration, software setup and commissioning support in Bangladesh.",
  ].join(" ");
}

export default async function TurnstileDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getTurnstileBySlug(slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const details = buildDetails(product);
  const featuredProducts = getRelatedTurnstileItems(turnstileCatalog, product, 3);
  const description = buildDescriptionParagraph(product, details);
  const featuredCards: TurnstileFeaturedCard[] = featuredProducts.map((p) => {
    const d = buildDetails(p);
    return { product: p, features: d.keyFeatures.slice(0, 4), bestFor: d.recommendedFor.slice(0, 3) };
  });

  return (
    <>
      <TurnstileProductDetailPage
        product={product}
        categoryLabel="Turnstile Gate System"
        categoryHref="/turnstile-gate/"
        backHref="/turnstile-gate/"
        backLabel="Back to Turnstile listing"
        wa={wa}
        detailedSpecs={details.specs}
        featuredCards={featuredCards}
        featuredHrefPrefix="/turnstile-gate"
        relatedLinks={[
          { href: "/turnstile-gate/", label: "Turnstile Gate System" },
          { href: "/services-support/", label: "Services" },
          { href: "/contact", label: "Request quotation" },
        ]}
        overview={details.overview}
        keyFeatures={details.keyFeatures}
        recommendedFor={details.recommendedFor}
        description={description}
      />

      <section className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-6">
        <div className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">FAQ</h2>
          <p className="mt-1 text-xs leading-6 text-slate-600">
            Quick answers before ordering a turnstile gate system item in Bangladesh.
          </p>
          <div className="mt-3">
            <FaqAccordion accent={BRAND.maroon} items={details.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
