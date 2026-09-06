import { turnstileCatalog, type TurnstileItem, type TurnstileKind } from "./catalog";

export function getKindLabel(kind: TurnstileKind): string {
  switch (kind) {
    case "tripod_turnstile":
      return "Tripod turnstile";
    case "flap_barrier":
      return "Flap barrier";
    case "swing_speed_gate":
      return "Swing / speed gate";
    case "full_height_turnstile":
      return "Full-height turnstile";
    case "waist_high_turnstile":
      return "Waist-high turnstile";
    case "ai_face_turnstile":
      return "AI face gate";
    default:
      return "Turnstile gate";
  }
}

export function getListingQuickFeatures(item: TurnstileItem): string[] {
  switch (item.kind) {
    case "tripod_turnstile":
      return ["Single-lane controlled entry", "RFID/biometric device integration", "Great for staff gates", "Attendance + access logging"];
    case "flap_barrier":
      return ["Premium lobby appearance", "Optical sensors for passage control", "Anti-tailgating logic (setup dependent)", "RFID/face/QR workflows"];
    case "swing_speed_gate":
      return ["Fast passage + sensors", "Wide-lane friendly (accessibility)", "Modern premium entrance look", "RFID/face/QR workflows"];
    case "full_height_turnstile":
      return ["Strong physical security", "Best for restricted zones", "Ideal for factories & perimeter entry", "Access logging + compliance"];
    case "waist_high_turnstile":
      return ["Durable gate option", "Moderate traffic flow", "Flexible single/double lane options", "RFID/biometric integration"];
    case "ai_face_turnstile":
      return ["Touchless face recognition option", "Fast verification workflow", "Attendance/HR reporting support", "Anti-passback rules (optional)"];
    default:
      return ["Access control integration", "Lane planning + commissioning", "Entry/exit log support", "Project-based configuration"];
  }
}

export function getListingBestFor(item: TurnstileItem): string[] {
  switch (item.kind) {
    case "tripod_turnstile":
      return ["Factory entry", "Campus gate", "Office staff entry"];
    case "flap_barrier":
      return ["Bank entrance", "Corporate lobby", "Government building"];
    case "swing_speed_gate":
      return ["Premium lobbies", "Hospitals/clinics", "Visitor lanes"];
    case "full_height_turnstile":
      return ["Restricted zones", "Perimeter entry", "High-security sites"];
    case "waist_high_turnstile":
      return ["General entry points", "Moderate traffic areas", "Staff entrances"];
    case "ai_face_turnstile":
      return ["Smart offices", "Factories (attendance)", "IT parks"];
    default:
      return ["Access control projects", "Attendance workflows", "Site entrances"];
  }
}

export const useCases = [
  { title: "Office & Corporate Buildings", desc: "Manage staff access and visitor flow with clear reports." },
  { title: "Factories & Industrial Sites", desc: "Shift attendance, entry control and restricted-zone policies." },
  { title: "Banks & Financial Institutions", desc: "Audit-friendly access with stronger anti-tailgating options." },
  { title: "Universities & Campuses", desc: "Student/staff entry control with group rules and schedules." },
  { title: "Hospitals & Clinics", desc: "Wide lanes for wheelchairs/trolleys and controlled entry points." },
  { title: "Public Venues", desc: "Busy entrances that need flow control and accountability." },
];

export const howItWorks = [
  {
    title: "Access verification",
    desc: "User taps RFID, scans QR, or verifies with fingerprint/face. The controller checks permission before opening the lane.",
  },
  {
    title: "Gate release + sensor monitoring",
    desc: "The lane opens for a single pass and sensors help reduce tailgating or wrong-direction movement.",
  },
  {
    title: "Entry and exit logging",
    desc: "Every passage can be recorded for security audit, reporting and attendance accuracy.",
  },
  {
    title: "Attendance & HR integration (optional)",
    desc: "Logs can be exported or synced for attendance reports, payroll support and compliance tracking.",
  },
  {
    title: "Visitor rules and schedules",
    desc: "Time-based access, user groups and guest policies can be configured based on your building needs.",
  },
  {
    title: "Security policies",
    desc: "Anti-passback rules, alarms and strict access settings improve enforcement and reduce misuse.",
  },
];

