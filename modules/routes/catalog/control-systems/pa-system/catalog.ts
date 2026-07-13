export type PaSystemFaq = { q: string; a: string };

export type PaSystemKind =
  | "analog_100v_line_system"
  | "portable_pa"
  | "classroom_pa"
  | "conference_discussion"
  | "bosch_ccs_900_ultra"
  | "bosch_ccs_cu_control_unit"
  | "ahuja_cma_5400_central_mixer_amp"
  | "ahuja_cma_7400_digital_conference_amp"
  | "wireless_conference"
  | "pa_rack_package"
  | "dante_core_io"
  | "dante_amp_endpoint"
  | "digital_matrix_dsp"
  | "ip_paging_system"
  | "ip_wall_speaker"
  | "paging_gooseneck_mic"
  | "wireless_handheld_uhf"
  | "toa_uhf_wireless_microphone"
  | "wireless_lapel_headset"
  | "delegate_unit_microphone"
  | "wall_speaker_100v"
  | "cabinet_loudspeaker_30w"
  | "ceiling_speaker_100v"
  | "bosch_lc9_uc06_ceiling_speaker"
  | "bosch_ceiling_loudspeaker_30w"
  | "column_speaker"
  | "toa_tz_105_column_speaker"
  | "horn_speaker_outdoor"
  | "mixer_amp_100v"
  | "bosch_ple_4ma240_mixer_amp"
  | "stereo_mixer_14ch"
  | "power_amp_2ch"
  | "mixer_amp_multi_zone"
  | "portable_speaker_amplifier";

export type PaSystemItem = {
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  metaDescription?: string;
  tags: string[];
  image: string;
  quickFeatures?: string[];
  bestFor?: string[];
  kind: PaSystemKind;
};

