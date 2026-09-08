export type InteractiveFlatPanelBrand = "LG" | "Samsung" | "Newline" | "iScreen" | "iBoard";

export type InteractiveFlatPanelSize = 65 | 75 | 86 | 96 | 98 | 110;

export type InteractiveFlatPanelItem = {
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  tags: string[];
  image: string;
  brand: InteractiveFlatPanelBrand;
  sizeInch: InteractiveFlatPanelSize;
};

export function getInteractiveFlatPanelBullets(item: InteractiveFlatPanelItem): string[] {
  const sizeLine =
    item.sizeInch <= 65
      ? "Best for compact rooms and huddle spaces"
      : item.sizeInch <= 86
        ? "Balanced choice for classroom and training"
        : "Large venue option for deep seating rooms";
  const workflow =
    item.sizeInch >= 86 ? "Comfortable multi-user collaboration space" : "Quick annotation and screen sharing workflow";

  return [
    `${item.sizeInch}" 4K UHD interactive display (typical)`,
    "Multi-touch writing for teaching and collaboration (model dependent)",
    "Android built-in with OPS PC option for Windows workflow",
    sizeLine,
    workflow,
  ].slice(0, 4);
}

export function getInteractiveFlatPanelChips(item: InteractiveFlatPanelItem): string[] {
  if (item.sizeInch <= 65) return ["Meeting room", "Training", "Small class"];
  if (item.sizeInch <= 86) return ["Classroom", "Coaching", "Boardroom"];
  return ["Auditorium", "Large hall", "Premium boardroom"];
}

export function getInteractiveFlatPanelBrandLabel(brand: InteractiveFlatPanelBrand): string {
  switch (brand) {
    case "LG":
      return "LG";
    case "Samsung":
      return "Samsung";
    case "Newline":
      return "Newline";
    case "iScreen":
      return "iScreen";
    case "iBoard":
      return "iBoard";
    default:
      return "IFP";
  }
}