export const benefits = [
  {
    title: "Controlled entry",
    desc: "Only authorized users can pass through the lane using your chosen access method.",
  },
  {
    title: "Reduced tailgating",
    desc: "Sensors and proper configuration reduce the chance of multiple people passing on one authorization.",
  },
  {
    title: "Accurate attendance records",
    desc: "Entry/exit logs support attendance reporting for factories, offices and institutions.",
  },
  {
    title: "Better visitor management",
    desc: "Guest access can be time-limited and managed with clear logs for accountability.",
  },
  {
    title: "Smoother people flow",
    desc: "Right lane planning reduces congestion during peak hours and shift changes.",
  },
  {
    title: "Audit-ready reporting",
    desc: "Downloadable logs help with compliance checks, investigations and internal controls.",
  },
];

export const turnstileSelectionCriteria = [
  {
    title: "Traffic Volume",
    desc: "Determine daily pedestrian flow to choose appropriate gate speed.",
  },
  {
    title: "Security Level",
    desc: "Select gate type based on required security such as medium, high or maximum.",
  },
  {
    title: "Installation Environment",
    desc: "Indoor or outdoor placement affects gate choice, finish and material selection.",
  },
  {
    title: "Access Control Integration",
    desc: "Check compatibility with RFID, fingerprint, face recognition, QR code or visitor management system.",
  },
  {
    title: "Emergency & Accessibility",
    desc: "Consider emergency drop-arm, swing lanes or wheelchair access for safe movement.",
  },
  {
    title: "Material & Durability",
    desc: "Stainless steel SS304 or SS316 helps ensure long-lasting use in demanding sites.",
  },
  {
    title: "Lane Width",
    desc: "Choose gate width based on user type, including single lane, double lane or wide swing passage.",
  },
  {
    title: "Software & Reporting",
    desc: "Ensure attendance, monitoring or VMS integration is supported by the access platform.",
  },
  {
    title: "Warranty & Support",
    desc: "Confirm the supplier provides installation, training and nationwide after-sales service.",
  },
];

export const whyChooseFeatures = [
  {
    title: "Free Site Survey & BOQ Planning",
    desc: "Our engineers assess entrance layout, user traffic flow, lane requirements and installation conditions before preparing the final BOQ and implementation plan.",
  },
  {
    title: "Access Control Integration",
    desc: "Seamlessly integrate turnstile gates with face recognition, fingerprint attendance, RFID card systems, QR code access, visitor management systems and HR software. Ideal for an access control system with RFID turnstile gate workflows, face recognition turnstile access and attendance management system reporting.",
  },
  {
    title: "Professional Installation Team",
    desc: "Certified technicians ensure proper mounting, clean cable management, controller configuration, testing and commissioning for reliable long-term operation.",
  },
  {
    title: "Software Setup & User Training",
    desc: "We configure access permissions, attendance settings, reporting functions and provide complete training for administrators, HR teams and security personnel.",
  },
  {
    title: "1-3 Year Warranty Support",
    desc: "Selected solutions include warranty coverage, genuine spare parts support and technical assistance to ensure long-term system reliability.",
  },
  {
    title: "Nationwide Service & Maintenance",
    desc: "We provide preventive maintenance, troubleshooting, remote assistance and on-site support services for clients throughout Bangladesh.",
  },
];

export const deliveryProcess = [
  {
    step: "01",
    title: "Site survey & measurement",
    desc: "We verify lane width, clearance, mounting positions and traffic direction for correct planning.",
  },
  {
    step: "02",
    title: "Model + access method selection",
 desc: "Tripod, flap, swing or full-height-plus RFID/face/fingerprint/QR based on flow and security needs.",
  },
  {
    step: "03",
    title: "Power & network preparation",
    desc: "We plan power and LAN routes and confirm controller placement for clean installation.",
  },
  {
    step: "04",
    title: "Installation & commissioning",
    desc: "Gate body, readers, sensors and safety components are installed, tested and tuned.",
  },
  {
    step: "05",
    title: "Software setup & rules",
    desc: "Groups, schedules, anti-passback (if needed) and reporting are configured for your policy.",
  },
  {
    step: "06",
    title: "Handover & training",
    desc: "Admin/security training and documentation so your team can operate the system confidently.",
  },
];

