import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";
import { isVercelStagingBuild } from "@/lib/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isVercelStagingBuild()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cdn-cgi/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.domain,
  };
}
