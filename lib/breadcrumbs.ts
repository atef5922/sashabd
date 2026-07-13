import { absoluteUrl } from "./seo";

export type BreadcrumbItem = {
  href: string;
  label: string;
  current?: boolean;
};

export function homeBreadcrumb(): BreadcrumbItem {
  return { href: "/", label: "Home" };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
