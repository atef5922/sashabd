import type { Metadata } from "next";
import ProductsPage from "@/modules/routes/catalog/products-page";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_TITLE = `LED Display Price in Bangladesh ${CURRENT_YEAR} | Sasha Corporation`;
const PAGE_DESCRIPTION =
  `Compare ${CURRENT_YEAR} LED display prices in Bangladesh for indoor, outdoor, and rental screens. Review specifications, installation guidance, and request a quotation.`;
const SOCIAL_IMAGE = "/assets/led-display/led-display-social-preview.webp";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/led-display/" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/led-display/",
    type: "website",
    siteName: BRAND_NAME,
    images: [
      {
        url: socialImageUrl(SOCIAL_IMAGE),
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    card: "summary_large_image",
    images: [socialImageUrl(SOCIAL_IMAGE)],
  },
};

const collectionPageSchema = {
  "@type": "CollectionPage",
  name: PAGE_TITLE,
  url: "https://sashabd.com/led-display/",
  description: PAGE_DESCRIPTION,
  isPartOf: {
    "@type": "WebSite",
    name: BRAND_NAME,
    url: "https://sashabd.com/",
  },
  about: [
    { "@type": "Thing", name: "Indoor LED Display" },
    { "@type": "Thing", name: "Outdoor LED Display" },
    { "@type": "Thing", name: "Rental LED Display" },
  ],
};

export default function LedDisplayPage() {
  return (
    <>
      <ProductsPage currentYear={CURRENT_YEAR} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [collectionPageSchema] }) }}
      />
    </>
  );
}
