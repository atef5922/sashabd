export type RentalInquiryProduct = { slug: string; title: string };
type RentalInquiryDetail = { key: string; label: string };

export type RentalInquiryContext = {
  projectType: "Rental LED Display";
  projectKey: string;
  packageInquiry: RentalInquiryDetail | null;
  modelInquiry: RentalInquiryDetail | null;
  eventInquiry: RentalInquiryDetail | null;
  serviceInquiry: RentalInquiryDetail | null;
  message: string;
};

// Accept only the project and context keys used by the existing rental CTAs.
const projects: readonly RentalInquiryDetail[] = [
  { key: "rental-led-display", label: "Rental LED Display" },
  { key: "complete-rental-led-package", label: "Complete Rental LED Package" },
  { key: "custom-rental-led-package", label: "Custom Rental LED Package" },
];

const packages: readonly RentalInquiryDetail[] = [
  { key: "small-indoor-event", label: "Small Indoor Event" },
  { key: "corporate-stage-package", label: "Corporate Stage Package" },
  { key: "concert-live-show-package", label: "Concert & Live Show" },
  { key: "wedding-led-wall-package", label: "Wedding LED Wall" },
  { key: "custom-large-event", label: "Custom Large Event" },
];

const events: readonly RentalInquiryDetail[] = [
  { key: "corporate-event", label: "Corporate Event" },
  { key: "concert-live-show", label: "Concert & Live Show" },
  { key: "wedding-event", label: "Wedding Event" },
  { key: "stage-backdrop", label: "Stage Backdrop" },
  { key: "exhibition-trade-show", label: "Exhibition & Trade Show" },
  { key: "outdoor-festival", label: "Outdoor & Festival" },
];

const services: readonly RentalInquiryDetail[] = [
  { key: "event-consultation", label: "Event Consultation" },
  { key: "event-planning", label: "Event Planning / BOQ" },
  { key: "rental-quotation", label: "Rental Quotation" },
  { key: "rental-consultation", label: "Rental Consultation" },
];

function findDetail(items: readonly RentalInquiryDetail[], value: string | null) {
  return items.find((item) => item.key === value?.trim()) ?? null;
}

export function resolveRentalInquiry(
  params: Pick<URLSearchParams, "get">,
  products: readonly RentalInquiryProduct[] = [],
): RentalInquiryContext | null {
  const project = findDetail(projects, params.get("project"));
  if (!project) return null;

  const packageInquiry = findDetail(packages, params.get("package"));
  const model = products.find((product) => product.slug === params.get("model")?.trim());
  const modelInquiry = model ? { key: model.slug, label: model.title } : null;
  const eventInquiry = findDetail(events, params.get("event"));
  const serviceInquiry = findDetail(services, params.get("service"));
  const lines = [
    `Project inquiry: ${project.label}`,
    packageInquiry ? `Package inquiry: ${packageInquiry.label}` : "",
    modelInquiry ? `Model inquiry: ${modelInquiry.label}` : "",
    eventInquiry ? `Event type: ${eventInquiry.label}` : "",
    serviceInquiry ? `Service inquiry: ${serviceInquiry.label}` : "",
  ].filter(Boolean);

  return {
    projectType: "Rental LED Display",
    projectKey: project.key,
    packageInquiry,
    modelInquiry,
    eventInquiry,
    serviceInquiry,
    message: `${lines.join("\n")}\n\nEvent date, venue/location, screen size, rental duration and setup/support requirements:`,
  };
}
