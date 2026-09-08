export type ProjectCategory = "conference-system" | "led-display";

export type ProjectDetail = {
  projectName: string;
  h1: string;
  projectType: string;
  overview: readonly string[];
  requirement: readonly string[];
  solution: readonly string[];
  systemDetails: readonly { label: string; value: string }[];
  systemComponents: readonly string[];
  scopeOfWork: readonly string[];
  results: readonly string[];
  ctaHeading?: string;
};

export type Project = {
  id: string;
  slug?: string;
  category?: ProjectCategory;
  categoryLabel?: string;
  title: string;
  badge: string;
  image?: string;
  imageAlt?: string;
  imageFit?: "cover" | "contain";
  imageClassName?: string;
  imagePosition?: string;
  organization: string;
  location: string;
  year: string;
  completed?: string;
  completedIso?: string;
  capacity?: string;
  systemType?: string;
  subtitle?: string;
  cardDescription?: string;
  scopeLabel: string;
  scope: string;
  highlights: readonly string[];
  meta: readonly { k: string; v: string }[];
  tags: readonly string[];
  caseStudyHref?: string;
  isTemplate?: boolean;
  seo?: {
    title: string;
    description: string;
  };
  detail?: ProjectDetail;
};

/**
 * Canonical source for business-verified, publishable projects.
 * Project listing cards, Conference System cards, detail pages and sitemap
 * entries all derive from these records.
 */
