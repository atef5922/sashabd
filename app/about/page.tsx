import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";
import { homeBrandLogos } from "@/components/home/HomeTrustServiceStrip";
import responsiveStyles from "./about-responsive.module.css";

export const metadata: Metadata = {
  title: { absolute: `About ${BRAND_NAME}` },
  description:
    "Learn about Sasha Corporation, our mission, service standards, and long-term support approach across Bangladesh.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: `About ${BRAND_NAME} | Company Profile`,
    description:
      "Sasha Corporation company profile, mission, vision and service commitment.",
    url: "/about/",
    type: "website",
    images: [
      {
        url: socialImageUrl(),
        width: 1200,
        height: 630,
        alt: `About ${BRAND_NAME} | Company Profile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${BRAND_NAME} | Company Profile`,
    description:
      "Sasha Corporation company profile, mission, vision and service commitment.",
    images: [socialImageUrl()],
  },
};

function SolutionIcon({ name }: { name: string }) {
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "display") return <svg viewBox="0 0 24 24"><rect {...line} x="3" y="4" width="18" height="13" rx="2" /><path {...line} d="M8 21h8M12 17v4" /></svg>;
  if (name === "conference") return <svg viewBox="0 0 24 24"><circle {...line} cx="8" cy="8" r="3" /><circle {...line} cx="17" cy="9" r="2.5" /><path {...line} d="M2.5 20c.4-4.2 2.3-6.3 5.5-6.3s5.1 2.1 5.5 6.3M14 14.2c3.9-.8 6.5 1.1 7 4.8" /></svg>;
  if (name === "audio") return <svg viewBox="0 0 24 24"><path {...line} d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" /></svg>;
  if (name === "security") return <svg viewBox="0 0 24 24"><path {...line} d="M12 3 5 6v6c0 4.4 2.8 7.3 7 9 4.2-1.7 7-4.6 7-9V6l-7-3Z" /><path {...line} d="m9 12 2 2 4-4" /></svg>;
  if (name === "engineering") return <svg viewBox="0 0 24 24"><circle {...line} cx="12" cy="12" r="3" /><path {...line} d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>;
  return <svg viewBox="0 0 24 24"><path {...line} d="M4 15a4 4 0 0 1 4-4h1a3 3 0 0 1 6 0h1a4 4 0 0 1 4 4v3a2 2 0 0 1-2 2h-2v-5h4M4 15h4v5H6a2 2 0 0 1-2-2v-3ZM12 5V2M9 3h6" /></svg>;
}