// NOTE:
// Item names/labels match the referenced product list. Descriptions/specs on detail pages are written uniquely.
export const paSystemCatalog: PaSystemItem[] = [
  {
    slug: "analog-100v-line-pa-system-school-office",
    title: "Analog 100V Line PA System – School & Office",
    subtitle: "Project-based building PA solution for announcements and background music with proper cabling and zoning support.",
    priceLabel: "50,000 - 100,000 BDT",
    tags: ["Analog PA", "100V Line", "School", "Office"],
    image: "/images/PA/Analog-100V-Line-PA-System.webp",
    kind: "analog_100v_line_system",
  },
  {
    slug: "compact-portable-pa-system-100w-2-wireless-mic",
    title: "Compact Portable PA System (100W, 2 Wireless Mic)",
    subtitle: "Portable PA with wireless mics and rechargeable battery for coaching, training and small events.",
    priceLabel: "8,500 - 26,000 BDT",
    tags: ["Compact PA", "Portable", "Battery"],
    image: "/images/PA/Compact-Portable-PA-System.webp",
    kind: "portable_pa",
  },
  {
    slug: "toa-wa-z110sd-70w-portable-speaker-amplifier",
    title: "TOA WA-Z110SD 70W Portable Speaker Amplifier",
    subtitle: "Portable TOA speaker amplifier with rechargeable battery, USB/SD playback, Bluetooth and mic input support.",
    priceLabel: "179,999 BDT",
    metaDescription: "TOA WA-Z110SD 70W portable speaker amplifier with battery, Bluetooth, USB/SD playback and mic support for PA use.",
    tags: ["TOA", "Portable PA", "Speaker Amplifier", "Bluetooth"],
    image: "/images/PA/TOA-WA-Z110SD-70W-Portable-Speaker-Amplifier.webp",
    quickFeatures: [
      "70W portable speaker amplifier for PA and event sound systems",
      "USB, SD, MMC and Bluetooth playback support",
      "Rechargeable battery for mobile PA operation",
      "Wired mic input with optional UHF wireless microphone support",
    ],
    bestFor: ["School", "Mosque", "Training", "Outdoor"],
    kind: "portable_speaker_amplifier",
  },
  {
    slug: "compact-classroom-pa-system-teacher-voice-support",
    title: "Compact Classroom PA System – Teacher Voice Support",
    subtitle: "Small classroom package for clear teacher voice coverage with amplifier + speakers + mic (typical).",
    priceLabel: "7,500 - 22,000 BDT",
    tags: ["Compact PA", "Classroom", "Teacher Voice"],
    image: "/images/PA/Compact-Classroom-PA-System.webp",
    kind: "classroom_pa",
  },
  {
    slug: "conference-discussion-system-chairman-delegate-set",
    title: "Conference Discussion System – Chairman & Delegate Set",
    subtitle: "Digital discussion controller with chairman and delegate units for structured meetings.",
    priceLabel: "10,000 - 220,000 BDT",
    tags: ["Conference System", "Discussion", "Boardroom"],
    image: "/images/PA/Conference-Discussion-System.webp",
    kind: "conference_discussion",
  },
  {
    slug: "bosch-ccs-900-ultra-conference-system-unit",
    title: "Bosch CCS 900 Ultra Conference System Unit",
    subtitle: "Bosch conference discussion control unit with feedback suppression, 150 delegate support and clear meeting audio.",
    priceLabel: "22,200 BDT",
    metaDescription: "Bosch CCS 900 Ultra conference system unit with feedback suppression, 150 delegate support and clear meeting audio in Bangladesh.",
    tags: ["Bosch", "Conference System", "Discussion", "Control Unit"],
    image: "/images/PA/Bosch-CCS-900-Ultra-Conference-System-Unit-600x600.webp",
    quickFeatures: [
      "Professional conference discussion system for meeting rooms",
      "Digital acoustic feedback suppression for clearer speech",
      "Supports up to 150 delegate units",
      "Built-in control unit for easy meeting management",
    ],
    bestFor: ["Boardroom", "Conference", "Meeting Room", "Council Chamber"],
    kind: "bosch_ccs_900_ultra",
  },
  {
    slug: "bosch-ccs-cu-conference-control-power-unit",
    title: "Bosch CCS-CU Conference Control & Power Unit",
    subtitle: "Bosch conference control and power supply unit for delegate/chairman microphones, monitoring and PA integration.",
    priceLabel: "63,200 BDT",
    metaDescription: "Bosch CCS-CU conference control and power unit with 150 contribution unit control, mic modes and PA integration.",
    tags: ["Bosch", "Conference System", "Control Unit", "Power Unit"],
    image: "/images/PA/Bosch-CCS-CU-Conference-Control-Power-Unit-600x600.webp",
    quickFeatures: [
      "Conference control and power supply unit for Bosch discussion systems",
      "Powers delegate and chairman units from one central device",
      "Controls up to 150 delegate and chairman units",
      "Multiple microphone modes for flexible meeting control",
    ],
    bestFor: ["Boardroom", "Conference Hall", "Training Room", "Office"],
    kind: "bosch_ccs_cu_control_unit",
  },
  {
    slug: "ahuja-cmd-7200-delegate-unit-microphone",
    title: "Ahuja CMD-7200 Delegate Unit Microphone",
    subtitle: "Ahuja delegate unit microphone with LCD display, voting buttons, RJ45 connection and condenser pickup.",
    priceLabel: "16,500 BDT",
    metaDescription: "Ahuja CMD-7200 delegate unit microphone with LCD display, RJ45 CAT5e/CAT6 connection and voting support for boardroom PA systems.",
    tags: ["Ahuja", "Delegate Unit", "Conference Microphone", "Voting"],
    image: "/images/PA/Ahuja-CMD-7200-Delegate-Unit-Microphone-600x600.webp",
    quickFeatures: [
      "Delegate unit microphone for digital conference systems",
      "LCD display for mic ID, status, contrast and voting results",
      "RJ45 connection port for CAT5e / CAT6 cable",
      "Voting buttons and function controls for meeting sessions",
    ],
    bestFor: ["Boardroom", "Office", "Seminar Hall", "Council Chamber"],
    kind: "delegate_unit_microphone",
  },
  {
    slug: "ahuja-cma-5400-50w-central-mixer-amplifier",
    title: "Ahuja CMA-5400 50W Central Mixer Amplifier",
    subtitle: "Ahuja 50W central mixer amplifier for conference and PA systems with chairman/delegate unit support.",
    priceLabel: "40,000 - 50,000 BDT",
    metaDescription: "Ahuja CMA-5400 50W central mixer amplifier with mic/AUX inputs, chairman priority and PA speaker support.",
    tags: ["Ahuja", "Mixer Amplifier", "Conference", "50W"],
    image: "/images/PA/Ahuja-CMA-5400-50W-Central-Mixer-Amplifier-600x600.webp",
    quickFeatures: [
      "50W central mixer amplifier for conference and PA systems",
      "Supports chairman and delegate units for organized meetings",
      "Mic and AUX input support for flexible audio connection",
      "100V / 70V speaker output for commercial PA installation",
    ],
    bestFor: ["Boardroom", "Seminar Hall", "Office", "Council Chamber"],
    kind: "ahuja_cma_5400_central_mixer_amp",
  },
  {
    slug: "ahuja-cma-7400-50w-digital-conference-amplifier",
    title: "Ahuja CMA-7400 50W Digital Conference Amplifier",
    subtitle: "Ahuja 50W digital conference amplifier with touch display, USB recording, RJ45 connectivity and group support.",
    priceLabel: "56,000 BDT",
    metaDescription: "Ahuja CMA-7400 50W digital conference amplifier with touch display, USB recording and RJ45 delegate support.",
    tags: ["Ahuja", "Digital Conference", "Amplifier", "50W"],
    image: "/images/PA/Ahuja-CMA-7400-50W-Digital-Conference-Amplifier-600x600.webp",
    quickFeatures: [
      "50W digital central conference amplifier for meeting systems",
      "4.3-inch IPS touch display for easy system control",
      "USB recording function for meeting audio documentation",
      "RJ45 connectivity for CAT5e / CAT6 cable connection",
    ],
    bestFor: ["Boardroom", "Training Center", "Seminar Hall", "Conference Venue"],
    kind: "ahuja_cma_7400_digital_conference_amp",
  },
  {
    slug: "wireless-conference-microphone-system",
    title: "Wireless Conference Microphone System",
    subtitle: "Wireless conference microphones for flexible seating and clean meeting audio pickup.",
    priceLabel: "75,000 - 130,000 BDT",
    tags: ["Conference System", "Wireless", "Meeting"],
    image: "/images/PA/Wireless-Conference-Microphone-System.webp",
    kind: "wireless_conference",
  },
  {
    slug: "dante-network-audio-system-core-io-interface",
    title: "Dante Network Audio System – Core & I/O Interface",
    subtitle: "Audio over IP core + I/O interface for routing audio between rooms and racks.",
    priceLabel: "12,500 - 21,000 BDT",
    tags: ["Dante", "Network Audio", "Digital"],
    image: "/images/PA/Dante-Network-Audio-System.webp",
    kind: "dante_core_io",
  },
  {
    slug: "dante-network-audio-power-amplifier-endpoint",
    title: "Dante Network Audio Power Amplifier Endpoint",
    subtitle: "Network-connected amplifier endpoint for distributed zone audio over LAN.",
    priceLabel: "35,500 - 49,000 BDT",
    tags: ["Dante", "Amplifier", "Endpoint"],
    image: "/images/PA/Dante-Network-Audio-Power.webp",
    kind: "dante_amp_endpoint",
  },
  {
    slug: "digital-control-pa-system-audio-matrix-dsp",
    title: "Digital Control PA System – Audio Matrix & DSP",
    subtitle: "Project-based digital PA with matrix routing, DSP tuning and multi-zone control.",
    priceLabel: "52,500 - 81,000 BDT",
    tags: ["Digital PA", "Audio Matrix", "DSP"],
    image: "/images/PA/Digital-Control-PA-System.webp",
    kind: "digital_matrix_dsp",
  },
  {
    slug: "ip-network-audio-paging-system",
    title: "IP Network Audio & Paging System",
    subtitle: "IP-based paging system with server/software, IP speakers and centralized control.",
    priceLabel: "50,000 - 120,000 BDT",
    tags: ["IP Audio", "Network", "PA", "Paging"],
    image: "/images/PA/IP-Network-Audio-&-Paging-System.webp",
    kind: "ip_paging_system",
  },
  {
    slug: "ip-network-wall-speaker-poe-lan",
    title: "IP Network Wall Speaker – PoE / LAN",
    subtitle: "IP wall speaker endpoint with built-in amplification for LAN/PoE installation.",
    priceLabel: "6,500 - 13,500 BDT",
    tags: ["IP Speaker", "Wall", "PoE"],
    image: "/images/PA/IP-Network-Wall-Speaker.webp",
    kind: "ip_wall_speaker",
  },
  {
    slug: "wired-gooseneck-paging-microphone",
    title: "Wired Gooseneck Paging Microphone",
    subtitle: "Desktop paging microphone for reception and control rooms with push-to-talk workflow.",
    priceLabel: "7,500 - 15,000 BDT",
    tags: ["Microphone", "Paging", "Gooseneck"],
    image: "/images/PA/Wired-Gooseneck-Paging-Microphone.webp",
    kind: "paging_gooseneck_mic",
  },
  {
    slug: "uhf-wireless-handheld-microphone-set-dual-channel",
    title: "UHF Wireless Handheld Microphone Set (Dual Channel)",
    subtitle: "Dual-channel UHF handheld set for halls, programs and events with stable RF setup.",
    priceLabel: "21,000 - 30,000 BDT",
    tags: ["Wireless Mic", "UHF", "Handheld"],
    image: "/images/PA/UHF-Wireless-Handheld-Microphone.webp",
    kind: "wireless_handheld_uhf",
  },
  {
    slug: "toa-wt-5810-wm-5225-uhf-wireless-microphone",
    title: "TOA WT-5810 WM-5225 UHF Wireless Microphone",
    subtitle: "TOA UHF wireless microphone system with WT-5810 receiver, WM-5225 handheld mic and 100 selectable channels.",
    priceLabel: "41,000 BDT",
    metaDescription: "TOA WT-5810 WM-5225 UHF wireless microphone with 100 channels, PLL receiver, handheld mic and PA system support in Bangladesh.",
    tags: ["TOA", "Wireless Mic", "UHF", "Handheld"],
    image: "/images/PA/toa-wt-5810-bangladesh-trimatrik-600x600.webp",
    quickFeatures: [
      "UHF wireless microphone system for speech and vocal use",
      "Includes WT-5810 receiver and WM-5225 handheld microphone",
      "PLL synthesized system for stable frequency operation",
      "100 selectable channels for flexible setup",
    ],
    bestFor: ["School", "Mosque", "Office", "Conference"],
    kind: "toa_uhf_wireless_microphone",
  },
  {
    slug: "wireless-lapel-headset-microphone-set",
    title: "Wireless Lapel & Headset Microphone Set",
    subtitle: "Hands-free mic set for teachers and presenters with bodypack transmitter.",
    priceLabel: "4,000 - 8,500 BDT",
    tags: ["Wireless Mic", "Headset", "Lapel"],
    image: "/images/PA/Wireless-Lapel-&-Headset-Microphone-Set.webp",
    kind: "wireless_lapel_headset",
  },
  {
    slug: "30w-wall-mount-speaker-100v-line",
    title: "30W Wall Mount Speaker (100V Line)",
    subtitle: "100V line wall speaker for corridor/classroom announcements with practical installation.",
    priceLabel: "30,000 - 35,000 BDT",
    tags: ["Speaker", "Wall", "100V"],
    image: "/images/PA/30W-Wall-Mount-Speaker.webp",
    kind: "wall_speaker_100v",
  },
  {
    slug: "bosch-lb2-uc30-30w-cabinet-loudspeaker",
    title: "Bosch LB2-UC30 30W Cabinet Loudspeaker",
    subtitle: "Bosch 30W cabinet loudspeaker with 70V/100V support, IP65 protection and wall-mount installation.",
    priceLabel: "13,000 BDT",
    metaDescription: "Bosch LB2-UC30 30W cabinet loudspeaker with 70V/100V support, IP65 rating, wall bracket and clear PA sound in Bangladesh.",
    tags: ["Bosch", "Cabinet Speaker", "30W", "100V"],
    image: "/images/PA/Bosch-LB2-UC30-30W-Cabinet-Loudspeaker-600x600.webp",
    quickFeatures: [
      "30W cabinet loudspeaker for PA and music systems",
      "Clear speech and music reproduction for commercial sound use",
      "Suitable for indoor and outdoor applications",
      "70V and 100V line support for professional PA installation",
    ],
    bestFor: ["Office", "Mall", "School", "Showroom"],
    kind: "cabinet_loudspeaker_30w",
  },
  {
    slug: "6w-ceiling-speaker-bgm-paging",
    title: "6W Ceiling Speaker – BGM & Paging",
    subtitle: "Flush-mount ceiling speaker for background music and paging in offices and retail interiors.",
    priceLabel: "3,000 - 5,200 BDT",
    tags: ["Speaker", "Ceiling", "BGM"],
    image: "/images/PA/6W-Ceiling-Speaker.webp",
    kind: "ceiling_speaker_100v",
  },
  {
    slug: "bosch-lc9-uc06-6w-ceiling-speaker-metal-grill",
    title: "Bosch LC9-UC06 6W Ceiling Speaker with Metal Grill",
    subtitle: "Bosch 6W compact ceiling speaker with metal grill, 100V transformer taps and wide coverage for PA/BGM.",
    priceLabel: "3,900 BDT",
    metaDescription: "Bosch LC9-UC06 6W ceiling speaker with metal grill, 100V transformer taps and clear PA/BGM sound.",
    tags: ["Bosch", "Ceiling Speaker", "6W", "100V"],
    image: "/images/PA/Bosch-LC9-UC06-6W-Ceiling-Speaker-with-Metal-Grill-600x600.webp",
    quickFeatures: [
      "6W ceiling speaker for PA and background music systems",
      "Compact general-purpose design for commercial indoor use",
      "Perforated metal grill for protection and clean appearance",
      "100V line transformer support for professional PA installation",
    ],
    bestFor: ["Office", "School", "Mall", "Hospital"],
    kind: "bosch_lc9_uc06_ceiling_speaker",
  },
  {
    slug: "bosch-lc2-pc30g6-8-30w-ceiling-loudspeaker",
    title: "Bosch LC2-PC30G6-8 30W Ceiling Loudspeaker",
    subtitle: "Bosch 30W ceiling loudspeaker with 8-inch coaxial two-way driver, 70V/100V support and white ceiling design.",
    priceLabel: "47,000 BDT",
    metaDescription: "Bosch LC2-PC30G6-8 30W ceiling loudspeaker with 8-inch coaxial design, 70V/100V support and PA sound clarity.",
    tags: ["Bosch", "Ceiling Speaker", "30W", "100V"],
    image: "/images/PA/Bosch-LC2-PC30G6-8-30W-Ceiling-Loudspeaker-600x600.webp",
    quickFeatures: [
      "30W ceiling loudspeaker for professional PA and background music systems",
      "8-inch coaxial two-way speaker for clear and balanced sound",
      "Waveguide-coupled tweeter for improved audio coverage",
      "70V / 100V line support for commercial audio installations",
    ],
    bestFor: ["Office", "Mall", "Hotel", "Conference Room"],
    kind: "bosch_ceiling_loudspeaker_30w",
  },
  {
    slug: "60w-column-speaker-mosque-hall",
    title: "60W Column Speaker – Mosque & Hall",
    subtitle: "Column speaker for voice clarity and controlled coverage in mosque and hall applications.",
    priceLabel: "20,000 - 25,000 BDT",
    tags: ["Column Speaker", "Mosque", "Hall"],
    image: "/images/PA/60W-Column-Speaker.webp",
    kind: "column_speaker",
  },
  {
    slug: "toa-tz-105-10w-column-speaker",
    title: "TOA TZ-105 10W Column Speaker",
    subtitle: "TOA 10W slim column speaker for clear speech, paging, background music and 100V line PA installation.",
    priceLabel: "8,400 BDT",
    metaDescription: "TOA TZ-105 10W column speaker with 100V line support, slim metal body and clear voice reproduction for PA systems.",
    tags: ["TOA", "Column Speaker", "10W", "100V"],
    image: "/images/PA/TOA-TZ-105-10W-Column-Speaker-600x600.webp",
    quickFeatures: [
      "10W column speaker for PA and background music systems",
      "Clear speech reproduction for paging and announcements",
      "Slim column design for professional indoor installation",
      "100V line support for commercial PA speaker systems",
    ],
    bestFor: ["School", "Mosque", "Office", "Corridor"],
    kind: "toa_tz_105_column_speaker",
  },
  {
    slug: "50w-outdoor-horn-speaker-siren-announcement",
    title: "50W Outdoor Horn Speaker – Siren & Announcement",
    subtitle: "Outdoor horn speaker option for loud announcements and emergency alerts in factory yards and open areas.",
    priceLabel: "9,200 - 17,500 BDT",
    tags: ["Horn Speaker", "Outdoor", "Factory"],
    image: "/images/PA/50W-Outdoor-Horn-Speaker.webp",
    kind: "horn_speaker_outdoor",
  },
  {
    slug: "240w-mixer-amplifier-100v-line-pa",
    title: "240W Mixer Amplifier – 100V Line PA",
    subtitle: "Higher-power 100V line mixer amplifier for mid-size building paging and BGM.",
    priceLabel: "120,000 - 150,000 BDT",
    tags: ["Mixer Amplifier", "100V Line", "PA"],
    image: "/images/PA/240W-Mixer-Amplifier.webp",
    kind: "mixer_amp_100v",
  },
  {
    slug: "bosch-ple-4ma240-240w-4-zone-mixer-amplifier",
    title: "Bosch PLE-4MA240 240W 4-Zone Mixer Amplifier",
    subtitle: "Bosch 240W 4-zone mixer amplifier with Class-D output, paging inputs, emergency input and rack support.",
    priceLabel: "215,500 BDT",
    metaDescription: "Bosch PLE-4MA240 240W 4-zone mixer amplifier with Class-D output, paging inputs and PA zone control.",
    tags: ["Bosch", "Mixer Amplifier", "240W", "4 Zone"],
    image: "/images/PA/Bosch-PLE-4MA240-240W-4-Zone-Mixer-Amplifier-600x600.webp",
    quickFeatures: [
      "240W powerful output for professional PA and background music systems",
      "4-zone audio control for separate area-wise sound distribution",
      "Class-D mixer amplifier with efficient performance",
      "3 microphone/line inputs for paging, announcements and voice input",
    ],
    bestFor: ["Office", "School", "Mosque", "Factory"],
    kind: "bosch_ple_4ma240_mixer_amp",
  },
  {
    slug: "ahuja-promix-1442r-14-channel-stereo-mixer",
    title: "Ahuja PROMIX-1442R 14-Channel Stereo Mixer",
    subtitle: "Ahuja 14-channel stereo audio mixer with 12 mic inputs, Bluetooth, MP3 recording and digital effects.",
    priceLabel: "64,500 BDT",
    metaDescription: "Ahuja PROMIX-1442R 14-channel stereo mixer with 12 mic inputs, Bluetooth, MP3 recording, effects and PA sound support.",
    tags: ["Ahuja", "Audio Mixer", "14 Channel", "Bluetooth"],
    image: "/images/PA/Ahuja-PROMIX-1442R-14-Channel-Stereo-Mixer-600x600.webp",
    quickFeatures: [
      "14-channel stereo audio mixer for PA and live sound systems",
      "12 microphone inputs for vocals, speech and instruments",
      "10 line balanced mono inputs for flexible audio connection",
      "Built-in MP3 recorder with USB playback and Bluetooth support",
    ],
    bestFor: ["Stage", "Mosque", "Hall", "Recording"],
    kind: "stereo_mixer_14ch",
  },
  {
    slug: "2-channel-power-amplifier-2x500w",
    title: "2-Channel Power Amplifier (2×500W)",
    subtitle: "Professional 2-channel power amplifier for high headroom installations with system integration.",
    priceLabel: "115,000 - 140,000 BDT",
    tags: ["Power Amplifier", "2-Channel"],
    image: "/images/PA/2-Channel-Power-Amplifier.webp",
    kind: "power_amp_2ch",
  },
  {
    slug: "multi-zone-mixer-amplifier-with-paging",
    title: "Multi-Zone Mixer Amplifier with Paging",
    subtitle: "Multi-zone amplifier for targeted announcements and BGM across separate areas or departments.",
    priceLabel: "65,000 - 69,000 BDT",
    tags: ["Mixer Amplifier", "Zoning", "PA"],
    image: "/images/PA/Multi-Zone-Mixer-Amplifier-with-Paging.webp",
    kind: "mixer_amp_multi_zone",
  },
  {
    slug: "school-mosque-pa-rack-package-mixer-amp-paging-mic",
    title: "School & Mosque PA Rack Package – Mixer Amp + Paging Mic",
    subtitle: "Practical rack package for announcements and paging with a 100V mixer amplifier and desk paging mic (typical).",
    priceLabel: "48,000 - 69,000 BDT",
    tags: ["Rack Package", "Mixer Amp", "Paging Mic"],
    image: "/images/PA/School-&-Mosque-PA-Rack-Package.webp",
    quickFeatures: [
      "Rack-friendly wiring and service access",
      "100V line mixer amplifier for multi-speaker sites",
      "Desk paging microphone for daily announcements",
      "Expandable design with zoning options (project dependent)",
    ],
    bestFor: ["School", "Mosque", "Announcements"],
    kind: "pa_rack_package",
  },
];

export function getPaSystemBySlug(slug: string): PaSystemItem | undefined {
  return paSystemCatalog.find((x) => x.slug === slug);
}

export function getPaSystemCardPriceLabel(item: Pick<PaSystemItem, "priceLabel">): string | null {
  const priceLabel = item.priceLabel?.trim();
  if (!priceLabel) return null;
  if (!/\d/.test(priceLabel)) return null;
  if (/^0+\s*BDT$/i.test(priceLabel)) return null;
  return priceLabel;
}