export const interactiveFlatPanelCatalog: InteractiveFlatPanelItem[] = [
  {
    slug: "lg-createboard-65in-4k-touch-classroom",
    title: "LG 65-inch Interactive Flat Panel – CreateBoard TR3DK Series",
    subtitle: "Compact smart display for meetings, trainings and smaller classrooms with smooth touch writing and screen sharing.",
    priceLabel: "On request (supply + installation)",
    tags: ["LG", "65-inch", "4K UHD", "Multi-touch", "Android", "OPS-ready"],
    image: "/assets/control-systems/interactive-flat-panel/products/LG-65-inch-Interactive.webp",
    brand: "LG",
    sizeInch: 65,
  },
  {
    slug: "lg-createboard-75in-4k-smart-classroom",
    title: "LG 75-inch Interactive Flat Panel – CreateBoard TR3DK Series",
    subtitle: "Balanced size for day-to-day classroom teaching and training rooms where back-row visibility matters.",
    priceLabel: "On request (project-based)",
    tags: ["LG", "75-inch", "4K", "Touch", "Wireless sharing"],
    image: "/assets/control-systems/interactive-flat-panel/products/LG-75-inch-Interactive.webp",
    brand: "LG",
    sizeInch: 75,
  },
  {
    slug: "lg-createboard-86in-4k-collaboration-display",
    title: "LG 86-inch Interactive Flat Panel – CreateBoard TR3DK Series",
    subtitle: "Large format IFP choice for coaching centers, lecture rooms and boardrooms with wide viewing angle and clear annotation.",
    priceLabel: "On request (per unit)",
    tags: ["LG", "86-inch", "4K", "40-point touch (model dependent)", "OPS optional"],
    image: "/assets/control-systems/interactive-flat-panel/products/LG-86-inch-Interactive.webp",
    brand: "LG",
    sizeInch: 86,
  },
  {
    slug: "lg-ultra-96in-4k-interactive-board",
    title: "LG 96-inch Interactive Flat Panel – CreateBoard Ultra Series",
    subtitle: "Extra-large panel recommended for bigger venues where content needs to stay readable from longer distances.",
    priceLabel: "On request (package)",
    tags: ["LG", "96-inch", "Large venue", "4K", "Anti-glare (model dependent)"],
    image: "/assets/control-systems/interactive-flat-panel/products/LG-96-inch-Interactive.webp",
    brand: "LG",
    sizeInch: 96,
  },
  {
    slug: "lg-ultra-110in-4k-flagship-interactive-panel",
    title: "LG 110-inch Interactive Flat Panel – CreateBoard Ultra Series",
    subtitle: "Maximum-impact interactive display for auditoriums and premium boardrooms when screen presence is a priority.",
    priceLabel: "On request (project-based)",
    tags: ["LG", "110-inch", "Large venue", "4K UHD", "Touch"],
    image: "/assets/control-systems/interactive-flat-panel/products/LG-110-inch-Interactive.webp",
    brand: "LG",
    sizeInch: 110,
  },

  {
    slug: "samsung-flip-65in-4k-interactive-panel",
    title: "Samsung 65-inch Interactive Flat Panel – Flip Pro Series",
    subtitle: "Business-friendly interactive display for writing, presenting and quick content sharing in smaller rooms.",
    priceLabel: "On request (supply + setup)",
    tags: ["Samsung", "65-inch", "4K", "Annotation", "Screen casting"],
    image: "/assets/control-systems/interactive-flat-panel/products/Samsung-65-inch-Interactive.webp",
    brand: "Samsung",
    sizeInch: 65,
  },
  {
    slug: "samsung-flip-75in-4k-smart-teaching-display",
    title: "Samsung 75-inch Interactive Flat Panel – Flip Pro Series",
    subtitle: "Popular classroom size that supports smooth touch interaction and a clean teaching workflow.",
    priceLabel: "On request (project-based)",
    tags: ["Samsung", "75-inch", "4K UHD", "Anti-glare", "Touch writing"],
    image: "/assets/control-systems/interactive-flat-panel/products/Samsung-75-inch-Interactive.webp",
    brand: "Samsung",
    sizeInch: 75,
  },
  {
    slug: "samsung-86in-4k-interactive-classroom-board",
    title: "Samsung 86-inch Interactive Flat Panel – Flip Pro WMB",
    subtitle: "Large interactive board option for bigger classrooms and trainings where multiple users collaborate on-screen.",
    priceLabel: "On request (per unit)",
    tags: ["Samsung", "86-inch", "4K", "Multi-touch", "Wireless sharing"],
    image: "/assets/control-systems/interactive-flat-panel/products/Samsung-86-inch-Interactive.webp",
    brand: "Samsung",
    sizeInch: 86,
  },

  {
    slug: "newline-65in-4k-android-interactive-panel",
    title: "Newline 65-inch Interactive Flat Panel – 4K Android",
    subtitle: "Value-focused interactive panel for meeting rooms, principal rooms and small training spaces.",
    priceLabel: "On request (package)",
    tags: ["Newline", "65-inch", "Android", "4K", "OPS support"],
    image: "/assets/control-systems/interactive-flat-panel/products/Newline-65-inch-Interactive.webp",
    brand: "Newline",
    sizeInch: 65,
  },
  {
    slug: "newline-75in-4k-touch-smartboard",
    title: "Newline 75-inch Interactive Flat Panel – 4K Android",
    subtitle: "Practical interactive board for schools and coaching centers with clear visuals and responsive writing.",
    priceLabel: "On request (project-based)",
    tags: ["Newline", "75-inch", "4K", "Touch", "Screen share"],
    image: "/assets/control-systems/interactive-flat-panel/products/Newline-75-inch-Interactive.webp",
    brand: "Newline",
    sizeInch: 75,
  },
  {
    slug: "newline-86in-4k-collaboration-panel",
    title: "Newline 86-inch Interactive Flat Panel – 4K UHD",
    subtitle: "Large format interactive panel for seminar rooms and training halls where audience seating is deeper.",
    priceLabel: "On request (per unit)",
    tags: ["Newline", "86-inch", "4K UHD", "Multi-touch", "OPS-ready"],
    image: "/assets/control-systems/interactive-flat-panel/products/Newline-86-inch-Interactive.webp",
    brand: "Newline",
    sizeInch: 86,
  },

  {
    slug: "iscreen-65in-4k-interactive-panel-android",
    title: "Ingscreen 65-inch Interactive Flat Panel – 4K Android",
    subtitle: "Budget-friendly interactive solution for coaching rooms and offices with strong day-to-day usability.",
    priceLabel: "On request (supply + setup)",
    tags: ["iScreen", "65-inch", "4K", "Android", "Touch"],
    image: "/assets/control-systems/interactive-flat-panel/products/Ingscreen-65-inch-Interactive.webp",
    brand: "iScreen",
    sizeInch: 65,
  },
  {
    slug: "iscreen-75in-4k-smart-classroom-panel",
    title: "Ingscreen 75-inch Interactive Flat Panel – Smart Teaching Display",
    subtitle: "Core classroom size option for schools and colleges where touch teaching and casting are needed.",
    priceLabel: "On request (project-based)",
    tags: ["iScreen", "75-inch", "4K UHD", "Multi-touch", "2×20W audio (model dependent)"],
    image: "/assets/control-systems/interactive-flat-panel/products/Ingscreen-75-inch-Interactive.webp",
    brand: "iScreen",
    sizeInch: 75,
  },
  {
    slug: "iscreen-86in-4k-interactive-board-ops-ready",
    title: "Ingscreen 86-inch Interactive Flat Panel – Android + OPS",
    subtitle: "Large display choice for bigger classrooms and training halls with improved readability and collaboration space.",
    priceLabel: "On request (per unit)",
    tags: ["iScreen", "86-inch", "4K", "OPS optional", "Multi-touch"],
    image: "/assets/control-systems/interactive-flat-panel/products/Ingscreen-86-inch-Interactive.webp",
    brand: "iScreen",
    sizeInch: 86,
  },

  {
    slug: "iboard-65in-4k-interactive-smart-panel",
    title: "iBoard 65-inch Interactive Flat Panel – 4K UHD",
    subtitle: "Compact interactive display for small rooms where budget and practicality are key.",
    priceLabel: "On request (package)",
    tags: ["iBoard", "65-inch", "4K", "Android", "Touch"],
    image: "/assets/control-systems/interactive-flat-panel/products/iBoard-65-inch-Interactive.webp",
    brand: "iBoard",
    sizeInch: 65,
  },
  {
    slug: "iboard-75in-4k-interactive-teaching-board",
    title: "iBoard 75-inch Interactive Flat Panel – Smart Board",
    subtitle: "Everyday teaching display for schools and coaching centers—good balance of size, cost and usability.",
    priceLabel: "On request (project-based)",
    tags: ["iBoard", "75-inch", "4K UHD", "Screen share", "Touch writing"],
    image: "/assets/control-systems/interactive-flat-panel/products/iBoard-75-inch-Interactive.webp",
    brand: "iBoard",
    sizeInch: 75,
  },
  {
    slug: "iboard-86in-4k-large-interactive-panel",
    title: "iBoard 86-inch Interactive Smart Panel – Android + OPS",
    subtitle: "Large classroom and seminar room panel option for collaborative teaching, training and annotation.",
    priceLabel: "On request (per unit)",
    tags: ["iBoard", "86-inch", "4K", "Multi-touch", "OPS-ready"],
    image: "/assets/control-systems/interactive-flat-panel/products/iBoard-86-inch-Interactive.webp",
    brand: "iBoard",
    sizeInch: 86,
  },
  {
    slug: "iboard-98in-4k-large-venue-interactive-panel",
    title: "iBoard 98-inch Interactive Flat Panel – Large Classroom Display",
    subtitle: "Big-screen interactive panel for larger halls and premium meeting spaces where screen impact matters.",
    priceLabel: "On request (project-based)",
    tags: ["iBoard", "98-inch", "Large venue", "4K UHD", "Touch"],
    image: "/assets/control-systems/interactive-flat-panel/products/iBoard-98-inch-Interactive.webp",
    brand: "iBoard",
    sizeInch: 98,
  },
];

export function getInteractiveFlatPanelBySlug(slug: string): InteractiveFlatPanelItem | undefined {
  return interactiveFlatPanelCatalog.find((x) => x.slug === slug);
}
