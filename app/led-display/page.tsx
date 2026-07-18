import type { Metadata } from "next";
import ProductsPage from "@/modules/routes/catalog/products-page";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

const PAGE_TITLE = "LED Display Price in Bangladesh 2026";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description:
    "LED Display Price in Bangladesh. Explore Indoor LED Display, Outdoor LED Billboard, LED Video Wall, Digital LED Signage, Rental LED Screen & Professional Installation Solutions.",
  alternates: { canonical: "/led-display/" },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "LED Display Price in Bangladesh. Explore Indoor LED Display, Outdoor LED Billboard, LED Video Wall, Digital LED Signage, Rental LED Screen & Professional Installation Solutions.",
    url: "/led-display/",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    title: PAGE_TITLE,
    description:
      "LED Display Price in Bangladesh. Explore Indoor LED Display, Outdoor LED Billboard, LED Video Wall, Digital LED Signage, Rental LED Screen & Professional Installation Solutions.",
    card: "summary_large_image",
    images: [socialImageUrl()],
  },
};

const collectionPageSchema = {
  "@type": "CollectionPage",
  name: PAGE_TITLE,
  url: "https://sashabd.com/led-display/",
  description:
    "LED Display Price in Bangladesh. Explore Indoor LED Display, Outdoor LED Billboard, LED Video Wall, Digital LED Signage, Rental LED Screen & Professional Installation Solutions.",
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
      <ProductsPage />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [collectionPageSchema] }) }}
      />
    </>
  );
}
