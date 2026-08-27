import { conferencePackages } from "./conferencePackages";

export type ConferenceInquiryProduct = {
  slug: string;
  name: string;
  model?: string;
};

export type ConferencePackageInquiry = {
  key: string;
  label: string;
};

export type ConferenceRoomSizeInquiry = {
  key: string;
  label: string;
};

export type ConferenceInquiryContext = {
  projectType: "" | "Conference System" | "Hybrid / Video Meeting Room";
  projectKey: string;
  products: ConferenceInquiryProduct[];
  packageInquiry: ConferencePackageInquiry | null;
  roomSizeInquiry: ConferenceRoomSizeInquiry | null;
  message: string;
};

export const CONFERENCE_ENGINEER_WHATSAPP_MESSAGE =
  "Hello Sasha Corporation, I need help designing a conference/meeting room system.";

const mainPagePackageInquiries: readonly ConferencePackageInquiry[] = [
  { key: "10-person-boardroom", label: "10 Person Conference System Package" },
  { key: "20-person-meeting-room", label: "20 Person Conference System Package" },
  { key: "30-person-government", label: "30 Person Conference System Package" },
  { key: "50-plus-conference-hall", label: "50+ Person Conference System Package" },
];

export const conferencePackageInquiries: readonly ConferencePackageInquiry[] = [
  ...mainPagePackageInquiries,
  ...conferencePackages.map((packageItem) => ({
    key: packageItem.id,
    label: packageItem.name,
  })),
];

export const conferenceRoomSizeInquiries: readonly ConferenceRoomSizeInquiry[] = [
  { key: "6-12", label: "6–12 Participants / Small Boardroom" },
  { key: "12-30", label: "12–30 Participants / Medium Meeting Room" },
  { key: "30-50", label: "30–50 Participants / Large Conference Room" },
  { key: "50-plus", label: "50+ Participants / Conference Hall" },
];

function conferenceProductLabel(product: ConferenceInquiryProduct): string {
  return product.model && !product.name.toLocaleLowerCase("en").includes(product.model.toLocaleLowerCase("en"))
    ? `${product.name} (${product.model})`
    : product.name;
}

function findPackageInquiry(value: string): ConferencePackageInquiry | null {
  return conferencePackageInquiries.find((item) => item.key === value || item.label === value) ?? null;
}

export function resolveConferenceInquiry(
  params: Pick<URLSearchParams, "get">,
  conferenceProducts: readonly ConferenceInquiryProduct[],
): ConferenceInquiryContext {
  const requestedSlugs = [
    params.get("product") ?? "",
    ...(params.get("products") ?? "").split(","),
  ].map((slug) => slug.trim()).filter(Boolean);
  const productBySlug = new Map(conferenceProducts.map((product) => [product.slug, product]));
  const products = [...new Set(requestedSlugs)]
    .map((slug) => productBySlug.get(slug))
    .filter((product): product is ConferenceInquiryProduct => Boolean(product))
    .slice(0, 3);

  const requestedPackage = params.get("package")?.trim() ?? "";
  const packageInquiry = findPackageInquiry(requestedPackage);
  const requestedRoomSize = params.get("room_size")?.trim() ?? "";
  const roomSizeInquiry = conferenceRoomSizeInquiries.find((item) => item.key === requestedRoomSize) ?? null;
  const requestedProject = params.get("project")?.trim() ?? "";
  const isHybridProject = requestedProject === "hybrid-conference-room" || requestedProject === "hybrid-meeting-room";
  const isConferenceProject = requestedProject === "conference-system";
  const hasConferenceContext = isConferenceProject || Boolean(products.length || packageInquiry || roomSizeInquiry);
  const projectType = isHybridProject
    ? "Hybrid / Video Meeting Room"
    : hasConferenceContext
      ? "Conference System"
      : "";

  const contextLines = [
    isHybridProject ? "Project inquiry: Hybrid / Video Meeting Room" : "",
    packageInquiry ? `Package inquiry: ${packageInquiry.label}` : "",
    products.length ? `Product inquiry: ${products.map(conferenceProductLabel).join(", ")}` : "",
    roomSizeInquiry ? `Room size / capacity: ${roomSizeInquiry.label}` : "",
  ].filter(Boolean);
  const prompt = isHybridProject
    ? "Room size, participant count, video platform, display and integration requirements:"
    : "Room size, participant count, quantity and installation requirements:";

  return {
    projectType,
    projectKey: isHybridProject ? "hybrid-conference-room" : hasConferenceContext ? "conference-system" : "",
    products,
    packageInquiry,
    roomSizeInquiry,
    message: contextLines.length ? `${contextLines.join("\n")}\n\n${prompt}` : "",
  };
}

export function getConferenceInquiryProductLabel(product: ConferenceInquiryProduct): string {
  return conferenceProductLabel(product);
}
