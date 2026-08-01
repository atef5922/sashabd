import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DisplayProductDetailPage from "@/components/products/DisplayProductDetailPage";
import { siteConfig } from "@/lib/site";
import { getRelatedProducts, rentalCatalog, type ProductItem } from "@/lib/productsCatalog";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

const EXTRA: ProductItem = {
  category: "rental",
  slug: "p3-91-rental-led-display",
  title: "P3.91 Rental LED Display",
  subtitle: "250x250mm rental LED module with SMD1921 lamp, 64x64 resolution, 4500 cd/m2 brightness, and 7680Hz refresh support.",
  image: "/images/rental/P3.91-Rental-LED-Display.webp",
  quickFeatures: ["250x250mm universal module", "4500 cd/m2 high brightness", "7680Hz high refresh", "500x500 / 500x1000 rental cabinet ready"],
  bestFor: ["Stage backdrop", "Wedding events", "Corporate programs", "Concert visuals"],
  keySpecs: [
    { k: "Pixel Pitch", v: "P3.91 (3.91mm)" },
    { k: "LED Type", v: "SMD1921" },
    { k: "Module Resolution", v: "64 x 64 = 4096 pixels" },
    { k: "Pixel Density", v: "68,267 dots/m2" },
    { k: "Module Size", v: "250 x 250 x 15.6 mm" },
    { k: "Module Weight", v: "0.49 +- 0.02 kg" },
    { k: "HUB Type", v: "HUB75" },
    { k: "Brightness", v: "4500 cd/m2" },
    { k: "Viewing Angle", v: "140 / 120 deg" },
    { k: "Refresh Rate", v: "7680Hz" },
    { k: "Video Support", v: "2K, 4K" },
  ],
  buildQuality: ["Bottom case texture design improves exterior texture", "New PCB board design for stronger reliability", "Waterproof and moisture-proof front-side gluing treatment"],
  controlSystem: ["Single-dot brightness calibration supported", "6500K color temperature with 1000K-9500K adjustable range", "Supports 2K / 4K playback with 12-14bit processing depth"],
  installationNotes: ["Suitable for 500x500mm and 500x1000mm rental cabinets", "Hanging or ground stacking with safety check", "Fast assembly, calibration, and pre-show testing recommended"],
  supportNotes: ["High brightness with strong heat dissipation for event duty", "Supports 7680Hz refresh for camera-friendly output", "Customized selection recommended for coastal, low-temperature, or high-humidity environments"],
  faqs: [
    {
      q: "Why is P3.91 commonly chosen for stage rental setups?",
      a: "P3.91 is widely used for rental stages because it offers practical viewing clarity, strong 4500 cd/m2 brightness, and a 250x250mm module format that works well with fast-setup rental cabinets.",
    },
  ],
};

const DATA: ProductItem[] = rentalCatalog.some((p) => p.slug === EXTRA.slug) ? rentalCatalog : [...rentalCatalog, EXTRA];

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = DATA.find((x) => x.slug === slug);
  if (!item) return { title: "Rental LED Display Model" };

  return buildProductMetadata({
    title: item.title,
    description: ensureMetaDescription(
      item.subtitle,
      "Rental LED screen specifications, event-use guidance, installation planning, and support in Bangladesh."
    ),
    path: `/led-display/rental-display/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | ${BRAND_NAME}`,
  });
}

export async function generateStaticParams() {
  return DATA.map((x) => ({ slug: x.slug }));
}

export default async function RentalProductDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = DATA.find((x) => x.slug === slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const featuredProducts = getRelatedProducts(DATA, product.slug, 3);
  const detailedSpecs = product.keySpecs;

  return (
    <DisplayProductDetailPage
      product={product}
      categoryLabel="Rental"
      categoryHref="/led-display/rental-display/"
      backHref="/led-display/rental-display/"
      backLabel="Back to Rental Models"
      wa={wa}
      detailedSpecs={detailedSpecs}
      featuredProducts={featuredProducts}
      featuredHrefPrefix="/led-display/rental-display/"
      relatedLinks={[
        { href: "/led-display/", label: "LED Display" },
        { href: "/led-display/rental-display/", label: "Rental category" },
        { href: "/contact/", label: "BOQ quotation" },
        { href: "/services-support/", label: "Installation & maintenance" },
      ]}
      overview={`${product.title} is optimized for rental stage and event deployment where quick assembly, stable playback, and easy serviceability are required. Final setup should align with venue dimensions, rigging method, and power safety.`}
    />
  );
}