export default function AboutPage() {
  const solutions = [
    { icon: "display", title: "Display Solutions", text: "LED displays, video walls and professional display solutions for every space." },
    { icon: "conference", title: "Conference & Collaboration", text: "Audio, video and collaboration solutions for modern meeting and conference spaces." },
    { icon: "audio", title: "Professional Audio", text: "PA systems, background music and audio solutions for commercial and public spaces." },
    { icon: "security", title: "Access & Security", text: "Turnstile gates, access control and integrated security solutions for safer environments." },
    { icon: "engineering", title: "Engineering & BOQ", text: "Solution design, system integration and BOQ support based on real project needs." },
    { icon: "support", title: "Installation & Support", text: "Professional installation, commissioning and long-term technical support for peace of mind." },
  ];

  const journey = [
    { year: "2012", image: "/assets/projects/project-chattogram-card.webp", title: "Started with Display Solutions", text: "Began our journey with LED display solutions, serving businesses across Bangladesh." },
    { year: "2014", image: "/assets/conference-system/landing/conference-system-hero-clear.webp", title: "Expanded to Conference & AV", text: "Introduced conference and collaboration solutions for modern workplaces." },
    { year: "2016", image: "/assets/control-systems/turnstile/turnstile-entrance-hero-v2.webp", title: "Added PA & Access Control", text: "Extended our portfolio with professional audio systems and security access solutions." },
    { year: "2019", image: "/assets/about/about-who-we-are-building.webp", title: "Delivered Integrated Projects", text: "Started handling large-scale integrated projects for corporate, government and commercial spaces." },
    { year: "Today", image: "/assets/shared/hero.webp", title: "A Broader Technology Partner", text: "Now a trusted provider of end-to-end technology solutions for smarter, safer and more connected spaces." },
  ];

  return (
    <main className={`${responsiveStyles.page} w-full bg-transparent`}>
      <div className="mx-auto w-full pb-8 pt-0">
        <section id="about-hero" className="relative isolate overflow-hidden bg-white">
          <Image src="/assets/about/about-hero-banner.webp" alt="Modern Sasha Corporation AV and conference showroom" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,252,255,.88)_0%,rgba(248,252,255,.72)_27%,rgba(248,252,255,.36)_43%,rgba(248,252,255,.06)_60%,transparent_72%)]" />
          <div className="relative mx-auto min-h-[clamp(260px,27vw,420px)] max-w-[1440px] px-6 py-7 md:flex md:items-center md:px-8 lg:px-0">
            <div className="max-w-[680px]">
              <p className="flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[.14em] text-[#52658f] before:h-[3px] before:w-10 before:bg-[#ff6a00]">About Sasha Corporation</p>
              <h1 className="!mt-3 !text-[clamp(30px,3.55vw,54px)] font-black leading-[1.04] tracking-[-.05em] text-[#10275a]">Technology &amp; AV<br />Solution Provider<br /><span className="text-[#f26b16]">in Bangladesh</span></h1>
              <p className="mt-3 max-w-[640px] text-[clamp(10px,1vw,15px)] leading-[1.45] text-[#52658f]">We deliver professional display, conference, audio and access-control solutions — from planning and BOQ to supply, installation, integration and long-term technical support.</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[clamp(8px,.72vw,11px)] font-bold text-[#10275a] sm:max-w-[640px] sm:grid-cols-6">
                {[['▣', 'LED Display'], ['♧', 'Conference'], ['◈', 'PA System'], ['◫', 'Turnstile'], ['▣', 'Interactive Display'], ['▤', 'Digital Podium']].map(([icon, label]) => <span key={label} className="flex flex-col items-center gap-2 text-center"><i className="text-[23px] not-italic text-[#1465ef]">{icon}</i>{label}</span>)}
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row"><Link href="/" className="inline-flex min-h-[clamp(34px,3.2vw,48px)] items-center justify-center rounded-lg bg-[#ff6a00] px-[clamp(14px,1.8vw,28px)] text-[clamp(10px,1vw,14px)] font-extrabold text-white shadow-[0_10px_22px_rgba(255,106,0,.2)]">Explore Our Solutions <span className="ml-4 text-lg">→</span></Link><Link href="/contact/" className="inline-flex min-h-[clamp(34px,3.2vw,48px)] items-center justify-center rounded-lg border border-[#397bfa] bg-white/75 px-[clamp(14px,1.8vw,28px)] text-[clamp(10px,1vw,14px)] font-extrabold text-[#10275a]">Contact Our Team</Link></div>
            </div>
          </div>
        </section>

        <section id="about-who" className="overflow-hidden bg-[#f3f8ff]">
          <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.35fr)]">
          <div className="about-who-image relative min-h-[220px] self-stretch overflow-hidden sm:min-h-[300px] lg:my-[clamp(18px,2.2vw,34px)] lg:min-h-0"><Image src="/assets/about/about-who-we-are-building.webp" alt="Sasha Corporation office building" fill sizes="(max-width: 1023px) 100vw, 42vw" className="object-cover object-center" /></div>
          <div className="relative px-[clamp(22px,4vw,58px)] py-[clamp(18px,2.2vw,34px)]"><p className="flex items-center gap-3 text-[clamp(9px,.8vw,12px)] font-extrabold uppercase tracking-[.14em] text-[#52658f] before:h-[2px] before:w-8 before:bg-[#ff6a00]">Who we are</p><h2 className="!mt-3 max-w-[78%] !text-[clamp(25px,2.4vw,36px)] font-black leading-tight tracking-[-.04em] text-[#10275a]">A Trusted Partner for Modern Spaces</h2><p className="mt-3 max-w-[78%] text-[clamp(10px,1vw,14px)] !text-left leading-[1.5] text-[#52658f]">Sasha Corporation is a technology-focused company providing professional display, conference, audio and access-control solutions across Bangladesh. We work with businesses, educational institutions, government organizations and commercial spaces to create smarter, safer and more connected environments.</p><p className="mt-2 max-w-[78%] text-[clamp(10px,1vw,14px)] !text-left leading-[1.5] text-[#52658f]">With a strong focus on engineering, reliable products and dedicated support, we help our clients turn ideas into real-world solutions.</p><p className="pointer-events-none absolute right-[3%] top-[11%] hidden w-[17%] -rotate-6 text-right font-serif text-[clamp(16px,2vw,28px)] font-semibold italic leading-[1.05] !text-[#b8c8e3] sm:block">Building<br />Better Spaces<br />Together<span className="mx-auto mt-2 block h-px w-24 -rotate-6 bg-[#b8c8e3]" /></p><div className="mt-4 grid grid-cols-2 items-stretch gap-2 sm:grid-cols-4">{[['⚙', 'Engineering-Led', 'Solution design based on real project needs.'], ['◇', 'Multi-Brand Solutions', 'The right technology from trusted global brands.'], ['♧', 'Nationwide Support', 'Project delivery and technical support across Bangladesh.'], ['◉', 'After-Sales Service', 'Long-term technical support and maintenance for peace of mind.']].map(([icon, title, text]) => <article key={title} className="min-h-[92px] rounded-xl border border-[#dce9fb] bg-white/75 p-[clamp(9px,1vw,16px)] shadow-[0_8px_20px_rgba(16,39,90,.04)]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e5f0ff] text-base text-[#1465ef]">{icon}</span><h3 className="mt-2 text-[clamp(10px,.9vw,13px)] !text-left font-extrabold leading-5 text-[#10275a]">{title}</h3><p className="mt-1 text-[clamp(8px,.75vw,11px)] !text-left leading-[1.4] text-[#52658f]">{text}</p></article>)}</div></div>
          </div>
        </section>

        <section id="about-stats" className="border-y border-[#dce9fb] bg-[linear-gradient(110deg,#f8fbff,#eef6ff)] px-4 py-4 sm:px-6 md:px-10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {[['▥', '100+', 'Projects Delivered'], ['♧', '80+', 'Happy Clients'], ['✥', '8+', 'Years of Experience'], ['⌾', 'Nationwide', 'Service Coverage']].map(([icon, value, label]) => (
              <article key={label} className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#dce9fb] bg-white/90 px-3 py-3 shadow-[0_5px_14px_rgba(16,39,90,.05)] transition hover:-translate-y-0.5 hover:border-[#b9d3fb] hover:shadow-[0_8px_20px_rgba(16,39,90,.09)] sm:px-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#e8f2ff] text-xl font-bold text-[#1465ef] ring-1 ring-inset ring-[#d3e5ff] transition group-hover:bg-[#1465ef] group-hover:text-white">{icon}</span>
                <span className="min-w-0">
                  <strong className="block truncate text-[clamp(16px,1.6vw,22px)] font-black leading-none tracking-[-.03em] text-[#10275a]">{value}</strong>
                  <small className="mt-1 block text-[clamp(8px,.75vw,11px)] font-semibold uppercase leading-tight tracking-[.04em] text-[#60749c]">{label}</small>
                </span>
              </article>
            ))}
          </div>
        </section>

        <section id="about-journey" className="relative overflow-hidden bg-[linear-gradient(110deg,#f7fbff,#edf6ff)] px-6 py-7 md:px-10 lg:px-12 lg:py-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(180,215,250,.22),transparent_52%)]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
            <div className="relative"><p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">Our story</p><h2 className="mt-3 !text-[clamp(32px,3vw,48px)] font-black leading-none tracking-[-.045em] text-[#10275a]">Our Journey</h2><p className="mt-3 text-[13px] leading-5 text-[#52658f]">From display solutions to complete technology and AV systems, Sasha Corporation has grown steadily to become a trusted partner for modern spaces across Bangladesh.</p><p className="mt-6 hidden max-w-[230px] -rotate-6 font-serif text-[clamp(17px,1.55vw,23px)] font-semibold italic leading-[1.05] text-[#a9bddc] lg:block">Growing<br />Together for a<br />Smarter Bangladesh<span className="mx-auto mt-3 block h-px w-24 -rotate-6 bg-[#a9bddc]" /></p></div>
            <div className="relative min-w-0 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div className="about-journey-track relative grid min-w-[920px] grid-cols-5 items-stretch gap-3 pt-1 before:absolute before:left-[8%] before:right-[8%] before:top-[162px] before:h-0.5 before:bg-[#77aaff]">{journey.map((item) => <article key={item.year} className="relative z-10 min-w-0"><div className="about-journey-card h-full min-h-[270px] rounded-lg border-8 border-white bg-white shadow-[0_5px_14px_rgba(16,39,90,.08)]"><div className="about-journey-image relative h-[140px] overflow-hidden rounded-sm"><Image src={item.image} alt="" fill sizes="180px" className="object-cover" /></div><div className="px-2 pb-4 pt-1"><div className="relative h-3 border-t border-[#77aaff]"><span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full border-2 border-[#1465ef] bg-white" /></div><h3 className="!mt-2 min-h-[30px] !text-[11px] !font-extrabold !leading-[1.2] text-[#10275a]">{item.title}</h3><p className="!mt-1 !text-[10px] !leading-[1.35] !text-left text-[#52658f]">{item.text}</p></div></div></article>)}</div></div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section id="about-solutions" aria-labelledby="what-we-do-heading" className="overflow-hidden bg-[linear-gradient(110deg,#f8fbff,#edf6ff)] px-6 py-8 md:px-10 lg:px-12">
          <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-stretch">
            <div className="flex flex-col justify-center">
              <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">What we do</p>
              <h2 id="what-we-do-heading" className="mt-3 !text-[clamp(32px,3vw,48px)] font-black leading-[.95] tracking-[-.05em] text-[#10275a]">What We Do</h2>
              <p className="mt-2 max-w-[260px] !text-left text-[clamp(16px,1.35vw,20px)] font-medium leading-[1.3] tracking-[-.015em] text-[#304b81]">Complete Technology Solutions for Modern Spaces</p>
              <p className="mt-4 max-w-[270px] text-[12px] leading-[1.55] text-[#52658f]">We provide end-to-end display, conference, audio, security and integration solutions, backed by expert engineering and dedicated support. Our goal is to help you create smarter, more connected environments that work today and tomorrow.</p>
              <Link href="/led-display/" className="mt-5 inline-flex w-fit items-center justify-center rounded-lg bg-[#ff6a00] px-5 py-3 text-[12px] font-extrabold text-white shadow-[0_10px_22px_rgba(255,106,0,.2)] transition hover:bg-[#e85f00]">Explore All Solutions <span aria-hidden="true" className="ml-4 text-base">→</span></Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution, index) => (
                <article key={solution.title} className="group relative min-h-[146px] overflow-hidden rounded-xl border border-[#d7e6fa] bg-[linear-gradient(145deg,#fff_0%,#f8fbff_100%)] p-4 shadow-[0_7px_20px_rgba(16,39,90,.055)] transition duration-300 hover:-translate-y-0.5 hover:border-[#a9c9f8] hover:shadow-[0_12px_26px_rgba(16,39,90,.1)]">
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#1465ef,#62a0ff)] transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[#e9f2ff] text-[#1465ef] ring-1 ring-inset ring-[#d5e6ff] [&>svg]:h-5 [&>svg]:w-5"><SolutionIcon name={solution.icon} /></span>
                    <span className="text-[10px] font-black tracking-[.14em] text-[#b6c7df]">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 text-[15px] font-black leading-tight tracking-[-.025em] text-[#10275a]">{solution.title}</h3>
                  <p className="mt-2 max-w-[260px] text-[10px] leading-[1.45] text-[#52658f]">{solution.text}</p>
                  <span aria-hidden="true" className="absolute bottom-4 right-4 text-base text-[#a9bfdc] transition group-hover:translate-x-0.5 group-hover:text-[#1465ef]">→</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION, VISION & VALUES */}
        <section id="about-purpose" aria-labelledby="purpose-heading" className="relative overflow-hidden border-t border-[#dce9fb] bg-[linear-gradient(105deg,#f9fcff_0%,#f4f9ff_62%,#eaf4ff_100%)] px-6 py-6 md:px-10 lg:px-12">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] overflow-hidden lg:block">
            <Image src="/assets/about/bangladesh-memorial-skyline.png" alt="" fill sizes="38vw" className="object-cover object-right-bottom contrast-[1.06] saturate-[1.08]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,.35)_14%,transparent_30%)]" />
            <p className="absolute right-[3.5%] top-[13%] -rotate-6 text-right font-serif text-[clamp(16px,1.65vw,24px)] font-semibold italic leading-[1.05] text-[#91a7ca]">Technology<br />for a Brighter<br />Bangladesh<span className="mx-auto mt-2 block h-px w-20 -rotate-6 bg-[#91a7ca]" /></p>
          </div>
          <div className="relative mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[240px_minmax(0,750px)] lg:items-center lg:gap-5">
            <div>
              <p className="flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[.15em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">Our mission, vision &amp; values</p>
              <h2 id="purpose-heading" className="mt-3 !text-[clamp(28px,2.5vw,38px)] font-black leading-[1.02] tracking-[-.045em] text-[#10275a]">Building a<br />Smarter Tomorrow</h2>
              <p className="mt-3 max-w-[230px] text-[10px] leading-[1.5] text-[#52658f]">Our mission, vision and values guide everything we do—from the solutions we design to the relationships we build with our clients.</p>
            </div>

            <div className="relative z-10 grid gap-3 sm:grid-cols-3">
              <article className="rounded-[10px] border border-[#dce9fb] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(16,39,90,.07)] backdrop-blur-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e9f1ff] text-base font-bold text-[#1465ef] ring-1 ring-inset ring-[#dbe8ff]">◎</span>
                <h3 className="mt-2 text-[13px] font-black text-[#10275a]">Our Mission</h3>
                <p className="mt-1.5 text-[9px] leading-[1.42] text-[#52658f]">To deliver reliable and innovative technology solutions that help businesses and communities in Bangladesh work, communicate and grow better.</p>
              </article>
              <article className="rounded-[10px] border border-[#dce9fb] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(16,39,90,.07)] backdrop-blur-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff0e7] text-base font-bold text-[#ff6a00] ring-1 ring-inset ring-[#ffe0cc]">◉</span>
                <h3 className="mt-2 text-[13px] font-black text-[#10275a]">Our Vision</h3>
                <p className="mt-1.5 text-[9px] leading-[1.42] text-[#52658f]">To be the most trusted technology and AV solutions provider in Bangladesh, recognized for quality, innovation and positive impact on modern spaces.</p>
              </article>
              <article className="rounded-[10px] border border-[#dce9fb] bg-white/95 p-3.5 shadow-[0_8px_24px_rgba(16,39,90,.07)] backdrop-blur-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e6f8ef] text-base font-bold text-[#13a86b] ring-1 ring-inset ring-[#d4f2e3]">◇</span>
                <h3 className="mt-2 text-[13px] font-black text-[#10275a]">Our Values</h3>
                <ul className="mt-1.5 space-y-1 text-[9px] leading-[1.25] text-[#52658f]">
                  {['Quality in everything we do', 'Transparency in our relationships', 'Technical responsibility', 'Customer commitment'].map((value) => <li key={value} className="flex items-start gap-1.5"><span aria-hidden="true" className="mt-px grid h-3 w-3 shrink-0 place-items-center rounded-full bg-[#18bd7a] text-[7px] font-black text-white">✓</span>{value}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY BRANDS */}
        <section id="about-brands" aria-labelledby="brands-heading" className="border-t border-[#dce9fb] bg-[linear-gradient(110deg,#f9fcff,#eff7ff)] px-6 py-7 md:px-10 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">Technology brands</p>
                <h2 id="brands-heading" className="mt-2 !text-[clamp(27px,2.5vw,38px)] font-black leading-none tracking-[-.045em] text-[#10275a]">Global Brands We Work With</h2>
                <p className="mt-2 text-[11px] leading-5 text-[#52658f]">We partner with world-renowned technology brands to ensure reliable performance and long-term value for our clients.</p>
              </div>
                <Link href="/led-display/" className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-[#1465ef] bg-white px-5 text-[10px] font-extrabold text-[#1465ef] transition hover:bg-[#1465ef] hover:text-white">View All Brands <span aria-hidden="true" className="ml-4 text-sm">→</span></Link>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {['Display & AV', 'Conference & Audio', 'Access & Security'].map((category, index) => <span key={category} className={`inline-flex h-9 shrink-0 items-center rounded-md border px-7 text-[10px] font-bold ${index === 0 ? 'border-[#ff6a00] bg-[#ff6a00] text-white shadow-[0_7px_16px_rgba(255,106,0,.18)]' : 'border-[#cfdef3] bg-white/75 text-[#10275a]'}`}>{category}</span>)}
            </div>

            <div aria-label="Technology brand partners" className="group relative mt-4 min-h-[74px] overflow-hidden rounded-lg border border-[#dce9fb] bg-white px-3 shadow-[0_7px_20px_rgba(16,39,90,.05)]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white via-white/90 to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/90 to-transparent" />
              <div className="about-brand-track home-brand-marquee-track flex min-h-[72px] w-max items-center will-change-transform group-hover:[animation-play-state:paused] motion-reduce:transform-none motion-reduce:animate-none">
                {[0, 1].map((groupIndex) => (
                  <div key={groupIndex} aria-hidden={groupIndex === 1 ? "true" : undefined} className="flex shrink-0 items-center">
                    {homeBrandLogos.map((brand) => (
                      <Link key={`${groupIndex}-${brand.name}`} href={brand.href} prefetch={false} aria-label={groupIndex === 0 ? `Browse ${brand.name} solutions` : undefined} tabIndex={groupIndex === 1 ? -1 : undefined} className="about-brand-cell relative flex h-10 w-[128px] shrink-0 items-center justify-center overflow-hidden border-r border-[#dce9fb] px-4 transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1465ef]">
                        <Image src={brand.src} alt={groupIndex === 0 ? `${brand.name} logo` : ""} width={128} height={40} className={`${brand.className} w-auto max-w-[108px] object-contain`} />
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* OUR COMMITMENT */}
        <section id="about-commitment" aria-labelledby="commitment-heading" className="relative overflow-hidden bg-white px-6 py-7 md:px-10 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(201,222,248,.32),transparent_28%)]" />
          <p className="pointer-events-none absolute right-[6%] top-[14%] hidden -rotate-6 text-right font-serif text-[clamp(18px,2vw,28px)] font-semibold italic leading-[1.02] text-[#9bb0d0] md:block">Building<br />Better Spaces<br />Together<span className="mx-auto mt-2 block h-px w-20 -rotate-6 bg-[#9bb0d0]" /></p>
          <div className="relative mx-auto max-w-[1440px]">
            <p className="flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">Our commitment</p>
            <h2 id="commitment-heading" className="mt-2 !text-[clamp(27px,2.5vw,38px)] font-black leading-none tracking-[-.045em] text-[#10275a]">More Than a Supplier</h2>
            <p className="mt-2 max-w-[590px] text-[11px] leading-[1.45] text-[#52658f]">We are committed to delivering complete solutions with professionalism, reliability and long-term support.</p>

            <div className="about-commitment-grid mt-6 grid gap-4 sm:grid-cols-2 lg:max-w-[1080px] lg:grid-cols-4 lg:gap-0">
              {[
                ['▤', 'Engineering & BOQ', 'Requirement analysis, site survey and tailored solution design.'],
                ['⚒', 'Professional Installation', 'Skilled team for proper and safe installation.'],
                ['⚙', 'System Integration', 'Complete integration for seamless performance.'],
                ['⌾', 'Technical Support', 'Long-term support and maintenance for peace of mind.'],
              ].map(([icon, title, text], index) => (
                <article key={title} className={`flex items-start gap-3 lg:px-5 ${index === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-[#dce9fb]'}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#72a9ff] bg-[#f5f9ff] text-xl font-bold text-[#1465ef] shadow-[0_4px_12px_rgba(20,101,239,.08)]">{icon}</span>
                  <span><h3 className="text-[11px] font-black leading-tight text-[#10275a]">{title}</h3><p className="mt-1 text-[9px] leading-[1.4] text-[#52658f]">{text}</p></span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT CTA */}
        <section id="about-project-cta" aria-labelledby="project-cta-heading" className="relative isolate overflow-hidden bg-[#052b56] px-6 py-7 text-white md:px-10 lg:px-12">
          <Image src="/assets/about/technology-project-cta.png" alt="Modern glass technology office building illuminated at dusk" fill sizes="100vw" className="-z-10 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,35,68,.99)_0%,rgba(2,35,68,.96)_37%,rgba(2,35,68,.34)_69%,rgba(2,35,68,.28)_100%)]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[minmax(0,520px)_minmax(260px,1fr)] lg:items-center">
            <div>
              <p className="flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[.16em] text-white/75 before:h-0.5 before:w-8 before:bg-[#ff6a00]">Let&apos;s work together</p>
              <h2 id="project-cta-heading" className="mt-2 !text-[clamp(28px,2.7vw,41px)] font-black leading-none tracking-[-.045em] text-white">Planning a Technology Project?</h2>
              <p className="mt-2 text-[12px] text-white/85">Talk to our team for expert advice, site survey and a customized solution.</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link href="/contact/" className="inline-flex h-11 items-center justify-center rounded-md bg-[#ff6a00] px-6 text-[11px] font-extrabold text-white shadow-[0_10px_24px_rgba(255,106,0,.25)] transition hover:bg-[#ec6200]">Request a Consultation <span aria-hidden="true" className="ml-4 text-base">→</span></Link>
                <Link href="/contact/" className="inline-flex h-11 items-center justify-center rounded-md border border-white/80 bg-[#052b56]/30 px-6 text-[11px] font-extrabold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#10275a]">Contact Our Team <span aria-hidden="true" className="ml-4 text-base">→</span></Link>
              </div>
            </div>
            <div className="grid max-w-[260px] grid-cols-2 gap-x-5 gap-y-3 text-[9px] font-bold text-white/90 lg:justify-self-start">
              {['Quick Response', 'Expert Advice', 'Customized Solution', 'On-Site Support'].map((item, index) => <span key={item} className="flex items-center gap-2"><i className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/45 text-[9px] not-italic text-[#9dc6ff]">{['◔', '▣', '◎', '⌖'][index]}</i>{item}</span>)}
            </div>
          </div>
          <p className="pointer-events-none absolute right-[3.5%] top-[18%] hidden -rotate-6 text-right font-serif text-[clamp(16px,1.65vw,24px)] font-semibold italic leading-[1.02] text-white/75 lg:block">Smarter<br />Spaces for a<br />Brighter<br />Tomorrow<span className="mx-auto mt-2 block h-px w-20 -rotate-6 bg-white/70" /></p>
        </section>

      </div>
    </main>
  );
}
