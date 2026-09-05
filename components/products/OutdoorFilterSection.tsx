"use client";

import type { LedAccessoryProduct, ProductItem } from "../../lib/productsCatalog";
import IndoorFilterSection from "./IndoorFilterSection";

export default function OutdoorFilterSection({
  all,
  showFilter = true,
  stickyCards = [],
}: {
  all: ProductItem[];
  showFilter?: boolean;
  stickyCards?: LedAccessoryProduct[];
}) {
  return <IndoorFilterSection all={all} showFilter={showFilter} stickyCards={stickyCards} variant="outdoor" />;
}
