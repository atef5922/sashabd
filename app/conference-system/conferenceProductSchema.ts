export type ConferenceSchemaPrice =
  | { type: "fixed"; amount: number; currency: "BDT" }
  | { type: "range"; min: number; max: number; currency: "BDT" }
  | { type: "request"; currency: "BDT" };

export type ConferenceSchemaAvailability = "in-stock" | "project-order" | "contact" | undefined;

/**
 * Google requires a numeric price for an Offer. Indicative project ranges and
 * request-price records are not sellable offers, so they intentionally return
 * no offer markup. Project-order/contact are also not asserted as a preorder.
 */
export function buildConferenceProductOfferJsonLd(
  price: ConferenceSchemaPrice,
  availability: ConferenceSchemaAvailability,
  url: string,
  sellerName: string,
) {
  if (price.type !== "fixed" || !Number.isFinite(price.amount) || price.amount <= 0) return undefined;

  return {
    "@type": "Offer",
    priceCurrency: price.currency,
    price: price.amount,
    ...(availability === "in-stock" ? { availability: "https://schema.org/InStock" } : {}),
    url,
    seller: { "@type": "Organization", name: sellerName },
  };
}
