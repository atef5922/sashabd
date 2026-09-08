export type DigitalPodiumSpecRow = { k: string; v: string };

export type DigitalPodiumItem = {
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  image: string;
  tags: string[];
  cardHighlights: string[];
  specs: DigitalPodiumSpecRow[];
  description: string[];
  recommendedFor: string[];
  faqs: { q: string; a: string }[];
};


export const digitalPodiumCatalog: DigitalPodiumItem[] = [
  {
    slug: "standard-digital-podium-built-in-pc-sound",
    title: "Standard Digital Podium with Built-in PC & Sound System",
    subtitle:
      "A practical all-in-one teacher/presenter station with PC space, microphone control and clean connectivity for daily classes and training sessions.",
    priceLabel: "Tk 1,80,000 (project basis)",
    image: "/assets/control-systems/digital-podium/products/Standard-Digital-Podium.webp",
    tags: ["Digital Podium", "Smart Classroom", "Teacher Desk", "PC + Sound"],
    cardHighlights: [
      "Built-in Windows mini PC option for daily teaching workflow (typical)",
      "Classroom audio-ready amplification path (configuration dependent)",
      "Secure, lockable storage for PC/UPS and accessories",
      "Gooseneck mic + handheld mic control for presenters",
    ],
    specs: [
      { k: "Podium Type", v: "Standard digital podium / multimedia lectern" },
      { k: "PC Integration", v: "Built-in industrial mini PC (Windows) (typical)" },
      { k: "Audio Output", v: "Integrated 60–100W amplifier (typical)" },
      { k: "Microphones", v: "Gooseneck mic + handheld mic (volume control supported)" },
      { k: "Cabinet", v: "Lockable cabinet space for PC/UPS/accessories" },
      { k: "Connectivity", v: "HDMI / VGA / USB (as per configuration)" },
      { k: "Recommended Use", v: "Smart classroom, teacher desk, training room, seminar room" },
      { k: "Finishing", v: "Powder-coated metal body (custom branding optional)" },
      { k: "Price Note", v: "Project basis; final quotation depends on configuration" },
    ],
    description: [
      "This standard digital podium is designed for institutions that need a reliable day-to-day teaching and presentation station. It keeps the presenter in control with a structured workspace, secure storage and a clean connection panel for the room display and audio.",
      "In a typical setup, the podium combines a Windows mini PC, microphone workflow and an integrated amplifier path for classroom sound. The result is simpler operation, fewer loose cables and less setup time before each session.",
      "For accurate pricing, share your room type, display connection plan and microphone/audio requirements. We propose a suitable configuration, then confirm the final BOQ scope before delivery.",
    ],
    recommendedFor: ["Smart classroom", "Training room", "Teacher desk setup", "Seminar room"],
    faqs: [
      {
        q: "Can this standard digital podium run class content without an external computer?",
        a: "It can be configured with an internal mini PC, or you can use a laptop connection. Share your workflow and we will propose the simplest daily setup.",
      },
      {
        q: "Does the podium have lockable storage for PC, UPS, and accessories?",
        a: "Yes. This model includes a lockable cabinet area for secure storage, helping keep the classroom setup clean and organized.",
      },
    ],
  },
  {
    slug: "premium-digital-podium-interactive-touch-display",
    title: "Premium Digital Podium with Interactive Touch Display",
    subtitle:
      "A premium podium with touch control and a digital mixer workflow for higher-end classrooms, auditoriums and conference environments.",
    priceLabel: "Tk 2,50,000 (configuration dependent)",
    image: "/assets/control-systems/digital-podium/products/Premium-Digital-Podium.webp",
    tags: ["Digital Podium", "Touch Screen", "Auditorium", "Conference"],
    cardHighlights: [
      "21.5\"–27\" touch display option for annotation and session control",
      "Multiple microphone inputs via digital mixer workflow (typical)",
      "Premium podium body with cleaner cable routing panels",
      "HDMI / VGA / USB connections for laptops and media devices",
    ],
    specs: [
      { k: "Podium Type", v: "Premium digital podium with touch display" },
      { k: "Touch Display", v: "21.5\"–27\" touch monitor (configuration dependent)" },
      { k: "Audio Control", v: "Built-in digital mixer module (typical)" },
      { k: "Microphone Inputs", v: "Multiple mic inputs supported (configuration dependent)" },
      { k: "Connectivity", v: "HDMI / VGA / USB (typical)" },
      { k: "Body Material", v: "Metal body with premium wood-finish look" },
      { k: "Cable Management", v: "Integrated routing and access panels" },
      { k: "Recommended Use", v: "Auditorium, conference hall, seminar room" },
      { k: "Price Note", v: "Configuration dependent (touch size and selected modules)" },
    ],
    description: [
      "Premium digital podiums are built for venues where presentation control, clean aesthetics and smoother operation matter. The touch display option helps presenters annotate, control content and manage sessions confidently in front of a larger audience.",
      "A digital mixer-style workflow can support multiple microphone sources, while standard AV connectivity keeps integration straightforward with projectors, interactive flat panels or a room AV system.",
      "For a correct quotation, we match the podium to room size, audience distance, the primary display type and the audio workflow. This avoids over-specifying while keeping the daily experience reliable.",
    ],
    recommendedFor: ["Auditorium", "Conference hall", "Seminar room", "Premium smart classroom"],
    faqs: [
      {
        q: "Is the touch display size customizable for this premium podium?",
        a: "Yes. Touch display size depends on the selected configuration. We recommend a size based on the podium layout and how the presenter will annotate during sessions.",
      },
      {
        q: "Can this premium podium support multiple microphones with a mixer workflow?",
        a: "Yes. It can be configured for multiple mic inputs, but the exact setup depends on the selected modules and your venue audio plan.",
      },
    ],
  },
  {
    slug: "oem-digital-podium-multimedia-lectern",
    title: "OEM Digital Podium – Multimedia Lectern",
    subtitle:
      "A flexible and cost-conscious podium solution using an imported chassis with locally configured PC and integration options.",
    priceLabel: "≈ Tk 1,60,000 (configuration dependent)",
    image: "/assets/control-systems/digital-podium/products/OEM-Digital-Podium.webp",
    tags: ["OEM Podium", "Multimedia Desk", "Smart Classroom"],
    cardHighlights: [
      "Imported podium chassis with flexible local PC integration",
      "Source switching via multimedia key control panel",
      "Provision for visualizer / document camera mounting",
      "A practical choice for universities and training rooms",
    ],
    specs: [
      { k: "Podium Type", v: "OEM multimedia lectern / digital podium" },
      { k: "Chassis", v: "Imported podium chassis (OEM)" },
      { k: "PC Integration", v: "Local PC integration supported (optional)" },
      { k: "Control Panel", v: "Multimedia key panel for source switching" },
      { k: "Accessory Space", v: "Space for visualizer / document camera mounting" },
      { k: "Connectivity", v: "HDMI / VGA / USB (as per setup)" },
      { k: "Recommended Use", v: "Smart classroom, training room" },
      { k: "Price Note", v: "Varies by configuration and accessories" },
    ],
    description: [
      "OEM multimedia lecterns are a practical choice when you want flexibility in configuration while keeping budgets realistic. The chassis provides a clean podium structure, while PC and accessories can be selected based on room workflow and procurement requirements.",
      "This option is commonly selected for private universities and training centers that need a reliable teaching station with AV switching, secure storage and optional add-ons such as a document camera.",
      "To confirm the right configuration, share your display type, cable distance and accessory list. We recommend a stable setup and document it clearly for procurement.",
    ],
    recommendedFor: ["Private university", "Training center", "Smart classroom", "Budget-focused deployments"],
    faqs: [
      {
        q: "What makes an OEM multimedia lectern different from a fully custom podium?",
        a: "An OEM lectern uses an imported chassis, then the PC and accessories are selected locally based on your workflow. It is a cost-conscious option with flexible configuration choices.",
      },
      {
        q: "Can you add a document camera or visualizer mount to this OEM lectern?",
        a: "Yes. It can be configured with visualizer/document camera mounting and the required connectivity, depending on the model and classroom workflow.",
      },
    ],
  },
  {
    slug: "auditorium-digital-podium-av-conference-integration",
    title: "Auditorium Digital Podium with AV & Conference Integration",
    subtitle:
      "A higher-end auditorium podium designed for conference microphone workflows, recording/streaming interfaces and multi-output routing.",
    priceLabel: "≈ Tk 2,80,000 (configuration dependent)",
    image: "/assets/control-systems/digital-podium/products/Auditorium-Digital-Podium.webp",
    tags: ["Auditorium", "Conference", "Network Audio"],
    cardHighlights: [
      "Conference mic workflow support (chairman/delegate as required)",
      "Recording/streaming-ready audio interface options (as required)",
      "Separate routing options for PA and broadcast output",
      "Premium finish with optional custom logo plate",
    ],
    specs: [
      { k: "Podium Type", v: "Auditorium digital podium with AV integration" },
      { k: "Conference Integration", v: "Chairman / delegate system compatible (configuration dependent)" },
      { k: "Network Audio", v: "Interface support for recording & streaming (as required)" },
      { k: "Mic Outputs", v: "Multiple outputs for PA & broadcast routing (as required)" },
      { k: "Recommended Use", v: "Auditorium, conference hall, seminar stage" },
      { k: "Finishing", v: "Premium wood/metal finishing (custom logo optional)" },
      { k: "Price Note", v: "Depends on AV + conference configuration scope" },
    ],
    description: [
      "Auditorium podium projects need more than a podium body—they need a clean audio workflow, clear routing and dependable integration with the venue AV system. This model category is designed for stage environments where multiple microphones, recording and controlled outputs are part of daily operation.",
      "Depending on the venue, the configuration can include conference microphone compatibility, recording/streaming interface support and separate outputs for PA and broadcast needs—planned in a structured BOQ so the integration is predictable.",
      "Share your hall size, existing rack equipment and required outputs to receive a clear proposal and quotation that matches the venue workflow.",
    ],
    recommendedFor: ["Auditorium", "Conference stage", "Institutional seminar hall", "Recording/streaming-ready venues"],
    faqs: [
      {
        q: "Can this auditorium podium provide separate outputs for PA and recording/broadcast?",
        a: "Yes. It can be configured with separate routing for PA and recording/broadcast, depending on the chosen interface and the venue rack workflow.",
      },
      {
        q: "Do you support conference chairman/delegate microphone integration for stage events?",
        a: "Yes. It can be planned with conference microphone workflows as required, based on the selected conference modules and integration scope.",
      },
    ],
  },
  {
    slug: "tender-based-custom-digital-podium-boq-compliant",
    title: "Tender-Based Custom Digital Podium (BOQ Compliant)",
    subtitle:
      "Custom fabrication aligned with approved BOQ and drawings—suitable for government and large-institution procurement where compliance matters.",
    priceLabel: "On request (BOQ / tender wise)",
    image: "/assets/control-systems/digital-podium/products/Tender-Based-Custom.webp",
    tags: ["BOQ", "Tender", "Custom Fabrication"],
    cardHighlights: [
      "Fabricated to match approved BOQ and drawings",
      "Material thickness and finishing aligned with tender spec",
      "Integration-ready for IFP/projector/PA rack and accessories",
      "LAN/Wi-Fi and recording features as project requirement",
    ],
    specs: [
      { k: "Podium Type", v: "Tender-based custom digital podium (BOQ compliant)" },
      { k: "Fabrication", v: "As per approved BOQ, drawings and finishing specification" },
      { k: "Material", v: "Gauge/thickness as tender requirement" },
      { k: "Integration", v: "IFP / projector / PA rack / recording / doc camera (as per BOQ)" },
      { k: "Network", v: "LAN and Wi-Fi support (as per project requirement)" },
      { k: "Branding", v: "Custom logo plate and institutional finishing option" },
      { k: "Recommended Use", v: "Government tenders, universities, large institutions" },
      { k: "Price Note", v: "On request (BOQ / tender wise)" },
    ],
    description: [
      "Tender-based podium projects are driven by compliance. This category focuses on matching the approved BOQ: body size, material thickness, finishing, connectivity panels and integration points—documented clearly for procurement teams.",
      "Because tender scopes vary, networking, recording, accessory mounting and integration with projectors/IFPs/PA racks are planned according to the BOQ and the site workflow, then verified before delivery.",
      "Share your BOQ and drawings to receive a compliance-aligned proposal, fabrication plan and quotation.",
    ],
    recommendedFor: ["Government projects", "University deployments", "Large-scale institutional procurement", "BOQ compliance"],
    faqs: [
      {
        q: "What documents do you need to quote a BOQ-compliant tender podium?",
        a: "Please share the BOQ, drawings, and compliance notes (dimensions, material thickness, finishing, required ports). We will map a proposal to those documents and prepare a clear quotation.",
      },
      {
        q: "Can you fabricate the podium exactly as per approved BOQ and drawings?",
        a: "Yes. This category is built for compliance-first procurement, so we align fabrication, panels, and finishing to the approved BOQ and drawings.",
      },
    ],
  },
  {
    slug: "smart-classroom-digital-podium-projector-ifp-integration",
    title: "Smart Classroom Digital Podium with Projector / IFP Integration",
    subtitle:
      "A smart classroom-focused podium designed for clean AV control and integration with projector or interactive flat panel setups.",
    priceLabel: "Tk 2,20,000 (project basis)",
    image: "/assets/control-systems/digital-podium/products/Smart-Classroom-Digital-Podium.webp",
    tags: ["Smart Classroom", "Projector", "IFP", "AV Control"],
    cardHighlights: [
      "Designed for projector or interactive flat panel (IFP) integration",
      "Teacher-friendly AV control layout with tidy cable routing",
      "Fits smart classrooms, training rooms and lecture halls",
      "Supports mic/PC/LAN and document camera workflow (as required)",
    ],
    specs: [
      { k: "Category", v: "Digital podium" },
      { k: "Typical Applications", v: "Smart classroom, projector, IFP, AV control" },
      { k: "Integration Focus", v: "Projector/IFP connectivity with clean cable routing" },
      { k: "Recommended Use", v: "Smart classroom, training room, lecture hall" },
      { k: "Price Note", v: "Project basis; final quotation depends on room workflow" },
    ],
    description: [
      "Smart classroom podiums work best when the teacher can start a session quickly without switching between multiple devices and adapters. This category focuses on a cleaner AV workflow: structured ports, tidy routing and integration planning for projector or interactive flat panel setups.",
      "In a typical smart classroom, the podium supports content playback from PC, microphone use and simple switching—so the instructor stays focused on teaching, not on cables and controls.",
      "Share your classroom layout and the target display (projector or IFP) to receive a suitable configuration and BOQ-ready quotation.",
    ],
    recommendedFor: ["Smart classroom", "Lecture hall", "Training room", "IFP/projector integrated rooms"],
    faqs: [
      {
        q: "How do you plan cable routing for projector or IFP integration from the podium?",
        a: "We plan based on cable distance, conduit/trunking route, and the display input type. This avoids signal issues and keeps the classroom setup clean and easy to maintain.",
      },
      {
        q: "Can this podium be configured with LAN/Wi-Fi and document camera workflow?",
        a: "Yes. Depending on the classroom requirements, we can include network connectivity and document camera support as part of the configuration and BOQ scope.",
      },
    ],
  },
];

export function getDigitalPodiumBySlug(slug: string): DigitalPodiumItem | undefined {
  return digitalPodiumCatalog.find((x) => x.slug === slug);
}