export const projects: readonly Project[] = [
  {
    id: "national-library-p2-5-indoor-led-display-dhaka",
    category: "led-display",
    categoryLabel: "LED Display",
    title: "P2.5 Indoor LED Display — National Library, Dhaka",
    badge: "Completed project",
    image: "/assets/projects/led-display/National Library/IMG_20260521_000347272_HDR_AE.webp",
    imageAlt: "P2.5 Lampro indoor LED display project at the National Library in Dhaka",
    imageClassName: "object-cover",
    imagePosition: "center 62%",
    organization: "National Library",
    location: "Agargaon, Sher-e-Bangla Nagar, Dhaka-1207, Bangladesh",
    year: "2026",
    completed: "14 August 2026",
    completedIso: "2026-08-14",
    systemType: "P2.5 Indoor Full-Color LED Display Module",
    subtitle: "National Library • Agargaon, Dhaka • 14 August 2026",
    cardDescription: "P2.5 Lampro indoor full-color LED display project at the National Library in Dhaka.",
    scopeLabel: "Verified project record",
    scope: "P2.5 indoor full-color LED display project using Lampro display modules.",
    highlights: [
      "Client: National Library",
      "Display: P2.5 indoor full-color LED display module",
      "Brand: Lampro",
      "Completed: 14 August 2026",
    ],
    meta: [
      { k: "Display type", v: "P2.5 indoor full-color LED display" },
      { k: "Brand", v: "Lampro" },
      { k: "Location", v: "Agargaon, Dhaka" },
    ],
    tags: ["P2.5 Indoor LED", "Lampro", "Dhaka"],
  },
  {
    id: "varendra-university-p2-5-indoor-led-display-rajshahi",
    category: "led-display",
    categoryLabel: "LED Display",
    title: "P2.5 Indoor LED Display — Varendra University, Rajshahi",
    badge: "Completed project",
    image: "/assets/projects/led-display/varendra University/sasha_led_display_installation_room.webp",
    imageAlt: "P2.5 Lampro indoor LED display installation at Varendra University in Rajshahi",
    imageClassName: "object-cover",
    imagePosition: "center 50%",
    organization: "Varendra University",
    location: "Rajshahi Bypass Road, Chandrima, Paba, Rajshahi-6204",
    year: "2026",
    completed: "11 May 2026",
    completedIso: "2026-05-11",
    systemType: "P2.5 Indoor Full-Color LED Display Module",
    subtitle: "Varendra University • Paba, Rajshahi • 11 May 2026",
    cardDescription: "P2.5 Lampro indoor full-color LED display project for Varendra University in Rajshahi.",
    scopeLabel: "Verified project record",
    scope: "P2.5 indoor full-color LED display installation and handover using Lampro display modules.",
    highlights: [
      "Client: Varendra University",
      "Display: P2.5 indoor full-color LED display module",
      "Brand: Lampro",
      "Completed: 11 May 2026",
    ],
    meta: [
      { k: "Display type", v: "P2.5 indoor full-color LED display" },
      { k: "Brand", v: "Lampro" },
      { k: "Location", v: "Paba, Rajshahi" },
    ],
    tags: ["P2.5 Indoor LED", "Lampro", "Rajshahi"],
  },
  {
    id: "nusaifa-trading-p5-led-billboard-nasirabad",
    category: "led-display",
    categoryLabel: "LED Display",
    title: "P5 Outdoor LED Billboard — Nasirabad, Chattogram",
    badge: "Completed project",
    image: "/assets/projects/led-display/Nusaifa Trading/IMG_20260308_135826902_HDR.webp",
    imageAlt: "P5 Lampro outdoor LED billboard project for Nusaifa Trading in Nasirabad, Chattogram",
    imageClassName: "object-cover",
    imagePosition: "center 46%",
    organization: "Nusaifa Trading",
    location: "Nasirabad, Chattogram",
    year: "2026",
    completed: "10 March 2026",
    completedIso: "2026-03-10",
    systemType: "P5 Outdoor LED Billboard",
    subtitle: "Completed 10 March 2026",
    cardDescription: "Outdoor LED billboard installation, configuration, calibration, content testing and handover.",
    scopeLabel: "Project scope",
    scope: "Outdoor LED billboard installation, system configuration, calibration, content testing, and handover.",
    highlights: [
      "Outdoor P5 display planned for traffic-facing advertising visibility",
      "Structure, power distribution, grounding, and cable-route checks",
      "Controller mapping, display calibration, and content playback testing",
      "Operating guidance and practical maintenance notes at handover",
    ],
    meta: [
      { k: "Display type", v: "P5 outdoor LED billboard" },
      { k: "Screen size", v: "24.15 ft × 13.6 ft (approximately 328 sq ft)" },
      { k: "Brand", v: "Lampro" },
      { k: "Location", v: "Nasirabad, Chattogram" },
    ],
    tags: ["P5 Outdoor LED", "Lampro", "Chattogram"],
    caseStudyHref: "/blog/p5-led-billboard-project-nasirabad-chattogram-nusaifa-trading/",
  },
  {
    id: "funland-p4-leyard-outdoor-led-display-gazipur",
    category: "led-display",
    categoryLabel: "LED Display",
    title: "P4 Leyard Outdoor LED Display — Funland, Gazipur",
    badge: "Completed project",
    image: "/assets/projects/led-display/Funland/IMG_20260505_180601669_HDR.webp",
    imageAlt: "P4 Leyard outdoor SMD LED display project at Funland in Gazipur",
    imageClassName: "object-cover",
    imagePosition: "center 52%",
    organization: "Laptop Care and Technology, Funland",
    location: "4th Floor, Shop No. 17, 18 & 19, Chowrasta, Joydebpur Road, Gazipur",
    year: "2026",
    completed: "5 January 2026",
    completedIso: "2026-01-05",
    systemType: "P4 Leyard Outdoor SMD LED Display",
    subtitle: "Laptop Care and Technology, Funland • Gazipur • 5 January 2026",
    cardDescription: "P4 Leyard outdoor SMD LED display project at Funland on Joydebpur Road in Gazipur.",
    scopeLabel: "Verified project record",
    scope: "P4 outdoor SMD LED display project using Leyard display technology.",
    highlights: [
      "Client: Laptop Care and Technology, Funland",
      "Display: P4 outdoor SMD LED display",
      "Brand: Leyard",
      "Completed: 5 January 2026",
    ],
    meta: [
      { k: "Display type", v: "P4 outdoor SMD LED display" },
      { k: "Brand", v: "Leyard" },
      { k: "Location", v: "Joydebpur Road, Gazipur" },
    ],
    tags: ["P4 Outdoor LED", "Leyard", "Gazipur"],
  },
  {
    id: "save-the-children-p5-outdoor-led-display-dhaka",
    category: "led-display",
    categoryLabel: "LED Display",
    title: "P5 Outdoor LED Display — Save the Children, Dhaka",
    badge: "Completed project",
    image: "/assets/projects/led-display/Save The Children/IMG_20260408_170401913_HDR.webp",
    imageAlt: "P5 Lampro outdoor LED display project for Save the Children in Dhaka",
    imageClassName: "object-cover",
    imagePosition: "center 50%",
    organization: "Save the Children",
    location: "Gulshan-2, Dhaka-1212, Bangladesh",
    year: "2025",
    completed: "19 October 2025",
    completedIso: "2025-10-19",
    systemType: "P5 Outdoor LED Display",
    subtitle: "Save the Children • Gulshan-2, Dhaka • 19 October 2025",
    cardDescription: "P5 Lampro outdoor LED display project for Save the Children in Dhaka.",
    scopeLabel: "Verified project record",
    scope: "P5 outdoor LED display project using Lampro display modules.",
    highlights: [
      "Client: Save the Children",
      "Display: P5 outdoor LED display",
      "Brand: Lampro",
      "Completed: 19 October 2025",
    ],
    meta: [
      { k: "Display type", v: "P5 outdoor LED display" },
      { k: "Brand", v: "Lampro" },
      { k: "Location", v: "Gulshan-2, Dhaka" },
    ],
    tags: ["P5 Outdoor LED", "Lampro", "Dhaka"],
  },
  {
    id: "banani-officers-quarter-p3-indoor-led-display-dhaka",
    category: "led-display",
    categoryLabel: "LED Display",
    title: "P3 Indoor LED Display — Banani Officers’ Quarter, Dhaka",
    badge: "Completed project",
    image: "/assets/projects/led-display/Banani Officers’ Quarter/project-indoor-wall.webp",
    imageAlt: "P3 Leyard indoor LED display project at Banani Officers’ Quarter in Dhaka",
    imageClassName: "object-cover",
    imagePosition: "center 50%",
    organization: "Banani Officers’ Quarter",
    location: "Banani, Dhaka, Bangladesh",
    year: "2024",
    completed: "5 March 2024",
    completedIso: "2024-03-05",
    systemType: "P3 Indoor LED Display",
    subtitle: "Banani Officers’ Quarter • Dhaka • 5 March 2024",
    cardDescription: "P3 Leyard indoor LED display project at Banani Officers’ Quarter in Dhaka.",
    scopeLabel: "Verified project record",
    scope: "P3 indoor LED display project using Leyard display technology.",
    highlights: [
      "Client: Banani Officers’ Quarter",
      "Display: P3 indoor LED display",
      "Brand: Leyard",
      "Completed: 5 March 2024",
    ],
    meta: [
      { k: "Display type", v: "P3 indoor LED display" },
      { k: "Brand", v: "Leyard" },
      { k: "Location", v: "Banani, Dhaka" },
    ],
    tags: ["P3 Indoor LED", "Leyard", "Dhaka"],
  },
  {
    id: "corporate-boardroom-conference-system-dhaka",
    slug: "corporate-boardroom-conference-system-dhaka",
    category: "conference-system",
    categoryLabel: "Conference System",
    title: "Corporate Boardroom Conference System Installation",
    badge: "Conference System",
    image: "/assets/conference-system/projects/conference_p1.webp",
    imageAlt: "Corporate boardroom conference system installation for Padma WASA in Munshiganj by Sasha Corporation",
    imagePosition: "center",
    organization: "Padma WASA",
    location: "Jashaldia, Louhajang, Munshiganj, Bangladesh",
    year: "2025",
    completed: "7 December 2025",
    completedIso: "2025-12-07",
    capacity: "18–20 Participants",
    systemType: "Digital Wired Conference System with Hybrid Video Conferencing",
    subtitle: "Padma WASA • Jashaldia, Louhajang, Munshiganj, Bangladesh • 7 December 2025",
    cardDescription: "Integrated digital discussion, 4K video conferencing, professional room audio and centralized AV infrastructure for a corporate boardroom.",
    scopeLabel: "Project scope",
    scope: "Conference system installation, hybrid video collaboration, professional room audio and centralized AV integration.",
    highlights: [
      "Clear participant-to-participant communication",
      "Professional hybrid meeting capability",
      "Centralized AV management",
      "Future system expansion capability",
    ],
    meta: [
      { k: "Room capacity", v: "18–20 Participants" },
      { k: "System", v: "Digital Wired" },
      { k: "Integration", v: "Hybrid Video Conferencing" },
    ],
    tags: ["18–20 Participants", "Digital Wired", "Hybrid Video Conferencing"],
    caseStudyHref: "/projects/corporate-boardroom-conference-system-dhaka/",
    seo: {
      title: "Padma WASA Conference System Installation in Munshiganj | Sasha Corporation",
      description: "Explore Sasha Corporation's conference system installation for Padma WASA in Jashaldia, Louhajang, Munshiganj, featuring digital discussion microphones, 4K PTZ video conferencing, professional audio and complete AV integration.",
    },
    detail: {
      projectName: "Executive Boardroom Digital Conference & Video Collaboration System",
      h1: "Padma WASA Boardroom Conference System Installation in Munshiganj",
      projectType: "Corporate Boardroom AV & Conference System Integration",
      overview: [
        "Sasha Corporation delivered a complete digital conference and video collaboration solution for Padma WASA in Jashaldia, Louhajang, Munshiganj, Bangladesh.",
        "Designed for approximately 18–20 participants, the solution combines a professional digital chairman and delegate discussion system with 4K video conferencing, centralized audio processing, large-format visual collaboration and professional room audio.",
        "The system was designed to support both in-room discussions and remote video meetings through a reliable integrated AV environment. Sasha Corporation handled conference system installation, AV integration, structured cabling, system configuration, audio tuning, testing and commissioning.",
      ],
      requirement: [
        "The boardroom required a professional meeting solution capable of supporting both face-to-face discussions and remote video collaboration.",
        "Each participant position required dedicated conference microphone access, while the room also needed clear speech reproduction, large-screen remote participant viewing, professional video conferencing and centralized AV management.",
        "The system needed to remain reliable, cleanly installed and suitable for future expansion.",
      ],
      solution: [
        "Sasha Corporation implemented a digital conference architecture with dedicated discussion units for participant positions and centralized chairman control.",
        "The discussion system was integrated with a professional PTZ video conferencing camera, large-format 4K display, DSP-based room audio processing and professional wall-mounted speakers.",
        "AV equipment and signal processing were organized through a centralized equipment rack to simplify system management, servicing and future expansion. The completed setup was configured, tuned, tested and commissioned as one integrated conference environment.",
      ],
      systemDetails: [
        { label: "Client", value: "Padma WASA" },
        { label: "Project type", value: "Corporate Boardroom AV & Conference System Integration" },
        { label: "Conference system", value: "Bosch DICENTIS Digital Conference System" },
        { label: "Discussion system", value: "Bosch DICENTIS Chairman & Delegate Discussion Units" },
        { label: "Video", value: "Professional 4K PTZ Video Conferencing Camera" },
        { label: "Display", value: "98-inch 4K Professional Conference Display" },
        { label: "Audio", value: "DSP-based Professional Conference Audio System" },
        { label: "Speakers", value: "Professional Wall-Mounted Conference Speakers" },
        { label: "AV infrastructure", value: "Centralized Rack-Mounted AV Control & Processing System" },
      ],
      systemComponents: [
        "Bosch DICENTIS Digital Conference System",
        "Chairman & Delegate Discussion Units",
        "Professional Gooseneck Conference Microphones",
        "Professional 4K PTZ Video Conferencing Camera",
        "98-inch 4K Professional Conference Display",
        "Digital Signal Processor (DSP)",
        "Professional Wall-Mounted Conference Speakers",
        "Central AV Equipment Rack",
        "Audio/Video Processing Equipment",
        "Structured AV Cabling",
        "Control & Connectivity Infrastructure",
      ],
      scopeOfWork: [
        "Conference system supply & installation",
        "Chairman and delegate microphone setup",
        "PTZ video conferencing integration",
        "Large-format display installation",
        "Professional speaker installation",
        "DSP audio processing and tuning",
        "AV rack configuration",
        "Structured cabling",
        "Cable management",
        "Audio/video signal integration",
        "System configuration",
        "Microphone testing",
        "Video conferencing testing",
        "Audio optimization",
        "Final testing & commissioning",
      ],
      results: [
        "Clear participant-to-participant communication",
        "Professional hybrid meeting capability",
        "Dedicated chairman and delegate control",
        "Improved speech intelligibility",
        "Large-screen remote collaboration",
        "Centralized AV management",
        "Clean professional installation",
        "Future system expansion capability",
      ],
    },
  },
  {
    id: "smart-meeting-room-conference-system-dhaka",
    slug: "smart-meeting-room-conference-system-dhaka",
    category: "conference-system",
    categoryLabel: "Conference System",
    title: "Smart Executive Meeting Room & Hybrid Conference System",
    badge: "Conference System",
    image: "/assets/conference-system/projects/coference_p2.webp",
    imageAlt: "Smart meeting room conference system installation in Dhaka by Sasha Corporation",
    imagePosition: "center",
    organization: "Sustainable and Renewable Energy Development Authority (SREDA)",
    location: "IEB Building (9th & 10th Floor), Ramna, Dhaka-1000, Bangladesh",
    year: "2026",
    completed: "25 February 2026",
    completedIso: "2026-02-25",
    capacity: "10–12 Participants",
    systemType: "Digital Wired Conference System with Hybrid Video Conferencing & Smart AV Control",
    subtitle: "Sustainable and Renewable Energy Development Authority (SREDA) • IEB Building (9th & 10th Floor), Ramna, Dhaka-1000, Bangladesh • 25 February 2026",
    cardDescription: "Executive meeting-room solution combining digital discussion microphones, dual PTZ cameras, 4K display, touchscreen control and DSP audio.",
    scopeLabel: "Project scope",
    scope: "Smart meeting-room conference system, hybrid video collaboration, touchscreen control and professional AV integration.",
    highlights: [
      "Clear executive meeting communication",
      "Professional hybrid meeting capability",
      "Centralized touchscreen control",
      "Future expansion capability",
    ],
    meta: [
      { k: "Room capacity", v: "10–12 Participants" },
      { k: "Control", v: "Smart AV Control" },
      { k: "Integration", v: "Hybrid Conferencing" },
    ],
    tags: ["10–12 Participants", "Smart AV Control", "Hybrid Conferencing"],
    caseStudyHref: "/projects/smart-meeting-room-conference-system-dhaka/",
    seo: {
      title: "Smart Meeting Room Conference System Installation in Dhaka | Sasha Corporation",
      description: "Explore Sasha Corporation's smart meeting room conference system installation in Dhaka featuring digital discussion microphones, PTZ video conferencing cameras, 4K display, touchscreen AV control and professional audio integration.",
    },
    detail: {
      projectName: "Smart Executive Meeting Room & Hybrid Video Conference System Installation",
      h1: "Smart Meeting Room Conference System Installation in Dhaka",
      projectType: "Executive Meeting Room AV & Smart Conference System Integration",
      overview: [
        "Sasha Corporation delivered a complete smart executive meeting room and hybrid video conference solution for the Sustainable and Renewable Energy Development Authority (SREDA) at IEB Building (9th & 10th Floor), Ramna, Dhaka-1000, Bangladesh, designed for approximately 10–12 participants.",
        "The integrated solution combines professional digital conference microphones, PTZ video conferencing cameras, a large-format 4K display, touchscreen AV control, DSP-based room audio and centralized AV equipment management.",
        "The system supports both in-room executive meetings and remote video collaboration while keeping audio, video and conference-room controls simple for everyday users.",
      ],
      requirement: [
        "The client required a modern executive meeting environment capable of supporting face-to-face boardroom discussions, remote collaboration and hybrid meetings from a single room.",
        "The solution needed dedicated participant microphones, professional video coverage, clear room audio, large-screen presentation capability and centralized control.",
        "Ease of operation for non-technical users was also an important requirement.",
      ],
      solution: [
        "Sasha Corporation implemented an integrated digital discussion and video collaboration system with dedicated tabletop conference units.",
        "Professional PTZ cameras were positioned to support remote meeting coverage, while the large-format 4K display provides presentations, meeting content and remote participant viewing.",
        "A touchscreen control interface was integrated to simplify operation, while DSP-based audio processing and professional speakers provide clear and balanced speech throughout the room.",
        "AV processing and connectivity equipment were organized through a centralized rack for reliable operation, easier servicing and future expansion.",
      ],
      systemDetails: [
        { label: "Client", value: "Sustainable and Renewable Energy Development Authority (SREDA)" },
        { label: "Project type", value: "Executive Meeting Room AV & Smart Conference System Integration" },
        { label: "Conference system", value: "Professional Digital Chairman & Delegate Discussion System" },
        { label: "Video conferencing", value: "Dual Professional PTZ Video Conference Camera System" },
        { label: "Display", value: "Large-Format 4K Professional Meeting Room Display" },
        { label: "Control system", value: "Touchscreen-Based Central Conference & AV Control" },
        { label: "Audio system", value: "DSP-Processed Professional Meeting Room Audio" },
        { label: "Speakers", value: "Professional Wall-Mounted Speakers" },
        { label: "AV infrastructure", value: "Centralized Rack-Mounted AV Processing, Connectivity & Control System" },
      ],
      systemComponents: [
        "Digital Chairman Conference Unit",
        "Digital Delegate Conference Units",
        "Professional Gooseneck Microphones",
        "Dual PTZ Video Conferencing Cameras",
        "Large-Format 4K Professional Display",
        "Touchscreen Conference / AV Controller",
        "Digital Signal Processor (DSP)",
        "Professional Wall-Mounted Speakers",
        "Central AV Equipment Rack",
        "Video Conferencing Processing Equipment",
        "Structured AV Cabling",
        "Audio/Video Connectivity Infrastructure",
        "Network & Control Integration",
      ],
      scopeOfWork: [
        "Conference system supply & installation",
        "Chairman & delegate microphone setup",
        "PTZ camera installation",
        "Hybrid video conferencing integration",
        "Large-format display setup",
        "Touchscreen AV control configuration",
        "DSP audio processing",
        "Professional speaker installation",
        "AV rack setup",
        "Structured cabling",
        "Cable management",
        "System programming",
        "Audio/video signal testing",
        "Microphone calibration",
        "Camera testing",
        "Final system optimization",
        "Testing & commissioning",
      ],
      results: [
        "Clear executive meeting communication",
        "Dedicated participant microphone control",
        "Professional hybrid meeting capability",
        "High-quality remote video collaboration",
        "Centralized touchscreen control",
        "Improved speech intelligibility",
        "Large-screen presentation capability",
        "Organized AV equipment management",
        "Clean professional installation",
        "Future expansion capability",
      ],
    },
  },
  {
    id: "large-conference-room-system-dhaka",
    slug: "large-conference-room-system-dhaka",
    category: "conference-system",
    categoryLabel: "Conference System",
    title: "Large Conference Room Digital Conference System Installation",
    badge: "Conference System",
    image: "/assets/conference-system/projects/conference_p3.webp",
    imageAlt: "Large conference room digital conference system installation in Dhaka by Sasha Corporation",
    imagePosition: "center",
    organization: "Department of Environment (DoE), Bangladesh",
    location: "Paribesh Bhaban, E/16, Agargaon, Sher-e-Bangla Nagar, Dhaka-1207, Bangladesh",
    year: "2026",
    completed: "15 May 2026",
    completedIso: "2026-05-15",
    capacity: "30–40 Participants",
    systemType: "Digital Wired Conference & Discussion System",
    subtitle: "Department of Environment (DoE), Bangladesh • Paribesh Bhaban, E/16, Agargaon, Sher-e-Bangla Nagar, Dhaka-1207, Bangladesh • 15 May 2026",
    cardDescription: "Large-room conference solution featuring dedicated chairman and delegate microphones, centralized discussion control and integrated professional AV infrastructure.",
    scopeLabel: "Project scope",
    scope: "Large-room digital discussion system installation, centralized conference control, structured cabling and professional AV integration.",
    highlights: [
      "Clear communication across a large meeting room",
      "Dedicated microphone access for participants",
      "Centralized chairman control",
      "Expandable conference system architecture",
    ],
    meta: [
      { k: "Room capacity", v: "30–40 Participants" },
      { k: "System", v: "Digital Wired" },
      { k: "Integration", v: "Professional AV" },
    ],
    tags: ["30–40 Participants", "Digital Wired", "Professional AV"],
    caseStudyHref: "/projects/large-conference-room-system-dhaka/",
    seo: {
      title: "Large Conference Room System Installation in Dhaka | Sasha Corporation",
      description: "Explore Sasha Corporation's large conference room system installation in Dhaka featuring digital chairman and delegate microphones, centralized discussion control and professional AV integration.",
    },
    detail: {
      projectName: "Large Conference Hall Digital Discussion & AV System Installation",
      h1: "Large Conference Room Digital Conference System Installation in Dhaka",
      projectType: "Large Conference Room / Council Chamber AV Integration",
      overview: [
        "Sasha Corporation delivered a professional digital conference and discussion system for the Department of Environment (DoE), Bangladesh at Paribesh Bhaban, E/16, Agargaon, Sher-e-Bangla Nagar, Dhaka-1207, Bangladesh.",
        "Designed for approximately 30–40 participants, the solution includes dedicated chairman and delegate discussion units, professional gooseneck microphones, large-format visual presentation, centralized conference control and structured AV connectivity.",
        "The installation was planned to provide clear participant communication across a large meeting table while maintaining reliable microphone management, organized cabling and professional room integration.",
        "Sasha Corporation handled conference system installation, equipment positioning, structured cabling, system configuration, microphone testing, audio optimization and final commissioning.",
      ],
      requirement: [
        "The meeting room required a scalable professional discussion system capable of supporting a larger number of participants while maintaining clear speech and controlled microphone access.",
        "The solution needed dedicated participant microphones, chairman-controlled discussion, clear speech reproduction, professional presentation capability, organized conference cabling and centralized system management.",
        "The room also required an architecture that could support future expansion without requiring a complete redesign of the conference infrastructure.",
      ],
      solution: [
        "Sasha Corporation implemented a digital wired conference system with dedicated discussion units positioned throughout the large conference table.",
        "The microphone layout was designed to provide convenient access for each participant while centralized conference control supports structured meeting management.",
        "The discussion system was integrated with professional AV infrastructure and a large-format display for presentations and meeting content.",
        "Structured cabling, system configuration and audio optimization were completed to provide a reliable and organized conference-room environment.",
        "The complete system was tested and commissioned after installation.",
      ],
      systemDetails: [
        { label: "Client", value: "Department of Environment (DoE), Bangladesh" },
        { label: "Project type", value: "Large Conference Room / Council Chamber AV Integration" },
        { label: "Conference system", value: "Professional Digital Chairman & Delegate Discussion System" },
        { label: "Display solution", value: "Large-Format Professional Conference Display" },
        { label: "Audio", value: "DSP-Based Professional Conference Audio Processing" },
        { label: "AV infrastructure", value: "Centralized Conference Control, Structured Cabling & AV Integration" },
      ],
      systemComponents: [
        "Digital Chairman Discussion Unit",
        "Digital Delegate Discussion Units",
        "Professional Gooseneck Conference Microphones",
        "Central Conference Control Unit",
        "Large-Format Professional Conference Display",
        "Digital Signal Processor (DSP)",
        "Professional Conference Audio System",
        "Centralized AV Processing",
        "Structured Conference Cabling",
        "Power & Connectivity Infrastructure",
        "Conference Control System",
      ],
      scopeOfWork: [
        "Conference system supply & installation",
        "Chairman unit setup",
        "Delegate microphone installation",
        "Participant position configuration",
        "Central control configuration",
        "Structured conference cabling",
        "Cable management",
        "Display integration",
        "Audio processing setup",
        "System programming",
        "Microphone testing",
        "Speech-level optimization",
        "Complete system testing",
        "Final commissioning",
      ],
      results: [
        "Clear communication across a large meeting room",
        "Dedicated microphone access for participants",
        "Centralized chairman control",
        "Structured meeting management",
        "Improved speech intelligibility",
        "Professional conference-room presentation capability",
        "Clean and organized installation",
        "Expandable conference system architecture",
      ],
      ctaHeading: "Planning a Large Conference Room?",
    },
  },
];

export const conferenceProjects = projects.filter(
  (project): project is Project & {
    slug: string;
    image: string;
    imageAlt: string;
    completed: string;
    completedIso: string;
    capacity: string;
    systemType: string;
    detail: ProjectDetail;
    seo: NonNullable<Project["seo"]>;
  } => project.category === "conference-system" && Boolean(
    project.slug
    && project.image
    && project.imageAlt
    && project.completed
    && project.completedIso
    && project.capacity
    && project.systemType
    && project.detail
    && project.seo,
  ),
);

export const ledDisplayProjects = projects.filter(
  (project): project is Project & { image: string; imageAlt: string } =>
    project.category === "led-display" && Boolean(project.image && project.imageAlt),
);

export function getProjectBySlug(slug: string): (typeof conferenceProjects)[number] | undefined {
  return conferenceProjects.find((project) => project.slug === slug);
}
