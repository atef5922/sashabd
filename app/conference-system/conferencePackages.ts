export type ConferencePackage = {
  id: string;
  label: string;
  name: string;
  subtitle: string;
  image: { src: string; alt: string };
  price: string;
  items: readonly string[];
  capacity: string;
  systemType: string;
  ctaLabel: string;
  featured?: boolean;
};

export const conferencePackages: readonly ConferencePackage[] = [
  {
    id: "essential-8-person",
    label: "ESSENTIAL",
    name: "8 Person Conference System Package",
    subtitle: "Small Meeting Room",
    image: {
      src: "/images/complete package/package1.jpg",
      alt: "8 person complete conference system package for small meeting room",
    },
    price: "৳199,000 – ৳229,000",
    items: [
      "1 × Chairman Unit",
      "7 × Delegate Units",
      "1 × Digital Central Controller",
      "Conference Cable & Accessories",
      "Audio Integration",
      "Installation & Configuration",
      "Testing & User Orientation",
    ],
    capacity: "1 Chairman + 7 Delegates",
    systemType: "Wired Digital Conference System",
    ctaLabel: "Get Package BOQ",
  },
  {
    id: "professional-12-person",
    label: "PROFESSIONAL",
    name: "12 Person Conference System Package",
    subtitle: "Corporate Boardroom",
    image: {
      src: "/images/complete package/package2.png",
      alt: "12 person complete conference system package for corporate boardroom",
    },
    price: "৳449,000 – ৳499,000",
    items: [
      "1 × Chairman Unit",
      "11 × Delegate Units",
      "1 × Digital Central Controller",
      "1 × Digital Audio DSP Processor",
      "1 × Professional Amplifier",
      "2 × Conference Speakers",
      "System Cabling & Connectors",
      "Installation & Configuration",
      "Testing & Commissioning",
    ],
    capacity: "1 Chairman + 11 Delegates",
    systemType: "Digital Conference System with DSP Audio",
    ctaLabel: "Get Package BOQ",
    featured: true,
  },
  {
    id: "executive-20-person",
    label: "EXECUTIVE",
    name: "20 Person Conference System Package",
    subtitle: "Large Boardroom / Conference Hall",
    image: {
      src: "/images/complete package/package3.jpg",
      alt: "20 person complete conference system package for large conference hall",
    },
    price: "৳649,000 – ৳749,000",
    items: [
      "1 × Chairman Unit",
      "19 × Delegate Units",
      "1 × Digital Central Controller",
      "1 × Digital Audio DSP Processor",
      "1 × Professional Amplifier",
      "4 × Professional Speakers",
      "1 × Equipment Rack",
      "Conference System Cabling",
      "Audio & Power Accessories",
      "Professional Installation",
      "Configuration & Calibration",
      "Testing & Commissioning",
    ],
    capacity: "1 Chairman + 19 Delegates",
    systemType: "Professional Digital Conference System",
    ctaLabel: "Get Package BOQ",
  },
];
