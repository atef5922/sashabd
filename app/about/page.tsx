import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import MobileIntroText from "@/components/common/MobileIntroText";
import { socialImageUrl } from "@/lib/seo";
import { BRAND_NAME } from "@/lib/brand";

const MAROON = "#FF6A00";

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

function SectionTitle({
  title,
  subtitle,
  icon,
  subtitleClassName,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  subtitleClassName?: string;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-[1.65rem] font-bold tracking-tight text-slate-900 md:text-2xl">
        {icon ? <span className="text-xl">{icon}</span> : null}
        {title}
      </h2>
      {subtitle ? (
        <MobileIntroText
          teaser={subtitle}
          className="mt-4"
          teaserClassName="w-full text-[14px] leading-6 text-slate-600"
          expandedClassName="text-sm leading-7 text-slate-600"
          desktopClassName={subtitleClassName ?? "max-w-3xl text-base leading-7 text-slate-600"}
          buttonClassName="text-[13px]"
        >
          <p className={subtitleClassName ?? "max-w-3xl text-base leading-7 text-slate-600"}>{subtitle}</p>
        </MobileIntroText>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  const steps = [
    {
      n: "01",
      icon: "📝",
      t: "Requirement & information",
      d: "You share indoor/outdoor, location, approximate size and your purpose (signage, showroom, stage, events, etc.).",
    },
    {
      n: "02",
      icon: "📐",
      t: "Planning & guidance",
      d: "We recommend pixel pitch and brightness, and guide you on structure, power line and safety checklist.",
    },
    {
      n: "03",
      icon: "🛠️",
      t: "Install & configure",
      d: "Installation, wiring, controller mapping, configuration testing, and clean finishing with safety priority.",
    },
    {
      n: "04",
      icon: "✅",
      t: "Calibration & handover",
      d: "We calibrate for uniform output, test stability, provide basic training and outline support/warranty process.",
    },
  ];

  const solutions = [
    { icon: "▣", title: "Display Solutions", text: "LED displays, video walls and professional display solutions for every space.", image: "/images/home_hero/led-display-hero.webp", alt: "Indoor LED display installed in a modern commercial space" },
    { icon: "♧", title: "Conference & Collaboration", text: "Audio, video and collaboration solutions for modern meeting and conference spaces.", image: "/images/conference_landing/conference-system-hero-clear.webp", alt: "Professional conference and collaboration room" },
    { icon: "◖", title: "Professional Audio", text: "PA systems, background music and audio solutions for commercial and public spaces.", image: "/images/about/professional-audio-installation.png", alt: "Professional wall-mounted PA speaker installed in a modern commercial interior" },
    { icon: "◇", title: "Access & Security", text: "Turnstile gates, access control and integrated security solutions for safer environments.", image: "/images/turnstile-entrance-hero-v2.webp", alt: "Turnstile gate and access control system" },
    { icon: "⚙", title: "Engineering & BOQ", text: "Solution design, system integration and BOQ support based on real project needs.", image: "/images/accessories/heroes/controller-hero.webp", alt: "Technology engineering, system design and BOQ planning" },
    { icon: "⌾", title: "Installation & Support", text: "Professional installation, commissioning and long-term technical support for peace of mind.", image: "/images/project-page/project-chattogram-card.webp", alt: "Sasha Corporation technical installation and support team" },
  ];

  const journey = [
    { year: "2012", image: "/images/project-page/project-chattogram-card.webp", title: "Started with Display Solutions", text: "Began our journey with LED display solutions, serving businesses across Bangladesh." },
    { year: "2014", image: "/images/conference_landing/conference-system-hero-clear.webp", title: "Expanded to Conference & AV", text: "Introduced conference and collaboration solutions for modern workplaces." },
    { year: "2016", image: "/images/turnstile-entrance-hero-v2.webp", title: "Added PA & Access Control", text: "Extended our portfolio with professional audio systems and security access solutions." },
    { year: "2019", image: "/images/about/about-who-we-are-building.webp", title: "Delivered Integrated Projects", text: "Started handling large-scale integrated projects for corporate, government and commercial spaces." },
    { year: "Today", image: "/images/hero.webp", title: "A Broader Technology Partner", text: "Now a trusted provider of end-to-end technology solutions for smarter, safer and more connected spaces." },
  ];

  return (
    <main className="w-full bg-transparent">
      <div className="mx-auto w-full pb-8 pt-0">
        <section className="relative isolate overflow-hidden bg-white">
          <Image src="/images/about/about-hero-banner.webp" alt="Modern Sasha Corporation AV and conference showroom" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,252,255,.99)_0%,rgba(248,252,255,.97)_28%,rgba(248,252,255,.82)_43%,rgba(248,252,255,.28)_66%,transparent_82%)]" />
          <div className="relative mx-auto min-h-[clamp(280px,30vw,470px)] max-w-[1440px] px-6 py-7 md:flex md:items-center md:px-12 lg:px-14">
            <div className="max-w-[590px]">
              <p className="flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[.14em] text-[#52658f] before:h-[3px] before:w-10 before:bg-[#ff6a00]">About Sasha Corporation</p>
              <h1 className="!mt-3 !text-[clamp(30px,3.55vw,54px)] font-black leading-[1.04] tracking-[-.05em] text-[#10275a]">Technology &amp; AV<br />Solution Provider<br /><span className="text-[#f26b16]">in Bangladesh</span></h1>
              <p className="mt-3 max-w-[510px] text-[clamp(10px,1vw,15px)] leading-[1.45] text-[#52658f]">We deliver professional display, conference, audio and access-control solutions — from planning and BOQ to supply, installation, integration and long-term technical support.</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[clamp(8px,.72vw,11px)] font-bold text-[#10275a] sm:max-w-[560px] sm:grid-cols-6">
                {[['▣', 'LED Display'], ['♧', 'Conference'], ['◈', 'PA System'], ['◫', 'Turnstile'], ['▣', 'Interactive Display'], ['▤', 'Digital Podium']].map(([icon, label]) => <span key={label} className="flex flex-col items-center gap-2 text-center"><i className="text-[23px] not-italic text-[#1465ef]">{icon}</i>{label}</span>)}
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row"><Link href="/" className="inline-flex min-h-[clamp(34px,3.2vw,48px)] items-center justify-center rounded-lg bg-[#ff6a00] px-[clamp(14px,1.8vw,28px)] text-[clamp(10px,1vw,14px)] font-extrabold text-white shadow-[0_10px_22px_rgba(255,106,0,.2)]">Explore Our Solutions <span className="ml-4 text-lg">→</span></Link><Link href="/contact/" className="inline-flex min-h-[clamp(34px,3.2vw,48px)] items-center justify-center rounded-lg border border-[#397bfa] bg-white/75 px-[clamp(14px,1.8vw,28px)] text-[clamp(10px,1vw,14px)] font-extrabold text-[#10275a]">Contact Our Team</Link></div>
            </div>
          </div>
        </section>

        <section className="grid overflow-hidden bg-[#f3f8ff] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.35fr)]">
          <div className="relative min-h-0 self-stretch"><Image src="/images/about/about-who-we-are-building.webp" alt="Sasha Corporation office building" fill sizes="(max-width: 1023px) 100vw, 42vw" className="object-cover object-center" /></div>
          <div className="relative px-[clamp(22px,4vw,58px)] py-[clamp(18px,2.2vw,34px)]"><p className="flex items-center gap-3 text-[clamp(9px,.8vw,12px)] font-extrabold uppercase tracking-[.14em] text-[#52658f] before:h-[2px] before:w-8 before:bg-[#ff6a00]">Who we are</p><h2 className="!mt-3 max-w-[78%] !text-[clamp(25px,2.4vw,36px)] font-black leading-tight tracking-[-.04em] text-[#10275a]">A Trusted Partner for Modern Spaces</h2><p className="mt-3 max-w-[78%] text-[clamp(10px,1vw,14px)] !text-left leading-[1.5] text-[#52658f]">Sasha Corporation is a technology-focused company providing professional display, conference, audio and access-control solutions across Bangladesh. We work with businesses, educational institutions, government organizations and commercial spaces to create smarter, safer and more connected environments.</p><p className="mt-2 max-w-[78%] text-[clamp(10px,1vw,14px)] !text-left leading-[1.5] text-[#52658f]">With a strong focus on engineering, reliable products and dedicated support, we help our clients turn ideas into real-world solutions.</p><p className="pointer-events-none absolute right-[3%] top-[11%] hidden w-[17%] -rotate-6 text-right font-serif text-[clamp(16px,2vw,28px)] font-semibold italic leading-[1.05] !text-[#b8c8e3] sm:block">Building<br />Better Spaces<br />Together<span className="mx-auto mt-2 block h-px w-24 -rotate-6 bg-[#b8c8e3]" /></p><div className="mt-4 grid grid-cols-2 items-stretch gap-2 sm:grid-cols-4">{[['⚙', 'Engineering-Led', 'Solution design based on real project needs.'], ['◇', 'Multi-Brand Solutions', 'The right technology from trusted global brands.'], ['♧', 'Nationwide Support', 'Project delivery and technical support across Bangladesh.'], ['◉', 'After-Sales Service', 'Long-term technical support and maintenance for peace of mind.']].map(([icon, title, text]) => <article key={title} className="min-h-[92px] rounded-xl border border-[#dce9fb] bg-white/75 p-[clamp(9px,1vw,16px)] shadow-[0_8px_20px_rgba(16,39,90,.04)]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#e5f0ff] text-base text-[#1465ef]">{icon}</span><h3 className="mt-2 text-[clamp(10px,.9vw,13px)] !text-left font-extrabold leading-5 text-[#10275a]">{title}</h3><p className="mt-1 text-[clamp(8px,.75vw,11px)] !text-left leading-[1.4] text-[#52658f]">{text}</p></article>)}</div></div>
        </section>

        <section className="border-y border-[#dce9fb] bg-[linear-gradient(110deg,#f8fbff,#eef6ff)] px-4 py-4 sm:px-6 md:px-10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {[['▥', '100+', 'Projects Delivered'], ['♧', '80+', 'Happy Clients'], ['✥', '5+', 'Years of Experience'], ['⌾', 'Nationwide', 'Service Coverage']].map(([icon, value, label]) => (
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

        <section className="relative overflow-hidden bg-[linear-gradient(110deg,#f7fbff,#edf6ff)] px-6 py-7 md:px-10 lg:px-12 lg:py-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(180,215,250,.22),transparent_52%)]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
            <div className="relative"><p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">Our story</p><h2 className="mt-3 !text-[clamp(32px,3vw,48px)] font-black leading-none tracking-[-.045em] text-[#10275a]">Our Journey</h2><p className="mt-3 text-[13px] leading-5 text-[#52658f]">From display solutions to complete technology and AV systems, Sasha Corporation has grown steadily to become a trusted partner for modern spaces across Bangladesh.</p><p className="mt-6 hidden max-w-[230px] -rotate-6 font-serif text-[clamp(17px,1.55vw,23px)] font-semibold italic leading-[1.05] text-[#a9bddc] lg:block">Growing<br />Together for a<br />Smarter Bangladesh<span className="mx-auto mt-3 block h-px w-24 -rotate-6 bg-[#a9bddc]" /></p></div>
            <div className="relative min-w-0 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div className="relative grid min-w-[920px] grid-cols-5 items-stretch gap-3 pt-1 before:absolute before:left-[8%] before:right-[8%] before:top-[162px] before:h-0.5 before:bg-[#77aaff]">{journey.map((item) => <article key={item.year} className="relative z-10 min-w-0"><div className="h-full min-h-[270px] rounded-lg border-8 border-white bg-white shadow-[0_5px_14px_rgba(16,39,90,.08)]"><div className="relative h-[140px] overflow-hidden rounded-sm"><Image src={item.image} alt="" fill sizes="180px" className="object-cover" /></div><div className="px-2 pb-4 pt-1"><div className="relative h-3 border-t border-[#77aaff]"><span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full border-2 border-[#1465ef] bg-white" /></div><h3 className="!mt-2 min-h-[30px] !text-[11px] !font-extrabold !leading-[1.2] text-[#10275a]">{item.title}</h3><p className="!mt-1 !text-[10px] !leading-[1.35] !text-left text-[#52658f]">{item.text}</p></div></div></article>)}</div></div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section aria-labelledby="what-we-do-heading" className="overflow-hidden bg-[linear-gradient(110deg,#f8fbff,#edf6ff)] px-6 py-8 md:px-10 lg:px-12">
          <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-stretch">
            <div className="flex flex-col justify-center">
              <p className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#52658f] before:h-0.5 before:w-8 before:bg-[#ff6a00]">What we do</p>
              <h2 id="what-we-do-heading" className="mt-3 !text-[clamp(32px,3vw,48px)] font-black leading-[.95] tracking-[-.05em] text-[#10275a]">What We Do</h2>
              <p className="mt-2 text-[clamp(17px,1.5vw,23px)] font-medium leading-tight text-[#304b81]">Complete Technology Solutions for Modern Spaces</p>
              <p className="mt-4 max-w-[270px] text-[12px] leading-[1.55] text-[#52658f]">We provide end-to-end display, conference, audio, security and integration solutions, backed by expert engineering and dedicated support. Our goal is to help you create smarter, more connected environments that work today and tomorrow.</p>
              <Link href="/products/" className="mt-5 inline-flex w-fit items-center justify-center rounded-lg bg-[#ff6a00] px-5 py-3 text-[12px] font-extrabold text-white shadow-[0_10px_22px_rgba(255,106,0,.2)] transition hover:bg-[#e85f00]">Explore All Solutions <span aria-hidden="true" className="ml-4 text-base">→</span></Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {solutions.map((solution) => (
                <article key={solution.title} className="group relative min-h-[126px] overflow-hidden rounded-xl border border-[#dce9fb] bg-white shadow-[0_6px_18px_rgba(16,39,90,.07)]">
                  <div className="relative z-10 flex h-full w-[58%] flex-col p-4 pr-2">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f0ff] text-lg font-black text-[#1465ef] ring-1 ring-inset ring-[#d2e4ff]">{solution.icon}</span>
                    <h3 className="mt-2 text-[13px] font-black leading-[1.05] tracking-[-.025em] text-[#10275a]">{solution.title}</h3>
                    <p className="mt-1.5 text-[9px] leading-[1.3] text-[#52658f]">{solution.text}</p>
                  </div>
                  <div className="absolute inset-y-0 right-0 w-[47%] overflow-hidden">
                    <Image src={solution.image} alt={solution.alt} fill sizes="(max-width: 639px) 45vw, (max-width: 1279px) 23vw, 15vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.18)_36%,transparent_70%)]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION, VISION & VALUES */}
        <section aria-labelledby="purpose-heading" className="relative overflow-hidden border-t border-[#dce9fb] bg-[linear-gradient(105deg,#f9fcff_0%,#f4f9ff_62%,#eaf4ff_100%)] px-6 py-6 md:px-10 lg:px-12">
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <Image src="/images/about/bangladesh-memorial-skyline.png" alt="" fill sizes="55vw" className="object-contain object-right-bottom" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#f9fcff_0%,rgba(249,252,255,.98)_43%,rgba(249,252,255,.72)_68%,transparent_84%)]" />
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

        {/* HOW WE WORK */}
        <section className="mt-8 rounded-[24px] bg-rose-50 p-4 md:rounded-3xl md:p-10">
          <SectionTitle
            icon="🛠️"
            title="How we work"
            subtitle="We keep the process simple and clear so you know what you're getting and when you'll get it, without confusion or hidden scope."
          />

          <div className="-mx-0.5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-0.5 pb-1 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mt-9 md:grid md:gap-8 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="w-[89%] shrink-0 snap-start rounded-[14px] border bg-white px-4 py-4 md:w-auto md:shrink md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0"
                style={{ borderColor: `${MAROON}20` }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold" style={{ color: MAROON }}>
                    {s.n}
                  </div>
                  <div className="text-xl">{s.icon}</div>
                </div>
                <div className="mt-2 text-[17px] font-semibold leading-snug text-slate-900 md:text-lg">{s.t}</div>
                <p className="mt-2 text-[13px] leading-6 text-slate-600 text-justify md:text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
