import { receivingCardCatalog, controllerCatalog, powerSupplyCatalog, ledAccessoriesCatalog, type ReceivingCardProduct } from "@/lib/productsCatalog";
import type { IfpIconName } from "../control-systems/interactive-flat-panel/IfpIcon";

export type AccessoryCategory = "receiving-card" | "controller" | "power-supply" | "led-accessories";
export type AccessoryProduct = Pick<ReceivingCardProduct, "slug" | "title" | "subtitle" | "image" | "cardPrice" | "badge" | "quickFeatures">;
type GuideCard = { icon: IfpIconName; title: string; points: readonly string[] };
export type AccessoryPageContent = {
  label: string; title: string; accent: string; eyebrow: string; description: string; metaDescription: string;
  image: { src: string; width: number; height: number; alt: string; caption: string };
  products: readonly AccessoryProduct[]; productTitle: string; productIntro: string; heroTags: readonly string[];
  guideTitle: string; guideIntro: string; guides: readonly GuideCard[];
  contextTitle: string; contexts: readonly { icon: IfpIconName; title: string; text: string }[];
  advice: string; checklist: readonly GuideCard[];
  faqs: readonly { q: string; a: string }[]; cta: string;
};

export const accessoryCategories: readonly AccessoryCategory[] = ["receiving-card", "controller", "power-supply", "led-accessories"];
export const accessoryPath = (category: AccessoryCategory) => `/led-display/accessories/${category}/`;

// These catalog entries currently reuse another model's photograph. Label the
// listing image honestly; do not silently alter product records/detail pages.
export const representativeImageSlugs = new Set([
  "novastar-mrv336-receiving-card", "colorlight-5a-75e-receiving-card", "huidu-vp210h",
  "huidu-hd-vp1220-led-video-processor", "huidu-hd-vp1620-led-video-processor",
]);

