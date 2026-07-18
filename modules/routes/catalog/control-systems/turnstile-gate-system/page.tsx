import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { formatBdtRange, normalizeDisplayedPriceText } from "@/lib/price";
import { socialImageUrl } from "@/lib/seo";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FaqAccordion from "@/components/common/FaqAccordion";
import MobileIntroText from "@/components/common/MobileIntroText";
import { homeBreadcrumb } from "@/lib/breadcrumbs";
import ProductGridCard from "@/components/products/ProductGridCard";
import ResponsiveProductCarousel from "@/components/products/ResponsiveProductCarousel";
import { turnstileCatalog, type TurnstileItem, type TurnstileKind } from "./catalog";

const BRAND = { maroon: "#FF6A00", maroonDark: "#E45700" };
const PAGE_TITLE = "Turnstile Gate Price in Bangladesh 2026";

function getKindLabel(kind: TurnstileKind): string {
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

function getListingQuickFeatures(item: TurnstileItem): string[] {
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

function getListingBestFor(item: TurnstileItem): string[] {
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

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
  alternates: { canonical: "/turnstile-gate/" },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
    url: "/turnstile-gate",
    type: "website",
    images: [
      {
        url: socialImageUrl("/images/Turnstile-gate-System.webp"),
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description:
      "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
    images: [socialImageUrl("/images/Turnstile-gate-System.webp")],
  },
};

const useCases = [
  { title: "Office & Corporate Buildings", desc: "Manage staff access and visitor flow with clear reports." },
  { title: "Factories & Industrial Sites", desc: "Shift attendance, entry control and restricted-zone policies." },
  { title: "Banks & Financial Institutions", desc: "Audit-friendly access with stronger anti-tailgating options." },
  { title: "Universities & Campuses", desc: "Student/staff entry control with group rules and schedules." },
  { title: "Hospitals & Clinics", desc: "Wide lanes for wheelchairs/trolleys and controlled entry points." },
  { title: "Public Venues", desc: "Busy entrances that need flow control and accountability." },
];

const commonGoals = [
  "Control visitor flow",
  "Stop unauthorized entry",
  "Keep accurate entry/exit logs",
  "Improve security compliance",
];

const howItWorks = [
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

const benefits = [
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

const turnstileComparisonCards = [
  {
    title: "Tripod Turnstile Gate",
    desc: "Cost-effective and durable solution for staff entry and medium traffic control. Commonly used in factories and offices.",
    points: ["Medium security", "High durability", "Budget-friendly", "RFID / fingerprint compatible"],
  },
  {
    title: "Flap Barrier Gate",
    desc: "Modern and premium access control system with retractable acrylic wings for smooth pedestrian flow.",
    points: ["High security", "Fast throughput", "Elegant design", "Ideal for corporate buildings"],
  },
  {
    title: "Speed Gate Turnstile",
    desc: "Ultra-fast, premium glass barrier system designed for corporate lobbies and smart buildings.",
    points: ["Very high speed access", "AI/Face recognition support", "Premium appearance", "Intelligent control system"],
  },
  {
    title: "Full Height Turnstile",
    desc: "Maximum security solution designed to prevent unauthorized entry in restricted areas.",
    points: ["Maximum security level", "Anti-tailgating protection", "Outdoor/industrial use", "Strong steel structure"],
  },
];

const turnstileComparisonRows = [
  {
    type: "Tripod Turnstile Gate",
    security: "Medium",
    speed: "Medium",
    bestFor: "Factories, offices, staff entry and attendance control",
    price: formatBdtRange([350000, 480000]),
  },
  {
    type: "Flap Barrier Gate",
    security: "High",
    speed: "Fast",
    bestFor: "Corporate buildings, banks, reception areas and commercial entrances",
    price: formatBdtRange([520000, 850000]),
  },
  {
    type: "Speed Gate Turnstile",
    security: "Very High",
    speed: "Very Fast",
    bestFor: "Premium offices, smart buildings and face recognition entry",
    price: formatBdtRange([550000, 780000]),
  },
  {
    type: "Full Height Turnstile",
    security: "Maximum",
    speed: "Controlled",
    bestFor: "Industrial sites, restricted zones and outdoor security entrances",
    price: formatBdtRange([750000, 1100000]),
  },
];

const turnstileSelectionCriteria = [
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

const whyChooseFeatures = [
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

const turnstileTrustItems = [
  "Free Site Survey",
  "Certified Engineers",
  "Face Recognition Integration",
  "1-3 Year Warranty",
  "Nationwide Support",
  "Training Included",
];

const deliveryProcess = [
  {
    step: "01",
    title: "Site survey & measurement",
    desc: "We verify lane width, clearance, mounting positions and traffic direction for correct planning.",
  },
  {
    step: "02",
    title: "Model + access method selection",
    desc: "Tripod, flap, swing or full-height—plus RFID/face/fingerprint/QR based on flow and security needs.",
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

const faqs = [
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
    a: "Yes—entry and exit logs can be used for attendance reporting and exports. Integration scope depends on your chosen access devices and reporting needs.",
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

const faqJsonLd = {
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

const quickCategories = [
  { label: "Tripod Turnstile", desc: "Best value for staff entry points" },
  { label: "Flap Barrier", desc: "Premium lobby look with fast flow" },
  { label: "Swing / Speed Gate", desc: "Wider lane for visitors & accessibility" },
  { label: "Full Height", desc: "Strong security for restricted zones" },
  { label: "RFID / Card", desc: "Simple access method for teams" },
  { label: "Fingerprint", desc: "Reliable identity verification" },
  { label: "Face / QR", desc: "Modern, quick & touchless options" },
  { label: "Anti-tailgating", desc: "Reduces unauthorized follow-through" },
  { label: "Software & Reports", desc: "Logs, permissions, exports & admin" },
];

const turnstileTypes = [
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

const legacyTurnstilePriceRows = [
  {
    type: "Tripod Turnstile Gate",
    price: "৳350,000 – ৳480,000",
  },
  {
    type: "Waist-High Turnstile Gate",
    price: "৳295,000 – ৳620,000",
  },
  {
    type: "Swing Turnstile Gate",
    price: "৳340,000 – ৳495,000",
  },
  {
    type: "Flap Barrier Turnstile Gate",
    price: "৳520,000 – ৳850,000",
  },
  {
    type: "Speed Gate Turnstile",
    price: "৳550,000 – ৳780,000",
  },
  {
    type: "Full Height Turnstile Gate",
    price: "৳750,000 – ৳1,100,000",
  },
  {
    type: "AI Face Recognition Turnstile Gate",
    price: "৳650,000 – ৳1,200,000",
  },
  {
    type: "RFID Access Control Turnstile System",
    price: "৳380,000 – ৳650,000",
  },
  {
    type: "QR Code / Ticketing Turnstile System",
    price: "৳480,000 – ৳900,000",
  },
];

const turnstilePriceSlugs = [
  "tripod-turnstile-gate-access-control-system",
  "flap-barrier-access-control-gate",
  "swing-barrier-speed-gate-turnstile",
  "full-height-turnstile-gate-for-factory-restricted-entry",
  "waist-high-turnstile-gate-single-double-lane",
  "ai-face-recognition-turnstile-gate",
  "ds312-flap-turnstile-gate",
  "daosafe-ds112-tripod-turnstile",
] as const;

const turnstilePriceRows = turnstilePriceSlugs.map((slug) => {
  const item = turnstileCatalog.find((product) => product.slug === slug);
  if (!item) throw new Error(`Missing turnstile product for price table: ${slug}`);

  return {
    slug: item.slug,
    type: item.title,
    price: item.priceLabel,
  };
});

export default function TurnstileGateSystemPage() {
  const wa = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 md:px-6">
      <Breadcrumbs
        items={[
          homeBreadcrumb(),
          { href: "/turnstile-gate/", label: "Turnstile Gate", current: true },
        ]}
        className="mb-4 text-sm text-slate-600"
      />
      <section
        className="mobile-page-intro-card rounded-none border-0 bg-transparent p-0 shadow-none ring-0 md:rounded-3xl md:border md:border-orange-100 md:p-[15px] md:shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:ring-1 md:ring-orange-50 md:[background:linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(255,247,237,0.92)_48%,rgba(248,250,252,1)_100%)]"
      >
        <div className="w-full">
          <h1 className="text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 md:text-4xl">
            {PAGE_TITLE}
          </h1>
          <MobileIntroText
            teaser="Professional turnstile gate and access control solutions for offices, factories, campuses and secure entry points in Bangladesh."
            expandedClassName="mt-4"
            desktopClassName="mt-4"
          >
            <div className="space-y-4 text-justify text-[15px] leading-[1.8] text-slate-700 md:text-base">
              <p>
                Mugnee Multiple Ltd. is a trusted <strong className="font-extrabold text-slate-950">turnstile gate supplier in Bangladesh</strong>, offering professional <strong className="font-extrabold text-slate-950">access control system</strong> solutions for offices, factories, garments, banks, hospitals, universities, government organizations, commercial buildings, and industrial facilities. We supply and install <strong className="font-extrabold text-slate-950">tripod turnstile gate</strong>, <strong className="font-extrabold text-slate-950">flap barrier gate</strong>, <strong className="font-extrabold text-slate-950">speed gate turnstile</strong>, <strong className="font-extrabold text-slate-950">swing barrier gate</strong>, and <strong className="font-extrabold text-slate-950">full height turnstile</strong> systems for secure and efficient entry control.
              </p>
              <p>
                Our <strong className="font-extrabold text-slate-950">office turnstile gate</strong>, <strong className="font-extrabold text-slate-950">factory turnstile gate</strong>, and <strong className="font-extrabold text-slate-950">security entrance system</strong> solutions can integrate with <strong className="font-extrabold text-slate-950">RFID access control</strong>, <strong className="font-extrabold text-slate-950">face recognition access control</strong>, <strong className="font-extrabold text-slate-950">fingerprint attendance system</strong>, QR code verification, visitor management software, and attendance software. For the latest <strong className="font-extrabold text-slate-950">turnstile gate price in Bangladesh</strong>, we provide site survey, system design, installation, commissioning, user training, and nationwide after-sales support.
              </p>
            </div>
          </MobileIntroText>
        </div>
      </section>

      {false && (
      <>
      <section
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y bg-amber-900"
        style={{ minHeight: "clamp(680px, calc(100svh - 64px), 920px)", borderColor: `${BRAND.maroon}12` }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/Turnstile-gate-System.webp')", backgroundSize: "100% 100%" }}
          />
          <div className="absolute inset-0 bg-black/25" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.18))",
            }}
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-10 md:px-10 md:py-12">
          <div className="flex max-w-4xl flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                style={{ background: `${BRAND.maroon}24` }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: BRAND.maroon }} />
                Access Control
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
                Turnstile Gate System in Bangladesh
              </h1>
            </div>

            <p className="w-full text-justify leading-7 text-white/85">
              Install a reliable turnstile gate solution for secure entry control and optional attendance reporting. We
              provide lane planning, wiring, controller integration, software configuration and training—with RFID,
              fingerprint, face recognition and QR access options.
            </p>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                { k: "Access methods", v: "RFID / Fingerprint / Face / QR" },
                { k: "Best for", v: "Office / Factory / Campus / Secure sites" },
                { k: "Outputs", v: "Logs, reports & attendance (optional)" },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-white/15 bg-white/10 p-4 shadow-sm backdrop-blur">
                  <div className="text-xs font-bold text-white">{x.k}</div>
                  <div className="mt-1 text-sm text-white/85">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-1 flex flex-wrap gap-2 text-xs font-semibold text-white/90">
              {["Anti-tailgating logic", "Visitor & employee access", "Real-time logs & reports", "Power + LAN wiring"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur"
                  title={t}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                Request a Quotation
              </Link>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
              >
                WhatsApp
              </a>
              <Link
                href="#popular-models"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/15 hover:shadow-md"
              >
                Explore Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] md:p-[15px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Turnstile Gate Models & Access Control Options
          </h2>
          <p className="hidden text-slate-600 leading-7 text-justify md:block">
            Choose the right gate type based on security level, entrance space and people flow. Share lane width, lane
            count and preferred access method (RFID/fingerprint/face/QR) and we will propose a practical solution and
            BOQ.
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {quickCategories.map((c) => (
              <span
                key={c.label}
                className="rounded-full border bg-white px-4 py-2 text-xs font-semibold text-slate-700"
                style={{ borderColor: `${BRAND.maroon}14` }}
                title={c.desc}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </section>
      </>
      )}

      <section id="popular-models" className="mt-[10px]">
        <ResponsiveProductCarousel desktopClassName="md:grid-cols-2 lg:grid-cols-3">
          {turnstileCatalog.map((m) => {
            const detailHref = `/turnstile-gate/${m.slug}/`;
            const kindLabel = getKindLabel(m.kind);
            const quickFeatures = getListingQuickFeatures(m);
            const bestFor = getListingBestFor(m);
            return (
              <ProductGridCard
                key={m.slug}
                href={detailHref}
                title={m.title}
                image={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image}
                    alt={m.title}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                }
                imageContainerClassName="bg-orange-50"
                borderColor={`${BRAND.maroon}42`}
                cardClassName="md:ring-1 md:ring-orange-100 md:shadow-[0_16px_42px_rgba(15,23,42,0.12)] md:hover:ring-orange-300 md:hover:shadow-[0_24px_60px_rgba(255,106,0,0.18)]"
                topLeftBadge={{ text: "Turnstile", tone: "light" }}
                topRightBadge={{ text: kindLabel, tone: "dark" }}
                metaLines={[{ text: `Price: ${m.priceLabel}`, className: "mt-1 text-sm font-semibold text-sky-700" }]}
                bullets={quickFeatures}
                chips={bestFor}
                accentColor={BRAND.maroon}
                contactHref="/contact"
                compactMobile
                viewDetailsLabel="View details →"
              />
            );
          })}
        </ResponsiveProductCarousel>
      </section>

      <section className="mt-[10px] rounded-2xl border border-slate-200 bg-white p-[10px] shadow-sm md:p-[15px]">
        <div className="mx-auto text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
            Turnstile Gate Price Breakdown in Bangladesh 2026
          </h2>
          <p className="mx-auto mt-4 w-full text-justify text-sm leading-7 text-slate-700 md:text-base md:leading-8">
            Turnstile gate price in Bangladesh usually starts from {normalizeDisplayedPriceText("295,000 BDT")} and can exceed {normalizeDisplayedPriceText("1,200,000 BDT")} depending
            on the gate type, lane configuration, access control device, body material, sensor system, software
            integration, installation requirements, and warranty support. Mugnee Multiple Ltd. provides complete
            turnstile gate solutions including product supply, site survey, RFID access control, face recognition access
            control, fingerprint attendance integration, visitor management system setup, installation, commissioning,
            and after-sales support across Bangladesh.
          </p>
        </div>

        <div className="my-8 h-px bg-slate-200" />

        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-slate-950 md:text-2xl">
            Estimated Turnstile Gate Price List in Bangladesh
          </h3>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full table-fixed border-collapse text-left text-[12px] sm:text-sm">
              <thead className="bg-sky-700 text-white">
                <tr>
                  <th className="w-[58%] break-words px-3 py-3 font-extrabold sm:px-5 sm:py-4">
                    Turnstile Gate Type / Model
                  </th>
                  <th className="w-[42%] break-words px-3 py-3 text-right font-extrabold sm:px-5 sm:py-4">
                    Price in Bangladesh
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {turnstilePriceRows.map((item) => (
                  <tr key={item.slug} className="align-top transition hover:bg-slate-50">
                    <td className="break-words px-3 py-3 font-semibold leading-5 text-slate-950 sm:px-5 sm:py-4 sm:leading-6">
                      <Link
                        href={`/turnstile-gate/${item.slug}/`}
                        className="text-slate-950 transition hover:text-sky-700 hover:underline"
                      >
                        {item.type}
                      </Link>
                    </td>
                    <td className="break-words px-3 py-3 text-right font-extrabold leading-5 text-slate-900 sm:px-5 sm:py-4 sm:leading-6">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            Final turnstile gate price, tripod turnstile gate price, flap barrier gate price, speed gate turnstile
            price, full height turnstile price, RFID turnstile gate cost, and face recognition turnstile gate package
            depend on site conditions and integration scope. Contact a trusted turnstile gate supplier in Bangladesh for
            an accurate access control turnstile system quotation.
          </p>
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] shadow-sm ring-1 ring-slate-200/70 md:p-[15px]">
        <div className="w-full">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">Turnstile Gate Types</h2>
          <p className="mt-3 text-justify text-[15px] leading-7 text-slate-600 md:text-base">
            Different turnstile gate models are suitable for different security, access control, and traffic management
            requirements. As a professional turnstile gate supplier in Bangladesh, Mugnee Multiple Ltd. helps businesses
            choose the right security entrance system based on entrance space, user volume, access method, and budget.
            From a compact tripod turnstile gate to premium speed gate turnstile and optical turnstile solutions, each
            system offers a different balance of flow control, appearance, and security.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {turnstileTypes.map((type) => (
            <article
              key={type.title}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-black text-white shadow-sm transition duration-300 group-hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroon}, ${BRAND.maroonDark})` }}
              >
                {type.icon}
              </div>
              <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-950">{type.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{type.desc}</p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Best For</div>
                <div className="mt-1 text-sm font-extrabold text-slate-900">{type.bestFor}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-orange-100 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
              Need Help Choosing the Right Turnstile Gate?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Our experts can recommend the best turnstile gate solution based on your security requirements, traffic
              volume, and budget.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: BRAND.maroonDark }}
          >
            Request Free Consultation
          </Link>
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[15px]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">How a Turnstile Gate System Works</h2>
            <p className="mt-2 text-slate-600 leading-7 text-justify">
              A turnstile system uses access devices, controller rules and sensors to allow only authorized entry. We set
              up the logic so day-to-day operation stays smooth and reliable.
            </p>
          </div>
        </div>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((x) => (
            <div
              key={x.title}
              className="rounded-3xl border bg-white p-6 shadow-sm"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-lg font-extrabold text-slate-900">{x.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{x.desc}</div>
              <div className="mt-4 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] md:p-[15px]">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Where Turnstile Gate Systems Are Needed</h2>
        <p className="mt-2 text-slate-600 leading-7 text-justify">
          Turnstile gates are ideal when you need controlled entry, clear logs and better security at busy entrances.
          Below are common use cases and goals.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {commonGoals.map((g) => (
            <span
              key={g}
              className="rounded-full border bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700"
              style={{ borderColor: `${BRAND.maroon}14` }}
            >
              {g}
            </span>
          ))}
        </div>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((x) => (
            <div
              key={x.title}
              className="rounded-3xl border bg-slate-50 p-6"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-lg font-extrabold text-slate-900">{x.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{x.desc}</div>
              <div className="mt-4 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] md:p-[15px]">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Benefits of Installing Turnstile Gates</h2>
        <p className="mt-2 text-slate-600 leading-7 text-justify">
          A properly planned and configured gate improves entry security, access control and attendance accuracy. These
          are the most practical outcomes for offices, factories and institutions.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((x) => (
            <div
              key={x.title}
              className="rounded-3xl border bg-white p-6 shadow-sm"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-lg font-extrabold text-slate-900">{x.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{x.desc}</div>
              <div className="mt-4 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] md:p-[15px]">
        <div className="w-full text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
            Tripod vs Flap Barrier vs Speed Gate vs Full Height Turnstile
          </h2>
          <p className="mt-4 text-justify text-[15px] leading-7 text-slate-600 md:text-base md:leading-8">
            Different <strong className="font-extrabold text-slate-950">turnstile gate</strong> types are used for
            different security levels, traffic flow and access control requirements. A{" "}
            <strong className="font-extrabold text-slate-950">tripod turnstile gate</strong> is practical for staff
            entry, while a <strong className="font-extrabold text-slate-950">flap barrier gate</strong> suits premium
            office entrances. A <strong className="font-extrabold text-slate-950">speed gate turnstile</strong> supports
            faster smart-building access, and a{" "}
            <strong className="font-extrabold text-slate-950">full height turnstile</strong> is preferred for restricted
            zones. For any <strong className="font-extrabold text-slate-950">access control system Bangladesh</strong>{" "}
            project, the right <strong className="font-extrabold text-slate-950">security entrance system</strong>{" "}
            depends on site layout, user volume and verification method.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
          {turnstileComparisonCards.map((card) => (
            <article
              key={card.title}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-xl"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.desc}</p>
              <ul className="mt-auto space-y-3 pt-5 text-sm font-semibold text-slate-700">
                {card.points.map((point) => (
                  <li key={`${card.title}-${point}`} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_0_4px_rgba(255,106,0,0.12)]"
                      style={{ background: BRAND.maroon }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-50 px-5 py-5 md:px-7">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-950 md:text-2xl">
              Quick Comparison of Turnstile Gate Types
            </h3>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {turnstileComparisonRows.map((row) => (
              <article
                key={row.type}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h4 className="text-base font-extrabold text-slate-950">{row.type}</h4>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Security Level
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{row.security}</div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                      Speed
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">{row.speed}</div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    Best For
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-700">{row.bestFor}</div>
                </div>

                <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange-700">
                    Price Range in Bangladesh
                  </div>
                  <div className="mt-1 text-sm font-extrabold text-slate-950">{row.price}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead className="bg-sky-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-extrabold">Type</th>
                  <th className="px-5 py-4 font-extrabold">Security Level</th>
                  <th className="px-5 py-4 font-extrabold">Speed</th>
                  <th className="px-5 py-4 font-extrabold">Best For</th>
                  <th className="px-5 py-4 font-extrabold">Price Range in Bangladesh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {turnstileComparisonRows.map((row) => (
                  <tr key={row.type} className="align-top transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-extrabold text-slate-950">{row.type}</td>
                    <td className="px-5 py-4 text-slate-700">{row.security}</td>
                    <td className="px-5 py-4 text-slate-700">{row.speed}</td>
                    <td className="px-5 py-4 leading-6 text-slate-700">{row.bestFor}</td>
                    <td className="px-5 py-4 font-extrabold text-slate-900">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-justify text-sm leading-7 text-slate-600 md:text-[15px]">
          The final <strong className="font-extrabold text-slate-950">turnstile gate price in Bangladesh</strong>{" "}
          depends on lane quantity, controller, sensor quality, installation scope and software integration.{" "}
          <strong className="font-extrabold text-slate-950">Tripod turnstile gate price</strong>,{" "}
          <strong className="font-extrabold text-slate-950">flap barrier gate price</strong>,{" "}
          <strong className="font-extrabold text-slate-950">speed gate turnstile price</strong> and{" "}
          <strong className="font-extrabold text-slate-950">full height turnstile price</strong> may also vary when
          adding an <strong className="font-extrabold text-slate-950">RFID access control system</strong>, fingerprint
          reader, QR reader or <strong className="font-extrabold text-slate-950">face recognition turnstile gate</strong>{" "}
          for a complete{" "}
          <strong className="font-extrabold text-slate-950">security entrance system Bangladesh</strong> solution.
        </p>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] shadow-sm ring-1 ring-slate-200/70 md:p-[15px]">
        <div className="w-full">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
            How to Choose the Right Turnstile Gate in Bangladesh
          </h2>
          <p className="mt-4 text-justify text-[15px] leading-7 text-slate-600 md:text-base md:leading-8">
            Selecting the right <strong className="font-extrabold text-slate-950">turnstile gate</strong> depends on
            traffic volume, security level, installation environment and{" "}
            <strong className="font-extrabold text-slate-950">access control system</strong> integration. A{" "}
            <strong className="font-extrabold text-slate-950">tripod turnstile gate</strong> is suitable for staff
            entry, while a <strong className="font-extrabold text-slate-950">flap barrier gate</strong> supports faster
            corporate movement. For premium lobbies, a{" "}
            <strong className="font-extrabold text-slate-950">speed gate turnstile</strong> offers smart access, and a{" "}
            <strong className="font-extrabold text-slate-950">full height turnstile</strong> works best for restricted
            zones. A trusted{" "}
            <strong className="font-extrabold text-slate-950">turnstile gate supplier in Bangladesh</strong> can design a
            reliable <strong className="font-extrabold text-slate-950">security entrance system Bangladesh</strong>{" "}
            solution based on your site.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {turnstileSelectionCriteria.map((item, idx) => (
            <article
              key={item.title}
              className="group flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-7 rounded-2xl border border-orange-100 bg-white p-5 text-justify text-sm leading-7 text-slate-600 shadow-sm md:text-[15px]">
          For the best <strong className="font-extrabold text-slate-950">turnstile gate in Bangladesh</strong>, contact a
          professional <strong className="font-extrabold text-slate-950">turnstile gate supplier Bangladesh</strong> team
          for site survey, model selection and free consultation. Sasha Corporation can recommend the right{" "}
          <strong className="font-extrabold text-slate-950">access control turnstile system</strong>, including{" "}
          <strong className="font-extrabold text-slate-950">tripod turnstile gate</strong>,{" "}
          <strong className="font-extrabold text-slate-950">flap barrier gate</strong>,{" "}
          <strong className="font-extrabold text-slate-950">speed gate turnstile</strong> or{" "}
          <strong className="font-extrabold text-slate-950">full height turnstile</strong> options for your entrance.
        </p>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[15px]">
        <header className="rounded-3xl border bg-white px-5 py-6 shadow-sm md:px-7 md:py-7" style={{ borderColor: "rgba(249,115,22,0.14)" }}>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Why Choose Sasha Corporation for Turnstile Gate Solutions
          </h2>
          <p className="mt-3 max-w-5xl text-justify text-sm leading-7 text-slate-600 md:text-[15px]">
            Sasha Corporation provides complete turnstile gate solutions in Bangladesh, including site survey, access
            control integration, installation, software setup, training and after-sales support. Our experienced team
            helps organizations deploy reliable turnstile systems for offices, factories, educational institutions,
            hospitals and high-security facilities.
          </p>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseFeatures.map((feature, index) => (
            <article
              key={feature.title}
              className="group flex h-full flex-col rounded-3xl border bg-white p-[15px] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: "rgba(249,115,22,0.16)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-sm font-extrabold"
                  style={{
                    borderColor: "rgba(249,115,22,0.18)",
                    background: "rgba(249,115,22,0.08)",
                    color: "#f97316",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-extrabold leading-snug text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.desc}</p>
                </div>
              </div>
              <div className="mt-auto pt-5">
                <div
                  className="h-1.5 w-14 rounded-full transition-all duration-300 group-hover:w-24"
                  style={{ background: "linear-gradient(90deg, #f97316, rgba(249,115,22,0.35))" }}
                />
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-6 rounded-3xl border px-5 py-4"
          style={{ borderColor: "rgba(249,115,22,0.14)", background: "rgba(249,115,22,0.04)" }}
        >
          <ul className="flex flex-wrap gap-x-4 gap-y-3 text-sm font-semibold text-slate-700">
            {turnstileTrustItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2" style={{ borderColor: "rgba(249,115,22,0.12)" }}>
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-extrabold text-white"
                  style={{ background: "#f97316" }}
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="mt-6 rounded-3xl border bg-white px-5 py-5 text-justify text-sm leading-7 text-slate-600 shadow-sm md:text-[15px]"
          style={{ borderColor: "rgba(249,115,22,0.14)" }}
        >
          Whether you need a <strong className="font-extrabold text-slate-950">tripod turnstile gate</strong>,{" "}
          <strong className="font-extrabold text-slate-950">flap barrier gate</strong>,{" "}
          <strong className="font-extrabold text-slate-950">speed gate turnstile</strong> or{" "}
          <strong className="font-extrabold text-slate-950">full height turnstile</strong> system, Sasha Corporation can
          design and deploy the right access control solution for your organization. We help businesses improve security,
          automate attendance tracking and manage visitor access with reliable turnstile gate systems in Bangladesh. From
          an <strong className="font-extrabold text-slate-950">RFID turnstile gate</strong> linked to an{" "}
          <strong className="font-extrabold text-slate-950">attendance management system</strong> to a{" "}
          <strong className="font-extrabold text-slate-950">face recognition turnstile</strong> for touchless entry, we
          align each deployment to your site layout, user volume and security policy.
        </p>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] md:p-[15px]">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Recommended Packages</h2>
        <p className="mt-2 text-slate-600 leading-7 text-justify">
          Packages vary by lane count, access mode and integration scope. Choose a starting package and we will refine
          the BOQ after reviewing your entrance details.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Office Package",
              desc: "Flap or swing barrier with RFID/face options, visitor control and reporting.",
              items: ["Gate body + controller", "Access device (RFID/face)", "Software setup, rules & training"],
            },
            {
              title: "Factory Package",
              desc: "Tripod (or full height) with RFID/fingerprint for staff entry and attendance reporting.",
              items: ["Gate + controller", "RFID/fingerprint device", "Shift rules & exports (optional)"],
            },
            {
              title: "Secure Zone Package",
              desc: "Full-height gate with stricter rules for restricted areas and perimeters.",
              items: ["Full-height gate", "Biometric/RFID device", "Anti-passback & audit logs (optional)"],
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border bg-white p-6 shadow-sm"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="text-lg font-extrabold text-slate-900">{p.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">{p.desc}</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {p.items.map((x) => (
                  <li key={`${p.title}-${x}`} className="flex gap-2">
                    <span aria-hidden="true" style={{ color: BRAND.maroon }}>
                      •
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="rounded-xl px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:shadow-md"
                  style={{ background: BRAND.maroonDark }}
                >
                  Request a Quotation
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl bg-white p-[10px] md:p-[15px]">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Planning & Delivery Process for Turnstile Gate Projects
        </h2>
        <p className="mt-2 text-slate-600 leading-7 text-justify">
          Long-term reliability comes from correct lane planning, tidy wiring, stable controller integration and accurate
          software configuration.
        </p>

        <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliveryProcess.map((x) => (
            <div
              key={x.step}
              className="rounded-3xl border bg-slate-50 p-6"
              style={{ borderColor: `${BRAND.maroon}12` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-extrabold text-white"
                  style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
                >
                  {x.step}
                </div>
                <div className="text-base font-extrabold text-slate-900">{x.title}</div>
              </div>
              <div className="mt-3 text-sm leading-6 text-slate-600">{x.desc}</div>
              <div className="mt-4 h-1 w-10 rounded-full" style={{ background: `${BRAND.maroon}B3` }} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[10px] rounded-3xl border bg-white p-[10px] md:p-[15px]" style={{ borderColor: `${BRAND.maroon}12` }}>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
            <p className="mt-2 text-slate-600 leading-7 text-justify">
              Quick answers about tripod turnstile, flap barrier, swing gate, full-height gates and access methods like
              RFID and face recognition.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <FaqAccordion accent={BRAND.maroon} items={faqs} />
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </section>

      <section
        className="mt-[10px] overflow-hidden rounded-3xl border bg-white p-[10px] md:p-[15px]"
        style={{ borderColor: `${BRAND.maroon}12` }}
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Need a Turnstile Gate System for Your Building?
        </h2>
        <p className="mt-2 text-slate-600 leading-7 text-justify">
          Share entrance width, lane count, access mode (RFID/face/fingerprint/QR) and whether you need attendance/HR
          integration. We will propose a practical package with clear pricing and an implementation plan.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-xl px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: `linear-gradient(135deg, ${BRAND.maroonDark}, ${BRAND.maroon})` }}
          >
            Send Project Details
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
          >
            WhatsApp Engineering Team
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="rounded-xl border bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
            style={{ borderColor: `${BRAND.maroon}22` }}
          >
            Call: {siteConfig.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
