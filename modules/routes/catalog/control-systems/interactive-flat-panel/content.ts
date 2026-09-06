// Existing catalog guidance retained from the original landing page.
export const faqs: { q: string; a: string }[] = [
  {
    q: "What affects interactive flat panel price in Bangladesh?",
    a: "Price varies by screen size, brand, Android performance, touch specification, OPS PC configuration (if required), mounting type (wall mount or trolley) and installation scope. Quantity and project location also impact quotation.",
  },
  {
    q: "Which size should I choose for a classroom?",
 a: "A practical choice depends on room depth and seating distance. Many classrooms select 75 - 86 inch panels, while smaller rooms may use 65 inch and larger halls may require 96 inch or above.",
  },
  {
    q: "Is Android-only enough or do I need an OPS PC?",
    a: "Android covers whiteboard, basic apps and casting for many users. OPS PC is useful for a full Windows workflow, Office/Teams requirements, and heavier content handling. We recommend based on use-case.",
  },
  {
    q: "Do you provide installation and handover support?",
    a: "Yes. We support mounting and cabling guidance, commissioning checks, and basic training so teachers or staff can operate the panel confidently.",
  },
  {
    q: "Can an interactive flat panel be used in meeting rooms?",
    a: "Yes. IFPs are commonly used for presentations, annotation on documents, brainstorming sessions and hybrid meeting workflows when paired with the right accessories.",
  },
  {
    q: "Which accessories are commonly needed with an interactive flat panel?",
    a: "Common accessories include a wall mount or floor trolley, OPS PC (if Windows workflow is needed), HDMI/USB cabling, wireless screen sharing tools, camera, speakerphone, and basic audio integration depending on classroom or meeting-room use.",
  },
];

export const priceRows = [
  { size: '65"', price: "\u09F3 2,30,000 - \u09F3 2,80,000", use: "Small classrooms, meeting rooms, reception and compact collaboration spaces" },
  { size: '75"', price: "\u09F3 3,20,000 - \u09F3 3,80,000", use: "Standard classrooms and training rooms where back-row visibility matters" },
  { size: '86"', price: "\u09F3 4,20,000 - \u09F3 5,00,000", use: "Large classrooms, coaching centers and boardrooms with deeper seating" },
  { size: '98"', price: "\u09F3 6,80,000 - \u09F3 7,80,000", use: "Large training halls, lecture rooms and premium meeting spaces" },
  { size: '110"', price: "\u09F3 8,50,000 - \u09F3 9,50,000", use: "Auditoriums and large venues where screen impact is a priority" },
];

export const viewingDistanceRows = [
  { distance: "Up to 2 m", size: '65"', room: "Small meeting rooms / compact classrooms" },
  { distance: "2 - 3 m", size: '65" - 75"', room: "Standard classrooms / team rooms" },
  { distance: "3 - 4 m", size: '75" - 86"', room: "Training rooms / larger classrooms" },
  { distance: "4 - 5 m", size: '86" - 98"', room: "Large classrooms / seminar rooms" },
  { distance: "5 m +", size: '98" - 110"', room: "Auditoriums / big halls" },
];

export const boqChecklist = [
  "Interactive flat panel model and size (Android platform, touch capability, speaker output and glass type).",
  "Mounting option: wall mount or trolley stand, plus installation height planning.",
  "Cabling and connectivity: HDMI/USB/LAN, power protection and clean cable management.",
  "Optional OPS PC (Windows) when Office/Teams/Zoom workflow is required.",
  "Delivery, professional installation, commissioning, user handover training and warranty terms.",
];

