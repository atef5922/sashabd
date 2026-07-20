import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { buildProductMetadata, ensureMetaDescription } from "@/lib/seo";
import FaqAccordion from "@/components/common/FaqAccordion";
import { getPaSystemBySlug, paSystemCatalog, type PaSystemItem } from "./catalog";
import PaSystemProductDetailPage from "./PaSystemProductDetailPage";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const INVALID_STATIC_SLUGS = ["[slug]"];

export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = getPaSystemBySlug(slug);
  if (!item) return { title: "PA Sound System" };

  return buildProductMetadata({
    title: item.title,
    description:
      item.metaDescription ??
      ensureMetaDescription(
        item.subtitle,
        "PA sound system specifications, planning notes, cabling guidance, and installation support in Bangladesh."
      ),
    path: `/pa-system/${slug}`,
    image: item.image,
    openGraphTitle: `${item.title} | PA Sound System`,
  });
}

export async function generateStaticParams() {
  return [
    ...paSystemCatalog.map((x) => ({ slug: x.slug })),
    ...INVALID_STATIC_SLUGS.map((slug) => ({ slug })),
  ];
}

function extractWattFromTitle(title: string): string | null {
  const m = title.match(/(\d+)\s*W\b/i);
  return m?.[1] ? `${m[1]}W` : null;
}

