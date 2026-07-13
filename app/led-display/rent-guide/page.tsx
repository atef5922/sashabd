import type { Metadata } from "next";
import { RentGuideContent, canonicalMetadata } from "../led-screen-rent-in-bangladesh/page";

export const metadata: Metadata = {
  ...canonicalMetadata,
  alternates: { canonical: "/led-display/rent-guide/" },
  robots: { index: true, follow: true },
  openGraph: {
    ...canonicalMetadata.openGraph,
    url: "/led-display/rent-guide/",
  },
};

export default RentGuideContent;