export const opsCards = [
  {
    badge: "Basic",
    title: "OPS PC - Core i5 (Everyday)",
    subtitle: "For standard classrooms and training rooms with common Office + browser usage.",
    recommended: 'Recommended panel size: 65" - 75"',
    image: "/images/Interactive%20flat%20panel/OPS-PC-basic.webp",
    specs: ["Intel Core i5", "8GB RAM", "256GB SSD", "Windows 11 Pro"],
  },
  {
    badge: "Standard",
    title: "OPS PC - Core i5 (Smooth Multitask)",
    subtitle: "For smart classrooms and training setups that multitask apps and content during sessions.",
    recommended: 'Recommended panel size: 75" - 86"',
    image: "/images/Interactive%20flat%20panel/OPS-PC-standard.webp",
    specs: ["Intel Core i5", "16GB RAM", "512GB SSD", "Windows 11 Pro"],
  },
  {
    badge: "Pro",
    title: "OPS PC - Core i7 (Power User)",
    subtitle: "For university labs, corporate boardrooms and heavier workloads with multiple windows and meetings.",
    recommended: 'Recommended panel size: 86" - 110"',
    image: "/images/Interactive%20flat%20panel/OPS-PC-pro.webp",
    specs: ["Intel Core i7", "16GB - 32GB RAM", "512GB - 1TB SSD", "Windows 11 Pro"],
  },
];

export const whyChooseCards = [
  {
    title: "Use-case based recommendation",
    desc: "We propose models based on room depth, audience distance and workflow (Android-only vs OPS PC) so the panel feels right in real use.",
  },
  {
    title: "BOQ & specification support",
    desc: "Share your requirement or tender spec and we map a suitable configuration to reduce mismatch risk.",
  },
  {
    title: "Professional installation & commissioning",
    desc: "Mounting height, clean cabling, connectivity checks and on-site commissioning are handled for stable performance from day one.",
  },
  {
    title: "Training and handover",
    desc: "We provide basic user guidance so whiteboard, annotation and screen sharing can be used confidently.",
  },
  {
    title: "Warranty and after-sales continuity",
    desc: "Clear warranty terms and practical support help troubleshooting, accessories and long-term operation stay manageable.",
  },
  {
    title: "Nationwide delivery planning",
    desc: "We support projects across Bangladesh with delivery coordination and installation planning based on site readiness.",
  },
];

export const applications = [
  { icon: "school", title: "Smart Classrooms", size: '65″–86″', desc: "Bring lessons to life with on-screen writing, visual explanations and saved class notes.", points: ["Schools, colleges & coaching centers", "Whiteboard, annotation & lesson playback"] },
  { icon: "users", title: "Meeting & Boardrooms", size: '65″–86″', desc: "Present, review documents and develop ideas together on one shared canvas.", points: ["Presentations & team collaboration", "Camera and speakerphone integration"] },
  { icon: "screen", title: "Training & Large Spaces", size: '75″–110″', desc: "Plan a larger display around room depth, seating and the smallest text your audience needs to read.", points: ["Training rooms, lecture halls & seminars", "Screen size and audio planned together"] },
] as const;

export const features = [
  { icon: "screen", title: "Clear Visuals", desc: "Compare resolution, brightness and glare handling against your room lighting and presentation content." },
  { icon: "pen", title: "Write & Annotate", desc: "Explain ideas directly on screen. Check pen feel, touch accuracy and palm rejection on the chosen model." },
  { icon: "cast", title: "Share Your Screen", desc: "Present from compatible laptops or mobile devices; confirm casting software and network requirements." },
  { icon: "cpu", title: "Your Apps, Your Workflow", desc: "Use built-in tools or a compatible optional OPS PC when your team needs a Windows environment." },
] as const;

export const processSteps = [
  { icon: "clipboard", title: "Share Requirements", desc: "Tell us your room size, audience, apps, budget and preferred panel size." },
  { icon: "screen", title: "Select & Quote", desc: "Compare suitable models and confirm the panel, accessories and BOQ." },
  { icon: "settings", title: "Install & Test", desc: "Plan mounting, connect devices and check writing, sharing and audio." },
  { icon: "headset", title: "Train & Support", desc: "Receive an operating handover and agreed warranty and support details." },
] as const;

export const planningCards = [
  { icon: "users", title: "Room & Audience", items: ["Room dimensions and back-row distance", "Classroom, meeting or training use", "Quantity, location and floor access"] },
  { icon: "cpu", title: "Apps & Connectivity", items: ["Android-only or Windows / OPS workflow", "Laptop inputs and casting requirements", "Camera, microphone and audio needs"] },
  { icon: "settings", title: "Installation & Support", items: ["Wall mount or mobile trolley", "Cable routes and power protection", "Training, warranty and handover scope"] },
] as const;