function buildDetails(product: PaSystemItem): {
  overview: string;
  keyFeatures: string[];
  specs: { k: string; v: string }[];
  recommendedFor: string[];
  faqs: { q: string; a: string }[];
  description?: string;
} {
  const watts = extractWattFromTitle(product.title);

  switch (product.kind) {
    case "pa_rack_package":
      return {
        overview:
          "A PA rack package is a practical way to deploy a stable announcement system for schools and mosques. It focuses on clear voice, simple operation, and service-friendly rack wiring—typically centered around a 100V mixer amplifier and a desk paging microphone.",
        keyFeatures: [
          "Rack-based setup for neat, service-friendly wiring",
          "100V mixer amplifier suitable for multiple speakers",
          "Desk paging microphone for announcements and zone calling (system dependent)",
          "Supports background music input with paging priority (model dependent)",
        ],
        specs: [
          { k: "Package Type", v: "PA rack package" },
          { k: "Core Hardware", v: "100V mixer amplifier + paging microphone (typical)" },
          { k: "Speaker Compatibility", v: "100V line ceiling / wall / column / horn speakers" },
          { k: "Zones", v: "Single or multi-zone (project dependent)" },
          { k: "BGM", v: "Music input supported (model dependent)" },
          { k: "Installation", v: "Rack wiring + cabling plan + commissioning support" },
        ],
        recommendedFor: ["School announcements", "Mosque Azan & speech", "Prayer hall", "Corridors"],
        faqs: [
          {
            q: "What is included in a PA rack package?",
            a: "A typical package includes a 100V mixer amplifier and a desk paging microphone. Speakers, cabling, zoning, rack size and accessories are finalized based on your site layout and coverage needs.",
          },
        ],
      };

    case "analog_100v_line_system":
      return {
        overview:
          "An analog 100V line PA system is a proven approach for building-wide announcements and background music. It is planned as a complete BOQ so speaker quantity, tapping, cabling distance, and safety protection remain stable for daily operation.",
        keyFeatures: [
          "100V line distribution suitable for long cable runs",
          "Mixer amplifier based paging with mic + line inputs",
          "Works with wall/ceiling speakers in multiple zones",
          "Designed as a complete system with cabling and power planning",
        ],
        specs: [
          { k: "System Type", v: "Analog 100V line building PA" },
          { k: "Core Hardware", v: "Mixer amplifier + distributed speakers" },
          { k: "Paging", v: "Desk/zone paging mic (project dependent)" },
          { k: "BGM", v: "Music input supported (model dependent)" },
          { k: "Coverage", v: "Multi-room / multi-floor (layout dependent)" },
          { k: "Installation", v: "Cable routing + grounding + safety protection" },
        ],
        recommendedFor: ["School building", "Office floors", "Corridors", "General announcements"],
        faqs: [
          {
            q: "Why choose 100V line for a building PA system?",
            a: "100V line systems are practical for distributing audio to many speakers over longer distances. With correct tapping and planning, coverage stays stable and easier to maintain.",
          },
        ],
      };

    case "portable_pa":
      return {
        overview:
          "Portable PA sets are designed for quick setup and mobility. They are commonly used for coaching centres, training rooms, and small events where you need clear voice without permanent cabling.",
        keyFeatures: [
          "Portable all-in-one speaker + amplifier form factor",
          "Wireless microphones for flexible speaking position",
          "Battery operation for indoor/outdoor use (set dependent)",
          "Simple playback options for voice prompts and light music",
        ],
        specs: [
          { k: "System Type", v: "Portable PA (all-in-one)" },
          { k: "Power Class", v: watts ?? "Set dependent" },
          { k: "Microphone", v: "Wireless mics (set dependent)" },
          { k: "Playback", v: "USB/Bluetooth (model dependent)" },
          { k: "Power", v: "Battery + AC charging (set dependent)" },
          { k: "Use", v: "Training, coaching, small events" },
        ],
        recommendedFor: ["Coaching centre", "Training", "Small events", "Temporary announcements"],
        faqs: [
          {
            q: "Is portable PA suitable for big halls?",
            a: "Portable PA is best for small-to-mid spaces. For larger halls, distributed speakers or higher-power systems may be needed depending on coverage and ambient noise.",
          },
        ],
      };

    case "portable_speaker_amplifier":
      return {
        overview:
          "The TOA WA-Z110SD is a portable speaker amplifier for mobile PA, announcements, training, meetings and small outdoor programs. It combines amplifier, speaker, rechargeable battery, playback and microphone support in a single movable cabinet.",
        keyFeatures: [
          "70W portable speaker amplifier for PA and event sound systems",
          "USB, SD, MMC card and Bluetooth playback for direct audio use",
          "Optional UHF wireless microphone support with wired mic inputs",
          "Built-in rechargeable battery and retractable handle for mobile operation",
          "Remote control, CD player support and external audio input options",
          "Suitable for schools, mosques, training, meetings and outdoor programs",
        ],
        specs: [
          { k: "Brand", v: "TOA" },
          { k: "Model", v: "WA-Z110SD" },
          { k: "Product Type", v: "Portable Speaker with Amplifier" },
          { k: "Output Power", v: "70W RMS / 100W Max" },
          { k: "Speaker", v: "10-inch Woofer, 4 Ohm / 1-inch Tweeter" },
          { k: "Receiver Module", v: "UHF PLL Non-Diversity Receiver Module" },
          { k: "Frequency Response", v: "70Hz - 15kHz" },
          { k: "Playback Function", v: "USB, SD/MMC Card" },
          { k: "Wireless Function", v: "Bluetooth Support" },
          { k: "Microphone Input", v: "2 Phone Jack Inputs" },
          { k: "External Audio Input", v: "Line Input / AUX Input" },
          { k: "External Output", v: "Speaker Out and Line Out" },
          { k: "Battery Type", v: "12V / 5Ah Lead Acid Battery" },
          { k: "Battery Quantity", v: "2 Pieces" },
          { k: "Microphone Battery", v: "1.2V / 3Ah Ni-MH Battery" },
          { k: "Operating Time", v: "Approx. 3 Hours depending on volume" },
          { k: "Charging Time", v: "Approx. 9 Hours" },
          { k: "Power Supply", v: "100-240V AC, 50/60Hz" },
          { k: "Frame Material", v: "Robust Plastic Cabinet" },
          { k: "Dimensions", v: "560 x 320 x 300mm" },
          { k: "Weight", v: "Approx. 16.5kg without microphone" },
          { k: "Accessories", v: "Remote Control, AC Power Cord, Charger" },
          { k: "Optional Accessories", v: "Wireless Handheld / Lavalier Microphone" },
        ],
        recommendedFor: ["Schools", "Mosques", "Training rooms", "Outdoor programs"],
        description:
          "The TOA WA-Z110SD 70W Portable Speaker Amplifier is a dependable portable PA solution for schools, mosques, training rooms, meetings, coaching centers, outdoor programs and temporary announcement setups in Bangladesh. It combines a 70W RMS amplifier, 10-inch woofer, 1-inch tweeter, rechargeable battery, media playback and microphone connectivity in one mobile speaker cabinet. The built-in trolley handle and compact cabinet make it easier to move between classrooms, halls, prayer areas and event spaces without building a fixed speaker line. For daily voice reinforcement, the WA-Z110SD supports wired microphone input, optional UHF wireless microphone operation and Bluetooth playback, so presenters can speak, play audio and manage simple programs from a single unit. USB, SD and MMC card playback are useful for recorded announcements, recitation, background music and training material, while line input and AUX input allow connection with external audio sources. The speaker out and line out options help when a site needs additional routing or simple expansion. With a 70Hz to 15kHz frequency response, 12V lead acid battery system, approximately three hours of operation depending on volume and around nine hours charging time, it is practical for regular institutional use. The robust plastic cabinet is suitable for transport and everyday handling, and the included remote control, AC power cord and charger make operation convenient. Sasha Corporation can supply the TOA WA-Z110SD portable speaker amplifier with quotation support, microphone matching and setup guidance. If you need a branded portable sound system with clear speech, music playback and flexible power options, this model is a strong choice for mobile PA applications. It is especially helpful where permanent cabling is not possible or where one device must cover several rooms on different days. For PA system buyers, the TOA brand, practical controls and serviceable accessories make procurement and tender documentation easier for local project planning.",
        faqs: [
          {
            q: "Is the TOA WA-Z110SD suitable for outdoor programs?",
            a: "Yes, it is suitable for small outdoor programs and temporary announcements. Coverage depends on audience size, noise level and volume settings.",
          },
        ],
      };

    case "classroom_pa":
      return {
        overview:
          "A compact classroom PA package helps improve teacher voice clarity across a room. Final selection depends on classroom size, speaker placement, and how the microphone will be used during daily classes.",
        keyFeatures: [
          "Voice-focused package for one classroom area",
          "Typical set includes amplifier + speakers + mic",
          "Improves clarity and reduces strain during daily teaching",
          "Easy to scale for multiple classrooms by planning per room",
        ],
        specs: [
          { k: "System Type", v: "Compact classroom PA package" },
          { k: "Coverage", v: "Single classroom (layout dependent)" },
          { k: "Speaker Type", v: "Wall/ceiling (project dependent)" },
          { k: "Microphone", v: "Wired/wireless (project dependent)" },
          { k: "Power", v: watts ?? "Project dependent" },
          { k: "Installation", v: "Mounting + cable routing" },
        ],
        recommendedFor: ["Classroom", "Coaching centre", "Training room", "Small lecture room"],
        faqs: [
          {
            q: "Do I need wireless mic for classroom voice support?",
            a: "Not always. Wired is simple and reliable for desk-based use. Wireless is helpful if the teacher needs to move while speaking.",
          },
        ],
      };

    case "conference_discussion":
      return {
        overview:
          "Conference discussion systems are used for structured meetings where multiple participants speak in an organized way. They typically include a controller and chairman/delegate units to help manage speaking flow and clean pickup.",
        keyFeatures: [
          "Controller manages microphone units and speaking order",
          "Chairman/delegate units for meeting management",
          "Cleaner pickup for seated discussion layouts",
          "Integrates with PA/recording depending on project needs",
        ],
        specs: [
          { k: "System Type", v: "Digital conference discussion system" },
          { k: "Components", v: "Controller + discussion units" },
          { k: "Use", v: "Boardroom / meeting hall" },
          { k: "Control", v: "Priority / speaking management (model dependent)" },
          { k: "Installation", v: "Tabletop units + cabling/integration" },
          { k: "Integration", v: "PA / recording / broadcast (project dependent)" },
        ],
        recommendedFor: ["Boardroom", "Council room", "Meeting hall", "Training centre"],
        faqs: [
          {
            q: "Is this different from normal PA microphones?",
            a: "Yes. Discussion systems are designed to manage multiple tabletop microphones and meeting flow features that basic PA setups usually don’t provide.",
          },
        ],
      };

    case "bosch_ccs_900_ultra":
      return {
        overview:
          "The Bosch CCS 900 Ultra is a professional conference discussion system unit for structured meetings, boardrooms and council chambers. It supports clear speech control, delegate microphone management and feedback suppression in a compact control platform.",
        keyFeatures: [
          "Professional conference discussion system for meeting rooms",
          "Digital acoustic feedback suppression for stable speech pickup",
          "Supports up to 150 delegate units for larger meeting layouts",
          "Built-in control unit for easy management",
          "Clear and natural speech reproduction for formal discussions",
          "User-friendly operation and installation",
          "Tabletop or rack mount installation support",
          "Modern durable design for professional interiors",
        ],
        specs: [
          { k: "Model", v: "Bosch CCS 900 Ultra" },
          { k: "System Type", v: "Conference Discussion System" },
          { k: "Mains Voltage", v: "100 - 240 VAC +/-10%" },
          { k: "Power Consumption", v: "Max. 0.9A (100V) / 0.3A (240V)" },
          { k: "DC Supply to Units", v: "24V +/-1V" },
          { k: "Max Supported Units", v: "Up to 150" },
          { k: "Loudspeaker Volume Control", v: "Mute + 10 steps of 1.9dB" },
          { k: "Frequency Response", v: "Optimized for speech clarity" },
          { k: "Operating Mode", v: "Chairman & Delegate Units" },
          { k: "Mounting", v: "Tabletop / Rack Mount" },
          { k: "Dimensions", v: "84 x 361 x 143mm" },
          { k: "Weight", v: "Approx. 1.5kg" },
          { k: "Material", v: "Polymer & Metal" },
          { k: "Color", v: "Charcoal / Black" },
        ],
        recommendedFor: ["Boardrooms", "Meeting rooms", "Council chambers", "Conference halls"],
        description:
          "The Bosch CCS 900 Ultra Conference System Unit is a professional discussion system solution for boardrooms, meeting rooms, training halls, councils, conference venues and corporate presentation spaces in Bangladesh. It is designed to manage chairman and delegate microphones from one reliable control point, helping meetings run with clear speech, organized participation and less operator complexity. The system supports up to 150 delegate units, making it practical for small meeting tables as well as larger formal conference rooms. Digital acoustic feedback suppression helps reduce unwanted howling and improves speech clarity when microphones and loudspeakers are used in the same room. Built-in control functions make installation and daily operation easier, while the tabletop or rack mount option supports both portable and fixed AV rack setups. The unit supplies 24V DC power to connected conference units and operates from 100 to 240V AC mains, so it can fit typical professional installation environments. Loudspeaker volume control with mute and stepped adjustment helps operators balance room audio during discussion sessions. The Bosch CCS 900 Ultra is especially useful where natural speech reproduction, durable design and simple meeting management are more important than complex automation. Sasha Corporation can supply this conference system unit with delegate microphones, chairman units, PA integration, cable planning, rack setup and installation support. For customers searching conference system price in Bangladesh, Bosch CCS 900 Ultra offers a trusted branded option for dependable meeting audio, government meeting rooms, offices, institutions and seminar spaces. It is also suitable for tender and BOQ projects because key details such as mains voltage, supported units, dimensions, mounting method and material can be documented clearly. The compact body, charcoal black finish and polymer-metal construction help it blend into modern meeting interiors while staying service friendly for long-term professional use. Local service support keeps future maintenance planning easier too.",
        faqs: [
          {
            q: "How many delegate units can the Bosch CCS 900 Ultra support?",
            a: "It can support up to 150 delegate units, depending on the final conference system design and cabling plan.",
          },
        ],
      };

    case "bosch_ccs_cu_control_unit":
      return {
        overview:
          "The Bosch CCS-CU is a conference control and power unit for Bosch discussion systems. It powers delegate and chairman units, provides microphone modes, and supports PA, recorder, wireless microphone and telephone coupler integration.",
        keyFeatures: [
          "Conference control and power supply unit for Bosch discussion systems",
          "Powers delegate and chairman units from one central device",
          "Controls up to 150 delegate and chairman units",
          "Supplies power for up to 50 contribution units",
          "Built-in monitor loudspeaker for conference audio monitoring",
          "Multiple microphone modes for flexible meeting control",
          "Open mode allows selected microphones to stay active",
          "Override mode supports automatic microphone priority control",
          "Voice activated mode for hands-free microphone switching",
          "Audio interface support for PA system and external equipment",
        ],
        specs: [
          { k: "Brand", v: "Bosch" },
          { k: "Model", v: "CCS-CU" },
          { k: "Product Type", v: "Conference Control & Power Supply Unit" },
          { k: "System Compatibility", v: "Bosch Delegate and Chairman Units" },
          { k: "Control Capacity", v: "Up to 150 Contribution Units" },
          { k: "Power Supply Capacity", v: "Up to 50 Contribution Units" },
          { k: "Microphone Modes", v: "Open, Override, Voice Activated, Test" },
          { k: "Built-in Monitor", v: "Loudspeaker and Headphone Socket" },
          { k: "External Interface", v: "Wireless Microphone, PA System, Recorder, Telephone Coupler" },
          { k: "Mains Voltage", v: "100V to 240V AC +/-10%" },
          { k: "Current Consumption", v: "Maximum 0.9A at 100V AC / 0.3A at 240V AC" },
          { k: "DC Supply to Units", v: "24V +/-1V" },
          { k: "Loudspeaker Volume Control", v: "Mute -6dB and +10dB" },
          { k: "Headphone Output", v: "0.6dB at nominal loudspeaker/headphone level" },
          { k: "Open Microphone Gain Reduction", v: "NOM +3dB" },
          { k: "Total Harmonic Distortion", v: "<0.5%" },
          { k: "S/N Ratio", v: ">85dB" },
          { k: "Frequency Response", v: "25Hz to 12.5kHz" },
          { k: "Dimensions", v: "84 x 361 x 143mm" },
          { k: "Weight", v: "1.5kg" },
          { k: "Mounting", v: "Desktop / 19-inch Rack Flush Mounting" },
        ],
        recommendedFor: ["Boardrooms", "Conference halls", "Training rooms", "Offices"],
        description:
          "The Bosch CCS-CU Conference Control and Power Unit is a central controller for Bosch conference discussion systems, built for boardrooms, conference halls, training rooms, offices, institutions and meeting facilities in Bangladesh. It powers delegate and chairman units from one control device and helps manage formal discussion sessions with predictable audio control. The unit can control up to 150 delegate and chairman units and can supply power for up to 50 contribution units, making it suitable for small meeting rooms as well as larger conference layouts. Multiple microphone modes, including open, override, voice activated and test mode, help operators choose the right meeting workflow for different situations. Open mode allows selected microphones to remain active, override mode supports automatic microphone priority control, and voice activated mode enables hands-free microphone switching. Built-in monitor loudspeaker and headphone socket support conference audio monitoring during setup and live operation. External interface support for wireless microphones, PA systems, recorders and telephone couplers makes the CCS-CU useful when meeting audio must be connected to a wider sound or recording system. The unit operates from 100V to 240V AC mains, supplies 24V DC to connected units and includes loudspeaker volume control from mute to -6dB and +10dB. Sasha Corporation can supply the Bosch CCS-CU with conference microphones, cabling, PA integration, recorder connection, rack planning, installation and testing support. For buyers comparing conference control unit price in Bangladesh, this model is a strong branded option for stable meeting audio, central power distribution and flexible microphone control. It is especially useful for corporate boardrooms, government meeting rooms, council chambers, training centers and seminar halls. Its clear specifications also help with BOQ preparation, tender documentation and future service planning for professional conference systems. The compact desktop or rack flush mounting design supports neat installation and easier operator access during meetings today.",
        faqs: [
          {
            q: "What does the Bosch CCS-CU control unit do?",
            a: "It powers and manages Bosch delegate and chairman conference units, supports microphone modes, and can interface with PA, recording and external audio systems.",
          },
        ],
      };

    case "delegate_unit_microphone":
      return {
        overview:
          "The Ahuja CMD-7200 is a delegate unit microphone for digital conference and meeting systems. It provides speech pickup, LCD status display, voting support and RJ45 cabling for boardroom, seminar and council chamber installations.",
        keyFeatures: [
          "Delegate unit microphone for digital conference systems",
          "LCD display for mic ID, mic status, contrast and voting results",
          "Bright gooseneck condenser microphone for clear voice pickup",
          "Uniform LED indicator for microphone working status",
          "Voting and function buttons for meeting and decision-making sessions",
          "RJ45 connection port for CAT5e / CAT6 cable connection",
          "Unidirectional microphone for focused speech capture",
          "Ideal for boardrooms, seminar halls, offices and council chambers",
        ],
        specs: [
          { k: "Brand", v: "Ahuja" },
          { k: "Model", v: "CMD-7200" },
          { k: "Series", v: "CM-7000" },
          { k: "Product Type", v: "Delegate Unit Microphone" },
          { k: "Microphone Type", v: "Unidirectional Condenser" },
          { k: "Microphone Sensitivity", v: "7mV/Pa" },
          { k: "Frequency Response", v: "100Hz - 15,000Hz" },
          { k: "Impedance", v: "1000 ohm" },
          { k: "Connection", v: "RJ45 Port" },
          { k: "Cable Support", v: "CAT5e / CAT6 Cable" },
          { k: "Display", v: "LCD Display" },
          { k: "Display Information", v: "Mic ID, Mic Status, Contrast, Voting Results" },
          { k: "Control Function", v: "Voting Buttons, Function Buttons" },
          { k: "Voting Support", v: "Yes" },
          { k: "LED Indicator", v: "Microphone LED Indicator" },
          { k: "Dimensions", v: "W145 x H65 x D175mm" },
          { k: "Weight", v: "550g" },
          { k: "Application", v: "Conference System, Digital Meeting, Voting System" },
          { k: "Suitable For", v: "Boardroom, Office, Seminar Hall, Council Chamber" },
        ],
        recommendedFor: ["Boardrooms", "Offices", "Seminar halls", "Council chambers"],
        description:
          "The Ahuja CMD-7200 Delegate Unit Microphone is a professional tabletop conference microphone designed for digital meeting rooms, boardrooms, council chambers, seminar halls and office discussion spaces where every speaker needs clear, controlled voice pickup. It works as a delegate unit in the Ahuja CM-7000 series conference system and combines a unidirectional condenser microphone, LCD display, voting buttons and function controls in one compact desktop base. The focused pickup pattern helps reduce unwanted side noise, so speech stays more intelligible during long meetings, committee sessions and formal presentations. The built-in display can show microphone ID, mic status, contrast settings and voting results, which makes meeting operation easier for operators and participants. RJ45 connectivity with CAT5e or CAT6 cable keeps installation neat and service friendly, especially when multiple delegate units are arranged across a table. A uniform LED indicator makes microphone status visible at a glance, while the voting support is useful for councils, associations, institutions and corporate decision-making rooms. With 100Hz to 15,000Hz frequency response, 7mV/Pa sensitivity and 1000 ohm impedance, the CMD-7200 is suitable for speech-focused conference audio. The low-profile housing looks clean on professional meeting tables and is easy to place in fixed seating layouts. Sasha Corporation can supply this delegate microphone as part of a complete digital conference system in Bangladesh, including chairman units, control unit, cabling, PA integration, recording support and installation planning. If you are building a modern boardroom or upgrading an older meeting room, this model is a practical choice for structured discussion, clear speech capture and organized voting workflow. It is also useful for tender-based conference projects because the model name, dimensions, connection type and technical values are easy to document in a BOQ. For buyers comparing delegate microphones in Bangladesh, it offers a balanced mix of control, display feedback and clean speech performance.",
        faqs: [
          {
            q: "Can the Ahuja CMD-7200 be used alone?",
            a: "It is designed as a delegate unit for a compatible Ahuja digital conference system. A complete setup normally includes controller, chairman/delegate units and proper CAT5e/CAT6 cabling.",
          },
        ],
      };

    case "toa_uhf_wireless_microphone":
      return {
        overview:
          "The TOA WT-5810 + WM-5225 is a UHF wireless microphone package for clear speech, presentation and vocal pickup. It combines a WT-5810 receiver with a WM-5225 handheld microphone for stable PA system use.",
        keyFeatures: [
          "UHF wireless microphone system for speech and vocal use",
          "Includes WT-5810 receiver and WM-5225 handheld microphone",
          "PLL synthesized system for stable frequency operation",
          "100 selectable channels for flexible setup",
          "Double super-heterodyne receiving system for reliable performance",
          "Space diversity antenna system for improved signal reception",
          "Clear voice pickup for announcements and presentations",
          "Balanced and unbalanced output support for PA integration",
          "Ideal for schools, mosques, offices, halls and conference rooms",
        ],
        specs: [
          { k: "Brand", v: "TOA" },
          { k: "Model", v: "WT-5810 + WM-5225" },
          { k: "Product Type", v: "UHF Wireless Microphone System" },
          { k: "Receiver Model", v: "WT-5810" },
          { k: "Microphone Model", v: "WM-5225" },
          { k: "Wireless Type", v: "UHF" },
          { k: "Power Source", v: "AC Mains with AC Adapter" },
          { k: "Power Consumption", v: "130mA / 12V DC" },
          { k: "Receiving Frequency", v: "576 - 865MHz UHF" },
          { k: "Channel Selectable", v: "100 Channels" },
          { k: "Receiving System", v: "Double Super-Heterodyne" },
          { k: "Diversity System", v: "Space Diversity" },
          { k: "Antenna", v: "Whip Antenna" },
          { k: "Receiving Sensitivity", v: "90dB or more" },
          { k: "Squelch Sensitivity", v: "16 - 40dB Variable" },
          { k: "Tone Frequency", v: "32.768kHz" },
          { k: "Indicator", v: "Ant A/B, Audio Peak, Battery Alarm, Channel Number" },
          { k: "Mixing Output", v: "MIC / LINE Balanced, XLR-3-32 Type Connector" },
          { k: "Mixing Input", v: "-30dB, 10k ohm, Unbalanced Phone Jack" },
          { k: "Signal to Noise Ratio", v: "104dB or More" },
          { k: "Harmonic Distortion", v: "1% or Less" },
          { k: "Frequency Response", v: "100Hz - 15kHz" },
          { k: "Operating Temperature", v: "-10C to +50C" },
          { k: "Operating Humidity", v: "30% to 85% RH" },
          { k: "Finish", v: "Black" },
          { k: "Dimensions", v: "206 x 40 x 172mm" },
          { k: "Weight", v: "Approx. 0.7kg" },
          { k: "Accessory", v: "AC Adapter" },
        ],
        recommendedFor: ["Schools", "Mosques", "Offices", "Conference rooms"],
        description:
          "The TOA WT-5810 + WM-5225 UHF Wireless Microphone System is a professional wireless microphone package for speech, presentation, meeting, mosque, school, office, hall and event sound applications in Bangladesh. It pairs the WT-5810 receiver with the WM-5225 handheld microphone, giving users a stable UHF setup for clear voice pickup and flexible movement on stage or inside a room. The PLL synthesized system supports 100 selectable channels, helping installers choose a cleaner frequency when several wireless devices are used in the same venue. Its double super-heterodyne receiving system and space diversity antenna design improve reception stability, while the channel check function makes setup and monitoring easier. The microphone is suitable for PA systems where balanced and unbalanced output options are needed for mixers, amplifiers or audio processors. A low handling noise design helps speech sound more natural, and the squelch function reduces unwanted noise when signal conditions change. With 576 to 865MHz UHF operation, 100Hz to 15kHz frequency response and 104dB or more signal-to-noise ratio, the system is designed for reliable speech and vocal performance. The receiver includes useful indicators for antenna A/B, audio peak, battery alarm and channel number, so operators can monitor performance during live use. Sasha Corporation can supply the TOA WT-5810 WM-5225 wireless microphone with PA system planning, mixer matching, amplifier integration and installation support. For customers comparing branded wireless microphones in Bangladesh, this system is a strong choice when you need clean voice pickup, dependable RF operation, flexible channel selection and professional connection options for regular events, lectures and announcements. It is practical for conference rooms, training centers, worship spaces and portable sound packages where cable-free speaking is important. The black finish, compact receiver and AC adapter accessory also make it simple to document in quotations, tenders and institutional procurement lists for many audio projects today.",
        faqs: [
          {
            q: "Where can the TOA WT-5810 WM-5225 wireless microphone be used?",
            a: "It is suitable for schools, mosques, offices, halls, conference rooms and PA systems where stable UHF wireless speech pickup is needed.",
          },
        ],
      };

    case "cabinet_loudspeaker_30w":
      return {
        overview:
          "The Bosch LB2-UC30 is a compact 30W cabinet loudspeaker for speech, foreground music and background music. It supports 70V/100V line systems, low impedance input and wall-mount installation.",
        keyFeatures: [
          "30W cabinet loudspeaker for PA and music systems",
          "Clear speech and music reproduction for commercial sound use",
          "Suitable for indoor and outdoor applications",
          "70V and 100V line support for professional PA installation",
          "6-ohm input support for flexible audio connection",
          "IP65 weather-resistant rating for dust and moisture protection",
          "Adjustable mounting bracket for easy wall installation",
          "Available in black and white color options",
          "Ideal for offices, malls, schools, restaurants, hospitals and showrooms",
        ],
        specs: [
          { k: "Brand", v: "Bosch" },
          { k: "Model", v: "LB2-UC30" },
          { k: "Product Type", v: "Cabinet Loudspeaker" },
          { k: "Rated Power", v: "30W" },
          { k: "Maximum Power", v: "45W" },
          { k: "Power Tapping", v: "30W / 15W / 7.5W" },
          { k: "System Support", v: "70V / 100V Line" },
          { k: "Low Impedance Input", v: "6 Ohm" },
          { k: "Sound Pressure Level", v: "105 / 90dB SPL" },
          { k: "Effective Frequency Range", v: "100Hz - 18.5kHz" },
          { k: "Opening Angle", v: "1kHz: 180deg / 4kHz: 76deg / 8kHz: 150deg" },
          { k: "Rated Input Voltage", v: "15.5V / 70V / 100V" },
          { k: "Rated Impedance", v: "8 ohm / 163 ohm / 333 ohm" },
          { k: "Transducers", v: "127mm Woofer, 13mm Dome Tweeter" },
          { k: "Dimensions", v: "250 x 160 x 140mm" },
          { k: "Weight", v: "Approx. 2.4kg" },
          { k: "Protection Rating", v: "IP65" },
          { k: "Mounting", v: "Adjustable Wall-Mount Bracket" },
          { k: "Color Options", v: "Black / White" },
          { k: "Application", v: "Speech, Foreground Music, Background Music" },
        ],
        recommendedFor: ["Offices", "Malls", "Schools", "Showrooms"],
        description:
          "The Bosch LB2-UC30 30W Cabinet Loudspeaker is a compact professional cabinet speaker for PA announcements, foreground music and background music in offices, schools, restaurants, hospitals, shopping malls, showrooms and commercial buildings in Bangladesh. It is designed for clear speech reproduction and reliable music playback, making it useful where one speaker must support both daily paging and pleasant audio coverage. The LB2-UC30 supports 70V and 100V line systems, so it can be used in distributed PA installations with multiple speakers across corridors, rooms and public spaces. It also includes a 6-ohm low impedance input for flexible connection when the system design requires it. With 30W rated power, 45W maximum power and selectable 30W, 15W and 7.5W tapping, installers can balance coverage, amplifier capacity and zone planning more precisely. The speaker uses a 127mm woofer and 13mm dome tweeter to deliver a wide effective frequency range from 100Hz to 18.5kHz. Its IP65 weather-resistant rating makes it suitable for many indoor and protected outdoor applications, while the adjustable wall-mount bracket helps achieve practical aiming and neat installation. Available black and white color options allow the speaker to match different interior designs. Sasha Corporation can supply the Bosch LB2-UC30 cabinet loudspeaker as part of a full PA sound system with amplifier selection, speaker layout, cable planning and installation support. For buyers looking for a branded cabinet loudspeaker in Bangladesh, this model is a dependable choice for speech clarity, foreground music and background music in professional spaces. It works well in reception areas, classrooms, meeting rooms, retail floors and hospitality environments where sound quality and clean appearance both matter. The clear specification, compact dimensions and light weight make it convenient for quotation, tender documentation and fast on-site installation for long-term commercial audio projects everywhere across demanding public address installations in Bangladesh and future maintenance planning.",
        faqs: [
          {
            q: "Can the Bosch LB2-UC30 be used outdoors?",
            a: "It has an IP65 rating and can be used in many indoor and protected outdoor PA applications when installed correctly.",
          },
        ],
      };

    case "bosch_ple_4ma240_mixer_amp":
      return {
        overview:
          "The Bosch PLE-4MA240 is a 240W 4-zone mixer amplifier for professional public address and background music systems. It provides Class-D efficiency, multiple inputs, emergency support and flexible standalone or rack installation.",
        keyFeatures: [
          "240W powerful output for professional PA and background music systems",
          "4-zone audio control for separate area-wise sound distribution",
          "Class-D mixer amplifier with efficient performance and low power consumption",
          "3 microphone/line inputs for paging, announcements and voice input",
          "3 music source inputs for flexible background music connection",
          "3.5mm mini-jack input for easy external audio device connection",
          "Telephone and 100V emergency input for priority announcement support",
          "24V DC volume override output for important message broadcasting",
          "No active cooling required, ensuring quiet and reliable operation",
          "Standalone or 19-inch rack mounting for flexible installation",
        ],
        specs: [
          { k: "Brand", v: "Bosch" },
          { k: "Model", v: "PLE-4MA240" },
          { k: "Product Type", v: "4-Zone Mixer Amplifier" },
          { k: "Output Power", v: "240W" },
          { k: "Rated Output", v: "340W" },
          { k: "Zones", v: "4 Zones" },
          { k: "Amplifier Type", v: "Class-D Mixer Amplifier" },
          { k: "Cooling", v: "No active cooling" },
          { k: "Microphone Inputs", v: "3 Mic/Line Inputs" },
          { k: "Music Inputs", v: "3 Music Source Inputs" },
          { k: "Mini Jack Input", v: "3.5mm Mini-Jack Input" },
          { k: "Telephone Input", v: "Yes" },
          { k: "Emergency Input", v: "100V Emergency Input" },
          { k: "Priority Control", v: "24V DC Output for Loudspeaker Volume Control Override" },
          { k: "Frequency Response", v: "70Hz to 18kHz" },
          { k: "Distortion", v: "<1% at rated output power" },
          { k: "Bass Control", v: "+/-12dB" },
          { k: "Treble Control", v: "+/-12dB" },
          { k: "Line Output", v: "1x" },
          { k: "Line Output Connector", v: "3-pin Euro Style Pluggable Screw Terminal" },
          { k: "Loudspeaker Output", v: "Stereo, Floating" },
          { k: "Power Supply", v: "230V AC +/-10%, 50Hz" },
          { k: "Mounting", v: "Standalone / 19-inch Rack" },
          { k: "Color", v: "Charcoal" },
          { k: "Weight", v: "Approx. 9kg" },
          { k: "Dimensions", v: "100 x 430 x 270mm" },
          { k: "Operating Temperature", v: "-10C to +45C" },
          { k: "Storage Temperature", v: "-40C to +70C" },
          { k: "Relative Humidity", v: "<95%" },
        ],
        recommendedFor: ["Offices", "Schools", "Mosques", "Factories"],
        description:
          "The Bosch PLE-4MA240 240W 4-Zone Mixer Amplifier is a professional PA amplifier for offices, schools, mosques, malls, factories, hospitals and commercial sound systems in Bangladesh. It combines powerful 240W output with four-zone audio control, making it practical for buildings where announcements and background music need to be distributed area by area. The Class-D mixer amplifier design supports efficient performance with low power consumption, while no active cooling helps keep operation quiet and reliable in control rooms or rack installations. With 3 microphone or line inputs, 3 music source inputs and a 3.5mm mini-jack input, the PLE-4MA240 can connect paging microphones, audio players, phones and external sound sources for daily use. Telephone and 100V emergency input support make it suitable for important message broadcasting, paging priority and integration with safety communication planning. The 24V DC override output for loudspeaker volume control helps critical announcements remain audible even when local volume controls are reduced. Bass and treble controls allow operators to adjust sound for speech clarity and background music balance. The amplifier supports stereo and floating loudspeaker output and can be installed as a standalone unit or in a 19-inch rack. Sasha Corporation can supply the Bosch PLE-4MA240 mixer amplifier with speaker matching, zone planning, cable layout, rack setup, testing and installation support. For customers comparing Bosch mixer amplifier price in Bangladesh, this model is a strong choice when a project needs reliable branded amplification, multi-zone control and flexible input options. It is especially useful for schools, mosques, retail floors, offices, factories and commercial buildings where centralized PA control must stay simple, stable and easy to maintain. Clear specifications also make it suitable for BOQ, tender submission and long-term maintenance documentation. This keeps procurement, installation, handover and future service easier for professional public address projects nationwide with dependable Bosch audio performance daily.",
        faqs: [
          {
            q: "How many zones does the Bosch PLE-4MA240 support?",
            a: "It supports 4-zone audio control, making it suitable for separate area-wise paging and background music distribution.",
          },
        ],
      };

    case "stereo_mixer_14ch":
      return {
        overview:
          "The Ahuja PROMIX-1442R is a 14-channel stereo audio mixer for PA systems, live sound, recording and stage performance. It offers multiple mic inputs, line inputs, Bluetooth, MP3 recording and digital effects.",
        keyFeatures: [
          "14-channel stereo audio mixer for PA and live sound systems",
          "12 microphone inputs for vocals, speech and instruments",
          "10 line balanced mono inputs for flexible audio connection",
          "2 stereo balanced inputs for external music sources",
          "Built-in MP3 recorder with USB playback support",
          "Bluetooth function for wireless audio playback",
          "24 digital effects processor for enhanced sound output",
          "48V phantom power for condenser microphones",
          "Balanced XLR microphone inputs for low-noise audio connection",
          "Ideal for stage shows, events, studios, mosques, halls and PA systems",
        ],
        specs: [
          { k: "Brand", v: "Ahuja" },
          { k: "Model", v: "PROMIX-1442R" },
          { k: "Product Type", v: "Stereo Audio Mixing Console" },
          { k: "Input Channels", v: "14 Channels" },
          { k: "Microphone Inputs", v: "12 Mic Inputs" },
          { k: "Line Inputs", v: "10 Line Balanced Mono Inputs" },
          { k: "Stereo Inputs", v: "2 Stereo Balanced Inputs" },
          { k: "Group Outputs", v: "2 Group Outputs" },
          { k: "Mic Input Impedance / Gain", v: "2k ohm Balanced / 65dB" },
          { k: "Line Input Impedance / Gain", v: "20k ohm Balanced / 45dB" },
          { k: "Stereo Input Impedance / Gain", v: "10k ohm Balanced / 20dB" },
          { k: "THD", v: "<0.08%" },
          { k: "Frequency Response", v: "25Hz - 20kHz, +0 / -1dB" },
          { k: "Equalization", v: "High, Mid, Low" },
          { k: "EQ Range", v: "+/-12dB" },
          { k: "Digital Effects", v: "24 Effects Digital Processor" },
          { k: "Digital Player", v: "MP3 Player with Recording and Bluetooth" },
          { k: "Phantom Power", v: "48V" },
          { k: "Headphone Output", v: "200mW at 8 ohm, THD <1%" },
          { k: "Line Output Level", v: "4dBu / 21dBu" },
          { k: "Line Output Impedance", v: "600 ohm" },
          { k: "Monitor Output", v: "1V" },
          { k: "Tape Output", v: "775mV" },
          { k: "Tape Input", v: "100mV" },
          { k: "Signal-to-Noise Ratio", v: ">80dB" },
          { k: "Power Supply", v: "AC 220-240V, 50/60Hz" },
          { k: "Dimensions", v: "W560 x H111 x D410mm" },
          { k: "Weight", v: "6.70kg" },
          { k: "Application", v: "PA System, Live Sound, Recording, Stage Performance" },
        ],
        recommendedFor: ["Stage shows", "Mosques", "Halls", "Recording"],
        description:
          "The Ahuja PROMIX-1442R 14-Channel Stereo Mixer is a professional audio mixing console for PA systems, live sound, recording, stage performance, mosque sound, halls, studios and event production in Bangladesh. It provides 14 input channels, including 12 microphone inputs, 10 balanced mono line inputs and 2 stereo balanced inputs, giving operators enough flexibility to manage vocals, speech microphones, instruments and external music sources from one console. The mixer is suitable for venues that need more control than a simple amplifier mixer can provide, especially when multiple microphones, playback devices and output routes are used together. Built-in Bluetooth, MP3 playback and recording support make the PROMIX-1442R practical for modern sound setups, while the 24-effect digital processor helps add controlled effects for vocals and stage programs. The 48V phantom power support allows compatible condenser microphones to be used for clearer pickup when required. Balanced XLR microphone inputs, group outputs, monitor output, tape input and tape output help integrate the mixer with amplifiers, processors, recording equipment and PA racks. Its three-band equalization with high, mid and low controls, +/-12dB EQ range and 25Hz to 20kHz frequency response support cleaner sound shaping during live operation. The low THD value and more than 80dB signal-to-noise ratio make it suitable for professional audio routing where speech and music need to stay clear. Sasha Corporation can supply the Ahuja PROMIX-1442R stereo mixer with PA system planning, microphone matching, amplifier integration and setup guidance. For customers comparing audio mixers in Bangladesh, this model is a strong choice when a venue needs many microphone channels, digital effects, Bluetooth playback, recording capability and dependable control for daily events. It is useful for auditoriums, community halls, training centers, worship spaces and stage programs where clear mixing and organized routing are essential for reliable sound with confident operator control every day in practice.",
        faqs: [
          {
            q: "Is the Ahuja PROMIX-1442R suitable for live events?",
            a: "Yes. It is suitable for live sound, PA systems, stage programs, mosque sound, halls and recording setups that need multiple microphone and line inputs.",
          },
        ],
      };

    case "bosch_lc9_uc06_ceiling_speaker":
      return {
        overview:
          "The Bosch LC9-UC06 is a compact 6W ceiling speaker with metal grill for PA announcements, paging and background music. It supports 100V transformer taps and simple ceiling installation with integral mounting clips.",
        keyFeatures: [
          "6W ceiling speaker for PA and background music systems",
          "Compact general-purpose design for commercial indoor use",
          "Perforated metal grill for protection and clean appearance",
          "Wide opening angle for better sound coverage",
          "Clear speech and music performance for daily announcements",
          "100V line transformer support for professional PA installation",
          "Transformer taps: 6W, 3W and 1.5W for flexible sound level setting",
          "Integral mounting clips for easy ceiling installation",
          "Lightweight 0.6kg design for simple handling",
          "Ideal for offices, schools, malls, hospitals, restaurants and showrooms",
        ],
        specs: [
          { k: "Brand", v: "Bosch" },
          { k: "Model", v: "LC9-UC06" },
          { k: "Product Type", v: "Ceiling Speaker" },
          { k: "Power Handling", v: "6W" },
          { k: "Rated Frequency Range", v: "-10dB: 80Hz - 20kHz" },
          { k: "Frequency Response", v: "Peak -20dB: 65Hz - 20kHz" },
          { k: "Sensitivity", v: "91dB / 1W / 1m" },
          { k: "Sensitivity SPL", v: "1W / 1m: 92dB" },
          { k: "Maximum SPL", v: "1W / 1m: 100dB" },
          { k: "Coverage Pattern", v: "1kHz / 4kHz: 68deg / 180deg / 170deg" },
          { k: "Rated Impedance", v: "1667 ohm @ 6W, 3333 ohm @ 3W, 6667 ohm @ 1.5W" },
          { k: "Input Configuration", v: "100V" },
          { k: "Transformer Taps", v: "6W, 3W, 1.5W" },
          { k: "Dimensions", v: "Diameter 204 x 70mm" },
          { k: "Grill Type", v: "Metal Grill" },
          { k: "Mounting", v: "Ceiling Mount with Integral Clips" },
          { k: "Weight", v: "0.6kg" },
        ],
        recommendedFor: ["Offices", "Schools", "Malls", "Hospitals"],
        description:
          "The Bosch LC9-UC06 6W Ceiling Speaker with Metal Grill is a compact general-purpose ceiling speaker for PA announcements, paging and background music in offices, schools, malls, hospitals, restaurants, showrooms and commercial interiors in Bangladesh. It is designed for clean ceiling installation where the speaker should blend into the room while still delivering clear speech and music performance. The 6W power handling is suitable for distributed PA systems that use multiple ceiling speakers across corridors, rooms, reception areas and retail floors. A perforated metal grill gives the front side a neat appearance while helping protect the speaker assembly during daily use. The wide opening angle supports better sound coverage, making it easier to maintain balanced audio in normal ceiling layouts. With 100V line transformer support and taps for 6W, 3W and 1.5W, installers can set each speaker level according to room size, amplifier capacity and zone planning. The model offers rated frequency response from 80Hz to 20kHz and peak response from 65Hz to 20kHz, supporting both voice announcements and light background music. Integral mounting clips help simplify ceiling installation, while the lightweight 0.6kg design makes handling easier during larger projects. Sasha Corporation can supply the Bosch LC9-UC06 ceiling speaker with amplifier selection, tapping calculation, wiring plan, installation and testing support. For customers searching Bosch ceiling speaker price in Bangladesh, this model is a dependable option when a project needs branded quality, compact design and practical 100V line compatibility. It works well in public address systems for schools, offices, hospitals, shopping areas and restaurants where everyday announcements must remain clear. The simple specification, metal grill and standard ceiling mount design also make it useful for BOQ preparation, tender documentation and maintenance planning across multi-room PA installations. It is a practical speaker for projects needing clean appearance and easy repeat installation work nationwide.",
        faqs: [
          {
            q: "Does the Bosch LC9-UC06 support 100V PA systems?",
            a: "Yes. It supports 100V line input with 6W, 3W and 1.5W transformer taps for distributed PA installations.",
          },
        ],
      };

    case "bosch_ceiling_loudspeaker_30w":
      return {
        overview:
          "The Bosch LC2-PC30G6-8 is a 30W ceiling loudspeaker for professional PA announcements and background music. It combines an 8-inch coaxial two-way design, 70V/100V line support and a clean white ceiling-mount finish.",
        keyFeatures: [
          "30W ceiling loudspeaker for professional PA and background music systems",
          "8-inch coaxial two-way speaker for clear and balanced sound",
          "Waveguide-coupled tweeter for improved audio coverage",
          "Wide frequency range from 50Hz to 20000Hz",
          "70V / 100V line support for commercial audio installations",
          "Full bandwidth overload protection for safer operation",
          "Front baffle wattage tap adjustment for easy setup",
          "White ceiling-mount design suitable for modern interiors",
          "BS 5839-8 and EN 60849 compliant",
          "Ideal for offices, malls, hotels, hospitals, schools and conference rooms",
        ],
        specs: [
          { k: "Brand", v: "Bosch" },
          { k: "Model", v: "LC2-PC30G6-8" },
          { k: "Product Type", v: "Ceiling Loudspeaker" },
          { k: "Speaker Size", v: "8 inch" },
          { k: "Rated Power", v: "30W" },
          { k: "Speaker Design", v: "Coaxial Two-Way" },
          { k: "Tweeter Type", v: "Waveguide Coupled Tweeter" },
          { k: "Frequency Range", v: "50Hz - 20000Hz" },
          { k: "Rated Input Voltage", v: "70V / 100V" },
          { k: "Sensitivity", v: "91dB" },
          { k: "Color", v: "White" },
          { k: "Material", v: "Steel, Plastic" },
          { k: "Operating Temperature", v: "-25C to +55C" },
          { k: "Storage Temperature", v: "-40C to +70C" },
          { k: "Operating Relative Humidity", v: "0% - 95% Non-Condensing" },
          { k: "Protection", v: "Full Bandwidth Overload Protection" },
          { k: "Wattage Adjustment", v: "Front Baffle Wattage Tap Adjustment" },
          { k: "Compliance", v: "BS 5839-8, EN 60849" },
          { k: "Weight", v: "5kg" },
        ],
        recommendedFor: ["Offices", "Malls", "Hotels", "Conference rooms"],
        description:
          "The Bosch LC2-PC30G6-8 30W Ceiling Loudspeaker is a professional ceiling speaker for PA announcements, background music and commercial audio installations in offices, malls, hotels, hospitals, schools, meeting rooms and conference spaces in Bangladesh. It uses an 8-inch coaxial two-way design with a waveguide-coupled tweeter, helping deliver clear balanced sound from a discreet ceiling-mount position. The 30W rated power makes it suitable for areas that need stronger coverage than basic low-watt ceiling speakers, while the 70V and 100V line support allows integration into distributed public address systems. A wide 50Hz to 20000Hz frequency range supports both speech clarity and fuller background music playback. The white ceiling-mount design works well in modern interiors where speakers should remain visually clean and unobtrusive. Front baffle wattage tap adjustment helps installers configure output level without complicated access, making commissioning and future maintenance easier. Full bandwidth overload protection adds reliability for daily commercial operation, and compliance with BS 5839-8 and EN 60849 makes it suitable for more demanding professional audio and voice announcement projects. The speaker is built with steel and plastic materials and is designed for indoor environments with operating temperatures from -25C to +55C and non-condensing humidity up to 95 percent. Sasha Corporation can supply the Bosch LC2-PC30G6-8 ceiling loudspeaker with amplifier selection, speaker layout, cable planning, tapping calculation, installation and testing support. For customers looking for Bosch ceiling speaker price in Bangladesh, this model is a dependable choice when clear audio, branded reliability and professional PA integration are required. It is useful for reception areas, corridors, retail floors, hotel lobbies, training rooms and conference facilities where both voice announcements and background music need to sound clean. The specification is easy to include in BOQ documents, especially for projects requiring 30W ceiling loudspeakers with 100V line support and stable long-term sound system maintenance planning.",
        faqs: [
          {
            q: "Where is the Bosch LC2-PC30G6-8 ceiling loudspeaker suitable?",
            a: "It is suitable for offices, malls, hotels, hospitals, schools, conference rooms and other commercial PA or background music installations.",
          },
        ],
      };

    case "toa_tz_105_column_speaker":
      return {
        overview:
          "The TOA TZ-105 is a 10W slim column speaker for speech, paging, announcements and light background music. It is designed for 100V line PA systems and neat wall-mount indoor installation.",
        keyFeatures: [
          "10W column speaker for PA and background music systems",
          "Clear speech reproduction for paging and announcements",
          "Slim column design for professional indoor installation",
          "100V line support for commercial PA speaker systems",
          "Wall-mount installation for flexible placement",
          "Durable metal enclosure for long-term use",
          "Suitable for voice and light background music",
          "Easy integration with TOA mixer amplifiers",
          "Ideal for schools, mosques, offices, halls and corridors",
          "Trusted TOA quality for reliable sound performance",
        ],
        specs: [
          { k: "Brand", v: "TOA" },
          { k: "Model", v: "TZ-105" },
          { k: "Product Type", v: "Column Speaker" },
          { k: "Rated Input", v: "10W" },
          { k: "Speaker System", v: "Column Type Speaker" },
          { k: "System Support", v: "100V Line PA System" },
          { k: "Sound Use", v: "Speech, Paging, Announcement, Background Music" },
          { k: "Installation Type", v: "Wall Mount" },
          { k: "Enclosure Type", v: "Slim Column Cabinet" },
          { k: "Body Material", v: "Metal Enclosure" },
          { k: "Finish", v: "Light Gray / Silver Tone" },
          { k: "Audio Performance", v: "Clear Voice Reproduction" },
          { k: "Compatible Device", v: "PA Amplifier / Mixer Amplifier" },
          { k: "Application Area", v: "Indoor Commercial Sound System" },
          { k: "Suitable For", v: "School, Mosque, Office, Hospital, Hall, Corridor" },
          { k: "Recommended Use", v: "Paging and Public Address System" },
          { k: "Build Quality", v: "Durable Professional Design" },
        ],
        recommendedFor: ["Schools", "Mosques", "Offices", "Corridors"],
        description:
          "The TOA TZ-105 10W Column Speaker is a slim professional PA speaker for clear voice announcements, paging and background music in schools, mosques, offices, hospitals, halls, corridors and commercial buildings in Bangladesh. Its column style cabinet is useful where installers need focused speech coverage without a bulky loudspeaker appearance. The 10W rated input is suitable for small to medium indoor areas, especially when several speakers are distributed along corridors, classrooms, prayer areas or public zones. The TZ-105 supports 100V line PA systems, making it easy to connect with mixer amplifiers and public address amplifiers over longer cable runs. This helps reduce installation complexity when multiple speakers are placed across a building. The durable metal enclosure and light gray or silver tone finish make the speaker practical for daily institutional use while keeping a clean wall-mounted look. It is designed for speech, paging, announcement and light background music, so it works well for routine messages, class changes, prayer area speech reinforcement and office communication. Wall-mount installation allows flexible placement and helps keep floor space clear. Sasha Corporation can supply the TOA TZ-105 column speaker with amplifier matching, cable planning, speaker quantity calculation, BOQ preparation and installation support. For buyers comparing column speaker price in Bangladesh, this model is a strong option when branded quality, clear voice reproduction and reliable 100V line compatibility are important. It can be combined with microphones, zone selectors, mixer amplifiers and PA racks to build a complete announcement system. The compact design is also helpful for tender documentation because the model, rated input, speaker type, system support, installation type, finish and application area are easy to specify. If you need a neat indoor speaker for paging and public address use, the TOA TZ-105 delivers practical sound coverage with trusted TOA performance in everyday building operation every day.",
        faqs: [
          {
            q: "Can the TOA TZ-105 be used with a 100V PA amplifier?",
            a: "Yes. It is planned for 100V line PA systems and can be used with compatible PA or mixer amplifiers.",
          },
        ],
      };

    case "ahuja_cma_5400_central_mixer_amp":
      return {
        overview:
          "The Ahuja CMA-5400 is a 50W central mixer amplifier for conference and PA systems. It supports chairman and delegate units, microphone/AUX inputs, multiple speaker outputs and conference room audio control.",
        keyFeatures: [
          "50W central mixer amplifier for conference and PA systems",
          "Supports chairman and delegate units for organized meetings",
          "Mic and AUX input support for flexible audio connection",
          "Line output, send output and return input for system integration",
          "100V / 70V speaker output for commercial PA installation",
          "4 ohm, 8 ohm and 16 ohm speaker support for flexible speaker setup",
          "Bass and treble tone control for sound adjustment",
          "Chairman priority function for meeting control",
          "Built-in protection system for safer operation",
          "Ideal for boardrooms, seminar halls, offices and conference rooms",
        ],
        specs: [
          { k: "Brand", v: "Ahuja" },
          { k: "Model", v: "CMA-5400" },
          { k: "Series", v: "CM-5000" },
          { k: "Product Type", v: "Central Mixer Amplifier" },
          { k: "Rated Power Output", v: "50W RMS at 2% THD" },
          { k: "Power Output", v: "50W Max at 2% THD / 90W Max" },
          { k: "Inputs", v: "3 x Mic, 1 x AUX" },
          { k: "Mic Input", v: "0.65mV / 4.7k ohm" },
          { k: "AUX Input", v: "100mV / 470k ohm" },
          { k: "Frequency Response", v: "60Hz - 14,000Hz +/-3dB" },
          { k: "S/N Ratio", v: ">60dB" },
          { k: "Tone Control", v: "Bass: -10dB at 100Hz, Treble: -10dB at 10kHz" },
          { k: "Preamp Output", v: "200mV / 600 ohm" },
          { k: "Line Output", v: "1V / 1k ohm" },
          { k: "Send Output", v: "200mV / 600 ohm" },
          { k: "Return Input", v: "200mV / 10k ohm" },
          { k: "Speaker Output", v: "4 ohm, 8 ohm, 16 ohm, 70V and 100V" },
          { k: "Power Requirement", v: "AC 220-240V, 50/60Hz / DC 24V Battery" },
          { k: "Power Consumption", v: "250VA" },
          { k: "Protection", v: "AC Fuse 1 x 3Amp, DC Fuse 2 x 10Amp" },
          { k: "Dimensions", v: "W483 x H110 x D325mm" },
          { k: "Weight", v: "10.50kg" },
          { k: "Application", v: "Conference System, PA System, Meeting Audio" },
          { k: "Suitable For", v: "Boardroom, Office, Seminar Hall, Council Chamber" },
        ],
        recommendedFor: ["Boardrooms", "Seminar halls", "Offices", "Council chambers"],
        description:
          "The Ahuja CMA-5400 50W Central Mixer Amplifier is a practical conference and PA amplifier for boardrooms, seminar halls, council chambers, offices, training rooms and meeting spaces in Bangladesh. It is designed for systems that need central audio control, chairman and delegate unit support, microphone mixing and speaker output from one compact amplifier. The 50W RMS rated power output and 90W maximum power make it suitable for speech reinforcement in small to medium conference rooms where clear voice distribution is more important than high-volume music playback. With 3 microphone inputs and 1 AUX input, the CMA-5400 can connect meeting microphones, source devices and supporting audio equipment for regular discussion sessions. Line output, send output and return input help integrate the amplifier with external processors, recording devices or additional PA equipment when a system requires expansion. The amplifier supports 4 ohm, 8 ohm, 16 ohm, 70V and 100V speaker output, giving installers flexibility for different loudspeaker layouts. Bass and treble tone controls allow simple adjustment for speech clarity and room acoustics. Chairman priority function is useful for formal meetings where the chairman microphone must take control during discussion. Built-in protection, AC and DC power support and conference-focused controls make the unit reliable for institutional projects. Sasha Corporation can supply the Ahuja CMA-5400 central mixer amplifier with chairman and delegate microphones, speaker matching, cable planning, installation and testing support. For buyers comparing Ahuja mixer amplifier price in Bangladesh, this model is a good choice for meeting rooms that need a simple, serviceable and conference-ready audio system. It is also helpful for BOQ and tender documentation because model, series, power, inputs, outputs, dimensions and application details are clear for procurement teams and installers. The design is suitable for fixed installations where daily users need dependable controls, stable voice output and straightforward maintenance over years.",
        faqs: [
          {
            q: "Is the Ahuja CMA-5400 suitable for conference rooms?",
            a: "Yes. It is designed for conference and PA systems with chairman/delegate unit support, mic inputs and speaker outputs for meeting audio.",
          },
        ],
      };

    case "ahuja_cma_7400_digital_conference_amp":
      return {
        overview:
          "The Ahuja CMA-7400 is a 50W digital central conference amplifier with touch display, USB recording, RJ45 connectivity and multiple meeting modes for modern discussion systems.",
        keyFeatures: [
          "50W digital central conference amplifier for meeting systems",
          "Built-in amplifier for connecting external speakers",
          "4.3-inch IPS touch display for easy system control",
          "USB recording function for meeting audio documentation",
          "Headphone output for sound monitoring",
          "Multiple meeting modes including Free, Limit, FIFO, VIP, PTT, Apply and Chairman Only",
          "RJ45 connectivity for CAT5e / CAT6 cable connection",
          "Supports four independent delegate unit groups for large conference setups",
          "Balanced audio output for professional sound integration",
          "Ideal for boardrooms, seminar halls, training rooms and conference venues",
        ],
        specs: [
          { k: "Brand", v: "Ahuja" },
          { k: "Model", v: "CMA-7400" },
          { k: "Series", v: "CM-7000" },
          { k: "Product Type", v: "Digital Central Conference Amplifier" },
          { k: "Rated Power Output", v: "50W" },
          { k: "Display", v: "4.3-inch IPS Touch Display" },
          { k: "Conference Modes", v: "Free, Limit, FIFO, VIP, PTT, Apply, Chairman Only" },
          { k: "Recording Function", v: "USB Recorder" },
          { k: "Monitoring Output", v: "Headphone Output" },
          { k: "Conference Connection", v: "RJ45 Connector" },
          { k: "Cable Support", v: "CAT5e / CAT6 Cable" },
          { k: "Delegate Unit Group Support", v: "4 Independent Groups" },
          { k: "Frequency Response", v: "100Hz - 15,000Hz" },
          { k: "Signal-to-Noise Ratio", v: ">96dB" },
          { k: "Audio Output", v: "+18dB Balanced" },
          { k: "Power Requirement", v: "AC 220-240V, 50/60Hz" },
          { k: "Dimensions", v: "W485 x H105 x D330mm" },
          { k: "Weight", v: "4.70kg" },
          { k: "Application", v: "Conference System, Meeting Room, Digital Discussion System" },
          { k: "Suitable For", v: "Boardroom, Office, Seminar Hall, Training Center" },
        ],
        recommendedFor: ["Boardrooms", "Seminar halls", "Training centers", "Conference venues"],
        description:
          "The Ahuja CMA-7400 50W Digital Conference Amplifier is a modern central amplifier for digital conference systems, meeting rooms, boardrooms, seminar halls, training centers and conference venues in Bangladesh. It is built for organized discussion systems where chairman and delegate units need stable control, clear audio routing and easy operator access. The 50W rated output supports external speakers for room sound reinforcement, while the balanced audio output helps connect the amplifier with professional PA equipment or recording systems. A 4.3-inch IPS touch display gives users a clear control interface for setup and meeting operation, making the system easier to manage during formal sessions. The CMA-7400 supports multiple meeting modes including Free, Limit, FIFO, VIP, PTT, Apply and Chairman Only, so operators can choose a workflow that matches the meeting style. USB recording function is useful for documenting meeting audio, minutes, training sessions and official discussions. Headphone output allows monitoring during setup and live operation. RJ45 connectivity with CAT5e or CAT6 cable keeps conference unit cabling neat and service friendly, especially when delegate units are spread across a boardroom table. Support for four independent delegate unit groups makes the amplifier suitable for larger conference layouts and more organized seating plans. With 100Hz to 15,000Hz frequency response, more than 96dB signal-to-noise ratio and AC 220-240V power support, it is designed for clear speech-focused conference audio. Sasha Corporation can supply the Ahuja CMA-7400 with compatible delegate units, chairman units, speakers, cabling, rack setup, recording integration and installation support. For customers searching digital conference amplifier price in Bangladesh, this model is a strong option for institutions that need touch control, USB recording, group support and professional meeting audio in one system. It is practical for corporate offices, universities, government rooms, hotels and multipurpose meeting facilities that need modern conference control with reliable support and service.",
        faqs: [
          {
            q: "Does the Ahuja CMA-7400 support USB recording?",
            a: "Yes. It includes a USB recording function for meeting audio documentation and formal discussion records.",
          },
        ],
      };

    case "wireless_conference":
      return {
        overview:
          "Wireless conference microphone systems work well when your seating layout changes frequently. Rechargeable units and a central receiver make it practical for multipurpose meeting spaces.",
        keyFeatures: [
          "Flexible seating without per-seat cabling",
          "Rechargeable units (system dependent)",
          "Quick setup for rearranged layouts",
          "Integrates with PA/recording (project dependent)",
        ],
        specs: [
          { k: "System Type", v: "Wireless conference mic system" },
          { k: "Use", v: "Meetings with flexible seating" },
          { k: "Power", v: "Rechargeable units (typical)" },
          { k: "Pickup", v: "Voice-focused microphones" },
          { k: "Integration", v: "PA / recording (project dependent)" },
          { k: "Coverage", v: "Room dependent" },
        ],
        recommendedFor: ["Hotels", "Corporate meetings", "Training centres", "Multipurpose halls"],
        faqs: [
          {
            q: "Will wireless conference mics face interference?",
            a: "They can if RF conditions are challenging. Frequency planning and proper receiver placement helps improve stability.",
          },
        ],
      };

    default:
      return {
        overview:
          "This PA sound system item supports reliable announcements and day-to-day operation when selected and installed correctly. Final selection should align with coverage needs, wiring method, and the environment where the system will run.",
        keyFeatures: [
          "Suitable for BOQ-based quotation and installation planning",
          "Selection depends on coverage, noise level, and wiring route",
          "Compatible setup reduces downtime and maintenance",
          "Project support available for configuration and commissioning",
        ],
        specs: [
          { k: "Category", v: product.tags.join(" / ") || "PA Sound System" },
          { k: "Power Class", v: watts ?? "Project dependent" },
          { k: "Use", v: "Announcements / paging / support" },
          { k: "Coverage", v: "Layout dependent" },
          { k: "Installation", v: "Project dependent" },
          { k: "Support", v: "Configuration + commissioning guidance" },
        ],
        recommendedFor: product.tags.slice(0, 4).length ? product.tags.slice(0, 4) : ["Project planning", "Selection support"],
        faqs: [
          {
            q: "How do I choose the right model for my site?",
            a: "Share your site type, coverage areas, speaker quantity, and cabling distance. We can recommend a practical configuration and BOQ-based quotation.",
          },
        ],
      };
  }
}