export const faqs = [
  {
    q: "What is a turnstile gate system?",
    a: "A turnstile gate system controls entry by allowing only authorized users to pass using RFID, fingerprint, face recognition, QR or PIN. It helps with security, access control and attendance tracking.",
  },
  {
    q: "Which type of turnstile is best for my building?",
    a: "It depends on people flow, security level and entrance space. Tripod is common for factories/staff entry, flap/swing suits premium lobbies, and full-height is preferred for high-security zones.",
  },
  {
    q: "Can it integrate with attendance software?",
 a: "Yes-entry and exit logs can be used for attendance reporting and exports. Integration scope depends on your chosen access devices and reporting needs.",
  },
  {
    q: "What access methods can I use?",
    a: "Common options include RFID card, fingerprint, face recognition, QR code and PIN. We recommend a combination based on security policy and user experience.",
  },
  {
    q: "What is anti-tailgating and anti-passback?",
    a: "Anti-tailgating helps prevent two people from entering with one authorization. Anti-passback prevents re-entry without a recorded exit, improving log accuracy and policy enforcement.",
  },
  {
    q: "How much does a turnstile gate system cost in Bangladesh?",
    a: "Cost depends on gate type, lane count, access device (RFID/face/fingerprint), controller, wiring and software scope. Share your requirements for an accurate quotation.",
  },
  {
    q: "How long does installation take?",
    a: "Timeline varies by site readiness and lane count. Many projects complete installation and configuration within a few days after power/LAN readiness is confirmed.",
  },
  {
    q: "Do you provide training and support?",
    a: "Yes. We provide configuration, commissioning and handover training for admins/security, plus support for troubleshooting and maintenance as needed.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((x) => ({
    "@type": "Question",
    name: x.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: x.a,
    },
  })),
};

export const turnstileTypes = [
  {
    icon: "TT",
    title: "Tripod Turnstile Gate",
    desc: "A cost-effective tripod turnstile gate access control system for factories, offices, schools, and staff entrances. It is suitable for medium traffic environments where reliable entry control is required.",
    bestFor: "Factories, Garments, Staff Entry",
  },
  {
    icon: "FB",
    title: "Flap Barrier Gate",
    desc: "An elegant flap barrier gate with fast retractable acrylic barriers, designed for modern security entrance system projects in corporate buildings and premium facilities.",
    bestFor: "Corporate Offices, Banks, Hotels",
  },
  {
    icon: "SG",
    title: "Speed Gate Turnstile",
    desc: "A high-speed intelligent pedestrian access control system with premium appearance, smooth operation, and strong performance for busy commercial entrances.",
    bestFor: "Corporate Lobby, IT Parks, Commercial Buildings",
  },
  {
    icon: "SB",
    title: "Swing Barrier Gate",
    desc: "A wider passage swing barrier gate suitable for wheelchair users, trolleys, visitor lanes, and locations where accessibility and controlled movement are both important.",
    bestFor: "Hospitals, Airports, Shopping Malls",
  },
  {
    icon: "FH",
    title: "Full Height Turnstile",
    desc: "A maximum security full height turnstile gate designed to prevent unauthorized access in high-security areas, restricted zones, and industrial facilities.",
    bestFor: "Industrial Sites, Power Plants, Restricted Areas",
  },
  {
    icon: "OT",
    title: "Optical Turnstile Gate",
    desc: "An advanced optical turnstile with sensor-based entrance control for contactless, seamless, and professional pedestrian access in smart buildings.",
    bestFor: "Smart Buildings, Data Centers, Enterprise Facilities",
  },
];

export const turnstilePriceSlugs = [
  "tripod-turnstile-gate-access-control-system",
  "flap-barrier-access-control-gate",
  "swing-barrier-speed-gate-turnstile",
  "full-height-turnstile-gate-for-factory-restricted-entry",
  "waist-high-turnstile-gate-single-double-lane",
  "ai-face-recognition-turnstile-gate",
  "ds312-flap-turnstile-gate",
  "daosafe-ds112-tripod-turnstile",
] as const;

export const turnstilePriceRows = turnstilePriceSlugs.map((slug) => {
  const item = turnstileCatalog.find((product) => product.slug === slug);
  if (!item) throw new Error(`Missing turnstile product for price table: ${slug}`);

  return {
    slug: item.slug,
    type: item.title,
    price: item.priceLabel,
  };
});