export const accessoryPages: Record<AccessoryCategory, AccessoryPageContent> = {
  "receiving-card": {
    label: "Receiving Card", title: "LED Display Receiving Cards", accent: "The Right Match. A Clearer Display.", eyebrow: "CABINET CONTROL & MAPPING",
    description: "Choose a receiving card around your modules, cabinet layout and control system. Compare models with compatibility guidance and configuration support in Bangladesh.",
    metaDescription: "Compare LED receiving cards in Bangladesh. Explore models, indicative prices, HUB interfaces, scan compatibility and cabinet mapping with selection support.",
    image: { src: "/assets/led-display/receiving-cards/R-732-Receiving-Card.webp", width: 1024, height: 683, alt: "R-732 LED display receiving card with HUB connectors", caption: "R-732 receiving card · Catalog example" },
    products: receivingCardCatalog, productTitle: "Find the Right Receiving Card", productIntro: "Compare the catalog models, then confirm the controller ecosystem and module requirements before ordering.",
    heroTags: ["HUB interface", "Scan & driver IC", "Cabinet mapping"],
    guideTitle: "Match the Card to Your LED Cabinet", guideIntro: "A matching connector alone is not enough. Review the complete signal path before replacing or upgrading a card.",
    guides: [
      { icon: "cpu", title: "Controller & Software", points: ["Confirm the sender / processor brand and exact model.", "Check supported receiving-card hardware and firmware.", "Keep a backup of the working cabinet configuration."] },
      { icon: "cast", title: "Module & HUB Interface", points: ["Identify the module connector, pinout and orientation.", "Confirm the scan mode and driver IC requirements.", "Match the receiving card, HUB board and ribbon cables."] },
      { icon: "screen", title: "Cabinet Load & Mapping", points: ["Provide cabinet width and height in pixels.", "Review port assignments and module arrangement.", "Confirm loading limits for the required configuration."] },
    ],
    contextTitle: "Support for New Screens & Existing Cabinets",
    contexts: [
      { icon: "screen", title: "Fixed LED Installations", text: "Plan consistent cabinet mapping for indoor video walls and outdoor signage." },
      { icon: "settings", title: "Replacement & Servicing", text: "Check the existing card and configuration before selecting a replacement." },
      { icon: "clipboard", title: "Rental & Spare Planning", text: "Choose compatible spares and keep cabinet files organized for event preparation." },
    ],
    advice: "Flicker, missing rows or shifted content do not prove a receiving-card fault. Power, cabling, mapping and module settings also need checking by a technician.",
    checklist: [
      { icon: "screen", title: "Your Cabinet & Modules", points: ["Module front/back and HUB connector photos", "Pixel pitch, scan rate and driver IC details", "Cabinet resolution and module arrangement"] },
      { icon: "clipboard", title: "Your Existing Control System", points: ["Controller and receiving-card brand/model", "Working configuration file, if available", "Quantity, symptoms and replacement or new-build use"] },
    ],
    faqs: [
      { q: "How do I choose the right receiving card?", a: "Match the exact controller ecosystem, module interface, scan mode, driver IC and cabinet resolution. Share the existing card label, module photos and working configuration so compatibility can be checked before purchase." },
      { q: "What is the difference between a sending and receiving card?", a: "The sending side passes display data from the content or processing system to the cabinets. A receiving card distributes that data within the cabinet to the LED modules. Their roles and compatibility are different." },
      { q: "Why does the HUB connector matter?", a: "The receiving card, HUB board and ribbon cable must match the module interface and pinout. A similar-looking connector does not guarantee that the scan configuration or driver IC is supported." },
      { q: "Can a receiving card cause flicker or missing lines?", a: "It can, but similar symptoms can come from incorrect configuration, loose cables, unstable power or module faults. A technician should check the signal and power paths before deciding which component to replace." },
      { q: "Will new modules work with my existing receiving card?", a: "Not automatically. Compare the new module’s scan mode, driver IC, interface and loading requirements with the card’s supported configuration. A firmware, HUB board or card change may be required." },
      { q: "Do you help with mapping and configuration?", a: "Sasha Corporation provides selection and commissioning guidance based on the controller model, cabinet layout and available configuration files. Share photos, requirements and site details to confirm the support scope and quotation." },
    ],
    cta: "Get the Right Card for Your Cabinet.",
  },
  controller: {
    label: "Controller", title: "LED Controllers & Video Processors", accent: "Bring Every Pixel Together.", eyebrow: "CONTENT, SIGNAL & SCREEN CONTROL",
    description: "From scheduled signage to live presentations, choose the controller or processor around your content sources, total pixel load and receiving-card system.",
    metaDescription: "Browse LED controllers and video processors in Bangladesh. Compare models, indicative prices, inputs, pixel loading and playback options with BOQ support.",
    image: { src: "/assets/led-display/controllers/Huidu-HD-VP620-LED-Video-Processor.webp", width: 905, height: 488, alt: "Huidu HD VP620 LED video processor front and rear connections", caption: "Huidu HD VP620 · Front & rear view" },
    products: controllerCatalog, productTitle: "Controllers for Your Display Workflow", productIntro: "Explore asynchronous controllers and video processors. Input, scaling and loading capabilities vary by model.",
    heroTags: ["Input compatibility", "Pixel loading", "Playback workflow"],
    guideTitle: "Choose Around the Content & Screen", guideIntro: "Start with how the display will be used, then match the processor, output ports and receiving system.",
    guides: [
      { icon: "cast", title: "Live or Scheduled Content", points: ["Clarify live PC/camera input versus stored playback.", "Check scheduling and remote-management requirements.", "Confirm whether scaling or source switching is needed."] },
      { icon: "screen", title: "Resolution & Output Load", points: ["Provide total screen width and height in pixels.", "Check the model’s loading and port allocation limits.", "Include separate screens or unusual cabinet layouts."] },
      { icon: "cpu", title: "Inputs & Ecosystem", points: ["List the required HDMI, DVI, SDI or other sources.", "Confirm supported input formats and frame rates.", "Match the sender and receiving-card system."] },
    ],
    contextTitle: "Control That Fits the Way You Use Your Screen",
    contexts: [
      { icon: "clipboard", title: "Scheduled Signage", text: "Plan stored content, scheduling and supported network-management options for advertising displays." },
      { icon: "users", title: "Events & Presentations", text: "Match live sources, scaling and switching requirements to the event production workflow." },
      { icon: "screen", title: "Fixed Video Walls", text: "Map screen resolution, cabinet outputs and everyday operation before selecting a processor." },
    ],
    advice: "Controller, sender, media player and video processor are not interchangeable terms. Check the exact functions and supported receiving system in the selected model’s documentation.",
    checklist: [
      { icon: "screen", title: "Your Screen & Cabinets", points: ["Overall resolution in pixels and cabinet count", "Receiving-card model and screen connection plan", "Single-screen or multi-screen operation"] },
      { icon: "cast", title: "Your Sources & Operation", points: ["PC, camera, media player and required input ports", "Live switching, scaling or scheduled playback needs", "Network access, operator workflow and project quantity"] },
    ],
    faqs: [
      { q: "How is a controller different from a video processor?", a: "A controller handles the display-data or playback workflow, while a video processor typically handles source inputs, scaling and switching. Some devices combine functions. Check what the exact model includes rather than choosing by the product name alone." },
      { q: "How do I select a controller for my screen size?", a: "Share the full screen resolution in pixels, cabinet arrangement and receiving-card model. Selection also depends on per-port limits, input formats and the required operating mode—not physical screen dimensions alone." },
      { q: "Do rental and stage screens need a video processor?", a: "Live events often require scaling and switching between sources, so a suitable processor may be needed. The final setup depends on the event sources, screen resolution and features already available in the chosen control equipment." },
      { q: "Can I update content remotely?", a: "Some asynchronous controllers or media players support network-based content management and scheduling. Confirm the exact hardware, software, connectivity and any account or service requirements for your chosen model." },
      { q: "Can different controller and receiving-card brands be mixed?", a: "Do not assume cross-brand compatibility. Sender, receiving-card and configuration software support must be verified for the exact equipment. Use a documented compatible combination for the proposed screen." },
      { q: "What is included in a controller quotation?", a: "Ask for the exact model, required accessories, configuration and commissioning scope. Catalog prices are indicative; final pricing depends on the selected equipment, quantity, availability and project requirements." },
    ],
    cta: "Find the Control System Your Screen Needs.",
  },
  "power-supply": {
    label: "Power Supply", title: "LED Display Power Supplies", accent: "Plan Power with Confidence.", eyebrow: "CABINET POWER & RELIABILITY",
    description: "Compare LED cabinet power supplies with the voltage, current capacity and installation conditions your screen needs. Get help defining the right replacement or project scope.",
    metaDescription: "Compare LED display power supplies in Bangladesh. Explore 5V cabinet PSU models, indicative prices, load planning and compatibility with selection support.",
    image: { src: "/assets/led-display/power-supplies/G-Energy-5V-40A-LED-Display-Power-Supply.webp", width: 1000, height: 655, alt: "G-Energy 5V 40A LED cabinet power supply", caption: "G-Energy 5V 40A · Catalog example" },
    products: powerSupplyCatalog, productTitle: "Power Supplies for Your LED Cabinet", productIntro: "Compare the available 5V models. Confirm the required voltage, actual load and installation conditions before ordering.",
    heroTags: ["Voltage match", "Current capacity", "Cooling & fit"],
    guideTitle: "Select the PSU Around the Actual Load", guideIntro: "A higher current rating alone does not make a power supply the right fit for every cabinet.",
    guides: [
      { icon: "shield", title: "Voltage & Compatibility", points: ["Confirm the required DC voltage from the equipment label.", "Check the PSU model, output ratings and terminal layout.", "Match replacement dimensions and mounting provisions."] },
      { icon: "clipboard", title: "Load & Distribution", points: ["Provide module quantity and documented power demand.", "Allow for the manufacturer’s operating and derating limits.", "Have the cabinet’s distribution and protection reviewed."] },
      { icon: "settings", title: "Cooling & Environment", points: ["Check ventilation, cabinet temperature and clearance.", "Confirm enclosure suitability for the installation site.", "Include service access and installation conditions."] },
    ],
    contextTitle: "Power Planning for the Complete Cabinet",
    contexts: [
      { icon: "screen", title: "Indoor LED Screens", text: "Match module load and cabinet ventilation for everyday display operation." },
      { icon: "shield", title: "Outdoor Cabinets", text: "Review the protective enclosure and site conditions; an outdoor screen does not make every PSU weatherproof." },
      { icon: "settings", title: "Replacement & Maintenance", text: "Check the old PSU label and failure symptoms before selecting a compatible replacement." },
    ],
    advice: "Mains wiring, earthing, protection and PSU installation must be handled by a qualified technician. Isolate power before inspection or servicing; do not work on exposed live terminals.",
    checklist: [
      { icon: "cpu", title: "Your Existing Equipment", points: ["Clear PSU label and cabinet photos taken safely", "Required output voltage and module power specifications", "Module count, PSU quantity and mounting space"] },
      { icon: "pin", title: "Your Installation Conditions", points: ["Indoor/outdoor cabinet and ventilation arrangement", "New installation or replacement, plus observed symptoms", "Quantity and required delivery / installation scope"] },
    ],
    faqs: [
      { q: "How do I choose the correct LED power supply?", a: "Confirm the required output voltage, documented load, operating temperature, enclosure and mounting requirements. A technician should check the manufacturer’s ratings and derating guidance alongside the cabinet’s power distribution design." },
      { q: "Are all LED display power supplies 5V?", a: "No. The models listed here are 5V options, but the correct voltage comes from the specific module or equipment specification. Do not choose a replacement on current rating or physical appearance alone." },
      { q: "How many PSUs does a cabinet need?", a: "The quantity depends on module power demand, cabinet arrangement, PSU ratings, operating conditions and distribution design. Supply the equipment specifications for a project-specific recommendation rather than assuming a fixed PSU count per cabinet." },
      { q: "Can unstable power cause flicker or brightness differences?", a: "Power problems can contribute, but cabling, configuration, receiving cards and modules can also produce similar symptoms. Have a technician diagnose the system before replacing components." },
      { q: "Can these supplies be exposed outdoors?", a: "Do not assume so. Outdoor LED installations need an appropriate protective enclosure, ventilation and electrical design. Confirm the exact PSU’s environmental rating and installation requirements before use." },
      { q: "Do you provide replacement and installation support?", a: "Share the existing PSU label, cabinet details, quantity and site conditions. Sasha Corporation can help define a suitable supply and support scope. Electrical installation and testing should be completed by qualified personnel." },
    ],
    cta: "Choose Power That Fits Your LED System.",
  },
  "led-accessories": {
    label: "LED Accessories", title: "LED Accessories, Cables & Parts", accent: "The Details Behind a Better Setup.", eyebrow: "INSTALLATION, SERVICE & EVENT ESSENTIALS",
    description: "Find ribbon cables, connectors, module fixing hardware, mounting parts and transport essentials for your LED screen. Match each part to the cabinet and the way it will be used.",
    metaDescription: "Browse LED accessories in Bangladesh: ribbon cables, connectors, module magnets, mounting hardware, flight cases and distribution boxes. Request a project quote.",
    image: { src: "/assets/led-display/accessories/led-accessories-common.webp", width: 1353, height: 1163, alt: "LED power cable, ribbon cable, connector and module-fixing magnets", caption: "Cables, connectors & fixing hardware · Category overview" },
    products: ledAccessoriesCatalog, productTitle: "Complete Your Installation & Service Kit", productIntro: "Browse installation parts and event essentials. Confirm dimensions, connectors, ratings and quantities against your equipment.",
    heroTags: ["Cables & connectors", "Fixing & mounting", "Transport & events"],
    guideTitle: "Small Parts. Important Compatibility Checks.", guideIntro: "Choose accessories by specification and application—not just by appearance.",
    guides: [
      { icon: "cast", title: "Cables & Connectors", points: ["Match pin count, connector orientation and interface.", "Confirm cable length and the required electrical rating.", "Check compatibility with the receiving card and module."] },
      { icon: "settings", title: "Fixing & Mounting", points: ["Confirm the module fixing method and dimensions.", "Match hardware to the cabinet and service arrangement.", "Have structural and load requirements professionally reviewed."] },
      { icon: "shield", title: "Transport & Event Power", points: ["Match flight-case capacity to panel dimensions and weight.", "Specify the event equipment and distribution requirements.", "Confirm handling, cable management and protection scope."] },
    ],
    contextTitle: "Parts for Every Stage of Your LED Project",
    contexts: [
      { icon: "settings", title: "Installation", text: "Bring together the correct cables, connectors and mounting hardware for an organized build." },
      { icon: "clipboard", title: "Service & Spares", text: "Keep compatible replacement parts documented and available for planned maintenance." },
      { icon: "users", title: "Rental & Event Logistics", text: "Plan transport cases, handling and distribution equipment around your event workflow." },
    ],
    advice: "A connector’s appearance or a distribution box’s headline rating is not a complete compatibility check. Confirm the part specification; structural and mains-power work requires qualified personnel.",
    checklist: [
      { icon: "screen", title: "Your Parts & Equipment", points: ["Part photos, dimensions and connector close-ups", "Cabinet/module model and existing interface", "Required cable lengths, ratings and quantities"] },
      { icon: "clipboard", title: "Your Project & Use Case", points: ["Fixed installation, servicing or rental/event workflow", "Panel dimensions and weight for transport cases", "Mounting or distribution scope and delivery location"] },
    ],
    faqs: [
      { q: "Which accessories are needed for an LED installation?", a: "Typical requirements include suitable data and power cables, compatible connectors, fixing hardware and cable management. The exact list depends on the module, cabinet, installation method and site conditions." },
      { q: "How do I select a ribbon cable or IDC connector?", a: "Match the pin count, interface, orientation and length with the module, HUB board and receiving card. Share connector photos and equipment details; similar-looking parts are not always interchangeable." },
      { q: "Do accessories affect screen reliability?", a: "Correctly selected cables, connectors and fixing parts help avoid loose connections and simplify maintenance. Reliability also depends on installation quality, equipment compatibility and the wider system design." },
      { q: "When is a flight case useful?", a: "Flight cases are useful for rental equipment and frequent transport. Confirm internal dimensions, panel capacity, weight, packing arrangement and handling requirements for the specific equipment." },
      { q: "How do I choose an event power distribution box?", a: "A qualified technician should specify it around the supply, load, connectors, protective devices, earthing and site conditions. The printed current rating alone is not enough to confirm suitability for an event." },
      { q: "Can I request a complete accessory BOQ?", a: "Yes. Share cabinet/module information, quantities and the installation or rental workflow. Sasha Corporation can help prepare an itemized proposal; confirm dimensions, ratings, availability and all inclusions in the written quotation." },
    ],
    cta: "Complete Your LED Setup with the Right Parts.",
  },
};
