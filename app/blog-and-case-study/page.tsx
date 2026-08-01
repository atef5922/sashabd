import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/blog/",
  },
};

export default function LegacyBlogHubRedirectPage() {
  permanentRedirect("/blog/");
}
