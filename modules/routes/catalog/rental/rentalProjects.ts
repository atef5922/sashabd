export type RentalProjectFact = {
  icon: "location" | "pitch" | "screen" | "processor" | "rigging" | "support" | "time";
  label: string;
  value: string;
};

export type RentalProjectPreview = {
  id: string;
  title: string;
  eventType: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  description: string;
  facts: readonly RentalProjectFact[];
  isSample: boolean;
  enquiryHref: string;
  caseStudyHref?: string;
};

/**
 * Temporary, illustrative setups — NOT verified Sasha Corporation projects.
 * Replace each image, description and fact with approved real project data.
 * Then set isSample to false and supply that project's real caseStudyHref.
 * Keep these sample records separate from app/projects/projectData.ts.
 */
export const rentalProjectPreviews: readonly RentalProjectPreview[] = [
  {
    id: "corporate-conference",
    title: "Corporate Conference LED Setup",
    eventType: "Corporate Event",
    image: "/images/rental/projects/sample-corporate-led.webp",
    imageAlt: "AI-generated sample corporate conference stage with a blue LED presentation wall",
    imagePosition: "center 52%",
    description: "A sample conference LED setup for presentations, brand visuals and a clear audience viewing experience.",
    facts: [
      { icon: "location", label: "Venue", value: "Indoor conference venue" },
      { icon: "pitch", label: "Pixel Pitch", value: "P2.6" },
      { icon: "screen", label: "Screen Size", value: "40 ft × 10 ft (main screen)" },
      { icon: "processor", label: "Processor", value: "NovaStar" },
      { icon: "support", label: "Support", value: "Setup, operation & technical support" },
    ],
    isSample: true,
    enquiryHref: "/contact/?project=rental-led-display&event=corporate-event",
  },
  {
    id: "concert-stage",
    title: "Concert Stage LED Wall",
    eventType: "Concert Event",
    image: "/images/rental/projects/sample-concert-led.webp",
    imageAlt: "AI-generated sample concert stage with LED walls, blue lighting and an audience",
    imagePosition: "center 54%",
    description: "A sample concert stage with a main LED wall and side screens for live camera feeds and vibrant visuals.",
    facts: [
      { icon: "location", label: "Venue", value: "Outdoor concert venue" },
      { icon: "screen", label: "Screen", value: "40 ft × 16 ft + side screens" },
      { icon: "pitch", label: "Pixel Pitch", value: "P3.91" },
      { icon: "rigging", label: "Setup", value: "Hanging with truss structure" },
      { icon: "support", label: "Support", value: "Live camera, operator & technical team" },
    ],
    isSample: true,
    enquiryHref: "/contact/?project=rental-led-display&event=concert-live-show",
  },
  {
    id: "wedding-backdrop",
    title: "Wedding LED Backdrop Installation",
    eventType: "Wedding Event",
    image: "/images/rental/projects/sample-wedding-led.webp",
    imageAlt: "AI-generated sample wedding stage with a pink LED backdrop, flowers and warm lighting",
    imagePosition: "center 52%",
    description: "A sample wedding LED backdrop combining floral stage styling with personalized celebration visuals.",
    facts: [
      { icon: "location", label: "Venue", value: "Indoor wedding reception" },
      { icon: "pitch", label: "Pixel Pitch", value: "P2.6" },
      { icon: "screen", label: "Screen Size", value: "24 ft × 10 ft" },
      { icon: "time", label: "Setup Time", value: "Venue-dependent" },
      { icon: "support", label: "Support", value: "Setup, content playback & operator" },
    ],
    isSample: true,
    enquiryHref: "/contact/?project=rental-led-display&event=wedding-event",
  },
];
