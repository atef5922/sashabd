import type { Metadata } from "next";
import { RentGuideContent, canonicalMetadata } from "../led-screen-rent-in-bangladesh/page";
import { getIndexableRobots } from "@/lib/deployment";

export const metadata: Metadata = {
  ...canonicalMetadata,
  alternates: { canonical: "/led-display/rent-guide/" },
  robots: getIndexableRobots(),
  openGraph: {
    ...canonicalMetadata.openGraph,
    url: "/led-display/rent-guide/",
  },
};

export default RentGuideContent;
