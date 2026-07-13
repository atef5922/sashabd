import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  controllerCatalog,
  indoorCatalog,
  outdoorCatalog,
  powerSupplyCatalog,
  receivingCardCatalog,
  rentalCatalog,
  ledAccessoriesCatalog,
} from "@/lib/productsCatalog";
import { blogPosts } from "@/lib/blogPosts";
import { paSystemCatalog } from "@/modules/routes/catalog/control-systems/pa-system/catalog";
import { turnstileCatalog } from "@/modules/routes/catalog/control-systems/turnstile-gate-system/catalog";
import { digitalPodiumCatalog } from "@/modules/routes/catalog/control-systems/digital-podium/catalog";
import { interactiveFlatPanelCatalog } from "@/modules/routes/catalog/control-systems/interactive-flat-panel/catalog";
import { conferenceSystemCatalog } from "./conference-system/catalog";

export const dynamic = "force-static";

function baseUrl(): string {
  return `https://${siteConfig.domain}`.replace(/\/+$/, "");
}

function abs(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl()}${p}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/led-display/"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: abs("/led-display/billboard-led-display/"), lastModified: now, changeFrequency: "weekly", priority: 0.86 },
    { url: abs("/led-display/indoor-led-video-wall-bangladesh/"), lastModified: now, changeFrequency: "weekly", priority: 0.86 },
    { url: abs("/led-display/waterproof-outdoor-led-display/"), lastModified: now, changeFrequency: "weekly", priority: 0.84 },
    { url: abs("/led-display/rent-guide/"), lastModified: now, changeFrequency: "weekly", priority: 0.84 },
    { url: abs("/led-display/indoor-led/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: abs("/led-display/outdoor/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: abs("/led-display/rental-display/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: abs("/led-display/accessories/"), lastModified: now, changeFrequency: "weekly", priority: 0.88 },
    { url: abs("/led-display/accessories/receiving-card/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/led-display/accessories/controller/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/led-display/accessories/power-supply/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/led-display/accessories/led-accessories/"), lastModified: now, changeFrequency: "weekly", priority: 0.78 },

    { url: abs("/interactive-flat-panel/"), lastModified: now, changeFrequency: "weekly", priority: 0.76 },
    { url: abs("/pa-system/"), lastModified: now, changeFrequency: "weekly", priority: 0.76 },
    { url: abs("/conference-system/"), lastModified: now, changeFrequency: "weekly", priority: 0.76 },
    { url: abs("/turnstile-gate/"), lastModified: now, changeFrequency: "weekly", priority: 0.76 },
    { url: abs("/digital-podium/"), lastModified: now, changeFrequency: "weekly", priority: 0.74 },

    { url: abs("/services-support/"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/about/"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: abs("/about/message-from-founder/"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: abs("/contact/"), lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: abs("/projects/"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: abs("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/privacy/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: abs("/terms/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: abs("/return-policy/"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productRoutes: MetadataRoute.Sitemap = [
    ...indoorCatalog.map((p) => ({
      url: abs(`/led-display/indoor-led/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...outdoorCatalog.map((p) => ({
      url: abs(`/led-display/outdoor/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...rentalCatalog.map((p) => ({
      url: abs(`/led-display/rental-display/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...receivingCardCatalog.map((p) => ({
      url: abs(`/led-display/accessories/receiving-card/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...controllerCatalog.map((p) => ({
      url: abs(`/led-display/accessories/controller/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...powerSupplyCatalog.map((p) => ({
      url: abs(`/led-display/accessories/power-supply/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...ledAccessoriesCatalog.map((p) => ({
      url: abs(`/led-display/accessories/led-accessories/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...paSystemCatalog.map((p) => ({
      url: abs(`/pa-system/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...conferenceSystemCatalog.map((p) => ({
      url: abs(`/conference-system/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...turnstileCatalog.map((p) => ({
      url: abs(`/turnstile-gate/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...digitalPodiumCatalog.map((p) => ({
      url: abs(`/digital-podium/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
    ...interactiveFlatPanelCatalog.map((p) => ({
      url: abs(`/interactive-flat-panel/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    })),
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: abs(`/blog/${post.slug}/`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.55,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
  ];

  const seen = new Set<string>();
  return allRoutes.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
