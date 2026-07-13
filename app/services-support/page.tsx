import type { Metadata } from "next";
import { absoluteUrl, socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: { absolute: "Our Services and Support | Sasha Corporation" },
  description:
    "End-to-end LED display services in Bangladesh: consultation, site survey, installation, calibration, maintenance, and after-sales support.",
  alternates: { canonical: absoluteUrl("/services-support/") },
  openGraph: {
    title: "Our Services and Support",
    description:
      `LED display consultation, installation, calibration and maintenance support across Bangladesh by ${BRAND_NAME}.`,
    url: absoluteUrl("/services-support/"),
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: "Our Services and Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services and Support",
    description:
      `LED display consultation, installation, calibration and maintenance support across Bangladesh by ${BRAND_NAME}.`,
    images: [socialImageUrl()],
  },
};

export { default } from "@/modules/routes/services/page";
