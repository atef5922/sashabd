import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import DisplayProductDetailPage from "@/components/products/DisplayProductDetailPage";
import ProductStructuredData from "@/components/products/ProductStructuredData";
import { siteConfig } from "@/lib/site";
import { getProductsByCategory, getRelatedProducts } from "@/lib/productsCatalog";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

const LEGACY_INDOOR_SLUGS = new Set<string>(["p4-indoor-led-display", "p5-indoor-led-display"]);

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  if (LEGACY_INDOOR_SLUGS.has(slug)) return { title: "Indoor LED Display Model" };
  const list = getProductsByCategory("indoor");
  const item = list.find((x) => x.slug === slug);
  if (!item) return { title: "Indoor LED Display Model" };
  const needsUniqueDescription = new Set([
    "p1-86-indoor-led-display",
    "p2-indoor-led-display",
    "p3-076-indoor-led-display",
  ]).has(slug);

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      needsUniqueDescription ? `${item.title}. ${item.subtitle}` : item.subtitle,
      "Indoor LED module specifications, recommended viewing use-cases, and installation support in Bangladesh."
    ),
    path: `/led-display/indoor-led/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | ${BRAND_NAME}`,
    index: true,
  });
}

export async function generateStaticParams() {
  return getProductsByCategory("indoor").map((x) => ({ slug: x.slug }));
}

export default async function IndoorProductDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (LEGACY_INDOOR_SLUGS.has(slug)) permanentRedirect("/led-display/indoor-led/");
  const indoorCatalog = getProductsByCategory("indoor");
  const product = indoorCatalog.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = getRelatedProducts(indoorCatalog, product.slug, 3);
  const detailedSpecs =
    product.slug === "p1-25-indoor-led-display"
      ? [
          { k: "Pixel Pitch", v: "P1.25 (1.25mm)" },
          { k: "LED Type", v: "SMD1010" },
          { k: "Module Resolution (W×H)", v: "256×128 = 32,768 pixels" },
          { k: "Pixel Density", v: "640,000 dots/m²" },
          { k: "Module Size (W×H×D)", v: "320mm × 160mm × 16.6mm" },
          { k: "Module Weight", v: "0.48 ± 0.02kg" },
          { k: "HUB Type", v: "HUB320" },
          { k: "Single-dot Brightness Calibration", v: "Support" },
          { k: "Brightness", v: "500 cd/m²" },
          { k: "Color Temperature", v: "2000K - 9300K adjustable" },
          { k: "Viewing Angle (H/V)", v: "140° / 140°" },
          { k: "Brightness / Color Uniformity", v: "≥98%" },
          { k: "Contrast Ratio", v: "5000:1" },
          { k: "Max Power Consumption", v: "586 W/m²" },
          { k: "Typical Power Consumption", v: "176 W/m²" },
          { k: "Input Voltage", v: "AC90-132V / AC186-264V, 47-63Hz" },
          { k: "Frame Frequency", v: "60Hz" },
          { k: "Refresh Rate", v: "3840Hz (standard), 7680Hz (optional)" },
          { k: "Processing Depth", v: "12-14bit" },
          { k: "Video Support", v: "2K, 4K" },
          { k: "Life Span", v: "100,000 hours" },
          { k: "Operating Temp / Humidity", v: "-20°C to 45°C / 10%-50% RH (no condensation)" },
          { k: "Storage Temp / Humidity", v: "-20°C to 50°C / 10%-60% RH (no condensation)" },
          { k: "Certifications", v: "BIS / CE / CB / ROHS / EAC" },
        ]
      : product.keySpecs;

  const overview =
    product.slug === "p1-25-indoor-led-display"
      ? "The P1.25 Indoor LED Display Module is a premium fine-pitch solution built for indoor environments where close-view clarity, stable color output, and long-term reliability are essential. With a 1.25mm pixel pitch, 256×128 module resolution, and 640,000 dots per square meter density, it is well suited for control rooms, studios, boardrooms, and executive video walls where text sharpness and visual precision matter. The module uses SMD1010 LEDs, supports single-dot brightness calibration, and delivers 500 cd/m² brightness with a 5000:1 contrast ratio for clean and balanced indoor presentation. Its 140° viewing angle, 12-14bit processing depth, and up to 7680Hz optional refresh rate help produce smooth visuals, strong grayscale, and camera-friendly performance. The 320×160mm lightweight module structure also helps reduce cabinet load during installation. With support for 2K and 4K video systems, adjustable color temperature, and dependable after-sales support, this module is a strong choice for premium indoor LED video wall projects in Bangladesh."
      : `${product.title} is designed for indoor communication where close-view clarity, stable color output, and reliable daily operation are important. Final selection should align with viewing distance, screen size, and content workflow.`;

  const pageOverview =
    product.slug === "p1-25-indoor-led-display"
      ? "The P1.25 Indoor LED Display Module is a premium fine-pitch solution for indoor spaces where close-view clarity, stable color performance, and dependable long-term operation are essential. With a 1.25mm pixel pitch, 256×128 module resolution, and 640,000 dots per square meter density, it delivers sharp text, detailed images, and smooth visual output for control rooms, studios, boardrooms, and executive video walls. The module uses SMD1010 LEDs and supports single-dot brightness calibration for better uniformity across the screen. It provides 500 cd/m² brightness, a 5000:1 contrast ratio, and a wide 140° viewing angle for balanced indoor visibility. Its 12-14bit processing depth and up to 7680Hz optional refresh rate help create strong grayscale, cleaner motion, and camera-friendly presentation quality. The lightweight 320×160mm module structure helps reduce cabinet load during installation, while support for 2K and 4K video systems adds flexibility for premium display projects. For clients in Bangladesh, this module is a strong choice for high-end indoor LED video walls that need clean visuals, reliable performance, and professional after-sales support."
      : overview;

  return (
    <>
      <ProductStructuredData
        product={product}
        categoryLabel="Indoor"
        path={`/led-display/indoor-led/${product.slug}/`}
      />
      <DisplayProductDetailPage
      product={product}
      categoryLabel="Indoor"
      categoryHref="/led-display/indoor-led/"
      backHref="/led-display/indoor-led/"
      backLabel="Back to Indoor Models"
      wa={wa}
      detailedSpecs={detailedSpecs}
      featuredProducts={featuredProducts}
      featuredHrefPrefix="/led-display/indoor-led/"
      relatedLinks={[
        { href: "/led-display/", label: "LED Display" },
        { href: "/led-display/indoor-led/", label: "Indoor category" },
        { href: "/contact/", label: "BOQ quotation" },
        { href: "/services-support/", label: "Installation & maintenance" },
      ]}
        overview={pageOverview}
      />
    </>
  );
}
