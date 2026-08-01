import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/services-support/",
  },
};

export default function LegacyServicesRedirectPage() {
  permanentRedirect("/services-support/");
}
