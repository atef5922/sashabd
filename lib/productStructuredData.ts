import type { ProductItem } from "./productsCatalog";
import { absoluteUrl, getSiteBaseUrl } from "./seo";

type ProductStructuredDataInput = {
  product: ProductItem;
  categoryLabel: string;
  path: string;
};

export function buildProductStructuredData({
  product,
  categoryLabel,
  path,
}: ProductStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    url: absoluteUrl(path),
    image: new URL(product.image, `${getSiteBaseUrl()}/`).href,
    description: product.subtitle.replace(/\s+/g, " ").trim(),
    category: `${categoryLabel} LED Display`,
  };
}
