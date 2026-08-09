import type { ProductItem } from "@/lib/productsCatalog";
import { buildProductStructuredData } from "@/lib/productStructuredData";

export default function ProductStructuredData({
  product,
  categoryLabel,
  path,
}: {
  product: ProductItem;
  categoryLabel: string;
  path: string;
}) {
  const structuredData = buildProductStructuredData({ product, categoryLabel, path });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