function getRelatedPaItems(all: PaSystemItem[], current: PaSystemItem, count: number): PaSystemItem[] {
  const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));

  const scored = all
    .filter((x) => x.slug !== current.slug)
    .map((x) => {
      const tags = x.tags.map((t) => t.toLowerCase());
      const sharedTags = tags.reduce((acc, t) => (currentTags.has(t) ? acc + 1 : acc), 0);
      const sameKind = x.kind === current.kind ? 1 : 0;
      const score = sharedTags * 2 + sameKind * 3;
      return { x, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.x);
}

function buildDescriptionParagraph(product: PaSystemItem, details: ReturnType<typeof buildDetails>): string {
  if (details.description) return details.description;

  const useCases = details.recommendedFor.length ? details.recommendedFor.slice(0, 4).join(", ") : "project-based PA use";
  const features = details.keyFeatures.length ? details.keyFeatures.slice(0, 3).map((x) => x.replace(/\.$/, "")).join(", ") : product.tags.join(", ");

  return [
    `${product.title} is commonly selected for ${useCases}.`,
    `${product.subtitle}`,
    `Key planning focus includes ${features}.`,
    "Final configuration depends on speaker quantity, coverage area, cabling route, zoning logic and daily operation needs.",
    "We support BOQ-based selection, rack wiring guidance, testing, commissioning, and after-sales service in Bangladesh.",
  ].join(" ");
}

export default async function PaSystemDetailsPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getPaSystemBySlug(slug);
  if (!product) return notFound();

  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;
  const details = buildDetails(product);
  const featuredProducts = getRelatedPaItems(paSystemCatalog, product, 3);
  const description = buildDescriptionParagraph(product, details);

  return (
    <>
      <PaSystemProductDetailPage
        product={product}
        categoryLabel="PA Sound System"
        categoryHref="/pa-system/"
        backHref="/pa-system/"
        backLabel="Back to PA listing"
        wa={wa}
        detailedSpecs={details.specs}
        featuredProducts={featuredProducts}
        featuredHrefPrefix="/pa-system"
        relatedLinks={[
          { href: "/services-support/", label: "Services" },
          { href: "/contact/", label: "Request quotation" },
        ]}
        overview={details.overview}
        keyFeatures={details.keyFeatures}
        description={description}
      />

      <section className="mx-auto hidden w-full max-w-7xl px-4 pb-10 md:block md:px-6">
        <div className="mt-6 rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(15,23,42,0.1)" }}>
          <h2 className="text-base font-bold text-slate-900">FAQ</h2>
          <p className="mt-1 text-xs leading-6 text-slate-600">
            Quick answers before ordering a PA sound system item in Bangladesh.
          </p>
          <div className="mt-3">
            <FaqAccordion accent={BRAND.maroon} items={details.faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
