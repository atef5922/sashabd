import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${siteConfig.domain}`.replace(/\/+$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cdn-cgi/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: siteConfig.domain,
  };
}
