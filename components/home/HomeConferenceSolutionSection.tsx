import Image from "next/image";
import Link from "next/link";
import HomeSectionHeadingIcon from "./HomeSectionHeadingIcon";

type LineIconKind =
  | "microphone"
  | "camera"
  | "processor"
  | "display"
  | "meeting"
  | "tools"
  | "integration"
  | "shield"
  | "performance";

function LineIcon({ kind, className = "h-5 w-5" }: { kind: LineIconKind; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<LineIconKind, React.ReactNode> = {
    microphone: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4M9 21h6" /></>,
    camera: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3M7 6l1.2-2h4L13.5 6" /></>,
    processor: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7v10M15 7v10M12 9v6M3 8h2M3 12h2M3 16h2M19 8h2M19 12h2M19 16h2" /></>,
    display: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    meeting: <><circle cx="7" cy="8" r="2" /><circle cx="17" cy="8" r="2" /><circle cx="12" cy="6" r="2" /><path d="M3.5 18v-4a3.5 3.5 0 0 1 7 0v4M13.5 18v-4a3.5 3.5 0 0 1 7 0v4M9 17v-5a3 3 0 0 1 6 0v5" /></>,
    tools: <path d="M14.7 6.3a4 4 0 0 0-5 5L3.5 17.5a2.1 2.1 0 0 0 3 3l6.2-6.2a4 4 0 0 0 5-5l-2.4 2.4-3-3 2.4-2.4Z" />,
    integration: <><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="12" cy="17" r="2.5" /><path d="m9 8.5 2 6M15 8.5l-2 6M9.5 7h5" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z" /><path d="m9.5 12 1.8 1.8 3.6-4" /></>,
    performance: <><circle cx="12" cy="12" r="9" /><path d="m12 7-2 5h4l-2 5M8 4.5l1 2M16 4.5l-1 2" /></>,
  };

  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>{paths[kind]}</svg>;
}

const features: Array<{ title: string; text: string; icon: LineIconKind }> = [
  { title: "Conference Microphones", text: "Wired and wireless delegate and chairman units", icon: "microphone" },
  { title: "PTZ Cameras", text: "Crystal-clear video with intelligent auto tracking", icon: "camera" },
  { title: "DSP & Audio Processor", text: "High-quality sound processing and feedback control", icon: "processor" },
  { title: "Display & Collaboration", text: "4K displays, interactive panels and wireless sharing", icon: "display" },
  { title: "Zoom / Teams Integration", text: "A seamless hybrid meeting experience", icon: "meeting" },
  { title: "Installation & Support", text: "Professional installation and dependable after-sales support", icon: "tools" },
];

const equipment = [
  {
    name: "Conference Microphone",
    image: "/assets/conference-system/products/brands/bosch/Bosch CCSD-CL Discussion Chairman Unit.webp",
  },
  { name: "PTZ Camera", custom: true },
  {
    name: "DSP Processor",
    image: "/assets/conference-system/products/core/SPON SAP-F88E 8x8 Digital Audio Processor with DSP.png",
  },
  {
    name: "Amplifier",
    image: "/assets/conference-system/products/core/SPON GEN-5301P26 Network Integrated Amplifier.webp",
  },
  { name: "Ceiling Speaker", image: "/assets/conference-system/products/brands/honeywell/Honeywell-HN-CL06-E-6W-Ceiling-Loudspeaker-300x300.webp" },
];

const benefits: Array<{ title: string; text: string; icon: LineIconKind }> = [
  { title: "Smart Integration", text: "All devices work seamlessly together.", icon: "integration" },
  { title: "Scalable Solutions", text: "From huddle rooms to large conference halls.", icon: "shield" },
  { title: "Reliable Performance", text: "Built with premium brands for long-term reliability.", icon: "performance" },
];

function PtzCameraIllustration() {
  return (
    <svg viewBox="0 0 120 76" className="h-full w-full" role="img" aria-label="PTZ camera">
      <defs>
        <linearGradient id="cameraBody" x1="0" x2="1">
          <stop offset="0" stopColor="#dfe4ea" />
          <stop offset="1" stopColor="#929cab" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="66" rx="35" ry="6" fill="#dce3ec" />
      <rect x="31" y="50" width="58" height="14" rx="4" fill="#758191" />
      <path d="M37 50c1-13 9-22 23-22s22 9 23 22Z" fill="url(#cameraBody)" />
      <rect x="43" y="13" width="34" height="34" rx="12" fill="#aeb7c4" />
      <rect x="48" y="18" width="24" height="24" rx="8" fill="#172033" />
      <circle cx="60" cy="30" r="8" fill="#071936" />
      <circle cx="58" cy="28" r="3.5" fill="#3b82f6" opacity=".7" />
    </svg>
  );
}

export default function HomeConferenceSolutionSection() {
  return (
    <section id="conference-room-solutions" className="home-conference-solution scroll-mt-24 overflow-hidden" aria-labelledby="conference-solution-title">
      <div className="home-conference-solution-grid">
        <div className="home-conference-copy flex flex-col justify-center px-5 py-7 sm:px-7">
          <p className="home-conference-eyebrow home-section-badge">
            <HomeSectionHeadingIcon kind="conference" size="badge" />
            <span>Featured Solution</span>
          </p>
          <h2 id="conference-solution-title" className="home-conference-title mt-2 flex items-start gap-2 !pb-0 font-extrabold tracking-[-0.025em] text-[#071936] after:!hidden">
            <HomeSectionHeadingIcon kind="conference" />
            <span>
              Complete <span className="text-[#1660e8]">Conference<br className="hidden sm:block" /> Room Solutions</span>
            </span>
          </h2>
          <p className="home-conference-description home-section-subtitle mt-3 max-w-[390px] font-medium text-slate-600">
            Integrated audio, video and control solutions for modern meeting rooms with Zoom / Microsoft Teams compatibility.
          </p>

          <div className="home-conference-features mt-5">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <span className="home-conference-feature-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-[#f2f7ff] text-[#1256d9]">
                  <LineIcon kind={feature.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="home-conference-feature-title !pb-0 font-extrabold text-[#071936] after:!hidden">{feature.title}</h3>
                  <p className="home-conference-feature-copy mt-0.5 font-medium text-slate-600">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="home-conference-actions mt-5 flex flex-wrap gap-2.5">
            <Link href="/contact/" className="home-conference-cta home-conference-primary inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-[11px] font-extrabold text-white transition hover:-translate-y-0.5">
              Design My Meeting Room
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/conference-system/" className="home-conference-cta home-conference-secondary inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-[#1456d9] bg-white px-3 text-[11px] font-extrabold text-[#1456d9] transition hover:bg-blue-50">
              Download Solution Guide
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>

        <div className="home-conference-panel-wrap min-w-0">
          <div className="home-conference-panel overflow-hidden rounded-xl bg-white shadow-[0_10px_28px_rgba(15,23,42,0.10)]">
            <div className="home-conference-visual relative overflow-hidden">
              <Image
                src="/assets/home/hero/conference-room-clean.webp"
                unoptimized
                data-image-quality="original"
                alt="Modern conference room solution with microphones, display and control system"
                fill
                sizes="(max-width: 1023px) 100vw, 62vw"
                className="home-conference-room-image object-cover object-right"
              />
            </div>

            <div className="px-3 pb-3 pt-3.5 sm:px-4">
              <h3 className="home-conference-system-title !pb-0 text-center font-extrabold text-[#071936] after:!hidden">A Complete System for Every Meeting Room</h3>
              <div className="home-conference-equipment-grid mt-3 grid gap-y-4">
                {equipment.map((item, index) => (
                  <div key={item.name} className={`home-conference-equipment-item px-2 text-center ${index > 0 ? "sm:border-l sm:border-slate-200" : ""}`}>
                    <div className="home-conference-equipment-image mx-auto w-full max-w-[105px]">
                      {item.custom ? (
                        <PtzCameraIllustration />
                      ) : (
                        <div className="relative h-full w-full">
                          <Image src={item.image!} alt={item.name} fill sizes="105px" className="object-contain" />
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-[9.5px] font-bold leading-3 text-[#071936]">{item.name}</p>
                  </div>
                ))}
              </div>

              <div className="home-conference-benefits mt-3 grid gap-3 border-t border-slate-200 pt-3 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-2">
                    <span className="home-conference-benefit-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf4ff] text-[#1456d9]">
                      <LineIcon kind={benefit.icon} className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-[10px] font-extrabold leading-4 text-[#071936]">{benefit.title}</h4>
                      <p className="text-[9px] font-medium leading-3.5 text-slate-600">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .home-conference-solution { background: radial-gradient(circle at 92% 8%, #f4f8ff 0, #fbfdff 35%, #fff 73%); }
        .home-conference-solution, .home-conference-solution * { text-align: left; }
        .home-conference-solution p, .home-conference-solution h2, .home-conference-solution h3, .home-conference-solution h4 { white-space: normal !important; overflow-wrap: anywhere; }
        .home-conference-solution-grid { display: grid; grid-template-columns: minmax(0, 1fr); }
        .home-conference-panel-wrap { padding: 12px; }
        .home-conference-eyebrow { color: #1456d9 !important; }
        .home-conference-features { display: grid; row-gap: 10px; }
        .home-conference-feature-icon { color: #1456d9 !important; background-color: #edf4ff !important; border-color: #d9e7fb !important; }
        .home-conference-feature-icon svg { color: #1456d9 !important; }
        .home-conference-equipment-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .home-conference-equipment-image { height: 64px !important; }
        .home-conference-visual { height: 245px !important; }
        .home-conference-title { font-size: var(--site-h2-size) !important; line-height: 1.08 !important; }
        .home-conference-description { font-size: var(--site-section-subtitle-size) !important; line-height: 20px !important; }
        .home-conference-feature-title { font-size: 11px !important; line-height: 15px !important; }
        .home-conference-feature-copy { font-size: 10.5px !important; line-height: 16px !important; }
        .home-conference-system-title { font-size: 12px !important; line-height: 17px !important; text-align: center !important; }
        .home-conference-room-image { transform: scale(1.33); transform-origin: right center; }
        .home-conference-cta { padding-left: 10px !important; padding-right: 10px !important; white-space: nowrap !important; }
        .home-conference-primary { background: #071936 !important; box-shadow: 0 7px 16px rgba(7,25,54,.15); }
        .home-conference-secondary { color: #1456d9 !important; background: #fff !important; }
        .home-conference-benefit-icon { display: flex !important; width: 32px !important; height: 32px !important; border: 1px solid #d9e7fb !important; border-radius: 999px !important; background: #edf4ff !important; color: #1456d9 !important; align-items: center; justify-content: center; }
        .home-conference-benefit-icon svg { color: #1456d9 !important; }
        @media (max-width: 639px) {
          .home-conference-actions { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; }
          .home-conference-cta { width: 100%; }
        }
        @media (min-width: 640px) {
          .home-conference-equipment-grid { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
          .home-conference-visual { height: 300px !important; }
        }
        @media (min-width: 768px) {
          .home-conference-solution-grid { grid-template-columns: minmax(0, 39fr) minmax(0, 61fr); }
          .home-conference-copy { justify-content: flex-start !important; padding: 34px 10px 30px 40px !important; }
          .home-conference-panel-wrap { padding: 30px 36px 30px 18px !important; }
          .home-conference-visual { height: 322px !important; }
          .home-conference-equipment-image { height: 70px !important; }
          .home-conference-equipment-item + .home-conference-equipment-item { border-left: 1px solid #e8edf5 !important; }
          .home-conference-benefits { min-height: 66px; align-items: center; }
          .home-conference-title { font-size: var(--site-h2-size) !important; line-height: 1.12 !important; }
        }
      `}</style>
    </section>
  );
}
