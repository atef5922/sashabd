import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/pa-system/",
  },
};

export default function LegacyPaSystemPage() {
  permanentRedirect("/pa-system/");
}

