import type { Metadata } from "next";
import {
  IndoorLedVideoWallBangladeshContent,
  canonicalMetadata,
} from "../indoor-led-video-wall/page";

export const metadata: Metadata = {
  ...canonicalMetadata,
  alternates: { canonical: "/led-display/indoor-led-video-wall-bangladesh/" },
  robots: { index: true, follow: true },
  openGraph: {
    ...canonicalMetadata.openGraph,
    url: "/led-display/indoor-led-video-wall-bangladesh/",
  },
};

export default IndoorLedVideoWallBangladeshContent;
