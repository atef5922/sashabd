import type { ConferenceProductCardData } from "./ConferenceProductCard";
import type { ConferenceDiscoveryPrice } from "./conferenceDiscovery";

export type ConferenceExplorerProduct = ConferenceProductCardData & {
  model?: string;
  searchText: string;
  brandSlug: string | null;
  productTypes: string[];
  connection: string | null;
  meetingType: string | null;
  systemTypes: string[];
  availability: string | null;
  priceValue: ConferenceDiscoveryPrice;
};

export type ConferenceExplorerFacet = { slug: string; label: string; count: number };
