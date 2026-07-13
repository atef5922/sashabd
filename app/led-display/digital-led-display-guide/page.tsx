import type { Metadata } from "next";
import {
  DigitalLedDisplayGuideContent,
  canonicalMetadata,
} from "../digital-led-display/page";

export const metadata: Metadata = {
  ...canonicalMetadata,
  alternates: { canonical: "/led-display/digital-led-display-guide/" },
  robots: { index: true, follow: true },
  openGraph: {
    ...canonicalMetadata.openGraph,
    url: "/led-display/digital-led-display-guide/",
  },
};

export default DigitalLedDisplayGuideContent;
