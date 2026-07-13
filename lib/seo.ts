import type { Metadata } from "next";
import { siteConfig } from "./site";
import { BRAND_NAME } from "./brand";

const DEFAULT_SOCIAL_IMAGE = "/images/hero.webp";

function getSiteBaseUrl(): string {
  const raw = `https://${siteConfig.domain}`.trim();
  return raw.replace(/\/+$/, "");
}

export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function absoluteUrl(path: string): string {
  const base = getSiteBaseUrl();
  const p = withTrailingSlash(path).replace(/^\/+/, "/");
  return `${base}${p}`;
}

export function socialImageUrl(path = DEFAULT_SOCIAL_IMAGE): string {
  if (path.startsWith("http")) return path;
  const base = getSiteBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function ensureMetaDescription(description: string, fallback?: string): string {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length >= 110 && normalized.length <= 160) {
    return normalized;
  }

  const fallbackText = (fallback ?? "").replace(/\s+/g, " ").trim();
  let combined = [normalized, fallbackText]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (combined.length < 110 && fallbackText) {
    const extension = ` Request BOQ, pricing, and installation support from ${BRAND_NAME}.`;
    combined = `${combined}${extension}`.replace(/\s+/g, " ").trim();
  }

  if (combined.length <= 160) {
    return combined;
  }

  return `${combined.slice(0, 157).trimEnd()}...`;
}

export function compactProductTitle(title: string): string {
  return title
    .replace("Outdoor LED Display Module", "Outdoor LED Module")
    .replace("Indoor LED Screen Module", "Indoor LED Module")
    .replace("Indoor LED Display Module", "Indoor LED Module")
    .replace("Rental LED Display", "Rental LED Screen")
    .replace("LED Display Power Supply", "LED Power Supply")
    .replace("LED Video Processor", "Video Processor")
    .trim();
}

export function compactBlogTitle(title: string): string {
  const normalized = title.replace(/\s+/g, " ").trim();
  if (normalized.length <= 60) {
    return normalized;
  }

  return `${normalized.slice(0, 57).trimEnd()}...`;
}

type ProductMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  openGraphTitle?: string;
  openGraphType?: "article" | "website";
  index?: boolean;
};

export function buildProductMetadata({
  title,
  description,
  path,
  image,
  openGraphTitle,
  openGraphType = "article",
  index = true,
}: ProductMetadataInput): Metadata {
  const canonical = withTrailingSlash(path);
  const finalDescription = ensureMetaDescription(
    description,
    "Specification, use-case guidance, installation planning, and professional support in Bangladesh."
  );
  const finalTitle = compactProductTitle(title);
  const imageUrl = socialImageUrl(image);

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical },
    robots: {
      index,
      follow: true,
    },
    openGraph: {
      title: openGraphTitle ?? finalTitle,
      description: finalDescription,
      url: canonical,
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle ?? finalTitle,
      description: finalDescription,
      images: [imageUrl],
    },
  };
}
