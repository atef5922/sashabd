import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { normalizeDisplayedPriceText } from "@/lib/price";
import { socialImageUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { turnstileCatalog } from "./catalog";
import { useCases, benefits, turnstileSelectionCriteria, whyChooseFeatures, deliveryProcess, faqs, faqJsonLd, turnstilePriceRows } from "./landing-data";
import TurnstileProducts from "./TurnstileProducts";
import Icon, { type TurnstileIconName } from "./TurnstileIcon";
import styles from "./turnstile-landing.module.css";

const PAGE_TITLE = "Turnstile Gate Price in Bangladesh 2026";
const HERO = "/images/turnstile-entrance-hero-v2.webp";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description:
    "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
  alternates: { canonical: "/turnstile-gate/" },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Turnstile Gate Price in Bangladesh. Sasha Corporation supplies tripod turnstile, flap barrier, speed gate, RFID access control & face recognition systems.",
    url: "/turnstile-gate/",
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

function Heading({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return <div className={styles.heading}>{eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}<h2>{title}</h2><p>{text}</p></div>;
}

function Section({ id, children, soft = false, tone }: { id: string; children: ReactNode; soft?: boolean; tone?: "soft" | "blue" }) {
  const compact = id === "gate-planning" || id === "gate-benefits";
  return <section id={id} className={`${styles.section} ${compact ? styles.compactSection : ""} ${soft ? styles.soft : ""} ${tone ? styles[tone] : ""}`}><div className={styles.container}>{children}</div></section>;
}

const navigation = [
  ["turnstile-products", "Products"], ["gate-types", "Gate Types"], ["gate-applications", "Applications"],
  ["access-control", "Access Control"], ["gate-prices", "Price Guide"], ["gate-installation", "Installation"], ["gate-faq", "FAQs"],
] as const;
const applicationIcons: TurnstileIconName[] = ["building", "factory", "shield", "school", "health", "users"];
const processIcons: TurnstileIconName[] = ["plan", "settings", "card", "tools", "monitor", "team"];
const supportIcons: TurnstileIconName[] = ["plan", "link", "tools", "monitor", "support", "truck"];
const integrationSteps = [
  { title: "User Verifies", icon: "card" as const, image: turnstileCatalog[10].image, text: "Present RFID card, fingerprint, face or QR code." },
  { title: "Controller Checks", icon: "settings" as const, image: turnstileCatalog[0].image, text: "Access controller verifies credentials and permissions." },
  { title: "Gate Opens", icon: "gate" as const, image: turnstileCatalog[9].image, text: "Turnstile gate unlocks for authorized entry." },
  { title: "Entry Logged", icon: "monitor" as const, image: turnstileCatalog[5].image, text: "Entry data is recorded in the software for attendance and reporting." },
];
const gateComparison = [
  { product: turnstileCatalog[0], label: "Tripod Turnstile", security: 3, speed: "Medium", appearance: "Standard", bestFor: "Factories, Schools, Institutions" },
  { product: turnstileCatalog[1], label: "Flap Barrier", security: 4, speed: "High", appearance: "Modern", bestFor: "Corporate Offices, Commercial Buildings" },
  { product: turnstileCatalog[9], label: "Speed Gate", security: 4, speed: "High", appearance: "Premium", bestFor: "Office Lobbies, High-Traffic Areas" },
  { product: turnstileCatalog[8], label: "Swing Turnstile", security: 3, speed: "High", appearance: "Elegant", bestFor: "Wide Lanes, Accessibility" },
  { product: turnstileCatalog[3], label: "Full Height Turnstile", security: 5, speed: "Medium", appearance: "Industrial", bestFor: "High-Security, Restricted Areas" },
];

export default function TurnstileGateSystemPage() {
  const whatsapp = `https://api.whatsapp.com/send/?phone=${siteConfig.whatsapp.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`;

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="turnstile-title">
      <div className={styles.heroVisual}><Image src={HERO} alt="Illustrative modern entrance with stainless steel turnstiles and glass swing barriers" fill priority sizes="100vw" /></div>
      <div className={`${styles.container} ${styles.heroInner}`}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>SMART ACCESS. CONTROLLED ENTRY.</p>
        <h1 id="turnstile-title">Turnstile Gate Price<br />in Bangladesh <span>2026</span></h1>
        <p className={styles.heroDescription}>A smarter welcome. A more secure entrance. Explore turnstile gates and access control solutions for offices, factories and public spaces.</p>
        <div className={styles.actions}><Link href="/contact/" className={styles.button}>Get a Project Quote <Icon name="arrow" /></Link><a href="#turnstile-products" className={styles.heroSecondary}>Browse Products</a></div>
        <div className={styles.heroTags}><span><Icon name="check" />Lane planning</span><span><Icon name="check" />Access integration</span><span><Icon name="check" />Installation & support</span></div>
      </div></div>
    </section>

    <div className={styles.trustStrip}><div className={styles.container}><div className={styles.trustIntro}><Icon name="gate" /><div><strong>Complete Entrance Solutions</strong><span>From gate selection to handover</span></div></div>{([{ icon: "plan", title: "Site Survey & BOQ", text: "Plan the right lane layout" }, { icon: "card", title: "Access Integration", text: "Readers, controllers & software" }, { icon: "support", title: "Installation & Support", text: "Setup, training & maintenance" }] as const).map(item => <div className={styles.trustItem} key={item.title}><Icon name={item.icon} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>)}</div></div>

    <nav className={styles.sectionNav} aria-label="On this turnstile page"><div className={styles.container}>{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>

    <Section id="turnstile-products" tone="blue"><div className={styles.catalogPanel}><Heading title="Browse Turnstile Products" text="Explore tripod turnstiles, flap barriers, swing gates and complete entrance solutions in one product explorer." /><TurnstileProducts items={turnstileCatalog} /></div></Section>

    <section id="gate-types" className={styles.compareSection}><div className={styles.container}><div className={styles.compareHeader}><Heading eyebrow="COMPARE AT A GLANCE" title="Find the right gate for your needs" text="Compare key features to choose the best turnstile solution for your environment." /><Link href="/contact/" className={styles.workflowLink}>Need Help Choosing? Talk to an Engineer <Icon name="arrow" /></Link></div><div className={styles.compareLayout}><div className={styles.compareTableWrap}><table><caption className="sr-only">Comparison of turnstile gate types by security level, traffic speed, appearance and recommended use</caption><thead><tr><th scope="col">Gate Type</th><th scope="col">Security Level</th><th scope="col">Traffic Speed</th><th scope="col">Appearance</th><th scope="col">Best For</th></tr></thead><tbody>{gateComparison.map(item => <tr key={item.label}><td><Link href={`/turnstile-gate/${item.product.slug}/`} prefetch={false}><span><Image src={item.product.image} alt="" fill sizes="52px" /></span><strong>{item.label}</strong></Link></td><td><span className={styles.securityDots} aria-label={`${item.security} out of 5 security level`}>{Array.from({ length: 5 }, (_, index) => <i key={index} data-active={index < item.security} />)}</span></td><td>{item.speed}</td><td>{item.appearance}</td><td>{item.bestFor}</td></tr>)}</tbody></table></div><aside className={styles.recommendationPanel}><span><Icon name="support" /></span><h3>Quick Recommendation</h3><p>Not sure which gate is right for you? Our team can help you choose the best solution based on your security, traffic and budget requirements.</p><Link href="/contact/">Get Expert Advice <Icon name="arrow" /></Link></aside></div></div></section>

    <Section id="gate-applications" tone="blue"><Heading eyebrow="BUILT AROUND YOUR SPACE" title="Entry control for everyday environments" text="Sasha Corporation is a trusted turnstile gate supplier in Bangladesh, with entrance solutions for offices, factories and institutions." /><div className={styles.applicationGrid}>{useCases.map((item, index) => <article key={item.title}><span className={styles.iconBadge}><Icon name={applicationIcons[index]} /></span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></Section>

    <section id="access-control" className={styles.workflowSection}><div className={styles.container}><div className={styles.workflowHeader}><Heading eyebrow="HOW ACCESS CONTROL WORKS" title="From verification to valuable insights" text="A simple and secure flow that keeps your entrance organized and your data in one place." /><a href="#gate-installation" className={styles.workflowLink}>See Installation Process <Icon name="arrow" /></a></div><div className={styles.workflowLayout}><ol className={styles.integrationFlow}>{integrationSteps.map((step, index) => <li key={step.title}><div className={styles.flowTitle}><span>{index + 1}</span><h3>{step.title}</h3></div><div className={styles.flowVisual}><Icon name={step.icon} /><span><Image src={step.image} alt="" fill sizes="110px" /></span></div><p>{step.text}</p></li>)}</ol><aside className={styles.connectedPanel}><span className={styles.connectedIcon}><Icon name="link" /></span><h3>Connected to Your System</h3><ul>{["Access Control Software", "Attendance System", "Visitor Management", "Third-party Integration"].map(item => <li key={item}><Icon name="check" />{item}</li>)}</ul></aside></div></div></section>

    <Section id="gate-planning" tone="blue"><div className={styles.planningLayout}><div className={styles.planningIntro}><p className={styles.eyebrow}>PLAN BEFORE YOU INSTALL</p><h2>A good entrance starts with a good plan.</h2><p>Match the gate to your traffic, space and operational needs before choosing the hardware.</p><div className={styles.planningCallout}><Icon name="plan" /><strong>Have a floor plan?</strong><p>Send the entrance width, expected users and preferred access method.</p><Link href="/contact/" className={styles.button}>Request BOQ Planning <Icon name="arrow" /></Link></div></div><div className={styles.criteriaGrid}>{turnstileSelectionCriteria.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div></div></Section>

    <section id="gate-prices" className={styles.priceSection}><div className={styles.container}><div className={styles.priceHeader}><Heading eyebrow="TRANSPARENT PRICING" title="Turnstile Gate Price Guide" text="Indicative price range for popular turnstile gates. Final price depends on lane quantity, access method, controller, software, installation and site requirements." /><div className={styles.priceHighlights}>{([{ icon: "plan", title: "Indicative Pricing", text: "Get a clear idea before planning your project" }, { icon: "settings", title: "Custom Quotation", text: "Final price based on your requirements" }, { icon: "support", title: "Talk to an Expert", text: "We help you choose the right solution" }] as const).map(item => <article key={item.title}><span><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div><div className={styles.priceTableWrap}><table><caption className="sr-only">Turnstile gate indicative prices in Bangladesh</caption><thead><tr><th scope="col">Model</th><th scope="col">Product</th><th scope="col">Gate Type</th><th scope="col">Best For</th><th scope="col">Indicative Price (BDT)</th><th scope="col">Action</th></tr></thead><tbody>{turnstilePriceRows.map(item => <tr key={item.slug}><td><div className={styles.modelCell}><span><Image src={item.image} alt="" fill sizes="64px" /></span><strong>{item.model}</strong></div></td><td>{item.product}</td><td>{item.gateType}</td><td>{item.bestFor}</td><td><strong>{normalizeDisplayedPriceText(item.price)}</strong></td><td><div className={styles.priceActions}><Link href={`/turnstile-gate/${item.slug}/`} prefetch={false}>View Details</Link><Link href="/contact/">Get Quote</Link></div></td></tr>)}</tbody></table></div><div className={styles.priceFooter}><p><Icon name="check" />Prices are indicative and may vary based on project scope, quantity, access control devices (RFID / Fingerprint / Face / QR), software integration, installation and site conditions.</p><p>Need a custom quotation? <Link href="/contact/">Contact Our Team <Icon name="arrow" /></Link></p></div></div></section>

    <Section id="gate-benefits" tone="blue"><Heading eyebrow="MAKE EVERY ENTRY COUNT" title="More control. Smoother movement." text="Combine the right hardware with clear access policies and a well-planned lane layout." /><div className={styles.benefitGrid}>{benefits.map(item => <article key={item.title}><Icon name="check" /><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}</div></Section>

    <section id="gate-installation" className={styles.deliverySection}><div className={styles.container}><div className={styles.deliveryHeader}><Heading eyebrow="HOW WE DELIVER THE PROJECT" title="How We Deliver the Project" text="A structured and transparent process to ensure a successful turnstile gate installation." /><a href="#gate-installation" className={styles.deliveryLink}>See Full Delivery Process <Icon name="arrow" /></a></div><ol className={styles.processGrid}>{deliveryProcess.map((step, index) => <li key={step.step}><span className={styles.processIcon}><Icon name={processIcons[index]} /></span><h3>{index + 1}. {step.title}</h3><p>{step.desc}</p></li>)}</ol></div></section>

    <section id="gate-support" className={styles.supportSection}><div className={styles.container}><Heading eyebrow="WHY SASHA CORPORATION" title="Why Choose Sasha for Turnstile Projects?" text="We deliver more than products — we provide complete entrance control solutions with expert support." /><div className={styles.supportGrid}>{whyChooseFeatures.map((item, index) => <article key={item.title}><span className={styles.supportIcon}><Icon name={supportIcons[index]} /></span><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></div></section>

    <Section id="gate-faq" tone="blue"><Heading eyebrow="BEFORE YOU CHOOSE" title="Your questions, answered." text="Practical answers about gate selection, access methods, installation and support." /><div className={styles.faqGrid}>{faqs.map((item, index) => <details key={item.q}><summary><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.q}</h3><span className={styles.faqToggle} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /></Section>

    <div className={`${styles.container} ${styles.ctaWrap}`}><section className={styles.finalCta}><div className={styles.finalCtaCopy}><p className={styles.eyebrow}>LET&apos;S BUILD A SAFER TOMORROW</p><h2>Planning an Entrance Control Project?</h2><p>Get expert consultation, project BOQ, model selection, access integration, and installation support from the Sasha Corporation team.</p><div className={styles.actions}><Link href="/contact/" className={styles.button}>Request Project BOQ <Icon name="arrow" /></Link><a href={whatsapp} target="_blank" rel="noreferrer" className={styles.ctaEngineer}>Talk to an Engineer <Icon name="arrow" /></a></div><div className={styles.ctaBenefits}><span><Icon name="check" /><b>Fast Response</b><small>We reply within 24 hours</small></span><span><Icon name="support" /><b>Nationwide Support</b><small>Service across Bangladesh</small></span><span><Icon name="team" /><b>Experienced Technical Team</b><small>Trained &amp; certified engineers</small></span></div></div></section><div className={styles.related}><span>Explore related solutions</span><Link href="/pa-system/">PA Systems <Icon name="arrow" /></Link><Link href="/conference-system/">Conference Systems <Icon name="arrow" /></Link><Link href="/led-display/">LED Displays <Icon name="arrow" /></Link></div></div>
  </div>;
}
